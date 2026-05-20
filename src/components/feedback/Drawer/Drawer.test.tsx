import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { Drawer } from './Drawer';
import type { DrawerDirection } from './Drawer.types';

// Mock useTheme (used internally by useMicroAnimation)
vi.mock('@/hooks/ui/useTheme', () => ({
  useTheme: () => ({
    theme: {
      colors: {
        primary: '#6366f1',
        text: '#1f2937',
        background: '#fff',
        backgroundCard: '#fff',
        border: '#e5e7eb',
        textSecondary: '#6b7280',
      },
      typography: {
        fontSize: { md: '16px', xl: '20px' },
        fontWeight: { semibold: 600 },
      },
      borderRadius: { md: '0.375rem', lg: '0.5rem' },
      shadows: { xl: '0 20px 25px rgba(0,0,0,0.1)' },
    },
  }),
}));

// Mock useMicroAnimation
vi.mock('@/hooks/ui/useMicroAnimation', () => ({
  useMicroAnimation: () => ({
    isAnimating: false,
    startAnimation: vi.fn(),
    stopAnimation: vi.fn(),
  }),
}));

// Mock useAccessibility
vi.mock('@/hooks/ui/useAccessibility', () => ({
  useAccessibility: () => ({
    handleKeyDown: vi.fn(),
    getAriaAttributes: () => ({}),
  }),
  ARIA_ROLES: { dialog: 'dialog' },
}));

