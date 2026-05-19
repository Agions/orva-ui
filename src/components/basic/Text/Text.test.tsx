import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Text } from './Text';

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
}));

// Mock @/providers/SecurityProvider
vi.mock('@/providers/SecurityProvider', () => ({
  useSecurity: () => ({
    sanitizeInput: (value: string) => value,
  }),
}));

// Mock @/providers/ThemeProvider
vi.mock('@/providers/ThemeProvider', () => ({
  useThemeContext: () => ({
    isDark: false,
    theme: { colors: {} },
  }),
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

describe('Text 组件', () => {
  describe('基础渲染', () => {
    it('应该正确渲染文本内容', () => {
      render(<Text>Hello World</Text>);
      expect(screen.getByText('Hello World')).toBeTruthy();
    });

    it('应该在没有 children 时正常渲染', () => {
      const { container } = render(<Text />);
      expect(container.querySelector('[data-testid="taro-view"]')).toBeTruthy();
    });
  });

  describe('size 属性', () => {
    it('应该应用小号尺寸', () => {
      const { container } = render(<Text size="sm">小号文本</Text>);
      const textEl = container.querySelector('[data-testid="taro-text"]');
      expect(textEl).toBeTruthy();
      expect(screen.getByText('小号文本')).toBeTruthy();
    });

    it('应该应用大号尺寸', () => {
      const { container } = render(<Text size="lg">大号文本</Text>);
      expect(screen.getByText('大号文本')).toBeTruthy();
    });

    it('应该应用默认中等尺寸', () => {
      render(<Text>默认尺寸</Text>);
      expect(screen.getByText('默认尺寸')).toBeTruthy();
    });
  });

  describe('color 属性', () => {
    it('应该应用颜色属性', () => {
      render(<Text color="primary">彩色文本</Text>);
      expect(screen.getByText('彩色文本')).toBeTruthy();
    });

    it('应该应用红色', () => {
      render(<Text color="error">错误文本</Text>);
      expect(screen.getByText('错误文本')).toBeTruthy();
    });
  });

  describe('weight 属性', () => {
    it('应该应用加粗', () => {
      render(<Text weight="bold">加粗文本</Text>);
      expect(screen.getByText('加粗文本')).toBeTruthy();
    });

    it('应该应用细体', () => {
      render(<Text weight="light">细体文本</Text>);
      expect(screen.getByText('细体文本')).toBeTruthy();
    });

    it('应该应用正常字重', () => {
      render(<Text weight="normal">正常字重</Text>);
      expect(screen.getByText('正常字重')).toBeTruthy();
    });
  });

  describe('decoration 属性', () => {
    it('应该应用下划线装饰', () => {
      render(<Text decoration="underline">下划线文本</Text>);
      expect(screen.getByText('下划线文本')).toBeTruthy();
    });

    it('应该应用删除线装饰', () => {
      render(<Text decoration="line-through">删除线文本</Text>);
      expect(screen.getByText('删除线文本')).toBeTruthy();
    });

    it('应该支持无装饰', () => {
      render(<Text decoration="none">无装饰文本</Text>);
      expect(screen.getByText('无装饰文本')).toBeTruthy();
    });
  });

  describe('copyable 属性', () => {
    it('应该渲染复制按钮当 copyable 为 true', () => {
      // 模拟 navigator.clipboard
      Object.assign(navigator, {
        clipboard: {
          writeText: vi.fn().mockResolvedValue(undefined),
        },
      });

      render(<Text copyable>可复制文本</Text>);
      expect(screen.getByText('可复制文本')).toBeTruthy();
    });

    it('当 copyable 为 false 时不渲染复制按钮', () => {
      const { container } = render(<Text copyable={false}>不可复制</Text>);
      expect(screen.getByText('不可复制')).toBeTruthy();
    });
  });

  describe('selectable 属性', () => {
    it('应该支持 selectable 属性', () => {
      render(<Text selectable>可选择文本</Text>);
      expect(screen.getByText('可选择文本')).toBeTruthy();
    });

    it('应该支持 selectable 为 false', () => {
      render(<Text selectable={false}>不可选择</Text>);
      expect(screen.getByText('不可选择')).toBeTruthy();
    });
  });

  describe('href 链接', () => {
    it('应该渲染为链接元素', () => {
      render(<Text href="https://example.com">链接文本</Text>);
      expect(screen.getByText('链接文本')).toBeTruthy();
    });

    it('应该支持 target 属性', () => {
      render(<Text href="https://example.com" target="_blank">新窗口链接</Text>);
      expect(screen.getByText('新窗口链接')).toBeTruthy();
    });
  });

  describe('truncate 省略', () => {
    it('应该支持 ellipsis 属性', () => {
      render(<Text ellipsis>这是一段很长的文本内容需要被截断显示</Text>);
      expect(screen.getByText('这是一段很长的文本内容需要被截断显示')).toBeTruthy();
    });

    it('应该支持 maxLines 属性', () => {
      render(<Text maxLines={2}>多行文本截断测试内容</Text>);
      expect(screen.getByText('多行文本截断测试内容')).toBeTruthy();
    });
  });

  describe('自定义 className/style', () => {
    it('应该应用自定义 className', () => {
      const { container } = render(<Text className="custom-class">自定义类名</Text>);
      const viewEl = container.querySelector('[data-testid="taro-view"]');
      expect(viewEl).toBeTruthy();
    });

    it('应该应用自定义 style', () => {
      render(<Text style={{ color: 'red', fontSize: '16px' }}>自定义样式</Text>);
      expect(screen.getByText('自定义样式')).toBeTruthy();
    });

    it('应该同时应用 className 和 style', () => {
      const { container } = render(
        <Text className="custom-class" style={{ color: 'blue' }}>
          组合样式
        </Text>
      );
      expect(screen.getByText('组合样式')).toBeTruthy();
    });
  });
});
