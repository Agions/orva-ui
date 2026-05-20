/**
 * 主题 Hook - 增强版
 * 支持暗色模式、CSS 变量主题切换、自定义主题
 * @module hooks/ui/useTheme
 * @description 类型安全的主题管理系统，支持 React 18 严格模式
 */

import { useState, useCallback, useEffect, useMemo, createContext, useContext, type RefObject, type ReactElement } from 'react';

// ==================== 类型定义 ====================

/** 主题模式 */
export type ThemeMode = 'light' | 'dark' | 'system';

/** 解析后的主题模式 */
export type ResolvedThemeMode = 'light' | 'dark';

/** 主题色板 */
export interface ThemeColor {
  primary: string;
  secondary: string;
  success: string;
  warning: string;
  error: string;
  info: string;
  default: string;
  text: string;
  textSecondary: string;
  textMuted: string;
  textDisabled: string;
  textInverse: string;
  background: string;
  backgroundSecondary: string;
  backgroundCard: string;
  backgroundInput: string;
  backgroundMask: string;
  backgroundDisabled: string;
  surface: string;
  border: string;
  borderLight: string;
  borderFocus: string;
  shadow: string;
  shadowLight: string;
  brand: string;
  accent: string;
  link: string;
  divider: string;
}

/** 主题间距 */
export interface ThemeSpacing {
  xs: string | number;
  sm: string | number;
  md: string | number;
  lg: string | number;
  xl: string | number;
  xxl: string | number;
  breakpoints: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    xxl: number;
  };
}

/** 主题排版 */
export interface ThemeTypography {
  fontSize: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    xxl: string;
  };
  fontWeight: {
    light: number;
    normal: number;
    medium: number;
    semibold: number;
    bold: number;
  };
  lineHeight: {
    tight: number;
    normal: number;
    relaxed: number;
  };
  letterSpacing: {
    tight: string;
    normal: string;
    wide: string;
  };
}

/** 主题圆角 */
export interface ThemeBorderRadius {
  none: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  full: string;
}

/** 主题阴影 */
export interface ThemeShadow {
  none: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  inner: string;
}

/** 主题层级 */
export interface ThemeZIndex {
  dropdown: number;
  sticky: number;
  fixed: number;
  modalBackDrop: number;
  modal: number;
  tooltip: number;
  notification: number;
  popover: number;
}

/** 主题过渡 */
export interface ThemeTransitions {
  fast: string;
  normal: string;
  slow: string;
  entrance: string;
  exit: string;
}

/** 主题配置 */
export interface ThemeConfig {
  mode: ThemeMode;
  colors: ThemeColor;
  spacing: ThemeSpacing;
  typography: ThemeTypography;
  borderRadius: ThemeBorderRadius;
  shadows: ThemeShadow;
  zIndex: ThemeZIndex;
  transitions: ThemeTransitions;
}

/** useTheme 返回值 */
export interface UseThemeReturn {
  mode: ThemeMode;
  resolvedMode: ResolvedThemeMode;
  theme: ThemeConfig;
  colors: ThemeColor;
  setMode: (mode: ThemeMode) => void;
  toggleMode: () => void;
  isDark: boolean;
  isLight: boolean;
  systemPreference: ResolvedThemeMode;
}

/** ThemeProvider 属性 */
export interface ThemeProviderProps {
  children: React.ReactNode;
  initialMode?: ThemeMode;
  customTheme?: Partial<ThemeConfig>;
}

/** 样式计算返回值 */
export interface UseStyleReturn {
  className: string;
  style: React.CSSProperties;
}

/** 类名值类型 */
export type ClassNameValue = string | undefined | null | false;

/** 样式值类型 */
export type StyleValue = React.CSSProperties | undefined | null;

// ==================== 默认主题 ====================

const DEFAULT_LIGHT_THEME: ThemeConfig = {
  mode: 'light',
  colors: {
    primary: '#6366f1',
    secondary: '#8b5cf6',
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#3b82f6',
    text: '#1f2937',
    textSecondary: '#6b7280',
    textMuted: '#9ca3af',
    background: '#ffffff',
    backgroundSecondary: '#f9fafb',
    border: '#e5e7eb',
  } as any,
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    xxl: '3rem',
    breakpoints: {
      xs: 480,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536,
    },
  },
  typography: {
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      md: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      xxl: '1.5rem',
    },
    fontWeight: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
    lineHeight: {
      tight: 1.25,
      normal: 1.5,
      relaxed: 1.75,
    },
    letterSpacing: {
      tight: '-0.025em',
      normal: '0em',
      wide: '0.025em',
    },
  },
  borderRadius: {
    none: '0',
    sm: '0.125rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    full: '9999px',
  },
  shadows: {
    none: 'none',
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
  },
  zIndex: {
    dropdown: 1000,
    sticky: 1020,
    fixed: 1030,
    modalBackDrop: 1040,
    modal: 1050,
    tooltip: 1060,
    notification: 1070,
    popover: 1080,
  },
  transitions: {
    fast: '150ms ease',
    normal: '250ms ease',
    slow: '350ms ease',
    entrance: '300ms ease-out',
    exit: '200ms ease-in',
  },
};

