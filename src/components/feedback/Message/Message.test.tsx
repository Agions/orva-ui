/**
 * Message 消息提示组件单元测试
 * @module components/feedback/Message/Message.test
 */

import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Message } from './Message';

// Mock @tarojs/components
vi.mock('@tarojs/components', () => ({
  View: ({ children, className, style, onClick, ...props }: any) => (
    <div className={className} style={style} onClick={onClick} {...props}>
      {children}
    </div>
  ),
  Text: ({ children, className, ...props }: any) => (
    <span className={className} {...props}>
      {children}
    </span>
  ),
}));

// Mock useTheme
vi.mock('@/hooks/ui/useTheme', () => ({
  useTheme: () => ({
    theme: {
      colors: {
        primary: '#6366f1',
        success: '#10b981',
        error: '#ef4444',
        warning: '#f59e0b',
        info: '#3b82f6',
        text: '#1f2937',
        background: '#fff',
        backgroundCard: '#fff',
        border: '#e5e7eb',
        textSecondary: '#6b7280',
      },
      typography: {
        fontSize: { md: '16px' },
        fontWeight: { semibold: 600 },
      },
      borderRadius: { md: '0.375rem' },
      shadows: { md: '0 4px 6px rgba(0,0,0,0.1)' },
    },
  }),
}));

// Mock useMicroAnimation
vi.mock('@/hooks/ui/useMicroAnimation', () => ({
  useMicroAnimation: () => ({
    isAnimating: false,
    startAnimation: vi.fn(),
    stopAnimation: vi.fn(),
    getMergedStyle: (style: any) => style,
  }),
}));

// Mock useAccessibility
vi.mock('@/hooks/ui/useAccessibility', () => ({
  useAccessibility: () => ({
    handleKeyDown: vi.fn(),
    getAriaAttributes: () => ({}),
  }),
  ARIA_ROLES: { alert: 'alert' },
}));

describe('Message 组件', () => {
  describe('基础渲染', () => {
    it('应该渲染带 content 的 Message', () => {
      const { container } = render(<Message content="这是一条消息" />);
      expect(screen.getByText('这是一条消息')).toBeTruthy();
      expect(container.firstChild).toBeTruthy();
    });

    it('未传 content 时不渲染内容文本', () => {
      const { container } = render(<Message />);
      expect(container.firstChild).toBeTruthy();
    });
  });

  describe('4种类型', () => {
    it.each(['success', 'error', 'warning', 'info'] as const)(
      '应该渲染 %s 类型的 Message',
      (type) => {
        const { container } = render(
          <Message type={type} content={`${type} 消息`} />
        );
        expect(screen.getByText(`${type} 消息`)).toBeTruthy();
        expect(container.firstChild).toBeTruthy();
      }
    );

    it('应该默认渲染 info 类型', () => {
      const { container } = render(<Message content="默认类型" />);
      expect(screen.getByText('默认类型')).toBeTruthy();
    });
  });

  describe('title+content 组合', () => {
    it('应该同时渲染 title 和 content', () => {
      render(<Message title="提示" content="操作成功" />);
      expect(screen.getByText('提示')).toBeTruthy();
      expect(screen.getByText('操作成功')).toBeTruthy();
    });

    it('应该只渲染 title', () => {
      render(<Message title="仅标题" />);
      expect(screen.getByText('仅标题')).toBeTruthy();
    });
  });

  describe('closable 属性', () => {
    it('closable 为 true 时应该显示关闭按钮', () => {
      const { container } = render(
        <Message content="可关闭的消息" closable />
      );
      expect(screen.getByText('✕')).toBeTruthy();
    });

    it('closable 为 false 时不应该显示关闭按钮', () => {
      const { container } = render(
        <Message content="不可关闭" closable={false} />
      );
      expect(screen.queryByText('✕')).toBeNull();
    });

    it('默认不显示关闭按钮', () => {
      render(<Message content="默认关闭" />);
      expect(screen.queryByText('✕')).toBeNull();
    });
  });

  describe('onClose 回调', () => {
    it('点击关闭按钮应该触发 onClose 回调', () => {
      const handleClose = vi.fn();
      render(
        <Message content="关闭测试" closable onClose={handleClose} />
      );

      fireEvent.click(screen.getByText('✕'));
      expect(handleClose).toHaveBeenCalledTimes(1);
    });

    it('关闭后组件应该不可见', () => {
      const { container } = render(
        <Message content="关闭后隐藏" closable />
      );

      expect(screen.getByText('关闭后隐藏')).toBeTruthy();

      fireEvent.click(screen.getByText('✕'));
      // 关闭后 visible 变为 false，组件返回 null
      expect(screen.queryByText('关闭后隐藏')).toBeNull();
    });
  });

  describe('icon 属性', () => {
    it('应该渲染自定义图标', () => {
      const customIcon = <span data-testid="custom-icon">🎉</span>;
      const { container } = render(
        <Message content="带图标的消息" icon={customIcon} />
      );
      expect(container.querySelector('[data-testid="custom-icon"]')).toBeTruthy();
    });

    it('不传 icon 时应该渲染默认类型图标', () => {
      render(<Message type="success" content="成功" />);
      expect(screen.getByText('✓')).toBeTruthy();
    });
  });

  describe('自定义 className/style', () => {
    it('应该应用自定义 className', () => {
      const { container } = render(
        <Message content="自定义类名" className="my-custom-class" />
      );
      expect(container.firstChild).toHaveClass('my-custom-class');
    });

    it('应该应用自定义 style', () => {
      const customStyle = { marginTop: '20px', opacity: 0.8 };
      const { container } = render(
        <Message content="自定义样式" style={customStyle} />
      );
      expect(container.firstChild).toHaveStyle({
        marginTop: '20px',
        opacity: 0.8,
      });
    });
  });
});
