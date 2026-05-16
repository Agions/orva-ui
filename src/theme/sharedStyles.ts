/**
 * 共享样式工具类
 * 提供常用样式生成函数，减少重复代码
 * @module theme/sharedStyles
 */

import type { CSSProperties } from 'react';

/**
 * 基础样式生成器
 */
export const createBaseStyles = (overrides?: Partial<CSSProperties>): CSSProperties => ({
  boxSizing: 'border-box',
  ...overrides,
});

/**
 * 间距样式生成器
 */
export const createSpacingStyles = (
  padding?: number | string,
  margin?: number | string
): CSSProperties => ({
  padding: padding ?? 0,
  margin: margin ?? 0,
});

/**
 * 排版样式生成器
 */
export const createTypographyStyles = (options?: {
  fontSize?: string | number;
  fontWeight?: string | number;
  lineHeight?: string | number;
  color?: string;
  textAlign?: CSSProperties['textAlign'];
  textTransform?: CSSProperties['textTransform'];
  letterSpacing?: string | number;
}): CSSProperties => ({
  fontSize: options?.fontSize ?? '14px',
  fontWeight: options?.fontWeight ?? 'normal',
  lineHeight: options?.lineHeight ?? 1.5,
  color: options?.color ?? 'inherit',
  textAlign: options?.textAlign ?? 'left',
  textTransform: options?.textTransform ?? 'none',
  letterSpacing: options?.letterSpacing ?? 'normal',
});

/**
 * 布局样式生成器
 */
export const createLayoutStyles = (options?: {
  display?: CSSProperties['display'];
  flexDirection?: CSSProperties['flexDirection'];
  alignItems?: CSSProperties['alignItems'];
  justifyContent?: CSSProperties['justifyContent'];
  gap?: string | number;
  position?: CSSProperties['position'];
  top?: string | number;
  right?: string | number;
  bottom?: string | number;
  left?: string | number;
}): CSSProperties => ({
  display: options?.display ?? 'block',
  flexDirection: options?.flexDirection ?? 'row',
  alignItems: options?.alignItems ?? 'stretch',
  justifyContent: options?.justifyContent ?? 'flex-start',
  gap: options?.gap ?? 0,
  position: options?.position,
  top: options?.top,
  right: options?.right,
  bottom: options?.bottom,
  left: options?.left,
});

/**
 * 交互状态样式生成器
 */
export const createInteractionStyles = (options?: {
  hover?: Partial<CSSProperties>;
  active?: Partial<CSSProperties>;
  focus?: Partial<CSSProperties>;
  disabled?: Partial<CSSProperties>;
}): Record<string, CSSProperties> => ({
  hover: { ...options?.hover },
  active: { ...options?.active },
  focus: { ...options?.focus },
  disabled: { ...options?.disabled },
});

/**
 * 过渡动画样式生成器
 */
export const createTransitionStyles = (options?: {
  property?: string;
  duration?: string;
  timingFunction?: string;
}): CSSProperties => ({
  transition: options?.property
    ? `${options.property} ${options.duration ?? '0.2s'} ${options.timingFunction ?? 'ease'}`
    : 'all 0.2s ease',
});

/**
 * 响应式样式生成器
 */
export const createResponsiveStyles = (
  baseStyles: CSSProperties,
  breakpoints?: {
    sm?: Partial<CSSProperties>;
    md?: Partial<CSSProperties>;
    lg?: Partial<CSSProperties>;
    xl?: Partial<CSSProperties>;
  }
): CSSProperties => ({
  ...baseStyles,
  ...(breakpoints?.sm ?? {}),
  ...(breakpoints?.md ?? {}),
  ...(breakpoints?.lg ?? {}),
  ...(breakpoints?.xl ?? {}),
});

/**
 * 文本溢出处理样式
 */
export const createEllipsisStyles = (lines: number = 1): CSSProperties => ({
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: lines === 1 ? 'nowrap' : 'normal',
  display: lines > 1 ? '-webkit-box' : 'block',
  WebkitLineClamp: lines,
  WebkitBoxOrient: 'vertical' as const,
});

/**
 * 滚动条样式生成器
 */
export const createScrollbarStyles = (options?: {
  width?: string;
  color?: string;
  trackColor?: string;
}): string => {
  const width = options?.width ?? '6px';
  const color = options?.color ?? '#c1c1c1';
  const trackColor = options?.trackColor ?? '#f1f1f1';
  
  return `
    &::-webkit-scrollbar {
      width: ${width};
      height: ${width};
    }
    &::-webkit-scrollbar-track {
      background: ${trackColor};
      border-radius: ${width};
    }
    &::-webkit-scrollbar-thumb {
      background: ${color};
      border-radius: ${width};
    }
    &::-webkit-scrollbar-thumb:hover {
      background: ${color};
    }
  `;
};

/**
 * 默认导出
 */
export default {
  createBaseStyles,
  createSpacingStyles,
  createTypographyStyles,
  createLayoutStyles,
  createInteractionStyles,
  createTransitionStyles,
  createResponsiveStyles,
  createEllipsisStyles,
  createScrollbarStyles,
};
