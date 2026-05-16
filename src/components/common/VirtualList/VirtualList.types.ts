import type { CSSProperties, ReactNode } from 'react';
import type { BaseProps } from '@/types/component';

/** VirtualList 项配置 */
export interface VirtualListItemConfig {
  /** 项目样式 */
  itemStyle?: CSSProperties;
  /** 项目类名 */
  itemClassName?: string;
  /** 滚动事件回调 */
  onScroll?: (scrollTop: number, scrollLeft: number) => void;
}

/** VirtualList 位置项 */
export interface VirtualListPositionItem {
  top: number;
  height: number;
  bottom: number;
  index: number;
  data: unknown;
}

/** VirtualList Ref */
export interface VirtualListRef {
  /** 滚动到指定位置 */
  scrollTo: (scrollTop: number) => void;
  /** 滚动到指定索引 */
  scrollToIndex: (index: number) => void;
  /** 获取当前滚动位置 */
  getScrollTop: () => number;
  /** 刷新列表 */
  refresh: () => void;
}

export interface VirtualListProps<T = unknown> extends BaseProps {
  /** 列表数据 */
  data: T[];
  /** 项目高度 */
  itemHeight: number | ((index: number) => number);
  /** 可视区域高度 */
  height: number | string;
  /** 可视区域宽度 */
  width?: number | string;
  /** 渲染函数 */
  renderItem: (item: T, index: number) => ReactNode;
  /** 项目唯一键 */
  itemKey?: string | ((item: T, index: number) => string);
  /** 缓冲项数量 */
  overscan?: number;
  /** 是否支持动态高度 */
  dynamicHeight?: boolean;
  /** 滚动到指定索引 */
  scrollToIndex?: number;
  /** 滚动行为 */
  scrollBehavior?: 'auto' | 'smooth';
  /** 空数据内容 */
  empty?: ReactNode;
  /** 加载内容 */
  loading?: ReactNode;
  /** 是否正在加载 */
  isLoading?: boolean;
  /** 触底回调 */
  onEndReached?: () => void;
  /** 触底阈值 */
  onEndReachedThreshold?: number;
  /** 项目样式 */
  itemStyle?: CSSProperties;
  /** 项目类名 */
  itemClassName?: string;
  /** 滚动事件回调 */
  onScroll?: (scrollTop: number, scrollLeft: number) => void;
}
