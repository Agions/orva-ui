/**
 * Input 输入框组件类型定义
 * @module components/basic/Input/Input.types
 */

import type { BaseProps } from '@/types/component';
import type { InputStatus, InputVariant } from './types';

export type { InputVariant } from './types';

/** Input 类型 */
export type InputType = 'text' | 'number' | 'password' | 'email' | 'tel' | 'url' | 'search';

/** Input 尺寸 */
export type InputSize = 'xs' | 'sm' | 'md' | 'lg';

/** Input 属性 */
export interface InputProps extends BaseProps {
  /** 输入框类型 */
  type?: InputType;
  /** 输入框尺寸 */
  size?: InputSize;
  /** 是否禁用 */
  disabled?: boolean;
  /** 是否只读 */
  readonly?: boolean;
  /** 占位符文本 */
  placeholder?: string;
  /** 当前值（受控模式） */
  value?: string;
  /** 默认值（非受控模式） */
  defaultValue?: string;
  /** 值变更回调 */
  onChange?: (value: string) => void;
  /** 聚焦回调 */
  onFocus?: (event?: unknown) => void;
  /** 失焦回调 */
  onBlur?: (event?: unknown) => void;
  /** 清除回调 */
  onClear?: () => void;
  /** 是否显示清除按钮 */
  clearable?: boolean;
  /** 是否显示密码切换 */
  showPassword?: boolean;
  /** 是否显示边框 */
  border?: boolean;
  /** 前缀内容 */
  prefix?: React.ReactNode;
  /** 后缀内容 */
  suffix?: React.ReactNode;
  /** 是否可聚焦 */
  focusable?: boolean;
  /** Tab 键顺序 */
  tabIndex?: number;
  /** 验证状态 */
  status?: InputStatus;
  /** 输入框变体 */
  inputVariant?: InputVariant;
  /** 浮动标签 */
  label?: string;
  /** 辅助文本 */
  helperText?: string;
  /** 错误文本 */
  errorText?: string;
  /** 成功文本 */
  successText?: string;
  /** 最大字符数 */
  maxLength?: number;
  /** 密码模式 */
  password?: boolean;
}

/** Input Ref */
export interface InputRef {
  /** 获取输入框 DOM 元素 */
  focus: () => void;
  /** 清空输入框 */
  clear: () => void;
  /** 设置值 */
  setValue: (value: string) => void;
}