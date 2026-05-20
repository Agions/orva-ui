/**
 * Space 间距组件单元测试
 * @module components/layout/Space/Space.test
 */

import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import { Space } from './Space';

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

describe('Space 组件', () => {
  describe('基础渲染', () => {
    it('应该渲染默认间距', () => {
      const { container } = render(
        <Space>
          <span>a</span>
          <span>b</span>
        </Space>,
      );
      expect(container.firstChild).toBeTruthy();
    });

    it('应该渲染单个子元素', () => {
      const { container } = render(<Space><span>only</span></Space>);
      expect(container.firstChild).toBeTruthy();
    });

    it('应该渲染空间距', () => {
      const { container } = render(<Space />);
      expect(container.firstChild).toBeTruthy();
    });
  });

  describe('方向', () => {
    it.each(['horizontal', 'vertical'] as const)('应该渲染 %s 方向间距', (direction) => {
      const { container } = render(
        <Space direction={direction}>
          <span>a</span>
          <span>b</span>
        </Space>,
      );
      expect(container.firstChild).toBeTruthy();
    });
  });

  describe('尺寸', () => {
    it.each(['small', 'default', 'large'] as const)('应该渲染 %s 尺寸间距', (size) => {
      const { container } = render(
        <Space size={size}>
          <span>a</span>
          <span>b</span>
        </Space>,
      );
      expect(container.firstChild).toBeTruthy();
    });
  });

  describe('对齐', () => {
    it.each(['start', 'end', 'center', 'baseline'] as const)(
      '应该渲染 %s 对齐间距',
      (align) => {
        const { container } = render(
          <Space align={align}>
            <span>a</span>
            <span>b</span>
          </Space>,
        );
        expect(container.firstChild).toBeTruthy();
      },
    );
  });

  describe('换行', () => {
    it.each(['nowrap', 'wrap', 'wrap-reverse'] as const)('应该渲染 %s 间距', (wrap) => {
      const { container } = render(
        <Space wrap={wrap}>
          <span>a</span>
          <span>b</span>
        </Space>,
      );
      expect(container.firstChild).toBeTruthy();
    });
  });

  describe('分隔符', () => {
    it('应该渲染带分隔符的间距', () => {
      const { container } = render(
        <Space separator="-">
          <span>a</span>
          <span>b</span>
        </Space>,
      );
      expect(container.firstChild).toBeTruthy();
    });
  });

  describe('自定义属性', () => {
    it('应该应用自定义 className', () => {
      const { container } = render(
        <Space className="custom-space">
          <span>a</span>
        </Space>,
      );
      expect(container.firstChild).toHaveClass('custom-space');
    });
  });
});
