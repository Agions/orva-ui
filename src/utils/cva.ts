/**
 * CVA 样式工具
 * 封装 class-variance-authority + clsx + tailwind-merge
 * @module utils/cva
 */

import { cva, type VariantProps } from 'class-variance-authority';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { ClassValue } from 'clsx';

/**
 * 合并 class name
 * 自动处理 twMerge 优化，支持 UnoCSS 兼容
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * 带 token 变量的 CVA
 * 生成 class + inline style 组合
 * 适用于需要 CSS Variables 和 CVA class 结合的组件
 */
export function cvaWithTokens<T extends ReturnType<typeof cva>>(
  base: T,
  tokenStyles: Record<string, string> = {},
) {
  return (props?: Parameters<T>[0], additionalTokens?: Record<string, string>) => {
    const classResult = base(props);
    const mergedTokens = { ...tokenStyles, ...additionalTokens };
    const hasTokens = Object.keys(mergedTokens).length > 0;

    return {
      className: classResult,
      style: hasTokens ? mergedTokens as React.CSSProperties : undefined,
    };
  };
}

export { cva, clsx };
export type { VariantProps, ClassValue };