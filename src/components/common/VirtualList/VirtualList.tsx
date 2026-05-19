import React, { useRef, useEffect, useMemo, useCallback, useState, ReactNode, CSSProperties } from 'react';
import { View, ScrollView } from '@tarojs/components';
import type { VirtualListProps, VirtualListPositionItem } from './VirtualList.types';
import { createComponent } from '@/utils/createComponent';
import { useMicroAnimation } from '@/hooks/ui/useMicroAnimation';
import { useAccessibility, ARIA_ROLES } from '@/hooks/ui/useAccessibility';

/**
 * 虚拟列表组件 (VirtualList)
 * @module components/common/VirtualList
 * @description 用于渲染大量数据的虚拟列表组件，只渲染可见区域的元素以提升性能
 * @example
 * ```tsx
 * import { VirtualList } from 'orva-ui';
 *
 * const data = Array.from({ length: 10000 }, (_, i) => ({ id: i, title: `Item ${i}` }));
 *
 * <VirtualList
 *   data={data}
 *   height={400}
 *   itemHeight={50}
 *   itemKey="id"
 *   renderItem={(item) => <div>{item.title}</div>}
 * />
 * ```
 */
export const VirtualList = createComponent<VirtualListProps<unknown>, HTMLElement>({
  name: 'VirtualList',
  render: (props, ref) => {
    const {
      data,
      renderItem,
      itemHeight,
      height,
      width = '100%',
      itemKey,
      overscan = 3,
      dynamicHeight = false,
      scrollToIndex,
      scrollBehavior = 'auto',
      empty,
      loading,
      isLoading = false,
      onEndReached,
      onEndReachedThreshold = 200,
      style,
      className,
      itemClassName,
      onScroll,
    } = props;

    const [scrollTop, setScrollTop] = useState(0);
    const [positions, setPositions] = useState<VirtualListPositionItem[]>([]);
    const containerRef = useRef<HTMLElement | null>(null);
    const contentRef = useRef<HTMLElement | null>(null);
    const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const animation = useMicroAnimation({ type: 'micro', enabled: true });
    const a11y = useAccessibility({
      role: ARIA_ROLES.list,
      label: 'Virtual List',
    });

    const calculatePositions = useCallback(() => {
      if (!dynamicHeight && typeof itemHeight === 'number') {
        return data.map((item, index) => ({
          top: index * itemHeight,
          height: itemHeight,
          bottom: (index + 1) * itemHeight,
          index,
          data: item,
        }));
      }
      const newPositions: VirtualListPositionItem[] = [];
      let top = 0;
      data.forEach((item, index) => {
        const h = typeof itemHeight === 'function' ? itemHeight(index) : itemHeight;
        newPositions.push({ top, height: h, bottom: top + h, index, data: item });
        top += h;
      });
      return newPositions;
    }, [data, itemHeight, dynamicHeight]);

    useEffect(() => { setPositions(calculatePositions()); }, [calculatePositions]);

    const visibleRange = useMemo(() => {
      if (!positions.length) return { start: 0, end: 0 };
      const containerHeight = typeof height === 'number' ? height : containerRef.current?.clientHeight || 0;
      const startIndex = positions.findIndex((item) => item.bottom > scrollTop);
      const endIndex = positions.findIndex((item) => item.top > scrollTop + containerHeight);
      return {
        start: Math.max(0, startIndex - overscan),
        end: Math.min(positions.length - 1, endIndex + overscan),
      };
    }, [scrollTop, positions, height, overscan]);

    const totalHeight = useMemo(() => {
      if (!positions.length) return 0;
      const lastItem = positions[positions.length - 1];
      return lastItem ? lastItem.bottom : 0;
    }, [positions]);

    const handleScroll = useCallback(
      (e: { detail: { scrollTop: number; scrollLeft: number } }) => {
        const newScrollTop = e.detail.scrollTop;
        setScrollTop(newScrollTop);
        if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
        scrollTimeoutRef.current = setTimeout(() => { scrollTimeoutRef.current = null; }, 150);
        onScroll?.(newScrollTop, e.detail.scrollLeft);
        if (onEndReached && !isLoading) {
          const containerHeight = typeof height === 'number' ? height : containerRef.current?.clientHeight || 0;
          if (totalHeight - (newScrollTop + containerHeight) < onEndReachedThreshold) onEndReached();
        }
      },
      [onEndReached, onEndReachedThreshold, isLoading, onScroll, height, totalHeight],
    );

    useEffect(() => {
      if (scrollToIndex !== undefined && containerRef.current) {
        const position = positions[scrollToIndex];
        if (position) containerRef.current.scrollTo({ top: position.top, behavior: scrollBehavior });
      }
    }, [scrollToIndex, positions, scrollBehavior]);

    useEffect(() => {
      return () => { if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current); };
    }, []);

    const renderItems = useCallback(() => {
      if (!positions.length) return null;
      const items: ReactNode[] = [];
      const { start, end } = visibleRange;
      for (let i = start; i <= end; i++) {
        const position = positions[i];
        if (!position) continue;
        const key = typeof itemKey === 'function' ? itemKey(position.data, i) : ((position.data as Record<string, unknown>)[itemKey as string] as string);
        const itemStyle: CSSProperties = { position: 'absolute', top: position.top, left: 0, width: '100%', height: position.height, ...props.itemStyle };
        items.push(<View key={key} className={itemClassName} style={itemStyle} data-index={i}>{renderItem(position.data, i)}</View>);
      }
      return items;
    }, [positions, visibleRange, itemKey, renderItem, itemClassName, props.itemStyle]);

    const renderContent = () => {
      if (isLoading && data.length === 0) return loading || <View className="flex items-center justify-center h-full">加载中...</View>;
      if (!isLoading && data.length === 0) return empty || <View className="flex items-center justify-center h-full">暂无数据</View>;
      return (
        <>
          {renderItems()}
          {isLoading && data.length > 0 && (
            <View className="flex items-center justify-center p-4">
              <View className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></View>
            </View>
          )}
        </>
      );
    };

    const mergedStyle = animation.getMergedStyle({ height, width, ...style });

    return (
      <ScrollView
        ref={(node) => {
          if (typeof ref === 'function') ref(node);
          else if (ref) ref.current = node;
          containerRef.current = node;
        }}
        className={`relative ${className || ''}`}
        style={mergedStyle}
        onScroll={handleScroll}
        {...a11y.getAriaAttributes()}
      >
        <View ref={contentRef} style={{ height: totalHeight, position: 'relative' }}>{renderContent()}</View>
      </ScrollView>
    );
  },
});

export default VirtualList;