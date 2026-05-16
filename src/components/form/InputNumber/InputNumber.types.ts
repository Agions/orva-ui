import type { FormItemProps } from '@/types/component';
import type { ReactNode } from 'react';
import type { CSSProperties } from 'react';
import type { ITouchEvent } from '@tarojs/components';

/** 输入框数字状态 */
export type InputNumberStatus = 'default' | 'success' | 'warning' | 'error' | 'normal' | 'disabled';

/** 数字输入框尺寸 */
export type InputNumberSize = 'small' | 'medium' | 'large' | 'sm' | 'md' | 'lg';

/** 数字输入框变体 */
export type InputNumberVariant = 'outlined' | 'filled' | 'underlined';
export interface InputNumberAccessibilityProps {
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
    valueNow?: number;
    valueMin?: number;
    valueMax?: number;
    valueStep?: number;
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

/** 数字输入框组件属性接口 */
export interface InputNumberProps extends InputNumberAccessibilityProps {
  /** 当前值 */
  value?: number | null;
  /** 默认值 */
  defaultValue?: number | null;
  /** 最小值 */
  min?: number;
  /** 最大值 */
  max?: number;
  /** 步长 */
  step?: number;
  /** 精度 */
  precision?: number;
  /** 尺寸 */
  size?: InputNumberSize;
  /** 状态 */
  status?: InputNumberStatus;
  /** 是否禁用 */
  disabled?: boolean;
  /** 是否只读 */
  readonly?: boolean;
  /** 是否显示边框 */
  bordered?: boolean;
  /** 占位符 */
  placeholder?: string;
  /** 前缀 */
  prefix?: React.ReactNode;
  /** 后缀 */
  suffix?: React.ReactNode;
  /** 值变化回调 */
  onChange?: (value: number | null) => void;
  /** 聚焦回调 */
  onFocus?: (event: any) => void;
  /** 失焦回调 */
  onBlur?: (event: any) => void;
  /** 键盘按下回调 */
  onKeyDown?: (event: any) => void;
  /** 是否允许清除 */
  allowClear?: boolean;
  /** 是否显示步进按钮 */
  showStepper?: boolean;
  /** 格式化函数 */
  formatter?: (value: number | null) => string;
  /** 解析函数 */
  parser?: (value: string) => number | null;
  /** 自定义样式类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
  /** 测试标识 */
  'data-testid'?: string;
}


/** 数字输入框组件引用类型 */
export type InputNumberRef = {
	/** 输入框元素 */
  element: HTMLInputElement | null;
	/** 获取输入框值 */
  getValue: () => number | null;
	/** 设置输入框值 */
  setValue: (_value: number | null) => void;
	/** 聚焦输入框 */
  focus: () => void;
	/** 失焦输入框 */
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
	/** 设置输入框状态 */
  setStatus: (_status: InputNumberStatus) => void;
	/** 获取输入框状态 */
  getStatus: () => InputNumberStatus;
	/** 验证输入框值 */
  validate: () => Promise<InputNumberValidationResult>;
	/** 清除输入框值 */
  clear: () => void;
	/** 重置输入框 */
  reset: () => void;
	/** 增加数值 */
  stepUp: (step?: number) => void;
	/** 减少数值 */
  stepDown: (step?: number) => void;
	/** 获取验证结果 */
  getValidationResult: () => InputNumberValidationResult | null;
};

/** 数字输入框验证结果接口 */
export interface InputNumberValidationResult {
	/** 是否验证通过 */
  valid: boolean;
	/** 错误消息 */
  message?: string;
	/** 验证规则索引 */
  ruleIndex?: number;
	/** 验证时间戳 */
  timestamp: number;
	/** 验证值 */
  value?: number | null;
}

/** 数字输入框上下文接口 */
export interface InputNumberContext {
	/** 数字输入框实例 */
  inputNumber: {
    value: number | null;
    status: InputNumberStatus;
    disabled: boolean;
    readonly: boolean;
    validationResult: InputNumberValidationResult | null;
  };
	/** 数字输入框配置 */
  config: {
    size: InputNumberSize;
    variant: InputNumberVariant;
    validateTrigger: 'onChange' | 'onBlur' | 'onFocus' | 'onSubmit';
    step: number;
    precision: number;
    min?: number;
    max?: number;
  };
	/** 样式配置 */
  styleConfig: InputNumberStyleConfig;
}

/** 数字输入框样式配置接口 */
export interface InputNumberStyleConfig {
	/** 基础样式 */
  base: CSSProperties;
	/** 尺寸样式 */
  sizes: Record<InputNumberSize, CSSProperties>;
	/** 变体样式 */
  variants: Record<InputNumberVariant, CSSProperties>;
	/** 状态样式 */
  statuses: Record<InputNumberStatus, CSSProperties>;
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
	/** 控制器样式 */
  controls: CSSProperties;
	/** 控制器按钮样式 */
  controlButton: CSSProperties;
	/** 清除按钮样式 */
  clearButton: CSSProperties;
	/** 容器样式 */
  container: CSSProperties;
	/** 包装器样式 */
  wrapper: CSSProperties;
}

/** 数字输入框工具函数接口 */
export interface InputNumberUtils {
	/** 格式化数字值 */
  formatValue: (_value: number | null, config: InputNumberFormatConfig) => string;
	/** 解析数字值 */
  parseValue: (_text: string, config: InputNumberFormatConfig) => number | null;
	/** 验证数字值 */
  validateValue: (_value: number | null, rules?: InputNumberRule[]) => Promise<InputNumberValidationResult>;
	/** 限制数字范围 */
  clampValue: (_value: number, min?: number, max?: number) => number;
	/** 四舍五入到指定精度 */
  roundValue: (_value: number, precision: number) => number;
	/** 获取无障碍状态 */
  getAccessibilityState: (_props: InputNumberProps, status: InputNumberStatus) => any;
}

/** 数字输入框事件接口 */
export interface InputNumberEvents {
	/** 聚焦事件 */
  onFocus: (_event: ITouchEvent) => void;
	/** 失焦事件 */
  onBlur: (_event: ITouchEvent) => void;
	/** 输入事件 */
  onInput: (_value: number | null, event: ITouchEvent) => void;
	/** 清除事件 */
  onClear: (_event: ITouchEvent) => void;
	/** 步进事件 */
  onStep: (_value: number, direction: 'up' | 'down', event: ITouchEvent) => void;
	/** 验证事件 */
  onValidate: (_result: InputNumberValidationResult) => void;
}

/** 数字输入框控制器位置 */
export type InputNumberControlsPosition = 'start' | 'end' | 'both';

/** 数字输入框格式化函数 */
export type InputNumberFormatter = (_value: number | null) => string;

/** 数字输入框步进模式 */
export type InputNumberStepMode = 'continuous' | 'discrete';

/** 数字输入框清除触发方式 */
export type InputNumberClearTrigger = 'always' | 'focus' | 'never';

/** 数字输入框验证规则 */
export interface InputNumberRule {
  required?: boolean;
  message?: string;
  min?: number;
  max?: number;
  pattern?: RegExp;
  validator?: (_value: number | null) => boolean | string | Promise<boolean | string>;
}

/** 数字输入框格式配置 */
export interface InputNumberFormatConfig {
  type?: 'decimal' | 'currency' | 'percent' | 'integer' | 'custom';
  precision?: number;
  prefix?: string;
  suffix?: string;
  groupSeparator?: string;
  decimalSeparator?: string;
  thousandsSeparator?: string;
  currencySymbol?: string;
  currencySymbolPosition?: 'prefix' | 'suffix';
  customFormatter?: (value: number | null) => string;
  customParser?: (text: string) => number | null;
}

/** 数字输入框原生属性 */
export interface InputNumberNativeProps {
  type?: string;
  name?: string;
  autoComplete?: string;
  autoCorrect?: string;
  autoCapitalize?: string;
  spellCheck?: string;
  inputMode?: 'none' | 'text' | 'decimal' | 'numeric' | 'tel' | 'search' | 'email' | 'url';
}
