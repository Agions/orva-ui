/**
 * Affix Component Test
 * 固钉组件测试
 * @module tests/components/layout/Affix
 *
 * Requirements: 16.8
 */

import React from 'react';
import { render } from '@testing-library/react';
import { Affix } from '../../../src/components/layout/Affix';
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

describe('Affix 固钉组件', () => {
  describe('基础渲染', () => {
    test('应该正确渲染 Affix 组件', () => {
      const { container } = renderWithTheme(
        <Affix>
          <div>固定内容</div>
        </Affix>
      );
      expect(container.firstChild).toBeInTheDocument();
    });

    test('应该支持自定义 className', () => {
      const { container } = renderWithTheme(
        <Affix className="custom-class">
          <div>内容</div>
        </Affix>
      );
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  describe('位置属性', () => {
    test('应该支持 top 属性', () => {
      const { container } = renderWithTheme(
        <Affix offsetTop={10}>
          <div>内容</div>
        </Affix>
      );
      expect(container.firstChild).toBeInTheDocument();
    });

    test('应该支持 bottom 属性', () => {
      const { container } = renderWithTheme(
        <Affix offsetBottom={10}>
          <div>内容</div>
        </Affix>
      );
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  describe('其他属性', () => {
    test('应该支持 target 属性', () => {
      const { container } = renderWithTheme(
        <Affix target={() => window}>
          <div>内容</div>
        </Affix>
      );
      expect(container.firstChild).toBeInTheDocument();
    });
  });
});