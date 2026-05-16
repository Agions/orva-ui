/**
 * VideoControls 组件 - 视频控制栏
 * 包含播放/暂停、进度条、音量、倍速等控制功能
 * @module components/basic/Video/VideoControls
 */

import { useCallback, useState } from 'react';
import { View, Text, Slider } from '@tarojs/components';
import type { VideoControlsProps, PlaybackRate } from './Video.types';
import { createComponent } from '@/utils/createComponent';
import { useTheme } from '@/hooks/ui/useTheme';
import { useAccessibility, ARIA_ROLES, ARIA_LABELS } from '@/hooks/ui/useAccessibility';
import { formatTime } from './utils';

export const VideoControls = createComponent<VideoControlsProps, HTMLDivElement>({
  name: 'VideoControls',

  defaultProps: {
    isPlaying: false,
    isDragging: false,
    isOptionsMenuVisible: false,
    showControls: true,
    loop: false,
  },

  render: (props, ref) => {
    const {
      isPlaying,
      isDragging,
      isOptionsMenuVisible: _isOptionsMenuVisible,
      showControls,
      currentTime,
      duration,
      buffered,
      volume,
      muted,
      playbackRate,
      loop,
      isFullscreen,
      isPictureInPicture,
      onPlayPause,
      onSeek,
      onVolumeChange,
      onMuteToggle,
      onPlaybackRateChange,
      onLoopToggle,
      onFullscreenToggle,
      onPictureInPictureToggle,
      onOptionsMenuToggle,
      onScreenshot,
      onDownload,
      onMenuClose,
    } = props;

    const theme = useTheme();
    const a11y = useAccessibility({
      role: ARIA_ROLES.toolbar,
      label: ARIA_LABELS.videoControls,
    });

    const [showVolumeSlider, setShowVolumeSlider] = useState(false);
    const [showRatePicker, setShowRatePicker] = useState(false);

    // 计算进度百分比
    const progressPercent = (duration ?? 0) > 0 ? ((currentTime ?? 0) / (duration ?? 1)) * 100 : 0;
    const bufferPercent = (duration ?? 0) > 0 ? ((buffered ?? 0) / (duration ?? 1)) * 100 : 0;

    const handlePlayPause = useCallback(() => {
      onPlayPause?.();
    }, [onPlayPause]);

    const handleSeek = useCallback(
      (value: number) => {
        if (isDragging) return;
        const newTime = (value / 100) * (duration ?? 0);
        onSeek?.(newTime);
      },
      [isDragging, duration, onSeek],
    );

    const handleVolumeChange = useCallback(
      (value: number) => {
        const newVolume = value / 100;
        onVolumeChange?.(newVolume);
      },
      [onVolumeChange],
    );

    const handleMuteToggle = useCallback(() => {
      onMuteToggle?.();
    }, [onMuteToggle]);

    const handleRateChange = useCallback(
      (value: string) => {
        const rate = parseFloat(value) as PlaybackRate;
        onPlaybackRateChange?.(rate);
        setShowRatePicker(false);
      },
      [onPlaybackRateChange],
    );

    const handleLoopToggle = useCallback(() => {
      onLoopToggle?.();
    }, [onLoopToggle]);

    const handleFullscreenToggle = useCallback(() => {
      onFullscreenToggle?.();
    }, [onFullscreenToggle]);

    const handlePictureInPictureToggle = useCallback(() => {
      onPictureInPictureToggle?.();
    }, [onPictureInPictureToggle]);

    const handleOptionsMenuToggle = useCallback(() => {
      onOptionsMenuToggle?.();
    }, [onOptionsMenuToggle]);

    const handleScreenshot = useCallback(() => {
      onScreenshot?.();
    }, [onScreenshot]);

    const handleDownload = useCallback(() => {
      onDownload?.();
    }, [onDownload]);

    const _handleMenuClose = useCallback(() => {
      onMenuClose?.();
    }, [onMenuClose]);

    // 获取音量图标
    const getVolumeIcon = () => {
      if (muted || (volume ?? 0) === 0) return '🔇';
      if ((volume ?? 0) < 0.5) return '🔉';
      return '🔊';
    };

    // 获取播放图标
    const getPlayIcon = () => (isPlaying ? '⏸️' : '▶️');

    // 获取全屏图标
    const getFullscreenIcon = () => (isFullscreen ? '⛶' : '⛶');

    // 获取画中画图标
    const getPiPIcon = () => (isPictureInPicture ? '🖼️' : '🖼️');

    return (
      <View
        ref={ref}
        style={{
          position: 'absolute',
          bottom: showControls ? 0 : -60,
          left: 0,
          right: 0,
          padding: 12,
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          transition: 'bottom 0.3s ease',
          zIndex: 10,
        }}
        {...a11y.getAriaAttributes()}
      >
        {/* 进度条 */}
        <View style={{ marginBottom: 12 }}>
          <Slider
            value={progressPercent}
            min={0}
            max={100}
            onChange={(e: any) => handleSeek(e.detail.value)}
            onChanging={(e: any) => handleSeek(e.detail.value)}
            disabled={isDragging}
            blockColor={theme.colors.primary}
            aria-label="Video progress"
          />
          {/* 缓冲进度 */}
          {bufferPercent > 0 && bufferPercent !== progressPercent && (
            <View
              style={{
                position: 'absolute',
                left: 0,
                top: 0,
                height: 4,
                width: `${bufferPercent}%`,
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
              }}
            />
          )}
        </View>

        {/* 控制按钮行 */}
        <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* 左侧控制 */}
          <View style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            {/* 播放/暂停按钮 */}
            <View
              style={{
                padding: 8,
                backgroundColor: 'transparent',
                borderRadius: '50%',
                cursor: 'pointer',
              }}
              onClick={handlePlayPause}
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              <Text style={{ fontSize: 20 }}>{getPlayIcon()}</Text>
            </View>

            {/* 时间显示 */}
            <View style={{ minWidth: 100 }}>
              <Text style={{ color: '#fff', fontSize: 12, fontFamily: 'monospace' }}>
                {formatTime(currentTime ?? 0)} / {formatTime(duration ?? 0)}
              </Text>
            </View>

            {/* 音量控制 - onMouseEnter/onMouseLeave 仅 H5 端有效，Taro 小程序端忽略 */}
            <View
              style={{ display: 'flex', alignItems: 'center', gap: 4 }}
              {...({
                onMouseEnter: () => setShowVolumeSlider(true),
                onMouseLeave: () => setShowVolumeSlider(false),
              } as Record<string, unknown>)}
            >
              <View
                style={{ padding: 4, cursor: 'pointer' }}
                onClick={handleMuteToggle}
                aria-label={muted ? 'Unmute' : 'Mute'}
              >
                <Text style={{ fontSize: 16 }}>{getVolumeIcon()}</Text>
              </View>
              {showVolumeSlider && (
                <View style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <Slider
                    value={(volume ?? 0) * 100}
                    min={0}
                    max={100}
                    onChange={(e: any) => handleVolumeChange(e.detail.value)}
                    onChanging={(e: any) => handleVolumeChange(e.detail.value)}
                    blockColor={theme.colors.primary}
                    aria-label="Volume"
                  />
                </View>
              )}
            </View>

            {/* 倍速按钮 */}
            <View
              style={{ padding: 4, cursor: 'pointer' }}
              onClick={() => setShowRatePicker(!showRatePicker)}
              aria-label="Playback speed"
            >
              <Text style={{ color: '#fff', fontSize: 12, minWidth: 35, textAlign: 'center' }}>
                {playbackRate === 1 ? '1x' : `${playbackRate}x`}
              </Text>
            </View>

            {/* 倍速选择器 */}
            {showRatePicker && (
              <View
                style={{
                  position: 'absolute',
                  bottom: 50,
                  left: 0,
                  backgroundColor: 'rgba(0, 0, 0, 0.9)',
                  borderRadius: 8,
                  padding: 8,
                  minWidth: 80,
                }}
              {...({ onMouseLeave: () => setShowRatePicker(false) } as Record<string, unknown>)}
              >
                {[0.5, 0.75, 1, 1.25, 1.5, 2].map((rate) => (
                  <View
                    key={rate}
                    style={{
                      padding: 8,
                      color: playbackRate === rate ? theme.colors.primary : '#fff',
                      cursor: 'pointer',
                    }}
                    onClick={() => handleRateChange(rate.toString())}
                  >
                    <Text>{rate}x</Text>
                  </View>
                ))}
              </View>
            )}
          </View>

          {/* 右侧控制 */}
          <View style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            {/* 循环按钮 */}
            <View
              style={{
                padding: 4,
                opacity: loop ? 1 : 0.6,
                cursor: 'pointer',
              }}
              onClick={handleLoopToggle}
              aria-label={loop ? 'Disable loop' : 'Enable loop'}
            >
              <Text style={{ fontSize: 16, color: '#fff' }}>🔁</Text>
            </View>

            {/* 截图按钮 */}
            <View
              style={{ padding: 4, cursor: 'pointer' }}
              onClick={handleScreenshot}
              aria-label="Screenshot"
            >
              <Text style={{ fontSize: 16, color: '#fff' }}>📷</Text>
            </View>

            {/* 下载按钮 */}
            <View
              style={{ padding: 4, cursor: 'pointer' }}
              onClick={handleDownload}
              aria-label="Download"
            >
              <Text style={{ fontSize: 16, color: '#fff' }}>⬇️</Text>
            </View>

            {/* 画中画按钮 */}
            <View
              style={{ padding: 4, cursor: 'pointer' }}
              onClick={handlePictureInPictureToggle}
              aria-label={isPictureInPicture ? 'Exit picture-in-picture' : 'Picture-in-picture'}
            >
              <Text style={{ fontSize: 16, color: '#fff' }}>{getPiPIcon()}</Text>
            </View>

            {/* 全屏按钮 */}
            <View
              style={{ padding: 4, cursor: 'pointer' }}
              onClick={handleFullscreenToggle}
              aria-label={isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}
            >
              <Text style={{ fontSize: 16, color: '#fff' }}>{getFullscreenIcon()}</Text>
            </View>

            {/* 菜单按钮 */}
            <View
              style={{ padding: 4, cursor: 'pointer' }}
              onClick={handleOptionsMenuToggle}
              aria-label="Options menu"
            >
              <Text style={{ fontSize: 16, color: '#fff' }}>⋮</Text>
            </View>
          </View>
        </View>
      </View>
    );
  },
});

export default VideoControls;
