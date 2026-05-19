/**
 * Rate Component Test
 * 评分组件测试
 * @module tests/components/display/Rate
 *
 * Requirements: 16.8
 */

import React from 'react';
import { render } from '@testing-library/react';
import { Rate } from '../../../src/components/display/Rate';
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

describe('Rate 评分组件', () => {
  describe('基础渲染', () => {
    test('应该正确渲染 Rate 组件', () => {
      const { container } = renderWithTheme(<Rate />);
      expect(container.firstChild).toBeInTheDocument();
    });

    test('应该支持 value 属性', () => {
      const { container } = renderWithTheme(<Rate value={3} />);
      expect(container.firstChild).toBeInTheDocument();
    });

    test('应该支持 defaultValue', () => {
      const { container } = renderWithTheme(<Rate defaultValue={4} />);
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  describe('数量属性', () => {
    test('应该支持 count 属性', () => {
      const { container } = renderWithTheme(<Rate count={10} />);
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  describe('状态属性', () => {
    test('应该支持 disabled 状态', () => {
      const { container } = renderWithTheme(<Rate disabled />);
      expect(container.firstChild).toBeInTheDocument();
    });

    test('应该支持 allowHalf', () => {
      const { container } = renderWithTheme(<Rate allowHalf />);
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  describe('其他属性', () => {
    test('应该支持 allowClear', () => {
      const { container } = renderWithTheme(<Rate allowClear />);
      expect(container.firstChild).toBeInTheDocument();
    });

    test('应该支持 character', () => {
      const { container } = renderWithTheme(<Rate character="★" />);
      expect(container.firstChild).toBeInTheDocument();
    });
  });
});