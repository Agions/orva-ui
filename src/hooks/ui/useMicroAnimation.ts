/**
 * 微交互动画Hook
 * 统一处理组件的微交互动画和状态样式
 */

import { useMemo, useCallback } from 'react';
import type { CSSProperties } from 'react';

import { useTheme } from './useTheme';
import { getRecommendedDuration } from '@/theme/motion/durations';
import { getRecommendedEasing } from '@/theme/motion/easings';

export type ViewStyle = CSSProperties;

export interface AnimationOptions {
  /** 组件类型，用于推荐时长 @deprecated 改用 component */
  type?: 'button' | 'input' | 'micro' | 'modal';
  /** 缓动风格 @deprecated 改用 action 或 designSystem */
  easing?: 'apple' | 'spring' | 'ease';
  /** 组件类型，用于推荐时长 */
  component?: 'button' | 'input' | 'card' | 'modal' | 'drawer' | 'list' | 'page' | 'tooltip' | 'snackbar';
  /** 动画动作，用于推荐时长和缓动 */
  action?: 'enter' | 'exit' | 'hover' | 'focus' | 'press' | 'state';
  /** 设计系统偏好，用于推荐缓动 */
  designSystem?: 'apple' | 'material' | 'fluent';
  enabled?: boolean;
}

export interface InteractionState {
  isHovered: boolean;
  isFocused: boolean;
  isPressed: boolean;
  isDisabled: boolean;
  hasError?: boolean;
}

export function useMicroAnimation(options: AnimationOptions = {}) {
  const { theme } = useTheme();
  // 向后兼容：type → component, easing → action + designSystem
  const resolvedComponent = options.component ?? (options.type === 'modal' ? 'modal' : options.type === 'input' ? 'input' : 'button');
  const resolvedAction = options.action ?? 'state';
  const resolvedDesignSystem = options.designSystem ?? 'apple';
  const enabled = options.enabled ?? true;

  // 将 duration action 映射为 easing action（两者的 action 枚举不完全重叠）
  const easingActionMap: Record<string, 'enter' | 'exit' | 'move' | 'emphasis' | 'micro'> = {
    enter: 'enter',
    exit: 'exit',
    hover: 'micro',
    focus: 'emphasis',
    press: 'micro',
    state: 'move',
  };

  const duration = useMemo(() => {
    return getRecommendedDuration(resolvedComponent as Parameters<typeof getRecommendedDuration>[0], resolvedAction as Parameters<typeof getRecommendedDuration>[1]);
  }, [resolvedComponent, resolvedAction]);

  const transition = useMemo(() => {
    if (!enabled) return 'none';
    return `${duration}ms ${getRecommendedEasing(easingActionMap[resolvedAction] ?? 'move', resolvedDesignSystem)}`;
  }, [enabled, duration, resolvedAction, resolvedDesignSystem]);

const hoverStyle: ViewStyle = useMemo(() => ({
    transform: [{ scale: 1.02 }],
    filter: 'brightness(1.05)',
    // RN/Taro 专用属性
    shadowColor: theme.colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  }) as unknown as ViewStyle, [theme.colors.primary]);

  const focusStyle: ViewStyle = useMemo(() => {
    const primaryColor = theme.colors.primary;
    return {
      outlineWidth: 2,
      outlineStyle: 'solid',
      outlineColor: `${primaryColor}33`,
      outlineOffset: 2,
    };
  }, [theme.colors.primary]);

  const pressStyle: ViewStyle = useMemo(() => ({
    transform: [{ scale: 0.96 }],
    filter: 'brightness(0.95)',
  }) as unknown as ViewStyle, []);

  const errorStyle: ViewStyle = useMemo(() => {
    const errorColor = theme.colors.error;
    return {
      borderColor: errorColor,
      backgroundColor: `${errorColor}15`,
      borderWidth: 2,
    };
  }, [theme.colors.error]);

  const getMergedStyle = useCallback(
    (baseStyle: ViewStyle, state?: InteractionState): ViewStyle => {
      const merged: ViewStyle = { ...baseStyle };

      if (!enabled || !state) return merged;

      if (state.isDisabled) {
        Object.assign(merged, { opacity: 0.5, pointerEvents: 'none' });
      } else if (state.hasError) {
        Object.assign(merged, errorStyle);
      } else {
        let interactionStyle: ViewStyle = {};

        if (state.isPressed) {
          Object.assign(interactionStyle, pressStyle);
        } else if (state.isHovered) {
          Object.assign(interactionStyle, hoverStyle);
        }

        if (state.isFocused) {
          Object.assign(interactionStyle, focusStyle);
        }

        Object.assign(merged, interactionStyle);
      }

      return merged;
    },
    [enabled, hoverStyle, focusStyle, pressStyle, errorStyle],
  );

  return {
    transition,
    hoverStyle,
    focusStyle,
    pressStyle,
    errorStyle,
    getMergedStyle,
  };
}

export default useMicroAnimation;
