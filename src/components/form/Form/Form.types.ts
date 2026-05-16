import type { ChildrenProps } from '@/types/component';
import type { ReactNode, FormHTMLAttributes } from 'react';
import type { ITouchEvent } from '@tarojs/components';

/** 表单值类型 */
export type FormValues = Record<string, any>;

/** 表单错误类型 */
export type FormErrors = Record<string, string[]>;

/** 表单字段信息 */
export interface FormFieldInfo {
  name: string;
  value?: any;
  errors?: string[];
  touched?: boolean;
  validating?: boolean;
  rules?: FormRule[];
  [key: string]: any;
}

/** 表单校验规则 */
export interface FormRule {
  required?: boolean;
  message?: string;
  pattern?: RegExp;
  min?: number;
  max?: number;
  len?: number;
  minValue?: number;
  maxValue?: number;
  enum?: any[];
  defaultValue?: any;
  validator?: (_value: any, _formValues: FormValues) => boolean | string | Promise<boolean | string>;
  asyncValidator?: (_value: any, _formValues: FormValues) => Promise<boolean | string>;
  [key: string]: any;
}

/** 表单状态 */
export type FormStatus = 'default' | 'success' | 'warning' | 'error' | 'normal' | 'loading';

/** 表单标签对齐方式 */
export type FormLabelAlign = 'left' | 'right' | 'top';



/** 表单尺寸 */
export type FormSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/** 表单布局 */
export type FormLayout = 'horizontal' | 'vertical' | 'inline';

/** 表单字段状态 */
export type FormFieldStatus = 'default' | 'success' | 'warning' | 'error' | 'validating' | 'normal';

/** 表单已触摸字段 */
export type FormTouched = Record<string, boolean>;

/** 表单组件属性接口 */
export interface FormProps extends FormAccessibilityProps {
  /** 表单布局 */
  layout?: FormLayout;
  /** 表单尺寸 */
  size?: FormSize;
  /** 表单状态 */
  status?: FormStatus;
  /** 表单初始值 */
  initialValues?: FormValues;
  /** 表单校验规则 */
  rules?: Record<string, FormRule[]>;
  /** 提交成功回调 */
  onSubmit?: (values: FormValues, event?: any) => void;
  /** 提交失败回调 */
  onFinishFailed?: (errors: FormErrors, values?: FormValues) => void;
  /** 表单提交事件 */
  onFinish?: (values: FormValues) => void;
  /** 表单值变化事件 */
  onValuesChange?: (changedValues: Partial<FormValues>, allValues: FormValues) => void;
  /** 表单字段变化事件 */
  onFieldsChange?: (changedFields: FormFieldInfo[], allFields: FormFieldInfo[]) => void;
  /** 表单重置事件 */
  onReset?: (values?: FormValues, event?: any) => void;
  /** 是否禁用 */
  disabled?: boolean;
  /** 是否只读 */
  readonly?: boolean;
  /** 验证触发时机 */
  validateTrigger?: 'onChange' | 'onBlur' | 'onSubmit';
  /** 标签对齐方式 */
  labelAlign?: FormLabelAlign;
  /** 标签宽度 */
  labelWidth?: number | string;
  /** 标签后缀 */
  labelSuffix?: ReactNode;
  /** 是否显示冒号 */
  colon?: boolean;
  /** 必填标记 */
  requiredMark?: boolean | 'optional';
  /** 是否保留未提交的值 */
  preserve?: boolean;
  /** 自定义样式类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
  /** 子元素 */
  children?: React.ReactNode;
}

/** 表单实例接口 */
export interface FormInstance {
  values: FormValues;
  errors: FormErrors;
  touched: Record<string, boolean>;
  validating: Record<string, boolean>;
  fields: Record<string, FormFieldInfo>;
  rules: Record<string, FormRule[]>;
  status: string;
  disabled: boolean;
  readonly: boolean;
  /** 获取表单值 */
  getValues?: () => FormValues;
  /** 设置表单值 */
  setValues?: (values: Partial<FormValues>) => void;
  /** 获取字段值 */
  getFieldValue?: (name: string) => any;
  /** 设置字段值 */
  setFieldValue?: (name: string, value: any) => void;
  /** 重置表单 */
  resetFields?: (fields?: string[]) => void;
  /** 提交表单 */
  submit?: () => Promise<void>;
  /** 验证表单 */
  validate?: (fields?: string[]) => Promise<{ valid: boolean; errors: FormErrors; values: FormValues }>;
  /** 清除错误 */
  clearErrors?: (fields?: string[]) => void;
  /** 设置错误 */
  setErrors?: (errors: FormErrors) => void;
}

/** Form 无障碍属性 */
export interface FormAccessibilityProps {
	/** 是否启用无障碍访问 */
  accessible?: boolean;
	/** 无障碍标签 */
  accessibilityLabel?: string;
	/** 无障碍角色 */
  accessibilityRole?: string;
	/** HTML role 属性 */
  role?: string;
	/** HTML aria-label 属性 */
  'aria-label'?: string;
	/** 是否禁用表单 */
  disabled?: boolean;
	/** 是否只读表单 */
  readonly?: boolean;
	/** 是否显示验证信息 */
  showValidateMessage?: boolean;
	/** 是否滚动到第一个错误字段 */
  scrollToFirstError?: boolean;
	/** 是否保留未提交的值 */
  preserve?: boolean;
}

