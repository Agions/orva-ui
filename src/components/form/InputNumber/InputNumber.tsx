import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Input as TaroInput, View, Text } from '@tarojs/components';
import type { ITouchEvent } from '@tarojs/components';
import { inputNumberStyles } from './InputNumber.styles';
import type {
  InputNumberProps,
  InputNumberRef,
  InputNumberStatus,
  InputNumberValidationResult,
} from './InputNumber.types';
import { useInputNumberState } from './hooks/useInputNumberState';
import { useInputNumberValidation } from './hooks/useInputNumberValidation';
import { InputNumberControls } from './components/InputNumberControls';
import { InputNumberClearButton } from './components/InputNumberClearButton';
import { createComponent } from '@/utils/createComponent';
import { useMicroAnimation } from '@/hooks/ui/useMicroAnimation';
import { useAccessibility, ARIA_ROLES } from '@/hooks/ui/useAccessibility';

/** 数字输入框组件 */
export const InputNumber = createComponent<InputNumberProps, InputNumberRef>({
  name: 'InputNumber',
  render: (props, ref) => {
    const {
      value: controlledValue,
      defaultValue = null,
      placeholder,
      size = 'md',
      variant = 'outlined',
      status: propStatus = 'normal',
      disabled = false,
      readonly = false,
      min,
      max,
      step = 1,
      stepMode = 'continuous',
      precision = 0,
      controls = false,
      controlsPosition = 'end',
      clearable = false,
      clearTrigger = 'focus',
      autoFocus = false,
      bordered = true,
      label,
      helperText,
      errorText,
      prefix,
      suffix,
      formatConfig = { type: 'decimal', precision: 0 },
      rules,
      validateTrigger = 'onBlur',
      immediate = false,
      validator,
      onChange,
      onFocus,
      onBlur,
      onInput,
      onClear,
      onStep,
      onValidate,
      className,
      style,
      containerClassName,
      containerStyle,
      block = true,
      ...restProps
    } = props;

    const [validationResult, setValidationResult] = useState<InputNumberValidationResult | null>(null);

    const {
      value,
      displayText,
      isFocused,
      internalStatus,
      internalDisabled,
      internalReadonly,
      nativeInputRef,
      handleValueChange,
      handleTextChange,
      handleFocus,
      handleBlur,
      validateInput,
      setInternalStatus,
      setInternalDisabled,
      setInternalReadonly,
    } = useInputNumberState({
      value: controlledValue,
      defaultValue,
      disabled,
      readonly,
      status: propStatus,
      autoFocus,
      immediate,
      min,
      max,
      precision,
      formatConfig,
      rules,
      validateTrigger,
      validator,
      onValidate,
    });

    useInputNumberValidation({ rules, validator, min, max });

    useEffect(() => {
      if (onChange) onChange(value);
      if (onInput) onInput(value);
    }, [value, onChange, onInput]);

    const handleClear = useCallback(
      (event: ITouchEvent) => {
        if (internalDisabled || internalReadonly) return;
        handleValueChange(null, event);
        setValidationResult(null);
        setInternalStatus('normal');
        onClear?.(event);
      },
      [internalDisabled, internalReadonly, handleValueChange, onClear],
    );

    const handleStep = useCallback(
      async (direction: 'up' | 'down', event: ITouchEvent) => {
        if (internalDisabled || internalReadonly) return;
        const currentValue = value || 0;
        const newValue = direction === 'up' ? currentValue + step : currentValue - step;
        const clampedValue = inputNumberStyles['clampValue'](newValue, min, max);
        const roundedValue = inputNumberStyles['roundValue'](clampedValue, precision);
        await handleValueChange(roundedValue, event);
        onStep?.(roundedValue, direction, event);
      },
      [internalDisabled, internalReadonly, value, step, min, max, precision, handleValueChange, onStep],
    );

    const shouldShowClear = useCallback(() => {
      if (!clearable || internalDisabled || internalReadonly) return false;
      switch (clearTrigger) {
        case 'always': return value !== null;
        case 'focus': return isFocused && value !== null;
        case 'never': return false;
        default: return false;
      }
    }, [clearable, internalDisabled, internalReadonly, value, isFocused, clearTrigger]);

    const finalStatus = internalDisabled ? 'disabled' : validationResult?.valid === false ? 'error' : internalStatus;

    const inputStyle = inputNumberStyles['getStyle']({ size, variant, status: finalStatus, disabled: internalDisabled, readonly: internalReadonly, controls, controlsPosition, style });
    const inputClassName = inputNumberStyles['getClassName']({ size, variant, status: finalStatus, disabled: internalDisabled, readonly: internalReadonly, bordered, clearable: shouldShowClear(), controls, controlsPosition, className });

    const animation = useMicroAnimation({ type: 'micro', enabled: !disabled });
    const a11y = useAccessibility({
      role: ARIA_ROLES.spinbutton,
      label: label,
      attributes: {
        'aria-valuemin': min !== undefined ? String(min) : undefined,
        'aria-valuemax': max !== undefined ? String(max) : undefined,
        'aria-valuenow': value !== null ? String(value) : undefined,
        'aria-disabled': internalDisabled,
        'aria-readonly': internalReadonly,
      },
    });

    React.useImperativeHandle(
      ref,
      () => ({
        element: nativeInputRef.current,
        getValue: () => value,
        setValue: (newValue: number | null) => handleValueChange(newValue, {} as ITouchEvent),
        focus: () => {
          if (nativeInputRef.current && !internalDisabled && !internalReadonly) nativeInputRef.current.focus();
        },
        blur: () => {
          if (nativeInputRef.current) nativeInputRef.current.blur();
        },
        select: () => {
          if (nativeInputRef.current) nativeInputRef.current.select();
        },
        setSelectionRange: (start: number, end: number) => {
          if (nativeInputRef.current && 'setSelectionRange' in nativeInputRef.current) nativeInputRef.current.setSelectionRange(start, end);
        },
        getSelectionRange: () => {
          if (nativeInputRef.current && 'selectionStart' in nativeInputRef.current) return { start: nativeInputRef.current.selectionStart || 0, end: nativeInputRef.current.selectionEnd || 0 };
          return { start: 0, end: 0 };
        },
        setDisabled: (newDisabled: boolean) => setInternalDisabled(newDisabled),
        setReadonly: (newReadonly: boolean) => setInternalReadonly(newReadonly),
        setStatus: (newStatus: InputNumberStatus) => setInternalStatus(newStatus),
        getStatus: () => finalStatus,
        validate: async () => {
          const result = await validateInput(value);
          setValidationResult(result);
          setInternalStatus(result.valid ? 'normal' : 'error');
          onValidate?.(result);
          return result;
        },
        clear: () => handleClear({} as ITouchEvent),
        reset: () => {
          handleValueChange(defaultValue, {} as ITouchEvent);
          setValidationResult(null);
          setInternalStatus('normal');
        },
        stepUp: (customStep?: number) => {
          const actualStep = customStep ?? step;
          const currentValue = value || 0;
          const newValue = currentValue + actualStep;
          const clampedValue = inputNumberStyles['clampValue'](newValue, min, max);
          const roundedValue = inputNumberStyles['roundValue'](clampedValue, precision);
          handleValueChange(roundedValue, {} as ITouchEvent);
          onStep?.(roundedValue, 'up', {} as ITouchEvent);
        },
        stepDown: (customStep?: number) => {
          const actualStep = customStep ?? step;
          const currentValue = value || 0;
          const newValue = currentValue - actualStep;
          const clampedValue = inputNumberStyles['clampValue'](newValue, min, max);
          const roundedValue = inputNumberStyles['roundValue'](clampedValue, precision);
          handleValueChange(roundedValue, {} as ITouchEvent);
          onStep?.(roundedValue, 'down', {} as ITouchEvent);
        },
        getValidationResult: () => validationResult,
      }),
      [value, handleValueChange, defaultValue, internalDisabled, internalReadonly, validateInput, handleClear, finalStatus, step, min, max, precision, onStep, validationResult, onValidate],
    );

    const mergedContainerStyle = animation.getMergedStyle(inputNumberStyles['getContainerStyle']({ size, block, style: containerStyle }));
    const mergedInputStyle = animation.getMergedStyle(inputStyle);

    return (
      <View className={containerClassName} style={mergedContainerStyle} {...a11y.getAriaAttributes()}>
        {label && <Text style={inputNumberStyles['getLabelStyle']({ size, disabled: internalDisabled })}>{label}</Text>}
        <View style={inputNumberStyles['getWrapperStyle']({ size, status: finalStatus, disabled: internalDisabled, readonly: internalReadonly, bordered, controls, controlsPosition })}>
          {prefix && (
            <View style={inputNumberStyles['getPrefixStyle']({ size, disabled: internalDisabled, controls, controlsPosition })}>
              {prefix}
            </View>
          )}
          {controls && (
            <InputNumberControls size={size} controlsPosition={controlsPosition} disabled={internalDisabled} readonly={internalReadonly} onStep={handleStep} />
          )}
          <TaroInput
            ref={nativeInputRef}
            className={inputClassName}
            style={mergedInputStyle}
            value={displayText}
            placeholder={placeholder}
            disabled={internalDisabled || internalReadonly}
            type="digit"
            onFocus={handleFocus as any}
            onBlur={handleBlur as any}
            onInput={(e) => handleTextChange(e.detail.value, e as any)}
            {...restProps}
          />
          {suffix && (
            <View style={inputNumberStyles['getSuffixStyle']({ size, disabled: internalDisabled, controls, controlsPosition })}>
              {suffix}
            </View>
          )}
          {shouldShowClear() && (
            <InputNumberClearButton size={size} disabled={internalDisabled} readonly={internalReadonly} onClear={handleClear} />
          )}
        </View>
        {helperText && finalStatus === 'normal' && (
          <Text style={inputNumberStyles['getHelperTextStyle']({ size, status: finalStatus })}>{helperText}</Text>
        )}
        {errorText && finalStatus === 'error' && (
          <Text style={inputNumberStyles['getErrorTextStyle']({ size })}>{errorText}</Text>
        )}
        {validationResult?.message && finalStatus === 'error' && (
          <Text style={inputNumberStyles['getErrorTextStyle']({ size })}>{validationResult.message}</Text>
        )}
      </View>
    );
  },
});

export default InputNumber;