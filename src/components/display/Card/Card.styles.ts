/**
 * Card.styles.ts — CVA 样式变体定义
 * @module components/display/Card/Card.styles
 * @description 使用 CVA 定义 Card 的样式变体
 */

import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils/cva';

/**
 * Card CVA 样式定义
 * 生成 className 而非 inline style
 */
export const cardVariants = cva(
  // 基础样式（所有 Card 共享）
  [
    'orva-card',
    'rounded-lg overflow-hidden transition-all duration-200 ease-in-out',
    'relative',
  ].join(' '),
  {
    variants: {
      variant: {
        default: 'bg-white dark:bg-gray-800',
        elevated: 'bg-white dark:bg-gray-800 shadow-md',
        outlined: 'bg-transparent border border-gray-200 dark:border-gray-700',
        flat: 'bg-gray-50 dark:bg-gray-900',
      },
      size: {
        sm: 'p-3',
        md: 'p-4',
        lg: 'p-6',
      },
      hoverable: {
        true: 'hover:shadow-lg hover:-translate-y-1 cursor-pointer',
      },
      clickable: {
        true: 'cursor-pointer active:scale-[0.995] active:shadow-sm',
      },
      bordered: {
        true: 'border border-gray-200 dark:border-gray-700',
      },
    },
    compoundVariants: [
      // outlined variant always shows border regardless of bordered prop
      {
        variant: 'outlined',
        bordered: false,
        className: 'border border-gray-200 dark:border-gray-700',
      },
      // flat variant: no shadow even when elevated feel is not needed
      {
        variant: 'flat',
        hoverable: true,
        className: 'hover:shadow-md',
      },
    ],
    defaultVariants: {
      variant: 'default',
      size: 'md',
      hoverable: true,
      clickable: false,
      bordered: true,
    },
  },
);

/**
 * Sub-component style helpers (not CVA, just utility class strings)
 */
export const cardSubStyles = {
  cover: 'w-full overflow-hidden rounded-t-lg',
  header: 'flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-700',
  headerContent: 'flex-1',
  title: 'text-lg font-semibold text-gray-900 dark:text-white',
  subtitle: 'text-sm text-gray-500 dark:text-gray-400 mt-1',
  extra: 'flex-shrink-0',
  content: 'p-4',
  footer: 'px-4 py-3 border-t border-gray-200 dark:border-gray-700',
  actions: 'flex items-center justify-end gap-2 px-4 py-3 border-t border-gray-200 dark:border-gray-700',
  action: 'flex-shrink-0',
  loading: 'opacity-70 pointer-events-none',
  loadingContent: 'space-y-3',
  loadingSkeleton: 'h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse',
};

export type CardVariantProps = VariantProps<typeof cardVariants>;

/**
 * Helper: compute the CVA className for Card
 */
export function getCardClassName(props: CardVariantProps & { className?: string }): string {
  return cn(
    cardVariants({
      variant: props.variant,
      size: props.size,
      hoverable: props.hoverable,
      clickable: props.clickable,
      bordered: props.bordered,
    }),
    props.className,
  );
}
