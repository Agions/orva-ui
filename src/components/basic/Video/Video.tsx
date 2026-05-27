/**
 * 视频播放器组件 (Video)
 * @module components/basic/Video
 * @description 组合 VideoPlayer、VideoControls、VideoOverlay、VideoAd、VideoChapterMarkers 的视频播放器主组件，支持播放控制、广告、章节标记等功能
 * @example
 * ```tsx
 * import { Video } from 'orva-ui';
 *
 * <Video
 *   src="https://example.com/video.mp4"
 *   poster="https://example.com/poster.jpg"
 *   onPlay={() => console.log('play')}
 * />
 * ```
 */

import { useCallback, useImperativeHandle, useRef, useState, useEffect } from 'react';
import { View } from '@tarojs/components';
import type {
  VideoProps,
  VideoError,
  VideoChapter,
  VideoAd as VideoAdType,
} from './Video.types';
import type { VideoState, VideoMethods } from './Video.types';
import {
  VideoStatus,
  PlayMode,
  VideoErrorCode,
  LoopMode,
  PlaybackRate,
} from './Video.types';
import { useVideoPlayer } from './useVideoPlayer';
import { VideoPlayer } from './VideoPlayer';
import { VideoControls } from './VideoControls';
import { VideoOverlay } from './VideoOverlay';
import { VideoAd } from './VideoAd';
import { VideoChapterMarkers } from './VideoChapterMarkers';
import { createComponent } from '@/utils/createComponent';
import { useTheme } from '@/hooks/ui/useTheme';
import { useMicroAnimation } from '@/hooks/ui/useMicroAnimation';
import { useAccessibility, ARIA_ROLES, ARIA_LABELS } from '@/hooks/ui/useAccessibility';

