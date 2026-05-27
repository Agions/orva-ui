/**
 * 懒加载 Hook
 * 用于图片、组件等资源的按需加载，提升首屏性能
 * @module hooks/ui/useLazyLoad
 */

import { useState, useRef, useEffect, useCallback, useMemo } from 'react';

// ==================== 类型定义 ====================

export interface LazyLoadOptions {
  /**
   * 触发加载的偏移量（距离视口边缘的像素数）
   * @default 100
   */
  rootMargin?: string;
  
  /**
   * 触发加载的阈值（0-1，0 表示完全不可见，1 表示完全可见）
   * @default 0.1
   */
  threshold?: number;
  
  /**
   * 加载失败重试次数
   * @default 3
   */
  retryCount?: number;
  
  /**
   * 重试延迟（毫秒）
   * @default 1000
   */
  retryDelay?: number;
  
  /**
   * 是否启用占位符
   * @default true
   */
  placeholder?: boolean;
  
  /**
   * 占位符内容
   */
  placeholderContent?: React.ReactNode;
  
  /**
   * 加载失败内容
   */
  errorContent?: React.ReactNode;
  
  /**
   * 加载中的内容
   */
  loadingContent?: React.ReactNode;
  
  /**
   * 加载成功回调
   */
  onLoad?: () => void;
  
  /**
   * 加载失败回调
   */
  onError?: (error: Error) => void;
}

export interface UseLazyLoadReturn {
  /**
   * 容器 ref，需要绑定到 DOM 元素
   */
  ref: React.RefObject<HTMLDivElement | null>;
  
  /**
   * 当前加载状态
   */
  status: 'idle' | 'loading' | 'loaded' | 'error';
  
  /**
   * 是否可见（已进入视口）
   */
  isVisible: boolean;
  
  /**
   * 错误信息
   */
  error: Error | null;
  
  /**
   * 重试加载
   */
  retry: () => void;
  
  /**
   * 手动触发加载
   */
  load: () => void;
}

// ==================== 常量 ====================

const DEFAULT_ROOT_MARGIN = '100px';
const DEFAULT_THRESHOLD = 0.1;
const DEFAULT_RETRY_COUNT = 3;
const DEFAULT_RETRY_DELAY = 1000;

// ==================== Hook 实现 ====================

/**
 * 懒加载 Hook
 * 
 * 功能：
 * - 使用 Intersection Observer API 检测元素可见性
 * - 支持自动重试机制
 * - 提供加载状态管理
 * - 支持自定义占位符和错误内容
 * 
 * @param contentRenderer - 内容渲染函数，返回需要懒加载的内容
 * @param options - 配置选项
 * @returns 懒加载相关状态和方法
 * 
 * @example
 * ```typescript
 * const { ref, status, retry } = useLazyLoad(
 *   () => <img src={imageUrl} alt="lazy loaded" />,
 *   {
 *     placeholderContent: <div className="placeholder">加载中...</div>,
 *     errorContent: <div className="error" onClick={retry}>加载失败，点击重试</div>,
 *   }
 * );
 * 
 * return (
 *   <div ref={ref}>
 *     {status === 'idle' && placeholderContent}
 *     {status === 'loading' && loadingContent}
 *     {status === 'loaded' && contentRenderer()}
 *     {status === 'error' && errorContent}
 *   </div>
 * );
 * ```
 */
