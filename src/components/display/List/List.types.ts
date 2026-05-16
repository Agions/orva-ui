import type * as React from 'react';
import type { BaseProps } from '@/types/component';

export interface ListProps extends BaseProps {
  /** 子元素 */
  children?: React.ReactNode;
  /** 数据源 */
  dataSource?: any[];
  /** 自定义渲染列表项 */
  renderItem?: (item: any, index: number) => React.ReactNode;
  /** 列表头部 */
  header?: React.ReactNode;
  /** 列表底部 */
  footer?: React.ReactNode;
  /** 是否显示边框 */
  bordered?: boolean;
  /** 是否显示分割线 */
  split?: boolean;
  /** 是否加载中 */
  loading?: boolean;
  /** 列表尺寸 */
  size?: 'small' | 'default' | 'large';
}

export interface ListItemProps extends BaseProps {
  /** 列表项内容 */
  children: React.ReactNode;
  /** 索引 */
  index?: number;
  /** 列表项尺寸 */
  size?: 'small' | 'default' | 'large';
  /** 是否显示分割线 */
  split?: boolean;
  /** 是否禁用 */
  disabled?: boolean;
  /** 是否可点击 */
  clickable?: boolean;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
  /** 点击事件 */
  onPress?: (_event: any) => void;
  /** 长按事件 */
  onLongPress?: (_event: any) => void;
}

export interface ListRef {
	/** 获取列表项 */
  getItem: (_index: number) => HTMLElement | null;
	/** 滚动到指定项 */
  scrollToItem: (_index: number) => void;
	/** 获取列表项数量 */
  getItemCount: () => number;
}

export interface ListItemRef {
	/** 获取列表项元素 */
  getElement: () => HTMLElement | null;
	/** 获取索引 */
  getIndex: () => number;
}