const DARK_THEME_OVERRIDE: Partial<ThemeConfig> = {
  colors: {
    primary: '#818cf8',
    secondary: '#a78bfa',
    success: '#34d399',
    warning: '#fbbf24',
    error: '#f87171',
    info: '#60a5fa',
    text: '#f9fafb',
    textSecondary: '#d1d5db',
    textMuted: '#9ca3af',
    background: '#111827',
    backgroundSecondary: '#1f2937',
    border: '#374151',
  } as any,
};

// ==================== 上下文 ====================

export const ThemeContext = createContext<UseThemeReturn | null>(null);

// ==================== Hook 实现 ====================

/**
 * 主题 Hook
 */
export function useTheme(initialMode: ThemeMode = 'system'): UseThemeReturn {
  const [mode, setModeState] = useState<ThemeMode>(initialMode);
  const [systemPreference, setSystemPreference] = useState<ResolvedThemeMode>('light');

  // 监听系统主题变化
  useEffect(() => {
    if (!window.matchMedia) return;
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Fallback: 如果 matchMedia 返回 undefined，使用默认值
    if (!mediaQuery) {
      setSystemPreference('light');
      return;
    }
    
    const handleChange = (event: MediaQueryListEvent) => {
      setSystemPreference(event.matches ? 'dark' : 'light');
    };

    // 初始值
    setSystemPreference(mediaQuery.matches ? 'dark' : 'light');

    // 监听变化
    mediaQuery.addEventListener('change', handleChange);
    
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  const resolvedMode = useMemo((): ResolvedThemeMode => {
    if (mode === 'system') {
      return systemPreference;
    }
    return mode;
  }, [mode, systemPreference]);

  const theme = useMemo((): ThemeConfig => {
    const base = { ...DEFAULT_LIGHT_THEME, mode };
    
    if (resolvedMode === 'dark') {
      return {
        ...base,
        colors: {
          ...base.colors,
          ...DARK_THEME_OVERRIDE.colors!,
        },
      };
    }
    
    return base;
  }, [mode, resolvedMode]);

  const isDark = resolvedMode === 'dark';
  const isLight = resolvedMode === 'light';

  const setMode = useCallback((newMode: ThemeMode) => {
    setModeState(newMode);
    
    try {
      localStorage.setItem('orva-ui-theme-mode', newMode);
    } catch (e) {
      // localStorage 不可用时忽略
    }
    
    // 更新 DOM
    if (typeof document !== 'undefined') {
      const root = document.documentElement;
      if (newMode === 'dark' || (newMode === 'system' && systemPreference === 'dark')) {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    }
  }, [systemPreference]);

  const toggleMode = useCallback(() => {
    setMode(resolvedMode === 'dark' ? 'light' : 'dark');
  }, [resolvedMode, setMode]);

  return {
    mode,
    resolvedMode,
    theme,
    colors: theme.colors,
    setMode,
    toggleMode,
    isDark,
    isLight,
    systemPreference,
  };
}

/**
 * ThemeProvider 组件
 */
export function ThemeProvider({
  children,
  initialMode = 'system',
  customTheme,
}: ThemeProviderProps): ReactElement {
  const themeReturn = useTheme(initialMode);

  // 应用自定义主题
  const theme = useMemo(() => {
    if (!customTheme) return themeReturn.theme;
    return {
      ...themeReturn.theme,
      ...customTheme,
      colors: {
        ...themeReturn.theme.colors,
        ...customTheme.colors,
      },
    };
  }, [themeReturn.theme, customTheme]);

  const value = useMemo(() => ({
    ...themeReturn,
    theme,
    colors: theme.colors,
  }), [themeReturn, theme]);

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

/**
 * 使用主题（带类型检查）
 */
export function useThemeSafe(): UseThemeReturn {
  const context = useContext(ThemeContext);
  
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  
  return context;
}

/**
 * 获取主题颜色
 */
export function useThemeColor(
  colorName: keyof ThemeColor,
  fallback?: string,
): string {
  const { theme } = useThemeSafe();
  return theme.colors[colorName] || fallback || '';
}

/**
 * 获取主题间距
 */
export function useThemeSpacing(
  spacingName: keyof ThemeSpacing,
): string | number {
  const { theme } = useThemeSafe();
  return theme.spacing[spacingName] as string | number;
}

/**
 * 获取主题字体大小
 */
export function useThemeFontSize(
  sizeName: keyof ThemeTypography['fontSize'],
): string {
  const { theme } = useThemeSafe();
  return theme.typography.fontSize[sizeName];
}

/**
 * 检查是否为暗色模式
 */
export function useIsDarkMode(): boolean {
  const { isDark } = useThemeSafe();
  return isDark;
}

/**
 * 检查是否为亮色模式
 */
export function useIsLightMode(): boolean {
  const { isLight } = useThemeSafe();
  return isLight;
}

// ==================== 导出 ====================

// Types are already exported above via export type/interface declarations
