/**
 * VirtualList Component Test
 * 虚拟列表组件测试
 * @module tests/components/common/VirtualList
 *
 * Requirements: 16.8
 */

import React from 'react';
import { render } from '@testing-library/react';
import { VirtualList } from '../../../src/components/common/VirtualList';
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

describe('VirtualList 虚拟列表组件', () => {
  // ==================== 基础渲染测试 ====================

  describe('基础渲染', () => {
    test('应该正确渲染 VirtualList 组件', () => {
      const data = Array.from({ length: 10 }, (_, i) => ({ id: i, title: `Item ${i}` }));
      const { container } = renderWithTheme(
        <VirtualList
          data={data}
          height={400}
          itemHeight={50}
          itemKey="id"
          renderItem={(item) => <div>{item.title}</div>}
        />
      );
      expect(container.firstChild).toBeInTheDocument();
    });

    test('应该支持自定义 className', () => {
      const data = [{ id: 1, title: 'Item 1' }];
      const { container } = renderWithTheme(
        <VirtualList
          data={data}
          height={400}
          itemHeight={50}
          itemKey="id"
          renderItem={(item) => <div>{item.title}</div>}
          className="custom-virtual-list"
        />
      );
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  // ==================== 数据测试 ====================

  describe('数据', () => {
    test('应该支持空数据', () => {
      const { container } = renderWithTheme(
        <VirtualList
          data={[]}
          height={400}
          itemHeight={50}
          itemKey="id"
          renderItem={(item) => <div>{item.title}</div>}
        />
      );
      expect(container.firstChild).toBeInTheDocument();
    });

    test('应该支持大量数据', () => {
      const data = Array.from({ length: 1000 }, (_, i) => ({ id: i, title: `Item ${i}` }));
      const { container } = renderWithTheme(
        <VirtualList
          data={data}
          height={400}
          itemHeight={50}
          itemKey="id"
          renderItem={(item) => <div>{item.title}</div>}
        />
      );
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  // ==================== 尺寸测试 ====================

  describe('尺寸', () => {
    test('应该支持自定义高度', () => {
      const data = [{ id: 1, title: 'Item 1' }];
      const { container } = renderWithTheme(
        <VirtualList
          data={data}
          height={200}
          itemHeight={50}
          itemKey="id"
          renderItem={(item) => <div>{item.title}</div>}
        />
      );
      expect(container.firstChild).toBeInTheDocument();
    });

    test('应该支持自定义项高度', () => {
      const data = [{ id: 1, title: 'Item 1' }];
      const { container } = renderWithTheme(
        <VirtualList
          data={data}
          height={400}
          itemHeight={100}
          itemKey="id"
          renderItem={(item) => <div>{item.title}</div>}
        />
      );
      expect(container.firstChild).toBeInTheDocument();
    });
  });
});