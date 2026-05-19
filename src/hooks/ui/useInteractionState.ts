/**
 * 交互状态管理 Hook
 * 统一处理组件的 hover、focus、active、pressed 状态
 * 支持触摸设备和鼠标设备的自适应
 * @module hooks/ui/useInteractionState
 */

import { useState, useCallback, useRef, useEffect } from 'react';
import type { ITouchEvent } from '@tarojs/components';
import { createLogger } from '../../utils/logger';

/** 交互状态 */
const logger = createLogger('useInteractionState');

export interface InteractionState {
  /** 悬停状态 */
  isHovered: boolean;
  /** 焦点状态 */
  isFocused: boolean;
  /** 激活状态（鼠标按下/触摸开始） */
  isActive: boolean;
  /** 按下状态（深度按下） */
  isPressed: boolean;
  /** 是否被禁用 */
  isDisabled: boolean;
  /** 是否加载中 */
  isLoading: boolean;
}

/** 交互状态管理器返回 */
export interface InteractionHandlers {
  /** 鼠标进入 */
  onMouseEnter: () => void;
  /** 鼠标离开 */
  onMouseLeave: () => void;
  /** 鼠标按下 */
  onMouseDown: () => void;
  /** 鼠标释放 */
  onMouseUp: () => void;
  /** 焦点获得 */
  onFocus: () => void;
  /** 焦点丧失 */
  onBlur: () => void;
  /** 触摸开始 */
  onTouchStart: (e: ITouchEvent) => void;
  /** 触摸结束 */
  onTouchEnd: (e: ITouchEvent) => void;
}

/** 配置选项 */
export interface UseInteractionStateOptions {
  /** 是否禁用悬停 */
  disabledHover?: boolean;
  /** 是否禁用焦点 */
  disabledFocus?: boolean;
  /** 是否禁用激活 */
  disabledActive?: boolean;
  /** 是否禁用按下 */
  disabledPress?: boolean;
  /** 按下延迟时间 (ms) */
  pressDelay?: number;
  /** 按下持续时间阈值 (ms) */
  pressThreshold?: number;
  /** 回调：状态变化 */
  onStateChange?: (state: Partial<InteractionState>) => void;
  /** 回调：按下 */
  onPress?: () => void;
  /** 回调：长按 */
  onLongPress?: () => void;
  /** 长按延迟 (ms) */
  longPressDelay?: number;
}

/**
 * 交互状态管理 Hook
 *
 * @example
 * ```tsx
 * const Button = () => {
 *   const { state, handlers, getInteractionStyle } = useInteractionState({
 *     onPress: () => logger.info('pressed'),
 *     longPressDelay: 500,
 *   });
 *
 *   return (
 *     <View
 *       style={mergeStyles(baseStyle, getInteractionStyle('#a855f7'))}
 *       {...handlers}
 *     >
 *       按钮
 *     </View>
 *   );
 * };
 * ```
 */
