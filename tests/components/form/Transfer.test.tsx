/**
 * Transfer Component Test
 * 穿梭框组件测试
 * @module tests/components/form/Transfer
 *
 * Requirements: 16.8
 */

import React from 'react';
import { render } from '@testing-library/react';
import { Transfer } from '../../../src/components/form/Transfer';
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

const mockData = [
  { key: '1', title: '选项一' },
  { key: '2', title: '选项二' },
  { key: '3', title: '选项三' },
];

describe('Transfer 穿梭框组件', () => {
  describe('基础渲染', () => {
    test('应该正确渲染 Transfer 组件', () => {
      const { container } = renderWithTheme(<Transfer dataSource={mockData} />);
      expect(container.firstChild).toBeInTheDocument();
    });

    test('应该支持 targetKeys', () => {
      const { container } = renderWithTheme(<Transfer dataSource={mockData} targetKeys={['1']} />);
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  describe('状态属性', () => {
    test('应该支持 disabled', () => {
      const { container } = renderWithTheme(<Transfer disabled dataSource={mockData} />);
      expect(container.firstChild).toBeInTheDocument();
    });

    test('应该支持 oneWay', () => {
      const { container } = renderWithTheme(<Transfer oneWay dataSource={mockData} />);
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  describe('其他属性', () => {
    test('应该支持 titles', () => {
      const { container } = renderWithTheme(
        <Transfer dataSource={mockData} titles={['源列表', '目标列表']} />
      );
      expect(container.firstChild).toBeInTheDocument();
    });

    test('应该支持 operations', () => {
      const { container } = renderWithTheme(
        <Transfer dataSource={mockData} operations={['→', '←']} />
      );
      expect(container.firstChild).toBeInTheDocument();
    });
  });
});