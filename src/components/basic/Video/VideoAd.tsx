/**
 * VideoAd 组件 - 视频广告
 * 处理视频广告播放、倒计时、跳过等功能
 * @module components/basic/Video/VideoAd
 */

import { useCallback, useEffect, useRef } from 'react';
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
      role: (ARIA_ROLES as any).alert || 'alert',
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

    // 如果不可见或没有广告，不渲染
    if (!visible || !currentAd || (currentAdIndex ?? -1) < 0) {
      return null;
    }

    return (
      <View
        ref={ref}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: '#000',
          zIndex: 20,
          display: 'flex',
          flexDirection: 'column',
        }}
        {...a11y.getAriaAttributes()}
      >
        {/* 广告内容区域 */}
        <View
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
          onClick={handleAdClickFn}
          role="button"
          aria-label="Advertisement content"
        >
          {/* 广告图片或视频 */}
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
            <View style={{ color: '#fff', textAlign: 'center' }}>
              <Text style={{ fontSize: 48 }}>📺</Text>
              <Text style={{ marginTop: 16, fontSize: 18 }}>广告</Text>
              <Text style={{ marginTop: 8, color: '#aaa', fontSize: 12 }}>
                {currentAd.title || '精彩广告'}
              </Text>
            </View>
          )}
        </View>

        {/* 广告控制区域 */}
        <View
          style={{
            padding: 16,
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          {/* 广告信息 */}
          <View>
            <Text style={{ color: '#fff', fontSize: 14, fontWeight: 'bold' }}>
              {currentAd.title || '广告'}
            </Text>
            {currentAd.description && (
              <Text style={{ color: '#aaa', fontSize: 12, marginTop: 4 }}>
                {currentAd.description}
              </Text>
            )}
          </View>

          {/* 倒计时和跳过按钮 */}
          <View style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            {/* 倒计时显示 */}
            {!adCanSkip && (adRemainingTime ?? 0) > 0 && (
              <Text style={{ color: '#fff', fontSize: 14 }}>
                跳过广告 <Text style={{ color: theme.colors.primary }}>{adRemainingTime}</Text> 秒后
              </Text>
            )}

            {/* 跳过按钮 */}
            {adCanSkip && (
              <View
                style={{
                  padding: '6px 16px',
                  backgroundColor: theme.colors.primary,
                  borderRadius: 20,
                  cursor: 'pointer',
                }}
                onClick={handleSkip}
                role="button"
                aria-label="Skip advertisement"
              >
                <Text style={{ color: '#fff', fontSize: 14 }}>跳过广告</Text>
              </View>
            )}
          </View>
        </View>

        {/* 广告进度条 */}
        {currentAd.duration && (
          <View style={{ height: 4, backgroundColor: 'rgba(255, 255, 255, 0.2)' }}>
            <View
              style={{
                height: '100%',
                width: `${((currentAd.duration - (adRemainingTime ?? 0)) / currentAd.duration) * 100}%`,
                backgroundColor: theme.colors.primary,
                transition: 'width 1s linear',
              }}
            />
          </View>
        )}
      </View>
    );
  },
});

export default VideoAd;
