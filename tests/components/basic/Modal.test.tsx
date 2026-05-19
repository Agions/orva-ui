/**
 * Modal Component Test
 * 模态框组件测试
 * @module tests/components/basic/Modal
 *
 * Requirements: 16.8
 */

import React from 'react';
import { render } from '@testing-library/react';
import { Modal } from '../../../src/components/basic/Modal';
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

describe('Modal 模态框组件', () => {
  describe('基础渲染', () => {
    test('应该正确渲染 Modal 组件', () => {
      const { container } = renderWithTheme(<Modal visible>内容</Modal>);
      expect(container.firstChild).toBeInTheDocument();
    });

    test('应该支持 title', () => {
      const { container } = renderWithTheme(<Modal visible title="标题">内容</Modal>);
      expect(container.firstChild).toBeInTheDocument();
    });

    test('应该支持 children', () => {
      const { container } = renderWithTheme(<Modal visible>这是内容</Modal>);
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  describe('属性', () => {
    test('应该支持 width', () => {
      const { container } = renderWithTheme(<Modal visible width={500}>内容</Modal>);
      expect(container.firstChild).toBeInTheDocument();
    });

    test('应该支持 centered', () => {
      const { container } = renderWithTheme(<Modal visible centered>内容</Modal>);
      expect(container.firstChild).toBeInTheDocument();
    });

    test('应该支持 closable', () => {
      const { container } = renderWithTheme(<Modal visible closable>内容</Modal>);
      expect(container.firstChild).toBeInTheDocument();
    });
  });
});