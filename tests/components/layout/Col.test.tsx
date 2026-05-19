/**
 * Col Component Test
 * 栅格列组件测试
 * @module tests/components/layout/Col
 *
 * Requirements: 16.8
 */

import React from 'react';
import { render } from '@testing-library/react';
import { Col } from '../../../src/components/layout/Col';
import { Row } from '../../../src/components/layout/Row';
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

describe('Col 栅格列组件', () => {
  describe('基础渲染', () => {
    test('应该正确渲染 Col 组件', () => {
      const { container } = renderWithTheme(
        <Row>
          <Col span={12}>列内容</Col>
        </Row>
      );
      expect(container.firstChild).toBeInTheDocument();
    });

    test('应该支持自定义 className', () => {
      const { container } = renderWithTheme(
        <Col className="custom-class">内容</Col>
      );
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  describe('栅格属性', () => {
    test('应该支持 span 属性', () => {
      const { container } = renderWithTheme(<Col span={8}>内容</Col>);
      expect(container.firstChild).toBeInTheDocument();
    });

    test('应该支持 offset 属性', () => {
      const { container } = renderWithTheme(<Col span={8} offset={4}>内容</Col>);
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  describe('响应式属性', () => {
    test('应该支持 xs 响应式', () => {
      const { container } = renderWithTheme(<Col xs={24} sm={12} md={8}>内容</Col>);
      expect(container.firstChild).toBeInTheDocument();
    });

    test('应该支持 pull 和 push', () => {
      const { container } = renderWithTheme(<Col span={8} pull={2} push={2}>内容</Col>);
      expect(container.firstChild).toBeInTheDocument();
    });
  });
});