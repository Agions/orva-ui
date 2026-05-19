/**
 * Slider Component Test
 * 滑动输入条组件测试
 * @module tests/components/form/Slider
 *
 * Requirements: 16.8
 */

import React from 'react';
import { render } from '@testing-library/react';
import { Slider } from '../../../src/components/form/Slider';
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

describe('Slider 滑动输入条组件', () => {
  describe('基础渲染', () => {
    test('应该正确渲染 Slider 组件', () => {
      const { container } = renderWithTheme(<Slider />);
      expect(container.firstChild).toBeInTheDocument();
    });

    test('应该支持 value 属性', () => {
      const { container } = renderWithTheme(<Slider value={50} />);
      expect(container.firstChild).toBeInTheDocument();
    });

    test('应该支持 defaultValue', () => {
      const { container } = renderWithTheme(<Slider defaultValue={30} />);
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  describe('范围属性', () => {
    test('应该支持 min 和 max', () => {
      const { container } = renderWithTheme(<Slider min={0} max={100} />);
      expect(container.firstChild).toBeInTheDocument();
    });

    test('应该支持 range 范围选择', () => {
      const { container } = renderWithTheme(<Slider range />);
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  describe('状态属性', () => {
    test('应该支持 disabled 状态', () => {
      const { container } = renderWithTheme(<Slider disabled />);
      expect(container.firstChild).toBeInTheDocument();
    });

    test('应该支持 readonly 状态', () => {
      const { container } = renderWithTheme(<Slider readOnly />);
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  describe('步长属性', () => {
    test('应该支持 step 属性', () => {
      const { container } = renderWithTheme(<Slider step={10} />);
      expect(container.firstChild).toBeInTheDocument();
    });

    test('应该支持 dots 属性', () => {
      const { container } = renderWithTheme(<Slider dots />);
      expect(container.firstChild).toBeInTheDocument();
    });
  });
});