/**
 * Progress 进度条组件单元测试
 * @module components/feedback/Progress/Progress.test
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Progress } from './Progress';

vi.mock('@/hooks/ui/useMicroAnimation', () => ({
  useMicroAnimation: () => ({
    getMergedStyle: (style: unknown) => style,
  }),
}));

vi.mock('@/hooks/ui/useAccessibility', () => ({
  useAccessibility: () => ({
    getAriaAttributes: () => ({}),
  }),
  ARIA_ROLES: { progressbar: 'progressbar' },
}));

describe('Progress 组件', () => {
  describe('基础渲染', () => {
    it('应该渲染默认进度条', () => {
      const { container } = render(<Progress percent={50} />);
      expect(container.firstChild).toBeTruthy();
    });

    it('应该渲染带百分比的进度条', () => {
      render(<Progress percent={75} />);
      expect(screen.getByText('75%')).toBeInTheDocument();
    });
  });

  describe('类型', () => {
    it.each(['line', 'circle', 'dashboard'] as const)('应该渲染 %s 类型', (type) => {
      const { container } = render(<Progress type={type} percent={50} />);
      expect(container.firstChild).toBeTruthy();
    });
  });

  describe('状态', () => {
    it.each(['normal', 'success', 'exception', 'active'] as const)(
      '应该渲染 %s 状态',
      (status) => {
        const { container } = render(
          <Progress percent={50} status={status as 'normal' | 'success' | 'exception' | 'active'} />,
        );
        expect(container.firstChild).toBeTruthy();
      },
    );
  });

  describe('尺寸', () => {
    it.each(['small', 'default', 'large'] as const)('应该渲染 %s 尺寸', (size) => {
      const { container } = render(<Progress percent={50} size={size} />);
      expect(container.firstChild).toBeTruthy();
    });
  });

  describe('显示信息', () => {
    it('应该显示进度信息', () => {
      render(<Progress percent={60} showInfo />);
      expect(screen.getByText('60%')).toBeInTheDocument();
    });

    it('应该隐藏进度信息', () => {
      const { container } = render(<Progress percent={60} showInfo={false} />);
      expect(container.firstChild).toBeTruthy();
    });
  });

  describe('样式', () => {
    it('应该应用自定义 className', () => {
      const { container } = render(<Progress percent={50} className="custom-progress" />);
      expect(container.querySelector('.custom-progress')).toBeInTheDocument();
    });

    it('应该应用自定义 style', () => {
      render(<Progress percent={50} style={{ margin: 20 }} />);
      expect(document.querySelector('.orva-ui-h5-progress')).toBeTruthy();
    });
  });
});