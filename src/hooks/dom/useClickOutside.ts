/**
 * useClickOutside Hook
 * Detect clicks outside of a specific element
 *
 * @example
 * ```typescript
 * const ref = useClickOutside<HTMLDivElement>(() => {
 *   logger.info('Clicked outside!');
 *   setIsOpen(false);
 * });
 *
 * return <div ref={ref}>Content</div>;
 * ```
 */

import { useEffect, useRef, RefObject } from 'react';
import { createLogger } from '../../utils/logger';

/**
 * Hook for detecting clicks outside an element
 *
 * @template T - The type of the HTML element to attach the ref to
 * @param handler - Callback function triggered when a click/touch occurs outside the element
 * @param enabled - Whether the hook is active (default: true)
 * @returns A ref object to attach to the target element
 */
const logger = createLogger('use Click Outside');

export function useClickOutside<T extends HTMLElement = HTMLElement>(
  handler: (event: MouseEvent | TouchEvent) => void,
  enabled: boolean = true,
): RefObject<T | null> {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    if (!enabled) return;

    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      const element = ref.current;
      const target = event.target as Node;

      // Check if click is outside the element
      if (element && !element.contains(target)) {
        handler(event);
      }
    };

    // Add event listeners
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);

    // Cleanup
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [handler, enabled]);

  return ref;
}
