import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Textarea as TaroTextarea, View, Text } from '@tarojs/components';
import { textareaStyles } from './Textarea.styles';
import type {
  TextareaProps,
  TextareaRef,
  TextareaStatus,
  TextareaValidationResult,
  TextareaRule,
} from './Textarea.types';
import { createComponent } from '@/utils/createComponent';
import { useMicroAnimation } from '@/hooks/ui/useMicroAnimation';
import { useAccessibility, ARIA_ROLES } from '@/hooks/ui/useAccessibility';

/**
 * 文本域组件 (Textarea)
 * @module components/form/Textarea
 * @description 用于输入多行文本的表单组件，支持字数统计和自动调整高度
 * @example
 * ```tsx
 * import { Textarea } from 'orva-ui';
 *
 * <Textarea
 *   placeholder="请输入内容"
 *   maxLength={500}
 *   showCount
 *   onChange={(value) => console.log(value)}
 * />
 * ```
 */
export const Textarea = createComponent<TextareaProps, TextareaRef>({
  name: 'Textarea',
  render: (props, ref) => {
    const {
      value: controlledValue,
      defaultValue = '',
      placeholder,
      size = 'md',
      variant = 'outlined',
      status: propStatus = 'normal',
      disabled = false,
      readonly = false,
      clearable = false,
      clearTrigger = 'focus',
      maxLength,
      minLength,
      rows = 3,
      minRows = 1,
      maxRows = 10,
      autoHeight = false,
      autoHeightStrategy = 'content',
      resize = 'vertical',
      showCount = false,
      counterPosition = 'bottom-right',
      showWordLimit = false,
      autoFocus = false,
      bordered = true,
      label,
      helperText,
      errorText,
      prefix,
      suffix,
      rules,
      validateTrigger = 'onBlur',
      immediate = false,
      validator,
      onChange,
      onFocus,
      onBlur,
      onInput,
      onClear,
      onConfirm,
      onKeyboardHeightChange,
      onHeightChange,
      onValidate,
      className,
      style,
      containerClassName,
      containerStyle,
      block = true,
      accessible = true,
      accessibilityLabel,
      accessibilityRole = 'textbox',
      accessibilityState,
      ...restProps
    } = props;

    const nativeTextareaRef = useRef<HTMLTextAreaElement>(null);
    const [internalValue, setInternalValue] = useState(defaultValue);
    const [isFocused, setIsFocused] = useState(false);
    const [internalStatus, setInternalStatus] = useState<TextareaStatus>(propStatus);
    const [internalDisabled, setInternalDisabled] = useState(disabled);
    const [internalReadonly, setInternalReadonly] = useState(readonly);
    const [validationResult, setValidationResult] = useState<TextareaValidationResult | null>(null);
    const [currentHeight, setCurrentHeight] = useState(0);

    const isControlled = controlledValue !== undefined;
    const value = isControlled ? controlledValue : internalValue;

    useEffect(() => { setInternalStatus(propStatus); }, [propStatus]);
    useEffect(() => { setInternalDisabled(disabled); }, [disabled]);
    useEffect(() => { setInternalReadonly(readonly); }, [readonly]);
    useEffect(() => { if (autoFocus && nativeTextareaRef.current) nativeTextareaRef.current.focus(); }, [autoFocus]);
    useEffect(() => { if (immediate && value) validateInput(value); }, [immediate, value]);
    useEffect(() => { if (autoHeight && nativeTextareaRef.current) adjustTextareaHeight(); }, [value, autoHeight, autoHeightStrategy, rows, minRows, maxRows]);

    const validateInput = useCallback(
      async (inputValue: string): Promise<TextareaValidationResult> => {
        if (!rules && !validator) return { valid: true, value: inputValue, timestamp: Date.now() };

        if (rules?.some((rule: TextareaRule) => rule.required && !inputValue.trim())) {
          const requiredRule = rules.find((rule: TextareaRule) => rule.required);
          return { valid: false, message: requiredRule?.message || '此字段为必填项', value: inputValue, timestamp: Date.now() };
        }

        if (minLength !== undefined && inputValue.length < minLength) {
          return { valid: false, message: `最少需要${minLength}个字符`, value: inputValue, timestamp: Date.now() };
        }

        if (maxLength !== undefined && inputValue.length > maxLength) {
          return { valid: false, message: `最多允许${maxLength}个字符`, value: inputValue, timestamp: Date.now() };
        }

        if (rules) {
          for (let i = 0; i < rules.length; i++) {
            const rule = rules[i];
            if (rule.pattern && !rule.pattern.test(inputValue)) {
              return { valid: false, message: rule.message || '输入格式不正确', ruleIndex: i, value: inputValue, timestamp: Date.now() };
            }
            if (rule.validator) {
              const result = await rule.validator(inputValue);
              if (typeof result === 'string') return { valid: false, message: result, ruleIndex: i, value: inputValue, timestamp: Date.now() };
              if (!result) return { valid: false, message: rule.message || '输入格式不正确', ruleIndex: i, value: inputValue, timestamp: Date.now() };
            }
          }
        }

        if (validator) {
          const result = await validator(inputValue);
          if (typeof result === 'string') return { valid: false, message: result, value: inputValue, timestamp: Date.now() };
          if (!result) return { valid: false, message: '验证失败', value: inputValue, timestamp: Date.now() };
        }

        return { valid: true, value: inputValue, timestamp: Date.now() };
      },
      [rules, validator, minLength, maxLength],
    );

    const formatInputValue = useCallback(
      (inputValue: string): string => {
        let formattedValue = inputValue.replace(/[<>]/g, '');
        if (maxLength && formattedValue.length > maxLength) formattedValue = formattedValue.slice(0, maxLength);
        return formattedValue;
      },
      [maxLength],
    );

    const adjustTextareaHeight = useCallback(() => {
      if (!nativeTextareaRef.current || !autoHeight) return;
      const element = nativeTextareaRef.current;
      const previousHeight = element.offsetHeight;
      textareaStyles['adjustTextareaHeight'](element, autoHeightStrategy, rows, minRows, maxRows);
      const newHeight = element.offsetHeight;
      if (previousHeight !== newHeight) {
        setCurrentHeight(newHeight);
        onHeightChange?.(newHeight, {});
      }
    }, [autoHeight, autoHeightStrategy, rows, minRows, maxRows, onHeightChange]);

    const handleValueChange = useCallback(
      async (newValue: string, event: any) => {
        const formattedValue = formatInputValue(newValue);
        if (!isControlled) setInternalValue(formattedValue);
        onInput?.(formattedValue, event);
        if (validateTrigger === 'onChange') {
          const result = await validateInput(formattedValue);
          setValidationResult(result);
          setInternalStatus(result.valid ? 'normal' : 'error');
          onValidate?.(result);
        }
        onChange?.(formattedValue, event);
      },
      [isControlled, formatInputValue, onInput, validateTrigger, validateInput, onChange, onValidate],
    );

    const handleFocus = useCallback(
      async (event: any) => {
        if (internalDisabled || internalReadonly) return;
        setIsFocused(true);
        onFocus?.(event);
        if (validateTrigger === 'onFocus') {
          const result = await validateInput(value as string);
          setValidationResult(result);
          setInternalStatus(result.valid ? 'normal' : 'error');
          onValidate?.(result);
        }
      },
      [internalDisabled, internalReadonly, onFocus, validateTrigger, validateInput, value, onValidate],
    );

    const handleBlur = useCallback(
      async (event: any) => {
        if (internalDisabled || internalReadonly) return;
        setIsFocused(false);
        onBlur?.(event);
        if (validateTrigger === 'onBlur') {
          const result = await validateInput(value as string);
          setValidationResult(result);
          setInternalStatus(result.valid ? 'normal' : 'error');
          onValidate?.(result);
        }
      },
      [internalDisabled, internalReadonly, onBlur, validateTrigger, validateInput, value, onValidate],
    );

    const handleConfirm = useCallback(
      async (event: any) => {
        if (internalDisabled || internalReadonly) return;
        onConfirm?.(value as string, event);
        if (validateTrigger === 'onSubmit') {
          const result = await validateInput(value as string);
          setValidationResult(result);
          setInternalStatus(result.valid ? 'normal' : 'error');
          onValidate?.(result);
        }
      },
      [internalDisabled, internalReadonly, onConfirm, validateTrigger, validateInput, value, onValidate],
    );

    const handleClear = useCallback(
      (event: any) => {
        if (internalDisabled || internalReadonly) return;
        if (!isControlled) setInternalValue('');
        setValidationResult(null);
        setInternalStatus('normal');
        onClear?.(event);
        onChange?.('', event);
      },
      [internalDisabled, internalReadonly, isControlled, onClear, onChange],
    );

    const shouldShowClear = useCallback(() => {
      if (!clearable || internalDisabled || internalReadonly) return false;
      switch (clearTrigger) {
        case 'always': return !!value;
        case 'focus': return isFocused && !!value;
        case 'never': return false;
        default: return false;
      }
    }, [clearable, internalDisabled, internalReadonly, value, isFocused, clearTrigger]);

    const finalStatus = internalDisabled ? 'disabled' : validationResult?.valid === false ? 'error' : internalStatus;

    const calculateLength = useCallback((text: string) => {
      return Array.from(text).reduce((len, char) => len + (char.charCodeAt(0) > 127 ? 2 : 1), 0);
    }, []);

    const currentLength = calculateLength(value as string);
    const maxLengthToShow = maxLength;

    const animation = useMicroAnimation({ type: 'micro', enabled: !disabled });
    const a11y = useAccessibility({
      role: ARIA_ROLES.textbox,
      label: accessibilityLabel || (typeof label === 'string' ? label : undefined),
      attributes: {
        'aria-multiline': 'true',
        'aria-disabled': internalDisabled,
        'aria-readonly': internalReadonly,
        'aria-required': rules?.some((rule: TextareaRule) => rule.required),
        'aria-invalid': validationResult?.valid === false,
        ...accessibilityState,
      },
    });

    const textareaStyle = textareaStyles['getStyle']({ size, variant, status: finalStatus, disabled: internalDisabled, readonly: internalReadonly, resize: resize as unknown as string, ...style } as Parameters<typeof textareaStyles['getStyle']>[0]);
    const textareaClassName = textareaStyles['getClassName']({ size, variant, status: finalStatus, disabled: internalDisabled, readonly: internalReadonly, bordered, clearable: shouldShowClear(), autoHeight, showCount, className });
    const autoHeightStyle = autoHeight ? textareaStyles['getAutoHeightStyle']({ size, minRows, maxRows }) : {};

    React.useImperativeHandle(
      ref,
      () => ({
        element: nativeTextareaRef.current,
        getValue: () => value as string,
        setValue: (newValue: string) => { if (!isControlled) setInternalValue(newValue); },
        focus: () => { if (nativeTextareaRef.current && !internalDisabled && !internalReadonly) nativeTextareaRef.current.focus(); },
        blur: () => { if (nativeTextareaRef.current) nativeTextareaRef.current.blur(); },
        select: () => { if (nativeTextareaRef.current) nativeTextareaRef.current.select(); },
        setSelectionRange: (start: number, end: number) => { if (nativeTextareaRef.current && 'setSelectionRange' in nativeTextareaRef.current) nativeTextareaRef.current.setSelectionRange(start, end); },
        getSelectionRange: () => { if (nativeTextareaRef.current && 'selectionStart' in nativeTextareaRef.current) return { start: nativeTextareaRef.current.selectionStart || 0, end: nativeTextareaRef.current.selectionEnd || 0 }; return { start: 0, end: 0 }; },
        setDisabled: (newDisabled: boolean) => setInternalDisabled(newDisabled),
        setReadonly: (newReadonly: boolean) => setInternalReadonly(newReadonly),
        setStatus: (newStatus: TextareaStatus) => setInternalStatus(newStatus),
        getStatus: () => finalStatus,
        validate: async () => { const result = await validateInput(value as string); setValidationResult(result); setInternalStatus(result.valid ? 'normal' : 'error'); onValidate?.(result); return result; },
        clear: () => handleClear({} as any),
        reset: () => { if (!isControlled) setInternalValue(defaultValue); setValidationResult(null); setInternalStatus('normal'); },
        adjustHeight: adjustTextareaHeight,
        getHeight: () => currentHeight,
        getScrollHeight: () => nativeTextareaRef.current?.scrollHeight || 0,
        scrollToBottom: () => { if (nativeTextareaRef.current) nativeTextareaRef.current.scrollTop = nativeTextareaRef.current.scrollHeight; },
        scrollToTop: () => { if (nativeTextareaRef.current) nativeTextareaRef.current.scrollTop = 0; },
        getValidationResult: () => validationResult,
      }),
      [value, isControlled, internalDisabled, internalReadonly, validateInput, handleClear, defaultValue, finalStatus, adjustTextareaHeight, currentHeight, validationResult, onValidate],
    );

    const mergedContainerStyle = animation.getMergedStyle(textareaStyles['getContainerStyle']({ size, block, style: containerStyle }));
    const mergedTextareaStyle = animation.getMergedStyle({ ...textareaStyle, ...autoHeightStyle });

    return (
      <View className={containerClassName} style={mergedContainerStyle} {...a11y.getAriaAttributes()}>
        {label && <Text style={textareaStyles['getLabelStyle']({ size, disabled: internalDisabled })}>{label}</Text>}
        <View style={textareaStyles['getWrapperStyle']({ size, status: finalStatus, disabled: internalDisabled, readonly: internalReadonly, bordered, autoHeight, rows })}>
          {prefix && <View style={textareaStyles['getPrefixStyle']({ size, disabled: internalDisabled })}>{prefix}</View>}
          <TaroTextarea
            ref={nativeTextareaRef}
            className={textareaClassName}
            style={mergedTextareaStyle}
            value={value}
            placeholder={placeholder}
            disabled={internalDisabled}
            readOnly={internalReadonly}
            maxlength={maxLength}
            autoFocus={autoFocus}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onConfirm={handleConfirm}
            onInput={(e: unknown) => {
              const detail = (e as { detail?: { value?: string } }).detail;
              handleValueChange(detail?.value || '', e as Event);
            }}
            onKeyboardHeightChange={(e: unknown) => {
              const detail = (e as { detail?: { height?: number } }).detail;
              onKeyboardHeightChange?.(detail?.height || 0, e as Event);
            }}
            accessible={accessible}
            aria-label={accessibilityLabel}
            aria-role={accessibilityRole}
            {...restProps}
          />
          {suffix && <View style={textareaStyles['getSuffixStyle']({ size, disabled: internalDisabled })}>{suffix}</View>}
          {shouldShowClear() && (
            <View style={textareaStyles['getClearButtonStyle']({ size })} onClick={handleClear}>
              <Text>×</Text>
            </View>
          )}
          {(showCount || showWordLimit) && maxLengthToShow && (
            <View style={textareaStyles['getCounterStyle']({ size, position: counterPosition })}>
              <Text>{currentLength}/{maxLengthToShow}</Text>
            </View>
          )}
        </View>
        {helperText && finalStatus === 'normal' && (
          <Text style={textareaStyles['getHelperTextStyle']({ size, status: finalStatus })}>{helperText}</Text>
        )}
        {errorText && finalStatus === 'error' && (
          <Text style={textareaStyles['getErrorTextStyle']({ size })}>{errorText}</Text>
        )}
        {validationResult?.message && finalStatus === 'error' && (
          <Text style={textareaStyles['getErrorTextStyle']({ size })}>{validationResult.message}</Text>
        )}
      </View>
    );
  },
});

export default Textarea;