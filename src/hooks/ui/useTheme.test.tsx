/**
 * useTheme Hook 单元测试
 * @module hooks/ui/useTheme.test
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useTheme, ThemeProvider, useThemeSafe } from './useTheme';
import type { ThemeMode } from './useTheme';

describe('useTheme Hook', () => {
  // 清理 localStorage
  beforeEach(() => {
    localStorage.clear();
    // Mock document.documentElement
    Object.defineProperty(document, 'documentElement', {
      value: {
        classList: {
          add: vi.fn(),
          remove: vi.fn(),
        },
      },
      writable: true,
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  // ==================== 基础功能测试 ====================

  describe('基础功能', () => {
    it('应该返回默认主题', () => {
      const { result } = renderHook(() => useTheme());
      
      expect(result.current.mode).toBe('system');
      expect(result.current.theme).toBeDefined();
      expect(result.current.theme.colors.primary).toBe('#6366f1');
    });

    it('应该支持初始模式设置', () => {
      const { result } = renderHook(() => useTheme('dark'));
      
      expect(result.current.mode).toBe('dark');
    });
  });

  // ==================== 模式切换测试 ====================

  describe('模式切换', () => {
    it('应该切换主题模式', () => {
      const { result } = renderHook(() => useTheme('light'));
      
      act(() => {
        result.current.setMode('dark');
      });
      
      expect(result.current.mode).toBe('dark');
    });

    it('应该切换亮暗模式', () => {
      const { result } = renderHook(() => useTheme('light'));
      
      act(() => {
        result.current.toggleMode();
      });
      
      expect(result.current.resolvedMode).toBe('dark');
    });

    it('应该从 dark 切换回 light', () => {
      const { result } = renderHook(() => useTheme('dark'));
      
      act(() => {
        result.current.toggleMode();
      });
      
      expect(result.current.resolvedMode).toBe('light');
    });
  });

  // ==================== 系统偏好测试 ====================

  describe('系统偏好', () => {
    it('应该检测系统暗色模式偏好', () => {
      // Mock matchMedia
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: vi.fn().mockImplementation((query) => ({
          matches: query === '(prefers-color-scheme: dark)',
          media: query,
          onchange: null,
          addListener: vi.fn(),
          removeListener: vi.fn(),
          addEventListener: vi.fn(),
          removeEventListener: vi.fn(),
          dispatchEvent: vi.fn(),
        })),
      });

      const { result } = renderHook(() => useTheme('system'));
      
      expect(result.current.systemPreference).toBeDefined();
    });

    it('system 模式应该跟随系统偏好', () => {
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: vi.fn().mockImplementation((query) => ({
          matches: query === '(prefers-color-scheme: dark)',
          media: query,
          onchange: null,
          addListener: vi.fn(),
          removeListener: vi.fn(),
          addEventListener: vi.fn(),
          removeEventListener: vi.fn(),
          dispatchEvent: vi.fn(),
        })),
      });

      const { result } = renderHook(() => useTheme('system'));
      
      // resolvedMode 应该等于 systemPreference
      expect(result.current.resolvedMode).toBe(result.current.systemPreference);
    });
  });

  // ==================== isDark/isLight 测试 ====================

  describe('模式判断', () => {
    it('light 模式下 isLight 应该为 true', () => {
      const { result } = renderHook(() => useTheme('light'));
      
      expect(result.current.isLight).toBe(true);
      expect(result.current.isDark).toBe(false);
    });

    it('dark 模式下 isDark 应该为 true', () => {
      const { result } = renderHook(() => useTheme('dark'));
      
      expect(result.current.isDark).toBe(true);
      expect(result.current.isLight).toBe(false);
    });

    it('system 模式应该根据 resolvedMode 判断', () => {
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: vi.fn().mockImplementation((query) => ({
          matches: query === '(prefers-color-scheme: dark)',
          media: query,
          onchange: null,
          addListener: vi.fn(),
          removeListener: vi.fn(),
          addEventListener: vi.fn(),
          removeEventListener: vi.fn(),
          dispatchEvent: vi.fn(),
        })),
      });

      const { result } = renderHook(() => useTheme('system'));
      
      // 根据 mock，系统偏好为 dark
      expect(result.current.isDark).toBe(true);
    });
  });

  // ==================== ThemeProvider 测试 ====================

  describe('ThemeProvider', () => {
    it('应该提供主题上下文', () => {
      const { result } = renderHook(
        () => useThemeSafe(),
        {
          wrapper: ({ children }) => (
            <ThemeProvider>{children}</ThemeProvider>
          ),
        },
      );
      
      expect(result.current.theme).toBeDefined();
    });

    it('应该在未包裹时抛出错误', () => {
      expect(() => {
        renderHook(() => useThemeSafe());
      }).toThrow('useTheme must be used within a ThemeProvider');
    });

    it('应该支持自定义主题', () => {
      const customTheme = {
        colors: {
          primary: '#ff0000',
        },
      };

      const { result } = renderHook(
        () => useThemeSafe(),
        {
          wrapper: ({ children }) => (
            <ThemeProvider customTheme={customTheme}>
              {children}
            </ThemeProvider>
          ),
        },
      );
      
      expect(result.current.theme.colors.primary).toBe('#ff0000');
    });
  });

  // ==================== 持久化测试 ====================

  describe('持久化', () => {
    it('应该保存到 localStorage', () => {
      const { result } = renderHook(() => useTheme('light'));
      
      act(() => {
        result.current.setMode('dark');
      });
      
      expect(localStorage.getItem('orva-ui-theme-mode')).toBe('dark');
    });
  });

  // ==================== 主题配置测试 ====================

  describe('主题配置', () => {
    it('应该包含所有颜色', () => {
      const { result } = renderHook(() => useTheme());
      
      const colors = result.current.theme.colors;
      expect(colors).toHaveProperty('primary');
      expect(colors).toHaveProperty('secondary');
      expect(colors).toHaveProperty('success');
      expect(colors).toHaveProperty('warning');
      expect(colors).toHaveProperty('error');
      expect(colors).toHaveProperty('info');
    });

    it('应该包含所有间距', () => {
      const { result } = renderHook(() => useTheme());
      
      const spacing = result.current.theme.spacing;
      expect(spacing).toHaveProperty('xs');
      expect(spacing).toHaveProperty('sm');
      expect(spacing).toHaveProperty('md');
      expect(spacing).toHaveProperty('lg');
      expect(spacing).toHaveProperty('xl');
      expect(spacing).toHaveProperty('xxl');
    });

    it('应该包含所有排版配置', () => {
      const { result } = renderHook(() => useTheme());
      
      const typography = result.current.theme.typography;
      expect(typography.fontSize).toBeDefined();
      expect(typography.fontWeight).toBeDefined();
      expect(typography.lineHeight).toBeDefined();
    });
  });
});
