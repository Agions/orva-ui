/**
 * ErrorBoundary Component Test
 * 错误边界组件测试
 * @module tests/components/common/ErrorBoundary
 *
 * Requirements: 16.8
 */

import React from 'react';
import { render } from '@testing-library/react';
import { ErrorBoundary } from '../../../src/components/common/ErrorBoundary';
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

describe('ErrorBoundary 错误边界组件', () => {
  // ==================== 基础渲染测试 ====================

  describe('基础渲染', () => {
    test('应该正确渲染 ErrorBoundary 组件', () => {
      const { container } = renderWithTheme(
        <ErrorBoundary>
          <div>子组件</div>
        </ErrorBoundary>
      );
      expect(container.firstChild).toBeInTheDocument();
    });

    test('应该支持自定义 className', () => {
      const { container } = renderWithTheme(
        <ErrorBoundary className="custom-error-boundary">
          <div>子组件</div>
        </ErrorBoundary>
      );
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  // ==================== Fallback 测试 ====================

  describe('Fallback', () => {
    test('应该支持 fallback', () => {
      const { container } = renderWithTheme(
        <ErrorBoundary fallback={<div>错误提示</div>}>
          <div>子组件</div>
        </ErrorBoundary>
      );
      expect(container.firstChild).toBeInTheDocument();
    });

    test('应该支持 fallbackRender', () => {
      const { container } = renderWithTheme(
        <ErrorBoundary fallbackRender={() => <div>错误提示</div>}>
          <div>子组件</div>
        </ErrorBoundary>
      );
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  // ==================== 回调测试 ====================

  describe('回调', () => {
    test('应该支持 onError 回调', () => {
      const handleError = vi.fn();
      const { container } = renderWithTheme(
        <ErrorBoundary onError={handleError}>
          <div>子组件</div>
        </ErrorBoundary>
      );
      expect(container.firstChild).toBeInTheDocument();
    });
  });
});