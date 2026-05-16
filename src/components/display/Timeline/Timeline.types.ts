import type { CSSProperties, ReactNode } from 'react';
import type { BaseProps } from '@/types/component';

export interface TimelineItemProps {
  /** 标题 */
  title?: ReactNode;
  /** 子节点 */
  children?: ReactNode;
  /** 描述 */
  description?: ReactNode;
  /** 时间戳 */
  timestamp?: string;
  /** 颜色 */
  color?: string;
  /** 自定义圆点 */
  dot?: ReactNode;
  /** 位置 */
  position?: 'left' | 'right';
  /** 是否最后一项 */
  isLast?: boolean;
  /** 内联样式 */
  style?: CSSProperties;
  /** 自定义类名 */
  className?: string;
}

export interface TimelineProps extends BaseProps {
  /** 时间线项数据 */
  items?: TimelineItemProps[];
  /** 显示模式 */
  mode?: 'left' | 'right' | 'alternate';
  /** 是否反向 */
  reverse?: boolean;
  /** 是否显示时间戳 */
  showTimestamp?: boolean;
  /** 方向 */
  direction?: 'vertical' | 'horizontal';
  /** 子节点 */
  children?: ReactNode;
  /** 内联样式 */
  style?: CSSProperties;
  /** 自定义类名 */
  className?: string;
}

export interface TimelineRef {
  /** DOM 元素 */
  element: any;
  /** 获取时间线模式 */
  getMode: () => 'left' | 'right' | 'alternate';
  /** 获取时间线方向 */
  getDirection: () => 'vertical' | 'horizontal';
  /** 检查是否反向 */
  isReverse: () => boolean;
  /** 获取项目数量 */
  getItemCount: () => number;
}
