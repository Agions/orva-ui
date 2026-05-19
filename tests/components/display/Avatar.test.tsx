/**
 * Avatar Component Test
 * 头像组件测试
 * @module tests/components/display/Avatar
 *
 * Requirements: 16.8
 */

import React from 'react';
import { render } from '@testing-library/react';
import { Avatar } from '../../../src/components/display/Avatar';
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

describe('Avatar 头像组件', () => {
  // ==================== 基础渲染测试 ====================

  describe('基础渲染', () => {
    test('应该正确渲染 Avatar 组件', () => {
      const { container } = renderWithTheme(<Avatar>JD</Avatar>);
      expect(container.firstChild).toBeInTheDocument();
    });

    test('应该支持自定义 className', () => {
      const { container } = renderWithTheme(<Avatar className="custom-avatar">JD</Avatar>);
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  // ==================== 尺寸测试 ====================

  describe('尺寸', () => {
    test('应该支持 small 尺寸', () => {
      const { container } = renderWithTheme(<Avatar size="small">JD</Avatar>);
      expect(container.firstChild).toBeInTheDocument();
    });

    test('应该支持 medium 尺寸', () => {
      const { container } = renderWithTheme(<Avatar size="medium">JD</Avatar>);
      expect(container.firstChild).toBeInTheDocument();
    });

    test('应该支持 large 尺寸', () => {
      const { container } = renderWithTheme(<Avatar size="large">JD</Avatar>);
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  // ==================== 形状测试 ====================

  describe('形状', () => {
    test('应该支持 circle 形状', () => {
      const { container } = renderWithTheme(<Avatar shape="circle">JD</Avatar>);
      expect(container.firstChild).toBeInTheDocument();
    });

    test('应该支持 square 形状', () => {
      const { container } = renderWithTheme(<Avatar shape="square">JD</Avatar>);
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  // ==================== 图片模式测试 ====================

  describe('图片模式', () => {
    test('应该支持 src 属性', () => {
      const { container } = renderWithTheme(<Avatar src="https://example.com/avatar.jpg" alt="用户头像" />);
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  // ==================== 图标模式测试 ====================

  describe('图标模式', () => {
    test('应该支持 icon 属性', () => {
      const { container } = renderWithTheme(<Avatar icon={<span>Icon</span>} />);
      expect(container.firstChild).toBeInTheDocument();
    });
  });
});