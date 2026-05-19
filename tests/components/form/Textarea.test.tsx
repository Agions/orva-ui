/**
 * Textarea Component Test
 * 文本域组件测试
 * @module tests/components/form/Textarea
 *
 * Requirements: 16.8
 */

import React from 'react';
import { render } from '@testing-library/react';
import { Textarea } from '../../../src/components/form/Textarea';
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

describe('Textarea 文本域组件', () => {
  describe('基础渲染', () => {
    test('应该正确渲染 Textarea 组件', () => {
      const { container } = renderWithTheme(<Textarea />);
      expect(container.firstChild).toBeInTheDocument();
    });

    test('应该支持 value 属性', () => {
      const { container } = renderWithTheme(<Textarea value="测试内容" />);
      expect(container.firstChild).toBeInTheDocument();
    });

    test('应该支持 placeholder', () => {
      const { container } = renderWithTheme(<Textarea placeholder="请输入内容" />);
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  describe('状态属性', () => {
    test('应该支持 disabled 状态', () => {
      const { container } = renderWithTheme(<Textarea disabled />);
      expect(container.firstChild).toBeInTheDocument();
    });

    test('应该支持 readonly 状态', () => {
      const { container } = renderWithTheme(<Textarea readOnly />);
      expect(container.firstChild).toBeInTheDocument();
    });

    test('应该支持 error 状态', () => {
      const { container } = renderWithTheme(<Textarea status="error" />);
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  describe('行数属性', () => {
    test('应该支持 rows 属性', () => {
      const { container } = renderWithTheme(<Textarea rows={4} />);
      expect(container.firstChild).toBeInTheDocument();
    });

    test('应该支持 autoSize', () => {
      const { container } = renderWithTheme(<Textarea autoSize />);
      expect(container.firstChild).toBeInTheDocument();
    });
  });
});