/**
 * UI 相关 Hooks 统一导出
 * @module hooks/ui
 */

export { useTheme, ThemeContext, ThemeProvider } from './useTheme';
export type { ThemeMode, ThemeConfig, UseThemeReturn, ThemeProviderProps } from './useTheme';

export { useAccessibility, ARIA_ROLES, ARIA_STATES } from './useAccessibility';
export type { AccessibilityProps, UseAccessibilityReturn } from './useAccessibility';

export { useVirtualList } from './useVirtualList';
export type { VirtualListItem, UseVirtualListOptions, UseVirtualListReturn } from './useVirtualList';

export { useLazyLoad, useLazyImage } from './useLazyLoad';
export type { LazyLoadOptions, UseLazyLoadReturn } from './useLazyLoad';

export { useStyle } from './useStyle';
export type {
  UseStyleReturn,
  ClassNameValue,
  StyleValue,
  ResponsiveBreakpoints,
  InteractionStyles,
  TransformConfig,
  GradientConfig,
  ShadowConfig,
} from './useStyle';

export {
  usePlatform,
  useIsH5,
  useIsMiniProgram,
  useIsReactNative,
  useIsHarmony,
} from './usePlatform';
export type { UsePlatformReturn } from './usePlatform';

export { useResponsive, useMediaQuery, DEFAULT_BREAKPOINTS } from './useResponsive';
export type {
  Breakpoint,
  ScreenSize,
  UseResponsiveReturn,
  UseResponsiveOptions,
} from './useResponsive';

export {
  useMediaQuery as useMediaQueryHook,
  useIsMobile,
  useIsTablet,
  useIsDesktop,
  usePrefersDarkMode,
  usePrefersReducedMotion,
} from './useMediaQuery';

export { useVirtualScroll } from './useVirtualScroll';
export type { VirtualScrollItem, VirtualScrollOptions, VirtualScrollResult } from './useVirtualScroll';

export { useInteractionState } from './useInteractionState';
export type {
  InteractionState,
  InteractionHandlers,
  UseInteractionStateOptions,
} from './useInteractionState';
