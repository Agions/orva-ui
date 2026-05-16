/**
 * Taro-Uno Textarea Component Types
 * 文本域组件类型定义
 */


import type { FormItemProps } from '@/types/component';
import type { ReactNode, CSSProperties, TextareaHTMLAttributes } from 'react';
import type { ITouchEvent } from '@tarojs/components';

/** 文本域状态 */
export type TextareaStatus = 'default' | 'success' | 'warning' | 'error' | 'normal' | 'disabled';

/** 文本尺寸 */
export type TextSize = 'small' | 'medium' | 'large';

/** Textarea 尺寸 */
export type TextareaSize = 'sm' | 'md' | 'lg';

/** Textarea 变体 */
export type TextareaVariant = 'outlined' | 'filled' | 'underlined';

/** Textarea 调整大小方向 */
export type TextareaResize = 'none' | 'both' | 'horizontal' | 'vertical';

/** 自动高度策略 */
export type AutoHeightStrategy = 'content' | 'rows' | 'max-rows';

/** 计数器位置 */
export type CounterPosition = 'top-right' | 'bottom-right' | 'top-left' | 'bottom-left';

/** 清除触发方式 */
export type ClearTrigger = 'always' | 'hover' | 'focus' | 'never';

/** 文本域验证规则 */
export interface TextareaRule {
  required?: boolean;
  message?: string;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  validator?: (_value: string) => boolean | string | Promise<boolean | string>;
}

/** Textarea 组件属性 */
export interface TextareaProps extends Omit<FormItemProps, 'variant'> {
  /** 占位符 */
  placeholder?: string;
  /** 最大长度 */
  maxLength?: number;
  /** 是否显示计数 */
  showCount?: boolean;
  /** 是否可清除 */
  clearable?: boolean;
  /** 清除触发方式 */
  clearTrigger?: ClearTrigger;
  /** 行数 */
  rows?: number;
  /** 最小行数 */
  minRows?: number;
  /** 最大行数 */
  maxRows?: number;
  /** 自动调整高度 */
  autoHeight?: boolean;
  /** 自动高度策略 */
  autoHeightStrategy?: AutoHeightStrategy;
  /** 调整大小 */
  resize?: TextareaResize;
  /** 是否带边框 */
  bordered?: boolean;
  /** 是否只读 */
  readonly?: boolean;
  /** 是否块级显示 */
  block?: boolean;
  /** 尺寸 */
  size?: TextareaSize;
  /** 变体 */
  variant?: TextareaVariant;
  /** 状态 */
  status?: TextareaStatus;
  /** 验证规则 */
  rules?: TextareaRule[];
  /** 验证触发时机 */
  validateTrigger?: 'onChange' | 'onBlur' | 'onFocus' | 'onSubmit';
  /** 计数器位置 */
  counterPosition?: CounterPosition;
  /** 错误文本 */
  errorText?: string;
  /** 辅助文本 */
  helperText?: string;
  /** 标签 */
  label?: ReactNode;
  /** 前缀 */
  prefix?: ReactNode;
  /** 后缀 */
  suffix?: ReactNode;
  /** 立即验证 */
  immediate?: boolean;
  /** 自定义验证器 */
  validator?: (_value: string) => boolean | string | Promise<boolean | string>;
  /** 最小长度 */
  minLength?: number;
  /** 显示字数限制 */
  showWordLimit?: boolean;
  /** 自动聚焦 */
  autoFocus?: boolean;
  /** 容器样式类名 */
  containerClassName?: string;
  /** 容器样式 */
  containerStyle?: React.CSSProperties;
  /** 无障碍支持 */
  accessible?: boolean;
  /** 无障碍标签 */
  accessibilityLabel?: string;
  /** 无障碍角色 */
  accessibilityRole?: string;
  /** 无障碍状态 */
  accessibilityState?: {
    disabled?: boolean;
    readonly?: boolean;
    required?: boolean;
    invalid?: boolean;
    multiline?: boolean;
  };
  /** 值变化回调 */
  onChange?: (_value: string, _event?: any) => void;
  /** 聚焦回调 */
  onFocus?: (_event: any) => void;
  /** 失焦回调 */
  onBlur?: (_event: any) => void;
  /** 输入回调 */
  onInput?: (_value: string, _event?: any) => void;
  /** 确认回调 */
  onConfirm?: (_value: string, _event?: any) => void;
  /** 清除回调 */
  onClear?: (_event?: any) => void;
  /** 验证回调 */
  onValidate?: (_result: TextareaValidationResult) => void;
  /** 键盘高度变化回调 */
  onKeyboardHeightChange?: (_height: number, _event?: any) => void;
  /** 高度变化回调 */
  onHeightChange?: (_height: number, _event?: any) => void;
}

