import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Typography } from './Typography';

// Mock @tarojs/components
vi.mock('@tarojs/components', () => ({
  Text: ({ children, className, style, onClick, ...props }: any) => (
    <span data-testid="taro-text" className={className} style={style} onClick={onClick} {...props}>
      {children}
    </span>
  ),
  View: ({ children, className, style, onClick, ...props }: any) => (
    <div data-testid="taro-view" className={className} style={style} onClick={onClick} {...props}>
      {children}
    </div>
  ),
  Input: ({ value, onInput, style, ...props }: any) => (
    <input data-testid="taro-input" value={value} style={style} {...props} />
  ),
  Button: ({ children, onClick, style, ...props }: any) => (
    <button data-testid="taro-button" onClick={onClick} style={style} {...props}>
      {children}
    </button>
  ),
}));

// Mock @/hooks/ui/useMicroAnimation
vi.mock('@/hooks/ui/useMicroAnimation', () => ({
  useMicroAnimation: () => ({
    transition: 'none',
    hoverStyle: {},
    focusStyle: {},
    pressStyle: {},
    errorStyle: {},
    getMergedStyle: (baseStyle: any) => baseStyle,
  }),
}));

// Mock @/hooks/ui/useAccessibility
vi.mock('@/hooks/ui/useAccessibility', () => ({
  useAccessibility: () => ({
    handleKeyDown: vi.fn(),
    getAriaAttributes: () => ({}),
    getAccessibilityProps: () => ({}),
    isKeyboardAccessible: true,
    isFocusable: true,
  }),
  ARIA_ROLES: {
    text: 'text',
    link: 'link',
    button: 'button',
    heading: 'heading',
    paragraph: 'paragraph',
  },
}));

// Mock @/utils/createComponent
vi.mock('@/utils/createComponent', () => ({
  createComponent: ({ render }: any) => {
    const Component = React.forwardRef((props: any, ref: any) => render(props, ref));
    Component.displayName = 'MockComponent';
    return Component;
  },
}));

// Mock @/utils/logger
vi.mock('@/utils/logger', () => ({
  createLogger: () => ({
    error: vi.fn(),
    warn: vi.fn(),
    info: vi.fn(),
    debug: vi.fn(),
  }),
}));

describe('Typography 组件', () => {
  describe('基础渲染', () => {
    it('应该正确渲染文本内容', () => {
      render(<Typography>基础文本</Typography>);
      expect(screen.getByText('基础文本')).toBeTruthy();
    });

    it('应该在没有 children 时正常渲染', () => {
      const { container } = render(<Typography />);
      expect(container.querySelector('[data-testid="taro-text"]')).toBeTruthy();
    });

    it('应该支持 type 属性', () => {
      render(<Typography type="title">标题类型</Typography>);
      expect(screen.getByText('标题类型')).toBeTruthy();
    });
  });

  describe('Typography.Title', () => {
    it('应该渲染 level=1 标题', () => {
      render(<Typography.Title level={1}>一级标题</Typography.Title>);
      expect(screen.getByText('一级标题')).toBeTruthy();
    });

    it('应该渲染 level=2 标题', () => {
      render(<Typography.Title level={2}>二级标题</Typography.Title>);
      expect(screen.getByText('二级标题')).toBeTruthy();
    });

    it('应该渲染 level=3 标题', () => {
      render(<Typography.Title level={3}>三级标题</Typography.Title>);
      expect(screen.getByText('三级标题')).toBeTruthy();
    });

    it('应该渲染 level=4 标题', () => {
      render(<Typography.Title level={4}>四级标题</Typography.Title>);
      expect(screen.getByText('四级标题')).toBeTruthy();
    });

    it('应该渲染 level=5 标题', () => {
      render(<Typography.Title level={5}>五级标题</Typography.Title>);
      expect(screen.getByText('五级标题')).toBeTruthy();
    });

    it('应该渲染 level=6 标题', () => {
      render(<Typography.Title level={6}>六级标题</Typography.Title>);
      expect(screen.getByText('六级标题')).toBeTruthy();
    });

    it('应该默认渲染 h1', () => {
      render(<Typography.Title>默认标题</Typography.Title>);
      expect(screen.getByText('默认标题')).toBeTruthy();
    });

    it('应该支持自定义 className', () => {
      render(<Typography.Title level={1} className="custom-title">带类名标题</Typography.Title>);
      expect(screen.getByText('带类名标题')).toBeTruthy();
    });

    it('应该支持自定义 style', () => {
      render(<Typography.Title level={1} style={{ color: 'red' }}>带样式标题</Typography.Title>);
      expect(screen.getByText('带样式标题')).toBeTruthy();
    });
  });

  describe('Typography.Paragraph', () => {
    it('应该正确渲染段落', () => {
      render(<Typography.Paragraph>这是一个段落内容</Typography.Paragraph>);
      expect(screen.getByText('这是一个段落内容')).toBeTruthy();
    });

    it('应该支持自定义 className', () => {
      render(<Typography.Paragraph className="custom-para">自定义段落</Typography.Paragraph>);
      expect(screen.getByText('自定义段落')).toBeTruthy();
    });

    it('应该支持自定义 style', () => {
      render(<Typography.Paragraph style={{ lineHeight: 1.8 }}>自定义样式段落</Typography.Paragraph>);
      expect(screen.getByText('自定义样式段落')).toBeTruthy();
    });
  });

  describe('Typography.Text', () => {
    it('应该正确渲染普通文本', () => {
      render(<Typography.Text>普通文本内容</Typography.Text>);
      expect(screen.getByText('普通文本内容')).toBeTruthy();
    });

    it('应该支持自定义 className', () => {
      render(<Typography.Text className="custom-text">自定义文本</Typography.Text>);
      expect(screen.getByText('自定义文本')).toBeTruthy();
    });

    it('应该支持自定义 style', () => {
      render(<Typography.Text style={{ fontSize: '14px' }}>自定义样式文本</Typography.Text>);
      expect(screen.getByText('自定义样式文本')).toBeTruthy();
    });
  });

  describe('自定义 className/style', () => {
    it('应该应用自定义 className', () => {
      render(<Typography className="my-typography">自定义类名</Typography>);
      expect(screen.getByText('自定义类名')).toBeTruthy();
    });

    it('应该应用自定义 style', () => {
      render(<Typography style={{ padding: '10px' }}>自定义样式</Typography>);
      expect(screen.getByText('自定义样式')).toBeTruthy();
    });

    it('应该同时应用 className 和 style', () => {
      render(
        <Typography className="my-class" style={{ margin: '5px' }}>
          组合样式
        </Typography>,
      );
      expect(screen.getByText('组合样式')).toBeTruthy();
    });
  });
});
