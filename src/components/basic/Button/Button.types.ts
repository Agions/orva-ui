/**
 * 专业化 Button 组件类型定义
 * @module components/basic/Button/Button.types
 * @description 完整的 Button 类型系统，支持所有变体、尺寸、形状和交互状态
 */

import type { BaseProps } from '@/types/component';
import type { ReactNode, RefAttributes, ForwardedRef } from 'react';
import type { ITouchEvent } from '@tarojs/components';

// ==================== 基础类型别名 ====================

/** 按钮类型 */
export type ButtonType = 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info';

/** 按钮尺寸 */
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/** 按钮变体 */
export type ButtonVariant = 'solid' | 'outline' | 'ghost' | 'text' | 'soft';

/** 按钮形状 */
export type ButtonShape = 'default' | 'round' | 'circle' | 'square';

/** 按钮图标位置 */
export type ButtonIconPosition = 'left' | 'right';

/** 按钮强调样式 */
export type ButtonEmphasis = 'bold' | 'italic' | 'underline' | 'strikethrough';

/** 按钮主题色 */
export type ButtonThemeColor = 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info';

// ==================== 尺寸配置 ====================

/** 按钮尺寸配置 */
export interface ButtonSizeConfig {
  /** 内边距 */
  padding: string;
  /** 字体大小 */
  fontSize: number;
  /** 高度 */
  height: number;
  /** 图标尺寸 */
  iconSize: number;
}

/** 所有尺寸配置映射 */
export const BUTTON_SIZE_MAP: Record<ButtonSize, ButtonSizeConfig> = {
  xs: { padding: '4px 10px', fontSize: 12, height: 24, iconSize: 12 },
  sm: { padding: '6px 12px', fontSize: 14, height: 28, iconSize: 14 },
  md: { padding: '8px 16px', fontSize: 16, height: 34, iconSize: 16 },
  lg: { padding: '10px 20px', fontSize: 18, height: 40, iconSize: 18 },
  xl: { padding: '12px 24px', fontSize: 20, height: 48, iconSize: 20 },
};

// ==================== 变体配置 ====================

/** 按钮变体样式 */
export interface ButtonVariantStyles {
  /** 背景色 */
  backgroundColor: string;
  /** 文字颜色 */
  color: string;
  /** 边框颜色 */
  borderColor: string;
  /** 是否透明背景 */
  transparent?: boolean;
}

/** 变体样式映射 */
export type ButtonVariantConfig = {
  [key in ButtonVariant]: ButtonVariantStyles;
};

// ==================== 形状配置 ====================

/** 按钮形状样式 */
export interface ButtonShapeStyles {
  /** 圆角 */
  borderRadius: string | number;
  /** 是否圆形 */
  isCircle?: boolean;
  /** 宽度（圆形时） */
  width?: number | string;
}

/** 形状样式映射 */
export type ButtonShapeConfig = {
  [key in ButtonShape]: ButtonShapeStyles;
};

// ==================== 状态类型 ====================

/** 按钮交互状态 */
export interface ButtonInteractionState {
  /** 是否悬停 */
  isHovered: boolean;
  /** 是否聚焦 */
  isFocused: boolean;
  /** 是否按下 */
  isPressed: boolean;
}

/** 按钮状态 */
export interface ButtonState {
  /** 是否禁用 */
  disabled: boolean;
  /** 是否加载 */
  loading: boolean;
  /** 交互状态 */
  interaction: ButtonInteractionState;
}

// ==================== Props 类型 ====================

/** Button 属性 */
export interface ButtonProps extends BaseProps {
  /** 按钮类型（主题色） */
  type?: ButtonType;
  
  /** 按钮尺寸 */
  size?: ButtonSize;
  
  /** 按钮变体（样式） */
  variant?: ButtonVariant;
  
  /** 按钮形状 */
  shape?: ButtonShape;
  
  /** 是否块级（全宽） */
  block?: boolean;
  
  /** 是否禁用 */
  disabled?: boolean;
  
  /** 是否加载状态 */
  loading?: boolean;
  
  /** 加载图标 */
  loadingIcon?: ReactNode;
  
  /** 图标 */
  icon?: ReactNode;
  
  /** 图标位置 */
  iconPosition?: ButtonIconPosition;
  
  /** 点击事件 */
  onClick?: (event: ITouchEvent) => void;
  
  /** 键盘事件 */
  onKeyDown?: (event: React.KeyboardEvent) => void;
  
  /** 是否强调样式 */
  emphasis?: ButtonEmphasis;
  
  /** 是否显示 ripple 水波纹效果 */
  ripple?: boolean;
  
  /** 是否平面风格（无阴影） */
  flat?: boolean;
  
  /** 是否可聚焦 */
  focusable?: boolean;
  
  /** Tab 索引 */
  tabIndex?: number;
  
  /** ARIA 标签 */
  ariaLabel?: string;
  
  /** 自定义类名 */
  className?: string;
  
  /** 自定义样式 */
  style?: React.CSSProperties;
  
  /** 子内容 */
  children?: ReactNode;
  
  /** 是否全宽（废弃，使用 block） */
  fullWidth?: boolean;
  
  /** 响应式尺寸 */
  responsiveSize?: {
    xs?: ButtonSize;
    sm?: ButtonSize;
    md?: ButtonSize;
    lg?: ButtonSize;
    xl?: ButtonSize;
  };
  
  /** 阴影级别 */
  shadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  
  /** 动画持续时间 */
  animationDuration?: number;
}

// ==================== Ref 类型 ====================

/** Button 引用接口 */
export interface ButtonRef {
  /** 获取 DOM 元素 */
  element: HTMLButtonElement | null;
  
  /** 触发点击 */
  click: () => void;
  
  /** 聚焦 */
  focus: () => void;
  
  /** 失焦 */
  blur: () => void;
  
  /** 获取是否禁用 */
  isDisabled: () => boolean;
  
  /** 获取是否加载 */
  isLoading: () => boolean;
  
  /** 设置加载状态 */
  setLoading: (loading: boolean) => void;
  
  /** 获取当前状态 */
  getState: () => ButtonState;
}

// ==================== 默认属性 ====================

/** 默认 Button 属性 */
export const DEFAULT_BUTTON_PROPS: Required<Pick<ButtonProps, 'type' | 'size' | 'variant' | 'shape' | 'disabled' | 'loading' | 'block' | 'iconPosition' | 'ripple' | 'flat' | 'focusable' | 'tabIndex'>> = {
  type: 'default',
  size: 'md',
  variant: 'solid',
  shape: 'default',
  disabled: false,
  loading: false,
  block: false,
  iconPosition: 'left',
  ripple: true,
  flat: false,
  focusable: true,
  tabIndex: 0,
};

// ==================== 工具类型 ====================

/** 带 ref 的 Button 组件类型 */
export type ButtonComponent = React.ForwardRefExoticComponent<
  ButtonProps & RefAttributes<ButtonRef>
>;

/** Button 渲染函数参数 */
export interface ButtonRenderParams {
  props: ButtonProps;
  ref: ForwardedRef<ButtonRef>;
}

/** 按钮样式计算参数 */
export interface ButtonStyleParams {
  type: ButtonType;
  size: ButtonSize;
  variant: ButtonVariant;
  shape: ButtonShape;
  disabled: boolean;
  loading: boolean;
  block: boolean;
  flat: boolean;
  state: ButtonState;
}