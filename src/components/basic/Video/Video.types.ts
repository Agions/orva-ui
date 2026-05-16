/**
 * Video 组件类型定义
 * @module components/basic/Video/types
 */

import type { CSSProperties, ReactNode } from 'react';
import type { BaseProps } from '@/types/component';

// ==================== 基础枚举 ====================

export enum VideoSize {
  XS = 'xs',
  SM = 'sm',
  MD = 'md',
  LG = 'lg',
  XL = 'xl',
}

export enum VideoVariant {
  DEFAULT = 'default',
  FILLED = 'filled',
  OUTLINE = 'outline',
}

export enum VideoStatus {
  IDLE = 'idle',
  LOADING = 'loading',
  PLAYING = 'playing',
  PAUSED = 'paused',
  ENDED = 'ended',
  ERROR = 'error',
  WAITING = 'waiting',
}

export enum PlayMode {
  INLINE = 'inline',
  FULLSCREEN = 'fullscreen',
  PICTURE_IN_PICTURE = 'picture-in-picture',
}

export enum LoopMode {
  NONE = 'none',
  OFF = 'off',
  ONE = 'one',
  ALL = 'all',
}

export enum PlaybackRate {
  SLOWEST = 0.25,
  SLOW = 0.5,
  NORMAL = 1,
  FAST = 1.25,
  FASTER = 1.5,
  FASTEST = 2,
}

export enum VideoErrorCode {
  UNKNOWN = 1000,
  MEDIA_ERR_ABORTED = 1001,
  MEDIA_ERR_NETWORK = 1002,
  MEDIA_ERR_DECODE = 1003,
  MEDIA_ERR_SRC_NOT_SUPPORTED = 1004,
  PERMISSION_DENIED = 1005,
}

// ==================== 类型定义 ====================

export interface VideoSource {
  src: string;
  title?: string;
  description?: string;
  poster?: string;
}

export interface VideoError {
  code: VideoErrorCode;
  message: string;
  originalError?: unknown;
}

export interface VideoChapter {
  id: string;
  title: string;
  startTime: number;
  endTime: number;
  /** @deprecated Use startTime */
  time?: number;
  description?: string;
}

export interface VideoAd {
  id: string;
  title: string;
  description?: string;
  poster?: string;
  image?: string;
  link?: string;
  duration: number;
  skipAfter?: number;
  onClick?: (ad: VideoAd) => void;
}

export interface VideoWatermark {
  content: string;
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center';
  style?: CSSProperties;
  opacity?: number;
  fontSize?: number;
  rotate?: number;
}

export interface VideoControlsConfig {
  show?: boolean;
  showPlayButton?: boolean;
  showProgressBar?: boolean;
  showTime?: boolean;
  showVolume?: boolean;
  showFullscreen?: boolean;
  showPlaybackRate?: boolean;
  showPictureInPicture?: boolean;
  showSettings?: boolean;
  showChapters?: boolean;
}

// ==================== 视频状态 ====================

export interface VideoState {
  status: VideoStatus;
  mode: PlayMode;
  currentTime: number;
  duration: number;
  buffered: number;
  volume: number;
  muted: boolean;
  playbackRate: number;
  isFullscreen: boolean;
  isPictureInPicture: boolean;
  videoWidth: number;
  videoHeight: number;
  width?: number;
  loaded: number;
  error?: VideoError;
  currentSource?: VideoSource;
  currentChapter?: VideoChapter;
  isDragging: boolean;
  isControlsVisible: boolean;
  isOptionsMenuVisible: boolean;
}

// ==================== Ref 方法 ====================

export interface VideoMethods {
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

  // 状态获取
  getState: () => VideoState;
  setSource: (src: VideoSource | VideoSource[] | string) => void;

  // 高级功能
  getScreenshot: () => Promise<string | null>;
  download: () => void;
  showControls: () => void;
  hideControls: () => void;
}

/** @deprecated Use VideoMethods instead */
export type VideoRef = VideoMethods;

// ==================== Props ====================

export interface VideoProps {
  // 视频源
  src: VideoSource | VideoSource[] | string;
  poster?: string;

  // 播放控制
  autoPlay?: boolean;
  loop?: LoopMode;
  preload?: 'none' | 'metadata' | 'auto';
  initialTime?: number;
  playbackRate?: PlaybackRate;

  // 音频
  volume?: number;
  muted?: boolean;

  // 显示
  size?: VideoSize;
  variant?: VideoVariant;
  controls?: boolean | VideoControlsConfig;
  showCenterPlayButton?: boolean;
  showPoster?: boolean;
  showControls?: boolean;
  showAd?: boolean;
  showChapterMarkers?: boolean;
  controlsAutoHideDelay?: number;
  posterStyle?: CSSProperties;

  // 功能
  allowFullscreen?: boolean;
  allowPictureInPicture?: boolean;
  allowDownload?: boolean;
  allowScreenshot?: boolean;
  downloadUrl?: string;

  // 高级功能
  chapters?: VideoChapter[];
  ads?: VideoAd[];
  watermark?: VideoWatermark;

  // 自定义渲染
  renderPoster?: () => ReactNode;
  renderLoading?: () => ReactNode;
  renderError?: (error: VideoError) => ReactNode;
  renderEnded?: () => ReactNode;

