/**
 * Hooks 模块统一导出
 * @module hooks
 */

// UI Hooks
export { useTheme } from './ui/useTheme';
export { useAccessibility, ARIA_ROLES, ARIA_STATES, KEY_CODES } from './ui/useAccessibility';
export { useInteractionState } from './ui/useInteractionState';
export { useMicroAnimation } from './ui/useMicroAnimation';
export { useStyle } from './ui/useStyle';
export { useResponsive } from './ui/useResponsive';
export { useDynamicTheme } from './ui/useDynamicTheme';
export { useLazyLoad } from './ui/useLazyLoad';
export { useVirtualList } from './ui/useVirtualList';
export { useVirtualScroll } from './ui/useVirtualScroll';
export { useMediaQuery, useIsMobile, useIsTablet, useIsDesktop } from './ui/useMediaQuery';
export { usePlatform, useIsH5, useIsMiniProgram, useIsReactNative, useIsHarmony } from './ui/usePlatform';

// DOM Hooks
export { useClickOutside } from './dom/useClickOutside';
export { useEventListener } from './dom/useEventListener';
export { useDebounce as useDebounceHandler, useThrottle as useThrottleHandler, useClickHandler, useLongPress } from './dom/useEventHandling';

// State Hooks
export { useLocalStorage, useSessionStorage } from './state/useStorage';
export { useToggle } from './state/useToggle';
export { usePrevious } from './state/usePrevious';
export { useBoolean } from './state/useBoolean';
export { useCounter } from './state/useCounter';

// Effect Hooks
export { useDebounce, useDebouncedCallback } from './effect/useDebounce';
export { useThrottle, useThrottledCallback } from './effect/useThrottle';
export { useDeepCompareEffect } from './effect/useDeepCompareEffect';
export { useMemoizedFunction, useComputedCache, useVirtualList as useVirtualListEffect, useLazyLoad as useLazyLoadEffect } from './effect/usePerformance';

// Async Hooks
export { useRequest } from './async/useRequest';
export { useMutation } from './async/useMutation';

// Lifecycle Hooks
export { useMount } from './lifecycle/useMount';
export { useUnmount } from './lifecycle/useUnmount';
