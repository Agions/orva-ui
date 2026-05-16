/**
 * Input 输入框组件类型定义
 * @module components/basic/Input/Input.types
 */

import type { BaseProps } from '@/types/component';

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
  onFocus?: () => void;
  
  /** 失焦回调 */
  onBlur?: () => void;
  
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
