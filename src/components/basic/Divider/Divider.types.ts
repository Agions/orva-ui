/**
 * Divider 类型定义
 * @module components/basic/Divider/Divider.types
 */

import type { CSSProperties, ReactNode } from 'react';
import type { ThemeColor } from '@/hooks/ui/useTheme';

/** Divider 方向 */
export type DividerOrientation = 'horizontal' | 'vertical';

/** Divider 线条类型 */
export type DividerType = 'solid' | 'dashed' | 'dotted';

/** Divider 尺寸 */
export type DividerSize = 'thin' | 'default' | 'thick' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/** Divider 颜色 */
export type DividerColor = ThemeColor | string;

/** Divider 位置 */
export type DividerPosition = 'left' | 'right' | 'center' | 'start' | 'end';

/** Divider 变体 */
export type DividerVariant = 'default' | 'gradient' | 'shadow' | 'text' | 'with-icon';

/** Divider 属性 */
export interface DividerProps {
  orientation?: DividerOrientation;
  type?: DividerType;
  position?: DividerPosition;
  size?: DividerSize;
  color?: DividerColor;
  variant?: DividerVariant;
  inset?: number;
  centered?: boolean;
  animated?: boolean;
  shadow?: boolean;
  clickable?: boolean;
  responsive?: boolean;
  className?: string;
  style?: CSSProperties;
  onClick?: () => void;
  children?: ReactNode;
  width?: number | string;
  height?: number | string;
  margin?: number | string;
  padding?: number | string;
  opacity?: number;
  borderRadius?: number | string;
  gradient?: boolean | { direction?: string; start: string; end: string };
  animationDuration?: number;
  accessible?: boolean;
  accessibilityLabel?: string;
  accessibilityRole?: string;
  spacing?: number;
  align?: 'start' | 'center' | 'end';
  verticalAlign?: 'top' | 'middle' | 'bottom';
  icon?: ReactNode;
  iconPosition?: 'left' | 'center' | 'right';
  textStyle?: CSSProperties;
  textSpacing?: number;
  textBackground?: string;
  textPadding?: number | string;
  textBorderRadius?: number | string;
  breakpoint?: 'sm' | 'md' | 'lg' | 'xl';
}

/** Divider 引用接口 */
export interface DividerRef {
  element: HTMLDivElement | null;
  getOrientation: () => DividerOrientation;
  getType: () => DividerType;
  getPosition: () => DividerPosition;
  getSize: () => DividerSize;
  getColor: () => DividerColor;
  getVariant: () => DividerVariant;
  focus: () => void;
  blur: () => void;
  scrollIntoView: (options?: ScrollIntoViewOptions) => void;
}

/** Divider 组属性 */
export interface DividerGroupProps {
  children: ReactNode;
  orientation?: DividerOrientation;
  spacing?: number;
  className?: string;
  style?: CSSProperties;
}

/** Divider 工具类接口 */
export interface DividerUtils {
  getStyle: (props: Partial<DividerProps>) => CSSProperties;
  getClassName: (props: Partial<DividerProps>) => string;
  validateProps: (props: Partial<DividerProps>) => boolean;
}

/** 垂直 Divider 属性 */
export interface VerticalDividerProps extends DividerProps {
  height?: number | string;
}

/** 文本 Divider 属性 */
export interface TextDividerProps extends DividerProps {
  text: string;
  textStyle?: CSSProperties;
}

/** 动画 Divider 属性 */
export interface AnimatedDividerProps extends DividerProps {
  animationType?: 'fade' | 'slide' | 'scale';
  animationDuration?: number;
}

/** Divider 预设 */
export type DividerPreset = 'default' | 'minimal' | 'bold' | 'elegant';