/** Textarea 无障碍属性 */
export interface TextareaAccessibilityProps {
	/** 容器样式类名 */
  containerClassName?: string;
	/** 容器样式 */
  containerStyle?: CSSProperties;
	/** 是否块级显示 */
  block?: boolean;
	/** 无障碍支持 */
  accessible?: boolean;
	/** 无障碍标签 */
  accessibilityLabel?: string;
	/** 无障碍角色 */
  accessibilityRole?: string;
	/** 无障碍状态 */
  accessibilityState?: {
    disabled?: boolean;
    readonly?: boolean;
    required?: boolean;
    invalid?: boolean;
    multiline?: boolean;
  };
	/** 平台特定属性 */
  platform?: {
    weapp?: Record<string, any>;
    alipay?: Record<string, any>;
    h5?: Record<string, any>;
    rn?: Record<string, any>;
  };
	/** 其他属性 */
  [key: string]: any;
}

/** 文本域组件引用类型 */
export type TextareaRef = {
	/** 文本域元素 */
  element: HTMLTextAreaElement | null;
	/** 获取文本域值 */
  getValue: () => string;
	/** 设置文本域值 */
  setValue: (_value: string) => void;
	/** 聚焦文本域 */
  focus: () => void;
	/** 失焦文本域 */
  blur: () => void;
	/** 选择文本 */
  select: () => void;
	/** 设置选中文本范围 */
  setSelectionRange: (_start: number, end: number) => void;
	/** 获取选中文本范围 */
  getSelectionRange: () => { start: number; end: number };
	/** 设置禁用状态 */
  setDisabled: (_disabled: boolean) => void;
	/** 设置只读状态 */
  setReadonly: (_readonly: boolean) => void;
	/** 设置文本域状态 */
  setStatus: (_status: TextareaStatus) => void;
	/** 获取文本域状态 */
  getStatus: () => TextareaStatus;
	/** 验证文本域值 */
  validate: () => Promise<TextareaValidationResult>;
	/** 清除文本域值 */
  clear: () => void;
	/** 重置文本域 */
  reset: () => void;
	/** 调整高度 */
  adjustHeight: () => void;
	/** 获取当前高度 */
  getHeight: () => number;
	/** 获取滚动高度 */
  getScrollHeight: () => number;
	/** 滚动到底部 */
  scrollToBottom: () => void;
	/** 滚动到顶部 */
  scrollToTop: () => void;
	/** 获取验证结果 */
  getValidationResult: () => TextareaValidationResult | null;
};

/** 文本域验证结果接口 */
export interface TextareaValidationResult {
	/** 是否验证通过 */
  valid: boolean;
	/** 错误消息 */
  message?: string;
	/** 验证规则索引 */
  ruleIndex?: number;
	/** 验证时间戳 */
  timestamp: number;
	/** 验证值 */
  value?: string;
}

/** 文本域上下文接口 */
export interface TextareaContext {
	/** 文本域实例 */
  textarea: {
    value: string;
    status: TextareaStatus;
    disabled: boolean;
    readonly: boolean;
    validationResult: TextareaValidationResult | null;
  };
	/** 文本域配置 */
  config: {
    size: TextareaSize;
    variant: TextareaVariant;
    validateTrigger: 'onChange' | 'onBlur' | 'onFocus' | 'onSubmit';
    autoHeight: boolean;
    autoHeightStrategy: AutoHeightStrategy;
    showCount: boolean;
    counterPosition: CounterPosition;
  };
	/** 样式配置 */
  styleConfig: TextareaStyleConfig;
}

