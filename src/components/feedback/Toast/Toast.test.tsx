/**
 * Toast 轻提示组件单元测试
 * @module components/feedback/Toast/Toast.test
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Toast } from './Toast';

vi.mock('@/hooks/ui/useMicroAnimation', () => ({
  useMicroAnimation: () => ({
    getMergedStyle: (style: unknown) => style,
  }),
}));

vi.mock('@/hooks/ui/useAccessibility', () => ({
  useAccessibility: () => ({
    getAriaAttributes: () => ({}),
  }),
  ARIA_ROLES: { alert: 'alert' },
}));

describe('Toast 组件', () => {
  describe('基础渲染', () => {
    it('应该渲染默认提示', () => {
      const { container } = render(<Toast message="提示内容" visible />);
      expect(container.firstChild).toBeTruthy();
    });

    it('应该显示消息文本', () => {
      render(<Toast message="操作成功" visible />);
      expect(screen.getByText('操作成功')).toBeInTheDocument();
    });
  });

  describe('类型', () => {
    it.each(['info', 'success', 'warning', 'error', 'loading'] as const)(
      '应该渲染 %s 类型',
      (type) => {
        const { container } = render(<Toast message="提示" type={type} visible />);
        expect(container.firstChild).toBeTruthy();
      }
    );
  });

  describe('位置', () => {
    it.each(['top', 'center', 'bottom'] as const)('应该渲染 %s 位置', (position) => {
      const { container } = render(<Toast message="提示" position={position} visible />);
      expect(container.firstChild).toBeTruthy();
    });
  });

  describe('可见性控制', () => {
    it('应该渲染可见的 Toast', () => {
      const { container } = render(<Toast message="可见提示" visible />);
      expect(container.firstChild).toBeTruthy();
    });
  });
});