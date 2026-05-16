/**
 * 动态主题切换器
 * 提供运行时主题切换和持久化功能
 */

import React, { useState, useEffect } from 'react';
import { THEMES, ThemeName } from './advanced-themes';
import { createLogger } from '../utils/logger';

const logger = createLogger('Theme Switcher');

type ColorScheme = 'light' | 'dark' | 'auto';

export interface ThemeSwitcherConfig {
  defaultTheme?: ThemeName;
  enableSystem?: boolean;
  persistKey?: string;
  respectPrefersColorScheme?: boolean;
}

export interface ThemeState {
  theme: ThemeName;
  colorScheme: ColorScheme;
  isLoaded: boolean;
}

const SYSTEM_THEME_KEY = 'orva-ui-theme';

export function useThemeSwitcher(config: ThemeSwitcherConfig = {}) {
  const {
    defaultTheme = 'light',
    enableSystem = true,
    persistKey = SYSTEM_THEME_KEY,
    respectPrefersColorScheme = true
  } = config;

  const [themeState, setThemeState] = useState<ThemeState>({
    theme: defaultTheme,
    colorScheme: 'auto',
    isLoaded: false
  });

  // 获取当前系统主题
  const getSystemTheme = (): ThemeName => {
    if (!respectPrefersColorScheme || typeof window === 'undefined') {
      return defaultTheme;
    }

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    return mediaQuery.matches ? 'dark' : 'light';
  };

  // 保存主题到 localStorage
  const saveTheme = (newTheme: ThemeName, newColorScheme: ColorScheme = themeState.colorScheme) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(persistKey, JSON.stringify({
        theme: newTheme,
        colorScheme: newColorScheme,
        timestamp: Date.now()
      }));
    }
  };

  // 从 localStorage 读取主题
  const loadTheme = () => {
    if (typeof window === 'undefined') {
      setThemeState(prev => ({ ...prev, isLoaded: true }));
      return;
    }

    try {
      const saved = localStorage.getItem(persistKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        const theme = parsed.theme || defaultTheme;
        const colorScheme = parsed.colorScheme || 'auto';
        
        setThemeState({
          theme,
          colorScheme,
          isLoaded: true
        });
      } else {
        setThemeState(prev => ({ ...prev, isLoaded: true }));
      }
    } catch (error) {
      logger.warn('Failed to load theme from localStorage:', error);
      setThemeState(prev => ({ ...prev, isLoaded: true }));
    }
  };

  // 切换到指定主题
  const setTheme = (newTheme: ThemeName) => {
    setThemeState(prev => ({
      ...prev,
      theme: newTheme
    }));
    saveTheme(newTheme);
  };

  // 切换到指定配色方案
  const setColorScheme = (newColorScheme: ColorScheme) => {
    setThemeState(prev => ({
      ...prev,
      colorScheme: newColorScheme
    }));
    
    // 根据配色方案和当前主题计算最终主题
    let finalTheme: ThemeName;
    if (enableSystem && respectPrefersColorScheme && newColorScheme === 'auto') {
      finalTheme = getSystemTheme();
    } else if (newColorScheme === 'dark') {
      finalTheme = 'dark';
    } else {
      finalTheme = themeState.theme;
    }

    setTheme(finalTheme);
  };

  // 应用主题到 DOM
  const applyThemeToDOM = (themeName: ThemeName) => {
    if (typeof document === 'undefined') return;

    const theme = THEMES[themeName];
    const root = document.documentElement;

    // 设置 CSS 变量
    Object.entries(theme.colors).forEach(([key, value]) => {
      root.style.setProperty(`--${key}`, String(value));
    });

    // 设置主题类名
    Object.keys(THEMES).forEach(name => {
      if (name === themeName) {
        root.classList.add(`orva-ui-theme-${name}`);
      } else {
        root.classList.remove(`orva-ui-theme-${name}`);
      }
    });

    // 设置高对比度样式
    if (themeName === 'high-contrast') {
      const style = document.createElement('style');
      style.textContent = `
        .orva-ui-high-contrast {
          filter: contrast(1.5) brightness(1.2);
        }
        .orva-ui-high-contrast button,
        .orva-ui-high-contrast [role="button"] {
          border: 2px solid !important;
          outline: 3px solid !important;
        }
        .orva-ui-high-contrast:focus {
          outline: 3px solid #000 !important;
          outline-offset: 2px !important;
        }
      `;
      document.head.appendChild(style);
    }
  };

  // 初始化主题
  useEffect(() => {
    loadTheme();
  }, []);

  // 当主题状态变化时应用主题
  useEffect(() => {
    if (themeState.isLoaded) {
      applyThemeToDOM(themeState.theme);
    }
  }, [themeState.theme, themeState.isLoaded]);

  // 监听系统主题变化
  useEffect(() => {
    if (!enableSystem || !respectPrefersColorScheme) return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = () => {
      if (themeState.colorScheme === 'auto') {
        const systemTheme = getSystemTheme();
        applyThemeToDOM(systemTheme);
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [themeState.colorScheme, enableSystem, respectPrefersColorScheme]);

  return {
    theme: themeState.theme,
    colorScheme: themeState.colorScheme,
    isLoaded: themeState.isLoaded,
    setTheme,
    setColorScheme,
    availableThemes: Object.keys(THEMES) as ThemeName[],
    currentTheme: THEMES[themeState.theme]
  };
}

// 主题上下文提供者
export const ThemeContext = React.createContext<ReturnType<typeof useThemeSwitcher> | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode; config?: ThemeSwitcherConfig }> = ({ 
  children, 
  config 
}) => {
  const themeValue = useThemeSwitcher(config);

  return (
    <ThemeContext.Provider value={themeValue}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = React.useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
