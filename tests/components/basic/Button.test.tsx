/**
 * Button Component Test
 * 按钮组件测试
 * @module tests/components/basic/Button
 *
 * Requirements: 16.8
 */

import React from 'react';
import { render } from '@testing-library/react';
import { Button } from '../../../src/components/basic/Button';
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

describe('Button 按钮组件', () => {
  describe('基础渲染', () => {
    test('应该正确渲染 Button 组件', () => {
      const { container } = renderWithTheme(<Button>按钮</Button>);
      expect(container.firstChild).toBeInTheDocument();
    });

    test('应该支持 children', () => {
      const { container } = renderWithTheme(<Button>点击</Button>);
      expect(container.firstChild).toBeInTheDocument();
    });

    test('应该支持自定义 className', () => {
      const { container } = renderWithTheme(<Button className="custom-btn">按钮</Button>);
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  describe('类型属性', () => {
    test('应该支持 primary 类型', () => {
      const { container } = renderWithTheme(<Button type="primary">按钮</Button>);
      expect(container.firstChild).toBeInTheDocument();
    });

    test('应该支持 default 类型', () => {
      const { container } = renderWithTheme(<Button type="default">按钮</Button>);
      expect(container.firstChild).toBeInTheDocument();
    });

    test('应该支持 dashed 类型', () => {
      const { container } = renderWithTheme(<Button type="dashed">按钮</Button>);
      expect(container.firstChild).toBeInTheDocument();
    });

    test('应该支持 text 类型', () => {
      const { container } = renderWithTheme(<Button type="text">按钮</Button>);
      expect(container.firstChild).toBeInTheDocument();
    });

    test('应该支持 link 类型', () => {
      const { container } = renderWithTheme(<Button type="link">按钮</Button>);
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  describe('状态属性', () => {
    test('应该支持 disabled 状态', () => {
      const { container } = renderWithTheme(<Button disabled>按钮</Button>);
      expect(container.firstChild).toBeInTheDocument();
    });

    test('应该支持 loading 状态', () => {
      const { container } = renderWithTheme(<Button loading>按钮</Button>);
      expect(container.firstChild).toBeInTheDocument();
    });

    test('应该支持 ghost 状态', () => {
      const { container } = renderWithTheme(<Button ghost>按钮</Button>);
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  describe('尺寸属性', () => {
    test('应该支持 small 尺寸', () => {
      const { container } = renderWithTheme(<Button size="small">按钮</Button>);
      expect(container.firstChild).toBeInTheDocument();
    });

    test('应该支持 middle 尺寸', () => {
      const { container } = renderWithTheme(<Button size="middle">按钮</Button>);
      expect(container.firstChild).toBeInTheDocument();
    });

    test('应该支持 large 尺寸', () => {
      const { container } = renderWithTheme(<Button size="large">按钮</Button>);
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  describe('形状属性', () => {
    test('应该支持 round 形状', () => {
      const { container } = renderWithTheme(<Button shape="round">按钮</Button>);
      expect(container.firstChild).toBeInTheDocument();
    });

    test('应该支持 circle 形状', () => {
      const { container } = renderWithTheme(<Button shape="circle">+</Button>);
      expect(container.firstChild).toBeInTheDocument();
    });
  });
});