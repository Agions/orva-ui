/**
 * useVideoPlayer Hook - 视频播放器核心逻辑
 * 封装视频播放的所有状态管理和控制方法
 * @module hooks/useVideoPlayer
 */

import { useState, useRef, useCallback, useEffect } from 'react';
import { createLogger } from '@/utils/logger';

const logger = createLogger('VideoPlayer');
import type {
  VideoState,
  VideoError,
  VideoSource,
  VideoChapter,
  VideoAd,
  LoopMode,
} from './Video.types';
import {
  VideoStatus,
  PlayMode,
  VideoErrorCode,
  PlaybackRate,
} from './Video.types';

export interface UseVideoPlayerOptions {
  src: VideoSource | VideoSource[] | string;
  initialTime?: number;
  volume?: number;
  muted?: boolean;
  playbackRate?: PlaybackRate;
  loop?: LoopMode;
  ads?: VideoAd[];
  chapters?: VideoChapter[];
}

export interface UseVideoPlayerReturn {
  // 状态
  state: VideoState;
  isDragging: boolean;
  isOptionsMenuVisible: boolean;
  currentAdIndex: number;
  adRemainingTime: number;
  adCanSkip: boolean;

  // 播放控制
  play: () => Promise<void>;
  pause: () => void;
  stop: () => void;
  seek: (time: number) => void;
  togglePlay: () => void;
  reload: () => void;

  // 显示控制
  enterFullscreen: () => Promise<void>;
  exitFullscreen: () => Promise<void>;
  toggleFullscreen: () => Promise<void>;
  enterPictureInPicture: () => Promise<void>;
  exitPictureInPicture: () => Promise<void>;
  togglePictureInPicture: () => Promise<void>;

  // 音频控制
  setVolume: (volume: number) => void;
  toggleMute: () => void;
  setPlaybackRate: (rate: PlaybackRate) => void;

  // 状态管理
  getState: () => VideoState;
  setSource: (src: VideoSource | VideoSource[] | string) => void;

  // 高级功能
  getScreenshot: () => Promise<string | null>;
  download: () => void;
  showControls: () => void;
  hideControls: () => void;

  // 内部状态更新（供子组件使用）
  setIsDragging: (dragging: boolean) => void;
  setIsOptionsMenuVisible: (visible: boolean) => void;
  setCurrentAdIndex: (index: number) => void;
  setAdRemainingTime: (time: number) => void;
  setAdCanSkip: (canSkip: boolean) => void;
}

