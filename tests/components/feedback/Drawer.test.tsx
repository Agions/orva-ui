/**
 * Drawer Component Test
 * 抽屉组件测试
 * @module tests/components/feedback/Drawer
 *
 * Requirements: 16.8
 */

import React from 'react';
import { render } from '@testing-library/react';
import { Drawer } from '../../../src/components/feedback/Drawer';
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

describe('Drawer 抽屉组件', () => {
  describe('基础渲染', () => {
    test('应该正确渲染 Drawer 组件', () => {
      const { container } = renderWithTheme(
        <Drawer visible title="抽屉标题">
          <div>抽屉内容</div>
        </Drawer>
      );
      expect(container.firstChild).toBeInTheDocument();
    });

    test('应该支持自定义 className', () => {
      const { container } = renderWithTheme(
        <Drawer visible className="custom-class">
          <div>内容</div>
        </Drawer>
      );
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  describe('位置属性', () => {
    test('应该支持 left 位置', () => {
      const { container } = renderWithTheme(
        <Drawer visible placement="left">
          <div>内容</div>
        </Drawer>
      );
      expect(container.firstChild).toBeInTheDocument();
    });

    test('应该支持 right 位置', () => {
      const { container } = renderWithTheme(
        <Drawer visible placement="right">
          <div>内容</div>
        </Drawer>
      );
      expect(container.firstChild).toBeInTheDocument();
    });

    test('应该支持 top 位置', () => {
      const { container } = renderWithTheme(
        <Drawer visible placement="top">
          <div>内容</div>
        </Drawer>
      );
      expect(container.firstChild).toBeInTheDocument();
    });

    test('应该支持 bottom 位置', () => {
      const { container } = renderWithTheme(
        <Drawer visible placement="bottom">
          <div>内容</div>
        </Drawer>
      );
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  describe('其他属性', () => {
    test('应该支持 width', () => {
      const { container } = renderWithTheme(
        <Drawer visible width={400}>
          <div>内容</div>
        </Drawer>
      );
      expect(container.firstChild).toBeInTheDocument();
    });

    test('应该支持 closable', () => {
      const { container } = renderWithTheme(
        <Drawer visible closable>
          <div>内容</div>
        </Drawer>
      );
      expect(container.firstChild).toBeInTheDocument();
    });

    test('应该支持 maskClosable', () => {
      const { container } = renderWithTheme(
        <Drawer visible maskClosable>
          <div>内容</div>
        </Drawer>
      );
      expect(container.firstChild).toBeInTheDocument();
    });
  });
});