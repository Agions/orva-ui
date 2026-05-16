/**
 * Input 输入框组件（表单版）
 * @module components/form/Input
 * @description 专业化 Input 组件，特性包括 Focus 光晕动画、验证状态动画、浮动标签、清除按钮动画。
 *
 * @example
 * ```tsx
 * <Input label="用户名" placeholder="请输入用户名" />
 * <Input inputVariant="filled" status="error" errorText="格式错误" />
 * <Input label="密码" password clearable />
 * ```
 */

import { useState, useCallback, useMemo } from 'react';
import { View, Input as TaroInput, Text } from '@tarojs/components';
import type { InputProps as TaroInputProps } from '@tarojs/components';

import { createComponent } from '@/utils/createComponent';
import { useTheme } from '@/hooks/ui/useTheme';
import { useInteractionState } from '@/hooks/ui/useInteractionState';
import { useMicroAnimation } from '@/hooks/ui/useMicroAnimation';
import { useAccessibility, ARIA_ROLES } from '@/hooks/ui/useAccessibility';
import { getEasingCss } from '@/theme/motion/easings';
import { getRecommendedDuration } from '@/theme/motion/durations';
import type { InputProps } from './Input.types';

/**
 * Input 表单输入框组件
 * @description 基于 createComponent 构建的表单输入框，支持浮动标签、验证状态、聚焦光晕、清除按钮、前后缀插槽。
 *
 * @param props - 输入框属性，类型为 InputProps
 * @returns 输入框 JSX 元素
 *
 * @example
 * ```tsx
 * <Input label="邮箱" type="email" helperText="请输入有效的邮箱地址" />
 * <Input status="success" successText="格式正确" />
 * <Input prefix="¥" suffix="元" />
 * ```
 */
