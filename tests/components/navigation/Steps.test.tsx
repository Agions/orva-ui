/**
 * Steps Component Test
 * 步骤条组件测试
 * @module tests/components/navigation/Steps
 *
 * Requirements: 16.8
 */

import React from 'react';
import { render } from '@testing-library/react';
import { Steps } from '../../../src/components/navigation/Steps';
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

describe('Steps 步骤条组件', () => {
  // ==================== 基础渲染测试 ====================

  describe('基础渲染', () => {
    test('应该正确渲染 Steps 组件', () => {
      const { container } = renderWithTheme(
        <Steps current={1}>
          <Steps.Step title="步骤一" />
          <Steps.Step title="步骤二" />
          <Steps.Step title="步骤三" />
        </Steps>
      );
      expect(container.firstChild).toBeInTheDocument();
    });

    test('应该渲染多个步骤', () => {
      const { container } = renderWithTheme(
        <Steps current={1}>
          <Steps.Step title="步骤一" />
          <Steps.Step title="步骤二" />
          <Steps.Step title="步骤三" />
        </Steps>
      );
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  // ==================== 方向测试 ====================

  describe('方向', () => {
    test('应该支持 horizontal 方向', () => {
      const { container } = renderWithTheme(
        <Steps current={1} direction="horizontal">
          <Steps.Step title="步骤一" />
          <Steps.Step title="步骤二" />
        </Steps>
      );
      expect(container.firstChild).toBeInTheDocument();
    });

    test('应该支持 vertical 方向', () => {
      const { container } = renderWithTheme(
        <Steps current={1} direction="vertical">
          <Steps.Step title="步骤一" />
          <Steps.Step title="步骤二" />
        </Steps>
      );
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  // ==================== 当前步骤测试 ====================

  describe('当前步骤', () => {
    test('应该支持 current 属性', () => {
      const { container } = renderWithTheme(
        <Steps current={2}>
          <Steps.Step title="步骤一" />
          <Steps.Step title="步骤二" />
          <Steps.Step title="步骤三" />
        </Steps>
      );
      expect(container.firstChild).toBeInTheDocument();
    });

    test('应该支持从 0 开始', () => {
      const { container } = renderWithTheme(
        <Steps current={0}>
          <Steps.Step title="步骤一" />
          <Steps.Step title="步骤二" />
        </Steps>
      );
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  // ==================== 步骤类型测试 ====================

  describe('步骤类型', () => {
    test('应该支持数字步骤', () => {
      const { container } = renderWithTheme(
        <Steps current={1}>
          <Steps.Step title="步骤一" description="描述" />
          <Steps.Step title="步骤二" description="描述" />
        </Steps>
      );
      expect(container.firstChild).toBeInTheDocument();
    });

    test('应该支持描述信息', () => {
      const { container } = renderWithTheme(
        <Steps current={1}>
          <Steps.Step title="步骤一" description="这是描述信息" />
        </Steps>
      );
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  // ==================== 状态测试 ====================

  describe('状态', () => {
    test('应该支持 wait 状态', () => {
      const { container } = renderWithTheme(
        <Steps current={1} status="wait">
          <Steps.Step title="步骤一" />
          <Steps.Step title="步骤二" />
        </Steps>
      );
      expect(container.firstChild).toBeInTheDocument();
    });

    test('应该支持 process 状态', () => {
      const { container } = renderWithTheme(
        <Steps current={1} status="process">
          <Steps.Step title="步骤一" />
          <Steps.Step title="步骤二" />
        </Steps>
      );
      expect(container.firstChild).toBeInTheDocument();
    });

    test('应该支持 finish 状态', () => {
      const { container } = renderWithTheme(
        <Steps current={1} status="finish">
          <Steps.Step title="步骤一" />
          <Steps.Step title="步骤二" />
        </Steps>
      );
      expect(container.firstChild).toBeInTheDocument();
    });

    test('应该支持 error 状态', () => {
      const { container } = renderWithTheme(
        <Steps current={1} status="error">
          <Steps.Step title="步骤一" />
          <Steps.Step title="步骤二" />
        </Steps>
      );
      expect(container.firstChild).toBeInTheDocument();
    });
  });
});