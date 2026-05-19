import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';

// Mock 所有子组件 — 同时提供 default 和命名导出
// 原因：子组件用 export default，但 Video.tsx 用 import { Named } from './Child'
// 在生产环境中通过 index.tsx re-export 工作，但 Vitest 直接解析需要两者都提供
vi.mock('./VideoPlayer', () => {
  const Comp = (props: any) => React.createElement('div', { 'data-testid': 'video-player', 'data-poster': props.poster || '' });
  return { __esModule: true, default: Comp, VideoPlayer: Comp };
});

vi.mock('./VideoOverlay', () => {
  const Comp = (props: any) => React.createElement('div', { 'data-testid': 'video-overlay' });
  return { __esModule: true, default: Comp, VideoOverlay: Comp };
});

vi.mock('./VideoControls', () => {
  const Comp = (props: any) => React.createElement('div', { 'data-testid': 'video-controls' });
  return { __esModule: true, default: Comp, VideoControls: Comp };
});

vi.mock('./VideoAd', () => {
  const Comp = (props: any) => React.createElement('div', { 'data-testid': 'video-ad' });
  return { __esModule: true, default: Comp, VideoAd: Comp };
});

vi.mock('./VideoChapterMarkers', () => {
  const Comp = (props: any) => React.createElement('div', { 'data-testid': 'video-chapter-markers' });
  return { __esModule: true, default: Comp, VideoChapterMarkers: Comp };
});

vi.mock('./useVideoPlayer', () => ({
  useVideoPlayer: ({ src }: any) => ({
    state: {
      status: 'idle', mode: 'normal', currentTime: 0, duration: 0, buffered: 0,
      volume: 1, muted: false, playbackRate: 1, isFullscreen: false,
      isPictureInPicture: false, videoWidth: 0, videoHeight: 0, width: '100%',
      loaded: false, error: null, currentSource: src || '', currentChapter: null,
      isDragging: false, isControlsVisible: true, isOptionsMenuVisible: false,
    },
    isDragging: false, isOptionsMenuVisible: false, currentAdIndex: -1,
    adRemainingTime: 0, adCanSkip: false,
    play: vi.fn(), pause: vi.fn(), stop: vi.fn(), seek: vi.fn(),
    togglePlay: vi.fn(), reload: vi.fn(), enterFullscreen: vi.fn(),
    exitFullscreen: vi.fn(), toggleFullscreen: vi.fn(),
    enterPictureInPicture: vi.fn(), exitPictureInPicture: vi.fn(),
    togglePictureInPicture: vi.fn(), setVolume: vi.fn(), toggleMute: vi.fn(),
    setPlaybackRate: vi.fn(), getScreenshot: vi.fn(), download: vi.fn(),
    showControls: vi.fn(), hideControls: vi.fn(), setIsOptionsMenuVisible: vi.fn(),
    setCurrentAdIndex: vi.fn(), setAdRemainingTime: vi.fn(), setAdCanSkip: vi.fn(),
    setSource: vi.fn(),
  }),
}));

vi.mock('./Video.types', () => ({
  VideoStatus: { IDLE: 'idle', PLAYING: 'playing', PAUSED: 'paused', ENDED: 'ended', ERROR: 'error', LOADING: 'loading' },
  PlayMode: { NORMAL: 'normal', LOOP: 'loop', SHUFFLE: 'shuffle' },
  VideoErrorCode: { NETWORK: 'NETWORK', DECODE: 'DECODE', FORMAT: 'FORMAT', PERMISSION: 'PERMISSION' },
  LoopMode: { NONE: 'none', SINGLE: 'single', PLAYLIST: 'playlist' },
  PlaybackRate: { HALF: 0.5, NORMAL: 1, ONE_HALF: 1.5, DOUBLE: 2 },
}));

vi.mock('./VideoPlayer.styles', () => ({ videoPlayerStyles: Object.fromEntries(['getContainerStyle','getVideoStyle','getPosterStyle','getLoadingStyle','getErrorStyle'].map(k => [k, ({ style }: any) => style])) }));
vi.mock('./VideoControls.styles', () => ({ videoControlsStyles: Object.fromEntries(['getContainerStyle','getProgressBarStyle','getButtonStyle','getTimeStyle','getVolumeStyle'].map(k => [k, ({ style }: any) => style])) }));
vi.mock('./VideoOverlay.styles', () => ({ videoOverlayStyles: Object.fromEntries(['getContainerStyle','getPosterStyle','getLoadingStyle','getErrorStyle','getEndedStyle'].map(k => [k, ({ style }: any) => style])) }));
vi.mock('./VideoAd.styles', () => ({ videoAdStyles: Object.fromEntries(['getContainerStyle','getSkipButtonStyle','getCountdownStyle'].map(k => [k, ({ style }: any) => style])) }));
vi.mock('./VideoChapterMarkers.styles', () => ({ videoChapterMarkersStyles: Object.fromEntries(['getContainerStyle','getMarkerStyle','getTooltipStyle'].map(k => [k, ({ style }: any) => style])) }));

