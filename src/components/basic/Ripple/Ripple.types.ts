/**
 * Ripple 水波纹动效类型定义
 * @module components/basic/Ripple/Ripple.types
 */

import type { BaseProps, ChildrenProps } from '@/types/component';

export interface RippleProps extends ChildrenProps {
	/** 是否禁用 ripple */
  disabled?: boolean;
	/** 波纹颜色 */
  color?: string;
	/** 波纹不透明度 */
  opacity?: number;
	/** 波纹持续时间 (ms) */
  duration?: number;
	/** 波纹直径 (px) */
  size?: number;
	/** 是否中心波纹 */
  center?: boolean;
	/** 是否触发时显示 */
  triggerOnPress?: boolean;
	/** 点击事件 */
  onClick?: (e?: any) => void;
	/** 触摸开始事件 */
  onTouchStart?: (e?: any) => void;
	/** 自定义样式 */
  style?: React.CSSProperties;
	/** 自定义类名 */
  className?: string;
}

export interface RippleRef {
	/** 手动触发波纹 */
  trigger: (x?: number, y?: number) => void;
	/** 清除所有波纹 */
  clear: () => void;
}

export interface RippleWave {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  duration: number;
}
