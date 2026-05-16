/**
 * VideoPlayer 组件 - 视频播放器核心
 * 负责视频元素的渲染和事件处理
 * @module components/basic/Video/VideoPlayer
 */

import { useCallback } from 'react';
import { View, Video as TaroVideo } from '@tarojs/components';
import type { VideoPlayerProps } from './Video.types';
import { createComponent } from '@/utils/createComponent';
import { useAccessibility, ARIA_ROLES } from '@/hooks/ui/useAccessibility';

export const VideoPlayer = createComponent<VideoPlayerProps, HTMLVideoElement>({
  name: 'VideoPlayer',

  defaultProps: {
    loop: false,
    muted: false,
    preload: 'metadata',
    playbackRate: 1,
  },

  render: (props, ref) => {
    const {
      src,
      poster,
      muted,
      loop,
      preload,
      playbackRate: _playbackRate,
      onLoadedMetadata,
      onPlay,
      onPause,
      onEnded,
      onWaiting,
      onTimeUpdate,
      onError,
      onFullscreenChange,
      onEnterPictureInPicture,
      onLeavePictureInPicture,
      videoStyle,
      videoClassName,
    } = props;

    const a11y = useAccessibility({
      role: ARIA_ROLES.application,
      label: 'Video Player',
    });

    const handleLoadedMetadata = useCallback(
      (e: Event) => {
        const video = e.currentTarget as HTMLVideoElement;
        onLoadedMetadata?.(video.duration, video.videoWidth, video.videoHeight);
      },
      [onLoadedMetadata],
    );

    const handlePlay = useCallback(() => onPlay?.(), [onPlay]);
    const handlePause = useCallback(() => onPause?.(), [onPause]);
    const handleEnded = useCallback(() => onEnded?.(), [onEnded]);
    const handleWaiting = useCallback(() => onWaiting?.(), [onWaiting]);

    const handleTimeUpdate = useCallback(
      (e: Event) => {
        const video = e.currentTarget as HTMLVideoElement;
        onTimeUpdate?.(video.currentTime, video.buffered?.end(video.buffered.length - 1) || 0);
      },
      [onTimeUpdate],
    );

    const handleError = useCallback(
      (e: Event) => {
        const detail = (e as unknown as { detail?: { code?: number; errMsg?: string } }).detail;
        onError?.({
          code: detail?.code || 1000,
          message: detail?.errMsg || 'Video playback error',
          originalError: e,
        });
      },
      [onError],
    );

    const handleFullscreenChange = useCallback(
      (e: Event) => {
        const detail = (e as unknown as { detail?: { fullScreen?: boolean | number } }).detail;
        const isFullscreen = !!detail?.fullScreen;
        onFullscreenChange?.(isFullscreen);
      },
      [onFullscreenChange],
    );

    const handleEnterPiP = useCallback(() => onEnterPictureInPicture?.(), [onEnterPictureInPicture]);
    const handleLeavePiP = useCallback(() => onLeavePictureInPicture?.(), [onLeavePictureInPicture]);

    return (
      <View style={{ position: 'relative', width: '100%', height: '100%' }} {...a11y.getAriaAttributes()}>
        <TaroVideo
          ref={ref as any}
          src={src}
          poster={poster}
          muted={muted}
          loop={loop}
          {...({ preload } as any)}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            ...videoStyle,
          }}
          className={videoClassName}
          onLoadedMetaData={handleLoadedMetadata}
          onPlay={handlePlay}
          onPause={handlePause}
          onEnded={handleEnded}
          onWaiting={handleWaiting}
          onTimeUpdate={handleTimeUpdate}
          onError={handleError}
          onFullscreenChange={handleFullscreenChange}
          onFullScreenChange={handleFullscreenChange}
          onEnterPictureInPicture={handleEnterPiP}
          onLeavePictureInPicture={handleLeavePiP}
        />
      </View>
    );
  },
});

export default VideoPlayer;
