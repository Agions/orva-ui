import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { Notification } from './Notification';

// Mock @/hooks/ui/useTheme
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

// Mock @/hooks/ui/useMicroAnimation
vi.mock('@/hooks/ui/useMicroAnimation', () => ({
  useMicroAnimation: () => ({
    isAnimating: false,
    startAnimation: vi.fn(),
    stopAnimation: vi.fn(),
    getMergedStyle: (style: any) => style,
  }),
}));

// Mock @/hooks/ui/useAccessibility
vi.mock('@/hooks/ui/useAccessibility', () => ({
  useAccessibility: () => ({
    handleKeyDown: vi.fn(),
    getAriaAttributes: () => ({}),
  }),
  ARIA_ROLES: { alert: 'alert' },
}));

describe('基础渲染', () => {
  it('渲染带 title 和 content 的 Notification', () => {
    render(<Notification title="通知标题" content="通知内容" />);
    expect(screen.getByText('通知标题')).toBeTruthy();
    expect(screen.getByText('通知内容')).toBeTruthy();
  });

  it('默认渲染时不传 type 默认为 info', () => {
    const { container } = render(<Notification title="默认类型" />);
    const notificationEl = container.querySelector('.orva-ui-notification--info');
    expect(notificationEl).toBeTruthy();
  });
});

describe('4种类型', () => {
  it('info 类型 - 渲染 info 类名', () => {
    const { container } = render(<Notification type="info" title="信息" />);
    expect(container.querySelector('.orva-ui-notification--info')).toBeTruthy();
  });

  it('success 类型 - 渲染 success 类名', () => {
    const { container } = render(<Notification type="success" title="成功" />);
    expect(container.querySelector('.orva-ui-notification--success')).toBeTruthy();
  });

  it('warning 类型 - 渲染 warning 类名', () => {
    const { container } = render(<Notification type="warning" title="警告" />);
    expect(container.querySelector('.orva-ui-notification--warning')).toBeTruthy();
  });

  it('error 类型 - 渲染 error 类名', () => {
    const { container } = render(<Notification type="error" title="错误" />);
    expect(container.querySelector('.orva-ui-notification--error')).toBeTruthy();
  });
});

describe('title+content 组合', () => {
  it('仅传 title - 只显示标题不显示内容', () => {
    render(<Notification title="只有标题" />);
    expect(screen.getByText('只有标题')).toBeTruthy();
    expect(screen.queryByText('内容')).toBeNull();
  });

  it('仅传 content - 只显示内容不显示标题', () => {
    render(<Notification content="只有内容" />);
    expect(screen.getByText('只有内容')).toBeTruthy();
  });

  it('同时传 title 和 content - 两者都显示', () => {
    render(<Notification title="标题" content="内容" />);
    expect(screen.getByText('标题')).toBeTruthy();
    expect(screen.getByText('内容')).toBeTruthy();
  });

  it('都不传 - 不显示标题和内容文本', () => {
    const { container } = render(<Notification />);
    expect(container.querySelector('.orva-ui-notification')).toBeTruthy();
  });
});

