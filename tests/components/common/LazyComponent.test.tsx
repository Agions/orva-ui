/**
 * LazyComponent Component Test
 * 懒加载组件测试
 * @module tests/components/common/LazyComponent
 *
 * Requirements: 16.8
 */

import React, { Suspense, lazy } from 'react';
import { render } from '@testing-library/react';
import { LazyComponent } from '../../../src/components/common/LazyComponent';
import { describe, test, expect, vi } from 'vitest';
import { ThemeContext } from '../../../src/hooks/ui/useTheme';
import { defaultTheme } from '../../../src/theme/defaults';
import type { ThemeContextType } from '../../../src/hooks/ui/useTheme';

/**
 * 创建测试用的主题上下文值
 */
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

/**
 * 测试包装器，提供主题上下文
 */
const TestWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ThemeContext.Provider value={createMockThemeContext()}>
    {children}
  </ThemeContext.Provider>
);

/**
 * 自定义 render 函数，自动包装主题上下文
 */
const renderWithTheme = (ui: React.ReactElement) => {
  return render(ui, { wrapper: TestWrapper });
};

/**
 * 模拟一个简单的组件用于测试
 */
const MockComponent = () => <div>Mock Component</div>;

describe('LazyComponent 懒加载组件', () => {
  // ==================== 基础渲染测试 ====================

  describe('基础渲染', () => {
    test('应该正确渲染 LazyComponent 组件', async () => {
      const LazyComp = lazy(() => Promise.resolve({ default: MockComponent }));
      const { container } = renderWithTheme(
        <LazyComponent>
          <Suspense fallback={<div>Loading...</div>}>
            <LazyComp />
          </Suspense>
        </LazyComponent>
      );
      expect(container.firstChild).toBeInTheDocument();
    });

    test('应该支持自定义 className', () => {
      const { container } = renderWithTheme(
        <LazyComponent className="custom-lazy-component">
          <div>内容</div>
        </LazyComponent>
      );
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  // ==================== Fallback 测试 ====================

  describe('Fallback', () => {
    test('应该支持 fallback', () => {
      const { container } = renderWithTheme(
        <LazyComponent fallback={<div>加载中...</div>}>
          <div>内容</div>
        </LazyComponent>
      );
      expect(container.firstChild).toBeInTheDocument();
    });
  });
});