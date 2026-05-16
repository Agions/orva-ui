/**
 * 键盘导航钩子
 */

import { useEffect, useCallback } from 'react';

/**
 * 通用键盘导航钩子
 */
export const useKeyboardNavigation = (
  handlers: {
    onEnter?: () => void;
    onSpace?: () => void;
    onEscape?: () => void;
    onArrowUp?: () => void;
    onArrowDown?: () => void;
    onArrowLeft?: () => void;
    onArrowRight?: () => void;
    onTab?: () => void;
  },
  enabled: boolean = true
) => {
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (!enabled) return;

    switch (event.key) {
      case 'Enter':
        handlers.onEnter?.();
        break;
      case ' ':
        event.preventDefault();
        handlers.onSpace?.();
        break;
      case 'Escape':
        handlers.onEscape?.();
        break;
      case 'ArrowUp':
        handlers.onArrowUp?.();
        break;
      case 'ArrowDown':
        handlers.onArrowDown?.();
        break;
      case 'ArrowLeft':
        handlers.onArrowLeft?.();
        break;
      case 'ArrowRight':
        handlers.onArrowRight?.();
        break;
      case 'Tab':
        handlers.onTab?.();
        break;
    }
  }, [handlers, enabled]);

  useEffect(() => {
    if (!enabled) return;

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown, enabled]);
};

/**
 * 列表导航钩子
 */
export const useListNavigation = (
  items: any[],
  selectedIndex: number,
  onSelect: (index: number) => void,
  enabled: boolean = true
) => {
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (!enabled) return;

    switch (event.key) {
      case 'ArrowUp':
        event.preventDefault();
        const prevIndex = selectedIndex > 0 ? selectedIndex - 1 : items.length - 1;
        onSelect(prevIndex);
        break;
      case 'ArrowDown':
        event.preventDefault();
        const nextIndex = selectedIndex < items.length - 1 ? selectedIndex + 1 : 0;
        onSelect(nextIndex);
        break;
      case 'Home':
        event.preventDefault();
        onSelect(0);
        break;
      case 'End':
        event.preventDefault();
        onSelect(items.length - 1);
        break;
    }
  }, [items, selectedIndex, onSelect, enabled]);

  useEffect(() => {
    if (!enabled) return;

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown, enabled]);
};