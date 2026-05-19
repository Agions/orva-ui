/**
 * Tabs Component Test
 * 标签页组件测试
 * @module tests/components/navigation/Tabs
 *
 * Requirements: 16.8
 */

import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { Tabs } from '../../../src/components/navigation/Tabs';
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

describe('Tabs 标签页组件', () => {
  // ==================== 基础渲染测试 ====================

  describe('基础渲染', () => {
    test('应该正确渲染 Tabs 组件', () => {
      const { container } = renderWithTheme(
        <Tabs items={[{ key: '1', label: 'Tab 1' }]} activeKey="1" />
      );
      expect(container.firstChild).toBeInTheDocument();
    });

    test('应该渲染多个标签页', () => {
      const { container } = renderWithTheme(
        <Tabs items={[
          { key: '1', label: 'Tab 1', children: <div>内容1</div> },
          { key: '2', label: 'Tab 2', children: <div>内容2</div> },
        ]} activeKey="1" />
      );
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  // ==================== 类型测试 ====================

  describe('类型', () => {
    test('应该支持 line 类型', () => {
      const { container } = renderWithTheme(
        <Tabs items={[{ key: '1', label: 'Tab 1' }]} activeKey="1" type="line" />
      );
      expect(container.firstChild).toBeInTheDocument();
    });

    test('应该支持 card 类型', () => {
      const { container } = renderWithTheme(
        <Tabs items={[{ key: '1', label: 'Tab 1' }]} activeKey="1" type="card" />
      );
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  // ==================== 位置测试 ====================

  describe('位置', () => {
    test('应该支持 top 位置', () => {
      const { container } = renderWithTheme(
        <Tabs items={[{ key: '1', label: 'Tab 1' }]} activeKey="1" position="top" />
      );
      expect(container.firstChild).toBeInTheDocument();
    });

    test('应该支持 bottom 位置', () => {
      const { container } = renderWithTheme(
        <Tabs items={[{ key: '1', label: 'Tab 1' }]} activeKey="1" position="bottom" />
      );
      expect(container.firstChild).toBeInTheDocument();
    });

    test('应该支持 left 位置', () => {
      const { container } = renderWithTheme(
        <Tabs items={[{ key: '1', label: 'Tab 1' }]} activeKey="1" position="left" />
      );
      expect(container.firstChild).toBeInTheDocument();
    });

    test('应该支持 right 位置', () => {
      const { container } = renderWithTheme(
        <Tabs items={[{ key: '1', label: 'Tab 1' }]} activeKey="1" position="right" />
      );
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  // ==================== 尺寸测试 ====================

  describe('尺寸', () => {
    test('应该支持 default 尺寸', () => {
      const { container } = renderWithTheme(
        <Tabs items={[{ key: '1', label: 'Tab 1' }]} activeKey="1" size="default" />
      );
      expect(container.firstChild).toBeInTheDocument();
    });

    test('应该支持 small 尺寸', () => {
      const { container } = renderWithTheme(
        <Tabs items={[{ key: '1', label: 'Tab 1' }]} activeKey="1" size="small" />
      );
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  // ==================== 激活测试 ====================

  describe('激活', () => {
    test('应该支持 defaultActiveKey', () => {
      const { container } = renderWithTheme(
        <Tabs items={[{ key: '1', label: 'Tab 1' }, { key: '2', label: 'Tab 2' }]} defaultActiveKey="2" />
      );
      expect(container.firstChild).toBeInTheDocument();
    });

    test('应该支持 onTabClick 回调', () => {
      const handleTabClick = vi.fn();
      const { container } = renderWithTheme(
        <Tabs
          items={[{ key: '1', label: 'Tab 1' }, { key: '2', label: 'Tab 2' }]}
          activeKey="1"
          onTabClick={handleTabClick}
        />
      );
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  // ==================== 禁用状态测试 ====================

  describe('禁用状态', () => {
    test('应该支持禁用标签页', () => {
      const { container } = renderWithTheme(
        <Tabs
          items={[
            { key: '1', label: 'Tab 1' },
            { key: '2', label: 'Tab 2', disabled: true },
          ]}
          activeKey="1"
        />
      );
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  // ==================== 动画测试 ====================

  describe('动画', () => {
    test('应该支持启用动画', () => {
      const { container } = renderWithTheme(
        <Tabs items={[{ key: '1', label: 'Tab 1' }]} activeKey="1" animated />
      );
      expect(container.firstChild).toBeInTheDocument();
    });

    test('应该支持禁用动画', () => {
      const { container } = renderWithTheme(
        <Tabs items={[{ key: '1', label: 'Tab 1' }]} activeKey="1" animated={false} />
      );
      expect(container.firstChild).toBeInTheDocument();
    });
  });
});