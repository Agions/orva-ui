/**
 * Checkbox 复选框组件
 * @module components/form/Checkbox
 * @description 复选框组件，支持受控/非受控模式、不确定状态、验证规则、自定义图标、动画效果和可访问性支持。
 *
 * @example
 * ```tsx
 * <Checkbox label="同意协议" onChange={handleChange} />
 * <Checkbox checked indeterminate label="全选" />
 * <Checkbox disabled label="禁用选项" />
 * ```
 */

import React, { forwardRef } from 'react';
import { Checkbox as TaroCheckbox, Text, View } from '@tarojs/components';
import type { ITouchEvent } from '@tarojs/components';

import { createComponent } from '@/utils/createComponent';
import { useTheme } from '@/hooks/ui/useTheme';
import { useInteractionState } from '@/hooks/ui/useInteractionState';
import { useMicroAnimation } from '@/hooks/ui/useMicroAnimation';
import { useAccessibility, ARIA_ROLES } from '@/hooks/ui/useAccessibility';
import { checkboxStyles } from './Checkbox.styles';
import type { CheckboxProps, CheckboxRef, CheckboxSize, CheckboxStatus, CheckboxColor } from './Checkbox.types';

/**
 * Checkbox 复选框组件
 * @description 基于 createComponent 构建的复选框组件，支持受控/非受控、三态切换、验证规则、自定义图标、动画效果、辅助/错误文本。
 *
 * @param props - 复选框属性
 * @param ref - 引用转发对象，类型为 CheckboxRef
 * @returns 复选框 JSX 元素
 *
 * @example
 * ```tsx
 * <Checkbox label="记住密码" defaultChecked onChange={setRemember} />
 * <Checkbox label="选项 A" checkedIcon="✓" uncheckedIcon="□" />
 * ```
 */
