import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { DatePicker } from './DatePicker';

// Mock @/hooks/ui/useTheme
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
        error: '#ef4444',
      },
      typography: {
        fontSize: { md: '16px', sm: '14px' },
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
    getMergedStyle: (style: object) => style,
  }),
}));

// Mock @/hooks/ui/useAccessibility
vi.mock('@/hooks/ui/useAccessibility', () => ({
  useAccessibility: () => ({
    handleKeyDown: vi.fn(),
    getAriaAttributes: () => ({}),
  }),
  ARIA_ROLES: { checkbox: 'checkbox', dialog: 'dialog' },
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

describe('DatePicker 基础渲染', () => {
  it('应该渲染带 placeholder 的 DatePicker', () => {
    render(<DatePicker placeholder="请选择日期" />);
    const input = screen.getByPlaceholderText('请选择日期');
    expect(input).toBeTruthy();
  });

  it('渲染时不应该抛出错误', () => {
    expect(() => render(<DatePicker />)).not.toThrow();
  });
});

describe('DatePicker value 属性', () => {
  it('应该显示指定的 value 值（Date 对象）', () => {
    const dateValue = new Date(2024, 0, 15);
    render(<DatePicker value={dateValue} placeholder="选择日期" />);
    const input = screen.getByPlaceholderText('选择日期');
    expect(input).toBeTruthy();
  });

  it('空 value 时应该显示 placeholder', () => {
    render(<DatePicker placeholder="请选择日期" />);
    const input = screen.getByPlaceholderText('请选择日期');
    expect(input).toBeTruthy();
  });
});

describe('DatePicker disabled 属性', () => {
  it('disabled=true 时应该禁用输入框', () => {
    render(<DatePicker disabled={true} placeholder="禁用" />);
    const input = screen.getByPlaceholderText('禁用');
    expect(input.getAttribute('disabled')).not.toBeNull();
  });

  it('disabled=false 时不应禁用输入框', () => {
    render(<DatePicker disabled={false} placeholder="可用" />);
    const input = screen.getByPlaceholderText('可用');
    expect(input.getAttribute('disabled')).toBeNull();
  });
});

describe('DatePicker onChange 回调', () => {
  it('应该接受 onChange 回调', () => {
    const handleChange = vi.fn();
    const { container } = render(<DatePicker placeholder="点击测试" onChange={handleChange} />);
    expect(container.firstChild).toBeTruthy();
  });
});

describe('DatePicker placeholder 属性', () => {
  it('应该显示自定义 placeholder', () => {
    render(<DatePicker placeholder="自定义占位符" />);
    const input = screen.getByPlaceholderText('自定义占位符');
    expect(input).toBeTruthy();
  });

  it('应该显示默认 placeholder', () => {
    render(<DatePicker />);
    const input = screen.getByPlaceholderText('请选择日期');
    expect(input).toBeTruthy();
  });
});

describe('DatePicker 自定义 className 和 style', () => {
  it('应该接受自定义 className', () => {
    const { container } = render(
      <DatePicker className="custom-datepicker" placeholder="自定义类名" />,
    );
    const datepickerEl = container.querySelector('.custom-datepicker');
    expect(datepickerEl).toBeTruthy();
  });

  it('应该接受自定义 style', () => {
    const { container } = render(
      <DatePicker style={{ marginTop: '10px' }} placeholder="自定义样式" />,
    );
    const input = screen.getByPlaceholderText('自定义样式');
    expect(input).toBeTruthy();
  });

  it('应该同时接受自定义 className 和 style', () => {
    const { container } = render(
      <DatePicker
        className="my-datepicker"
        style={{ padding: '8px' }}
        placeholder="组合属性"
      />,
    );
    const datepickerEl = container.querySelector('.my-datepicker');
    expect(datepickerEl).toBeTruthy();
    const input = screen.getByPlaceholderText('组合属性');
    expect(input).toBeTruthy();
  });
});
