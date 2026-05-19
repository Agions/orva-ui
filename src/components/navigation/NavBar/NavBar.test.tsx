/**
 * NavBar 导航栏组件单元测试
 * @module components/navigation/NavBar/NavBar.test
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { NavBar } from './NavBar';

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

describe('NavBar 组件', () => {
  describe('基础渲染', () => {
    it('应该渲染默认导航栏', () => {
      const { container } = render(<NavBar />);
      expect(container.firstChild).toBeTruthy();
    });

    it('应该渲染带标题的导航栏', () => {
      render(<NavBar title="首页" />);
      expect(screen.getByText('首页')).toBeInTheDocument();
    });
  });

  describe('返回按钮', () => {
    it('应该渲染返回按钮', () => {
      const { container } = render(<NavBar backArrow />);
      expect(container.querySelector('.orva-ui-navbar__back-arrow')).toBeTruthy();
    });

    it('应该渲染自定义返回图标', () => {
      render(<NavBar backArrow backIcon="←" />);
      expect(screen.getByText('←')).toBeInTheDocument();
    });

    it('点击返回按钮应该触发 onBack', () => {
      const handleBack = vi.fn();
      const { container } = render(<NavBar backArrow onBack={handleBack} />);
      fireEvent.click(container.querySelector('.orva-ui-navbar__back-arrow')!);
      expect(handleBack).toHaveBeenCalledTimes(1);
    });
  });

  describe('左右侧内容', () => {
    it('应该渲染左侧内容', () => {
      render(<NavBar left={<span data-testid="left">左侧</span>} />);
      expect(screen.getByTestId('left')).toBeInTheDocument();
    });

    it('应该渲染右侧内容', () => {
      render(<NavBar right={<span data-testid="right">右侧</span>} />);
      expect(screen.getByTestId('right')).toBeInTheDocument();
    });
  });

  describe('主题', () => {
    it('应该渲染浅色主题', () => {
      const { container } = render(<NavBar theme="light" />);
      expect(container.firstChild).toBeTruthy();
    });

    it('应该渲染深色主题', () => {
      const { container } = render(<NavBar theme="dark" />);
      expect(container.firstChild).toBeTruthy();
    });
  });

  describe('定位', () => {
    it('应该渲染固定定位导航栏', () => {
      const { container } = render(<NavBar position="fixed" />);
      expect(container.firstChild).toBeTruthy();
    });

    it('应该渲染静态定位导航栏', () => {
      const { container } = render(<NavBar position="static" />);
      expect(container.firstChild).toBeTruthy();
    });
  });

  describe('透明模式', () => {
    it('应该渲染透明导航栏', () => {
      const { container } = render(<NavBar transparent />);
      expect(container.firstChild).toBeTruthy();
    });
  });

  describe('边框', () => {
    it('应该渲染无边框导航栏', () => {
      const { container } = render(<NavBar border={false} />);
      expect(container.firstChild).toBeTruthy();
    });
  });
});
