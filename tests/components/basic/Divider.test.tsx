/**
 * Divider Component Test
 * 分割线组件测试
 * @module tests/components/basic/Divider
 *
 * Requirements: 16.8
 */

import React from 'react';
import { render } from '@testing-library/react';
import { Divider } from '../../../src/components/basic/Divider';
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

describe('Divider 分割线组件', () => {
  describe('基础渲染', () => {
    test('应该正确渲染 Divider 组件', () => {
      const { container } = renderWithTheme(<Divider />);
      expect(container.firstChild).toBeInTheDocument();
    });

    test('应该支持 children 作为文本', () => {
      const { container } = renderWithTheme(<Divider>分割线文本</Divider>);
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  describe('方向属性', () => {
    test('应该支持 horizontal 方向', () => {
      const { container } = renderWithTheme(<Divider direction="horizontal" />);
      expect(container.firstChild).toBeInTheDocument();
    });

    test('应该支持 vertical 方向', () => {
      const { container } = renderWithTheme(<Divider direction="vertical" />);
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  describe('位置属性', () => {
    test('应该支持 left 位置', () => {
      const { container } = renderWithTheme(<Divider position="left">文本</Divider>);
      expect(container.firstChild).toBeInTheDocument();
    });

    test('应该支持 center 位置', () => {
      const { container } = renderWithTheme(<Divider position="center">文本</Divider>);
      expect(container.firstChild).toBeInTheDocument();
    });

    test('应该支持 right 位置', () => {
      const { container } = renderWithTheme(<Divider position="right">文本</Divider>);
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  describe('样式属性', () => {
    test('应该支持 dashed 样式', () => {
      const { container } = renderWithTheme(<Divider variant="dashed" />);
      expect(container.firstChild).toBeInTheDocument();
    });

    test('应该支持 dotted 样式', () => {
      const { container } = renderWithTheme(<Divider variant="dotted" />);
      expect(container.firstChild).toBeInTheDocument();
    });
  });
});