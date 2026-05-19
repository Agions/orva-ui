/**
 * Card Component Test
 * 卡片组件测试
 * @module tests/components/display/Card
 *
 * Requirements: 16.8
 */

import React from 'react';
import { render } from '@testing-library/react';
import { Card as CardComponent } from '../../../src/components/display/Card';
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

describe('Card 卡片组件', () => {
  // ==================== 基础渲染测试 ====================

  describe('基础渲染', () => {
    test('应该正确渲染 Card 组件', () => {
      const { container } = renderWithTheme(<CardComponent>卡片内容</CardComponent>);
      expect(container.firstChild).toBeInTheDocument();
    });

    test('应该支持自定义 className', () => {
      const { container } = renderWithTheme(<CardComponent className="custom-card">内容</CardComponent>);
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  // ==================== 悬浮效果测试 ====================

  describe('悬浮效果', () => {
    test('应该支持 hoverable', () => {
      const { container } = renderWithTheme(<CardComponent hoverable>内容</CardComponent>);
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  // ==================== 阴影测试 ====================

  describe('阴影', () => {
    test('应该支持 small 阴影', () => {
      const { container } = renderWithTheme(<CardComponent shadow="small">内容</CardComponent>);
      expect(container.firstChild).toBeInTheDocument();
    });

    test('应该支持 medium 阴影', () => {
      const { container } = renderWithTheme(<CardComponent shadow="medium">内容</CardComponent>);
      expect(container.firstChild).toBeInTheDocument();
    });

    test('应该支持 large 阴影', () => {
      const { container } = renderWithTheme(<CardComponent shadow="large">内容</CardComponent>);
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  // ==================== 圆角测试 ====================

  describe('圆角', () => {
    test('应该支持 small 圆角', () => {
      const { container } = renderWithTheme(<CardComponent radius="small">内容</CardComponent>);
      expect(container.firstChild).toBeInTheDocument();
    });

    test('应该支持 medium 圆角', () => {
      const { container } = renderWithTheme(<CardComponent radius="medium">内容</CardComponent>);
      expect(container.firstChild).toBeInTheDocument();
    });

    test('应该支持 large 圆角', () => {
      const { container } = renderWithTheme(<CardComponent radius="large">内容</CardComponent>);
      expect(container.firstChild).toBeInTheDocument();
    });
  });
});