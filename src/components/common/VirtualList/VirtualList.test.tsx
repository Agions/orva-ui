/**
 * VirtualList 虚拟列表组件单元测试
 * @module components/common/VirtualList/VirtualList.test
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { VirtualList } from './VirtualList';

vi.mock('@/hooks/ui/useMicroAnimation', () => ({
  useMicroAnimation: () => ({
    getMergedStyle: (style: any) => style,
  }),
}));

vi.mock('@/hooks/ui/useAccessibility', () => ({
  useAccessibility: () => ({
    getAriaAttributes: () => ({}),
  }),
  ARIA_ROLES: { list: 'list' },
}));

const mockData = Array.from({ length: 100 }, (_, i) => ({ id: i, title: `Item ${i}` }));

describe('VirtualList 组件', () => {
  describe('基础渲染', () => {
    it('应该渲染空列表', () => {
      const { container } = render(
        <VirtualList
          data={[]}
          height={400}
          itemHeight={50}
          itemKey="id"
          renderItem={(item: any) => <div>{item.title}</div>}
        />,
      );
      expect(container.firstChild).toBeTruthy();
    });

    it('应该渲染带数据的列表', () => {
      const { container } = render(
        <VirtualList
          data={mockData}
          height={400}
          itemHeight={50}
          itemKey="id"
          renderItem={(item: any) => <div>{item.title}</div>}
        />,
      );
      expect(container.firstChild).toBeTruthy();
    });
  });

  describe('加载状态', () => {
    it('应该渲染加载中状态', () => {
      const { container } = render(
        <VirtualList
          data={[]}
          height={400}
          itemHeight={50}
          itemKey="id"
          renderItem={(item: any) => <div>{item.title}</div>}
          isLoading
          loading={<div data-testid="loading">加载中...</div>}
        />,
      );
      expect(container.firstChild).toBeTruthy();
    });

    it('应该渲染空数据状态', () => {
      const { container } = render(
        <VirtualList
          data={[]}
          height={400}
          itemHeight={50}
          itemKey="id"
          renderItem={(item: any) => <div>{item.title}</div>}
          empty={<div data-testid="empty">暂无数据</div>}
        />,
      );
      expect(container.firstChild).toBeTruthy();
    });
  });

  describe('自定义属性', () => {
    it('应该应用自定义 className', () => {
      const { container } = render(
        <VirtualList
          data={mockData}
          height={400}
          itemHeight={50}
          itemKey="id"
          renderItem={(item: any) => <div>{item.title}</div>}
          className="custom-list"
        />,
      );
      expect(container.firstChild).toBeTruthy();
    });
  });
});
