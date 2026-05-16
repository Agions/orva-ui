/**
 * 响应式工具 - 重新导出 responsiveUtils + 测试兼容层
 */

// 从 responsiveUtils 重新导出
export {
  getPlatform,
  isMobile,
  isTablet,
  isDesktop,
  getSafeArea,
  getStatusBarHeight,
  getNavigationBarHeight,
  getMenuButtonBoundingClientRect,
  useResponsive,
} from './responsiveUtils';

// 测试兼容的 getResponsiveValue — 支持按断点名称或宽度值查找
export function getResponsiveValue<T>(
  values: Partial<Record<string, T>>,
  breakpointOrWidth: string | number,
): T | undefined {
  if (typeof breakpointOrWidth === 'string') {
    return values[breakpointOrWidth];
  }
  const width = breakpointOrWidth;
  let currentBp = 'xs';
  if (width >= 1536) currentBp = '2xl';
  else if (width >= 1280) currentBp = 'xl';
  else if (width >= 1024) currentBp = 'lg';
  else if (width >= 768) currentBp = 'md';
  else if (width >= 640) currentBp = 'sm';
  return values[currentBp];
}

/** 获取断点值（px） */
export function getBreakpoint(breakpoint: string): number {
  const breakpoints: Record<string, number> = {
    xs: 0, sm: 640, md: 768, lg: 1024, xl: 1280, '2xl': 1536,
  };
  return breakpoints[breakpoint] ?? 0;
}

/** 检查宽度是否匹配断点
 * 语义：width 所在的断点区间是否等于 breakpoint
 * 断点区间：xs[0,640) sm[640,768) md[768,1024) lg[1024,1280) xl[1280,1536) 2xl[1536,∞)
 */
export function isBreakpoint(width: number, breakpoint: string): boolean {
  let actualBp = 'xs';
  if (width >= 1536) actualBp = '2xl';
  else if (width >= 1280) actualBp = 'xl';
  else if (width >= 1024) actualBp = 'lg';
  else if (width >= 768) actualBp = 'md';
  else if (width >= 640) actualBp = 'sm';
  return actualBp === breakpoint;
}

/** 获取容器宽度 */
export function getContainerWidth(breakpoint: string): number {
  return getBreakpoint(breakpoint);
}

/** 获取容器样式 */
export function getContainerStyle(breakpoint: string): Record<string, string> {
  const width = getContainerWidth(breakpoint);
  return {
    maxWidth: `${width}px`,
    width: '100%',
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingLeft: '16px',
    paddingRight: '16px',
  };
}

/** 获取响应式内边距 */
export function getResponsivePadding(values: Record<string, number>, breakpoint: string): number {
  return values[breakpoint] ?? values['xs'] ?? 0;
}

/** 获取响应式外边距 */
export function getResponsiveMargin(values: Record<string, number>, breakpoint: string): number {
  return values[breakpoint] ?? values['xs'] ?? 0;
}

/** 获取响应式字体大小 */
export function getResponsiveFontSize(values: Record<string, number>, breakpoint: string): number {
  return values[breakpoint] ?? values['xs'] ?? 14;
}

/** 获取响应式行高 */
export function getResponsiveLineHeight(values: Record<string, number>, breakpoint: string): number {
  return values[breakpoint] ?? values['xs'] ?? 1.5;
}
