/**
 * Layout Component Test
 * 布局容器组件测试
 * @module tests/components/layout/Layout
 *
 * Requirements: 16.8
 */

import React from 'react';
import { render } from '@testing-library/react';
import { Layout } from '../../../src/components/layout/Layout';
import { describe, test, expect, vi } from 'vitest';
import { ThemeContext } from '../../../src/hooks/ui/useTheme';
import { defaultTheme } from '../../../src/theme/defaults';
import type { ThemeContextType } from '../../../src/hooks/ui/useTheme';

const createMockThemeContext = (): ThemeContextType => ({
  theme: defaultTheme,
  themeMode: 'light',
  isDark: false,
  isSystemDark: false,
  setThemeMode: vi.fn(),
  toggleTheme: vi.fn(),
  setCustomTheme: vi.fn(),
  resetTheme: vi.fn(),
  exportTheme: () => JSON.stringify({ mode: 'light', custom: null }),
  importTheme: () => false,
  getThemeValue: <T,>(path: string): T | undefined => {
    const keys = path.split('.');
    let value: unknown = defaultTheme;
    for (const key of keys) {
      value = (value as Record<string, unknown>)?.[key];
    }
    return value as T | undefined;
  },
  generateThemeCSS: () => '',
});

const TestWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ThemeContext.Provider value={createMockThemeContext()}>
    {children}
  </ThemeContext.Provider>
);

const renderWithTheme = (ui: React.ReactElement) => {
  return render(ui, { wrapper: TestWrapper });
};

describe('Layout 布局容器组件', () => {
  describe('基础渲染', () => {
    test('应该正确渲染 Layout 组件', () => {
      const { container } = renderWithTheme(<Layout><div>内容</div></Layout>);
      expect(container.firstChild).toBeInTheDocument();
    });

    test('应该支持自定义 className', () => {
      const { container } = renderWithTheme(<Layout className="custom-class"><div>内容</div></Layout>);
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  describe('布局属性', () => {
    test('应该支持 hasSider 属性', () => {
      const { container } = renderWithTheme(<Layout hasSider><div>内容</div></Layout>);
      expect(container.firstChild).toBeInTheDocument();
    });
  });
});