/**
 * Button 内存泄漏防护器
 * 自动清理定时器、事件监听器和引用
 */

import { useRef, useCallback, useEffect } from 'react';
import { createComponent } from '@/utils/createComponent';
import type { ButtonProps, ButtonRef } from './Button.types';
import { createLogger } from '../../../utils/logger';

// 资源管理器接口
const logger = createLogger('Memory Safe Button');

interface ResourceManager {
  timers: NodeJS.Timeout[];
  eventListeners: Array<() => void>;
  subscriptions: Array<{ unsubscribe: () => void }>;
  observers: Array<IntersectionObserver | ResizeObserver>;
  refs: WeakMap<any, HTMLElement>;
}

// 内存泄漏防护 Hook
export const useMemoryLeakProtection = () => {
  const resourceManager = useRef<ResourceManager>({
    timers: [],
    eventListeners: [],
    subscriptions: [],
    observers: [],
    refs: new WeakMap()
  });

  // 清理所有资源
  const cleanupResources = useCallback(() => {
    // 清除所有定时器
    resourceManager.current.timers.forEach(timer => {
      clearTimeout(timer);
      clearInterval(timer);
    });
    resourceManager.current.timers = [];

    // 移除所有事件监听器
    resourceManager.current.eventListeners.forEach(unsubscribe => {
      try {
        unsubscribe();
      } catch (error) {
        logger.warn('Failed to remove event listener:', error);
      }
    });
    resourceManager.current.eventListeners = [];

    // 取消所有订阅
    resourceManager.current.subscriptions.forEach(sub => {
      try {
        sub.unsubscribe();
      } catch (error) {
        logger.warn('Failed to unsubscribe:', error);
      }
    });
    resourceManager.current.subscriptions = [];

    // 断开所有观察者
    resourceManager.current.observers.forEach(observer => {
      try {
        observer.disconnect();
      } catch (error) {
        logger.warn('Failed to disconnect observer:', error);
      }
    });
    resourceManager.current.observers = [];
  }, []);

  // 安全设置定时器
  const safeSetTimeout = useCallback((callback: () => void, delay: number) => {
    const timer = setTimeout(callback, delay);
    resourceManager.current.timers.push(timer);
    return timer;
  }, []);

  const safeSetInterval = useCallback((callback: () => void, delay: number) => {
    const interval = setInterval(callback, delay);
    resourceManager.current.timers.push(interval);
    return interval;
  }, []);

  // 清理函数
  useEffect(() => {
    return () => {
      cleanupResources();
    };
  }, [cleanupResources]);

  return {
    safeSetTimeout,
    safeSetInterval,
    cleanupResources,
  };
};

// 简化的 MemorySafeButton 组件
export const MemorySafeButton = createComponent<ButtonProps, ButtonRef>({
  name: 'MemorySafeButton',

  defaultProps: {
    type: 'default',
    size: 'md',
    variant: 'solid',
    disabled: false,
    loading: false,
    block: false,
    iconPosition: 'left',
    flat: false,
  },

  render: () => {
    // 简单的占位实现 - 实际应委托给主 Button 组件
    return null;
  },
});

MemorySafeButton.displayName = 'MemorySafeButton';

export default MemorySafeButton;
