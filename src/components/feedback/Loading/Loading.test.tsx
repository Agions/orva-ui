/**
 * Loading 加载组件单元测试
 * @module components/feedback/Loading/Loading.test
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { Loading } from './Loading';

vi.mock('@/hooks/ui/useAccessibility', () => ({
  useAccessibility: () => ({
    getAriaAttributes: () => ({}),
  }),
  ARIA_ROLES: { status: 'status' },
}));

describe('Loading 组件', () => {
  describe('基础渲染', () => {
    it('应该渲染默认加载组件', () => {
      const { container } = render(<Loading />);
      expect(container.firstChild).toBeTruthy();
    });

    it('应该渲染带文本的加载组件', () => {
      render(<Loading text="加载中..." />);
      expect(screen.getByText('加载中...')).toBeInTheDocument();
    });
  });

  describe('类型', () => {
    it.each(['spinner', 'dots', 'pulse', 'bars'] as const)('应该渲染 %s 类型', (type) => {
      const { container } = render(<Loading type={type} />);
      expect(container.firstChild).toBeTruthy();
    });
  });

  describe('尺寸', () => {
    it.each(['small', 'default', 'large'] as const)('应该渲染 %s 尺寸', (size) => {
      const { container } = render(<Loading size={size} />);
      expect(container.firstChild).toBeTruthy();
    });
  });

  describe('延迟', () => {
    it('delay=0 时应该立即显示', () => {
      const { container } = render(<Loading delay={0} />);
      expect(container.firstChild).toBeTruthy();
    });
  });

  describe('样式', () => {
    it('应该应用自定义 className', () => {
      const { container } = render(<Loading className="custom-loading" />);
      expect(container.querySelector('.custom-loading')).toBeInTheDocument();
    });
  });
});