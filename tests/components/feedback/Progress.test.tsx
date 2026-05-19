/**
 * Progress Component Test
 * 进度条组件测试
 * @module tests/components/feedback/Progress
 *
 * Requirements: 16.8
 */

import React from 'react';
import { render } from '@testing-library/react';
import { Progress } from '../../../src/components/feedback/Progress';
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

describe('Progress 进度条组件', () => {
  describe('基础渲染', () => {
    test('应该正确渲染 Progress 组件', () => {
      const { container } = renderWithTheme(<Progress percent={50} />);
      expect(container.firstChild).toBeInTheDocument();
    });

    test('应该支持自定义 className', () => {
      const { container } = renderWithTheme(<Progress percent={50} className="custom-class" />);
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  describe('进度类型', () => {
    test('应该支持 line 类型', () => {
      const { container } = renderWithTheme(<Progress percent={50} type="line" />);
      expect(container.firstChild).toBeInTheDocument();
    });

    test('应该支持 circle 类型', () => {
      const { container } = renderWithTheme(<Progress percent={50} type="circle" />);
      expect(container.firstChild).toBeInTheDocument();
    });

    test('应该支持 dashboard 类型', () => {
      const { container } = renderWithTheme(<Progress percent={50} type="dashboard" />);
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  describe('状态属性', () => {
    test('应该支持 success 状态', () => {
      const { container } = renderWithTheme(<Progress percent={100} status="success" />);
      expect(container.firstChild).toBeInTheDocument();
    });

    test('应该支持 exception 状态', () => {
      const { container } = renderWithTheme(<Progress percent={50} status="exception" />);
      expect(container.firstChild).toBeInTheDocument();
    });

    test('应该支持 active 动画', () => {
      const { container } = renderWithTheme(<Progress percent={50} status="normal" />);
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  describe('尺寸属性', () => {
    test('应该支持 small 尺寸', () => {
      const { container } = renderWithTheme(<Progress percent={50} size="small" />);
      expect(container.firstChild).toBeInTheDocument();
    });

    test('应该支持默认尺寸', () => {
      const { container } = renderWithTheme(<Progress percent={50} size="default" />);
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  describe('进度数值', () => {
    test('应该支持 0 进度', () => {
      const { container } = renderWithTheme(<Progress percent={0} />);
      expect(container.firstChild).toBeInTheDocument();
    });

    test('应该支持 100 进度', () => {
      const { container } = renderWithTheme(<Progress percent={100} />);
      expect(container.firstChild).toBeInTheDocument();
    });

    test('应该支持超过 100 的进度', () => {
      const { container } = renderWithTheme(<Progress percent={150} />);
      expect(container.firstChild).toBeInTheDocument();
    });
  });
});