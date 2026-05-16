/**
 * Radio 单选框组件
 * @module components/form/Radio
 * @description 单选框组件，支持受控/非受控模式、验证规则、自定义样式、动画效果和可访问性支持。通常与 RadioGroup 配合使用。
 *
 * @example
 * ```tsx
 * <Radio label="选项 A" checked={value === 'A'} onChange={() => setValue('A')} />
 * <Radio label="选项 B" disabled />
 * ```
 */

import React from 'react';
import { Radio as TaroRadio, Text, View } from '@tarojs/components';
import type { ITouchEvent } from '@tarojs/components';

import { createComponent } from '@/utils/createComponent';
import { useInteractionState } from '@/hooks/ui/useInteractionState';
import { useAccessibility, ARIA_ROLES } from '@/hooks/ui/useAccessibility';
import { radioStyles } from './Radio.styles';
import type { RadioProps, RadioRef, RadioStatus, RadioSize, RadioColor } from './Radio.types';

/**
 * Radio 单选框组件
 * @description 基于 createComponent 构建的单选框组件，支持受控/非受控、验证规则、自定义样式、辅助/错误文本、可访问性。
 *
 * @param props - 单选框属性
 * @param ref - 引用转发对象，类型为 RadioRef
 * @returns 单选框 JSX 元素
 *
 * @example
 * ```tsx
 * <Radio label="男" value="male" checked={gender === 'male'} onChange={handleChange} />
 * <Radio label="女" value="female" checked={gender === 'female'} onChange={handleChange} />
 * ```
 */