/** 文本域样式配置接口 */
export interface TextareaStyleConfig {
	/** 基础样式 */
  base: CSSProperties;
	/** 尺寸样式 */
  sizes: Record<TextareaSize, CSSProperties>;
	/** 变体样式 */
  variants: Record<TextareaVariant, CSSProperties>;
	/** 状态样式 */
  statuses: Record<TextareaStatus, CSSProperties>;
	/** 前缀样式 */
  prefix: CSSProperties;
	/** 后缀样式 */
  suffix: CSSProperties;
	/** 标签样式 */
  label: CSSProperties;
	/** 辅助文本样式 */
  helperText: CSSProperties;
	/** 错误文本样式 */
  errorText: CSSProperties;
	/** 计数器样式 */
  counter: CSSProperties;
	/** 清除按钮样式 */
  clearButton: CSSProperties;
	/** 容器样式 */
  container: CSSProperties;
	/** 包装器样式 */
  wrapper: CSSProperties;
}

/** 文本域工具函数接口 */
export interface TextareaUtils {
	/** 格式化文本值 */
  formatValue: (_value: string, maxLength?: number) => string;
	/** 验证文本值 */
  validateValue: (_value: string, rules?: TextareaRule[]) => Promise<TextareaValidationResult>;
	/** 计算字符长度 */
  calculateLength: (_value: string) => number;
	/** 计算文本域高度 */
  calculateHeight: (_value: string, rows?: number, minRows?: number, maxRows?: number) => number;
	/** 格式化计数器文本 */
  formatCounterText: (_current: number, max?: number) => string;
	/** 获取无障碍状态 */
  getAccessibilityState: (_props: TextareaProps, status: TextareaStatus) => any;
	/** 调整文本域高度 */
  adjustTextareaHeight: (
    element: HTMLTextAreaElement,
    strategy: AutoHeightStrategy,
    rows?: number,
    minRows?: number,
    maxRows?: number,
  ) => void;
}

/** 文本域事件接口 */
export interface TextareaEvents {
	/** 聚焦事件 */
  onFocus: (_event: ITouchEvent) => void;
	/** 失焦事件 */
  onBlur: (_event: ITouchEvent) => void;
	/** 输入事件 */
  onInput: (_value: string, event: ITouchEvent) => void;
	/** 清除事件 */
  onClear: (_event: ITouchEvent) => void;
	/** 确认事件 */
  onConfirm: (_value: string, event: ITouchEvent) => void;
	/** 键盘高度变化事件 */
  onKeyboardHeightChange: (_height: number, event: ITouchEvent) => void;
	/** 高度变化事件 */
  onHeightChange: (_height: number, event: ITouchEvent) => void;
	/** 验证事件 */
  onValidate: (_result: TextareaValidationResult) => void;
}

/** 文本域组属性接口 */
export interface TextareaGroupProps {
	/** 文本域组内容 */
  children: ReactNode;
	/** 布局方向 */
  direction?: 'horizontal' | 'vertical';
	/** 间距 */
  spacing?: number;
	/** 是否只读整个组 */
  readonly?: boolean;
}

/** 文本域组引用接口 */
export interface TextareaGroupRef {
	/** 获取所有值 */
  getValues: () => Record<string, string>;
	/** 设置值 */
  setValues: (_values: Record<string, string>) => void;
	/** 获取单个值 */
  getValue: (_name: string) => string;
	/** 设置单个值 */
  setValue: (_name: string, value: string) => void;
	/** 重置所有值 */
  reset: () => void;
	/** 验证所有值 */
  validateAll: () => Promise<Record<string, TextareaValidationResult>>;
	/** 设置禁用状态 */
  setDisabled: (_disabled: boolean) => void;
	/** 设置只读状态 */
  setReadonly: (_readonly: boolean) => void;
}
