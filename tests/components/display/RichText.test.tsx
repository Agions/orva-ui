/**
 * RichText Component Test
 * 富文本组件测试
 * @module tests/components/display/RichText
 *
 * Requirements: 16.8
 */

import React from 'react';
import { render } from '@testing-library/react';
import { RichText } from '../../../src/components/display/RichText';
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

describe('RichText 富文本组件', () => {
  describe('基础渲染', () => {
    test('应该正确渲染 RichText 组件', () => {
      const { container } = renderWithTheme(<RichText>内容</RichText>);
      expect(container.firstChild).toBeInTheDocument();
    });

    test('应该支持 nodes 属性', () => {
      const { container } = renderWithTheme(
        <RichText nodes={[{ name: 'p', children: [{ type: 'text', text: 'Hello' }] }]} />
      );
      expect(container.firstChild).toBeInTheDocument();
    });

    test('应该支持 html 属性', () => {
      const { container } = renderWithTheme(<RichText html="<p>Hello</p>" />);
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  describe('其他属性', () => {
    test('应该支持 space 属性', () => {
      const { container } = renderWithTheme(<RichText space="nbsp">内容</RichText>);
      expect(container.firstChild).toBeInTheDocument();
    });
  });
});