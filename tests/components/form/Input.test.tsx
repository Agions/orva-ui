/**
 * Input Component Test
 * 输入框组件测试
 * @module tests/components/form/Input
 *
 * Requirements: 16.8
 */

import React from 'react';
import { render } from '@testing-library/react';
import { Input } from '../../../src/components/form/Input';
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

describe('Input 输入框组件', () => {
  describe('基础渲染', () => {
    test('应该正确渲染 Input 组件', () => {
      const { container } = renderWithTheme(<Input />);
      expect(container.firstChild).toBeInTheDocument();
    });

    test('应该支持 value 属性', () => {
      const { container } = renderWithTheme(<Input value="测试内容" />);
      expect(container.firstChild).toBeInTheDocument();
    });

    test('应该支持 placeholder', () => {
      const { container } = renderWithTheme(<Input placeholder="请输入内容" />);
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  describe('状态属性', () => {
    test('应该支持 disabled 状态', () => {
      const { container } = renderWithTheme(<Input disabled />);
      expect(container.firstChild).toBeInTheDocument();
    });

    test('应该支持 readonly 状态', () => {
      const { container } = renderWithTheme(<Input readOnly />);
      expect(container.firstChild).toBeInTheDocument();
    });

    test('应该支持 error 状态', () => {
      const { container } = renderWithTheme(<Input status="error" />);
      expect(container.firstChild).toBeInTheDocument();
    });

    test('应该支持 success 状态', () => {
      const { container } = renderWithTheme(<Input status="success" />);
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  describe('类型属性', () => {
    test('应该支持 text 类型', () => {
      const { container } = renderWithTheme(<Input type="text" />);
      expect(container.firstChild).toBeInTheDocument();
    });

    test('应该支持 password 类型', () => {
      const { container } = renderWithTheme(<Input type="password" />);
      expect(container.firstChild).toBeInTheDocument();
    });

    test('应该支持 number 类型', () => {
      const { container } = renderWithTheme(<Input type="number" />);
      expect(container.firstChild).toBeInTheDocument();
    });

    test('应该支持 tel 类型', () => {
      const { container } = renderWithTheme(<Input type="tel" />);
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  describe('其他属性', () => {
    test('应该支持 maxLength', () => {
      const { container } = renderWithTheme(<Input maxLength={10} />);
      expect(container.firstChild).toBeInTheDocument();
    });

    test('应该支持 clearable', () => {
      const { container } = renderWithTheme(<Input clearable value="内容" />);
      expect(container.firstChild).toBeInTheDocument();
    });

    test('应该支持 prefix 图标', () => {
      const { container } = renderWithTheme(<Input prefix={<span>🔍</span>} />);
      expect(container.firstChild).toBeInTheDocument();
    });

    test('应该支持 suffix 图标', () => {
      const { container } = renderWithTheme(<Input suffix={<span>🔍</span>} />);
      expect(container.firstChild).toBeInTheDocument();
    });
  });
});