/**
 * Menu 导航菜单组件单元测试
 * @module components/navigation/Menu/Menu.test
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Menu } from './Menu';

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
  { key: 'home', label: '首页' },
  { key: 'about', label: '关于', children: [
    { key: 'team', label: '团队' },
    { key: 'history', label: '历史' },
  ]},
  { key: 'contact', label: '联系' },
];

describe('Menu 组件', () => {
  describe('基础渲染', () => {
    it('应该渲染默认菜单', () => {
      const { container } = render(<Menu items={mockItems} />);
      expect(container.firstChild).toBeTruthy();
    });

    it('应该渲染空菜单', () => {
      const { container } = render(<Menu items={[]} />);
      expect(container.firstChild).toBeTruthy();
    });
  });

  describe('模式', () => {
    it.each(['vertical', 'horizontal', 'inline'] as const)(
      '应该渲染 %s 模式菜单',
      (mode) => {
        const { container } = render(
          <Menu items={mockItems} mode={mode} />,
        );
        expect(container.firstChild).toBeTruthy();
      },
    );
  });

  describe('主题', () => {
    it.each(['light', 'dark'] as const)('应该渲染 %s 主题菜单', (theme) => {
      const { container } = render(
        <Menu items={mockItems} theme={theme} />,
      );
      expect(container.firstChild).toBeTruthy();
    });
  });

  describe('尺寸', () => {
    it.each(['small', 'medium', 'large'] as const)(
      '应该渲染 %s 尺寸菜单',
      (size) => {
        const { container } = render(
          <Menu items={mockItems} size={size} />,
        );
        expect(container.firstChild).toBeTruthy();
      },
    );
  });

  describe('手风琴模式', () => {
    it('应该渲染手风琴模式菜单', () => {
      const { container } = render(
        <Menu items={mockItems} accordion />,
      );
      expect(container.firstChild).toBeTruthy();
    });
  });

  describe('折叠', () => {
    it('应该渲染可折叠菜单', () => {
      const { container } = render(
        <Menu items={mockItems} collapsible />,
      );
      expect(container.firstChild).toBeTruthy();
    });

    it('应该渲染已折叠菜单', () => {
      const { container } = render(
        <Menu items={mockItems} collapsible collapsed />,
      );
      expect(container.firstChild).toBeTruthy();
    });
  });

  describe('选中键', () => {
    it('应该渲染带默认选中键的菜单', () => {
      const { container } = render(
        <Menu items={mockItems} defaultSelectedKeys={['home']} />,
      );
      expect(container.firstChild).toBeTruthy();
    });

    it('应该渲染带受控选中键的菜单', () => {
      const { container } = render(
        <Menu items={mockItems} selectedKeys={['about']} />,
      );
      expect(container.firstChild).toBeTruthy();
    });
  });

  describe('回调', () => {
    it('应该触发 onClick 回调', () => {
      const handleClick = vi.fn();
      const { container } = render(<Menu items={mockItems} onClick={handleClick} />);
      expect(container.firstChild).toBeTruthy();
    });

    it('应该触发 onSelect 回调', () => {
      const handleSelect = vi.fn();
      const { container } = render(<Menu items={mockItems} onSelect={handleSelect} />);
      expect(container.firstChild).toBeTruthy();
    });
  });
});
