/**
 * 虚拟列表 Hook
 * 用于渲染超长列表的性能优化，只渲染可视区域的 DOM 节点
 * @module hooks/ui/useVirtualList
 */

import { useMemo, useRef, useState, useEffect, useCallback } from 'react';

// ==================== 类型定义 ====================

export interface VirtualListItem {
  id: string | number;
  data: unknown;
}

export interface UseVirtualListOptions {
  /**
   * 列表项高度（固定高度或动态高度计算函数）
   * @default 50
   */
  itemHeight?: number | ((index: number) => number);
  
  /**
   * 可视区域高度
   * @default 600
   */
  viewportHeight?: number;
  
  /**
   * 额外缓冲区域（可视区域上下各缓冲多少项）
   * @default 5
   */
  bufferCount?: number;
  
  /**
   * 列表项最小高度（用于动态高度估算）
   * @default 30
   */
  minItemHeight?: number;
  
  /**
   * 是否启用动态高度测量
   * @default false
   */
  dynamicHeight?: boolean;
}

export interface UseVirtualListReturn<T> {
  /**
   * 当前可视区域的列表项
   */
  visibleItems: Array<{
    index: number;
    item: T;
    top: number;
    height: number;
  }>;
  
  /**
   * 列表总高度（用于滚动容器）
   */
  totalHeight: number;
  
  /**
   * 滚动容器 ref
   */
  containerRef: React.RefObject<HTMLDivElement | null>;
  
  /**
   * 占位元素 ref（用于动态高度测量）
   */
  placeholderRef: React.RefObject<HTMLDivElement | null>;
  
  /**
   * 处理滚动事件
   */
  onScroll: (event: React.UIEvent<HTMLDivElement>) => void;
  
  /**
   * 滚动到指定索引
   */
  scrollToIndex: (index: number, behavior?: 'auto' | 'smooth') => void;
  
  /**
   * 滚动到指定位置
   */
  scrollToPosition: (position: number, behavior?: 'auto' | 'smooth') => void;
  
  /**
   * 当前滚动位置
   */
  scrollTop: number;
}

// ==================== 常量 ====================

const DEFAULT_ITEM_HEIGHT = 50;
const DEFAULT_VIEWPORT_HEIGHT = 600;
const DEFAULT_BUFFER_COUNT = 5;
const DEFAULT_MIN_ITEM_HEIGHT = 30;

// ==================== Hook 实现 ====================

/**
 * 虚拟列表 Hook
 * 
 * 功能：
 * - 只渲染可视区域的列表项
 * - 支持固定高度和动态高度
 * - 提供滚动到指定位置的方法
 * - 自动处理缓冲区域
 * 
 * @param items - 列表数据
 * @param options - 配置选项
 * @returns 虚拟列表相关状态和方法
 * 
 * @example
 * ```typescript
 * const { visibleItems, totalHeight, containerRef, onScroll } = useVirtualList(items, {
 *   itemHeight: 60,
 *   viewportHeight: 500,
 *   bufferCount: 3,
 * });
 * 
 * return (
 *   <div ref={containerRef} onScroll={onScroll} style={{ height: viewportHeight, overflow: 'auto' }}>
 *     <div style={{ height: totalHeight, position: 'relative' }}>
 *       {visibleItems.map(({ index, item, top, height }) => (
 *         <div key={item.id} style={{ position: 'absolute', top, height }}>
 *           <ListItem data={item} />
 *         </div>
 *       ))}
 *     </div>
 *   </div>
 * );
 * ```
 */
