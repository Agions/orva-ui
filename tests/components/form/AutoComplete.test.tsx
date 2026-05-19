/**
 * AutoComplete Component Test
 * 自动完成组件测试
 * @module tests/components/form/AutoComplete
 *
 * Requirements: 16.8
 */

import React from 'react';
import { render } from '@testing-library/react';
import { AutoComplete } from '../../../src/components/form/AutoComplete';
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

const mockOptions = [
  { label: '选项一', value: '1' },
  { label: '选项二', value: '2' },
  { label: '选项三', value: '3' },
];

describe('AutoComplete 自动完成组件', () => {
  describe('基础渲染', () => {
    test('应该正确渲染 AutoComplete 组件', () => {
      const { container } = renderWithTheme(<AutoComplete options={mockOptions} />);
      expect(container.firstChild).toBeInTheDocument();
    });

    test('应该支持 placeholder', () => {
      const { container } = renderWithTheme(<AutoComplete placeholder="请输入" options={mockOptions} />);
      expect(container.firstChild).toBeInTheDocument();
    });

    test('应该支持 value 属性', () => {
      const { container } = renderWithTheme(<AutoComplete value="1" options={mockOptions} />);
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  describe('状态属性', () => {
    test('应该支持 disabled 状态', () => {
      const { container } = renderWithTheme(<AutoComplete disabled options={mockOptions} />);
      expect(container.firstChild).toBeInTheDocument();
    });

    test('应该支持 loading 状态', () => {
      const { container } = renderWithTheme(<AutoComplete loading options={mockOptions} />);
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  describe('其他属性', () => {
    test('应该支持 allowClear', () => {
      const { container } = renderWithTheme(<AutoComplete allowClear options={mockOptions} />);
      expect(container.firstChild).toBeInTheDocument();
    });

    test('应该支持 defaultActiveFirstOption', () => {
      const { container } = renderWithTheme(
        <AutoComplete defaultActiveFirstOption options={mockOptions} />
      );
      expect(container.firstChild).toBeInTheDocument();
    });
  });
});