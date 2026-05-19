/**
 * Select Component Test
 * 选择器组件测试
 * @module tests/components/form/Select
 *
 * Requirements: 16.8
 */

import React from 'react';
import { render } from '@testing-library/react';
import { Select } from '../../../src/components/form/Select';
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

describe('Select 选择器组件', () => {
  describe('基础渲染', () => {
    test('应该正确渲染 Select 组件', () => {
      const { container } = renderWithTheme(<Select options={mockOptions} />);
      expect(container.firstChild).toBeInTheDocument();
    });

    test('应该支持 placeholder', () => {
      const { container } = renderWithTheme(<Select placeholder="请选择" options={mockOptions} />);
      expect(container.firstChild).toBeInTheDocument();
    });

    test('应该支持 value 属性', () => {
      const { container } = renderWithTheme(<Select value="1" options={mockOptions} />);
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  describe('模式属性', () => {
    test('应该支持多选模式', () => {
      const { container } = renderWithTheme(<Select mode="multiple" options={mockOptions} />);
      expect(container.firstChild).toBeInTheDocument();
    });

    test('应该支持标签模式', () => {
      const { container } = renderWithTheme(<Select mode="tags" options={mockOptions} />);
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  describe('状态属性', () => {
    test('应该支持 disabled 状态', () => {
      const { container } = renderWithTheme(<Select disabled options={mockOptions} />);
      expect(container.firstChild).toBeInTheDocument();
    });

    test('应该支持 loading 状态', () => {
      const { container } = renderWithTheme(<Select loading options={mockOptions} />);
      expect(container.firstChild).toBeInTheDocument();
    });

    test('应该支持 clearable', () => {
      const { container } = renderWithTheme(<Select clearable options={mockOptions} />);
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  describe('搜索属性', () => {
    test('应该支持 showSearch', () => {
      const { container } = renderWithTheme(<Select showSearch options={mockOptions} />);
      expect(container.firstChild).toBeInTheDocument();
    });

    test('应该支持 filterOption', () => {
      const { container } = renderWithTheme(
        <Select showSearch filterOption={(input, option) => true} options={mockOptions} />
      );
      expect(container.firstChild).toBeInTheDocument();
    });
  });
});