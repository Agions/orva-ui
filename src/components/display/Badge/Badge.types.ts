import type { CSSProperties, ReactNode } from 'react';
import type { BaseProps } from '@/types/component';

export interface BadgeProps extends BaseProps {
  count?: number;
  dot?: boolean;
  overflowCount?: number;
  showZero?: boolean;
  status?: 'default' | 'processing' | 'success' | 'error' | 'warning';
  /** Badge visual type (color) — maps to status or standalone */
  type?: 'default' | 'primary' | 'success' | 'warning' | 'error' | 'info';
  text?: string;
  color?: string;
  size?: 'sm' | 'md' | 'lg';
  offset?: [number, number];
  title?: string;
  children?: React.ReactNode;
  style?: CSSProperties;
  className?: string;
}

export interface BadgeRef {
  element: HTMLElement | null;
  getCount: () => number | undefined;
  isDot: () => boolean;
  isVisible: () => boolean;
}
