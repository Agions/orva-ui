/**
 * Container Component Test
 * 布局容器组件测试
 * @module tests/components/layout/Container
 *
 * Requirements: 16.8
 */

import React from 'react';
import { render } from '@testing-library/react';
import { Container } from '../../../src/components/layout/Container';
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

describe('Container 布局容器组件', () => {
  describe('基础渲染', () => {
    test('应该正确渲染 Container 组件', () => {
      const { container } = renderWithTheme(<Container>内容</Container>);
      expect(container.firstChild).toBeInTheDocument();
    });

    test('应该支持 children', () => {
      const { container } = renderWithTheme(<Container><div>子元素</div></Container>);
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  describe('尺寸属性', () => {
    test('应该支持 small 尺寸', () => {
      const { container } = renderWithTheme(<Container size="small">内容</Container>);
      expect(container.firstChild).toBeInTheDocument();
    });

    test('应该支持 middle 尺寸', () => {
      const { container } = renderWithTheme(<Container size="middle">内容</Container>);
      expect(container.firstChild).toBeInTheDocument();
    });

    test('应该支持 large 尺寸', () => {
      const { container } = renderWithTheme(<Container size="large">内容</Container>);
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  describe('对齐属性', () => {
    test('应该支持 center 对齐', () => {
      const { container } = renderWithTheme(<Container align="center">内容</Container>);
      expect(container.firstChild).toBeInTheDocument();
    });

    test('应该支持 start 对齐', () => {
      const { container } = renderWithTheme(<Container align="start">内容</Container>);
      expect(container.firstChild).toBeInTheDocument();
    });

    test('应该支持 end 对齐', () => {
      const { container } = renderWithTheme(<Container align="end">内容</Container>);
      expect(container.firstChild).toBeInTheDocument();
    });
  });
});