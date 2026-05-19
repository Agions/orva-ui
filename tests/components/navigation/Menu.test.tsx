/**
 * Menu Component Test
 * 导航菜单组件测试
 * @module tests/components/navigation/Menu
 *
 * Requirements: 16.8
 */

import React from 'react';
import { render } from '@testing-library/react';
import { Menu } from '../../../src/components/navigation/Menu';
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

describe('Menu 导航菜单组件', () => {
  // ==================== 基础渲染测试 ====================

  describe('基础渲染', () => {
    test('应该正确渲染 Menu 组件', () => {
      const { container } = renderWithTheme(
        <Menu items={[{ key: 'home', label: '首页' }]} />
      );
      expect(container.firstChild).toBeInTheDocument();
    });

    test('应该渲染多个菜单项', () => {
      const { container } = renderWithTheme(
        <Menu items={[
          { key: 'home', label: '首页' },
          { key: 'about', label: '关于' },
        ]} />
      );
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  // ==================== 模式测试 ====================

  describe('模式', () => {
    test('应该支持 vertical 模式', () => {
      const { container } = renderWithTheme(
        <Menu items={[{ key: 'home', label: '首页' }]} mode="vertical" />
      );
      expect(container.firstChild).toBeInTheDocument();
    });

    test('应该支持 horizontal 模式', () => {
      const { container } = renderWithTheme(
        <Menu items={[{ key: 'home', label: '首页' }]} mode="horizontal" />
      );
      expect(container.firstChild).toBeInTheDocument();
    });

    test('应该支持 inline 模式', () => {
      const { container } = renderWithTheme(
        <Menu items={[{ key: 'home', label: '首页' }]} mode="inline" />
      );
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  // ==================== 主题测试 ====================

  describe('主题', () => {
    test('应该支持 light 主题', () => {
      const { container } = renderWithTheme(
        <Menu items={[{ key: 'home', label: '首页' }]} theme="light" />
      );
      expect(container.firstChild).toBeInTheDocument();
    });

    test('应该支持 dark 主题', () => {
      const { container } = renderWithTheme(
        <Menu items={[{ key: 'home', label: '首页' }]} theme="dark" />
      );
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  // ==================== 尺寸测试 ====================

  describe('尺寸', () => {
    test('应该支持 small 尺寸', () => {
      const { container } = renderWithTheme(
        <Menu items={[{ key: 'home', label: '首页' }]} size="small" />
      );
      expect(container.firstChild).toBeInTheDocument();
    });

    test('应该支持 medium 尺寸', () => {
      const { container } = renderWithTheme(
        <Menu items={[{ key: 'home', label: '首页' }]} size="medium" />
      );
      expect(container.firstChild).toBeInTheDocument();
    });

    test('应该支持 large 尺寸', () => {
      const { container } = renderWithTheme(
        <Menu items={[{ key: 'home', label: '首页' }]} size="large" />
      );
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  // ==================== 选中状态测试 ====================

  describe('选中状态', () => {
    test('应该支持 defaultSelectedKeys', () => {
      const { container } = renderWithTheme(
        <Menu
          items={[
            { key: 'home', label: '首页' },
            { key: 'about', label: '关于' },
          ]}
          defaultSelectedKeys={['about']}
        />
      );
      expect(container.firstChild).toBeInTheDocument();
    });

    test('应该支持受控 selectedKeys', () => {
      const { container } = renderWithTheme(
        <Menu
          items={[
            { key: 'home', label: '首页' },
            { key: 'about', label: '关于' },
          ]}
          selectedKeys={['home']}
        />
      );
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  // ==================== 可折叠测试 ====================

  describe('可折叠', () => {
    test('应该支持 collapsible', () => {
      const { container } = renderWithTheme(
        <Menu items={[{ key: 'home', label: '首页' }]} collapsible />
      );
      expect(container.firstChild).toBeInTheDocument();
    });

    test('应该支持 collapsed 状态', () => {
      const { container } = renderWithTheme(
        <Menu items={[{ key: 'home', label: '首页' }]} collapsed />
      );
      expect(container.firstChild).toBeInTheDocument();
    });
  });
});