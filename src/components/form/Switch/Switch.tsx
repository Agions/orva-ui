import React, { forwardRef } from 'react';
import { View, Text } from '@tarojs/components';
import type { ITouchEvent } from '@tarojs/components';

import { createComponent } from '@/utils/createComponent';
import { useTheme } from '@/hooks/ui/useTheme';
import { useInteractionState } from '@/hooks/ui/useInteractionState';
import { useMicroAnimation } from '@/hooks/ui/useMicroAnimation';
import { useAccessibility, ARIA_ROLES } from '@/hooks/ui/useAccessibility';
import { switchStyles } from './Switch.styles';
import type { SwitchProps, SwitchRef, SwitchValidationResult } from './Switch.types';

/** 开关组件 */
export const Switch = createComponent<SwitchProps, SwitchRef>({
  name: 'Switch',

  defaultProps: {
    value: undefined,
    checked: undefined,
    defaultValue: false,
    size: 'md',
    variant: 'solid',
    status: 'normal',
    color: 'primary',
    shape: 'rounded',
    disabled: false,
    readonly: false,
    loading: false,
    loadingType: 'spinner',
    loadingText: undefined,
    autoFocus: false,
    bordered: true,
    showLabel: false,
    checkedLabel: '开',
    uncheckedLabel: '关',
    checkedIcon: undefined,
    uncheckedIcon: undefined,
    helperText: undefined,
    errorText: undefined,
    showLoadingMask: true,
    rules: undefined,
    validateTrigger: 'onChange',
    immediate: false,
    validator: undefined,
    onChange: undefined,
    onClick: undefined,
    onLoadingChange: undefined,
    onValidate: undefined,
    className: '',
    style: undefined,
    containerClassName: '',
    containerStyle: undefined,
    block: false,
  },

  render: (props, ref) => {
    const {
      value: controlledValue,
      defaultValue = false,
      size = 'md',
      variant = 'solid',
      status: propStatus = 'normal',
      color = 'primary',
      shape: _shape = 'rounded',
      disabled = false,
      readonly = false,
      loading = false,
      loadingType: _loadingType = 'spinner',
      loadingText,
      autoFocus = false,
      bordered = true,
      showLabel = false,
      checkedLabel = '开',
      uncheckedLabel = '关',
      checkedIcon,
      uncheckedIcon,
      helperText,
      errorText,
      showLoadingMask = true,
      rules = [],
      validateTrigger = 'onChange',
      immediate = false,
      validator,
      onChange,
      onClick,
      onLoadingChange,
      onValidate,
      className,
      style,
      containerClassName,
      containerStyle,
      block = false,
    } = props;

    const { theme } = useTheme();

    const { state: interactionState, handlers } = useInteractionState({
      disabledPress: disabled || readonly || loading,
      disabledHover: disabled || loading,
    });

    const switchRef = React.useRef<HTMLDivElement>(null);
    const currentValueRef = React.useRef(defaultValue);
    const currentStatusRef = React.useRef('normal');
    const [internalValue, setInternalValue] = React.useState(defaultValue);
    const [internalStatus, setInternalStatus] = React.useState(propStatus);
    const [internalDisabled, setInternalDisabled] = React.useState(disabled);
    const [internalReadonly, setInternalReadonly] = React.useState(readonly);
    const [internalLoading, setInternalLoading] = React.useState(loading);

    const [validationResult, setValidationResult] = React.useState<SwitchValidationResult | null>(null);

    // 处理受控/非受控模式
    const isControlled = controlledValue !== undefined;
    const value = isControlled ? controlledValue : internalValue;

    const animation = useMicroAnimation({ type: 'micro' as any, enabled: !disabled && !readonly && !loading });
    const a11y = useAccessibility({
      role: ARIA_ROLES.switch,
      'aria-checked': value,
      attributes: {
        'aria-disabled': Boolean(disabled),
        'aria-readonly': Boolean(readonly),
      },
    });

    // 更新当前值引用
    React.useEffect(() => {
      currentValueRef.current = value;
    }, [value]);

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
      setInternalLoading(loading);
      onLoadingChange?.(loading);
    }, [loading, onLoadingChange]);

    // 自动聚焦
    React.useEffect(() => {
      if (autoFocus && switchRef.current && !internalDisabled && !internalReadonly) {
        switchRef.current.focus();
      }
    }, [autoFocus, internalDisabled, internalReadonly]);

    // 立即验证
    React.useEffect(() => {
      if (immediate) {
        validateSwitch(value);
      }
    }, [immediate, value]);

    // 验证开关值
    const validateSwitch = React.useCallback(
      async (switchValue: boolean): Promise<SwitchValidationResult> => {
        if (!rules || rules.length === 0 && !validator) {
          return { valid: true, value: switchValue };
        }

        const errors: string[] = [];

        // 验证必填
        if (rules.some((rule: any) => rule.required)) {
          if (!switchValue) {
            const requiredRule = rules.find((rule: any) => rule.required);
            errors.push(requiredRule?.message || '此字段为必填项');
          }
        }

        // 验证规则
        for (const rule of rules) {
          if (rule.validator) {
            try {
              const result = rule.validator(switchValue);
              if (result instanceof Promise) {
                const asyncResult = await result;
                if (typeof asyncResult === 'string') {
                  errors.push(asyncResult);
                } else if (!asyncResult) {
                  errors.push(rule.message || '验证失败');
                }
              } else {
                if (typeof result === 'string') {
                  errors.push(result);
                } else if (!result) {
                  errors.push(rule.message || '验证失败');
                }
              }
            } catch (error) {
              errors.push(rule.message || '验证失败');
            }
          }
        }

        // 自定义验证函数
        if (validator) {
          try {
            const result = validator(switchValue);
            if (result instanceof Promise) {
              const asyncResult = await result;
              if (typeof asyncResult === 'string') {
                errors.push(asyncResult);
              } else if (!asyncResult) {
                errors.push('验证失败');
              }
            } else {
              if (typeof result === 'string') {
                errors.push(result);
              } else if (!result) {
                errors.push('验证失败');
              }
            }
          } catch (error) {
            errors.push('验证失败');
          }
        }

        const result: SwitchValidationResult = {
          valid: errors.length === 0,
          message: errors.length > 0 ? errors[0] : undefined,
          value: switchValue,
        };

        setValidationResult(result);
        onValidate?.(result);
        return result;
      },
      [rules, validator, onValidate],
    );

    // 处理值变化
    const handleValueChange = React.useCallback(
      async (newValue: boolean, event: ITouchEvent) => {
        if (internalDisabled || internalReadonly || internalLoading) return;

        if (!isControlled) {
          setInternalValue(newValue);
        }

        // 验证开关值
        if (validateTrigger === 'onChange') {
          await validateSwitch(newValue);
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
        onChange?.(newValue, eventObject);
      },
      [isControlled, internalDisabled, internalReadonly, internalLoading, validateTrigger, validateSwitch, onChange],
    );

    // 处理点击事件
    const handleClick = React.useCallback(
      async (event: ITouchEvent) => {
        if (internalDisabled || internalReadonly || internalLoading) return;

        const newValue = !value;
        await handleValueChange(newValue, event);
        onClick?.(newValue, event);
      },
      [value, internalDisabled, internalReadonly, internalLoading, handleValueChange, onClick],
    );

    // 计算最终状态
    const finalStatus = internalDisabled ? 'disabled' : validationResult?.valid === false ? 'error' : internalStatus;

    // 更新当前状态引用
    React.useEffect(() => {
      currentStatusRef.current = finalStatus;
    }, [finalStatus]);

    // 暴露给外部的引用方法
    React.useImperativeHandle(
      ref,
      () => ({
        element: switchRef.current,
        getValue: () => currentValueRef.current,
        setValue: (newValue: boolean) => {
          if (!isControlled) {
            setInternalValue(newValue);
            currentValueRef.current = newValue;
          }
        },
        toggle: () => {
          const newValue = !currentValueRef.current;
          if (!isControlled) {
            setInternalValue(newValue);
            currentValueRef.current = newValue;
          }
          const eventObject = {} as ITouchEvent;
          onChange?.(newValue, eventObject);
        },
        focus: () => {
          if (switchRef.current && !internalDisabled && !internalReadonly) {
            switchRef.current.focus();
          }
        },
        blur: () => {
          if (switchRef.current) {
            switchRef.current.blur();
          }
        },
        setDisabled: (newDisabled: boolean) => {
          setInternalDisabled(newDisabled);
          currentStatusRef.current = newDisabled ? 'disabled' : 'normal';
        },
        setReadonly: (newReadonly: boolean) => {
          setInternalReadonly(newReadonly);
        },
        setLoading: (newLoading: boolean) => {
          setInternalLoading(newLoading);
          currentStatusRef.current = newLoading ? 'loading' : 'normal';
          onLoadingChange?.(newLoading);
        },
        setStatus: (newStatus: 'normal' | 'error' | 'checked' | 'unchecked' | 'disabled' | 'loading') => {
          setInternalStatus(newStatus);
          currentStatusRef.current = newStatus;
        },
        getSize: () => size,
        setSize: (newSize: 'sm' | 'md' | 'lg') => {
          // Size is controlled by parent
        },
        getColor: () => color,
        setColor: (newColor: string) => {
          // Color is controlled by parent
        },
        getStatus: () =>
          currentStatusRef.current as 'normal' | 'error' | 'checked' | 'unchecked' | 'disabled' | 'loading',
        validate: async () => {
          const result = await validateSwitch(value);
          setInternalStatus(result.valid ? 'normal' : 'error');
          return result;
        },
        reset: () => {
          if (!isControlled) {
            setInternalValue(defaultValue);
          }
          setValidationResult(null);
          setInternalStatus('normal');
        },
        getValidationResult: () => validationResult,
      }),
      [
        value,
        isControlled,
        defaultValue,
        internalDisabled,
        internalReadonly,
        validateSwitch,
        onChange,
        onLoadingChange,
        finalStatus,
        validationResult,
      ],
    );

    // 获取标签文本
    const getLabelText = () => {
      if (!showLabel) return null;
      return value ? checkedLabel : uncheckedLabel;
    };

    // 获取图标
    const getIcon = () => {
      if (value && checkedIcon) {
        return checkedIcon;
      }
      if (!value && uncheckedIcon) {
        return uncheckedIcon;
      }
      return null;
    };

    return (
      <View style={switchStyles['getContainerStyle']({ block, style: containerStyle })} className={containerClassName}>
        {/* 开关包装器 */}**
        <View
          ref={switchRef}
          style={switchStyles['getWrapperStyle']({
            size,
            disabled: internalDisabled,
            readonly: internalReadonly,
          })}
          data-testid="switch"
          onClick={handleClick}
          {...a11y.getAriaAttributes()}
        >
          {/* 标签 */}**
          {showLabel && (
            <Text style={switchStyles['getLabelStyle']({ size, disabled: internalDisabled })}>{getLabelText()}</Text>
          )}

          {/* 开关轨道 */}**
          <View
            style={switchStyles['getTrackStyle']({
              size,
              variant,
              color,
              checked: value,
              disabled: internalDisabled,
              loading: internalLoading,
              status: finalStatus,
              bordered,
              style,
            })}
            className={switchStyles['getTrackClassName']({
              size,
              variant,
              color,
              status: finalStatus,
              disabled: internalDisabled,
              loading: internalLoading,
              checked: value,
              bordered,
              className,
            })}
          >
            {/* 开关滑块 */}**
            <View
              style={switchStyles['getThumbStyle']({
                size,
                checked: value,
                disabled: internalDisabled,
                loading: internalLoading,
              })}
              className={switchStyles['getThumbClassName']({
                size,
                disabled: internalDisabled,
                loading: internalLoading,
                checked: value,
              })}
            >
              {/* 图标 */}**
              {getIcon()}
            </View>

            {/* 加载遮罩 */}**
            {internalLoading && showLoadingMask && (
              <View style={switchStyles['getLoadingMaskStyle']({ size })}>
                <View style={switchStyles['getLoadingIndicatorStyle']({ size })} />
              </View>
            )}
          </View>

          {/* 加载文本 */}**
          {internalLoading && loadingText && (
            <Text style={switchStyles['getHelperTextStyle']({ size })}>{loadingText}</Text>
          )}
        </View>

        {/* 辅助文本 */}**
        {helperText && finalStatus === 'normal' && (
          <Text style={switchStyles['getHelperTextStyle']({ size })}>{helperText}</Text>
        )}

        {/* 错误文本 */}**
        {errorText && finalStatus === 'error' && (
          <Text style={switchStyles['getErrorTextStyle']({ size })}>{errorText}</Text>
        )}

        {/* 验证结果文本 */}**
        {validationResult?.message && finalStatus === 'error' && (
          <Text style={switchStyles['getErrorTextStyle']({ size })}>{validationResult.message}</Text>
        )}
      </View>
    );
  },
});

/** 开关组件显示名称 */
Switch.displayName = 'Switch';

/** 导出开关组件 */
export default Switch;