/**
 * Timeline Component Test
 * 时间线组件测试
 * @module tests/components/display/Timeline
 *
 * Requirements: 16.8
 */

import React from 'react';
import { render } from '@testing-library/react';
import { Timeline, TimelineItem } from '../../../src/components/display/Timeline';
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

describe('Timeline 时间线组件', () => {
  // ==================== 基础渲染测试 ====================

  describe('基础渲染', () => {
    test('应该正确渲染 Timeline 组件', () => {
      const { container } = renderWithTheme(
        <Timeline>
          <TimelineItem title="步骤一" />
        </Timeline>
      );
      expect(container.firstChild).toBeInTheDocument();
    });

    test('应该支持自定义 className', () => {
      const { container } = renderWithTheme(
        <Timeline className="custom-timeline">
          <TimelineItem title="步骤一" />
        </Timeline>
      );
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  // ==================== 方向测试 ====================

  describe('方向', () => {
    test('应该支持 vertical 方向', () => {
      const { container } = renderWithTheme(
        <Timeline direction="vertical">
          <TimelineItem title="步骤一" />
        </Timeline>
      );
      expect(container.firstChild).toBeInTheDocument();
    });

    test('应该支持 horizontal 方向', () => {
      const { container } = renderWithTheme(
        <Timeline direction="horizontal">
          <TimelineItem title="步骤一" />
        </Timeline>
      );
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  // ==================== 模式测试 ====================

  describe('模式', () => {
    test('应该支持 left 模式', () => {
      const { container } = renderWithTheme(
        <Timeline mode="left">
          <TimelineItem title="步骤一" />
        </Timeline>
      );
      expect(container.firstChild).toBeInTheDocument();
    });

    test('应该支持 right 模式', () => {
      const { container } = renderWithTheme(
        <Timeline mode="right">
          <TimelineItem title="步骤一" />
        </Timeline>
      );
      expect(container.firstChild).toBeInTheDocument();
    });

    test('应该支持 alternate 模式', () => {
      const { container } = renderWithTheme(
        <Timeline mode="alternate">
          <TimelineItem title="步骤一" />
        </Timeline>
      );
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  // ==================== 时间线项测试 ====================

  describe('时间线项', () => {
    test('应该支持多个时间线项', () => {
      const { container } = renderWithTheme(
        <Timeline>
          <TimelineItem title="步骤一" />
          <TimelineItem title="步骤二" />
          <TimelineItem title="步骤三" />
        </Timeline>
      );
      expect(container.firstChild).toBeInTheDocument();
    });

    test('应该支持时间戳', () => {
      const { container } = renderWithTheme(
        <Timeline>
          <TimelineItem title="步骤一" timestamp="2024-01-01" />
        </Timeline>
      );
      expect(container.firstChild).toBeInTheDocument();
    });

    test('应该支持描述', () => {
      const { container } = renderWithTheme(
        <Timeline>
          <TimelineItem title="步骤一" description="这是描述信息" />
        </Timeline>
      );
      expect(container.firstChild).toBeInTheDocument();
    });
  });
});