export function useVideoPlayer(options: UseVideoPlayerOptions): UseVideoPlayerReturn {
  const {
    src,
    initialTime = 0,
    volume: initialVolume = 0.8,
    muted: initialMuted = false,
    playbackRate: initialPlaybackRate = PlaybackRate.NORMAL as PlaybackRate,
    loop: _loop,
    ads: _ads,
    chapters: _chapters,
  } = options;

  // 引用
  const videoRef = useRef<any>(null);
  const controlsTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const adTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  void controlsTimerRef;
  void adTimerRef;
  void canvasRef;

  // 状态
  const [isDragging, setIsDragging] = useState(false);
  const [isOptionsMenuVisible, setIsOptionsMenuVisible] = useState(false);
  const [currentAdIndex, setCurrentAdIndex] = useState(-1);
  const [adRemainingTime, setAdRemainingTime] = useState(0);
  const [adCanSkip, setAdCanSkip] = useState(false);
  const [sources, setSources] = useState<VideoSource[]>([]);
  const [currentSourceIndex, setCurrentSourceIndex] = useState(0);

  // 视频状态
  const [state, setState] = useState<VideoState>({
    status: VideoStatus.IDLE,
    mode: PlayMode.INLINE,
    currentTime: initialTime,
    duration: 0,
    buffered: 0,
    volume: initialVolume,
    muted: initialMuted,
    playbackRate: initialPlaybackRate,
    isFullscreen: false,
    isPictureInPicture: false,
    videoWidth: 0,
    videoHeight: 0,
    loaded: 0,
    error: undefined,
    currentSource: undefined,
    currentChapter: undefined,
    isDragging: false,
    isControlsVisible: true,
    isOptionsMenuVisible: false,
  });

  // 获取当前视频源
  const currentSource = sources[currentSourceIndex] || sources[0];

  // 标准化视频源
  const normalizeSources = useCallback((src: VideoSource | VideoSource[] | string): VideoSource[] => {
    if (typeof src === 'string') {
      return [{ src }];
    }
    if (Array.isArray(src)) {
      return src;
    }
    return [src];
  }, []);

  // 初始化视频源
  useEffect(() => {
    const normalizedSources = normalizeSources(src);
    setSources(normalizedSources);
    setCurrentSourceIndex(0);
    if (normalizedSources.length > 0) {
      setState((prev) => ({
        ...prev,
        currentSource: normalizedSources[0],
        status: VideoStatus.IDLE,
        currentTime: initialTime,
      }));
      videoRef.current?.load();
    }
  }, [src, normalizeSources, initialTime]);

  // 处理视频加载完成
  const _handleLoadedMetadata = useCallback((duration: number, width: number, height: number) => {
    setState((prev) => ({
      ...prev,
      duration,
      videoWidth: width,
      videoHeight: height,
      status: VideoStatus.IDLE,
    }));
    if (initialTime && !isDragging && videoRef.current) {
      videoRef.current.currentTime = initialTime;
    }
  }, [initialTime, isDragging]);
  void _handleLoadedMetadata;

  // ==================== 播放控制 ====================

  const play = useCallback(async () => {
    const video = videoRef.current;
    if (!video) return;
    try {
      await video.play();
    } catch (error) {
      const videoError: VideoError = {
        code: VideoErrorCode.PERMISSION_DENIED,
        message: 'Playback permission denied',
        originalError: error,
      };
      setState((prev) => ({
        ...prev,
        status: VideoStatus.ERROR,
        error: videoError,
      }));
    }
  }, []);

  const pause = useCallback(() => {
    videoRef.current?.pause();
  }, []);

  const stop = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    video.pause();
    video.currentTime = 0;
    setState((prev) => ({
      ...prev,
      status: VideoStatus.IDLE,
      currentTime: 0,
    }));
  }, []);

  const seek = useCallback((time: number) => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = time;
    setState((prev) => ({
      ...prev,
      currentTime: time,
    }));
  }, []);

  const togglePlay = useCallback(() => {
    if (state.status === VideoStatus.PLAYING) {
      pause();
    } else {
      play();
    }
  }, [state.status, pause, play]);

  const reload = useCallback(() => {
    videoRef.current?.load();
  }, []);

  // ==================== 显示控制 ====================

  const enterFullscreen = useCallback(async () => {
    logger.info('Enter fullscreen');
  }, []);

  const exitFullscreen = useCallback(async () => {
    logger.info('Exit fullscreen');
  }, []);

  const toggleFullscreen = useCallback(async () => {
    logger.info('Toggle fullscreen');
  }, []);

  const enterPictureInPicture = useCallback(async () => {
    const video = videoRef.current;
    if (!video) return;
    try {
      if (typeof window !== 'undefined' && 'requestPictureInPicture' in video) {
        await (video as any).requestPictureInPicture();
        setState((prev) => ({
          ...prev,
          isPictureInPicture: true,
        }));
      }
    } catch (error) {
      logger.error('Failed to enter picture-in-picture:', error);
    }
  }, []);

  const exitPictureInPicture = useCallback(async () => {
    const video = videoRef.current;
    if (!video) return;
    try {
      if (typeof window !== 'undefined' && document.pictureInPictureElement) {
        await document.exitPictureInPicture();
        setState((prev) => ({
          ...prev,
          isPictureInPicture: false,
        }));
      }
    } catch (error) {
      logger.error('Failed to exit picture-in-picture:', error);
    }
  }, []);

  const togglePictureInPicture = useCallback(async () => {
    if (state.isPictureInPicture) {
      await exitPictureInPicture();
    } else {
      await enterPictureInPicture();
    }
  }, [state.isPictureInPicture, exitPictureInPicture, enterPictureInPicture]);

  // ==================== 音频控制 ====================

  const setVolume = useCallback((volume: number) => {
    const video = videoRef.current;
    const clampedVolume = Math.max(0, Math.min(1, volume));
    const muted = clampedVolume === 0;
    if (video) {
      video.volume = clampedVolume;
      video.muted = muted;
    }
    setState((prev) => ({
      ...prev,
      volume: clampedVolume,
      muted,
    }));
  }, []);

  const toggleMute = useCallback(() => {
    const video = videoRef.current;
    const newMuted = !state.muted;
    if (video) {
      video.muted = newMuted;
      if (newMuted) {
        video.volume = 0;
      }
    }
    setState((prev) => ({
      ...prev,
      muted: newMuted,
      volume: newMuted ? 0 : prev.volume || 0.8,
    }));
  }, [state.muted]);

  const setPlaybackRate = useCallback((rate: PlaybackRate) => {
    const video = videoRef.current;
    if (video) {
      video.playbackRate = rate;
    }
    setState((prev) => ({
      ...prev,
      playbackRate: rate,
    }));
  }, []);

  // ==================== 状态管理 ====================

  const getState = useCallback(() => state, [state]);

  const setSource = useCallback(
    (newSrc: VideoSource | VideoSource[] | string) => {
      const normalizedSources = normalizeSources(newSrc);
      setSources(normalizedSources);
      setCurrentSourceIndex(0);
      if (normalizedSources.length > 0) {
        setState((prev) => ({
          ...prev,
          currentSource: normalizedSources[0],
        }));
      }
      reload();
    },
    [normalizeSources, reload],
  );

  // ==================== 高级功能 ====================

  const getScreenshot = useCallback(async (): Promise<string | null> => {
    if (typeof window === 'undefined') return null;
    const video = videoRef.current;
    if (!video) return null;
    try {
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      if (!ctx) return null;
      ctx.drawImage(video as any as CanvasImageSource, 0, 0, canvas.width, canvas.height);
      return canvas.toDataURL('image/png');
    } catch (error) {
      logger.error('Failed to get screenshot:', error);
      return null;
    }
  }, []);

  const download = useCallback(() => {
    if (!currentSource) return;
    if (typeof window !== 'undefined') {
      const link = document.createElement('a');
      link.href = currentSource.src;
      link.download = currentSource.title || 'video.mp4';
      link.click();
    }
  }, [currentSource]);

  const showControls = useCallback(() => {
    setState((prev) => ({
      ...prev,
      isControlsVisible: true,
    }));
  }, []);

  const hideControls = useCallback(() => {
    setState((prev) => ({
      ...prev,
      isControlsVisible: false,
    }));
  }, []);

  // 暴露 videoRef 给外部使用
  useEffect(() => {
    if (videoRef.current && initialPlaybackRate) {
      videoRef.current.playbackRate = initialPlaybackRate;
    }
  }, [initialPlaybackRate]);

  return {
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
    getState,
    setSource,
    getScreenshot,
    download,
    showControls,
    hideControls,
    setIsDragging,
    setIsOptionsMenuVisible,
    setCurrentAdIndex,
    setAdRemainingTime,
    setAdCanSkip,
  };
}