export const Radio = createComponent<RadioProps, RadioRef>({
  name: 'Radio',

  defaultProps: {
    // value: undefined,  // RadioProps uses checked instead
    checked: undefined,
    defaultChecked: false,
    size: 'md',
    status: 'normal',
    disabled: false,
    readonly: false,
    label: undefined,
    helperText: undefined,
    errorText: undefined,
    className: '',
    onChange: undefined,
    style: undefined,
    rules: undefined,
    validateTrigger: 'onChange',
    immediate: false,
    validator: undefined,
    animation: true,
    data: undefined,
    containerStyle: undefined,
    wrapperStyle: undefined,
    labelStyle: undefined,
    helperTextStyle: undefined,
    errorTextStyle: undefined,
  },

  render: (props, ref) => {
    const {
      value,
      checked: controlledChecked,
      defaultChecked = false,
      disabled = false,
      readonly = false,
      size = 'md',
      status: propStatus = 'normal',
      label,
      helperText,
      errorText,
      className,
      onChange,
      style,
      rules,
      validateTrigger = 'onChange',
      immediate = false,
      validator,
      animation,
      ...restProps
    } = props;

    const { state: _interactionState, handlers } = useInteractionState({  // interactionState unused
      disabledPress: disabled || readonly,
      disabledHover: disabled,
    });

    const a11y = useAccessibility({
      role: ARIA_ROLES.radio,
      'aria-checked': controlledChecked,
      'aria-disabled': disabled,
      'aria-readonly': readonly,
    });

    const radioRef = React.useRef<HTMLInputElement>(null);
    const [internalChecked, setInternalChecked] = React.useState(defaultChecked);
    const [internalStatus, setInternalStatus] = React.useState<RadioStatus>(propStatus);
    const [internalDisabled, setInternalDisabled] = React.useState(disabled);
    const [internalReadonly, setInternalReadonly] = React.useState(readonly);
    const [validationResult, setValidationResult] = React.useState<{ valid: boolean; message?: string } | null>(null);

    // 处理受控/非受控模式
    const isControlled = controlledChecked !== undefined;
    const checked = isControlled ? controlledChecked : internalChecked;

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

    // 立即验证
    React.useEffect(() => {
      if (immediate && checked) {
        validateRadio(checked);
      }
    }, [immediate, checked]);

    // 验证单选框
    const validateRadio = React.useCallback(
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
              try {
                const result = rule.validator(isChecked);
                if (typeof result === 'string') {
                  return { valid: false, message: result };
                } else if (!result) {
                  return { valid: false, message: rule.message || '验证失败' };
                }
              } catch (error) {
                return { valid: false, message: rule.message || '验证失败' };
              }
            }
          }
        }

        // 自定义验证函数
        if (validator) {
          try {
            const result = validator(isChecked);
            if (typeof result === 'string') {
              return { valid: false, message: result };
            } else if (!result) {
              return { valid: false, message: '验证失败' };
            }
          } catch (error) {
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

        // 验证单选框
        if (validateTrigger === 'onChange') {
          const result = await validateRadio(true);
          setValidationResult(result);
          setInternalStatus(result.valid ? 'normal' : 'error');
        }

        // 触发变化事件 - Radio should always be selected when clicked
        const eventObject = {
          ...event,
          target: event.target || {},
          currentTarget: event.currentTarget || {},
          type: event.type || 'change',
          preventDefault: event.preventDefault || (() => {}),
          stopPropagation: event.stopPropagation || (() => {}),
        };
        onChange?.(true, eventObject);
      },
      [internalDisabled, internalReadonly, validateTrigger, validateRadio, onChange],
    );

    // 计算最终状态
    const finalStatus: RadioStatus = internalDisabled ? 'disabled' : validationResult?.valid === false ? 'error' : internalStatus;

    // 暴露给外部的引用方法
    React.useImperativeHandle(
      ref,
      () => ({
        element: radioRef.current,
        getChecked: () => checked,
        setChecked: (newChecked: boolean) => {
          // 单选框通常由组控制，这里只是内部状态更新
          if (newChecked && !internalDisabled && !internalReadonly) {
            const eventObject = {} as ITouchEvent;
            onChange?.(newChecked, eventObject);
          }
        },
        toggle: () => {
          if (!internalDisabled && !internalReadonly) {
            const newChecked = !checked;
            const eventObject = {} as ITouchEvent;
            onChange?.(newChecked, eventObject);
          }
        },
        setDisabled: (newDisabled: boolean) => {
          setInternalDisabled(newDisabled);
        },
        setReadonly: (newReadonly: boolean) => {
          setInternalReadonly(newReadonly);
        },
        setStatus: (newStatus: RadioStatus) => {
          setInternalStatus(newStatus);
        },
        getSize: () => size,
        setSize: (_newSize: RadioSize) => {  // unused
          // Size is controlled by parent
        },
        getColor: () => props.color || 'primary',
        setColor: (_newColor: RadioColor) => {  // unused
          // Color is controlled by parent
        },
        getStatus: () => finalStatus,
        validate: async () => {
          const result = await validateRadio(checked);
          setValidationResult(result);
          setInternalStatus(result.valid ? 'normal' : 'error');
          return result;
        },
        reset: () => {
          if (!isControlled) {
            setInternalChecked(defaultChecked);
          }
          setValidationResult(null);
          setInternalStatus('normal');
        },
        getData: () => props.data,
        setData: (_newData: Record<string, any>) => {  // unused
          // Data is controlled by parent
        },
        focus: () => {
          radioRef.current?.focus();
        },
        blur: () => {
          radioRef.current?.blur();
        },
        shake: () => {
          // Shake animation implementation would go here
        },
        pulse: () => {
          // Pulse animation implementation would go here
        },
      }),
      [checked, internalDisabled, internalReadonly, validateRadio, onChange, finalStatus, isControlled, defaultChecked],
    );

    // 生成单选框样式
    const radioStyle = radioStyles['getStyle']({
      size,
      status: finalStatus,
      disabled: internalDisabled,
      readonly: internalReadonly,
      checked,
      style,
    });

    // 生成单选框类名
    const radioClassName = radioStyles['getClassName']({
      size,
      status: finalStatus,
      disabled: internalDisabled,
      readonly: internalReadonly,
      checked,
      className,
    });

    return (
      <View style={radioStyles['getContainerStyle']({ style: props.containerStyle })}>
        <View style={radioStyles['getWrapperStyle']({ style: props.wrapperStyle })}>
          {/* 单选框 */}**
          <TaroRadio
            className={radioClassName}
            style={radioStyle}
            value={String(value || '')}
            checked={checked}
            disabled={internalDisabled}
            onChange={(e: ITouchEvent) => {
              if (!internalDisabled && !internalReadonly) {
                onChange?.(!checked, e);
              }
              handleChange(e);
            }}
            {...handlers}
            {...a11y.getAriaAttributes()}
            {...restProps}
          />

          {/* 标签 */}**
          {label && (
            <Text
              style={radioStyles['getLabelStyle']({
                size,
                disabled: internalDisabled,
                style: props.labelStyle,
              })}
              onClick={handleChange}
            >
              {label}
            </Text>
          )}
        </View>

        {/* 辅助文本 */}**
        {helperText && finalStatus === 'normal' && (
          <Text style={radioStyles['getHelperTextStyle']({ size, style: props.helperTextStyle })}>{helperText}</Text>
        )}

        {/* 错误文本 */}**
        {errorText && finalStatus === 'error' && (
          <Text style={radioStyles['getErrorTextStyle']({ size, style: props.errorTextStyle })}>{errorText}</Text>
        )}

        {/* 验证结果文本 */}**
        {validationResult?.message && finalStatus === 'error' && (
          <Text style={radioStyles['getErrorTextStyle']({ size, style: props.errorTextStyle })}>
            {validationResult.message}
          </Text>
        )}
      </View>
    );
  },
});

/** 单选框组件显示名称 */
Radio.displayName = 'Radio';

/** 导出单选框组件 */
export default Radio;