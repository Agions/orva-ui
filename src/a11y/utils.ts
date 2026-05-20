/**
 * 无障碍工具类
 */

import { useEffect } from 'react';

/**
 * 检测高对比度模式
 */
export function detectHighContrast(): boolean {
  if (typeof window === 'undefined') return false;

  const mediaQuery = window.matchMedia('(prefers-contrast: high)');
  return mediaQuery.matches;
}

/**
 * 检测减少动画偏好
 */
export function detectReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;

  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  return mediaQuery.matches;
}

/**
 * 检测触摸设备
 */
export function detectTouchDevice(): boolean {
  if (typeof window === 'undefined') return false;

  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}

/**
 * 生成唯一的 ID
 */
export function generateUniqueId(prefix: string = 'orva-ui'): string {
  return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * 格式化屏幕阅读器文本
 */
export function formatScreenReaderText(
  text: string,
  options: {
    announce?: boolean;
    priority?: 'polite' | 'assertive';
  } = {},
): void {
  const { announce = true, priority = 'polite' } = options;

  if (!announce) return;

  // 创建一个隐藏的 ARIA live region
  let liveRegion = document.getElementById('orva-ui-live-region');

  if (!liveRegion) {
    liveRegion = document.createElement('div');
    liveRegion.id = 'orva-ui-live-region';
    liveRegion.setAttribute('aria-live', priority);
    liveRegion.style.cssText = 'position: absolute; left: -10000px; width: 1px; height: 1px; overflow: hidden;';
    document.body.appendChild(liveRegion);
  }

  liveRegion.textContent = text;
}

/**
 * 键盘陷阱 - 将焦点限制在特定区域内
 */
export function useKeyboardTrap(
  containerId: string,
  enabled: boolean = true,
): void {
  useEffect(() => {
    if (!enabled) return;

    const container = document.getElementById(containerId);
    if (!container) return;

    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    );
    const firstElement = focusableElements[0] as HTMLElement | null;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement | null;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return;

      if (event.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstElement) {
          event.preventDefault();
          lastElement?.focus();
        }
      } else {
        // Tab
        if (document.activeElement === lastElement) {
          event.preventDefault();
          firstElement?.focus();
        }
      }
    };

    container.addEventListener('keydown', handleKeyDown);
    return () => container.removeEventListener('keydown', handleKeyDown);
  }, [containerId, enabled]);
}