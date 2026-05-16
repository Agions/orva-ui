import React, { useRef, useState, useCallback } from 'react';
import { View, Text } from '@tarojs/components';
import { Input } from '../Input';
import type { TimePickerProps, TimePickerRef, TimeValue } from './TimePicker.types';
import { timePickerStyles } from './TimePicker.styles';
import { createComponent } from '@/utils/createComponent';
import { useMicroAnimation } from '@/hooks/ui/useMicroAnimation';
import { useAccessibility, ARIA_ROLES } from '@/hooks/ui/useAccessibility';
import type { ARIARole } from '@/hooks/ui/useAccessibility';

/** TimeValue 对象类型的辅助类型 */
type TimeValueObject = { hours: number; minutes: number; seconds: number };

/** 时间选择器组件 */
export const TimePicker = createComponent<TimePickerProps, TimePickerRef>({
  name: 'TimePicker',
  render: (props, ref) => {
    const {
      placeholder = '请选择时间',
      value: controlledValue,
      defaultValue = null,
      format = 'HH:mm:ss',
      disabled = false,
      readonly = false,
      allowClear = false,
      size = 'md',
      status = 'normal',
      variant = 'outlined',
      onChange,
      onFocus,
      onBlur,
      onClear,
      className,
      style,
      ...restProps
    } = props;

    const inputRef = useRef<HTMLInputElement>(null);
    const [internalValue, setInternalValue] = useState<TimeValue | null>(defaultValue);
    const [isOpened, setIsOpened] = useState(false);

    const isControlled = controlledValue !== undefined;
    const value = isControlled ? controlledValue : internalValue;

    const formatTime = useCallback(
      (timeValue: TimeValue | null): string => {
        if (!timeValue) return '';
        if (typeof timeValue === 'string' || typeof timeValue === 'number' || timeValue instanceof Date) return String(timeValue);
        const { hours = 0, minutes = 0, seconds = 0 } = timeValue as TimeValueObject;
        const formatValue = (val: number) => val.toString().padStart(2, '0');
        let timeString = `${formatValue(hours)}:${formatValue(minutes)}`;
        if (format.includes('ss')) timeString += `:${formatValue(seconds)}`;
        return timeString;
      },
      [format],
    );

    const parseTime = useCallback((input: string): TimeValue | null => {
      const parts = input.split(':').map((part) => parseInt(part, 10));
      if (parts.length < 2 || parts.some(isNaN)) return null;
      return {
        hours: Math.min(23, Math.max(0, parts[0] || 0)),
        minutes: Math.min(59, Math.max(0, parts[1] || 0)),
        seconds: parts.length > 2 ? Math.min(59, Math.max(0, parts[2] || 0)) : 0,
      } as TimeValueObject;
    }, []);

    const handleInputChange = useCallback(
      (event: { detail?: { value?: string }; target?: { value?: string } } | string, _e?: unknown) => {
        const inputValue = typeof event === 'string' ? event : (event?.detail?.value || event?.target?.value || '');
        const parsedValue = parseTime(inputValue);
        if (parsedValue) {
          if (!isControlled) setInternalValue(parsedValue);
          onChange?.(parsedValue, formatTime(parsedValue));
        }
      },
      [isControlled, parseTime, onChange, formatTime],
    );

    const handleClear = useCallback(
      (event?: { stopPropagation?: () => void }) => {
        if (event?.stopPropagation) event.stopPropagation();
        if (!isControlled) setInternalValue(null);
        onClear?.();
        onChange?.(null, '');
      },
      [isControlled, onClear, onChange],
    );

    const togglePicker = useCallback(() => {
      if (disabled || readonly) return;
      setIsOpened(!isOpened);
    }, [isOpened, disabled, readonly]);

    const animation = useMicroAnimation({ type: 'micro', enabled: !disabled });
    const a11y = useAccessibility({
      role: ((ARIA_ROLES as Record<string, string>).textbox || 'textbox') as unknown as ARIARole,
      label: 'TimePicker',
      attributes: {
        'aria-disabled': String(disabled),
        'aria-readonly': String(readonly),
        'aria-expanded': String(isOpened),
      },
    });

    React.useImperativeHandle(
      ref,
      () => ({
        getValue: () => value,
        setValue: (newValue: TimeValue | null) => {
          if (!isControlled) setInternalValue(newValue);
          onChange?.(newValue, newValue ? formatTime(newValue) : '');
        },
        getRangeValue: () => null,
        setRangeValue: () => {},
        getTimeString: () => (value ? formatTime(value) : ''),
        getRangeTimeString: () => null,
        focus: () => { if (!disabled && !readonly) (inputRef.current as HTMLInputElement)?.focus?.(); },
        blur: () => { (inputRef.current as HTMLInputElement)?.blur?.(); },
        open: () => setIsOpened(true),
        close: () => setIsOpened(false),
        clear: () => { if (!isControlled) setInternalValue(null); onChange?.(null, ''); },
        setNow: () => {
          const now = new Date();
          const newTime: TimeValue = { hours: now.getHours(), minutes: now.getMinutes(), seconds: now.getSeconds() } as TimeValueObject;
          if (!isControlled) setInternalValue(newTime);
          onChange?.(newTime, formatTime(newTime));
        },
        confirm: () => setIsOpened(false),
        disable: () => {},
        enable: () => {},
        isOpen: () => isOpened,
        isDisabled: () => disabled,
        isReadOnly: () => readonly,
        element: inputRef.current,
        getCurrentTime: () => {
          const now = new Date();
          return { hours: now.getHours(), minutes: now.getMinutes(), seconds: now.getSeconds() } as TimeValueObject;
        },
        validateTime: (time: TimeValue) => {
          if (!time || typeof time === 'string' || typeof time === 'number' || time instanceof Date) return true;
          const t = time as TimeValueObject;
          return t.hours >= 0 && t.hours <= 23 && t.minutes >= 0 && t.minutes <= 59 && t.seconds >= 0 && t.seconds <= 59;
        },
        formatTime,
        parseTimeString: parseTime,
      }),
      [value, isControlled, isOpened, disabled, readonly, onChange, formatTime, parseTime],
    );

    const mergedStyle = animation.getMergedStyle({ display: 'flex', alignItems: 'center', position: 'relative' as const, ...style });

    return (
      <View style={mergedStyle} className={`orva-ui-timepicker orva-ui-timepicker--${size} ${className || ''}`} {...a11y.getAriaAttributes()} {...restProps}>
        <Input
          ref={inputRef}
          value={formatTime(value)}
          placeholder={placeholder}
          disabled={disabled}
          readOnly={readonly}
          onInput={handleInputChange}
          onFocus={onFocus}
          onBlur={onBlur}
          onClick={togglePicker}
          style={{ flex: 1 }}
        />
        {allowClear && value && !disabled && !readonly && (
          <Text
            onClick={handleClear}
            style={timePickerStyles['getClearButtonStyle']()}
          >
            ×
          </Text>
        )}
        <Text style={timePickerStyles['getIconStyle']({ disabled })}>🕐</Text>
        {isOpened && (
          <View style={timePickerStyles['getPanelStyle']()}>
            <Text>时间选择面板</Text>
          </View>
        )}
      </View>
    );
  },
});

export default TimePicker;
