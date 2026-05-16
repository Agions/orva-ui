/**
 * Utils 模块统一导出
 * @module utils
 */

// 性能工具
export { debounce, throttle, useDebounce, useThrottle, useMemoizedFn, useDeepMemo, useVirtualList } from './performance';

// 组件工厂
export { createComponent, isOrvaUIComponent, createBEM, getAllRegisteredComponents, registerComponent, getRegisteredComponent, createCompoundComponent } from './createComponent';

// 样式工具
export { cn } from './classnames';

// 平台检测
export { getPlatformType, detectPlatform, detectPlatformType, isPlatform, isMiniProgram, isH5, isRN, isHarmony } from './platform';

// 环境检测
export { isBrowserEnvironment, isTaroEnvironment, resolvePlatform, safeMatchMedia } from './environment';

// 响应式工具
export { getBreakpoint, isBreakpoint, getResponsiveValue, getPlatform, isMobile, isTablet, isDesktop, getSafeArea, getStatusBarHeight, getNavigationBarHeight, getMenuButtonBoundingClientRect, useResponsive } from './responsive';

// 函数工具
export { memoize, curry, compose, pipe, once, partial } from './function';

// 命名空间（createBEM 已在上方 createComponent 导出，此处仅补充 createNamespace）
export { createNamespace } from './createComponent';
