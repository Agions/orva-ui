/**
 * List Component Test
 * 列表组件测试
 * @module tests/components/display/List
 *
 * Requirements: 16.8
 */

import React from 'react';
import { render } from '@testing-library/react';
import { List as ListComponent } from '../../../src/components/display/List';
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

describe('List 列表组件', () => {
  // ==================== 基础渲染测试 ====================

  describe('基础渲染', () => {
    test('应该正确渲染 List 组件', () => {
      const { container } = renderWithTheme(<ListComponent>列表内容</ListComponent>);
      expect(container.firstChild).toBeInTheDocument();
    });

    test('应该支持自定义 className', () => {
      const { container } = renderWithTheme(<ListComponent className="custom-list">内容</ListComponent>);
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  // ==================== 数据源测试 ====================

  describe('数据源', () => {
    test('应该支持 dataSource', () => {
      const { container } = renderWithTheme(
        <ListComponent dataSource={[{ key: '1', title: '标题1' }]} renderItem={(item) => <div>{item.title}</div>} />
      );
      expect(container.firstChild).toBeInTheDocument();
    });

    test('应该支持空数据源', () => {
      const { container } = renderWithTheme(<ListComponent dataSource={[]} renderItem={(item) => <div>{item.title}</div>} />);
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  // ==================== 分割线测试 ====================

  describe('分割线', () => {
    test('应该支持分割线', () => {
      const { container } = renderWithTheme(<ListComponent divided>内容</ListComponent>);
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  // ==================== 尺寸测试 ====================

  describe('尺寸', () => {
    test('应该支持 small 尺寸', () => {
      const { container } = renderWithTheme(<ListComponent size="small">内容</ListComponent>);
      expect(container.firstChild).toBeInTheDocument();
    });

    test('应该支持 medium 尺寸', () => {
      const { container } = renderWithTheme(<ListComponent size="medium">内容</ListComponent>);
      expect(container.firstChild).toBeInTheDocument();
    });

    test('应该支持 large 尺寸', () => {
      const { container } = renderWithTheme(<ListComponent size="large">内容</ListComponent>);
      expect(container.firstChild).toBeInTheDocument();
    });
  });
});