  // 事件
  onLoadStart?: (state: VideoState) => void;
  onLoadedMetadata?: (state: VideoState) => void;
  onPlay?: (state: VideoState) => void;
  onPause?: (state: VideoState) => void;
  onEnded?: (state: VideoState) => void;
  onWaiting?: (state: VideoState) => void;
  onTimeUpdate?: (state: VideoState) => void;
  onError?: (error: VideoError, state: VideoState) => void;
  onFullscreenChange?: (isFullscreen: boolean, state: VideoState) => void;
  onPictureInPictureChange?: (isPictureInPicture: boolean, state: VideoState) => void;
  onChapterChange?: (chapter: VideoChapter, state: VideoState) => void;
  onAdStart?: (ad: VideoAd, state: VideoState) => void;
  onAdEnd?: (ad: VideoAd, state: VideoState) => void;
  onAdSkip?: (ad: VideoAd, state: VideoState) => void;
  onAdEnded?: (ad: VideoAd, state: VideoState) => void;
  onSeeked?: (state: VideoState) => void;
  onVolumeChange?: (volume: number) => void;
  onScreenshot?: (dataUrl: string) => void;
  onDownload?: () => void;
  onControlsVisible?: () => void;
  onControlsHidden?: () => void;
  onControlsShow?: (state: VideoState) => void;
  onControlsHide?: (state: VideoState) => void;
  onClick?: (state: VideoState) => void;

  // 样式
  className?: string;
  style?: CSSProperties;
  videoStyle?: CSSProperties;
  videoClassName?: string;

  // 可访问性
  ariaLabel?: string;
}

// ==================== 子组件 Props ====================

export interface VideoPlayerProps extends BaseProps {
  src: string;
  poster?: string;
  muted: boolean;
  loop: boolean;
  playbackRate: number;
  preload: 'none' | 'metadata' | 'auto';
  onLoadedMetadata: (duration: number, width: number, height: number) => void;
  onPlay: () => void;
  onPause: () => void;
  onEnded: () => void;
  onWaiting: () => void;
  onTimeUpdate: (currentTime: number, buffered: number) => void;
  onError: (error: VideoError) => void;
  onFullscreenChange: (isFullscreen: boolean) => void;
  onEnterPictureInPicture: () => void;
  onLeavePictureInPicture: () => void;
  videoStyle?: CSSProperties;
  videoClassName?: string;
}

export interface VideoControlsProps extends BaseProps {
  state?: VideoState;
  isDragging: boolean;
  isOptionsMenuVisible: boolean;
  config?: VideoControlsConfig;
  isPlaying?: boolean;
  showControls?: boolean;
  currentTime?: number;
  duration?: number;
  buffered?: number;
  volume?: number;
  muted?: boolean;
  playbackRate?: number;
  loop?: boolean;
  isFullscreen?: boolean;
  isPictureInPicture?: boolean;
  onPlayPause: () => void;
  onSeek: (time: number) => void;
  onVolumeChange: (volume: number) => void;
  onToggleMute?: () => void;
  onToggleFullscreen?: () => void;
  onTogglePictureInPicture?: () => void;
  onSetPlaybackRate?: (rate: PlaybackRate) => void;
  onToggleOptionsMenu?: () => void;
  onProgressClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  onProgressDragStart?: () => void;
  onProgressDrag?: (event: any) => void;
  onProgressDragEnd?: () => void;
  onVolumeClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  onChapterClick?: (startTime: number) => void;
  onMuteToggle?: () => void;
  onPlaybackRateChange?: (rate: PlaybackRate) => void;
  onLoopToggle?: () => void;
  onFullscreenToggle?: () => void;
  onPictureInPictureToggle?: () => void;
  onOptionsMenuToggle?: () => void;
  onScreenshot?: () => void;
  onDownload?: () => void;
  onMenuClose?: () => void;
}

export interface VideoOverlayProps extends BaseProps {
  status: VideoStatus;
  error?: VideoError;
  isLoading?: boolean;
  isEnded?: boolean;
  showCenterPlayButton?: boolean;
  showControls?: boolean;
  showEnded?: boolean;
  showPoster?: boolean;
  poster?: string;
  posterStyle?: CSSProperties;
  onPlay: () => void;
  onReload: () => void;
  onRetry?: () => void;
  onEndedClick?: () => void;
  renderLoading?: () => ReactNode;
  renderError?: (error: VideoError) => ReactNode;
  renderEnded?: () => ReactNode;
}

export interface VideoAdProps extends BaseProps {
  ad?: VideoAd;
  currentIndex?: number;
  totalAds?: number;
  remainingTime?: number;
  canSkip?: boolean;
  visible?: boolean;
  ads?: VideoAd[];
  adRemainingTime?: number;
  adCanSkip?: boolean;
  currentAdIndex?: number;
  onAdSkip?: () => void;
  onAdClick?: () => void;
  onAdEnded?: () => void;
  onClick?: () => void;
  onSkip?: () => void;
}

export interface VideoChapterMarkersProps extends BaseProps {
  chapters: VideoChapter[];
  currentTime: number;
  duration: number;
  currentChapter?: VideoChapter;
  visible?: boolean;
  onChapterClick?: (startTime: number) => void;
  onChapterSelect?: (chapter: VideoChapter) => void;
  onMenuClose?: () => void;
}
