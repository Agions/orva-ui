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
  type?: 'button' | 'input' | 'micro' | 'modal';
  easing?: 'apple' | 'spring' | 'ease';
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
  const { type = 'micro', easing = 'apple', enabled = true } = options;

  const duration = useMemo(() => {
    return getRecommendedDuration(type as 'button' | 'page' | 'tooltip' | 'input' | 'list' | 'card' | 'modal' | 'drawer' | 'snackbar', easing as any);
  }, [type, easing]);

  const transition = useMemo(() => {
    if (!enabled) return 'none';
    return `${duration}ms ${getRecommendedEasing(easing as any)}`;
  }, [enabled, duration, easing]);

  const hoverStyle: ViewStyle = useMemo(() => ({
    transform: [{ scale: 1.02 }],
    filter: 'brightness(1.05)',
    shadowColor: theme.colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  }) as any, [theme.colors.primary]);

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
  }) as any, []);

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
    [enabled, hoverStyle, focusStyle, pressStyle, errorStyle]
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
