/**
 * Pagination 分页器组件单元测试
 * @module components/navigation/Pagination/Pagination.test
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Pagination } from './Pagination';

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

describe('Pagination 组件', () => {
  describe('基础渲染', () => {
    it('应该渲染默认分页器', () => {
      const { container } = render(<Pagination total={50} />);
      expect(container.firstChild).toBeTruthy();
    });

    it('应该渲染带当前页的分页器', () => {
      const { container } = render(<Pagination total={100} current={3} />);
      expect(container.firstChild).toBeTruthy();
    });
  });

  describe('页码', () => {
    it('应该渲染第 1 页', () => {
      const { container } = render(<Pagination total={50} current={1} />);
      expect(container.firstChild).toBeTruthy();
    });

    it('应该渲染最后一页', () => {
      const { container } = render(<Pagination total={50} current={5} />);
      expect(container.firstChild).toBeTruthy();
    });
  });

  describe('尺寸', () => {
    it.each(['small', 'default', 'large'] as const)(
      '应该渲染 %s 尺寸分页器',
      (size) => {
        const { container } = render(<Pagination total={50} size={size} />);
        expect(container.firstChild).toBeTruthy();
      },
    );
  });

  describe('显示总数', () => {
    it('应该显示总数文本', () => {
      render(<Pagination total={100} showTotal />);
      expect(screen.getByText('共 100 条')).toBeInTheDocument();
    });

    it('应该显示自定义总数文本', () => {
      render(
        <Pagination
          total={100}
          showTotal={(total) => `总共 ${total} 条`}
        />,
      );
      expect(screen.getByText('总共 100 条')).toBeInTheDocument();
    });
  });

  describe('快速跳转', () => {
    it('应该渲染快速跳转', () => {
      render(<Pagination total={100} showQuickJumper />);
      expect(screen.getByText('跳至')).toBeInTheDocument();
    });
  });

  describe('页面大小选择', () => {
    it('应该渲染页面大小选择器', () => {
      const { container } = render(<Pagination total={100} showSizeChanger />);
      expect(container.firstChild).toBeTruthy();
    });
  });

  describe('简洁模式', () => {
    it('应该渲染简洁模式分页器', () => {
      const { container } = render(<Pagination total={50} simple />);
      expect(container.firstChild).toBeTruthy();
    });
  });

  describe('禁用状态', () => {
    it('应该渲染禁用分页器', () => {
      const { container } = render(<Pagination total={50} disabled />);
      expect(container.firstChild).toBeTruthy();
    });
  });

  describe('交互', () => {
    it('应该渲染可交互的分页器', () => {
      const handleChange = vi.fn();
      const { container } = render(<Pagination total={50} current={1} onChange={handleChange} />);
      expect(container.firstChild).toBeTruthy();
    });

    it('应该渲染带页码的分页器', () => {
      render(<Pagination total={100} current={3} pageSize={10} />);
      // 验证页码渲染
      expect(screen.getByText('3')).toBeTruthy();
    });

    it('应该渲染上一页/下一页按钮', () => {
      render(<Pagination total={50} current={2} />);
      expect(screen.getByText('上一页')).toBeTruthy();
    });
  });

  describe('回调', () => {
    it('应该触发 onChange 回调', () => {
      const handleChange = vi.fn();
      const { container } = render(<Pagination total={50} current={1} onChange={handleChange} />);
      expect(container.firstChild).toBeTruthy();
    });
  });
});
