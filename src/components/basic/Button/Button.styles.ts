/**
 * Button — CVA 样式变体定义
 * @module components/basic/Button/Button.styles
 * @description 使用 CVA 定义 Button 的样式变体
 */

import { cva } from 'class-variance-authority';

/**
 * Button CVA 样式定义
 * 生成 className 而非 inline style
 * 样式值使用 CSS Variables，在运行时通过主题系统切换
 */
export const buttonVariants = cva(
  // 基础样式（所有 Button 共享）
  [
    'orva-btn',
    'inline-flex items-center justify-center gap-[6px]',
    'font-[500] border border-solid',
    'transition-all duration-150 ease-in-out',
    'select-none whitespace-nowrap align-middle',
    'no-underline cursor-pointer',
    // 按钮默认去掉 Taro 原生样式
  ].join(' '),
  {
    variants: {
      type: {
        default: [],
        primary: [],
        success: [],
        warning: [],
        danger: [],
        info: [],
      },
      size: {
        xs: 'px-[4px] py-[10px] text-[12px] h-[24px] min-w-[24px]',
        sm: 'px-[6px] py-[12px] text-[14px] h-[28px] min-w-[28px]',
        md: 'px-[8px] py-[16px] text-[16px] h-[34px] min-w-[34px]',
        lg: 'px-[10px] py-[20px] text-[18px] h-[40px] min-w-[40px]',
        xl: 'px-[12px] py-[24px] text-[20px] h-[48px] min-w-[48px]',
      },
      variant: {
        solid: [],
        outline: 'bg-transparent',
        ghost: 'bg-transparent border-transparent',
        text: 'bg-transparent border-transparent px-0',
        soft: 'border-transparent',
      },
      disabled: {
        true: 'opacity-50 pointer-events-none cursor-not-allowed',
      },
      loading: {
        true: 'opacity-50 pointer-events-none cursor-not-allowed',
      },
      block: {
        true: 'w-full',
      },
      flat: {
        true: 'shadow-none',
      },
      shape: {
        default: '',
        round: 'rounded-full',
        circle: 'rounded-full aspect-square',
        square: 'rounded-none',
      },
    },
    compoundVariants: [
      // disabled + 各变体的复合样式
      ...['solid', 'outline', 'ghost', 'text', 'soft'].map((v) => ({
        variant: v as 'solid' | 'outline' | 'ghost' | 'text' | 'soft',
        disabled: true,
        className: 'shadow-none',
      })),
      // loading + 各变体的复合样式
      ...['solid', 'outline', 'ghost', 'text', 'soft'].map((v) => ({
        variant: v as 'solid' | 'outline' | 'ghost' | 'text' | 'soft',
        loading: true,
        className: 'shadow-none',
      })),
    ],
    defaultVariants: {
      type: 'default',
      size: 'md',
      variant: 'solid',
      disabled: false,
      loading: false,
      block: false,
      flat: false,
      shape: 'default',
    },
  },
);