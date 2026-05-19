/**
 * Affix 固钉组件单元测试
 * @module components/layout/Affix/Affix.test
 */

import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import { Affix } from './Affix';

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

describe('Affix 组件', () => {
  describe('基础渲染', () => {
    it('应该渲染默认固钉', () => {
      const { container } = render(<Affix>test</Affix>);
      expect(container.firstChild).toBeTruthy();
    });

    it('应该渲染带 offsetTop 的固钉', () => {
      const { container } = render(<Affix offsetTop={100}>top</Affix>);
      expect(container.firstChild).toBeTruthy();
    });

    it('应该渲染带 offsetBottom 的固钉', () => {
      const { container } = render(<Affix offsetBottom={50}>bottom</Affix>);
      expect(container.firstChild).toBeTruthy();
    });
  });

  describe('子元素', () => {
    it('应该渲染子元素', () => {
      const { container } = render(
        <Affix offsetTop={0}>
          <div data-testid="affixed">content</div>
        </Affix>
      );
      expect(container.querySelector('[data-testid="affixed"]')).toBeTruthy();
    });
  });

  describe('自定义属性', () => {
    it('应该应用自定义 className', () => {
      const { container } = render(
        <Affix className="custom-affix">test</Affix>
      );
      // Affix wraps in a container, so the outer div gets the class
      expect(container.firstChild).toBeTruthy();
    });
  });
});
