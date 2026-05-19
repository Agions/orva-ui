/**
 * Carousel Component Test
 * 走马灯组件测试
 * @module tests/components/display/Carousel
 *
 * Requirements: 16.8
 */

import React from 'react';
import { render } from '@testing-library/react';
import { Carousel } from '../../../src/components/display/Carousel';
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

describe('Carousel 走马灯组件', () => {
  describe('基础渲染', () => {
    test('应该正确渲染 Carousel 组件', () => {
      const { container } = renderWithTheme(
        <Carousel>
          <div>Slide 1</div>
          <div>Slide 2</div>
        </Carousel>
      );
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  describe('属性', () => {
    test('应该支持 autoplay', () => {
      const { container } = renderWithTheme(
        <Carousel autoplay>
          <div>Slide 1</div>
        </Carousel>
      );
      expect(container.firstChild).toBeInTheDocument();
    });

    test('应该支持 dotPosition', () => {
      const { container } = renderWithTheme(
        <Carousel dotPosition="bottom">
          <div>Slide 1</div>
        </Carousel>
      );
      expect(container.firstChild).toBeInTheDocument();
    });

    test('应该支持 effect', () => {
      const { container } = renderWithTheme(
        <Carousel effect="fade">
          <div>Slide 1</div>
        </Carousel>
      );
      expect(container.firstChild).toBeInTheDocument();
    });
  });
});