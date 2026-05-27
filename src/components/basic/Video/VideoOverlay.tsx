/**
 * 视频覆盖层组件 (VideoOverlay)
 * @module components/basic/Video/VideoOverlay
 * @description 处理加载状态、错误状态、结束状态等覆盖层显示
 * @example
 * ```tsx
 * <VideoOverlay status="loading" error={null} onRetry={() => {}} />
 * ```
 */

import { useCallback } from 'react';
import { View, Text } from '@tarojs/components';
import type { VideoOverlayProps, VideoError } from './Video.types';
import { VideoStatus, VideoErrorCode } from './Video.types';
import { createComponent } from '@/utils/createComponent';
import { useTheme } from '@/hooks/ui/useTheme';
import { useAccessibility, ARIA_ROLES, ARIA_LABELS } from '@/hooks/ui/useAccessibility';

export const VideoOverlay = createComponent<VideoOverlayProps, HTMLDivElement>({
  name: 'VideoOverlay',

  defaultProps: {
    status: VideoStatus.IDLE as VideoStatus,
    showControls: true,
  },

  render: (props, ref) => {
    const {
      status,
      error,
      showControls: _showControls,
      showEnded,
      showPoster,
      poster,
      posterStyle,
      onRetry,
      onEndedClick,
    } = props;

    const theme = useTheme();
    const a11y = useAccessibility({
      role: ARIA_ROLES.alert,
      label: ARIA_LABELS.videoStatus,
    });

    // 判断是否显示覆盖层
    const showLoading = status === (VideoStatus.LOADING as VideoStatus) || status === (VideoStatus.WAITING as VideoStatus);
    const _showError = status === (VideoStatus.ERROR as VideoStatus) && error;
    const showEndedState = showEnded && status === (VideoStatus.ENDED as VideoStatus);
    const showPosterState = showPoster && status === (VideoStatus.IDLE as VideoStatus) && !showLoading;

    const handleRetry = useCallback(() => {
      onRetry?.();
    }, [onRetry]);

    const handleEndedClickFn = useCallback(() => {
      onEndedClick?.();
    }, [onEndedClick]);

    // ===== 模块级静态样式 =====
    const overlayBaseStyle = {
      position: 'absolute' as const,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      display: 'flex' as const,
      flexDirection: 'column' as const,
      alignItems: 'center' as const,
      justifyContent: 'center' as const,
      zIndex: 5,
    };

    const loadingOverlayStyle = {
      ...overlayBaseStyle,
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
    };

    const errorOverlayStyle = {
      ...overlayBaseStyle,
      backgroundColor: 'rgba(0, 0, 0, 0.9)',
    };

    const endedOverlayStyle = {
      ...overlayBaseStyle,
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
    };

    const errorEmojiStyle = { fontSize: 48, marginBottom: 16 };
    const errorTitleStyle = { color: '#fff', fontSize: 16, marginBottom: 8 };
    const errorDescStyle = { color: '#aaa', fontSize: 12, marginBottom: 24, textAlign: 'center' as const };
    const retryButtonStyle = (bg: string) => ({
      padding: '8px 24px',
      backgroundColor: bg,
      borderRadius: 20,
      cursor: 'pointer' as const,
    });
    const retryTextStyle = { color: '#fff', fontSize: 14 };
    const endedEmojiStyle = { fontSize: 48, marginBottom: 16 };
    const endedTitleStyle = { color: '#fff', fontSize: 18, marginBottom: 8 };
    const loadingTextStyle = { marginTop: 16, color: '#fff', fontSize: 14 };
    const loadingSpinnerStyle = (borderColor: string) => ({
      width: 40,
      height: 40,
      border: `4px solid ${borderColor}`,
      borderRadius: '50%',
      borderTopColor: 'transparent',
    });

    // 渲染加载状态
    const renderLoading = () => (
      <View style={loadingOverlayStyle} aria-busy="true" aria-label="Loading video">
        <View style={loadingSpinnerStyle(theme.colors.primary)} />
        <Text style={loadingTextStyle}>
          {status === (VideoStatus.WAITING as VideoStatus) ? '缓冲中...' : '加载中...'}
        </Text>
      </View>
    );

    // 渲染错误状态
    const renderError = () => {
      if (!error) return null;

      const errorMessages: Record<string, string> = {
        [(VideoErrorCode.MEDIA_ERR_ABORTED).toString()]: '视频加载已取消',
        [(VideoErrorCode.MEDIA_ERR_NETWORK).toString()]: '网络连接错误',
        [(VideoErrorCode.MEDIA_ERR_DECODE).toString()]: '视频解码失败',
        [(VideoErrorCode.MEDIA_ERR_SRC_NOT_SUPPORTED).toString()]: '视频源不支持',
        [(VideoErrorCode.PERMISSION_DENIED).toString()]: '播放权限被拒绝',
        [(VideoErrorCode.UNKNOWN).toString()]: '未知错误',
      };

      const errorMessage = errorMessages[(error.code).toString()] || error.message;

      return (
        <View
          style={errorOverlayStyle}
          aria-live="assertive"
          aria-atomic="true"
          {...a11y.getAriaAttributes()}
        >
          <Text style={errorEmojiStyle}>😢</Text>
          <Text style={errorTitleStyle}>视频加载失败</Text>
          <Text style={errorDescStyle}>{errorMessage}</Text>
          <View
            style={retryButtonStyle(theme.colors.primary)}
            onClick={handleRetry}
            role="button"
            aria-label="Retry loading video"
          >
            <Text style={retryTextStyle}>重试</Text>
          </View>
        </View>
      );
    };

    // 渲染结束状态
    const renderEnded = () => (
      <View style={endedOverlayStyle}>
        <Text style={endedEmojiStyle}>🎬</Text>
        <Text style={endedTitleStyle}>视频已结束</Text>
        <View
          style={retryButtonStyle(theme.colors.primary)}
          onClick={handleEndedClickFn}
          role="button"
          aria-label="Replay video"
        >
          <Text style={retryTextStyle}>重新播放</Text>
        </View>
      </View>
    );

    // 渲染海报图
    const renderPoster = () => {
      if (!showPosterState || !poster) return null;

      return (
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            overflow: 'hidden',
            zIndex: 4,
          }}
        >
          <View
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: '#000',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundImage: poster ? `url(${poster})` : undefined,
              ...posterStyle,
            }}
            aria-label="Video poster"
          />
        </View>
      );
    };

    return (
      <View ref={ref} style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, pointerEvents: 'none' }}>
        {renderPoster()}
        {renderLoading()}
        {renderError()}
        {renderEnded()}
      </View>
    );
  },
});

export default VideoOverlay;
