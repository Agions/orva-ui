/**
 * Col 栅格列组件单元测试
 * @module components/layout/Col/Col.test
 */

import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import { Col } from './Col';

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

describe('Col 组件', () => {
  describe('基础渲染', () => {
    it('应该渲染默认列', () => {
      const { container } = render(<Col>test</Col>);
      expect(container.firstChild).toBeTruthy();
    });

    it('应该渲染带 span 的列', () => {
      const { container } = render(<Col span={12}>half</Col>);
      expect(container.firstChild).toBeTruthy();
    });

    it('应该渲染全宽列', () => {
      const { container } = render(<Col span={24}>full</Col>);
      expect(container.firstChild).toBeTruthy();
    });
  });

  describe('跨度', () => {
    it.each([1, 2, 4, 6, 8, 12, 16, 24] as const)('应该渲染 span=%d 列', (span) => {
      const { container } = render(<Col span={span}>test</Col>);
      expect(container.firstChild).toBeTruthy();
    });
  });

  describe('偏移', () => {
    it.each([0, 4, 8, 12] as const)('应该渲染 offset=%d 列', (offset) => {
      const { container } = render(<Col offset={offset}>test</Col>);
      expect(container.firstChild).toBeTruthy();
    });
  });

  describe('排序', () => {
    it.each([0, 1, 2, 3] as const)('应该渲染 order=%d 列', (order) => {
      const { container } = render(<Col order={order}>test</Col>);
      expect(container.firstChild).toBeTruthy();
    });
  });

  describe('自定义属性', () => {
    it('应该应用自定义 className', () => {
      const { container } = render(<Col className="custom-col">test</Col>);
      expect(container.firstChild).toHaveClass('custom-col');
    });
  });
});
