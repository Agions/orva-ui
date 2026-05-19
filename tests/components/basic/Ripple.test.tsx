/**
 * Ripple Component Test
 * 水波纹组件测试
 * @module tests/components/basic/Ripple
 *
 * Requirements: 16.8
 */

import React from 'react';
import { render } from '@testing-library/react';
import { Ripple } from '../../../src/components/basic/Ripple';
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

describe('Ripple 水波纹组件', () => {
  describe('基础渲染', () => {
    test('应该正确渲染 Ripple 组件', () => {
      const { container } = renderWithTheme(<Ripple>点击</Ripple>);
      expect(container.firstChild).toBeInTheDocument();
    });

    test('应该支持 children', () => {
      const { container } = renderWithTheme(
        <Ripple>
          <button>按钮</button>
        </Ripple>
      );
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  describe('属性', () => {
    test('应该支持 disabled', () => {
      const { container } = renderWithTheme(<Ripple disabled>点击</Ripple>);
      expect(container.firstChild).toBeInTheDocument();
    });

    test('应该支持 disabledRelative', () => {
      const { container } = renderWithTheme(<Ripple disabledRelative>点击</Ripple>);
      expect(container.firstChild).toBeInTheDocument();
    });
  });
});