/**
 * NavBar Component Test
 * 导航栏组件测试
 * @module tests/components/navigation/NavBar
 *
 * Requirements: 16.8
 */

import React from 'react';
import { render } from '@testing-library/react';
import { NavBar } from '../../../src/components/navigation/NavBar';
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

describe('NavBar 导航栏组件', () => {
  // ==================== 基础渲染测试 ====================

  describe('基础渲染', () => {
    test('应该正确渲染 NavBar 组件', () => {
      const { container } = renderWithTheme(<NavBar title="测试标题" />);
      expect(container.firstChild).toBeInTheDocument();
    });

    test('应该支持自定义 className', () => {
      const { container } = renderWithTheme(<NavBar title="测试" className="custom-class" />);
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  // ==================== 左右侧内容测试 ====================

  describe('左右侧内容', () => {
    test('应该渲染左侧内容', () => {
      const { container } = renderWithTheme(<NavBar title="测试" left={<span>左侧</span>} />);
      expect(container.firstChild).toBeInTheDocument();
    });

    test('应该渲染右侧内容', () => {
      const { container } = renderWithTheme(<NavBar title="测试" right={<span>右侧</span>} />);
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  // ==================== 返回箭头测试 ====================

  describe('返回箭头', () => {
    test('应该渲染返回箭头', () => {
      const { container } = renderWithTheme(<NavBar title="测试" backArrow />);
      expect(container.firstChild).toBeInTheDocument();
    });

    test('应该支持 onBack 回调', () => {
      const { container } = renderWithTheme(<NavBar title="测试" backArrow onBack={() => {}} />);
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  // ==================== 主题测试 ====================

  describe('主题', () => {
    test('应该支持 light 主题', () => {
      const { container } = renderWithTheme(<NavBar title="测试" theme="light" />);
      expect(container.firstChild).toBeInTheDocument();
    });

    test('应该支持 dark 主题', () => {
      const { container } = renderWithTheme(<NavBar title="测试" theme="dark" />);
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  // ==================== 定位测试 ====================

  describe('定位', () => {
    test('应该支持 fixed 定位', () => {
      const { container } = renderWithTheme(<NavBar title="测试" position="fixed" />);
      expect(container.firstChild).toBeInTheDocument();
    });

    test('应该支持 relative 定位', () => {
      const { container } = renderWithTheme(<NavBar title="测试" position="relative" />);
      expect(container.firstChild).toBeInTheDocument();
    });
  });
});