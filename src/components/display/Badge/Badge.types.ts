import type { CSSProperties, ReactNode } from 'react';
import type { BaseProps } from '@/types/component';

export interface BadgeProps extends BaseProps {
  count?: number;
  dot?: boolean;
  overflowCount?: number;
  showZero?: boolean;
  status?: 'default' | 'processing' | 'success' | 'error' | 'warning';
  text?: string;
  color?: string;
  size?: 'default' | 'small';
  offset?: [number, number];
  title?: string;
  children?: React.ReactNode;
  style?: any;
  className?: string;
}

export interface BadgeRef {
  element: any;
  getCount: () => number | undefined;
  isDot: () => boolean;
  isVisible: () => boolean;
}
