/**
 * Input 输入框组件（基础版）
 * @module components/basic/Input
 * @description 基础 Input 输入框组件，支持受控/非受控模式、验证、前缀/后缀图标、清除按钮。
 *
 * @example
 * ```tsx
 * <Input placeholder="请输入内容" onChange={handleChange} />
 * <Input type="password" clearable />
 * <Input prefix="¥" suffix="元" />
 * ```
 */

import { useCallback, useState, useMemo } from 'react';
import { Input as TaroInput, View, Text } from '@tarojs/components';

import { createComponent } from '@/utils/createComponent';
import { useTheme } from '@/hooks/ui/useTheme';
import { useInteractionState } from '@/hooks/ui/useInteractionState';
import { useAccessibility, ARIA_ROLES, type AccessibilityProps } from '@/hooks/ui/useAccessibility';
import type { InputProps, InputRef } from './Input.types';

// ==================== 主组件 ====================

/**
 * Input 基础输入框组件
 * @description 基于 createComponent 构建的输入框组件，支持受控/非受控、聚焦状态、清除功能和可访问性。
 *
 * @param props - 输入框属性，类型为 InputProps 与 AccessibilityProps 的组合
 * @param ref - 引用转发对象，类型为 InputRef
 * @returns 输入框 JSX 元素
 *
 * @example
 * ```tsx
 * <Input type="text" placeholder="用户名" clearable onChange={setUsername} />
 * ```
 */
export const Input = createComponent<InputProps & AccessibilityProps, InputRef>({
  name: 'Input',

  defaultProps: {
    type: 'text',
    size: 'md',
    disabled: false,
    readonly: false,
    placeholder: '',
    clearable: false,
    showPassword: false,
    border: true,
    focusable: true,
    tabIndex: 0,
  },

  render: (props) => {
    const {
      type = 'text',
      size = 'md',
      disabled = false,
      readonly = false,
      placeholder = '',
      value,
      defaultValue,
      onChange,
      onFocus,
      onBlur,
      className = '',
      style,
      clearable = false,
      showPassword = false,
      border = true,
      prefix,
      suffix,
      focusable = true,
      tabIndex = 0,
      ...rest
    } = props;

    const { theme } = useTheme();

    // 内部状态管理（非受控模式）
    const [internalValue, setInternalValue] = useState(defaultValue || '');
    const displayValue = value !== undefined ? value : internalValue;

    const { state: interactionState } = useInteractionState({
      disabledPress: disabled || readonly,
    });

    const { handleKeyDown } = useAccessibility({
      focusable,
      tabIndex,
      role: ARIA_ROLES.textbox,
    });

    // 尺寸映射
    const sizeStyles: Record<string, React.CSSProperties> = {
      xs: { fontSize: 12, padding: '4px 8px', height: 24 },
      sm: { fontSize: 14, padding: '6px 10px', height: 28 },
      md: { fontSize: 16, padding: '8px 12px', height: 34 },
      lg: { fontSize: 18, padding: '10px 14px', height: 40 },
    };
    const sizeStyle = sizeStyles[size] || sizeStyles.md;

    // 样式计算
    const inputStyle = useMemo(() => ({
      display: 'flex',
      alignItems: 'center',
      width: '100%',
      backgroundColor: disabled ? theme.colors.backgroundDisabled : theme.colors.background,
      border: border ? `1px solid ${interactionState.isFocused ? theme.colors.primary : theme.colors.border}` : 'none',
      borderRadius: theme.borderRadius.md,
      padding: sizeStyle.padding,
      fontSize: sizeStyle.fontSize,
      color: disabled ? theme.colors.textDisabled : theme.colors.text,
      transition: 'all 150ms ease',
      ...(style || {}),
    }), [theme, disabled, interactionState.isFocused, sizeStyle, border, style]);

    const handleChange = useCallback((e: unknown) => {
      const newValue = (e as { detail: { value: string } })?.detail?.value ?? '';
      if (value === undefined) {
        setInternalValue(newValue);
      }
      onChange?.(newValue);
    }, [value, onChange]);

    const handleClear = useCallback(() => {
      if (value === undefined) {
        setInternalValue('');
      }
      onChange?.('');
    }, [value, onChange]);

    return (
      <View style={inputStyle} className={className}>
        {prefix && <View style={{ marginRight: 8 }}>{prefix}</View>}
        
        <TaroInput
          {...{ type } as Record<string, unknown>}
          value={displayValue}
          placeholder={placeholder}
          disabled={disabled}
          onFocus={onFocus}
          onBlur={onBlur}
          onInput={handleChange}
          style={{ flex: 1, backgroundColor: 'transparent', border: 'none', outline: 'none' }}
          {...(rest as Record<string, unknown>)}
        />

        {clearable && displayValue && (
          <View onClick={handleClear} style={{ marginLeft: 8, cursor: 'pointer' }}>
            <Text>✕</Text>
          </View>
        )}

        {suffix && <View style={{ marginLeft: 8 }}>{suffix}</View>}
      </View>
    );
  },
});

Input.displayName = 'Input';

export default Input;
