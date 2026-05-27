/**
 * useInput — Headless Input Hook
 * @module components/basic/Input/useInput
 */

import { useCallback, useMemo, useState } from 'react';
import { useInteractionState } from '../../../hooks/ui/useInteractionState';
import type { UseInputOptions, UseInputReturn, InputStatus } from './types';

/** 状态颜色映射 */
const STATUS_COLORS: Record<InputStatus, string> = {
  default: '#d1d5db',    // gray-300
  danger: '#ef4444',     // red-500
  success: '#22c55e',    // green-500
  warning: '#f59e0b',    // yellow-500
};

export function useInput(options: UseInputOptions = {}): UseInputReturn {
  const {
    type = 'text',
    size = 'md',
    disabled = false,
    readonly = false,
    clearable = false,
    border = true,
    focusable = true,
    tabIndex = 0,
    defaultValue = '',
    value: controlledValue,
    onChange,
    onFocus,
    onBlur,
    onKeyDown,
    onClear,
    status: propStatus = 'default',
    errorText,
    successText,
    helperText,
    label,
  } = options;

  // 内部状态（非受控模式）
  const [internalValue, setInternalValue] = useState(defaultValue);

  // 判断是否受控
  const isControlled = controlledValue !== undefined;

  // 当前值
  const value = useMemo(() => {
    return isControlled ? controlledValue : internalValue;
  }, [isControlled, controlledValue, internalValue]);

  // 交互状态
  const { state, handlers } = useInteractionState();

  // 是否可编辑
  const editable = useMemo(() => {
    return !disabled && !readonly;
  }, [disabled, readonly]);

  // 验证状态推导
  const status = propStatus;
  const isError = status === 'danger';
  const isSuccess = status === 'success';
  const isWarning = status === 'warning';
  const statusColor = STATUS_COLORS[status];

  // 值变化处理器（Taro 事件模型：{ detail: { value: string } }）
  const handleChange = useCallback(
    (e: { detail: { value: string } }) => {
      const newValue = e.detail?.value ?? '';
      if (!isControlled) {
        setInternalValue(newValue);
      }
      onChange?.(newValue);
    },
    [isControlled, onChange]
  );

  // 清除处理器
  const handleClear = useCallback(() => {
    if (!isControlled) {
      setInternalValue('');
    }
    onChange?.('');
    onClear?.();
  }, [isControlled, onChange, onClear]);

  // 键盘处理器（支持 ESC 清除）
  const handleKeyDown = useCallback(
    (event: unknown) => {
      const ke = event as { key?: string; preventDefault?: () => void };
      if (ke.key === 'Escape' && clearable && value) {
        handleClear();
        ke.preventDefault?.();
      }
      onKeyDown?.(event);
    },
    [clearable, value, handleClear, onKeyDown]
  );

  // HTML 属性
  const htmlProps = useMemo(() => ({
    disabled,
    tabIndex: focusable ? tabIndex : -1,
    role: 'textbox',
    'aria-disabled': disabled ? true : undefined,
    'aria-readonly': readonly ? true : undefined,
    'aria-invalid': isError ? true : (undefined as boolean | undefined),
  }), [disabled, focusable, tabIndex, readonly, isError]);

  return {
    value,
    interaction: state,
    editable,
    clearable: clearable && !!value,
    handleChange,
    handleClear,
    handleKeyDown,
    htmlProps,
    eventHandlers: handlers,
    status,
    statusColor,
    isError,
    isSuccess,
    isWarning,
  };
}