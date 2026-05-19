/**
 * Row Component Test
 * 栅格行组件测试
 * @module tests/components/layout/Row
 *
 * Requirements: 16.8
 */

import React from 'react';
import { render } from '@testing-library/react';
import { Row } from '../../../src/components/layout/Row';
import { Col } from '../../../src/components/layout/Col';
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

describe('Row 栅格行组件', () => {
  describe('基础渲染', () => {
    test('应该正确渲染 Row 组件', () => {
      const { container } = renderWithTheme(
        <Row>
          <Col span={12}>Col 1</Col>
          <Col span={12}>Col 2</Col>
        </Row>
      );
      expect(container.firstChild).toBeInTheDocument();
    });

    test('应该支持自定义 className', () => {
      const { container } = renderWithTheme(
        <Row className="custom-class">
          <Col span={12}>Col</Col>
        </Row>
      );
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  describe('间距属性', () => {
    test('应该支持 gutter 属性', () => {
      const { container } = renderWithTheme(
        <Row gutter={16}>
          <Col span={12}>Col</Col>
        </Row>
      );
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  describe('对齐方式', () => {
    test('应该支持 start 对齐', () => {
      const { container } = renderWithTheme(<Row justify="start"><Col>Col</Col></Row>);
      expect(container.firstChild).toBeInTheDocument();
    });

    test('应该支持 center 对齐', () => {
      const { container } = renderWithTheme(<Row justify="center"><Col>Col</Col></Row>);
      expect(container.firstChild).toBeInTheDocument();
    });

    test('应该支持 end 对齐', () => {
      const { container } = renderWithTheme(<Row justify="end"><Col>Col</Col></Row>);
      expect(container.firstChild).toBeInTheDocument();
    });
  });
});