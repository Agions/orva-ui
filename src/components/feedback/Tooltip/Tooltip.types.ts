import type * as React from 'react';
import type { ITouchEvent } from '@tarojs/components';
import type { BaseProps } from '@/types/component';

export type TooltipPlacement =
  | 'top'
  | 'bottom'
  | 'left'
  | 'right'
  | 'topLeft'
  | 'topRight'
  | 'bottomLeft'
  | 'bottomRight'
  | 'leftTop'
  | 'leftBottom'
  | 'rightTop'
  | 'rightBottom';

export type TooltipTrigger = 'hover' | 'click' | 'focus' | 'contextMenu';

export interface TooltipProps extends BaseProps {
	/** 提示文字 */
  title?: React.ReactNode;
	/** 触发行为 */
  trigger?: TooltipTrigger | TooltipTrigger[];
	/** 位置 */
  placement?: TooltipPlacement;
	/** 是否显示箭头 */
  arrow?: boolean;
	/** 是否显示（受控） */
  visible?: boolean;
	/** 默认是否显示 */
  defaultVisible?: boolean;
	/** 背景颜色 */
  color?: string;
	/** 弹出层样式 */
  overlayStyle?: React.CSSProperties;
	/** 弹出层类名 */
  overlayClassName?: string;
	/** 子元素 */
  children?: React.ReactNode;
	/** 鼠标进入延迟（毫秒） */
  mouseEnterDelay?: number;
	/** 鼠标离开延迟（毫秒） */
  mouseLeaveDelay?: number;
	/** 点击外部关闭 */
  clickOutsideToClose?: boolean;
	/** 是否对齐到触发点 */
  alignPoint?: boolean;
	/** 显示/隐藏回调 */
  onVisibleChange?: (_visible: boolean) => void;
	/** 显示回调 */
  onShow?: () => void;
	/** 隐藏回调 */
  onHide?: () => void;
	/** 无障碍标签 */
  accessibilityLabel?: string;
	/** 无障碍角色 */
  accessibilityRole?: string;
	/** 无障碍提示 */
  accessibilityHint?: string;
	/** 动画效果 */
  animation?: TooltipAnimation;
	/** 显示延迟时间（毫秒） */
  showDelay?: number;
	/** 隐藏延迟时间（毫秒） */
  hideDelay?: number;
	/** 弹出层样式 */
  popupStyle?: React.CSSProperties;
	/** 是否禁用 */
  disabled?: boolean;
	/** 是否支持嵌套 */
  nested?: boolean;
	/** 最大宽度 */
  maxWidth?: number;
	/** 偏移量 */
  offset?: [number, number];
	/** 是否包裹子元素 */
  wrap?: boolean;
}

export interface TooltipRef {
	/** 显示提示 */
  show: () => void;
	/** 隐藏提示 */
  hide: () => void;
	/** 获取当前显示状态 */
  getVisible: () => boolean;
	/** 更新提示内容 */
  updateTitle: (_title: React.ReactNode) => void;
	/** 重新定位 */
  reposition: () => void;
}

// 事件处理器类型
export type TooltipEventHandler = (_event: ITouchEvent) => void;

// Tooltip 状态类型
export interface TooltipState {
  visible: boolean;
  title: React.ReactNode;
  placement: TooltipPlacement;
}

// Tooltip 主题类型
export type TooltipTheme = 'light' | 'dark' | 'primary' | 'success' | 'warning' | 'error' | 'info';

// Tooltip 动画类型
export type TooltipAnimation = 'fade' | 'scale' | 'slide' | 'none';

// Tooltip 位置类型
export type TooltipPosition = {
  x: number;
  y: number;
};

// Tooltip 主题配置类型
export interface TooltipThemeConfig {
  backgroundColor: string;
  textColor: string;
  borderColor: string;
  arrowColor: string;
  shadow: string;
}

// Tooltip 动画配置类型
export interface TooltipAnimationConfig {
  duration: number;
  easing: string;
}

// Tooltip 事件类型
export type TooltipEventType = 'mouseenter' | 'mouseleave' | 'click' | 'focus' | 'blur' | 'contextmenu';

// Tooltip 选项类型
export interface TooltipOptions {
  trigger?: TooltipTrigger | TooltipTrigger[];
  placement?: TooltipPlacement;
  theme?: TooltipTheme;
  animation?: TooltipAnimation;
  delay?: number;
  arrow?: boolean;
  maxWidth?: number;
  zIndex?: number;
  autoAdjustPosition?: boolean;
  clickOutsideToHide?: boolean;
  nestedTrigger?: boolean;
  accessible?: boolean;
}

// Tooltip 实例类型
export interface TooltipInstance {
  id: string;
  props: TooltipProps;
  visible: boolean;
  show: () => void;
  hide: () => void;
  toggle: () => void;
  update: (_props: Partial<TooltipProps>) => void;
  destroy: () => void;
}
