/**
 * 专业化 Card 组件
 * 特性：悬浮抬升、入场动画、Hover 光泽效果、微交互反馈
 * @module components/display/Card
 */

import { useMemo } from 'react';
import { View } from '@tarojs/components';

import { createComponent } from '@/utils/createComponent';
import { useTheme } from '@/hooks/ui/useTheme';
import { useInteractionState } from '@/hooks/ui/useInteractionState';
import { getRecommendedEasing, getEasingCss } from '@/theme/motion/easings';
import { getRecommendedDuration } from '@/theme/motion/durations';
import type { CardProps } from './Card.types';

export const Card = createComponent<CardProps>({
  name: 'Card',

  defaultProps: {
    variant: 'default',
    size: 'md',
    hoverable: true,
    clickable: false,
    bordered: true,
  },

  render: (props) => {
    const {
      variant = 'default',
      size = 'md',
      hoverable = true,
      clickable = false,
      bordered = true,
      header,
      footer,
      cover,
      actions,
      children,
      onClick,
      style,
      className = '',
      ...rest
    } = props;

    const { theme } = useTheme();
    const { state: interactionState, handlers } = useInteractionState({
      disabledHover: !hoverable,
      disabledPress: !clickable,
      onPress: onClick ? () => onClick({} as never) : undefined,
    });

    const { isHovered, isPressed, isFocused } = interactionState;

    const cardStyle = useMemo(() => {
      const sizePadding: Record<string, number | string> = {
        sm: theme.spacing.sm,
        md: theme.spacing.md,
        lg: theme.spacing.lg,
      };
      const padding = sizePadding[size] || sizePadding.md;

      const variantBg: Record<string, string> = {
        default: theme.colors.backgroundCard,
        outlined: 'transparent',
        filled: theme.colors.background,
        elevated: theme.colors.backgroundCard,
      };

      const baseStyle: Record<string, string | number> = {
        backgroundColor: variantBg[variant] || variantBg.default,
        borderRadius: theme.borderRadius.lg,
        padding,
        overflow: 'hidden',
        transition: `all ${getRecommendedDuration('card', 'hover')}ms ${getEasingCss(getRecommendedEasing('move', 'apple'))}`,
        position: 'relative',
      };

      // 边框
      if (bordered || variant === 'outlined') {
        baseStyle.border = `1px solid ${theme.colors.border}`;
      }

      // 悬浮效果
      if (hoverable && isHovered && !isPressed) {
        baseStyle.transform = 'translateY(-4px)';
        baseStyle.boxShadow = theme.shadows.lg;
      } else if (variant === 'elevated') {
        baseStyle.boxShadow = theme.shadows.md;
      } else {
        baseStyle.boxShadow = theme.shadows.sm;
      }

      // 按下效果
      if (isPressed) {
        baseStyle.transform = 'translateY(-1px) scale(0.995)';
        baseStyle.boxShadow = theme.shadows.sm;
      }

      // 焦点光晕
      if (isFocused) {
        baseStyle.boxShadow = `${theme.shadows.md}, 0 0 0 3px ${theme.colors.primary}20`;
      }

      // 光泽效果 overlay
      if (hoverable && isHovered) {
        baseStyle.backgroundImage = `linear-gradient(135deg, ${theme.colors.primary}05 0%, transparent 50%)`;
      }

      return { ...baseStyle, ...(style || {}) };
    }, [variant, size, hoverable, clickable, bordered, isHovered, isPressed, isFocused, theme, style]);

    return (
      <View
        style={cardStyle}
        className={className}
        {...(clickable ? handlers : {})}
        {...rest}
      >
        {cover && (
          <View style={{ margin: -16, marginBottom: 12, overflow: 'hidden', borderRadius: `${theme.borderRadius.lg}px ${theme.borderRadius.lg}px 0 0` }}>
            {cover}
          </View>
        )}
        {header && (
          <View style={{ marginBottom: 12, paddingBottom: 12, borderBottom: `1px solid ${theme.colors.borderLight}` }}>
            {header}
          </View>
        )}
        {children}
        {footer && (
          <View style={{ marginTop: 12, paddingTop: 12, borderTop: `1px solid ${theme.colors.borderLight}` }}>
            {footer}
          </View>
        )}
        {actions && (
          <View style={{ marginTop: 12, display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
            {actions}
          </View>
        )}
      </View>
    );
  },
});

Card.displayName = 'Card';

export default Card;
