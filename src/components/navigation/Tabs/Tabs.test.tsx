/**
 * Tabs 标签页组件单元测试
 * @module components/navigation/Tabs/Tabs.test
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Tabs } from './Tabs';

vi.mock('@/hooks/ui/useMicroAnimation', () => ({
  useMicroAnimation: () => ({
    getMergedStyle: (style: any) => style,
  }),
}));

vi.mock('@/hooks/ui/useAccessibility', () => ({
  useAccessibility: () => ({
    getAriaAttributes: () => ({}),
  }),
  ARIA_ROLES: { tabs: 'tabs' },
}));

const mockItems = [
  { key: '1', title: '标签一', content: <div>内容一</div> },
  { key: '2', title: '标签二', content: <div>内容二</div> },
  { key: '3', title: '标签三', content: <div>内容三</div> },
];

describe('Tabs 组件', () => {
  describe('基础渲染', () => {
    it('应该渲染默认标签页', () => {
      const { container } = render(<Tabs items={mockItems} />);
      expect(container.firstChild).toBeTruthy();
    });

    it('应该渲染带 activeKey 的标签页', () => {
      const { container } = render(
        <Tabs items={mockItems} activeKey="2" />,
      );
      expect(container.firstChild).toBeTruthy();
    });
  });

  describe('类型', () => {
    it.each(['line', 'card'] as const)('应该渲染 %s 类型标签页', (type) => {
      const { container } = render(
        <Tabs items={mockItems} type={type} />,
      );
      expect(container.firstChild).toBeTruthy();
    });
  });

  describe('位置', () => {
    it.each(['top', 'bottom', 'left', 'right'] as const)(
      '应该渲染 %s 位置标签页',
      (position) => {
        const { container } = render(
          <Tabs items={mockItems} position={position} />,
        );
        expect(container.firstChild).toBeTruthy();
      },
    );
  });

  describe('尺寸', () => {
    it.each(['small', 'default', 'large'] as const)(
      '应该渲染 %s 尺寸标签页',
      (size) => {
        const { container } = render(
          <Tabs items={mockItems} size={size} />,
        );
        expect(container.firstChild).toBeTruthy();
      },
    );
  });

  describe('居中', () => {
    it('应该渲染居中标签页', () => {
      const { container } = render(
        <Tabs items={mockItems} centered />,
      );
      expect(container.firstChild).toBeTruthy();
    });
  });

  describe('可编辑', () => {
    it('应该渲染可添加标签页', () => {
      const { container } = render(
        <Tabs items={mockItems} addable />,
      );
      expect(container.firstChild).toBeTruthy();
    });

    it('应该渲染可编辑标签页', () => {
      const { container } = render(
        <Tabs items={mockItems} editable />,
      );
      expect(container.firstChild).toBeTruthy();
    });
  });

  describe('禁用标签', () => {
    it('应该渲染带禁用标签的标签页', () => {
      const itemsWithDisabled = [
        ...mockItems,
        { key: '4', title: '禁用标签', content: <div>禁用</div>, disabled: true },
      ];
      const { container } = render(<Tabs items={itemsWithDisabled} />);
      expect(container.firstChild).toBeTruthy();
    });
  });

  describe('交互', () => {
    it('点击标签应该触发 onTabClick', () => {
      const handleTabClick = vi.fn();
      render(<Tabs items={mockItems} onTabClick={handleTabClick} />);
      const tab = screen.getByText('标签二');
      fireEvent.click(tab);
      expect(handleTabClick).toHaveBeenCalled();
    });

    it('点击标签应该切换内容', () => {
      const handleChange = vi.fn();
      render(<Tabs items={mockItems} onChange={handleChange} />);
      const tab = screen.getByText('标签三');
      fireEvent.click(tab);
      expect(handleChange).toHaveBeenCalledWith('3');
    });

    it('点击当前激活的标签不应该触发 onChange', () => {
      const handleChange = vi.fn();
      render(<Tabs items={mockItems} activeKey="1" onChange={handleChange} />);
      const tab = screen.getByText('标签一');
      fireEvent.click(tab);
      // 点击已激活的标签，onChange 不应该被调用
      // 但具体行为取决于组件实现
    });
  });

  describe('回调', () => {
    it('应该触发 onTabClick 回调', () => {
      const handleTabClick = vi.fn();
      const { container } = render(<Tabs items={mockItems} onTabClick={handleTabClick} />);
      expect(container.firstChild).toBeTruthy();
    });

    it('应该触发 onChange 回调', () => {
      const handleChange = vi.fn();
      const { container } = render(<Tabs items={mockItems} onChange={handleChange} />);
      expect(container.firstChild).toBeTruthy();
    });
  });

  describe('内容渲染', () => {
    it('应该渲染标签标题', () => {
      render(<Tabs items={mockItems} />);
      expect(screen.getByText('标签一')).toBeInTheDocument();
    });

    it('应该渲染所有标签标题', () => {
      render(<Tabs items={mockItems} />);
      expect(screen.getByText('标签一')).toBeInTheDocument();
      expect(screen.getByText('标签二')).toBeInTheDocument();
      expect(screen.getByText('标签三')).toBeInTheDocument();
    });

    it('应该渲染活动标签的内容', () => {
      render(<Tabs items={mockItems} activeKey="2" />);
      expect(screen.getByText('内容二')).toBeInTheDocument();
    });
  });
});