export function useLazyLoad<T>(
  contentRenderer: () => T,
  options: LazyLoadOptions = {},
): UseLazyLoadReturn & { content: T | null } {
  const {
    rootMargin = DEFAULT_ROOT_MARGIN,
    threshold = DEFAULT_THRESHOLD,
    retryCount = DEFAULT_RETRY_COUNT,
    retryDelay = DEFAULT_RETRY_DELAY,
    placeholder = true,
    placeholderContent,
    errorContent,
    loadingContent,
    onLoad,
    onError,
  } = options;

  const ref = useRef<HTMLDivElement | null>(null);
  const [status, setStatus] = useState<'idle' | 'loading' | 'loaded' | 'error'>('idle');
  const [isVisible, setIsVisible] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const retryCountRef = useRef(0);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // 内容（仅在加载成功后返回）
  const content = useMemo(() => {
    if (status === 'loaded') {
      return contentRenderer();
    }
    return null;
  }, [status, contentRenderer]);

  // 处理加载成功
  const handleLoad = useCallback(() => {
    setStatus('loaded');
    setError(null);
    retryCountRef.current = 0;
    onLoad?.();
  }, [onLoad]);

  // 处理加载失败
  const handleError = useCallback(
    (err: Error) => {
      setError(err);
      setStatus('error');
      
      if (retryCountRef.current < retryCount) {
        retryCountRef.current += 1;
        setTimeout(() => {
          load();
        }, retryDelay);
      } else {
        onError?.(err);
      }
    },
    [retryCount, retryDelay, onError],
  );

  // 加载内容
  const load = useCallback(() => {
    if (status === 'loaded' || status === 'loading') return;
    
    setStatus('loading');
    setError(null);

    try {
      // 使用 requestIdleCallback 或 setTimeout 延迟加载
      const loadContent = () => {
        try {
          const result = contentRenderer();
          // 如果是 Promise（如动态 import）
          if (result instanceof Promise) {
            result
              .then(() => handleLoad())
              .catch(handleError);
          } else {
            handleLoad();
          }
        } catch (err) {
          handleError(err instanceof Error ? err : new Error(String(err)));
        }
      };

      if ('requestIdleCallback' in window) {
        requestIdleCallback(loadContent);
      } else {
        setTimeout(loadContent, 0);
      }
    } catch (err) {
      handleError(err instanceof Error ? err : new Error(String(err)));
    }
  }, [status, contentRenderer, handleLoad, handleError]);

  // 重试
  const retry = useCallback(() => {
    retryCountRef.current = 0;
    load();
  }, [load]);

  // 初始化 Intersection Observer
  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            if (status === 'idle') {
              load();
            }
          }
        });
      },
      {
        rootMargin,
        threshold,
      },
    );

    observer.observe(ref.current);
    observerRef.current = observer;

    return () => {
      observer.disconnect();
    };
  }, [rootMargin, threshold, status, load]);

  // 可见时自动加载
  useEffect(() => {
    if (isVisible && status === 'idle') {
      load();
    }
  }, [isVisible, status, load]);

  return {
    ref,
    status,
    isVisible,
    error,
    retry,
    load,
    content,
  };
}

/**
 * 图片懒加载 Hook
 * 专门用于图片资源的懒加载
 */
export function useLazyImage(
  src: string,
  options: Omit<LazyLoadOptions, 'placeholderContent' | 'errorContent' | 'loadingContent'> = {},
) {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [status, setStatus] = useState<'idle' | 'loading' | 'loaded' | 'error'>('idle');
  const [error, setError] = useState<Error | null>(null);

  const load = useCallback(() => {
    setStatus('loading');
    
    const img = new Image();
    img.onload = () => {
      setImageSrc(src);
      setStatus('loaded');
    };
    img.onerror = (e) => {
      const err = new Error(`Failed to load image: ${src}`);
      setError(err);
      setStatus('error');
    };
    img.src = src;
  }, [src]);

  const retry = useCallback(() => {
    setError(null);
    setStatus('idle');
    load();
  }, [load]);

  useEffect(() => {
    // 使用 requestIdleCallback 延迟加载
    const loadIdle = () => {
      if ('requestIdleCallback' in window) {
        requestIdleCallback(load);
      } else {
        setTimeout(load, 0);
      }
    };

    loadIdle();
  }, [load]);

  return {
    imageSrc,
    status,
    error,
    load,
    retry,
  };
}

export default useLazyLoad;
