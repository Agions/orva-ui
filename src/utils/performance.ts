/**
 * 性能优化工具模块 (performance)
 * @module utils/performance
 * @description 提供防抖、节流、记忆化等性能优化函数，帮助提升应用性能
 * @example
 * ```ts
 * import { debounce, throttle, useMemoized } from '@/utils/performance';
 *
 * const debouncedSearch = debounce(search, 300);
 * const throttledScroll = throttle(onScroll, 100);
 * ```
 */

import React, { useMemo, useCallback, useRef, useEffect, useState } from 'react';

/**
 * 防抖函数
 * @param func 要防抖的函数
 * @param delay 延迟时间（毫秒）
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  
  return function (this: unknown, ...args: Parameters<T>) {
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func.apply(this, args);
      timeoutId = null;
    }, delay);
  };
}

/**
 * 节流函数
 * @param func 要节流的函数
 * @param limit 限制时间（毫秒）
 */
export function throttle<T extends (...args: unknown[]) => unknown>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle = false;
  
  return function (this: unknown, ...args: Parameters<T>) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
}

/**
 * React 防抖 Hook
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    
    return () => clearTimeout(handler);
  }, [value, delay]);
  
  return debouncedValue;
}

/**
 * React 节流 Hook
 */
export function useThrottle<T>(value: T, limit: number): T {
  const [throttledValue, setThrottledValue] = useState<T>(value);
  const lastRef = useRef<T>(value);
  const lastTimeRef = useRef<number>(0);
  
  useEffect(() => {
    const now = Date.now();
    if (now - lastTimeRef.current >= limit) {
      setThrottledValue(value);
      lastRef.current = value;
      lastTimeRef.current = now;
    }
  }, [value, limit]);
  
  return throttledValue;
}

/**
 * 记忆化 Hook - 用于昂贵的计算
 */
export function useMemoizedFn<T extends (...args: unknown[]) => unknown>(
  fn: T
): T {
  const fnRef = useRef<T>(fn);
  
  // 只在 fn 引用变化时更新
  if (fnRef.current !== fn) {
    fnRef.current = fn;
  }
  
  return useMemo(() => ((...args: Parameters<T>) => fnRef.current(...args)) as T, []);
}

/**
 * 深层记忆化 Hook
 */
export function useDeepMemo<T>(value: T, equalityFn?: (a: T, b: T) => boolean): T {
  const ref = useRef<T>(value);
  
  if (!equalityFn) {
    // 默认使用 JSON 比较
    if (JSON.stringify(ref.current) !== JSON.stringify(value)) {
      ref.current = value;
    }
  } else {
    if (!equalityFn(ref.current, value)) {
      ref.current = value;
    }
  }
  
  return ref.current;
}

/**
 * 虚拟列表 Hook - 用于长列表渲染优化
 */
export function useVirtualList<T>(
  items: T[],
  options: {
    containerHeight: number;
    itemHeight: number;
    overscan?: number;
  }
): {
  visibleItems: Array<{ item: T; index: number; top: number }>;
  totalHeight: number;
  scrollTop: number;
  onScroll: (e: React.UIEvent) => void;
} {
  const { containerHeight, itemHeight, overscan = 5 } = options;
  const [scrollTop, setScrollTop] = useState(0);
  
  const visibleCount = Math.ceil(containerHeight / itemHeight);
  const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan);
  const endIndex = Math.min(items.length, startIndex + visibleCount + overscan * 2);
  
  const visibleItems = useMemo(() => {
    return items.slice(startIndex, endIndex).map((item, index) => ({
      item,
      index: startIndex + index,
      top: (startIndex + index) * itemHeight,
    }));
  }, [items, startIndex, endIndex, itemHeight]);
  
  const totalHeight = items.length * itemHeight;
  
  const onScroll = useCallback((e: React.UIEvent) => {
    setScrollTop((e.target as HTMLElement).scrollTop);
  }, []);
  
  return {
    visibleItems,
    totalHeight,
    scrollTop,
    onScroll,
  };
}

/**
 * 默认导出
 */
export default {
  debounce,
  throttle,
  useDebounce,
  useThrottle,
  useMemoizedFn,
  useDeepMemo,
  useVirtualList,
};
