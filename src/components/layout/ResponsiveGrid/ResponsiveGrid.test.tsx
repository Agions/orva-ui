/**
 * ResponsiveGrid 响应式栅格组件单元测试
 * @module components/layout/ResponsiveGrid/ResponsiveGrid.test
 */

import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import { ResponsiveGrid, ResponsiveGridItem, ResponsiveGridPresets } from './ResponsiveGrid';

vi.mock('@/utils/responsiveUtils', () => ({
  useResponsive: () => ({
    getResponsiveValue: (val: any) => {
      if (typeof val === 'object' && val !== null) {
        return val.xs ?? val.sm ?? val.md ?? val.lg ?? val.xl ?? Object.values(val)[0];
      }
      return val;
    },
    generateResponsiveStyles: (styles: any) => styles,
    platform: 'web',
  }),
  ResponsiveValue: undefined as any,
}));

describe('ResponsiveGrid 组件', () => {
  describe('基础渲染', () => {
    it('应该渲染默认响应式栅格', () => {
      const { container } = render(
        <ResponsiveGrid>
          <div>item</div>
        </ResponsiveGrid>,
      );
      expect(container.firstChild).toBeTruthy();
    });

    it('应该渲染带自定义列数的栅格', () => {
      const { container } = render(
        <ResponsiveGrid columns={{ xs: 1, md: 2 }}>
          <div>a</div>
          <div>b</div>
        </ResponsiveGrid>,
      );
      expect(container.firstChild).toBeTruthy();
    });
  });

  describe('间距', () => {
    it('应该渲染带 gap 的栅格', () => {
      const { container } = render(
        <ResponsiveGrid gap="16px">
          <div>item</div>
        </ResponsiveGrid>,
      );
      expect(container.firstChild).toBeTruthy();
    });

    it('应该渲染带 rowGap 和 columnGap 的栅格', () => {
      const { container } = render(
        <ResponsiveGrid rowGap="8px" columnGap="16px">
          <div>item</div>
        </ResponsiveGrid>,
      );
      expect(container.firstChild).toBeTruthy();
    });
  });

  describe('对齐', () => {
    it.each(['start', 'center', 'end', 'stretch'] as const)(
      '应该渲染 %s 对齐栅格',
      (align) => {
        const { container } = render(
          <ResponsiveGrid align={align}>
            <div>item</div>
          </ResponsiveGrid>,
        );
        expect(container.firstChild).toBeTruthy();
      },
    );
  });

  describe('ResponsiveGridItem', () => {
    it('应该渲染栅格项', () => {
      const { container } = render(
        <ResponsiveGridItem span={2}>
          <div>item</div>
        </ResponsiveGridItem>,
      );
      expect(container.firstChild).toBeTruthy();
    });

    it('应该渲染带 offset 的栅格项', () => {
      const { container } = render(
        <ResponsiveGridItem span={2} offset={1}>
          <div>item</div>
        </ResponsiveGridItem>,
      );
      expect(container.firstChild).toBeTruthy();
    });
  });

  describe('预设布局', () => {
    it('应该渲染 TwoColumns 预设', () => {
      const { container } = render(
        <ResponsiveGridPresets.TwoColumns>
          <div>a</div>
          <div>b</div>
        </ResponsiveGridPresets.TwoColumns>,
      );
      expect(container.firstChild).toBeTruthy();
    });

    it('应该渲染 ThreeColumns 预设', () => {
      const { container } = render(
        <ResponsiveGridPresets.ThreeColumns>
          <div>a</div>
        </ResponsiveGridPresets.ThreeColumns>,
      );
      expect(container.firstChild).toBeTruthy();
    });

    it('应该渲染 FourColumns 预设', () => {
      const { container } = render(
        <ResponsiveGridPresets.FourColumns>
          <div>a</div>
        </ResponsiveGridPresets.FourColumns>,
      );
      expect(container.firstChild).toBeTruthy();
    });

    it('应该渲染 CardLayout 预设', () => {
      const { container } = render(
        <ResponsiveGridPresets.CardLayout>
          <div>a</div>
        </ResponsiveGridPresets.CardLayout>,
      );
      expect(container.firstChild).toBeTruthy();
    });

    it('应该渲染 ListLayout 预设', () => {
      const { container } = render(
        <ResponsiveGridPresets.ListLayout>
          <div>a</div>
        </ResponsiveGridPresets.ListLayout>,
      );
      expect(container.firstChild).toBeTruthy();
    });

    it('应该渲染 DashboardLayout 预设', () => {
      const { container } = render(
        <ResponsiveGridPresets.DashboardLayout>
          <div>a</div>
        </ResponsiveGridPresets.DashboardLayout>,
      );
      expect(container.firstChild).toBeTruthy();
    });
  });
});
