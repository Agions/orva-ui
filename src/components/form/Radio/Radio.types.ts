import type { BaseProps } from '@/types/component';
import type { ReactNode, InputHTMLAttributes } from 'react';
import type { ITouchEvent } from '@tarojs/components';

/** 尺寸类型 */
export type Size = 'small' | 'medium' | 'large';
/** 变体类型 */
export type Variant = 'default' | 'filled' | 'outlined';
/** 状态类型 */
export type Status = 'default' | 'success' | 'warning' | 'error';
/** 颜色类型 */
export type Color = 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';

/** Radio 尺寸 */
export type RadioSize = 'small' | 'medium' | 'large' | 'sm' | 'md' | 'lg' | 'xs' | 'xl';

/** Radio 状态 */
export type RadioStatus = 'default' | 'success' | 'warning' | 'error' | 'normal' | 'disabled' | Status;

/** Radio 颜色 */
export type RadioColor = 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info' | Color;

/** Radio 变体 */
export type RadioVariant = 'default' | 'outline' | 'filled' | 'outlined' | Variant;

/** Radio 属性 */
export interface RadioProps extends BaseProps {
  /** 选中值 */
  value?: string | number;
  /** 是否选中 */
  checked?: boolean;
  /** 默认选中 */
  defaultChecked?: boolean;
  /** 尺寸 */
  size?: RadioSize;
  /** 状态 */
  status?: RadioStatus;
  /** 颜色 */
  color?: RadioColor;
  /** 变体 */
  variant?: RadioVariant;
  /** 是否禁用 */
  disabled?: boolean;
  /** 是否只读 */
  readonly?: boolean;
  /** 是否必填 */
  required?: boolean;
  /** 标签文本 */
  helperText?: ReactNode;
  /** 错误文本 */
  errorText?: ReactNode;
  label?: ReactNode;
  labelPosition?: 'left' | 'right';
  className?: string;
  style?: React.CSSProperties;
  onChange?: (_checked: boolean, event: ITouchEvent) => void;
  onClick?: (_event: ITouchEvent) => void;
  onFocus?: (_event: ITouchEvent) => void;
  onBlur?: (_event: ITouchEvent) => void;
  accessible?: boolean;
  accessibilityLabel?: string;
  accessibilityRole?: string;
  accessibilityState?: {
    disabled?: boolean;
    readonly?: boolean;
    checked?: boolean;
    busy?: boolean;
    expanded?: boolean;
  };
  rules?: Array<{
    required?: boolean;
    message?: string;
    validator?: (_checked: boolean) => boolean | string | Promise<boolean | string>;
  }>;
  validateTrigger?: 'onChange' | 'onBlur' | 'onSubmit';
  immediate?: boolean;
  validator?: (_checked: boolean) => boolean | string | Promise<boolean | string>;
  animation?: boolean;
  animationDuration?: number;
  ripple?: boolean;
  rippleColor?: string;
  autoFocus?: boolean;
  tabIndex?: number;
  data?: Record<string, any>;
  containerStyle?: React.CSSProperties;
  wrapperStyle?: React.CSSProperties;
  labelStyle?: React.CSSProperties;
  errorTextStyle?: React.CSSProperties;
  helperTextStyle?: React.CSSProperties;
  bordered?: boolean;
  rounded?: boolean;
}

/** Radio 引用类型 */
export type RadioRef = {
  element: HTMLInputElement | null;
  getChecked: () => boolean;
  setChecked: (_checked: boolean) => void;
  toggle: () => void;
  setDisabled: (_disabled: boolean) => void;
  setReadonly: (_readonly: boolean) => void;
  setStatus: (_status: RadioStatus) => void;
  getStatus: () => RadioStatus;
  setSize: (_size: RadioSize) => void;
  setColor: (_color: RadioColor) => void;
  validate: () => Promise<{ valid: boolean; message?: string }>;
  reset: () => void;
  getData: () => Record<string, any> | undefined;
  setData: (_data: Record<string, any>) => void;
  focus: () => void;
  blur: () => void;
  shake: () => void;
  pulse: () => void;
};

