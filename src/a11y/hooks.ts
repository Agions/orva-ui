/**
 * 无障碍 hooks
 */

import { useEffect, useState } from 'react';

/**
 * 焦点管理 hook
 */
export const useFocusManager = () => {

  const focusElementById = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.focus();
    }
  };

  const focusFirstChild = (containerId: string) => {
    const container = document.getElementById(containerId);
    if (container) {
      const firstFocusable = container.querySelector(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      ) as HTMLElement;
      if (firstFocusable) {
        firstFocusable.focus();
      }
    }
  };

  return {
    focusElementById,
    focusFirstChild,
  };
};

/**
 * 键盘导航 hook
 */
export const useKeyboardNavigation = (
  keys: Record<string, () => void>,
  enabled: boolean = true
) => {
  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      const handler = keys[event.key];
      if (handler) {
        event.preventDefault();
        handler();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [keys, enabled]);
};

/**
 * 屏幕阅读器检测 hook
 */
export const useScreenReader = (): boolean => {
  const [isScreenReader, setIsScreenReader] = useState(false);

  useEffect(() => {
    const checkScreenReader = () => {
      // 简单的屏幕阅读器检测
      const userAgent = navigator.userAgent.toLowerCase();
      const isScreenReader = /screen reader|voiceover|nvda|jaws|dragon/i.test(userAgent);
      
      // 也可以通过 CSS media query 检测
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      
      setIsScreenReader(isScreenReader || prefersReducedMotion);
    };

    checkScreenReader();

    // 监听媒体查询变化
    const mediaQueryList = window.matchMedia('(prefers-reduced-motion: reduce)');
    mediaQueryList.addEventListener('change', checkScreenReader);

    return () => {
      mediaQueryList.removeEventListener('change', checkScreenReader);
    };
  }, []);

  return isScreenReader;
};