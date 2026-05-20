import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { Card } from './Card';

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
        borderLight: '#f3f4f6',
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
        xl: '0 20px 25px -5px rgb(0 0 0 / 0.1)',
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

// Mock @/hooks/ui/useInteractionState
vi.mock('@/hooks/ui/useInteractionState', () => ({
  useInteractionState: () => ({
    state: {
      isHovered: false,
      isFocused: false,
      isActive: false,
      isPressed: false,
      isDisabled: false,
      isLoading: false,
    },
    handlers: {
      onMouseEnter: vi.fn(),
      onMouseLeave: vi.fn(),
      onMouseDown: vi.fn(),
      onMouseUp: vi.fn(),
      onFocus: vi.fn(),
      onBlur: vi.fn(),
      onTouchStart: vi.fn(),
      onTouchEnd: vi.fn(),
    },
    getInteractionStyle: () => ({}),
  }),
}));

// Mock @/theme/motion/easings
vi.mock('@/theme/motion/easings', () => ({
  getRecommendedEasing: () => 'ease-out',
  getEasingCss: () => 'ease-out',
}));

// Mock @/theme/motion/durations
vi.mock('@/theme/motion/durations', () => ({
  getRecommendedDuration: () => 200,
}));

describe('Card 基础渲染', () => {
  it('渲染 Card 并显示子元素内容', () => {
    render(<Card>卡片内容</Card>);
    expect(screen.getByText('卡片内容')).toBeTruthy();
  });

  it('渲染时不抛出错误', () => {
    expect(() => render(<Card>测试</Card>)).not.toThrow();
  });
});

describe('Card hoverable 属性', () => {
  it('hoverable=true 时正常渲染', () => {
    render(<Card hoverable={true}>可悬浮卡片</Card>);
    expect(screen.getByText('可悬浮卡片')).toBeTruthy();
  });

  it('hoverable=false 时正常渲染', () => {
    render(<Card hoverable={false}>不可悬浮卡片</Card>);
    expect(screen.getByText('不可悬浮卡片')).toBeTruthy();
  });
});

describe('Card shadow 属性', () => {
  it('shadow="none" 时正常渲染', () => {
    render(<Card shadow="none">无阴影卡片</Card>);
    expect(screen.getByText('无阴影卡片')).toBeTruthy();
  });

  it('shadow="small" 时正常渲染', () => {
    render(<Card shadow="small">小阴影卡片</Card>);
    expect(screen.getByText('小阴影卡片')).toBeTruthy();
  });

  it('shadow="default" 时正常渲染', () => {
    render(<Card shadow="default">默认阴影卡片</Card>);
    expect(screen.getByText('默认阴影卡片')).toBeTruthy();
  });

  it('shadow="large" 时正常渲染', () => {
    render(<Card shadow="large">大阴影卡片</Card>);
    expect(screen.getByText('大阴影卡片')).toBeTruthy();
  });
});

describe('Card bordered 属性', () => {
  it('bordered={true} 时正常渲染', () => {
    render(<Card bordered={true}>带边框卡片</Card>);
    expect(screen.getByText('带边框卡片')).toBeTruthy();
  });

  it('bordered={false} 时正常渲染', () => {
    render(<Card bordered={false}>无边框卡片</Card>);
    expect(screen.getByText('无边框卡片')).toBeTruthy();
  });
});

describe('Card 子区域渲染（header / children / footer）', () => {
  it('通过 header 属性渲染头部区域', () => {
    render(<Card header={<div data-testid="card-header">卡片头部</div>}>内容</Card>);
    expect(screen.getByTestId('card-header')).toBeTruthy();
    expect(screen.getByText('卡片头部')).toBeTruthy();
  });

  it('通过 footer 属性渲染底部区域', () => {
    render(<Card footer={<div data-testid="card-footer">卡片底部</div>}>内容</Card>);
    expect(screen.getByTestId('card-footer')).toBeTruthy();
    expect(screen.getByText('卡片底部')).toBeTruthy();
  });

  it('同时渲染 header、children（Body）和 footer', () => {
    render(
      <Card
        header={<div data-testid="card-header">头部</div>}
        footer={<div data-testid="card-footer">底部</div>}
      >
        <div data-testid="card-body">主体内容</div>
      </Card>,
    );
    expect(screen.getByTestId('card-header')).toBeTruthy();
    expect(screen.getByTestId('card-body')).toBeTruthy();
    expect(screen.getByTestId('card-footer')).toBeTruthy();
  });

  it('通过 cover 属性渲染封面区域', () => {
    render(<Card cover={<div data-testid="card-cover">封面</div>}>内容</Card>);
    expect(screen.getByTestId('card-cover')).toBeTruthy();
    expect(screen.getByText('封面')).toBeTruthy();
  });
});

describe('Card 自定义 className 和 style', () => {
  it('接受自定义 className 并应用到容器', () => {
    const { container } = render(<Card className="custom-card-class">内容</Card>);
    const cardElement = container.querySelector('.custom-card-class');
    expect(cardElement).toBeTruthy();
  });

  it('接受自定义 style 并应用到容器', () => {
    const customStyle = { backgroundColor: 'red', padding: '20px' };
    const { container } = render(<Card style={customStyle}>内容</Card>);
    const cardElement = container.firstElementChild as HTMLElement;
    expect(cardElement).toBeTruthy();
    expect(cardElement.style.backgroundColor).toBe('red');
    expect(cardElement.style.padding).toBe('20px');
  });

  it('同时接受自定义 className 和 style', () => {
    const { container } = render(
      <Card className="my-card" style={{ marginTop: '10px' }}>
        内容
      </Card>,
    );
    const cardElement = container.querySelector('.my-card') as HTMLElement;
    expect(cardElement).toBeTruthy();
    expect(cardElement.style.marginTop).toBe('10px');
  });
});
