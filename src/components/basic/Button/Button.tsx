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

// ==================== 工具函数 ====================

/**
 * 计算按钮样式
 * @description 根据按钮类型、尺寸、变体、状态和交互状态计算最终的 CSS 样式
 *
 * @param type - 按钮类型，默认为 'default'
 * @param size - 按钮尺寸，默认为 'md'
 * @param variant - 按钮变体，默认为 'solid'
 * @param disabled - 是否禁用
 * @param loading - 是否加载中
 * @param block - 是否块级（全宽）
 * @param flat - 是否平面风格（无阴影）
 * @param theme - 当前主题对象
 * @param isHovered - 是否悬停
 * @param isFocused - 是否聚焦
 * @param isPressed - 是否按下
 * @returns 计算后的 React CSSProperties 对象
 *
 * @example
 * ```ts
 * const style = computeButtonStyles('primary', 'md', 'solid', false, false, false, false, theme, false, false, false);
 * ```
 */
function computeButtonStyles(
  type: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info',
  size: 'xs' | 'sm' | 'md' | 'lg' | 'xl',
  variant: 'solid' | 'outline' | 'ghost' | 'text' | 'soft',
  disabled: boolean,
  loading: boolean,
  block: boolean,
  flat: boolean,
  theme: ReturnType<typeof useTheme>['theme'],
  isHovered: boolean,
  isFocused: boolean,
  isPressed: boolean,
): React.CSSProperties {
  // 基础尺寸
  const sizeMap: Record<string, React.CSSProperties> = {
    xs: { padding: '4px 10px', fontSize: 12, height: 24, minWidth: 24 },
    sm: { padding: '6px 12px', fontSize: 14, height: 28, minWidth: 28 },
    md: { padding: '8px 16px', fontSize: 16, height: 34, minWidth: 34 },
    lg: { padding: '10px 20px', fontSize: 18, height: 40, minWidth: 40 },
    xl: { padding: '12px 24px', fontSize: 20, height: 48, minWidth: 48 },
  };
  const sizeStyle = sizeMap[size] || sizeMap['md'];

  // 颜色映射
  const colorMap: Record<string, string> = {
    default: '#1f2937',
    primary: theme.colors.primary as string,
    success: theme.colors.success as string,
    warning: theme.colors.warning as string,
    danger: theme.colors.error as string,
    info: theme.colors.info as string,
  };
  const mainColor = colorMap[type] || colorMap['default'];

  // 变体样式
  let variantStyle: React.CSSProperties = {};
  switch (variant) {
    case 'solid':
      variantStyle = {
        backgroundColor: mainColor,
        color: type === 'default' ? '#1f2937' : '#ffffff',
        borderColor: mainColor,
        borderWidth: 1,
        borderStyle: 'solid',
      };
      break;
    case 'outline':
      variantStyle = {
        backgroundColor: 'transparent',
        color: mainColor,
        borderColor: mainColor,
        borderWidth: 1,
        borderStyle: 'solid',
      };
      break;
    case 'ghost':
      variantStyle = {
        backgroundColor: 'transparent',
        color: mainColor,
        borderColor: 'transparent',
      };
      break;
    case 'text':
      variantStyle = {
        backgroundColor: 'transparent',
        color: mainColor,
        borderColor: 'transparent',
        padding: '0',
      };
      break;
    case 'soft':
      variantStyle = {
        backgroundColor: `${mainColor}15`,
        color: mainColor,
        borderColor: 'transparent',
      };
      break;
  }

  // 交互状态样式
  let interactionStyle: React.CSSProperties = {};
  if (!disabled && !loading) {
    if (isPressed) {
      interactionStyle = { transform: 'scale(0.96)', filter: 'brightness(0.95)' };
    } else if (isHovered) {
      interactionStyle = { filter: 'brightness(1.05)' };
    }
    if (isFocused) {
      interactionStyle = {
        ...interactionStyle,
        boxShadow: `0 0 0 3px ${mainColor}33`,
      };
    }
  }

  // 禁用/加载状态
  const stateStyle: React.CSSProperties = {};
  if (disabled || loading) {
    stateStyle.opacity = 0.5;
    stateStyle.pointerEvents = 'none';
  }

  // 阴影
  const shadowStyle: React.CSSProperties = {};
  if (!flat && variant === 'solid' && !disabled) {
    if (isPressed) {
      shadowStyle.boxShadow = '0 1px 2px rgba(0,0,0,0.1)';
    } else if (isHovered) {
      shadowStyle.boxShadow = `0 4px 12px ${mainColor}40`;
    } else {
      shadowStyle.boxShadow = `0 2px 6px ${mainColor}30`;
    }
  }

  return {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    fontWeight: 500,
    cursor: disabled || loading ? 'not-allowed' : 'pointer',
    width: block ? '100%' : 'auto',
    transition: 'all 150ms ease',
    ...sizeStyle,
    ...variantStyle,
    ...interactionStyle,
    ...stateStyle,
    ...shadowStyle,
  };
}

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

    const buttonStyle = useMemo(
      () =>
        computeButtonStyles(
          type,
          size,
          variant,
          disabled,
          loading,
          block,
          flat,
          theme,
          interactionState.isHovered,
          interactionState.isFocused,
          interactionState.isPressed,
        ),
      [type, size, variant, disabled, loading, block, flat, theme, interactionState],
    );

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

    const content = (
      <>
        {loading && (
          <LoadingSpinner
            color={variant === 'solid' && type !== 'default' ? '#ffffff' : (buttonStyle.color as string) || '#1f2937'}
            size={typeof buttonStyle.fontSize === 'number' ? buttonStyle.fontSize * 0.6 : 10}
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
        style={{ ...buttonStyle, ...(style || {}), ...emphasisStyle }}
        className={className}
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