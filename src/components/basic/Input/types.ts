/**
 * useInput — Headless Input Hook Types
 * @module components/basic/Input/types
 */

import type { ReactNode } from 'react';
import type { InteractionState, InteractionHandlers } from '../../../hooks/ui/useInteractionState';

/** 输入框变体 */
export type InputVariant = 'outline' | 'outlined' | 'filled' | 'underline' | 'underlined';

/** 验证状态 */
export type InputStatus = 'default' | 'danger' | 'success' | 'warning';

/** useInput 配置选项 */
export interface UseInputOptions {
  /** 输入框类型 */
  type?: 'text' | 'password' | 'email' | 'number' | 'tel' | 'url' | 'search';
  /** 尺寸 */
  size?: 'xs' | 'sm' | 'md' | 'lg';
  /** 是否禁用 */
  disabled?: boolean;
  /** 是否只读 */
  readonly?: boolean;
  /** 是否显示清除按钮 */
  clearable?: boolean;
  /** 是否显示边框 */
  border?: boolean;
  /** 是否可聚焦 */
  focusable?: boolean;
  /** Tab 索引 */
  tabIndex?: number;
  /** 默认值（非受控模式） */
  defaultValue?: string;
  /** 当前值（受控模式） */
  value?: string;
  /** 值变化回调 */
  onChange?: (value: string) => void;
  /** 聚焦回调 */
  onFocus?: (event?: unknown) => void;
  /** 失焦回调 */
  onBlur?: (event?: unknown) => void;
  /** 键盘事件 */
  onKeyDown?: (event: unknown) => void;
  /** 清除回调 */
  onClear?: () => void;
  /** 验证状态 */
  status?: InputStatus;
  /** 错误文本 */
  errorText?: string;
  /** 成功文本 */
  successText?: string;
  /** 辅助文本 */
  helperText?: string;
  /** 标签文本 */
  label?: string;
}

/** useInput 返回值 */
export interface UseInputReturn {
  /** 当前显示值 */
  value: string;
  /** 交互状态（悬停、聚焦、按下、激活等） */
  interaction: InteractionState;
  /** 是否可编辑 */
  editable: boolean;
  /** 是否显示清除按钮 */
  clearable: boolean;
  /** 输入变化处理器（Taro 事件模型） */
  handleChange: (e: { detail: { value: string } }) => void;
  /** 清除处理器 */
  handleClear: () => void;
  /** 键盘处理器 */
  handleKeyDown: (event: unknown) => void;
  /** 标准 HTML 属性 */
  htmlProps: {
    disabled: boolean;
    tabIndex: number;
    role: string;
    'aria-disabled'?: boolean;
    'aria-readonly'?: boolean;
    'aria-invalid'?: boolean;
  };
  /** 事件处理器（悬停、按下、焦点、触摸等） */
  eventHandlers: InteractionHandlers;
  /** 验证状态 */
  status: InputStatus;
  /** 状态颜色 */
  statusColor: string;
  /** 是否在错误状态 */
  isError: boolean;
  /** 是否在成功状态 */
  isSuccess: boolean;
  /** 是否在警告状态 */
  isWarning: boolean;
}