export function useInteractionState(options: UseInteractionStateOptions = {}) {
  const {
    disabledHover = false,
    disabledFocus = false,
    disabledActive = false,
    disabledPress = false,
    pressDelay = 0,
    pressThreshold = 150,
    onStateChange,
    onPress,
    onLongPress,
    longPressDelay = 500,
  } = options;

  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const pressTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const longPressTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pressStartTimeRef = useRef<number>(0);

  const updateState = useCallback(
    (newState: Partial<InteractionState>) => {
      onStateChange?.(newState);
    },
    [onStateChange],
  );

  // 鼠标事件
  const handleMouseEnter = useCallback(() => {
    if (!disabledHover) {
      setIsHovered(true);
      updateState({ isHovered: true });
    }
  }, [disabledHover, updateState]);

  const handleMouseLeave = useCallback(() => {
    if (!disabledHover) {
      setIsHovered(false);
      setIsActive(false);
      setIsPressed(false);
      updateState({ isHovered: false, isActive: false, isPressed: false });
    }
  }, [disabledHover, updateState]);

  const handleMouseDown = useCallback(() => {
    if (!disabledActive) {
      setIsActive(true);
      pressStartTimeRef.current = Date.now();
      updateState({ isActive: true });

      // 按下延迟
      if (pressTimerRef.current) clearTimeout(pressTimerRef.current);
      pressTimerRef.current = setTimeout(() => {
        if (!disabledPress) {
          setIsPressed(true);
          updateState({ isPressed: true });
        }
      }, pressDelay);

      // 长按计时
      if (longPressTimerRef.current) clearTimeout(longPressTimerRef.current);
      longPressTimerRef.current = setTimeout(() => {
        onLongPress?.();
      }, longPressDelay);
    }
  }, [disabledActive, disabledPress, pressDelay, longPressDelay, onLongPress, updateState]);

  const handleMouseUp = useCallback(() => {
    const pressDuration = Date.now() - pressStartTimeRef.current;

    if (pressTimerRef.current) {
      clearTimeout(pressTimerRef.current);
      pressTimerRef.current = null;
    }
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current);
      longPressTimerRef.current = null;
    }

    setIsActive(false);
    setIsPressed(false);
    updateState({ isActive: false, isPressed: false });

    // 判断是否触发按下事件
    if (!disabledPress && pressDuration < pressThreshold && onPress) {
      onPress();
    }
  }, [disabledPress, pressThreshold, onPress, updateState]);

  // 焦点事件
  const handleFocus = useCallback(() => {
    if (!disabledFocus) {
      setIsFocused(true);
      updateState({ isFocused: true });
    }
  }, [disabledFocus, updateState]);

  const handleBlur = useCallback(() => {
    if (!disabledFocus) {
      setIsFocused(false);
      setIsActive(false);
      updateState({ isFocused: false, isActive: false });
    }
  }, [disabledFocus, updateState]);

  // 触摸事件
  const handleTouchStart = useCallback(
    (e: ITouchEvent) => {
      if (!disabledActive) {
        setIsActive(true);
        pressStartTimeRef.current = Date.now();
        updateState({ isActive: true });

        if (pressTimerRef.current) clearTimeout(pressTimerRef.current);
        pressTimerRef.current = setTimeout(() => {
          if (!disabledPress) {
            setIsPressed(true);
            updateState({ isPressed: true });
          }
        }, pressDelay);

        if (longPressTimerRef.current) clearTimeout(longPressTimerRef.current);
        longPressTimerRef.current = setTimeout(() => {
          onLongPress?.();
        }, longPressDelay);
      }
    },
    [disabledActive, disabledPress, pressDelay, longPressDelay, onLongPress, updateState],
  );

  const handleTouchEnd = useCallback(
    (e: ITouchEvent) => {
      const pressDuration = Date.now() - pressStartTimeRef.current;

      if (pressTimerRef.current) {
        clearTimeout(pressTimerRef.current);
        pressTimerRef.current = null;
      }
      if (longPressTimerRef.current) {
        clearTimeout(longPressTimerRef.current);
        longPressTimerRef.current = null;
      }

      setIsActive(false);
      setIsPressed(false);
      updateState({ isActive: false, isPressed: false });

      if (!disabledPress && pressDuration < pressThreshold && onPress) {
        onPress();
      }
    },
    [disabledPress, pressThreshold, onPress, updateState],
  );

  // 清理
  useEffect(() => {
    return () => {
      if (pressTimerRef.current) clearTimeout(pressTimerRef.current);
      if (longPressTimerRef.current) clearTimeout(longPressTimerRef.current);
    };
  }, []);

  const state: InteractionState = {
    isHovered,
    isFocused,
    isActive,
    isPressed,
    isDisabled: false,
    isLoading: false,
  };

  const handlers: InteractionHandlers = {
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
    onMouseDown: handleMouseDown,
    onMouseUp: handleMouseUp,
    onFocus: handleFocus,
    onBlur: handleBlur,
    onTouchStart: handleTouchStart,
    onTouchEnd: handleTouchEnd,
  };

  /**
   * 获取交互状态的 CSS 过渡样式
   * @param baseColor 基础颜色
   */
  const getInteractionStyle = useCallback(
    (baseColor: string) => {
      const style: Record<string, string | number> = {
        transition: 'all 0.15s ease',
      };

      if (isPressed) {
        style.transform = 'scale(0.96)';
        style.filter = 'brightness(0.95)';
      } else if (isActive) {
        style.transform = 'scale(0.98)';
        style.filter = 'brightness(0.92)';
      } else if (isHovered) {
        style.filter = 'brightness(1.05)';
      }

      if (isFocused) {
        style.boxShadow = `0 0 0 3px ${baseColor}33`;
      }

      return style;
    },
    [isHovered, isFocused, isActive, isPressed],
  );

  return {
    state,
    handlers,
    getInteractionStyle,
  };
}

export default useInteractionState;