export const Checkbox = createComponent<CheckboxProps, CheckboxRef>({
  name: 'Checkbox',

  defaultProps: {
    value: undefined,
    checked: undefined,
    defaultChecked: false,
    size: 'md',
    status: 'normal',
    variant: 'default',
    color: 'primary',
    disabled: false,
    readonly: false,
    indeterminate: false,
    label: undefined,
    labelPosition: 'right',
    helperText: undefined,
    errorText: undefined,
    bordered: true,
    rounded: true,
    icon: undefined,
    checkedIcon: undefined,
    uncheckedIcon: undefined,
    indeterminateIcon: undefined,
    className: '',
    onChange: undefined,
    onClick: undefined,
    rules: undefined,
    validateTrigger: 'onChange',
    immediate: false,
    validator: undefined,
    animation: true,
    animationDuration: 200,
    ripple: false,
    rippleColor: undefined,
    autoFocus: false,
    data: undefined,
    style: undefined,
    containerStyle: undefined,
    wrapperStyle: undefined,
    iconStyle: undefined,
    labelStyle: undefined,
    helperTextStyle: undefined,
    errorTextStyle: undefined,
  },

  render: (props, ref) => {
    const {
      value: _value,
      checked: controlledChecked,
      defaultChecked = false,
      size = 'md',
      status: propStatus = 'normal',
      variant = 'default',
      color = 'primary',
      disabled = false,
      readonly = false,
      indeterminate = false,
      label,
      labelPosition = 'right',
      helperText,
      errorText,
      bordered = true,
      rounded = true,
      icon,
      checkedIcon,
      uncheckedIcon,
      indeterminateIcon,
      className = '',
      onChange,
      onClick,
      rules,
      validateTrigger = 'onChange',
      immediate = false,
      validator,
      animation = true,
      animationDuration = 200,
      ripple = false,
      rippleColor,
      autoFocus = false,
      data,
      style,
      containerStyle,
      wrapperStyle,
      iconStyle,
      labelStyle,
      helperTextStyle,
      errorTextStyle,
    } = props;

    const { theme } = useTheme();

    const { state: interactionState, handlers } = useInteractionState({
      disabledPress: disabled || readonly,
      disabledHover: disabled,
    });

    const checkboxAnimation = useMicroAnimation({ type: 'micro' as any, enabled: !disabled && !readonly });

    const [internalChecked, setInternalChecked] = React.useState(defaultChecked);
    const [internalStatus, setInternalStatus] = React.useState<CheckboxStatus>(propStatus);
    const [internalDisabled, setInternalDisabled] = React.useState(disabled);
    const [internalReadonly, setInternalReadonly] = React.useState(readonly);
    const [internalIndeterminate, setInternalIndeterminate] = React.useState(indeterminate);
    const [validationResult, setValidationResult] = React.useState<{ valid: boolean; message?: string } | null>(null);

    // 处理受控/非受控模式
    const isControlled = controlledChecked !== undefined;
    const checked = isControlled ? controlledChecked : internalChecked;

    const a11y = useAccessibility({
      role: ARIA_ROLES.checkbox,
      'aria-checked': indeterminate ? 'mixed' : (checked ?? false),
      'aria-disabled': Boolean(disabled),
      'aria-readonly': Boolean(readonly),
      attributes: {
        'aria-checked': indeterminate ? 'mixed' : (checked ?? false),
        'aria-disabled': Boolean(disabled),
        'aria-readonly': Boolean(readonly),
      },
    });

    // 更新内部状态
    React.useEffect(() => {
      setInternalStatus(propStatus);
    }, [propStatus]);

    React.useEffect(() => {
      setInternalDisabled(disabled);
    }, [disabled]);

    React.useEffect(() => {
      setInternalReadonly(readonly);
    }, [readonly]);

    React.useEffect(() => {
      setInternalIndeterminate(indeterminate);
    }, [indeterminate]);

    // 自动聚焦
    React.useEffect(() => {
      if (autoFocus && !internalDisabled && !internalReadonly) {
        // 聚焦逻辑
      }
    }, [autoFocus, internalDisabled, internalReadonly]);

    // 立即验证
    React.useEffect(() => {
      if (immediate) {
        validateCheckbox(checked);
      }
    }, [immediate, checked]);

    // 验证复选框
    const validateCheckbox = React.useCallback(
      async (isChecked: boolean): Promise<{ valid: boolean; message?: string }> => {
        if (!rules && !validator) {
          return { valid: true };
        }

        // 验证必填
        if (rules?.some((rule) => rule.required && !isChecked)) {
          const requiredRule = rules.find((rule) => rule.required);
          return { valid: false, message: requiredRule?.message || '此项为必选项' };
        }

        // 验证规则
        if (rules) {
          for (const rule of rules) {
            if (rule.validator) {
              const result = rule.validator(isChecked);
              if (typeof result === 'string') {
                return { valid: false, message: result };
              }
              if (!result) {
                return { valid: false, message: rule.message || '验证失败' };
              }
            }
          }
        }

        // 自定义验证函数
        if (validator) {
          const result = validator(isChecked);
          if (typeof result === 'string') {
            return { valid: false, message: result };
          }
          if (!result) {
            return { valid: false, message: '验证失败' };
          }
        }

        return { valid: true };
      },
      [rules, validator],
    );

    // 处理变化事件
    const handleChange = React.useCallback(
      async (event: ITouchEvent) => {
        if (internalDisabled || internalReadonly) return;

        const newChecked = !checked;

        if (!isControlled) {
          setInternalChecked(newChecked);
        }

        // 验证复选框
        if (validateTrigger === 'onChange') {
          const result = await validateCheckbox(newChecked);
          setValidationResult(result);
          setInternalStatus(result.valid ? 'normal' : 'error');
        }

        // 触发变化事件
        const eventObject = {
          ...event,
          target: event.target || {},
          currentTarget: event.currentTarget || {},
          type: event.type || 'change',
          preventDefault: event.preventDefault || (() => {}),
          stopPropagation: event.stopPropagation || (() => {}),
        };
        onChange?.(newChecked, eventObject);
      },
      [
        internalDisabled,
        internalReadonly,
        isControlled,
        validateTrigger,
        validateCheckbox,
        onChange,
        checked,
      ],
    );

    // 处理点击事件
    const handleClick = React.useCallback(
      (event: ITouchEvent) => {
        if (internalDisabled || internalReadonly) return;

        onClick?.(event);
        handleChange(event);
      },
      [internalDisabled, internalReadonly, onClick, handleChange],
    );

    // 计算最终状态
    const finalStatus = internalDisabled ? 'disabled' : validationResult?.valid === false ? 'error' : internalStatus;

    // 获取显示图标
    const getDisplayIcon = React.useCallback((): React.ReactNode => {
      if (internalIndeterminate && indeterminateIcon) {
        return indeterminateIcon;
      }
      if (checked && checkedIcon) {
        return checkedIcon;
      }
      if (!checked && uncheckedIcon) {
        return uncheckedIcon;
      }
      if (icon) {
        return icon;
      }
      return internalIndeterminate ? '−' : checked ? '✓' : '';
    }, [checked, internalIndeterminate, icon, checkedIcon, uncheckedIcon, indeterminateIcon]);

    // 生成复选框样式
    const checkboxStyle = checkboxStyles['getStyle']({
      size,
      status: finalStatus,
      variant,
      color,
      disabled: internalDisabled,
      readonly: internalReadonly,
      indeterminate: internalIndeterminate,
      bordered,
      rounded,
      style,
    });

    // 生成复选框类名
    const checkboxClassName = checkboxStyles['getClassName']({
      size,
      status: finalStatus,
      variant,
      color,
      disabled: internalDisabled,
      readonly: internalReadonly,
      indeterminate: internalIndeterminate,
      bordered,
      rounded,
      className,
    });

    return (
      <View style={checkboxStyles['getContainerStyle']({ style: containerStyle })}>
        <View style={checkboxStyles['getWrapperStyle']({ style: wrapperStyle })}>
          {/* 复选框 */}**
          <TaroCheckbox
            className={checkboxClassName}
            style={checkboxStyle}
            checked={checked}
            disabled={internalDisabled}
            onChange={(e: unknown) => {
              if (!internalDisabled && !internalReadonly) {
                const eventObject = {
                  ...(e as Record<string, unknown>),
                  target: (e as Record<string, unknown>).target || {},
                  currentTarget: (e as Record<string, unknown>).currentTarget || {},
                  preventDefault: (e as Record<string, unknown>).preventDefault || (() => {}),
                  stopPropagation: (e as Record<string, unknown>).stopPropagation || (() => {}),
                };
                onChange?.(!checked, eventObject);
              }
            }}
            value={String(_value || '')}
            data-testid="checkbox"
            data-indeterminate={internalIndeterminate ? 'true' : undefined}
            data-checked={checked ? 'true' : 'false'}
            data-value={_value}
            {...handlers}
            {...a11y.getAriaAttributes()}
          >
            {/* 图标 */}**
            <Text
              style={checkboxStyles['getIconStyle']({
                size,
                checked,
                indeterminate: internalIndeterminate,
                disabled: internalDisabled,
                style: iconStyle,
              })}
            >
              {getDisplayIcon()}
            </Text>
          </TaroCheckbox>

          {/* 标签 */}**
          {label && (
            <Text
              style={checkboxStyles['getLabelStyle']({
                size,
                disabled: internalDisabled,
                labelPosition,
                style: labelStyle,
              })}
              onClick={handleClick}
            >
              {label}
            </Text>
          )}
        </View>

        {/* 辅助文本 */}**
        {helperText && finalStatus === 'normal' && (
          <Text style={checkboxStyles['getHelperTextStyle']({ size, status: finalStatus, style: helperTextStyle })}>
            {helperText}
          </Text>
        )}

        {/* 错误文本 */}**
        {errorText && finalStatus === 'error' && (
          <Text style={checkboxStyles['getErrorTextStyle']({ size, style: errorTextStyle })}>{errorText}</Text>
        )}

        {/* 验证结果文本 */}**
        {validationResult?.message && (
          <Text style={checkboxStyles['getErrorTextStyle']({ size, style: errorTextStyle })}>
            {validationResult.message}
          </Text>
        )}
      </View>
    );
  },
});

Checkbox.displayName = 'Checkbox';

export default Checkbox;