/** Radio 组属性 */
export interface RadioGroupProps {
  children: ReactNode;
  value?: string | number;
  defaultValue?: string | number;
  status?: RadioStatus;
  color?: RadioColor;
  readonly?: boolean;
  direction?: 'horizontal' | 'vertical';
  align?: 'start' | 'center' | 'end';
  spacing?: number | string;
  options?: Array<{
    label: ReactNode;
    value: string | number;
    disabled?: boolean;
    description?: ReactNode;
    icon?: ReactNode;
    color?: RadioColor;
    data?: Record<string, any>;
  }>;
  required?: boolean;
  compact?: boolean;
  block?: boolean;
  groupTitle?: ReactNode;
  groupDescription?: ReactNode;
  accessibilityLabel?: string;
  accessibilityRole?: string;
  accessibilityState?: {
    disabled?: boolean;
    readonly?: boolean;
    busy?: boolean;
    expanded?: boolean;
  };
}

/** Radio 组引用类型 */
export type RadioGroupRef = {
  getValue: () => string | number | undefined;
  setValue: (_value: string | number) => void;
  clear: () => void;
  setDisabled: (_disabled: boolean) => void;
  setReadonly: (_readonly: boolean) => void;
  setStatus: (_status: RadioStatus) => void;
  validate: () => Promise<{ valid: boolean; message?: string }>;
  reset: () => void;
  getSelectedOption: () => {
    label: ReactNode;
    value: string | number;
    disabled?: boolean;
    description?: ReactNode;
    icon?: ReactNode;
    color?: RadioColor;
    data?: Record<string, any>;
  } | null;
  getOptionByValue: (_value: string | number) => any;
  setOptionDisabled: (_value: string | number, disabled: boolean) => void;
  setOptionsDisabled: (_values: Array<string | number>, disabled: boolean) => void;
  focus: () => void;
  blur: () => void;
};

/** Radio 样式配置 */
export interface RadioStyleConfig {
  base: React.CSSProperties;
  sizes: Record<RadioSize, React.CSSProperties>;
  statuses: Record<RadioStatus, React.CSSProperties>;
  variants: Record<RadioVariant, React.CSSProperties>;
  colors: Record<RadioColor, React.CSSProperties>;
  icon: React.CSSProperties;
  label: React.CSSProperties;
  helperText: React.CSSProperties;
  errorText: React.CSSProperties;
  group: React.CSSProperties;
  groupItem: React.CSSProperties;
  ripple: React.CSSProperties;
  animation: React.CSSProperties;
}

/** Radio 上下文 */
export interface RadioContext {
  value: string | number | undefined;
  size: RadioSize;
  status: RadioStatus;
  variant: RadioVariant;
  color: RadioColor;
  disabled: boolean;
  readonly: boolean;
  direction: 'horizontal' | 'vertical';
  onChange: (_checked: boolean, value: string | number) => void;
  styleConfig: RadioStyleConfig;
}

/** Radio 验证结果 */
export interface RadioValidationResult {
  valid: boolean;
  message?: string;
  ruleIndex?: number;
  timestamp: number;
}

/** Radio 事件 */
export interface RadioEvents {
  onChange: (_checked: boolean, event: ITouchEvent) => void;
  onClick: (_event: ITouchEvent) => void;
  onFocus: (_event: ITouchEvent) => void;
  onBlur: (_event: ITouchEvent) => void;
}

/** Radio 组事件 */
export interface RadioGroupEvents {
  onChange: (_selectedValue: string | number) => void;
}

/** Radio 工具函数 */
export interface RadioUtils {
  formatValue: (_value: string | number | boolean) => string | number;
  validateValue: (_checked: boolean, rules: RadioProps['rules']) => { valid: boolean; message?: string };
  getSizeMap: () => Record<RadioSize, { fontSize: number; size: number; borderRadius: number; padding: number }>;
  getStatusMap: () => Record<RadioStatus, { color: string; backgroundColor: string; borderColor: string }>;
  getColorMap: () => Record<RadioColor, { primary: string; secondary: string; background: string }>;
  generateId: (prefix?: string) => string;
  createRipple: (_event: ITouchEvent, element: HTMLElement, color?: string) => void;
}

/** Radio 选项 */
export interface RadioOption {
  value: string | number;
  label: ReactNode;
  description?: ReactNode;
  disabled?: boolean;
  icon?: ReactNode;
  color?: RadioColor;
  style?: React.CSSProperties;
  className?: string;
  data?: Record<string, any>;
}

/** Radio 配置 */
export interface RadioConfig {
  defaultSize: RadioSize;
  defaultStatus: RadioStatus;
  defaultVariant: RadioVariant;
  defaultColor: RadioColor;
  defaultLabelPosition: 'left' | 'right';
  defaultDirection: 'horizontal' | 'vertical';
  defaultAnimationDuration: number;
  defaultRippleColor: string;
  enableAnimation: boolean;
  enableRipple: boolean;
  enableAccessibility: boolean;
}