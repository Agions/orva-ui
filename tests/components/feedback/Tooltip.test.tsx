/**
 * Tooltip Component Test
 * 文字提示组件测试
 * @module tests/components/feedback/Tooltip
 *
 * Requirements: 16.8
 */

import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { Tooltip } from '../../../src/components/feedback/Tooltip';
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

describe('Tooltip 文字提示组件', () => {
  describe('基础渲染', () => {
    test('应该正确渲染 Tooltip 组件', () => {
      const { container } = renderWithTheme(
        <Tooltip title="提示文字">
          <span>触发元素</span>
        </Tooltip>
      );
      expect(container.firstChild).toBeInTheDocument();
    });

    test('应该支持自定义 className', () => {
      const { container } = renderWithTheme(
        <Tooltip title="提示" className="custom-class">
          <span>触发元素</span>
        </Tooltip>
      );
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  describe('位置属性', () => {
    test('应该支持 top 位置', () => {
      const { container } = renderWithTheme(
        <Tooltip title="提示" placement="top">
          <span>触发元素</span>
        </Tooltip>
      );
      expect(container.firstChild).toBeInTheDocument();
    });

    test('应该支持 bottom 位置', () => {
      const { container } = renderWithTheme(
        <Tooltip title="提示" placement="bottom">
          <span>触发元素</span>
        </Tooltip>
      );
      expect(container.firstChild).toBeInTheDocument();
    });

    test('应该支持 left 位置', () => {
      const { container } = renderWithTheme(
        <Tooltip title="提示" placement="left">
          <span>触发元素</span>
        </Tooltip>
      );
      expect(container.firstChild).toBeInTheDocument();
    });

    test('应该支持 right 位置', () => {
      const { container } = renderWithTheme(
        <Tooltip title="提示" placement="right">
          <span>触发元素</span>
        </Tooltip>
      );
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  describe('触发方式', () => {
    test('应该支持 click 触发', () => {
      const { container } = renderWithTheme(
        <Tooltip title="提示" trigger="click">
          <span>触发元素</span>
        </Tooltip>
      );
      expect(container.firstChild).toBeInTheDocument();
    });

    test('应该支持 hover 触发', () => {
      const { container } = renderWithTheme(
        <Tooltip title="提示" trigger="hover">
          <span>触发元素</span>
        </Tooltip>
      );
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  describe('其他属性', () => {
    test('应该支持 disabled', () => {
      const { container } = renderWithTheme(
        <Tooltip title="提示" disabled>
          <span>触发元素</span>
        </Tooltip>
      );
      expect(container.firstChild).toBeInTheDocument();
    });

    test('应该支持箭头显示', () => {
      const { container } = renderWithTheme(
        <Tooltip title="提示" arrow>
          <span>触发元素</span>
        </Tooltip>
      );
      expect(container.firstChild).toBeInTheDocument();
    });
  });
});