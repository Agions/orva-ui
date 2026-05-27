/**
 * 视频广告组件 (VideoAd)
 * @module components/basic/Video/VideoAd
 * @description 处理视频广告播放、倒计时、跳过等功能
 * @example
 * ```tsx
 * <VideoAd
 *   adSrc="https://example.com/ad.mp4"
 *   duration={15}
 *   onSkip={() => {}}
 *   onEnd={() => {}}
 * />
 * ```
 */

import { useCallback, useEffect, useRef, useMemo } from 'react';
import { View, Text } from '@tarojs/components';
import type { VideoAdProps, VideoAd as VideoAdType } from './Video.types';
import { createComponent } from '@/utils/createComponent';
import { useTheme } from '@/hooks/ui/useTheme';
import { useAccessibility, ARIA_ROLES, ARIA_LABELS } from '@/hooks/ui/useAccessibility';

export const VideoAd = createComponent<VideoAdProps, HTMLDivElement>({
  name: 'VideoAd',

  defaultProps: {
    visible: false,
    currentAdIndex: -1,
    adRemainingTime: 0,
    adCanSkip: false,
  },

  render: (props, ref) => {
    const {
      visible,
      currentAdIndex,
      adRemainingTime,
      adCanSkip,
      ads,
      onAdSkip,
      onAdClick,
      onAdEnded,
    } = props;

    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const theme = useTheme();
    const a11y = useAccessibility({
      role: ARIA_ROLES.alert,
      label: ARIA_LABELS.videoAd,
    });

    const currentAd = ads?.[currentAdIndex ?? -1];

    // 倒计时效果
    useEffect(() => {
      if ((adRemainingTime ?? 0) > 0 && !adCanSkip) {
        timerRef.current = setTimeout(() => {
          // 倒计时逻辑由父组件通过 props 传递
        }, 1000);
      }
      return () => {
        if (timerRef.current) {
          clearTimeout(timerRef.current);
        }
      };
    }, [adRemainingTime, adCanSkip]);

    const handleSkip = useCallback(() => {
      onAdSkip?.();
    }, [onAdSkip]);

    const handleAdClickFn = useCallback(() => {
      onAdClick?.();
    }, [onAdClick]);

    const _handleAdEnded = useCallback(() => {
      onAdEnded?.();
    }, [onAdEnded]);

    // ===== 模块级静态样式 =====
    const adContainerStyle = useMemo(() => ({
      position: 'absolute' as const,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: '#000',
      zIndex: 20,
      display: 'flex' as const,
      flexDirection: 'column' as const,
    }), []);

    const adContentStyle = useMemo(() => ({
      flex: 1,
      display: 'flex' as const,
      alignItems: 'center' as const,
      justifyContent: 'center' as const,
      cursor: 'pointer' as const,
    }), []);

    const adFallbackTextStyle = { color: '#fff', textAlign: 'center' as const };
    const adFallbackEmojiStyle = { fontSize: 48 };
    const adFallbackTitleStyle = { marginTop: 16, fontSize: 18 };
    const adFallbackDescStyle = { marginTop: 8, color: '#aaa', fontSize: 12 };

    const adControlBarStyle = useMemo(() => ({
      padding: 16,
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      display: 'flex' as const,
      justifyContent: 'space-between' as const,
      alignItems: 'center' as const,
    }), []);

    const adTitleStyle = { color: '#fff', fontSize: 14, fontWeight: 'bold' as const };
    const adDescStyle = { color: '#aaa', fontSize: 12, marginTop: 4 };
    const adControlRightStyle = { display: 'flex', alignItems: 'center', gap: 12 };
    const adCountdownStyle = { color: '#fff', fontSize: 14 };
    const adCountdownHighlightStyle = { color: theme.colors.primary };
    const adSkipButtonStyle = useMemo(() => ({
      padding: '6px 16px',
      backgroundColor: theme.colors.primary,
      borderRadius: 20,
      cursor: 'pointer' as const,
    }), [theme.colors.primary]);
    const adSkipTextStyle = { color: '#fff', fontSize: 14 };
    const adProgressBarStyle = { height: 4, backgroundColor: 'rgba(255, 255, 255, 0.2)' };
    const adProgressFillStyle = (pct: number) => ({
      height: '100%',
      width: `${pct}%`,
      backgroundColor: theme.colors.primary,
      transition: 'width 1s linear',
    });

    // 如果不可见或没有广告，不渲染
    if (!visible || !currentAd || (currentAdIndex ?? -1) < 0) {
      return null;
    }

    return (
      <View ref={ref} style={adContainerStyle} {...a11y.getAriaAttributes()}>
        {/* 广告内容区域 */}
        <View style={adContentStyle} onClick={handleAdClickFn} role="button" aria-label="Advertisement content">
          {currentAd.image ? (
            <View
              style={{
                width: '100%',
                height: '100%',
                backgroundColor: '#1a1a1a',
                backgroundSize: 'contain',
                backgroundPosition: 'center',
                backgroundImage: `url(${currentAd.image})`,
              }}
            />
          ) : (
            <View style={adFallbackTextStyle}>
              <Text style={adFallbackEmojiStyle}>📺</Text>
              <Text style={adFallbackTitleStyle}>广告</Text>
              <Text style={adFallbackDescStyle}>{currentAd.title || '精彩广告'}</Text>
            </View>
          )}
        </View>

        {/* 广告控制区域 */}
        <View style={adControlBarStyle}>
          <View>
            <Text style={adTitleStyle}>{currentAd.title || '广告'}</Text>
            {currentAd.description && <Text style={adDescStyle}>{currentAd.description}</Text>}
          </View>
          <View style={adControlRightStyle}>
            {!adCanSkip && (adRemainingTime ?? 0) > 0 && (
              <Text style={adCountdownStyle}>
                跳过广告 <Text style={adCountdownHighlightStyle}>{adRemainingTime}</Text> 秒后
              </Text>
            )}
            {adCanSkip && (
              <View style={adSkipButtonStyle} onClick={handleSkip} role="button" aria-label="Skip advertisement">
                <Text style={adSkipTextStyle}>跳过广告</Text>
              </View>
            )}
          </View>
        </View>

        {/* 广告进度条 */}
        {currentAd.duration && (
          <View style={adProgressBarStyle}>
            <View style={adProgressFillStyle(((currentAd.duration - (adRemainingTime ?? 0)) / currentAd.duration) * 100)} />
          </View>
        )}
      </View>
    );
  },
});

export default VideoAd;
