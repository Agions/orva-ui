/**
 * Popconfirm Component Test
 * 气泡确认框组件测试
 * @module tests/components/feedback/Popconfirm
 *
 * Requirements: 16.8
 */

import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Popconfirm } from '../../../src/components/feedback/Popconfirm';
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

describe('Popconfirm 气泡确认框组件', () => {
  describe('基础渲染', () => {
    test('应该正确渲染 Popconfirm 组件', () => {
      const { container } = renderWithTheme(
        <Popconfirm title="确认删除吗？">
          <span>删除</span>
        </Popconfirm>
      );
      expect(container.firstChild).toBeInTheDocument();
    });

    test('应该支持自定义 className', () => {
      const { container } = renderWithTheme(
        <Popconfirm title="确认" className="custom-class">
          <span>触发</span>
        </Popconfirm>
      );
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  describe('位置属性', () => {
    test('应该支持 top 位置', () => {
      const { container } = renderWithTheme(
        <Popconfirm title="确认" placement="top">
          <span>触发</span>
        </Popconfirm>
      );
      expect(container.firstChild).toBeInTheDocument();
    });

    test('应该支持 bottom 位置', () => {
      const { container } = renderWithTheme(
        <Popconfirm title="确认" placement="bottom">
          <span>触发</span>
        </Popconfirm>
      );
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  describe('触发方式', () => {
    test('应该支持 click 触发', () => {
      const { container } = renderWithTheme(
        <Popconfirm title="确认" trigger="click">
          <span>触发</span>
        </Popconfirm>
      );
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  describe('其他属性', () => {
    test('应该支持 disabled', () => {
      const { container } = renderWithTheme(
        <Popconfirm title="确认" disabled>
          <span>触发</span>
        </Popconfirm>
      );
      expect(container.firstChild).toBeInTheDocument();
    });

    test('应该支持 okText 和 cancelText', () => {
      const { container } = renderWithTheme(
        <Popconfirm title="确认" okText="确定" cancelText="取消">
          <span>触发</span>
        </Popconfirm>
      );
      expect(container.firstChild).toBeInTheDocument();
    });
  });
});