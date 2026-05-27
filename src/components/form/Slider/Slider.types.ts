import type { BaseProps } from '@/types/component';
import type * as React from 'react';

/** 尺寸类型 */
export type Size = 'small' | 'medium' | 'large';
/** 变体类型 */
export type Variant = 'default' | 'filled' | 'outlined';

/** Slider 尺寸 */
export type SliderSize = 'small' | 'medium' | 'large';

/** Slider 变体 */
export type SliderVariant = 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error';

/** Slider 标记 */
export interface SliderMark {
  label: React.ReactNode;
}

/** Slider 工具提示配置 */
export interface SliderTooltipConfig {
  formatter?: (value: number) => React.ReactNode;
}

/** Slider 属性 */
export interface SliderProps extends BaseProps {
  /** 当前值 */
  value?: number;
  /** 默认值 */
  defaultValue?: number;
  /** 是否禁用 */
  disabled?: boolean;
  /** 值变化回调 */
  onChange?: (_value: number, event?: any) => void;

  min?: number;
  max?: number;
  step?: number;
  marks?: boolean | SliderMark[];
  included?: boolean;
  vertical?: boolean;
  reverse?: boolean;
  tooltip?: boolean | SliderTooltipConfig;
  size?: Size | SliderSize;
  variant?: Variant | SliderVariant;
  onChangeComplete?: (_value: number) => void;
  accessible?: boolean;
  accessibilityLabel?: string;
  accessibilityRole?: string;
  accessibilityState?: {
    disabled?: boolean;
    readonly?: boolean;
    busy?: boolean;
  };
}

/** Slider 引用接口 */
export interface SliderRef {
  getValue: () => number;
  setValue: (_value: number) => void;
  disable: () => void;
  enable: () => void;
}

/** Slider 工具类接口 */
export interface SliderUtilsType {
  calculatePosition: (_value: number, min: number, max: number) => number;
  calculateValue: (_position: number, min: number, max: number) => number;
  formatValue: (_value: number, step: number) => number;
  validateValue: (_value: number, min: number, max: number) => boolean;
}

/** Slider 工具类实现 */
export const SliderUtils: SliderUtilsType = {
  calculatePosition: (value: number, min: number, max: number) => {
    return ((value - min) / (max - min)) * 100;
  },
  calculateValue: (position: number, min: number, max: number) => {
    return min + (position / 100) * (max - min);
  },
  formatValue: (value: number, step: number) => {
    return Math.round(value / step) * step;
  },
  validateValue: (value: number, min: number, max: number) => {
    return value >= min && value <= max;
  },
};
