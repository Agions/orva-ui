/**
 * 触摸优化 Button 组件
 * 针对触摸设备优化的按钮交互体验
 */

import React, { useRef, useCallback } from 'react';
import { createComponent } from '@/utils/createComponent';
import type { ButtonProps, ButtonRef } from './Button.types';

/** 触摸手势配置 */
export interface GestureConfig {
  /** 最小滑动距离 (px) */
  minSwipeDistance?: number;
  /** 长按触发时间 (ms) */
  longPressDelay?: number;
  /** 双击触发间隔 (ms) */
  doubleTapInterval?: number;
}

/** 触摸状态 */
export interface TouchState {
  /** 是否正在触摸 */
  isTouching: boolean;
  /** 触摸开始时间 */
  touchStartTime: number;
  /** 触摸开始位置 */
  touchStartX: number;
  /** 触摸开始位置 Y */
  touchStartY: number;
  /** 是否触发长按 */
  isLongPress: boolean;
  /** 是否触发双击 */
  isDoubleTap: boolean;
}

/** 触摸优化 Hook */
export function useTouchOptimization(options: GestureConfig = {}) {
  const {
    minSwipeDistance = 50,
    longPressDelay = 500,
    doubleTapInterval = 300,
  } = options;

  const touchState = useRef<TouchState>({
    isTouching: false,
    touchStartTime: 0,
    touchStartX: 0,
    touchStartY: 0,
    isLongPress: false,
    isDoubleTap: false,
  });

  const lastTapTime = useRef<number>(0);
  const longPressTimer = useRef<NodeJS.Timeout | null>(null);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    const touch = e.touches[0];
    if (!touch) return;
    
    touchState.current = {
      isTouching: true,
      touchStartTime: Date.now(),
      touchStartX: touch.clientX,
      touchStartY: touch.clientY,
      isLongPress: false,
      isDoubleTap: false,
    };

    // 设置长按计时器
    longPressTimer.current = setTimeout(() => {
      touchState.current.isLongPress = true;
    }, longPressDelay);
  }, [longPressDelay]);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }

    const touch = e.changedTouches[0];
    if (!touch) return;

    const touchDuration = Date.now() - touchState.current.touchStartTime;
    const swipeDistance = Math.sqrt(
      Math.pow(touch.clientX - touchState.current.touchStartX, 2) +
      Math.pow(touch.clientY - touchState.current.touchStartY, 2)
    );

    // 检测双击
    const currentTime = Date.now();
    if (currentTime - lastTapTime.current < doubleTapInterval && swipeDistance < 10) {
      touchState.current.isDoubleTap = true;
    }
    lastTapTime.current = currentTime;

    touchState.current.isTouching = false;

    return {
      swipeDistance,
      touchDuration,
      isSwipe: swipeDistance > minSwipeDistance,
    };
  }, [minSwipeDistance, doubleTapInterval]);

  return {
    touchState: touchState.current,
    handleTouchStart,
    handleTouchEnd,
  };
}

// 简化的 TouchOptimizedButton 组件
export const TouchOptimizedButton = createComponent<ButtonProps & { gestureConfig?: GestureConfig }, ButtonRef>({
  name: 'TouchOptimizedButton',

  defaultProps: {
    type: 'default',
    size: 'md',
    variant: 'solid',
    disabled: false,
    loading: false,
    block: false,
    iconPosition: 'left',
    flat: false,
    gestureConfig: {
      minSwipeDistance: 50,
      longPressDelay: 500,
      doubleTapInterval: 300,
    },
  },

  render: () => {
    // 简单的占位实现 - 实际应委托给主 Button 组件
    return null;
  },
});

TouchOptimizedButton.displayName = 'TouchOptimizedButton';

export default TouchOptimizedButton;