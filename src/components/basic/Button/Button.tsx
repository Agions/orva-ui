/**
 * Button 按钮组件
 * @module components/basic/Button
 * @description 专业化 Button 组件，支持 Ripple 水波纹、微交互动画、焦点光晕、压感反馈、可访问性支持。
 * 提供多种类型、尺寸、变体和形状，适用于各种交互场景。
 *
 * @example
 * ```tsx
 * <Button type="primary" onClick={handleClick}>点击我</Button>
 * <Button type="success" variant="outline" size="lg">成功按钮</Button>
 * <Button loading disabled>加载中</Button>
 * ```
 */

import { useCallback, useMemo } from 'react';
import { Button as TaroButton, Text, View } from '@tarojs/components';
import type { ITouchEvent } from '@tarojs/components';

import { createComponent } from '@/utils/createComponent';
import { useTheme } from '@/hooks/ui/useTheme';
import { useInteractionState } from '@/hooks/ui/useInteractionState';
import { useAccessibility, ARIA_ROLES, type AccessibilityProps } from '@/hooks/ui/useAccessibility';
import { Ripple } from '../Ripple';
import type { ButtonProps, ButtonRef } from './Button.types';
import { buttonVariants } from './Button.styles';

// ==================== 工具函数 ====================

/**
 * Loading Spinner 加载动画组件
 * @description 按钮加载状态时显示的旋转动画图标
 *
 * @param color - 加载图标的颜色
 * @param size - 加载图标的尺寸（像素）
 * @returns React 节点
 *
 * @example
 * ```tsx
 * <LoadingSpinner color="#ffffff" size={12} />
 * ```
 */
function LoadingSpinner({ color, size }: { color: string; size: number }) {
  return (
    <View
      style={{
        width: size,
        height: size,
        border: `2px solid ${color}30`,
        borderTopColor: color,
        borderRadius: '50%',
        animation: 'spin 0.8s linear infinite',
      }}
    />
  );
}

// ==================== 主组件 ====================

/**
 * Button 按钮组件
 * @description 基于 createComponent 构建的高级按钮组件，支持主题、交互状态、可访问性等特性。
 *
 * @param props - 按钮属性，类型为 ButtonProps 与 AccessibilityProps 的组合
 * @param ref - 引用转发对象，类型为 ButtonRef
 * @returns 按钮 JSX 元素
 *
 * @example
 * ```tsx
 * <Button type="primary" size="lg" variant="solid" onClick={handleClick}>
 *   提交
 * </Button>
 * ```
 */
