/**
 * Badge.styles.ts — CVA 样式变体定义
 * @module components/display/Badge/Badge.styles
 * @description 使用 CVA 定义 Badge 的样式变体，支持 type / size / dot 模式
 */

import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils/cva';

/**
 * Badge wrapper CVA — positioning context
 */
export const badgeWrapperVariants = cva(
  'relative inline-flex',
  {
    variants: {},
    defaultVariants: {},
  },
);

/**
 * Badge indicator CVA — the visible badge dot / count
 */
export const badgeIndicatorVariants = cva(
  [
    'orva-badge__indicator',
    'absolute top-0 right-0 z-10',
    'flex items-center justify-center',
    'transform translate-x-1/2 -translate-y-1/2',
    'transition-all duration-200 ease-in-out',
  ].join(' '),
  {
    variants: {
      type: {
        default: 'bg-red-500 text-white',
        primary: 'bg-blue-500 text-white',
        success: 'bg-green-500 text-white',
        warning: 'bg-amber-500 text-white',
        error: 'bg-red-500 text-white',
        info: 'bg-sky-500 text-white',
      },
      size: {
        sm: 'min-w-[14px] h-[14px] px-1 text-[10px] font-medium rounded-full',
        md: 'min-w-[18px] h-[18px] px-1.5 text-xs font-medium rounded-full',
        lg: 'min-w-[22px] h-[22px] px-1.5 text-sm font-medium rounded-full',
      },
      dot: {
        true: 'min-w-[8px] w-2 h-2 p-0 rounded-full',
        false: '',
      },
    },
    defaultVariants: {
      type: 'default',
      size: 'md',
      dot: false,
    },
  },
);

/**
 * Badge count text
 */
export const badgeCountVariants = cva(
  'text-xs font-medium leading-none',
  {
    variants: {
      size: {
        sm: 'text-[10px]',
        md: 'text-xs',
        lg: 'text-sm',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  },
);

/**
 * Pulse animation class for dot mode
 */
export const badgePulseClass = 'orva-badge__pulse animate-badge-pulse';

export type BadgeIndicatorVariantProps = VariantProps<typeof badgeIndicatorVariants>;
export type BadgeCountVariantProps = VariantProps<typeof badgeCountVariants>;

/**
 * Helper: compute badge indicator className
 */
export function getBadgeIndicatorClassName(
  props: BadgeIndicatorVariantProps & { className?: string },
): string {
  return cn(
    badgeIndicatorVariants({
      type: props.type,
      size: props.size,
      dot: props.dot,
    }),
    props.dot ? badgePulseClass : undefined,
    props.className,
  );
}

/**
 * Helper: compute badge count className
 */
export function getBadgeCountClassName(
  props: BadgeCountVariantProps & { className?: string },
): string {
  return cn(badgeCountVariants({ size: props.size }), props.className);
}