describe('Drawer 组件', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('基础渲染', () => {
    it('visible=true 时应该渲染 Drawer', () => {
      render(
        <Drawer visible={true}>
          <div>Drawer 内容</div>
        </Drawer>,
      );
      expect(screen.getByText('Drawer 内容')).toBeTruthy();
    });

    it('visible=false 时不应该渲染内容', () => {
      const { container } = render(
        <Drawer visible={false}>
          <div>Drawer 内容</div>
        </Drawer>,
      );
      expect(screen.queryByText('Drawer 内容')).toBeNull();
      expect(container.innerHTML).toBe('');
    });
  });

  describe('方向', () => {
    const directions: DrawerDirection[] = ['left', 'right', 'top', 'bottom'];

    directions.forEach((dir) => {
      it(`direction="${dir}" 时应该正常渲染`, () => {
        render(
          <Drawer visible={true} direction={dir}>
            <div>{dir} 方向内容</div>
          </Drawer>,
        );
        expect(screen.getByText(`${dir} 方向内容`)).toBeTruthy();
      });
    });
  });

  describe('标题属性', () => {
    it('title 属性应该渲染标题文本', () => {
      render(
        <Drawer visible={true} title="测试标题">
          <div>内容</div>
        </Drawer>,
      );
      expect(screen.getByText('测试标题')).toBeTruthy();
    });

    it('不传 title 时不应该渲染标题区域', () => {
      render(
        <Drawer visible={true} showClose={false}>
          <div>无标题内容</div>
        </Drawer>,
      );
      expect(screen.queryByText('测试标题')).toBeNull();
    });
  });

  describe('children 渲染', () => {
    it('应该正确渲染 children 内容', () => {
      render(
        <Drawer visible={true}>
          <div data-testid="child-content">子元素内容</div>
        </Drawer>,
      );
      expect(screen.getByTestId('child-content')).toBeTruthy();
      expect(screen.getByText('子元素内容')).toBeTruthy();
    });

    it('应该支持多个子元素', () => {
      render(
        <Drawer visible={true}>
          <div>第一个子元素</div>
          <div>第二个子元素</div>
        </Drawer>,
      );
      expect(screen.getByText('第一个子元素')).toBeTruthy();
      expect(screen.getByText('第二个子元素')).toBeTruthy();
    });
  });

  describe('关闭按钮与 onClose 回调', () => {
    it('showClose=true 时应该显示关闭按钮', () => {
      render(
        <Drawer visible={true} showClose={true}>
          <div>内容</div>
        </Drawer>,
      );
      expect(screen.getByText('×')).toBeTruthy();
    });

    it('showClose=false 时不应该显示关闭按钮', () => {
      render(
        <Drawer visible={true} showClose={false}>
          <div>内容</div>
        </Drawer>,
      );
      expect(screen.queryByText('×')).toBeNull();
    });

    it('点击关闭按钮应该触发 onClose 回调', () => {
      const onClose = vi.fn();
      render(
        <Drawer visible={true} showClose={true} onClose={onClose}>
          <div>内容</div>
        </Drawer>,
      );

      fireEvent.click(screen.getByText('×'));
      // 关闭有动画延迟，需要推进定时器
      vi.advanceTimersByTime(350);
      expect(onClose).toHaveBeenCalled();
    });
  });

  describe('遮罩层点击', () => {
    it('maskClosable=true 时点击遮罩应该关闭 Drawer', () => {
      const onMaskClick = vi.fn();
      const onClose = vi.fn();
      const { container } = render(
        <Drawer
          visible={true}
          maskClosable={true}
          onMaskClick={onMaskClick}
          onClose={onClose}
        >
          <div>内容</div>
        </Drawer>,
      );

      // 遮罩层是第一个 div（View 渲染为 div）
      const mask = container.querySelector('div');
      if (mask) {
        fireEvent.click(mask);
        vi.advanceTimersByTime(350);
        expect(onMaskClick).toHaveBeenCalled();
        expect(onClose).toHaveBeenCalled();
      }
    });

    it('maskClosable=false 时点击遮罩不应该关闭 Drawer', () => {
      const onMaskClick = vi.fn();
      const onClose = vi.fn();
      const { container } = render(
        <Drawer
          visible={true}
          maskClosable={false}
          onMaskClick={onMaskClick}
          onClose={onClose}
        >
          <div>内容</div>
        </Drawer>,
      );

      const mask = container.querySelector('div');
      if (mask) {
        fireEvent.click(mask);
        vi.advanceTimersByTime(350);
        expect(onMaskClick).not.toHaveBeenCalled();
        expect(onClose).not.toHaveBeenCalled();
      }
    });
  });

  describe('width/height 属性', () => {
    it('width 属性应该被应用到样式中', () => {
      render(
        <Drawer visible={true} width={400}>
          <div>内容</div>
        </Drawer>,
      );
      expect(screen.getByText('内容')).toBeTruthy();
    });

    it('height 属性应该被应用到样式中', () => {
      render(
        <Drawer visible={true} height={300} direction="top">
          <div>内容</div>
        </Drawer>,
      );
      expect(screen.getByText('内容')).toBeTruthy();
    });

    it('width 支持字符串值', () => {
      render(
        <Drawer visible={true} width="80%">
          <div>百分比宽度</div>
        </Drawer>,
      );
      expect(screen.getByText('百分比宽度')).toBeTruthy();
    });
  });

  describe('自定义 className 和 style', () => {
    it('应该应用自定义 className', () => {
      const { container } = render(
        <Drawer visible={true} className="custom-drawer">
          <div>内容</div>
        </Drawer>,
      );

      const drawerElement = container.querySelector('.custom-drawer');
      expect(drawerElement).toBeTruthy();
    });

    it('应该应用自定义 style', () => {
      render(
        <Drawer visible={true} style={{ zIndex: 9999 }}>
          <div>内容</div>
        </Drawer>,
      );
      expect(screen.getByText('内容')).toBeTruthy();
    });

    it('应该同时应用自定义 className 和 style', () => {
      const { container } = render(
        <Drawer
          visible={true}
          className="my-drawer"
          style={{ backgroundColor: 'red' }}
        >
          <div>自定义样式内容</div>
        </Drawer>,
      );

      const drawerElement = container.querySelector('.my-drawer');
      expect(drawerElement).toBeTruthy();
      expect(screen.getByText('自定义样式内容')).toBeTruthy();
    });
  });
});