/** 表单项组件属性接口 */
export interface FormItemProps {
	/** 字段名 */
  name: string;
	/** 标签 */
  label?: ReactNode;
	/** 辅助文本 */
  helperText?: ReactNode;
	/** 错误文本 */
  errorText?: ReactNode;
	/** 验证规则 */
  rules?: FormRule[];
	/** 验证触发时机 */
  validateTrigger?: 'onChange' | 'onBlur' | 'onSubmit';
	/** 是否立即验证 */
  immediate?: boolean;
	/** 是否必填 */
  required?: boolean;
	/** 是否显示必填标记 */
  showRequiredMark?: boolean;
	/** 标签宽度 */
  labelWidth?: number | string;
	/** 标签对齐方式 */
  labelAlign?: FormLabelAlign;
	/** 是否显示验证信息 */
  showValidateMessage?: boolean;
	/** 值变化事件处理函数 */
  onChange?: (_value: any, name: string) => void;
	/** 字段状态变化事件处理函数 */
  onStatusChange?: (_status: FormFieldStatus, name: string) => void;
	/** 自定义样式类名 */
  className?: string;
	/** 自定义样式 */
  style?: React.CSSProperties;
	/** 子元素 */
  children?: React.ReactNode | ((context: FormItemContext) => React.ReactNode);
}

/** 表单组件引用类型 */
export type FormRef = {
	/** 获取表单值 */
  getValues: () => FormValues;
	/** 设置表单值 */
  setValues: (_values: Partial<FormValues>) => void;
	/** 获取字段值 */
  getFieldValue: (_name: string) => any;
	/** 设置字段值 */
  setFieldValue: (_name: string, value: any) => void;
	/** 重置表单 */
  resetFields: (fields?: string[]) => void;
	/** 提交表单 */
  submit: () => Promise<void>;
	/** 验证表单 */
  validate: (fields?: string[]) => Promise<{ valid: boolean; errors: FormErrors; values: FormValues }>;
	/** 验证字段 */
  validateField: (_name: string) => Promise<{ valid: boolean; errors: string[]; value: any }>;
	/** 验证多个字段 */
  validateFields: (_names: string[]) => Promise<{ valid: boolean; errors: FormErrors; values: FormValues }>;
	/** 清除字段错误 */
  clearErrors: (fields?: string[]) => void;
	/** 设置字段错误 */
  setErrors: (_errors: FormErrors) => void;
	/** 获取字段错误 */
  getFieldError: (_name: string) => string[];
	/** 获取表单错误 */
  getErrors: () => FormErrors;
	/** 设置字段状态 */
  setFields: (_fields: Partial<FormFieldInfo>[]) => void;
	/** 获取字段信息 */
  getFields: () => FormFieldInfo[];
	/** 获取字段信息 */
  getFieldInfo: (_name: string) => FormFieldInfo | null;
	/** 设置字段 touched 状态 */
  setFieldsTouched: (_touched: Record<string, boolean>) => void;
	/** 设置字段 validating 状态 */
  setFieldsValidating: (_validating: Record<string, boolean>) => void;
	/** 添加字段规则 */
  addFieldRules: (_name: string, rules: FormRule[]) => void;
	/** 移除字段规则 */
  removeFieldRules: (_name: string) => void;
	/** 获取字段规则 */
  getFieldRules: (_name: string) => FormRule[];
	/** 设置表单状态 */
  setStatus: (_status: FormStatus) => void;
	/** 获取表单状态 */
  getStatus: () => FormStatus;
	/** 设置表单禁用状态 */
  setDisabled: (_disabled: boolean) => void;
	/** 设置表单只读状态 */
  setReadonly: (_readonly: boolean) => void;
	/** 滚动到字段 */
  scrollToField: (_name: string) => void;
	/** 获取表单实例 */
  getFormInstance: () => FormInstance;
};

