/**
 * 卡片组件 (Card)
 * @module components/display/Card
 * @description 用于展示内容区域的卡片组件，支持悬浮抬升、入场动画、Hover 光泽效果和微交互反馈
 * @example
 * ```tsx
 * import { Card } from 'orva-ui';
 *
 * <Card hoverable shadow="medium">
 *   <Card.Header>标题</Card.Header>
 *   <Card.Body>内容区域</Card.Body>
 *   <Card.Footer>底部</Card.Footer>
 * </Card>
 * ```
 */

import { useMemo } from 'react';
import { View } from '@tarojs/components';

import { createComponent } from '@/utils/createComponent';
import { useTheme } from '@/hooks/ui/useTheme';
import { useInteractionState } from '@/hooks/ui/useInteractionState';
import { getRecommendedEasing, getEasingCss } from '@/theme/motion/easings';
import { getRecommendedDuration } from '@/theme/motion/durations';
import { getCardClassName, cardSubStyles } from './Card.styles';
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

    // CVA-based className for all variant/size/hoverable/clickable/bordered combinations
    const cardClassName = getCardClassName({
      variant,
      size,
      hoverable,
      clickable,
      bordered,
      className,
    });

    // Inline styles only for dynamic interaction states that can't be expressed via CVA
    const dynamicStyle = useMemo(() => {
      const duration = getRecommendedDuration('card', 'hover');
      const easing = getEasingCss(getRecommendedEasing('move', 'apple'));

      const result: Record<string, string | number> = {
        transition: `all ${duration}ms ${easing}`,
      };

      // Pressed state overrides
      if (isPressed) {
        result.transform = 'translateY(-1px) scale(0.995)';
        result.boxShadow = theme.shadows.sm;
      }

      // Focus ring
      if (isFocused) {
        result.boxShadow = `${theme.shadows.md}, 0 0 0 3px ${theme.colors.primary}20`;
      }

      // Hover gloss effect (dynamic, can't be in CVA)
      if (hoverable && isHovered && !isPressed) {
        result.backgroundImage = `linear-gradient(135deg, ${theme.colors.primary}05 0%, transparent 50%)`;
      }

      return result;
    }, [isHovered, isPressed, isFocused, hoverable, theme]);

    // Sub-component inline styles (static, from theme)
    const subStyles = useMemo(() => ({
      cover: {
        overflow: 'hidden' as const,
        borderRadius: `${theme.borderRadius.lg}px ${theme.borderRadius.lg}px 0 0`,
      },
      header: {
        borderBottom: `1px solid ${theme.colors.borderLight}`,
      },
      footer: {
        borderTop: `1px solid ${theme.colors.borderLight}`,
      },
      actions: {
        display: 'flex' as const,
        gap: 8,
        justifyContent: 'flex-end' as const,
      },
    }), [theme]);

    return (
      <View
        className={cardClassName}
        style={{ ...dynamicStyle, ...(style || {}) }}
        {...(clickable ? handlers : {})}
        {...rest}
      >
        {cover && (
          <View className={cardSubStyles.cover} style={subStyles.cover}>
            {cover}
          </View>
        )}
        {header && (
          <View className={cardSubStyles.header} style={subStyles.header}>
            {header}
          </View>
        )}
        {children}
        {footer && (
          <View className={cardSubStyles.footer} style={subStyles.footer}>
            {footer}
          </View>
        )}
        {actions && (
          <View className={cardSubStyles.actions} style={subStyles.actions}>
            {actions}
          </View>
        )}
      </View>
    );
  },
});

Card.displayName = 'Card';

export default Card;
