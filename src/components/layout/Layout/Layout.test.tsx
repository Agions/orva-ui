/**
 * Layout 布局组件单元测试
 * @module components/layout/Layout/Layout.test
 */

import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import { Layout } from './Layout';

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

describe('Layout 组件', () => {
  describe('基础渲染', () => {
    it('应该渲染默认布局', () => {
      const { container } = render(<Layout>test</Layout>);
      expect(container.firstChild).toBeTruthy();
    });

    it('应该渲染带 hasSider 的布局', () => {
      const { container } = render(<Layout hasSider>sider layout</Layout>);
      expect(container.firstChild).toBeTruthy();
    });

    it('应该渲染空布局', () => {
      const { container } = render(<Layout />);
      expect(container.firstChild).toBeTruthy();
    });
  });

  describe('自定义属性', () => {
    it('应该应用自定义 className', () => {
      const { container } = render(<Layout className="custom-layout">test</Layout>);
      expect(container.firstChild).toHaveClass('custom-layout');
    });

    it('应该应用自定义 style', () => {
      const { container } = render(
        <Layout style={{ backgroundColor: 'red' }}>test</Layout>,
      );
      expect(container.firstChild.style.backgroundColor).toBe('red');
    });
  });

  describe('子元素', () => {
    it('应该渲染子元素', () => {
      const { container } = render(
        <Layout>
          <div data-testid="child">child</div>
        </Layout>,
      );
      expect(container.querySelector('[data-testid="child"]')).toBeTruthy();
    });
  });
});