const Video = createComponent<VideoProps, VideoMethods>({
  name: 'Video',

  defaultProps: {
    loop: LoopMode.NONE,
    muted: false,
    preload: 'metadata',
    playbackRate: PlaybackRate.NORMAL,
    showControls: true,
    showPoster: true,
    showAd: true,
    showChapterMarkers: true,
    controlsAutoHideDelay: 3000,
  },

  render: (props, ref) => {
    const {
      src,
      poster,
      loop,
      muted,
      preload,
      playbackRate,
      initialTime,
      showControls,
      showPoster,
      showAd,
      showChapterMarkers,
      controlsAutoHideDelay,
      ads,
      chapters,
      style,
      className,
      videoStyle,
      videoClassName,
      posterStyle,
      onPlay,
      onPause,
      onEnded,
      onTimeUpdate,
      onSeeked: _onSeeked,
      onVolumeChange,
      onFullscreenChange,
      onError,
      onLoadedMetadata,
      onAdStart,
      onAdSkip,
      onAdEnded,
      onChapterChange,
      onScreenshot,
      onDownload,
      onControlsVisible,
      onControlsHidden,
      ...restProps
    } = props;

    const theme = useTheme();
    const animation = useMicroAnimation();
    const a11y = useAccessibility({
      role: ARIA_ROLES.application,
      label: ARIA_LABELS.videoPlayer,
    });

    void theme;
    void animation;
    void _onSeeked;

    const containerRef = useRef<HTMLDivElement>(null);
    const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const lastMouseMoveRef = useRef<number>(Date.now());

    const player = useVideoPlayer({
      src,
      initialTime,
      volume: 1 - (muted ? 1 : 0),
      muted,
      playbackRate,
      loop,
      ads,
      chapters,
    });

    const {
      state,
      isDragging,
      isOptionsMenuVisible,
      currentAdIndex,
      adRemainingTime,
      adCanSkip,
      play,
      pause,
      stop,
      seek,
      togglePlay,
      reload,
      enterFullscreen,
      exitFullscreen,
      toggleFullscreen,
      enterPictureInPicture,
      exitPictureInPicture,
      togglePictureInPicture,
      setVolume,
      toggleMute,
      setPlaybackRate,
      getScreenshot,
      download,
      showControls: showControlsInternal,
      hideControls: hideControlsInternal,
      setIsOptionsMenuVisible,
      setCurrentAdIndex,
      setAdRemainingTime,
      setAdCanSkip,
      setSource,
    } = player;

    const buildVideoState = useCallback(
      (overrides?: Partial<VideoState>): VideoState => ({
        status: state.status,
        mode: state.mode,
        currentTime: state.currentTime,
        duration: state.duration,
        buffered: state.buffered,
        volume: state.volume,
        muted: state.muted,
        playbackRate: state.playbackRate,
        isFullscreen: state.isFullscreen,
        isPictureInPicture: state.isPictureInPicture,
        videoWidth: state.videoWidth,
        videoHeight: state.videoHeight,
        width: state.width,
        loaded: state.loaded,
        error: state.error,
        currentSource: state.currentSource,
        currentChapter: state.currentChapter,
        isDragging: state.isDragging,
        isControlsVisible: state.isControlsVisible,
        isOptionsMenuVisible: state.isOptionsMenuVisible,
        ...overrides,
      }),
      [state],
    );

    useImperativeHandle(ref, () => {
      const methods: VideoMethods = {
        play,
        pause,
        stop,
        seek,
        togglePlay,
        reload,
        enterFullscreen,
        exitFullscreen,
        toggleFullscreen,
        enterPictureInPicture,
        exitPictureInPicture,
        togglePictureInPicture,
        setVolume,
        toggleMute,
        setPlaybackRate,
        getState: () => state,
        getScreenshot,
        download,
        showControls: showControlsInternal,
        hideControls: hideControlsInternal,
        setSource,
      };
      return methods;
    });

    const [isControlsVisible, setIsControlsVisible] = useState(true);
    const [, setIsContextMenuVisible] = useState(false);

    const handleLoadedMetadata = useCallback(
      (duration: number, width: number, height: number) => {
        onLoadedMetadata?.(buildVideoState({ duration, width, videoHeight: height }));
      },
      [onLoadedMetadata, buildVideoState],
    );

    const handlePlay = useCallback(() => {
      onPlay?.(buildVideoState());
    }, [onPlay, buildVideoState]);

    const handlePause = useCallback(() => {
      onPause?.(buildVideoState());
    }, [onPause, buildVideoState]);

    const handleEnded = useCallback(() => {
      onEnded?.(buildVideoState());
    }, [onEnded, buildVideoState]);

    const handleTimeUpdate = useCallback(
      (currentTime: number, buffered: number) => {
        onTimeUpdate?.(buildVideoState({ currentTime, buffered }));

        if (chapters && chapters.length > 0) {
          const currentChapter = chapters.find(
            (chapter: VideoChapter, index: number) =>
              currentTime >= (chapter.time ?? chapter.startTime) &&
              (index === chapters.length - 1 || currentTime < (chapters[index + 1].time ?? chapters[index + 1].startTime)),
          );
          if (currentChapter && currentChapter.id !== state.currentChapter?.id) {
            onChapterChange?.(currentChapter, buildVideoState({ currentTime }));
          }
        }
      },
      [chapters, state.currentChapter, onTimeUpdate, onChapterChange, buildVideoState],
    );

    const handleError = useCallback(
      (error: VideoError) => {
        onError?.(error, buildVideoState());
      },
      [onError, buildVideoState],
    );

    const handleFullscreenChangeCb = useCallback(
      (isFullscreen: boolean) => {
        onFullscreenChange?.(isFullscreen, buildVideoState({ isFullscreen }));
      },
      [onFullscreenChange, buildVideoState],
    );

    const handleAdStartCb = useCallback(
      (ad: VideoAdType, index: number) => {
        onAdStart?.(ad, buildVideoState());
      },
      [onAdStart, buildVideoState],
    );

    const handleAdSkip = useCallback(() => {
      const currentAd = ads?.[currentAdIndex] ?? undefined;
      onAdSkip?.(currentAd!, buildVideoState());
      setCurrentAdIndex(-1);
      setAdRemainingTime(0);
      setAdCanSkip(false);
      play();
    }, [onAdSkip, ads, currentAdIndex, setCurrentAdIndex, setAdRemainingTime, setAdCanSkip, play, buildVideoState]);

    const handleAdEndedCb = useCallback(() => {
      const currentAd = ads?.[currentAdIndex] ?? undefined;
      onAdEnded?.(currentAd!, buildVideoState());
      setCurrentAdIndex(-1);
      setAdRemainingTime(0);
      setAdCanSkip(false);
      play();
    }, [onAdEnded, ads, currentAdIndex, setCurrentAdIndex, setAdRemainingTime, setAdCanSkip, play, buildVideoState]);

    const handleChapterSelect = useCallback(
      (chapter: VideoChapter) => {
        seek(chapter.time ?? chapter.startTime);
        onChapterChange?.(chapter, buildVideoState());
      },
      [seek, onChapterChange, buildVideoState],
    );

    const handleScreenshot = useCallback(async () => {
      const dataUrl = await getScreenshot();
      if (dataUrl) {
        onScreenshot?.(dataUrl);
      }
    }, [getScreenshot, onScreenshot]);

    const handleDownload = useCallback(() => {
      download();
      onDownload?.();
    }, [download, onDownload]);

    const handleShowControls = useCallback(() => {
      showControlsInternal();
      setIsControlsVisible(true);
      onControlsVisible?.();

      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
      if (showControls && !isDragging) {
        controlsTimeoutRef.current = setTimeout(() => {
          handleHideControls();
        }, controlsAutoHideDelay);
      }
    }, [showControlsInternal, showControls, isDragging, controlsAutoHideDelay, onControlsVisible]);

    const handleHideControls = useCallback(() => {
      hideControlsInternal();
      setIsControlsVisible(false);
      onControlsHidden?.();
    }, [hideControlsInternal, onControlsHidden]);

    const handleMouseMove = useCallback(() => {
      lastMouseMoveRef.current = Date.now();
      handleShowControls();
    }, [handleShowControls]);

    const handleMouseLeave = useCallback(() => {
      if (state.status === VideoStatus.PLAYING) {
        handleHideControls();
      }
    }, [state.status, handleHideControls]);

    const handleVideoClick = useCallback(() => {
      togglePlay();
    }, [togglePlay]);

    const handleContextMenu = useCallback(
      (e: React.MouseEvent) => {
        e.preventDefault();
        setIsContextMenuVisible(true);
      },
      [],
    );

    const handleOptionsMenuToggle = useCallback(() => {
      setIsOptionsMenuVisible(!isOptionsMenuVisible);
    }, [isOptionsMenuVisible]);

    const handleMenuClose = useCallback(() => {
      setIsOptionsMenuVisible(false);
      setIsContextMenuVisible(false);
    }, []);

    const handleRetry = useCallback(() => {
      reload();
    }, [reload]);

    const handleEndedClick = useCallback(() => {
      seek(0);
      play();
    }, [seek, play]);

    const handleVolumeChangeCb = useCallback(
      (volumeVal: number) => {
        setVolume(volumeVal);
        onVolumeChange?.(volumeVal);
      },
      [setVolume, onVolumeChange],
    );

    const handlePlaybackRateChange = useCallback(
      (rate: PlaybackRate) => {
        setPlaybackRate(rate);
      },
      [setPlaybackRate],
    );

    const handleLoopToggle = useCallback(() => {}, []);

    const handleFullscreenToggle = useCallback(async () => {
      if (state.isFullscreen) {
        await exitFullscreen();
      } else {
        await enterFullscreen();
      }
    }, [state.isFullscreen, exitFullscreen, enterFullscreen]);

    const handlePictureInPictureToggle = useCallback(async () => {
      if (state.isPictureInPicture) {
        await exitPictureInPicture();
      } else {
        await enterPictureInPicture();
      }
    }, [state.isPictureInPicture, exitPictureInPicture, enterPictureInPicture]);

    useEffect(() => {
      return () => {
        if (controlsTimeoutRef.current) {
          clearTimeout(controlsTimeoutRef.current);
        }
      };
    }, []);

    useEffect(() => {
      if (currentAdIndex >= 0 && ads && ads[currentAdIndex]) {
        handleAdStartCb(ads[currentAdIndex], currentAdIndex);
      }
    }, [currentAdIndex, ads, handleAdStartCb]);

    // DOM-only event props not supported by Taro's ViewProps type.
    // Apply them via spread with a relaxed type so they work on web/h5 platforms.
    const webOnlyProps: Record<string, unknown> = {
      onContextMenu: handleContextMenu,
      onMouseMove: handleMouseMove,
      onMouseLeave: handleMouseLeave,
    };

    return (
      <View
        ref={containerRef}
        style={{
          position: 'relative',
          width: '100%',
          backgroundColor: '#000',
          overflow: 'hidden',
          ...style,
        }}
        className={className}
        onClick={handleVideoClick}
        {...webOnlyProps}
        {...a11y.getAriaAttributes()}
        {...restProps}
      >
        <VideoPlayer
          src={src as string}
          poster={poster}
          muted={muted as boolean}
          loop={loop !== LoopMode.NONE}
          preload={preload as 'none' | 'metadata' | 'auto'}
          playbackRate={playbackRate as number}
          videoStyle={videoStyle}
          videoClassName={videoClassName}
          onLoadedMetadata={handleLoadedMetadata}
          onPlay={handlePlay}
          onPause={handlePause}
          onEnded={handleEnded}
          onWaiting={() => {}}
          onTimeUpdate={handleTimeUpdate}
          onError={handleError}
          onFullscreenChange={handleFullscreenChangeCb}
          onEnterPictureInPicture={() => {}}
          onLeavePictureInPicture={() => {}}
        />

        <VideoOverlay
          status={state.status}
          error={state.error}
          showControls={showControls}
          showEnded={state.status === VideoStatus.ENDED}
          showPoster={showPoster && !poster}
          poster={poster}
          posterStyle={posterStyle}
          onPlay={() => {}}
          onReload={() => {}}
          onRetry={handleRetry}
          onEndedClick={handleEndedClick}
        />

        {showAd && (
          <VideoAd
            visible={currentAdIndex >= 0 && !!ads?.[currentAdIndex]}
            currentAdIndex={currentAdIndex}
            adRemainingTime={adRemainingTime}
            adCanSkip={adCanSkip}
            ads={ads}
            onAdSkip={handleAdSkip}
            onAdClick={() => {}}
            onAdEnded={handleAdEndedCb}
          />
        )}

        {showChapterMarkers && chapters && chapters.length > 0 && (
          <VideoChapterMarkers
            visible={true}
            chapters={chapters}
            currentTime={state.currentTime}
            currentChapter={state.currentChapter}
            duration={state.duration}
            onChapterSelect={handleChapterSelect}
            onMenuClose={handleMenuClose}
          />
        )}

        {showControls && (
          <VideoControls
            ref={null}
            isPlaying={state.status === VideoStatus.PLAYING}
            isDragging={isDragging}
            isOptionsMenuVisible={isOptionsMenuVisible}
            showControls={isControlsVisible}
            currentTime={state.currentTime}
            duration={state.duration}
            buffered={state.buffered}
            volume={state.volume}
            muted={state.muted}
            playbackRate={state.playbackRate}
            loop={loop !== LoopMode.NONE}
            isFullscreen={state.isFullscreen}
            isPictureInPicture={state.isPictureInPicture}
            onPlayPause={togglePlay}
            onSeek={seek}
            onVolumeChange={handleVolumeChangeCb}
            onMuteToggle={toggleMute}
            onPlaybackRateChange={handlePlaybackRateChange}
            onLoopToggle={handleLoopToggle}
            onFullscreenToggle={handleFullscreenToggle}
            onPictureInPictureToggle={handlePictureInPictureToggle}
            onOptionsMenuToggle={handleOptionsMenuToggle}
            onScreenshot={handleScreenshot}
            onDownload={handleDownload}
            onMenuClose={handleMenuClose}
          />
        )}
      </View>
    );
  },
});

export default Video;