export const Button = createComponent<ButtonProps & AccessibilityProps, ButtonRef>({
  name: 'Button',

  defaultProps: {
    type: 'default',
    size: 'md',
    variant: 'solid',
    shape: 'default',
    disabled: false,
    loading: false,
    block: false,
    iconPosition: 'left',
    ripple: true,
    flat: false,
    focusable: true,
    tabIndex: 0,
    emphasis: undefined,
  },

  render: (props) => {
    const {
      type = 'default',
      size = 'md',
      variant = 'solid',
      shape = 'default',
      disabled = false,
      loading = false,
      block = false,
      icon,
      iconPosition = 'left',
      children,
      onClick,
      style,
      className = '',
      ripple = true,
      flat = false,
      emphasis,
      focusable = true,
      tabIndex = 0,
      ...rest
    } = props;

    const { theme } = useTheme();

    // 使用新的交互状态管理
    const { state: interactionState, handlers } = useInteractionState({
      disabledPress: disabled || loading,
      onPress: () => {
        // 手动触发点击
      },
    });

    // 使用新的可访问性系统
    const { handleKeyDown: _handleKeyDown } = useAccessibility({
      focusable,
      tabIndex,
      role: ARIA_ROLES.button,
    });

    // Color mapping for dynamic inline styles (shadow, focus ring)
    const colorMap: Record<string, string> = {
      default: '#1f2937',
      primary: theme.colors.primary as string,
      success: theme.colors.success as string,
      warning: theme.colors.warning as string,
      danger: theme.colors.error as string,
      info: theme.colors.info as string,
    };
    const mainColor = colorMap[type] || colorMap['default'];

    // CVA class names for static variant styles
    const cvaClassName = useMemo(
      () =>
        buttonVariants({
          type,
          size,
          variant,
          disabled,
          loading,
          block,
          flat,
          shape,
        }),
      [type, size, variant, disabled, loading, block, flat, shape],
    );

    // Dynamic inline styles for interaction states (hover, press, focus, shadow)
    const dynamicStyle = useMemo((): React.CSSProperties => {
      const style: React.CSSProperties = {};

      if (!disabled && !loading) {
        if (interactionState.isPressed) {
          style.transform = 'scale(0.96)';
          style.filter = 'brightness(0.95)';
        } else if (interactionState.isHovered) {
          style.filter = 'brightness(1.05)';
        }
        if (interactionState.isFocused) {
          style.boxShadow = `0 0 0 3px ${mainColor}33`;
        }
      }

      // Shadow based on hover/press state (only for solid, non-flat, non-disabled)
      if (!flat && variant === 'solid' && !disabled && !loading) {
        if (interactionState.isPressed) {
          style.boxShadow = '0 1px 2px rgba(0,0,0,0.1)';
        } else if (interactionState.isHovered) {
          style.boxShadow = `0 4px 12px ${mainColor}40`;
        } else {
          style.boxShadow = `0 2px 6px ${mainColor}30`;
        }
      }

      return style;
    }, [disabled, loading, interactionState.isPressed, interactionState.isHovered, interactionState.isFocused, flat, variant, mainColor]);

    const handleClick = useCallback(
      (event: ITouchEvent) => {
        if (!disabled && !loading) {
          onClick?.(event);
        }
      },
      [disabled, loading, onClick],
    );

    // 强调效果处理
    const emphasisStyle: React.CSSProperties = {};
    if (emphasis === 'bold') {
      emphasisStyle.fontWeight = 700;
    } else if (emphasis === 'underline') {
      emphasisStyle.textDecoration = 'underline';
    }

    // Determine spinner color based on variant/type
    const spinnerColor = variant === 'solid' && type !== 'default' ? '#ffffff' : mainColor;
    // Determine spinner size based on button size
    const spinnerSizeMap: Record<string, number> = { xs: 12, sm: 14, md: 16, lg: 18, xl: 20 };
    const spinnerSize = spinnerSizeMap[size] || 16;

    const content = (
      <>
        {loading && (
          <LoadingSpinner
            color={spinnerColor}
            size={spinnerSize}
          />
        )}
        {!loading && icon && iconPosition === 'left' && (
          <View style={{ display: 'flex', alignItems: 'center' }}>{icon}</View>
        )}
        {children && (
          <Text style={{ fontSize: 'inherit', color: 'inherit', fontWeight: 'inherit' }}>
            {children}
          </Text>
        )}
        {!loading && icon && iconPosition === 'right' && (
          <View style={{ display: 'flex', alignItems: 'center' }}>{icon}</View>
        )}
      </>
    );

    const buttonContent = (
      <TaroButton
        data-testid="button"
        type={type === 'primary' ? 'primary' : 'default'}
        size={size === 'sm' || size === 'xs' ? 'mini' : 'default'}
        disabled={disabled || loading}
        style={{ ...dynamicStyle, ...(style || {}), ...emphasisStyle }}
        className={`${cvaClassName} ${className}`.trim()}
        onClick={handleClick}
        {...handlers}
        {...(rest as Record<string, unknown>)}
      >
        {content}
      </TaroButton>
    );

    if (ripple && !disabled && !loading) {
      return (
        <Ripple
          opacity={0.2}
          duration={500}
          center={false}
        >
          {buttonContent}
        </Ripple>
      );
    }

    return buttonContent;
  },
});

Button.displayName = 'Button';

export default Button;