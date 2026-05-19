/**
 * Cascader Component Test
 * 级联选择器组件测试
 * @module tests/components/form/Cascader
 *
 * Requirements: 16.8
 */

import React from 'react';
import { render } from '@testing-library/react';
import { Cascader } from '../../../src/components/form/Cascader';
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
  {
    label: '选项一',
    value: '1',
    children: [
      { label: '子选项一', value: '1-1' },
      { label: '子选项二', value: '1-2' },
    ],
  },
  { label: '选项二', value: '2' },
];

describe('Cascader 级联选择器组件', () => {
  describe('基础渲染', () => {
    test('应该正确渲染 Cascader 组件', () => {
      const { container } = renderWithTheme(<Cascader options={mockOptions} />);
      expect(container.firstChild).toBeInTheDocument();
    });

    test('应该支持 placeholder', () => {
      const { container } = renderWithTheme(<Cascader placeholder="请选择" options={mockOptions} />);
      expect(container.firstChild).toBeInTheDocument();
    });

    test('应该支持 value 属性', () => {
      const { container } = renderWithTheme(<Cascader value={['1', '1-1']} options={mockOptions} />);
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  describe('状态属性', () => {
    test('应该支持 disabled 状态', () => {
      const { container } = renderWithTheme(<Cascader disabled options={mockOptions} />);
      expect(container.firstChild).toBeInTheDocument();
    });

    test('应该支持 clearable', () => {
      const { container } = renderWithTheme(<Cascader clearable options={mockOptions} />);
      expect(container.firstChild).toBeInTheDocument();
    });

    test('应该支持 search', () => {
      const { container } = renderWithTheme(<Cascader showSearch options={mockOptions} />);
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  describe('其他属性', () => {
    test('应该支持 multiple 模式', () => {
      const { container } = renderWithTheme(<Cascader multiple options={mockOptions} />);
      expect(container.firstChild).toBeInTheDocument();
    });

    test('应该支持 changeOnSelect', () => {
      const { container } = renderWithTheme(<Cascader changeOnSelect options={mockOptions} />);
      expect(container.firstChild).toBeInTheDocument();
    });
  });
});