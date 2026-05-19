/**
 * ResponsiveContainer 响应式容器组件单元测试
 * @module components/layout/ResponsiveContainer/ResponsiveContainer.test
 */

import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import { ResponsiveContainer } from './ResponsiveContainer';

vi.mock('@/utils/responsiveUtils', () => ({
  useResponsive: () => ({
    windowHeight: 800,
    generateResponsiveStyles: (styles: any) => styles,
    getResponsiveValue: (val: any) => {
      if (typeof val === 'object' && val !== null) {
        return val.xs ?? val.sm ?? val.md ?? val.lg ?? val.xl ?? Object.values(val)[0];
      }
      return val;
    },
    safeArea: { top: 0, bottom: 0, left: 0, right: 0 },
    platform: 'web',
  }),
  ResponsiveStyle: undefined as any,
  ResponsiveValue: undefined as any,
}));

describe('ResponsiveContainer 组件', () => {
  describe('基础渲染', () => {
    it('应该渲染默认响应式容器', () => {
      const { container } = render(
        <ResponsiveContainer>
          <div>content</div>
        </ResponsiveContainer>
      );
      expect(container.firstChild).toBeTruthy();
    });

    it('应该渲染带 children 的容器', () => {
      const { container } = render(
        <ResponsiveContainer>
          <div data-testid="child">child</div>
        </ResponsiveContainer>
      );
      expect(container.querySelector('[data-testid="child"]')).toBeTruthy();
    });
  });

  describe('安全区域', () => {
    it('应该渲染带安全区域的容器', () => {
      const { container } = render(
        <ResponsiveContainer safeArea>
          <div>content</div>
        </ResponsiveContainer>
      );
      expect(container.firstChild).toBeTruthy();
    });
  });

  describe('自定义属性', () => {
    it('应该应用自定义 className', () => {
      const { container } = render(
        <ResponsiveContainer className="custom-container">
          <div>content</div>
        </ResponsiveContainer>
      );
      expect(container.firstChild).toBeTruthy();
    });

    it('应该应用自定义 padding', () => {
      const { container } = render(
        <ResponsiveContainer padding="20px">
          <div>content</div>
        </ResponsiveContainer>
      );
      expect(container.firstChild).toBeTruthy();
    });

    it('应该应用自定义 margin', () => {
      const { container } = render(
        <ResponsiveContainer margin="10px">
          <div>content</div>
        </ResponsiveContainer>
      );
      expect(container.firstChild).toBeTruthy();
    });

    it('应该应用自定义 maxWidth', () => {
      const { container } = render(
        <ResponsiveContainer maxWidth="800px">
          <div>content</div>
        </ResponsiveContainer>
      );
      expect(container.firstChild).toBeTruthy();
    });

    it('应该应用自定义 backgroundColor', () => {
      const { container } = render(
        <ResponsiveContainer backgroundColor="#fff">
          <div>content</div>
        </ResponsiveContainer>
      );
      expect(container.firstChild).toBeTruthy();
    });

    it('应该应用自定义 borderRadius', () => {
      const { container } = render(
        <ResponsiveContainer borderRadius="8px">
          <div>content</div>
        </ResponsiveContainer>
      );
      expect(container.firstChild).toBeTruthy();
    });
  });
});
