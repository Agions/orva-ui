/**
 * Input 输入框组件（基础版）— 重构版
 * @module components/basic/Input
 * @description 基于 createComponent 构建的输入框组件，支持受控/非受控模式、验证状态、前缀/后缀插槽、清除按钮。
 *
 * 架构分层:
 * - Headless Hook: useInput — 状态逻辑管理
 * - Styles: Input.styles — CVA 样式变体
 * - Component: Input — 通过 createComponent 包装
 *
 * @example
 * ```tsx
 * <Input placeholder="请输入内容" />
 * <Input type="password" clearable />
 * <Input prefix="¥" suffix="元" status="success" successText="格式正确" />
 * ```
 */

import { useMemo } from 'react';
import { Input as TaroInput, View, Text } from '@tarojs/components';

import { createComponent } from '@/utils/createComponent';
import { useTheme } from '@/hooks/ui/useTheme';
import { useAccessibility, ARIA_ROLES, type AccessibilityProps } from '@/hooks/ui/useAccessibility';
import { useInput } from './useInput';
import { inputStyles } from './Input.styles';
import type { InputProps, InputRef, InputType, InputSize, InputVariant } from './Input.types';

// ==================== 主组件 ====================

/**
 * Input 基础输入框组件
 * @description 基于 createComponent 构建，支持受控/非受控、聚焦状态、清除功能、验证状态和可访问性。
 */
