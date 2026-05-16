/**
 * useEventListener Hook
 * Simplified event listener management with automatic cleanup
 *
 * @example
 * ```typescript
 * const handleResize = (event: Event) => {
 *   logger.info('Window resized:', window.innerWidth, window.innerHeight);
 * };
 *
 * useEventListener('resize', handleResize, window);
 * ```
 */

import { useEffect, useRef } from 'react';
import { createLogger } from '../../utils/logger';

/**
 * Hook for simplified event listener management with automatic cleanup.
 * Supports Window, Document, and HTMLElement event targets with full type safety.
 *
 * @example
 * ```typescript
 * const handleResize = (event: Event) => {
 *   logger.info('Window resized:', window.innerWidth, window.innerHeight);
 * };
 *
 * useEventListener('resize', handleResize, window);
 * ```
 *
 * @overload Window events
 * @param eventName - The window event name (e.g., 'resize', 'scroll')
 * @param handler - Event handler function
 * @param element - Target window (defaults to global window)
 * @param options - Event listener options
 *
 * @overload Document events
 * @param eventName - The document event name (e.g., 'click', 'keydown')
 * @param handler - Event handler function
 * @param element - Target document (defaults to global document)
 * @param options - Event listener options
 *
 * @overload HTMLElement events
 * @param eventName - The element event name (e.g., 'focus', 'blur')
 * @param handler - Event handler function
 * @param element - Target HTML element
 * @param options - Event listener options
 */
const logger = createLogger('use Event Listener');

export function useEventListener<K extends keyof WindowEventMap>(
  eventName: K,
  handler: (event: WindowEventMap[K]) => void,
  element?: Window,
  options?: boolean | AddEventListenerOptions,
): void;

export function useEventListener<K extends keyof DocumentEventMap>(
  eventName: K,
  handler: (event: DocumentEventMap[K]) => void,
  element?: Document,
  options?: boolean | AddEventListenerOptions,
): void;

export function useEventListener<K extends keyof HTMLElementEventMap, T extends HTMLElement>(
  eventName: K,
  handler: (event: HTMLElementEventMap[K]) => void,
  element?: T,
  options?: boolean | AddEventListenerOptions,
): void;

export function useEventListener<K extends string, T extends HTMLElement | Document | Window = Window>(
  eventName: K,
  handler: (event: Event) => void,
  element?: T,
  options?: boolean | AddEventListenerOptions,
): void {
  // Create a ref to store the event handler
  const savedHandler = useRef<(event: Event) => void>(null);

  // Update the ref when the handler changes
  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    // Default to window if no element is provided
    const targetElement = element || window;

    // Check if targetElement supports addEventListener
    if (!targetElement || !targetElement.addEventListener) {
      return;
    }

    // Create event listener that calls the ref's current value
    const eventListener = (event: Event) => {
      savedHandler.current?.(event);
    };

    // Add event listener
    targetElement.addEventListener(eventName, eventListener, options);

    // Clean up event listener on unmount or when dependencies change
    return () => {
      targetElement.removeEventListener(eventName, eventListener, options);
    };
  }, [eventName, element, options]);
}
