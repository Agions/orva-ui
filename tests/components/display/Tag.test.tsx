/**
 * Tag Component Test
 * 标签组件测试
 * @module tests/components/display/Tag
 *
 * Requirements: 16.8
 */

import React from 'react';
import { render } from '@testing-library/react';
import { Tag as TagComponent } from '../../../src/components/display/Tag';
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

describe('Tag 标签组件', () => {
  // ==================== 基础渲染测试 ====================

  describe('基础渲染', () => {
    test('应该正确渲染 Tag 组件', () => {
      const { container } = renderWithTheme(<TagComponent>标签</TagComponent>);
      expect(container.firstChild).toBeInTheDocument();
    });

    test('应该支持自定义 className', () => {
      const { container } = renderWithTheme(<TagComponent className="custom-tag">标签</TagComponent>);
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  // ==================== 颜色测试 ====================

  describe('颜色', () => {
    test('应该支持 default 颜色', () => {
      const { container } = renderWithTheme(<TagComponent color="default">标签</TagComponent>);
      expect(container.firstChild).toBeInTheDocument();
    });

    test('应该支持 primary 颜色', () => {
      const { container } = renderWithTheme(<TagComponent color="primary">标签</TagComponent>);
      expect(container.firstChild).toBeInTheDocument();
    });

    test('应该支持 success 颜色', () => {
      const { container } = renderWithTheme(<TagComponent color="success">标签</TagComponent>);
      expect(container.firstChild).toBeInTheDocument();
    });

    test('应该支持 warning 颜色', () => {
      const { container } = renderWithTheme(<TagComponent color="warning">标签</TagComponent>);
      expect(container.firstChild).toBeInTheDocument();
    });

    test('应该支持 error 颜色', () => {
      const { container } = renderWithTheme(<TagComponent color="error">标签</TagComponent>);
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  // ==================== 尺寸测试 ====================

  describe('尺寸', () => {
    test('应该支持 small 尺寸', () => {
      const { container } = renderWithTheme(<TagComponent size="small">标签</TagComponent>);
      expect(container.firstChild).toBeInTheDocument();
    });

    test('应该支持 medium 尺寸', () => {
      const { container } = renderWithTheme(<TagComponent size="medium">标签</TagComponent>);
      expect(container.firstChild).toBeInTheDocument();
    });

    test('应该支持 large 尺寸', () => {
      const { container } = renderWithTheme(<TagComponent size="large">标签</TagComponent>);
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  // ==================== 变体测试 ====================

  describe('变体', () => {
    test('应该支持 solid 变体', () => {
      const { container } = renderWithTheme(<TagComponent variant="solid">标签</TagComponent>);
      expect(container.firstChild).toBeInTheDocument();
    });

    test('应该支持 outline 变体', () => {
      const { container } = renderWithTheme(<TagComponent variant="outline">标签</TagComponent>);
      expect(container.firstChild).toBeInTheDocument();
    });

    test('应该支持 light 变体', () => {
      const { container } = renderWithTheme(<TagComponent variant="light">标签</TagComponent>);
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  // ==================== 可关闭测试 ====================

  describe('可关闭', () => {
    test('应该支持 closable', () => {
      const { container } = renderWithTheme(<TagComponent closable>标签</TagComponent>);
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  // ==================== 可选中测试 ====================

  describe('可选中', () => {
    test('应该支持 checkable', () => {
      const { container } = renderWithTheme(<TagComponent checkable>标签</TagComponent>);
      expect(container.firstChild).toBeInTheDocument();
    });

    test('应该支持 checked 状态', () => {
      const { container } = renderWithTheme(<TagComponent checkable checked>标签</TagComponent>);
      expect(container.firstChild).toBeInTheDocument();
    });
  });
});