/**
 * Grid 栅格组件单元测试
 * @module components/layout/Grid/Grid.test
 */

import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import { Grid } from './Grid';

vi.mock('@/hooks/ui/useMicroAnimation', () => ({
  useMicroAnimation: () => ({
    getMergedStyle: (style: any) => style,
  }),
}));

vi.mock('@/hooks/ui/useAccessibility', () => ({
  useAccessibility: () => ({
    getAriaAttributes: () => ({}),
  }),
  ARIA_ROLES: { region: 'region' },
}));

describe('Grid 组件', () => {
  describe('基础渲染', () => {
    it('应该渲染默认栅格', () => {
      const { container } = render(<Grid>test</Grid>);
      expect(container.firstChild).toBeTruthy();
    });

    it('应该渲染带 cols 的栅格', () => {
      const { container } = render(<Grid cols={4}>4 columns</Grid>);
      expect(container.firstChild).toBeTruthy();
    });

    it('应该渲染带 rows 的栅格', () => {
      const { container } = render(<Grid rows={3}>3 rows</Grid>);
      expect(container.firstChild).toBeTruthy();
    });
  });

  describe('列数', () => {
    it.each([1, 2, 3, 4, 6, 12, 24] as const)('应该渲染 %d 列栅格', (cols) => {
      const { container } = render(<Grid cols={cols}>test</Grid>);
      expect(container.firstChild).toBeTruthy();
    });
  });

  describe('间距', () => {
    it.each(['small', 'default', 'large'] as const)('应该渲染 %s 间距栅格', (gap) => {
      const { container } = render(<Grid gap={gap}>test</Grid>);
      expect(container.firstChild).toBeTruthy();
    });
  });

  describe('对齐', () => {
    it.each(['stretch', 'center', 'start', 'end'] as const)('应该渲染 %s 对齐栅格', (align) => {
      const { container } = render(<Grid align={align}>test</Grid>);
      expect(container.firstChild).toBeTruthy();
    });
  });

  describe('排列', () => {
    it.each(['start', 'center', 'end', 'space-between', 'space-around'] as const)(
      '应该渲染 %s 排列栅格',
      (justify) => {
        const { container } = render(<Grid justify={justify}>test</Grid>);
        expect(container.firstChild).toBeTruthy();
      }
    );
  });

  describe('自定义属性', () => {
    it('应该应用自定义 className', () => {
      const { container } = render(<Grid className="custom-grid">test</Grid>);
      expect(container.firstChild).toHaveClass('custom-grid');
    });

    it('应该应用自定义 style', () => {
      const { container } = render(
        <Grid style={{ padding: '10px' }}>test</Grid>
      );
      expect(container.firstChild.style.padding).toBe('10px');
    });
  });

  describe('子元素', () => {
    it('应该渲染子元素', () => {
      const { container } = render(
        <Grid>
          <div data-testid="item">item</div>
        </Grid>
      );
      expect(container.querySelector('[data-testid="item"]')).toBeTruthy();
    });
  });
});