describe('closable + onClose 回调', () => {
  it('closable=true 时显示关闭按钮', () => {
    render(<Notification title="可关闭" closable={true} />);
    expect(screen.getByText('×')).toBeTruthy();
  });

  it('closable=true 时点击关闭按钮触发 onClose', () => {
    const onClose = vi.fn();
    render(<Notification title="关闭测试" closable={true} onClose={onClose} />);

    const closeBtn = screen.getByText('×');
    fireEvent.click(closeBtn);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('closable=false 时不显示关闭按钮', () => {
    render(<Notification title="不可关闭" closable={false} />);
    expect(screen.queryByText('×')).toBeNull();
  });
});

describe('showIcon 属性', () => {
  it('showIcon=true 时显示默认图标', () => {
    render(<Notification title="有图标" showIcon={true} />);
    // info 类型默认图标为 'ℹ'
    expect(screen.getByText('ℹ')).toBeTruthy();
  });

  it('showIcon=false 时不显示默认图标', () => {
    render(<Notification title="无图标" showIcon={false} />);
    expect(screen.queryByText('ℹ')).toBeNull();
  });

  it('不同类型显示不同默认图标', () => {
    const { rerender } = render(<Notification type="success" title="成功" showIcon={true} />);
    expect(screen.getByText('✓')).toBeTruthy();

    rerender(<Notification type="error" title="错误" showIcon={true} />);
    expect(screen.getByText('✕')).toBeTruthy();

    rerender(<Notification type="warning" title="警告" showIcon={true} />);
    expect(screen.getByText('⚠')).toBeTruthy();

    rerender(<Notification type="info" title="信息" showIcon={true} />);
    expect(screen.getByText('ℹ')).toBeTruthy();
  });
});

describe('showClose 属性', () => {
  it('showClose=true 且 closable=true 时显示关闭按钮', () => {
    render(<Notification title="显示关闭" showClose={true} closable={true} />);
    expect(screen.getByText('×')).toBeTruthy();
  });

  it('showClose=false 时不显示关闭按钮', () => {
    render(<Notification title="隐藏关闭" showClose={false} closable={true} />);
    expect(screen.queryByText('×')).toBeNull();
  });

  it('showClose=true 但 closable=false 时不显示关闭按钮', () => {
    render(<Notification title="不可关闭但有showClose" showClose={true} closable={false} />);
    expect(screen.queryByText('×')).toBeNull();
  });
});

describe('icon 自定义', () => {
  it('传入自定义 icon 时渲染自定义图标而非默认图标', () => {
    render(
      <Notification
        title="自定义图标"
        icon={<span data-testid="custom-icon">🚀</span>}
        showIcon={true}
      />
    );
    expect(screen.getByTestId('custom-icon')).toBeTruthy();
    expect(screen.getByText('🚀')).toBeTruthy();
  });

  it('自定义图标时不渲染默认图标', () => {
    render(
      <Notification
        type="success"
        title="自定义图标覆盖"
        icon={<span data-testid="custom-icon">⭐</span>}
        showIcon={true}
      />
    );
    expect(screen.getByTestId('custom-icon')).toBeTruthy();
    expect(screen.queryByText('✓')).toBeNull();
  });
});

describe('自定义 className/style', () => {
  it('自定义 className - 合并到根元素类名中', () => {
    const { container } = render(
      <Notification title="自定义类名" className="my-custom-class" />
    );
    const notificationEl = container.querySelector('.orva-ui-notification');
    expect(notificationEl).toBeTruthy();
    expect(notificationEl?.getAttribute('class')).toContain('my-custom-class');
  });

  it('自定义 style - 应用到根元素', () => {
    const { container } = render(
      <Notification title="自定义样式" style={{ marginTop: '20px' } as React.CSSProperties} />
    );
    const notificationEl = container.querySelector('.orva-ui-notification') as HTMLElement;
    expect(notificationEl).toBeTruthy();
    // style 对象通过 getMergedStyle 合并，最终应用到元素
    expect(notificationEl?.getAttribute('style')).toBeTruthy();
  });

  it('className 包含基础类名和类型类名', () => {
    const { container } = render(
      <Notification type="error" title="类名检查" className="extra-class" />
    );
    const notificationEl = container.querySelector('.orva-ui-notification');
    const classAttr = notificationEl?.getAttribute('class') || '';
    expect(classAttr).toContain('orva-ui-notification');
    expect(classAttr).toContain('orva-ui-notification--error');
    expect(classAttr).toContain('extra-class');
  });
});

describe('onClick 回调', () => {
  it('点击 Notification 主体触发 onClick', () => {
    const onClick = vi.fn();
    const { container } = render(<Notification title="点击测试" onClick={onClick} />);

    const notificationEl = container.querySelector('.orva-ui-notification') as HTMLElement;
    fireEvent.click(notificationEl);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('未传 onClick 时点击不报错', () => {
    const { container } = render(<Notification title="无点击回调" />);

    const notificationEl = container.querySelector('.orva-ui-notification') as HTMLElement;
    expect(() => fireEvent.click(notificationEl)).not.toThrow();
  });

  it('点击关闭按钮不触发 onClick（事件被 stopPropagation）', () => {
    const onClick = vi.fn();
    const onClose = vi.fn();
    render(
      <Notification
        title="关闭不触发点击"
        closable={true}
        showClose={true}
        onClick={onClick}
        onClose={onClose}
      />
    );

    const closeBtn = screen.getByText('×');
    fireEvent.click(closeBtn);
    expect(onClose).toHaveBeenCalledTimes(1);
    expect(onClick).not.toHaveBeenCalled();
  });
});
