/**
 * Message Component Test
 * 消息提示组件测试
 * @module tests/components/feedback/Message
 *
 * Requirements: 16.8
 */

import React from 'react';
import { render } from '@testing-library/react';
import { Message } from '../../../src/components/feedback/Message';
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

describe('Message 消息提示组件', () => {
  describe('基础渲染', () => {
    test('应该正确渲染 Message 组件', () => {
      const { container } = renderWithTheme(<Message content="消息内容" />);
      expect(container.firstChild).toBeInTheDocument();
    });

    test('应该支持自定义 className', () => {
      const { container } = renderWithTheme(
        <Message content="内容" className="custom-class" />
      );
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  describe('类型属性', () => {
    test('应该支持 success 类型', () => {
      const { container } = renderWithTheme(
        <Message content="成功" type="success" />
      );
      expect(container.firstChild).toBeInTheDocument();
    });

    test('应该支持 error 类型', () => {
      const { container } = renderWithTheme(
        <Message content="错误" type="error" />
      );
      expect(container.firstChild).toBeInTheDocument();
    });

    test('应该支持 warning 类型', () => {
      const { container } = renderWithTheme(
        <Message content="警告" type="warning" />
      );
      expect(container.firstChild).toBeInTheDocument();
    });

    test('应该支持 info 类型', () => {
      const { container } = renderWithTheme(
        <Message content="提示" type="info" />
      );
      expect(container.firstChild).toBeInTheDocument();
    });

    test('应该支持 loading 类型', () => {
      const { container } = renderWithTheme(
        <Message content="加载中" type="loading" />
      );
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  describe('其他属性', () => {
    test('应该支持 closable', () => {
      const { container } = renderWithTheme(
        <Message content="内容" closable />
      );
      expect(container.firstChild).toBeInTheDocument();
    });

    test('应该支持 duration', () => {
      const { container } = renderWithTheme(
        <Message content="内容" duration={3000} />
      );
      expect(container.firstChild).toBeInTheDocument();
    });

    test('应该支持 showIcon', () => {
      const { container } = renderWithTheme(
        <Message content="内容" showIcon />
      );
      expect(container.firstChild).toBeInTheDocument();
    });
  });
});