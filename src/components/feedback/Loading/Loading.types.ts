import type * as React from 'react';
import type { BaseProps } from '@/types/component';

export type LoadingSize = 'small' | 'medium' | 'large';
export type LoadingType = 'spinner' | 'dots' | 'bar' | 'pulse' | 'bars';

export interface LoadingProps extends BaseProps {
  visible?: boolean;
  size?: LoadingSize;
  type?: LoadingType;
  text?: string;
  delay?: number;
  overlay?: boolean;
  color?: string;
  style?: any;
  className?: string;
  children?: React.ReactNode;
}

export interface LoadingRef {
	/** 获取元素 */
  getElement: () => HTMLElement | null;
	/** 显示加载 */
  show: () => void;
	/** 隐藏加载 */
  hide: () => void;
}
