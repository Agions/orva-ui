import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { RichText } from './RichText';

// Mock @tarojs/taro
vi.mock('@tarojs/taro', () => ({
  default: {
    getSystemInfoSync: () => ({ platform: 'ios' }),
  },
}));

// Mock @/hooks/ui/useTheme
vi.mock('@/hooks/ui/useTheme', () => ({
  useTheme: () => ({
    theme: {
      colors: {
        primary: '#6366f1',
        text: '#1f2937',
        background: '#ffffff',
        backgroundCard: '#ffffff',
        border: '#e5e7eb',
        textSecondary: '#6b7280',
      },
      spacing: {
        sm: '0.5rem',
        md: '1rem',
        lg: '1.5rem',
      },
      typography: {
        fontSize: { md: '16px', xl: '20px' },
        fontWeight: { semibold: 600 },
      },
      borderRadius: { md: '0.375rem', lg: '0.5rem' },
      shadows: {
        none: 'none',
        sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        md: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
        lg: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
      },
    },
  }),
}));

// Mock @/hooks/ui/useMicroAnimation
vi.mock('@/hooks/ui/useMicroAnimation', () => ({
  useMicroAnimation: () => ({
    isAnimating: false,
    startAnimation: vi.fn(),
    stopAnimation: vi.fn(),
    getMergedStyle: (style: object) => style,
    transition: '150ms ease',
    hoverStyle: {},
    focusStyle: {},
    pressStyle: {},
    errorStyle: {},
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
  ARIA_ROLES: { article: 'article', dialog: 'dialog' },
}));

describe('RichText 基础渲染', () => {
  it('渲染空 RichText 不抛出错误', () => {
    expect(() => render(<RichText />)).not.toThrow();
  });

  it('渲染时创建容器元素', () => {
    const { container } = render(<RichText />);
    expect(container.firstChild).toBeTruthy();
  });
});

describe('RichText nodes 属性（数组节点）', () => {
  it('渲染文本类型节点', () => {
    const nodes = [
      { type: 'text', content: 'Hello World' },
    ];
    render(<RichText content={nodes} />);
    expect(screen.getByText('Hello World')).toBeTruthy();
  });

  it('渲染段落类型节点', () => {
    const nodes = [
      { type: 'p', content: '这是一段文字' },
    ];
    render(<RichText content={nodes} />);
    expect(screen.getByText('这是一段文字')).toBeTruthy();
  });

  it('渲染标题类型节点', () => {
    const nodes = [
      { type: 'h1', content: '主标题' },
    ];
    render(<RichText content={nodes} />);
    expect(screen.getByText('主标题')).toBeTruthy();
  });

  it('渲染嵌套子节点', () => {
    const nodes = [
      {
        type: 'p',
        content: [
          { type: 'text', content: '嵌套文本' },
        ],
      },
    ];
    render(<RichText content={nodes} />);
    expect(screen.getByText('嵌套文本')).toBeTruthy();
  });

  it('渲染多个节点', () => {
    const nodes = [
      { type: 'h2', content: '标题二' },
      { type: 'p', content: '段落内容' },
    ];
    render(<RichText content={nodes} />);
    expect(screen.getByText('标题二')).toBeTruthy();
    expect(screen.getByText('段落内容')).toBeTruthy();
  });
});

describe('RichText content 属性（HTML字符串）', () => {
  it('content 为字符串时渲染为段落', () => {
    render(<RichText content="纯文本内容" />);
    expect(screen.getByText('纯文本内容')).toBeTruthy();
  });

  it('content 为 JSON 字符串时解析为节点数组', () => {
    const jsonContent = JSON.stringify([
      { type: 'p', content: 'JSON 解析的段落' },
    ]);
    render(<RichText content={jsonContent} />);
    expect(screen.getByText('JSON 解析的段落')).toBeTruthy();
  });
});

describe('RichText 空节点', () => {
  it('content 为 undefined 时不渲染内容', () => {
    const { container } = render(<RichText content={undefined} />);
    const element = container.firstElementChild as HTMLElement;
    expect(element).toBeTruthy();
    expect(element.textContent).toBe('');
  });

  it('content 为空字符串时不渲染内容', () => {
    const { container } = render(<RichText content="" />);
    const element = container.firstElementChild as HTMLElement;
    expect(element).toBeTruthy();
    expect(element.textContent).toBe('');
  });

  it('content 为空数组时不渲染内容', () => {
    const { container } = render(<RichText content={[]} />);
    const element = container.firstElementChild as HTMLElement;
    expect(element).toBeTruthy();
    expect(element.textContent).toBe('');
  });
});

describe('RichText 图片节点', () => {
  it('渲染图片类型节点', () => {
    const nodes = [
      {
        type: 'img',
        content: '',
        imgProps: { src: 'https://example.com/image.png', alt: '示例图片' },
      },
    ];
    render(<RichText content={nodes} />);
    const images = screen.getAllByRole('img');
    expect(images.length).toBeGreaterThanOrEqual(1);
  });

  it('渲染混合文本和图片节点', () => {
    const nodes = [
      { type: 'p', content: '文字段落' },
      {
        type: 'img',
        content: '',
        imgProps: { src: 'https://example.com/photo.jpg', alt: '照片' },
      },
    ];
    render(<RichText content={nodes} />);
    expect(screen.getByText('文字段落')).toBeTruthy();
    const images = screen.getAllByRole('img');
    expect(images.length).toBeGreaterThanOrEqual(1);
  });
});

describe('RichText 自定义 className 和 style', () => {
  it('接受自定义 className 并应用到容器', () => {
    const { container } = render(<RichText className="custom-richtext" />);
    const element = container.querySelector('.custom-richtext');
    expect(element).toBeTruthy();
  });

  it('接受自定义 style 并应用到容器', () => {
    const customStyle = { fontSize: '18px', color: 'red' };
    const { container } = render(<RichText style={customStyle} />);
    const element = container.firstElementChild as HTMLElement;
    expect(element).toBeTruthy();
    expect(element.style.fontSize).toBe('18px');
    expect(element.style.color).toBe('red');
  });

  it('同时接受自定义 className 和 style', () => {
    const { container } = render(
      <RichText className="my-richtext" style={{ lineHeight: '1.8' }} />
    );
    const element = container.querySelector('.my-richtext') as HTMLElement;
    expect(element).toBeTruthy();
    expect(element.style.lineHeight).toBe('1.8');
  });
});
