/**
 * Row 栅格行组件单元测试
 * @module components/layout/Row/Row.test
 */

import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import { Row } from './Row';

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

describe('Row 组件', () => {
  describe('基础渲染', () => {
    it('应该渲染默认行', () => {
      const { container } = render(<Row>test</Row>);
      expect(container.firstChild).toBeTruthy();
    });

    it('应该渲染带 gutter 的行', () => {
      const { container } = render(<Row gutter={16}>gutter</Row>);
      expect(container.firstChild).toBeTruthy();
    });
  });

  describe('对齐', () => {
    it.each(['top', 'middle', 'bottom'] as const)('应该渲染 %s 对齐行', (align) => {
      const { container } = render(<Row align={align}>test</Row>);
      expect(container.firstChild).toBeTruthy();
    });
  });

  describe('排列', () => {
    it.each(['start', 'center', 'end', 'space-between', 'space-around'] as const)(
      '应该渲染 %s 排列行',
      (justify) => {
        const { container } = render(<Row justify={justify}>test</Row>);
        expect(container.firstChild).toBeTruthy();
      },
    );
  });

  describe('换行', () => {
    it('应该渲染换行行', () => {
      const { container } = render(<Row wrap>test</Row>);
      expect(container.firstChild).toBeTruthy();
    });

    it('应该渲染不换行行', () => {
      const { container } = render(<Row wrap={false}>test</Row>);
      expect(container.firstChild).toBeTruthy();
    });
  });

  describe('自定义属性', () => {
    it('应该应用自定义 className', () => {
      const { container } = render(<Row className="custom-row">test</Row>);
      expect(container.firstChild).toHaveClass('custom-row');
    });
  });
});
