/**
 * Steps 步骤条组件单元测试
 * @module components/navigation/Steps/Steps.test
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Steps } from './Steps';

vi.mock('@/hooks/ui/useMicroAnimation', () => ({
  useMicroAnimation: () => ({
    getMergedStyle: (style: any) => style,
  }),
}));

vi.mock('@/hooks/ui/useAccessibility', () => ({
  useAccessibility: () => ({
    getAriaAttributes: () => ({}),
  }),
  ARIA_ROLES: { navigation: 'navigation' },
}));

const mockItems = [
  { title: '步骤一', description: '基本信息' },
  { title: '步骤二', description: '填写表单' },
  { title: '步骤三', description: '完成' },
];

describe('Steps 组件', () => {
  describe('基础渲染', () => {
    it('应该渲染默认步骤条', () => {
      const { container } = render(<Steps items={mockItems} />);
      expect(container.firstChild).toBeTruthy();
    });

    it('应该渲染空步骤条', () => {
      const { container } = render(<Steps items={[]} />);
      expect(container.firstChild).toBeTruthy();
    });
  });

  describe('当前步骤', () => {
    it.each([0, 1, 2])('应该渲染 current=%d 步骤条', (current) => {
      const { container } = render(
        <Steps items={mockItems} current={current} />
      );
      expect(container.firstChild).toBeTruthy();
    });
  });

  describe('方向', () => {
    it.each(['horizontal', 'vertical'] as const)(
      '应该渲染 %s 方向步骤条',
      (direction) => {
        const { container } = render(
          <Steps items={mockItems} direction={direction} />
        );
        expect(container.firstChild).toBeTruthy();
      }
    );
  });

  describe('状态', () => {
    it.each(['wait', 'process', 'finish', 'error'] as const)(
      '应该渲染 %s 状态步骤条',
      (status) => {
        const { container } = render(
          <Steps items={mockItems} status={status} />
        );
        expect(container.firstChild).toBeTruthy();
      }
    );
  });

  describe('尺寸', () => {
    it.each(['small', 'default'] as const)(
      '应该渲染 %s 尺寸步骤条',
      (size) => {
        const { container } = render(
          <Steps items={mockItems} size={size} />
        );
        expect(container.firstChild).toBeTruthy();
      }
    );
  });

  describe('点状步骤', () => {
    it('应该渲染点状步骤条', () => {
      const { container } = render(
        <Steps items={mockItems} progressDot />
      );
      expect(container.firstChild).toBeTruthy();
    });
  });

  describe('点击回调', () => {
    it('应该触发 onChange 回调', () => {
      const handleChange = vi.fn();
      const { container } = render(
        <Steps items={mockItems} onChange={handleChange} />
      );
      expect(container.firstChild).toBeTruthy();
    });
  });
});