export const Input = createComponent<InputProps>({
  name: 'Input',

  defaultProps: {
    size: 'md',
    inputVariant: 'outlined',
    status: 'default',
    clearable: false,
    disabled: false,
    readOnly: false,
  },

  render: (props) => {
    const {
      size = 'md',
      inputVariant = 'outlined',
      status = 'default',
      clearable = false,
      disabled = false,
      readOnly = false,
      prefix,
      suffix,
      label,
      helperText,
      errorText,
      successText,
      placeholder,
      value,
      defaultValue,
      onChange,
      onFocus,
      onBlur,
      onClear,
      style,
      className = '',
      maxLength,
      type,
      password,
      ...rest
    } = props;

    const { theme } = useTheme();
    const [internalValue, setInternalValue] = useState(defaultValue || '');
    const currentValue = value !== undefined ? value : internalValue;

    const { state: interactionState, handlers } = useInteractionState({
      disabledHover: disabled,
      disabledFocus: disabled,
    });

    const { isFocused, isHovered } = interactionState;

    const animation = useMicroAnimation({ type: 'input', enabled: !disabled });
    const a11y = useAccessibility({
      role: ARIA_ROLES.textbox,
      label: typeof label === 'string' ? label : placeholder,
      attributes: {
        'aria-invalid': (status as string) === 'error' || (status as string) === 'danger' ? 'true' : 'false',
        'aria-disabled': String(disabled),
        'aria-readonly': String(readOnly),
      },
    });

    const handleChange = useCallback(
      (e: { detail: { value: string } }) => {
        const newValue = e.detail.value;
        if (value === undefined) {
          setInternalValue(newValue);
        }
        onChange?.(newValue);
      },
      [value, onChange],
    );

    const handleClear = useCallback(() => {
      if (value === undefined) {
        setInternalValue('');
      }
      onClear?.();
    }, [value, onClear]);

    // 状态颜色
    const statusColors: Record<string, string> = {
      default: theme.colors.border,
      danger: theme.colors.error,
      success: theme.colors.success,
      warning: theme.colors.warning,
    };
    const statusColor = statusColors[status] || statusColors.default;

    const inputStyle = useMemo(() => {
      const sizeMap: Record<string, { height: number; padding: string; fontSize: string }> = {
        sm: { height: 32, padding: '0 10px', fontSize: theme.typography.fontSize.sm },
        md: { height: 40, padding: '0 12px', fontSize: theme.typography.fontSize.md },
        lg: { height: 48, padding: '0 14px', fontSize: theme.typography.fontSize.lg },
      };
      const sizeStyle = sizeMap[size] || sizeMap.md;

      const variantStyles: Record<string, Record<string, string | number>> = {
        outline: {
          backgroundColor: 'transparent',
          borderWidth: 2,
          borderStyle: 'solid',
          borderRadius: theme.borderRadius.md,
        },
        outlined: {
          backgroundColor: 'transparent',
          borderWidth: 2,
          borderStyle: 'solid',
          borderRadius: theme.borderRadius.md,
        },
        filled: {
          backgroundColor: (theme.colors as unknown as Record<string, string>).backgroundInput || theme.colors.backgroundSecondary,
          borderWidth: 2,
          borderStyle: 'solid',
          borderColor: 'transparent',
          borderRadius: theme.borderRadius.md,
        },
        underline: {
          backgroundColor: 'transparent',
          borderWidth: '0 0 2px 0',
          borderStyle: 'solid',
          borderRadius: 0,
          paddingLeft: 0,
        },
      };
      const vStyle = variantStyles[inputVariant] || variantStyles.outlined;

      // 边框颜色逻辑
      let borderColor = statusColor;
      if (status === 'default') {
        if (isFocused) {
          borderColor = theme.colors.primary;
        } else if (isHovered) {
          borderColor = (theme.colors as unknown as Record<string, string>).borderFocus || theme.colors.primary;
        } else {
          borderColor = theme.colors.border;
        }
      }

      const baseStyle: Record<string, string | number> = {
        ...sizeStyle,
        ...vStyle,
        borderColor,
        color: theme.colors.text,
        width: '100%',
        boxSizing: 'border-box',
        outline: 'none',
        transition: `all ${getRecommendedDuration('input', 'focus')}ms ${getEasingCss('easeOut')}`,
        opacity: disabled ? 0.5 : 1,
      };

      // Focus 光晕
      if (isFocused && inputVariant !== 'underline' && inputVariant !== 'underlined') {
        baseStyle.boxShadow = `0 0 0 3px ${theme.colors.primary}20`;
      }

      return { ...baseStyle, ...(style || {}) };
    }, [size, inputVariant, status, statusColor, isFocused, isHovered, theme, style, disabled]);

    const mergedInputStyle = animation.getMergedStyle(inputStyle);

    // 浮动标签样式
    const labelStyle = useMemo(() => {
      if (!label) return null;
      const isFloating = isFocused || (currentValue && String(currentValue).length > 0);
      return {
        fontSize: isFloating ? theme.typography.fontSize.xs : theme.typography.fontSize.sm,
        color: isFocused ? theme.colors.primary : theme.colors.textSecondary,
        marginBottom: 4,
        transition: `all ${getRecommendedDuration('input', 'focus')}ms ease`,
        transform: isFloating ? 'translateY(0)' : 'translateY(2px)',
      };
    }, [label, isFocused, currentValue, theme]);

    // 验证状态动画
    const shakeStyle = useMemo(() => {
      if (status === 'danger') {
        return {
          animation: 'shake 0.5s ease-in-out',
        };
      }
      return {};
    }, [status]);

    return (
      <View data-testid="input-container" style={{ width: '100%', ...shakeStyle }} className={className}>
        {label && labelStyle && (
          <Text style={labelStyle as Record<string, string | number>}>{label}</Text>
        )}
        <View style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
          {prefix && (
            <View style={{ position: 'absolute', left: 12, zIndex: 1, display: 'flex', alignItems: 'center' }}>
              {prefix}
            </View>
          )}
          <TaroInput
            data-testid="input"
            value={String(currentValue ?? '')}
            placeholder={placeholder}
            disabled={disabled}
            style={{
              ...mergedInputStyle,
              paddingLeft: prefix ? 36 : undefined,
              paddingRight: clearable && currentValue ? 36 : suffix ? 36 : undefined,
            }}
            onInput={handleChange as (e: unknown) => void}
            onFocus={(e) => {
              handlers.onFocus();
              onFocus?.(e as Parameters<typeof onFocus>[0]);
            }}
            onBlur={(e) => {
              handlers.onBlur();
              onBlur?.(e as Parameters<typeof onBlur>[0]);
            }}
            maxlength={maxLength}
            password={password as boolean}
            {...(a11y.getAriaAttributes() as Record<string, unknown>)}
            {...(rest as Record<string, unknown>)}
          />
          {clearable && currentValue && !disabled && (
            <View
              style={{
                position: 'absolute',
                right: suffix ? 36 : 12,
                zIndex: 1,
                width: 18,
                height: 18,
                borderRadius: '50%',
                backgroundColor: (theme.colors as unknown as Record<string, string>).textDisabled || '#9ca3af',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                opacity: isHovered ? 1 : 0.6,
                transition: 'opacity 0.2s ease',
              }}
              onClick={handleClear}
            >
              <Text style={{ color: '#fff', fontSize: 12, lineHeight: 1 }}>×</Text>
            </View>
          )}
          {suffix && (
            <View style={{ position: 'absolute', right: 12, zIndex: 1, display: 'flex', alignItems: 'center' }}>
              {suffix}
            </View>
          )}
        </View>
        {(helperText || errorText || successText) && (
          <Text
            data-testid="input-helper-text"
            style={{
              fontSize: theme.typography.fontSize.sm,
              color: status === 'danger' ? theme.colors.error : status === 'success' ? theme.colors.success : theme.colors.textSecondary,
              marginTop: 4,
              transition: 'color 0.2s ease',
            }}
          >
            {status === 'danger' && errorText ? errorText : status === 'success' && successText ? successText : helperText}
          </Text>
        )}
      </View>
    );
  },
});

Input.displayName = 'Input';

export default Input;
