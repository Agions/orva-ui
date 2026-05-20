/**
 * PageHeader 页面头部组件单元测试
 * @module components/navigation/PageHeader/PageHeader.test
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { PageHeader } from './PageHeader';

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

describe('PageHeader 组件', () => {
  describe('基础渲染', () => {
    it('应该渲染默认页面头部', () => {
      const { container } = render(<PageHeader />);
      expect(container.firstChild).toBeTruthy();
    });

    it('应该渲染带标题的页面头部', () => {
      render(<PageHeader title="页面标题" />);
      expect(screen.getByText('页面标题')).toBeInTheDocument();
    });
  });

  describe('返回按钮', () => {
    it('应该渲染带返回图标的页面头部', () => {
      const { container } = render(<PageHeader backIcon />);
      expect(container.firstChild).toBeTruthy();
    });
  });

  describe('面包屑', () => {
    it('应该渲染带面包屑的页面头部', () => {
      const { container } = render(
        <PageHeader
          breadcrumb={[
            { title: '首页' },
            { title: '列表' },
            { title: '详情' },
          ]}
        />,
      );
      expect(container.firstChild).toBeTruthy();
    });
  });

  describe('操作区', () => {
    it('应该渲染带操作区的页面头部', () => {
      render(
        <PageHeader
          extra={<button data-testid="action">操作</button>}
        />,
      );
      expect(screen.getByTestId('action')).toBeInTheDocument();
    });
  });

  describe('子标题', () => {
    it('应该渲染带子标题的页面头部', () => {
      render(<PageHeader title="主标题" subtitle="子标题" />);
      expect(screen.getByText('子标题')).toBeInTheDocument();
    });
  });
});