export function useVirtualList<T>(
  items: T[],
  options: UseVirtualListOptions = {}
): UseVirtualListReturn<T> {
  const {
    itemHeight: itemHeightOption = DEFAULT_ITEM_HEIGHT,
    viewportHeight = DEFAULT_VIEWPORT_HEIGHT,
    bufferCount = DEFAULT_BUFFER_COUNT,
    minItemHeight = DEFAULT_MIN_ITEM_HEIGHT,
    dynamicHeight = false,
  } = options;

  const containerRef = useRef<HTMLDivElement | null>(null);
  const placeholderRef = useRef<HTMLDivElement | null>(null);
  const [scrollTop, setScrollTop] = useState(0);
  const itemHeightsRef = useRef<Map<number, number>>(new Map());

  // 获取单个项的高度
  const getItemHeight = useCallback(
    (index: number): number => {
      if (typeof itemHeightOption === 'function') {
        return itemHeightOption(index);
      }
      return itemHeightOption;
    },
    [itemHeightOption]
  );

  // 更新动态高度
  const updateItemHeight = useCallback((index: number, height: number) => {
    itemHeightsRef.current.set(index, Math.max(height, minItemHeight));
  }, [minItemHeight]);

  // 计算可视区域
  const calculateVisibleRange = useCallback((): { startIndex: number; endIndex: number } => {
    let startIndex = 0;
    let endIndex = items.length - 1;

    if (dynamicHeight) {
      // 动态高度：遍历计算
      let accumulatedHeight = 0;
      for (let i = 0; i < items.length; i++) {
        const height = itemHeightsRef.current.get(i) ?? getItemHeight(i);
        if (accumulatedHeight >= scrollTop) {
          startIndex = Math.max(0, i - bufferCount);
          break;
        }
        accumulatedHeight += height;
      }

      accumulatedHeight = 0;
      for (let i = items.length - 1; i >= 0; i--) {
        const height = itemHeightsRef.current.get(i) ?? getItemHeight(i);
        accumulatedHeight += height;
        if (scrollTop + viewportHeight <= accumulatedHeight) {
          endIndex = Math.min(items.length - 1, i + bufferCount);
          break;
        }
      }
    } else {
      // 固定高度：直接计算
      const itemHeight = getItemHeight(0);
      startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - bufferCount);
      endIndex = Math.min(
        items.length - 1,
        Math.ceil((scrollTop + viewportHeight) / itemHeight) + bufferCount
      );
    }

    return { startIndex, endIndex };
  }, [items.length, scrollTop, viewportHeight, bufferCount, dynamicHeight, getItemHeight]);

  // 计算总高度
  const totalHeight = useMemo(() => {
    if (dynamicHeight) {
      let height = 0;
      items.forEach((_, index) => {
        height += itemHeightsRef.current.get(index) ?? getItemHeight(index);
      });
      return height;
    }
    return items.length * getItemHeight(0);
  }, [items.length, dynamicHeight, getItemHeight]);

  // 计算可见项
  const visibleItems = useMemo(() => {
    const { startIndex, endIndex } = calculateVisibleRange();
    const result: Array<{ index: number; item: T; top: number; height: number }> = [];

    let currentTop = 0;
    for (let i = 0; i < items.length; i++) {
      const height = dynamicHeight 
        ? (itemHeightsRef.current.get(i) ?? getItemHeight(i))
        : getItemHeight(i);
      
      if (i >= startIndex && i <= endIndex) {
        result.push({
          index: i,
          item: items[i],
          top: currentTop,
          height,
        });
      }
      currentTop += height;
    }

    return result;
  }, [items, calculateVisibleRange, dynamicHeight, getItemHeight]);

  // 处理滚动事件
  const onScroll = useCallback((event: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(event.currentTarget.scrollTop);
  }, []);

  // 滚动到指定索引
  const scrollToIndex = useCallback(
    (index: number, behavior: 'auto' | 'smooth' = 'auto') => {
      if (!containerRef.current || index < 0 || index >= items.length) return;

      let targetTop = 0;
      if (dynamicHeight) {
        for (let i = 0; i < index; i++) {
          targetTop += itemHeightsRef.current.get(i) ?? getItemHeight(i);
        }
      } else {
        targetTop = index * getItemHeight(0);
      }

      containerRef.current.scrollTo({
        top: targetTop,
        behavior,
      });
    },
    [items.length, dynamicHeight, getItemHeight]
  );

  // 滚动到指定位置
  const scrollToPosition = useCallback(
    (position: number, behavior: 'auto' | 'smooth' = 'auto') => {
      if (!containerRef.current) return;
      containerRef.current.scrollTo({
        top: position,
        behavior,
      });
    },
    []
  );

  // 测量动态高度
  useEffect(() => {
    if (!dynamicHeight || !placeholderRef.current) return;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const indexAttr = entry.target.getAttribute('data-index');
        if (indexAttr !== null) {
          const index = parseInt(indexAttr, 10);
          const height = entry.contentRect.height;
          updateItemHeight(index, height);
        }
      }
    });

    const elements = placeholderRef.current.querySelectorAll('[data-index]');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [dynamicHeight, updateItemHeight]);

  return {
    visibleItems,
    totalHeight,
    containerRef,
    placeholderRef,
    onScroll,
    scrollToIndex,
    scrollToPosition,
    scrollTop,
  };
}

export default useVirtualList;
