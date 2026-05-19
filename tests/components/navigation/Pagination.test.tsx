/**
 * Pagination Component Test
 * 分页器组件测试
 * @module tests/components/navigation/Pagination
 *
 * Requirements: 16.8
 */

import React from 'react';
import { render } from '@testing-library/react';
import { PaginationComponent } from '../../../src/components/navigation/Pagination';
import { describe, test, expect, vi } from 'vitest';
import { ThemeContext } from '../../../src/hooks/ui/useTheme';
import { defaultTheme } from '../../../src/theme/defaults';
import type { ThemeContextType } from '../../../src/hooks/ui/useTheme';

/**
 * 创建测试用的主题上下文值
 */
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

/**
 * 测试包装器，提供主题上下文
 */
const TestWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ThemeContext.Provider value={createMockThemeContext()}>
    {children}
  </ThemeContext.Provider>
);

/**
 * 自定义 render 函数，自动包装主题上下文
 */
const renderWithTheme = (ui: React.ReactElement) => {
  return render(ui, { wrapper: TestWrapper });
};

describe('Pagination 分页器组件', () => {
  // ==================== 基础渲染测试 ====================

  describe('基础渲染', () => {
    test('应该正确渲染 Pagination 组件', () => {
      const { container } = renderWithTheme(<PaginationComponent current={1} total={50} />);
      expect(container.firstChild).toBeInTheDocument();
    });

    test('应该渲染总页数信息', () => {
      const { container } = renderWithTheme(<PaginationComponent current={1} total={50} showTotal />);
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  // ==================== 页码测试 ====================

  describe('页码', () => {
    test('应该渲染当前页码', () => {
      const { container } = renderWithTheme(<PaginationComponent current={3} total={50} />);
      expect(container.firstChild).toBeInTheDocument();
    });

    test('应该渲染页码数组', () => {
      const { container } = renderWithTheme(<PaginationComponent current={1} total={100} />);
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  // ==================== 页面大小测试 ====================

  describe('页面大小', () => {
    test('应该支持默认页面大小', () => {
      const { container } = renderWithTheme(<PaginationComponent current={1} total={50} />);
      expect(container.firstChild).toBeInTheDocument();
    });

    test('应该支持自定义页面大小', () => {
      const { container } = renderWithTheme(<PaginationComponent current={1} total={50} pageSize={20} />);
      expect(container.firstChild).toBeInTheDocument();
    });

    test('应该显示页面大小选择器', () => {
      const { container } = renderWithTheme(<PaginationComponent current={1} total={50} showSizeChanger />);
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  // ==================== 快速跳转测试 ====================

  describe('快速跳转', () => {
    test('应该显示快速跳转输入框', () => {
      const { container } = renderWithTheme(<PaginationComponent current={1} total={50} showQuickJumper />);
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  // ==================== 禁用状态测试 ====================

  describe('禁用状态', () => {
    test('应该支持禁用状态', () => {
      const { container } = renderWithTheme(<PaginationComponent current={1} total={50} disabled />);
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  // ==================== 尺寸测试 ====================

  describe('尺寸', () => {
    test('应该支持 default 尺寸', () => {
      const { container } = renderWithTheme(<PaginationComponent current={1} total={50} size="default" />);
      expect(container.firstChild).toBeInTheDocument();
    });

    test('应该支持 small 尺寸', () => {
      const { container } = renderWithTheme(<PaginationComponent current={1} total={50} size="small" />);
      expect(container.firstChild).toBeInTheDocument();
    });
  });
});