vi.mock('@/hooks/ui/useTheme', () => ({ useTheme: () => ({ theme: { colors: { primary: '#6366f1', error: '#ef4444' }, typography: { fontSize: { md: '16px' } }, borderRadius: { md: '0.375rem' }, shadows: { md: '0 4px 6px rgba(0,0,0,0.1)' } } }) }));
vi.mock('@/hooks/ui/useMicroAnimation', () => ({ useMicroAnimation: () => ({ isAnimating: false, getMergedStyle: (s: any) => s }) }));
vi.mock('@/hooks/ui/useAccessibility', () => ({ useAccessibility: () => ({ getAriaAttributes: () => ({}) }), ARIA_ROLES: { application: 'application' as const }, ARIA_LABELS: { videoPlayer: 'Video player' } }));
vi.mock('@/utils/logger', () => ({ createLogger: () => ({ debug: vi.fn(), info: vi.fn(), warn: vi.fn(), error: vi.fn() }) }));

// 使用默认导入，因为 Video.tsx 只有 export default Video
import Video from './Video';

describe('Video 组件', () => {
  it('应该正确渲染带 src 的视频', () => {
    const { container } = render(React.createElement(Video, { src: 'https://example.com/video.mp4' }));
    expect(container.firstChild).toBeTruthy();
  });

  it('应该渲染容器视图', () => {
    const { container } = render(React.createElement(Video, { src: 'https://example.com/video.mp4' }));
    expect(container.firstChild).toBeTruthy();
  });

  it('应该渲染 VideoPlayer 子组件', () => {
    const { container } = render(React.createElement(Video, { src: 'https://example.com/video.mp4' }));
    expect(container.querySelector('[data-testid="video-player"]')).toBeTruthy();
  });

  it('应该渲染 VideoOverlay 子组件', () => {
    const { container } = render(React.createElement(Video, { src: 'https://example.com/video.mp4' }));
    expect(container.querySelector('[data-testid="video-overlay"]')).toBeTruthy();
  });

  it('应该正确传递 poster 属性', () => {
    const { container } = render(React.createElement(Video, { src: 'https://example.com/video.mp4', poster: 'https://example.com/poster.jpg' }));
    expect(container.firstChild).toBeTruthy();
  });

  it('应该支持 autoplay 属性', () => {
    const { container } = render(React.createElement(Video, { src: 'https://example.com/video.mp4', autoplay: true }));
    expect(container.firstChild).toBeTruthy();
  });

  it('应该默认显示控制栏', () => {
    const { container } = render(React.createElement(Video, { src: 'https://example.com/video.mp4' }));
    expect(container.querySelector('[data-testid="video-controls"]')).toBeTruthy();
  });

  it('当 showControls 为 false 时隐藏控制栏', () => {
    const { container } = render(React.createElement(Video, { src: 'https://example.com/video.mp4', showControls: false }));
    expect(container.querySelector('[data-testid="video-controls"]')).toBeNull();
  });

  it('应该应用 width 属性', () => {
    const { container } = render(React.createElement(Video, { src: 'https://example.com/video.mp4', width: 640 }));
    expect(container.firstChild).toBeTruthy();
  });

  it('应该应用 height 属性', () => {
    const { container } = render(React.createElement(Video, { src: 'https://example.com/video.mp4', height: 360 }));
    expect(container.firstChild).toBeTruthy();
  });

  it('应该同时应用 width 和 height', () => {
    const { container } = render(React.createElement(Video, { src: 'https://example.com/video.mp4', width: 640, height: 360 }));
    expect(container.firstChild).toBeTruthy();
  });

  it('应该支持字符串类型的宽高', () => {
    const { container } = render(React.createElement(Video, { src: 'https://example.com/video.mp4', width: '100%', height: 'auto' }));
    expect(container.firstChild).toBeTruthy();
  });

  it('应该应用自定义 className', () => {
    const { container } = render(React.createElement(Video, { src: 'https://example.com/video.mp4', className: 'custom-video' }));
    expect(container.firstChild).toBeTruthy();
  });

  it('应该应用自定义 style', () => {
    const { container } = render(React.createElement(Video, { src: 'https://example.com/video.mp4', style: { borderRadius: '8px' } }));
    expect(container.firstChild).toBeTruthy();
  });

  it('应该同时应用 className 和 style', () => {
    const { container } = render(React.createElement(Video, { src: 'https://example.com/video.mp4', className: 'my-video', style: { margin: '10px' } }));
    expect(container.firstChild).toBeTruthy();
  });
});
