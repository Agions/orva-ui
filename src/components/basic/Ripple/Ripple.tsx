/**
 * 水波纹动效组件 (Ripple)
 * @module components/basic/Ripple
 * @description 实现 Material Design 风格的水波纹触觉反馈效果，常用于按钮点击反馈
 * @example
 * ```tsx
 * import { Ripple } from 'orva-ui';
 *
 * <Ripple color="rgba(255,255,255,0.3)">
 *   <Button>点击我</Button>
 * </Ripple>
 * ```
 */

import { useState, useCallback, useRef, useImperativeHandle } from 'react';
import { View } from '@tarojs/components';
import type { ITouchEvent } from '@tarojs/components';

import { createComponent } from '@/utils/createComponent';
import { useTheme } from '@/hooks/ui/useTheme';
import type { RippleProps, RippleRef, RippleWave } from './Ripple.types';

let rippleId = 0;

function generateRippleId(): number {
  rippleId += 1;
  return rippleId;
}

export const Ripple = createComponent<RippleProps, RippleRef>({
  name: 'Ripple',

  defaultProps: {
    disabled: false,
    opacity: 0.2,
    duration: 600,
    size: 200,
    center: false,
    triggerOnPress: true,
  },

  render: (props, ref) => {
    const {
      disabled = false,
      color,
      opacity = 0.2,
      duration = 600,
      size = 200,
      center = false,
      triggerOnPress = true,
      children,
      style,
      className = '',
      onClick,
      onTouchStart,
      ...rest
    } = props;

    const { theme } = useTheme();
    const containerRef = useRef<{ width: number; height: number; left: number; top: number } | null>(null);
    const [ripples, setRipples] = useState<RippleWave[]>([]);

    const rippleColor = color || theme.colors.textInverse || '#ffffff';

    const addRipple = useCallback(
      (x: number, y: number) => {
        if (disabled) return;

        const newRipple: RippleWave = {
          id: generateRippleId(),
          x,
          y,
          size: size,
          opacity,
          duration,
        };

        setRipples((prev) => [...prev, newRipple]);

        // 自动清除
        setTimeout(() => {
          setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
        }, duration + 100);
      },
      [disabled, size, opacity, duration],
    );

    const handleTouchStart = useCallback(
      (e: ITouchEvent) => {
        if (triggerOnPress && !disabled) {
          const touch = e.touches?.[0];
          if (touch) {
            addRipple(touch.clientX, touch.clientY);
          } else if (center) {
            // 中心波纹
            addRipple(0, 0);
          }
        }
        onTouchStart?.(e);
      },
      [triggerOnPress, disabled, center, addRipple, onTouchStart],
    );

    const handleClick = useCallback(
      (e: ITouchEvent) => {
        if (triggerOnPress && !disabled) {
          const detail = e.detail || {};
          if (detail.x !== undefined && detail.y !== undefined) {
            addRipple(detail.x, detail.y);
          } else if (center) {
            addRipple(0, 0);
          }
        }
        onClick?.(e);
      },
      [triggerOnPress, disabled, center, addRipple, onClick],
    );

    const clearRipples = useCallback(() => {
      setRipples([]);
    }, []);

    // 暴露 ref 方法
    useImperativeHandle(ref, () => ({
      trigger: (x, y) => {
        addRipple(x ?? 0, y ?? 0);
      },
      clear: clearRipples,
    }));

    const containerStyle: Record<string, string | number> = {
      position: 'relative',
      overflow: 'hidden',
      ...((style || {}) as Record<string, string | number>),
    };

    return (
      <View
        style={containerStyle}
        className={className}
        onClick={handleClick}
        onTouchStart={handleTouchStart}
        {...rest}
      >
        {children}
        {ripples.map((ripple) => (
          <View
            key={ripple.id}
            style={{
              position: 'absolute',
              left: center ? '50%' : ripple.x - ripple.size / 2,
              top: center ? '50%' : ripple.y - ripple.size / 2,
              width: ripple.size,
              height: ripple.size,
              borderRadius: '50%',
              backgroundColor: rippleColor,
              opacity: 0,
              transform: center ? 'translate(-50%, -50%) scale(0)' : 'scale(0)',
              animation: `ripple-spread ${ripple.duration}ms ease-out`,
              pointerEvents: 'none',
            }}
          />
        ))}
      </View>
    );
  },
});

Ripple.displayName = 'Ripple';

export default Ripple;
