/**
 * 动态主题Hook
 * 提供运行时主题定制和主题管理功能
 */

import { useMemo, useCallback, useReducer } from 'react';
import type { ThemeConfig } from '@/theme/types';
import { defaultDesignTokens } from '@/theme/defaults';

export interface DynamicThemeOptions {
  /**
   * 基础主题配置
   */
  baseTheme?: Partial<ThemeConfig>;
  /**
   * 自定义颜色覆盖
   */
  colorOverrides?: Record<string, string>;
  /**
   * 自定义间距覆盖
   */
  spacingOverrides?: Partial<Record<keyof ThemeConfig['spacing'], number | string>>;
  /**
   * 自定义字体覆盖
   */
  typographyOverrides?: Partial<Record<keyof ThemeConfig['typography'], any>>;
}

export interface UseDynamicThemeReturn {
  /** 合并后的主题 */
  theme: ThemeConfig;
  /** 应用主题变化 — 深度合并到当前主题 */
  applyTheme: (updates: Partial<ThemeConfig>) => void;
  /** 重置为主题默认值（恢复为初始 options 对应的主题） */
  resetTheme: () => void;
  /** 生成 CSS 变量字符串 */
  generateCSSVariables: () => string;
  /** 导出主题配置为 JSON */
  exportTheme: () => string;
}

/** 深度合并工具 */
function deepMerge<T extends Record<string, any>>(target: T, source: Partial<T>): T {
  const result = { ...target };
  for (const key of Object.keys(source) as Array<keyof T>) {
    const val = source[key];
    if (val && typeof val === 'object' && !Array.isArray(val) && typeof result[key] === 'object') {
      result[key] = deepMerge(result[key] as any, val as any) as T[keyof T];
    } else if (val !== undefined) {
      result[key] = val as T[keyof T];
    }
  }
  return result;
}

/** 从 options 构建初始主题 */
function buildTheme(options: Required<DynamicThemeOptions>): ThemeConfig {
  const { baseTheme, colorOverrides, spacingOverrides, typographyOverrides } = options;
  return {
    ...defaultDesignTokens,
    ...baseTheme,
    colors: { ...defaultDesignTokens.colors, ...baseTheme.colors, ...colorOverrides },
    spacing: { ...defaultDesignTokens.spacing, ...baseTheme.spacing, ...spacingOverrides } as ThemeConfig['spacing'],
    typography: { ...defaultDesignTokens.typography, ...baseTheme.typography, ...typographyOverrides } as ThemeConfig['typography'],
    borderRadius: { ...defaultDesignTokens.effects.borderRadius },
    shadow: { ...defaultDesignTokens.effects.boxShadow, ...baseTheme.shadow },
  } as any as ThemeConfig;
}

export function useDynamicTheme(options: DynamicThemeOptions = {}): UseDynamicThemeReturn {
  const { baseTheme = {}, colorOverrides = {}, spacingOverrides = {}, typographyOverrides = {} } = options;

  const initialTheme = useMemo(
    () => buildTheme({ baseTheme, colorOverrides, spacingOverrides, typographyOverrides }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const [theme, dispatch] = useReducer(
    (state: ThemeConfig, action: { type: 'apply' | 'reset'; payload?: Partial<ThemeConfig> }) => {
      switch (action.type) {
        case 'apply':
          return action.payload ? deepMerge(state, action.payload) : state;
        case 'reset':
          return initialTheme;
        default:
          return state;
      }
    },
    initialTheme,
  );

  const applyTheme = useCallback((updates: Partial<ThemeConfig>) => {
    dispatch({ type: 'apply', payload: updates });
  }, []);

  const resetTheme = useCallback(() => {
    dispatch({ type: 'reset' });
  }, []);

  // 生成CSS变量
  const generateCSSVariables = useCallback((): string => {
    const { colors, spacing, borderRadius, typography } = theme;
    return [
      ':root {',
      '  /* Colors */',
      `  --color-primary: ${colors.primary};`,
      `  --color-secondary: ${colors.secondary};`,
      `  --color-success: ${colors.success};`,
      `  --color-warning: ${colors.warning};`,
      `  --color-error: ${colors.error};`,
      `  --color-info: ${colors.info};`,
      `  --color-background: ${colors.background};`,
      `  --color-text: ${colors.text};`,
      `  --color-text-secondary: ${colors.textSecondary};`,
      `  --color-border: ${colors.border};`,
      `  --color-divider: ${colors.divider};`,
      '  /* Spacing */',
      `  --spacing-xs: ${spacing.xs}px;`,
      `  --spacing-sm: ${spacing.sm}px;`,
      `  --spacing-md: ${spacing.md}px;`,
      `  --spacing-lg: ${spacing.lg}px;`,
      `  --spacing-xl: ${spacing.xl}px;`,
      '  /* Border Radius */',
      `  --radius-sm: ${borderRadius.sm}px;`,
      `  --radius-md: ${borderRadius.md}px;`,
      `  --radius-lg: ${borderRadius.lg}px;`,
      `  --radius-full: ${borderRadius.full}px;`,
      '  /* Typography */',
      `  --font-size-xs: ${typography.fontSize.xs}px;`,
      `  --font-size-sm: ${typography.fontSize.sm}px;`,
      `  --font-size-base: ${typography.fontSize.base}px;`,
      `  --font-size-lg: ${typography.fontSize.lg}px;`,
      `  --font-size-xl: ${typography.fontSize.xl}px;`,
      `  --font-weight-normal: ${typography.fontWeight.normal};`,
      `  --font-weight-medium: ${typography.fontWeight.medium};`,
      `  --font-weight-bold: ${typography.fontWeight.bold};`,
      '}',
    ].join('\n');
  }, [theme]);

  // 导出主题配置
  const exportTheme = useCallback((): string => {
    return JSON.stringify(theme, null, 2);
  }, [theme]);

  return { theme, applyTheme, resetTheme, generateCSSVariables, exportTheme };
}

// 预设的主题变体
export const THEME_VARIANTS = {
  light: {
    colors: {
      primary: '#a855f7',
      secondary: '#f97316',
      background: '#ffffff',
      surface: '#f8fafc',
      text: '#1e293b',
    },
  },
  dark: {
    colors: {
      primary: '#a855f7',
      secondary: '#f97316',
      background: '#0f172a',
      surface: '#1e293b',
      text: '#f1f5f9',
    },
  },
  corporate: {
    colors: {
      primary: '#1e40af',
      secondary: '#059669',
      success: '#059669',
      warning: '#d97706',
      error: '#dc2626',
    },
  },
  minimal: {
    colors: {
      primary: '#374151',
      secondary: '#6b7280',
      background: '#ffffff',
      surface: '#f9fafb',
      text: '#111827',
    },
  },
} as const;

export default useDynamicTheme;
