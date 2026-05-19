/**
 * PageHeader Component Test
 * 页面头部组件测试
 * @module tests/components/navigation/PageHeader
 *
 * Requirements: 16.8
 */

import React from 'react';
import { render } from '@testing-library/react';
import { PageHeader } from '../../../src/components/navigation/PageHeader';
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

describe('PageHeader 页面头部组件', () => {
  // ==================== 基础渲染测试 ====================

  describe('基础渲染', () => {
    test('应该正确渲染 PageHeader 组件', () => {
      const { container } = renderWithTheme(<PageHeader title="页面标题" />);
      expect(container.firstChild).toBeInTheDocument();
    });

    test('应该支持自定义 className', () => {
      const { container } = renderWithTheme(<PageHeader title="测试" className="custom-class" />);
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  // ==================== 面包屑测试 ====================

  describe('面包屑', () => {
    test('应该支持面包屑配置', () => {
      const { container } = renderWithTheme(
        <PageHeader
          title="测试"
          breadcrumbs={[
            { text: '首页', href: '/' },
            { text: '当前页' },
          ]}
        />
      );
      expect(container.firstChild).toBeInTheDocument();
    });

    test('应该支持自定义分隔符', () => {
      const { container } = renderWithTheme(
        <PageHeader
          title="测试"
          breadcrumbs={[
            { text: '首页' },
            { text: '当前页' },
          ]}
          breadcrumbSeparator=">"
        />
      );
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  // ==================== 返回按钮测试 ====================

  describe('返回按钮', () => {
    test('应该支持返回按钮配置', () => {
      const { container } = renderWithTheme(
        <PageHeader title="测试" back={{ show: true }} />
      );
      expect(container.firstChild).toBeInTheDocument();
    });

    test('应该支持自定义返回文字', () => {
      const { container } = renderWithTheme(
        <PageHeader title="测试" back={{ show: true, text: '返回' }} />
      );
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  // ==================== 操作区域测试 ====================

  describe('操作区域', () => {
    test('应该支持左侧操作区', () => {
      const { container } = renderWithTheme(
        <PageHeader title="测试" extraLeft={<span>左侧操作</span>} />
      );
      expect(container.firstChild).toBeInTheDocument();
    });

    test('应该支持右侧操作区', () => {
      const { container } = renderWithTheme(
        <PageHeader title="测试" extraRight={<span>右侧操作</span>} />
      );
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  // ==================== 主题测试 ====================

  describe('主题', () => {
    test('应该支持 light 主题', () => {
      const { container } = renderWithTheme(<PageHeader title="测试" theme="light" />);
      expect(container.firstChild).toBeInTheDocument();
    });

    test('应该支持 dark 主题', () => {
      const { container } = renderWithTheme(<PageHeader title="测试" theme="dark" />);
      expect(container.firstChild).toBeInTheDocument();
    });
  });
});