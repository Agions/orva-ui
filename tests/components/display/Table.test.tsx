/**
 * Table Component Test
 * 表格组件测试
 * @module tests/components/display/Table
 *
 * Requirements: 16.8
 */

import React from 'react';
import { render } from '@testing-library/react';
import { Table } from '../../../src/components/display/Table';
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

const columns = [
  { title: '姓名', dataIndex: 'name', key: 'name' },
  { title: '年龄', dataIndex: 'age', key: 'age' },
];

const dataSource = [
  { key: '1', name: '张三', age: 25 },
  { key: '2', name: '李四', age: 30 },
];

describe('Table 表格组件', () => {
  describe('基础渲染', () => {
    test('应该正确渲染 Table 组件', () => {
      const { container } = renderWithTheme(<Table columns={columns} dataSource={dataSource} />);
      expect(container.firstChild).toBeInTheDocument();
    });

    test('应该支持 loading', () => {
      const { container } = renderWithTheme(<Table columns={columns} loading />);
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  describe('分页属性', () => {
    test('应该支持 pagination', () => {
      const { container } = renderWithTheme(
        <Table columns={columns} dataSource={dataSource} pagination={{ current: 1, pageSize: 10 }} />
      );
      expect(container.firstChild).toBeInTheDocument();
    });

    test('应该支持 showSizeChanger', () => {
      const { container } = renderWithTheme(
        <Table columns={columns} dataSource={dataSource} pagination={{ showSizeChanger: true }} />
      );
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  describe('其他属性', () => {
    test('应该支持 bordered', () => {
      const { container } = renderWithTheme(<Table columns={columns} bordered />);
      expect(container.firstChild).toBeInTheDocument();
    });

    test('应该支持 size', () => {
      const { container } = renderWithTheme(<Table columns={columns} size="small" />);
      expect(container.firstChild).toBeInTheDocument();
    });
  });
});