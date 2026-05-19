/**
 * Container 容器组件单元测试
 * @module components/layout/Container/Container.test
 */

import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import { Container } from './Container';

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

describe('Container 组件', () => {
  describe('基础渲染', () => {
    it('应该渲染默认容器', () => {
      const { container } = render(<Container>test</Container>);
      expect(container.firstChild).toBeTruthy();
    });

    it('应该渲染居中容器', () => {
      const { container } = render(<Container center>centered</Container>);
      expect(container.firstChild).toBeTruthy();
    });
  });

  describe('尺寸', () => {
    it.each(['small', 'default', 'large', 'xlarge'] as const)(
      '应该渲染 %s 尺寸容器',
      (size) => {
        const { container } = render(<Container size={size}>test</Container>);
        expect(container.firstChild).toBeTruthy();
      }
    );
  });

  describe('对齐', () => {
    it.each(['stretch', 'center', 'start', 'end'] as const)(
      '应该渲染 %s 对齐容器',
      (align) => {
        const { container } = render(<Container align={align}>test</Container>);
        expect(container.firstChild).toBeTruthy();
      }
    );
  });

  describe('内边距', () => {
    it.each(['none', 'small', 'medium', 'large'] as const)(
      '应该渲染 %s 内边距容器',
      (padding) => {
        const { container } = render(<Container padding={padding}>test</Container>);
        expect(container.firstChild).toBeTruthy();
      }
    );
  });

  describe('自定义属性', () => {
    it('应该应用自定义 className', () => {
      const { container } = render(<Container className="custom-container">test</Container>);
      expect(container.firstChild).toHaveClass('custom-container');
    });

    it('应该应用自定义 maxWidth', () => {
      const { container } = render(<Container maxWidth={800}>test</Container>);
      expect(container.firstChild).toBeTruthy();
    });
  });

  describe('子元素', () => {
    it('应该渲染子元素', () => {
      const { container } = render(
        <Container>
          <div data-testid="content">content</div>
        </Container>
      );
      expect(container.querySelector('[data-testid="content"]')).toBeTruthy();
    });
  });
});
