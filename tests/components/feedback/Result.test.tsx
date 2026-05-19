/**
 * Result Component Test
 * 结果展示组件测试
 * @module tests/components/feedback/Result
 *
 * Requirements: 16.8
 */

import React from 'react';
import { render } from '@testing-library/react';
import { Result } from '../../../src/components/feedback/Result';
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

describe('Result 结果展示组件', () => {
  describe('基础渲染', () => {
    test('应该正确渲染 Result 组件', () => {
      const { container } = renderWithTheme(<Result title="操作成功" />);
      expect(container.firstChild).toBeInTheDocument();
    });

    test('应该支持自定义 className', () => {
      const { container } = renderWithTheme(<Result title="成功" className="custom-class" />);
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  describe('状态类型', () => {
    test('应该支持 success 状态', () => {
      const { container } = renderWithTheme(<Result status="success" title="成功" />);
      expect(container.firstChild).toBeInTheDocument();
    });

    test('应该支持 error 状态', () => {
      const { container } = renderWithTheme(<Result status="error" title="失败" />);
      expect(container.firstChild).toBeInTheDocument();
    });

    test('应该支持 warning 状态', () => {
      const { container } = renderWithTheme(<Result status="warning" title="警告" />);
      expect(container.firstChild).toBeInTheDocument();
    });

    test('应该支持 info 状态', () => {
      const { container } = renderWithTheme(<Result status="info" title="提示" />);
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  describe('内容属性', () => {
    test('应该支持 title 和 subTitle', () => {
      const { container } = renderWithTheme(
        <Result title="主标题" subTitle="副标题" />
      );
      expect(container.firstChild).toBeInTheDocument();
    });

    test('应该支持传入 extra 内容', () => {
      const { container } = renderWithTheme(
        <Result title="成功">
          <div>额外内容</div>
        </Result>
      );
      expect(container.firstChild).toBeInTheDocument();
    });
  });
});