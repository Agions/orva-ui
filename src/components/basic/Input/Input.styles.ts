/**
 * Input.styles.ts — CVA 样式变体定义
 * @module components/basic/Input/styles
 */

import { cva, type VariantProps } from 'class-variance-authority';
import cn from '../../../utils/classnames';
import type { ReactNode } from 'react';

const inputBase =
  'flex w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white transition-all duration-200 outline-none placeholder:text-gray-400 disabled:cursor-not-allowed disabled:opacity-50 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 aria-[invalid=true]:border-red-500 aria-[invalid=true]:focus-visible:ring-red-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-400 dark:ring-offset-gray-900 dark:focus-visible:ring-blue-400';

const inputSizes = cva(inputBase, {
  variants: {
    size: {
      xs: 'px-2 py-1 text-xs',
      sm: 'px-2.5 py-1.5 text-sm',
      md: 'px-3 py-2 text-sm',
      lg: 'px-4 py-2.5 text-base',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export interface InputStylesProps
  extends VariantProps<typeof inputSizes> {
  /** 是否显示错误状态 */
  error?: boolean;
  /** 是否带前缀图标/内容 */
  prefix?: ReactNode;
  /** 是否带后缀图标/内容 */
  suffix?: ReactNode;
  /** 自定义类名 */
  className?: string;
}

export function inputStyles(props: InputStylesProps): string {
  const { error, prefix, suffix, className, size } = props;

  return cn(
    inputSizes({ size, className }),
    error ? 'border-red-500 focus-visible:ring-red-500' : undefined,
    prefix ? 'pl-9' : undefined,
    suffix ? 'pr-9' : undefined
  );
}

export { inputSizes };