export const Input = createComponent<InputProps & AccessibilityProps, InputRef>({
  name: 'Input',

  defaultProps: {
    type: 'text' as InputType,
    size: 'md' as InputSize,
    disabled: false,
    readonly: false,
    placeholder: '',
    clearable: false,
    border: true,
    focusable: true,
    tabIndex: 0,
    inputVariant: 'outlined' as InputVariant,
  } as Partial<InputProps & AccessibilityProps>,

  render: (props, ref) => {
    const {
      // UI 布局
      size = 'md',
      disabled = false,
      readonly = false,
      placeholder = '',
      className = '',
      style,
      clearable = false,
      border = true,
      prefix,
      suffix,
      label,
      helperText,
      errorText,
      successText,
      // 值
      value,
      defaultValue,
      onChange,
      onFocus,
      onBlur,
      onClear,
      // 验证
      status: propStatus = 'default',
      // 原生属性
      type,
      password,
      maxLength,
      inputVariant = 'outlined',
      focusable = true,
      tabIndex = 0,
      // 转发
      ...rest
    } = props;

    const { theme } = useTheme();

    // ============ Headless Hook ============
    const {
      value: currentValue,
      interaction: { isFocused, isHovered },
      clearable: showClearable,
      handleChange,
      handleClear,
      htmlProps,
      eventHandlers,
      status,
      statusColor,
      isError,
    } = useInput({
      type: type as 'text' | 'password' | 'number' | undefined,
      size,
      disabled,
      readonly,
      clearable,
      border,
      focusable,
      tabIndex,
      defaultValue,
      value,
      onChange,
      onFocus,
      onBlur,
      onClear,
      status: propStatus,
      errorText,
      successText,
      helperText,
      label,
    });

    // ============ 可访问性 ============
    const a11y = useAccessibility({
      role: ARIA_ROLES.textbox,
      label: typeof label === 'string' ? label : placeholder,
      attributes: {
        'aria-invalid': isError ? 'true' : 'false',
        'aria-disabled': String(disabled),
        'aria-readonly': String(readonly),
      },
    });

    // ============ 样式 ============
    const wrapperClasses = useMemo(() => {
      return inputStyles({ size, error: isError, prefix: !!prefix, suffix: !!suffix, className });
    }, [size, isError, prefix, suffix, className]);

    // 动态内联样式（用于主题色、交互状态等无法用 Tailwind class 表达的部分）
    const computedStyle = useMemo((): React.CSSProperties => {
      const base: React.CSSProperties = {
        ...(style || {}),
      };

      // focus ring 颜色
      if (isFocused && !isError) {
        base.boxShadow = `0 0 0 2px ${theme.colors.primary}40`;
        base.borderColor = theme.colors.primary as string;
      }
      if (isHovered && !isFocused && !isError) {
        const themeColors = theme.colors as unknown as Record<string, string>;
        base.borderColor = themeColors.borderFocus || (theme.colors.primary as string);
      }

      return base;
    }, [style, isFocused, isHovered, isError, theme]);

    // ============ 渲染 ============
    return (
      <View data-testid="input-container" className="w-full">
        {/* 浮动标签 */}
        {label && (
          <Text
            className={`block mb-1 transition-all duration-200 ${
              isFocused || (currentValue && String(currentValue).length > 0)
                ? `text-xs`
                : `text-sm`
            }`}
            style={{
              color: isFocused
                ? (theme.colors.primary as string)
                : (theme.colors.textSecondary as string),
            }}
          >
            {label}
          </Text>
        )}

        {/* 输入框容器 */}
        <View
          className={wrapperClasses}
          style={computedStyle}
          {...(eventHandlers as unknown as Record<string, unknown>)}
        >
          {/* 前缀 */}
          {prefix && (
            <View className="flex items-center shrink-0 mr-2" data-testid="input-prefix">
              {prefix}
            </View>
          )}

          {/* Taro Input */}
          <TaroInput
            ref={ref as unknown as React.Ref<HTMLInputElement>}
            data-testid="input"
            type={type as unknown as (typeof TaroInput extends { type: infer T } ? T : never)}
            value={String(currentValue ?? '')}
            placeholder={placeholder}
            disabled={disabled}
            password={!!password}
            maxlength={maxLength}
            className="flex-1 bg-transparent border-none outline-none p-0 m-0 text-inherit"
            style={{
              flex: 1,
              backgroundColor: 'transparent',
              border: 'none',
              outline: 'none',
              padding: 0,
              margin: 0,
              color: 'inherit',
              fontSize: 'inherit',
              lineHeight: 'inherit',
            }}
            onInput={handleChange}
            onFocus={(e) => {
              eventHandlers.onFocus();
              onFocus?.(e as unknown as Parameters<Exclude<typeof onFocus, undefined>>[0]);
            }}
            onBlur={(e) => {
              eventHandlers.onBlur();
              onBlur?.(e as unknown as Parameters<Exclude<typeof onBlur, undefined>>[0]);
            }}
            {...(a11y.getAriaAttributes() as unknown as Record<string, unknown>)}
            {...(rest as unknown as Record<string, unknown>)}
          />

          {/* 清除按钮 */}
          {showClearable && !disabled && (
            <View
              data-testid="input-clear"
              className="flex items-center justify-center shrink-0 ml-2 w-[18px] h-[18px] rounded-full cursor-pointer transition-opacity duration-200"
              style={{
                backgroundColor: isError
                  ? (theme.colors.error as string)
                  : ((theme.colors as unknown as Record<string, string>).textDisabled || '#9ca3af'),
                opacity: isHovered ? 1 : 0.6,
              }}
              onClick={handleClear}
            >
              <Text className="text-white text-xs leading-none">×</Text>
            </View>
          )}

          {/* 后缀 */}
          {suffix && !showClearable && (
            <View className="flex items-center shrink-0 ml-2" data-testid="input-suffix">
              {suffix}
            </View>
          )}
        </View>

        {/* 辅助/验证文本 */}
        {(helperText || errorText || successText) && (
          <Text
            data-testid="input-helper-text"
            className="block mt-1 text-sm transition-colors duration-200"
            style={{
              color: isError
                ? (theme.colors.error as string)
                : status === 'success'
                ? (theme.colors.success as string)
                : (theme.colors.textSecondary as string),
            }}
          >
            {isError && errorText
              ? errorText
              : status === 'success' && successText
              ? successText
              : helperText}
          </Text>
        )}
      </View>
    );
  },
});

Input.displayName = 'Input';

export default Input;