/** 表单工具函数接口 */
export interface FormUtils {
	/** 深度合并对象 */
  deepMerge: (_target: any, source: any) => any;
	/** 深度克隆对象 */
  deepClone: (_obj: any) => any;
	/** 格式化验证错误 */
  formatErrors: (_errors: Record<string, any>) => FormErrors;
	/** 验证规则执行器 */
  validateRules: (_value: any, rules: FormRule[], form: FormValues) => Promise<string[]>;
	/** 异步验证规则执行器 */
  validateAsyncRules: (_value: any, rules: FormRule[], form: FormValues) => Promise<string[]>;
	/** 字段路径解析器 */
  parseFieldPath: (_path: string) => string[];
	/** 字段路径构建器 */
  buildFieldPath: (_path: string[]) => string;
	/** 字段值获取器 */
  getFieldValueByPath: (_values: FormValues, path: string) => any;
	/** 字段值设置器 */
  setFieldValueByPath: (_values: FormValues, path: string, value: any) => void;
	/** 字段值删除器 */
  deleteFieldValueByPath: (_values: FormValues, path: string) => void;
	/** 字段错误获取器 */
  getFieldErrorByPath: (_errors: FormErrors, path: string) => string[];
	/** 字段错误设置器 */
  setFieldErrorByPath: (_errors: FormErrors, path: string, error: string | string[]) => void;
	/** 字段错误删除器 */
  deleteFieldErrorByPath: (_errors: FormErrors, path: string) => void;
	/** 表单值转换器 */
  transformFormValues: (_values: FormValues, transforms: Record<string, (_value: any) => any>) => FormValues;
	/** 表单值过滤器 */
  filterFormValues: (_values: FormValues, filter: (_value: any, name: string) => boolean) => FormValues;
	/** 表单值映射器 */
  mapFormValues: (_values: FormValues, mapper: (_value: any, name: string) => any) => FormValues;
	/** 获取表单尺寸映射 */
  getSizeMap: () => Record<FormSize, { fontSize: number; padding: string; height: number; borderRadius: number }>;
	/** 获取表单布局映射 */
  getLayoutMap: () => Record<FormLayout, { flexDirection: string; alignItems: string; gap: string }>;
	/** 获取表单标签对齐映射 */
  getLabelAlignMap: () => Record<FormLabelAlign, { textAlign: string; justifyContent: string }>;
}

/** 表单样式配置接口 */
export interface FormStyleConfig {
	/** 表单基础样式 */
  base: React.CSSProperties;
	/** 表单尺寸样式 */
  sizes: Record<FormSize, React.CSSProperties>;
	/** 表单布局样式 */
  layouts: Record<FormLayout, React.CSSProperties>;
	/** 表单标签对齐样式 */
  labelAligns: Record<FormLabelAlign, React.CSSProperties>;
	/** 表单状态样式 */
  statuses: Record<FormStatus, React.CSSProperties>;
	/** 表单项样式 */
  item: React.CSSProperties;
	/** 表单项标签样式 */
  itemLabel: React.CSSProperties;
	/** 表单项内容样式 */
  itemContent: React.CSSProperties;
	/** 表单项辅助文本样式 */
  itemHelperText: React.CSSProperties;
	/** 表单项错误文本样式 */
  itemErrorText: React.CSSProperties;
	/** 表单项必填标记样式 */
  itemRequiredMark: React.CSSProperties;
}

/** 表单上下文接口 */
export interface FormContext {
	/** 表单实例 */
  form: FormInstance;
	/** 表单配置 */
  config: {
    layout: FormLayout;
    labelAlign: FormLabelAlign;
    size: FormSize;
    labelWidth?: number | string;
    labelSuffix?: ReactNode;
    colon: boolean;
    requiredMark: boolean | 'optional';
    validateTrigger: 'onChange' | 'onBlur' | 'onSubmit';
    showValidateMessage: boolean;
    disabled: boolean;
    readonly: boolean;
  };
	/** 表单样式配置 */
  styleConfig: FormStyleConfig;
	/** 注册字段 */
  registerField: (_name: string, info: Partial<FormFieldInfo>) => void;
	/** 注销字段 */
  unregisterField: (_name: string) => void;
	/** 更新字段 */
  updateField: (_name: string, info: Partial<FormFieldInfo>) => void;
	/** 获取字段 */
  getField: (_name: string) => FormFieldInfo | null;
	/** 设置字段值 */
  setFieldValue: (_name: string, value: any) => void;
	/** 获取字段值 */
  getFieldValue: (_name: string) => any;
	/** 设置字段错误 */
  setFieldError: (_name: string, error: string | string[]) => void;
	/** 获取字段错误 */
  getFieldError: (_name: string) => string[];
	/** 设置字段 touched 状态 */
  setFieldTouched: (_name: string, touched: boolean) => void;
	/** 设置字段 validating 状态 */
  setFieldValidating: (_name: string, validating: boolean) => void;
	/** 验证字段 */
  validateField: (_name: string) => Promise<{ valid: boolean; errors: string[]; value: any }>;
	/** 重置字段 */
  resetField: (_name: string) => void;
}

/** 表单项上下文接口 */
export interface FormItemContext {
	/** 字段名 */
  name: string;
	/** 字段值 */
  value: any;
	/** 字段错误 */
  errors: string[];
	/** 字段 touched 状态 */
  touched: boolean;
	/** 字段 validating 状态 */
  validating: boolean;
	/** 字段状态 */
  status: FormFieldStatus;
	/** 字段规则 */
  rules: FormRule[];
	/** 是否必填 */
  required: boolean;
	/** 标签对齐方式 */
  labelAlign: FormLabelAlign;
	/** 标签宽度 */
  labelWidth?: number | string;
	/** 是否显示验证信息 */
  showValidateMessage: boolean;
	/** 表单上下文 */
  formContext: FormContext;
}
