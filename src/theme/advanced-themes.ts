/**
 * 高级主题配置
 * 提供多种预设主题和自定义主题支持
 */

import { defaultTheme } from './defaults';
import { EXTENDED_COLORS } from './extended-tokens';

// 深色主题
export const DARK_THEME = {
  ...defaultTheme,
  name: 'dark',
  colors: {
    ...defaultTheme.colors,
    background: '#0a0a0a',
    foreground: '#ffffff',
    card: '#1a1a1a',
    cardForeground: '#ffffff',
    popover: '#1a1a1a',
    popoverForeground: '#ffffff',
    primary: '#c084fc',
    primaryForeground: '#000000',
    secondary: '#fb923c',
    secondaryForeground: '#000000',
    muted: '#2a2a2a',
    mutedForeground: '#a1a1aa',
    accent: '#27272a',
    accentForeground: '#ffffff',
    border: '#2a2a2a',
    input: '#2a2a2a',
    ring: '#c084fc'
  },
  shadows: {
    ...EXTENDED_COLORS.shadows,
    // 深色模式阴影调整
    'xs': '0 1px 2px 0 rgba(255, 255, 255, 0.05)',
    'sm': '0 1px 3px 0 rgba(255, 255, 255, 0.1), 0 1px 2px -1px rgba(255, 255, 255, 0.1)',
    'md': '0 4px 6px -1px rgba(255, 255, 255, 0.1), 0 2px 4px -2px rgba(255, 255, 255, 0.1)',
    'lg': '0 10px 15px -3px rgba(255, 255, 255, 0.1), 0 4px 6px -4px rgba(255, 255, 255, 0.1)',
    'xl': '0 20px 25px -5px rgba(255, 255, 255, 0.1), 0 8px 10px -6px rgba(255, 255, 255, 0.1)',
  }
};

// 高对比度主题
export const HIGH_CONTRAST_THEME = {
  ...defaultTheme,
  name: 'high-contrast',
  colors: {
    ...defaultTheme.colors,
    background: '#ffffff',
    foreground: '#000000',
    card: '#ffffff',
    cardForeground: '#000000',
    popover: '#ffffff',
    popoverForeground: '#000000',
    primary: '#000000',
    primaryForeground: '#ffffff',
    secondary: '#666666',
    secondaryForeground: '#ffffff',
    muted: '#e5e5e5',
    mutedForeground: '#000000',
    accent: '#000000',
    accentForeground: '#ffffff',
    border: '#000000',
    input: '#000000',
    ring: '#000000'
  },
  shadows: {
    ...EXTENDED_COLORS.shadows,
    // 高对比度阴影
    'xs': '0 1px 2px 0 rgba(0, 0, 0, 0.5)',
    'sm': '0 1px 3px 0 rgba(0, 0, 0, 0.5), 0 1px 2px -1px rgba(0, 0, 0, 0.5)',
    'md': '0 4px 6px -1px rgba(0, 0, 0, 0.5), 0 2px 4px -2px rgba(0, 0, 0, 0.5)',
    'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.5), 0 4px 6px -4px rgba(0, 0, 0, 0.5)',
  }
};

// 暖色调主题
export const WARM_THEME = {
  ...defaultTheme,
  name: 'warm',
  colors: {
    ...defaultTheme.colors,
    primary: '#f97316',
    primaryLight: '#fb923c',
    primaryDark: '#ea580c',
    secondary: '#fbbf24',
    secondaryLight: '#fcd34d',
    secondaryDark: '#f59e0b'
  }
};

// 冷色调主题
export const COOL_THEME = {
  ...defaultTheme,
  name: 'cool',
  colors: {
    ...defaultTheme.colors,
    primary: '#3b82f6',
    primaryLight: '#60a5fa',
    primaryDark: '#2563eb',
    secondary: '#06b6d4',
    secondaryLight: '#22d3ee',
    secondaryDark: '#0891b2'
  }
};

// 自然绿色主题
export const NATURE_THEME = {
  ...defaultTheme,
  name: 'nature',
  colors: {
    ...defaultTheme.colors,
    primary: '#16a34a',
    primaryLight: '#4ade80',
    primaryDark: '#15803d',
    secondary: '#84cc16',
    secondaryLight: '#a3e635',
    secondaryDark: '#65a30d',
    background: '#f0fdf4',
    foreground: '#14532d',
    card: '#ffffff',
    border: '#bbf7d0',
    muted: '#dcfce7',
    accent: '#22c55e'
  }
};

// 海洋蓝色主题
export const OCEAN_THEME = {
  ...defaultTheme,
  name: 'ocean',
  colors: {
    ...defaultTheme.colors,
    primary: '#0891b2',
    primaryLight: '#22d3ee',
    primaryDark: '#0e7490',
    secondary: '#3b82f6',
    secondaryLight: '#60a5fa',
    secondaryDark: '#2563eb',
    background: '#ecfeff',
    foreground: '#164e63',
    card: '#ffffff',
    border: '#a5f3fc',
    muted: '#cffafe',
    accent: '#06b6d4'
  }
};

// 主题列表
export const THEMES = {
  light: defaultTheme,
  dark: DARK_THEME,
  'high-contrast': HIGH_CONTRAST_THEME,
  warm: WARM_THEME,
  cool: COOL_THEME,
  nature: NATURE_THEME,
  ocean: OCEAN_THEME
} as const;

export type ThemeName = keyof typeof THEMES;

// 默认主题
export const defaultTheme_NAME = 'light' as ThemeName;
