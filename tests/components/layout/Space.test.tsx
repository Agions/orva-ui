/**
 * Space Component Test
 * 间距组件测试
 * @module tests/components/layout/Space
 *
 * Requirements: 16.8
 */

import React from 'react';
import { render } from '@testing-library/react';
import { Space } from '../../../src/components/layout/Space';
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

describe('Space 间距组件', () => {
  describe('基础渲染', () => {
    test('应该正确渲染 Space 组件', () => {
      const { container } = renderWithTheme(
        <Space>
          <span>Item 1</span>
          <span>Item 2</span>
        </Space>
      );
      expect(container.firstChild).toBeInTheDocument();
    });

    test('应该支持自定义 className', () => {
      const { container } = renderWithTheme(
        <Space className="custom-class">
          <span>Item</span>
        </Space>
      );
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  describe('间距大小', () => {
    test('应该支持 small 间距', () => {
      const { container } = renderWithTheme(<Space size="small"><span>Item</span></Space>);
      expect(container.firstChild).toBeInTheDocument();
    });

    test('应该支持 middle 间距', () => {
      const { container } = renderWithTheme(<Space size="middle"><span>Item</span></Space>);
      expect(container.firstChild).toBeInTheDocument();
    });

    test('应该支持 large 间距', () => {
      const { container } = renderWithTheme(<Space size="large"><span>Item</span></Space>);
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  describe('排列方向', () => {
    test('应该支持 horizontal 方向', () => {
      const { container } = renderWithTheme(<Space direction="horizontal"><span>Item</span></Space>);
      expect(container.firstChild).toBeInTheDocument();
    });

    test('应该支持 vertical 方向', () => {
      const { container } = renderWithTheme(<Space direction="vertical"><span>Item</span></Space>);
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  describe('对齐方式', () => {
    test('应该支持 start 对齐', () => {
      const { container } = renderWithTheme(<Space align="start"><span>Item</span></Space>);
      expect(container.firstChild).toBeInTheDocument();
    });

    test('应该支持 center 对齐', () => {
      const { container } = renderWithTheme(<Space align="center"><span>Item</span></Space>);
      expect(container.firstChild).toBeInTheDocument();
    });

    test('应该支持 end 对齐', () => {
      const { container } = renderWithTheme(<Space align="end"><span>Item</span></Space>);
      expect(container.firstChild).toBeInTheDocument();
    });
  });
});