/**
 * 组件基类 - 提供通用组件逻辑
 * @module types/componentBase
 */

import type { CSSProperties, ReactNode, Ref } from 'react';

/**
 * 基础组件属性
 */
export interface BaseComponentProps {
  /** 类名 */
  className?: string;
  /** 内联样式 */
  style?: CSSProperties;
  /** 子元素 */
  children?: ReactNode;
  /** 测试 ID */
  'data-testid'?: string;
  /** 自定义属性 */
  [key: string]: unknown;
}

/**
 * 带 Ref 的组件属性
 */
export interface BaseComponentWithRefProps extends BaseComponentProps {
  ref?: Ref<HTMLElement>;
}

/**
 * 可聚焦组件属性
 */
export interface FocusableComponentProps extends BaseComponentProps {
  /** 是否自动聚焦 */
  autoFocus?: boolean;
  /** Tab 索引 */
  tabIndex?: number;
  /** 焦点事件 */
  onFocus?: (e: React.FocusEvent) => void;
  /** 失焦事件 */
  onBlur?: (e: React.FocusEvent) => void;
}

/**
 * 可点击组件属性
 */
export interface ClickableComponentProps extends FocusableComponentProps {
  /** 点击事件 */
  onClick?: (e: React.MouseEvent) => void;
  /** 是否禁用 */
  disabled?: boolean;
  /** 加载状态 */
  loading?: boolean;
}

/**
 * 带尺寸的组件属性
 */
export interface SizedComponentProps extends BaseComponentProps {
  /** 尺寸 */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

/**
 * 带主题的组件属性
 */
export interface ThemedComponentProps extends BaseComponentProps {
  /** 主题 */
  theme?: 'light' | 'dark' | 'default';
}

/**
 * 带状态的组件属性
 */
export interface StatefulComponentProps extends BaseComponentProps {
  /** 激活状态 */
  active?: boolean;
  /** 选中状态 */
  checked?: boolean;
  /** 禁用状态 */
  disabled?: boolean;
  /** 加载状态 */
  loading?: boolean;
}

/**
 * 表单组件属性
 */
export interface FormComponentProps extends BaseComponentProps {
  /** 名称 */
  name?: string;
  /** 值 */
  value?: unknown;
  /** 默认值 */
  defaultValue?: unknown;
  /** onChange 事件 */
  onChange?: (value: unknown) => void;
  /** 是否必填 */
  required?: boolean;
  /** 错误信息 */
  error?: string;
  /** 帮助文本 */
  help?: string;
}

/**
 * 图标组件属性
 */
export interface IconComponentProps extends BaseComponentProps {
  /** 图标名称或组件 */
  icon?: string | ReactNode;
  /** 图标大小 */
  iconSize?: number | string;
  /** 图标颜色 */
  iconColor?: string;
}


