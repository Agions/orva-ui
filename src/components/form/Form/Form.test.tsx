import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { Form } from './Form';

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
  ARIA_ROLES: { form: 'form', checkbox: 'checkbox', dialog: 'dialog' },
}));

// Mock @/utils/createComponent
vi.mock('@/utils/createComponent', () => ({
  createComponent: ({ render, name }: any) =>
    React.forwardRef((props: any, ref: any) =>
      render ? render(props, ref) : null
    ),
}));

describe('Form 基础渲染', () => {
  it('应该渲染带 children 的 Form', () => {
    render(
      <Form>
        <div data-testid="form-child">表单内容</div>
      </Form>
    );
    expect(screen.getByTestId('form-child')).toBeTruthy();
    expect(screen.getByText('表单内容')).toBeTruthy();
  });

  it('渲染时不应该抛出错误', () => {
    expect(() => render(<Form />)).not.toThrow();
  });
});

describe('Form layout 属性', () => {
  it('layout="horizontal" 时应该正常渲染', () => {
    render(
      <Form layout="horizontal">
        <div>水平布局</div>
      </Form>
    );
    expect(screen.getByText('水平布局')).toBeTruthy();
  });

  it('layout="vertical" 时应该正常渲染', () => {
    render(
      <Form layout="vertical">
        <div>垂直布局</div>
      </Form>
    );
    expect(screen.getByText('垂直布局')).toBeTruthy();
  });

  it('layout="inline" 时应该正常渲染', () => {
    render(
      <Form layout="inline">
        <div>行内布局</div>
      </Form>
    );
    expect(screen.getByText('行内布局')).toBeTruthy();
  });
});

describe('Form onSubmit 回调', () => {
  it('表单提交时应该触发 onSubmit 回调', () => {
    const handleSubmit = vi.fn((e: any) => {
      if (e && e.preventDefault) e.preventDefault();
    });
    render(
      <Form onSubmit={handleSubmit}>
        <button type="submit">提交</button>
      </Form>
    );

    const form = screen.getByRole('form') || document.querySelector('form');
    if (form) {
      fireEvent.submit(form);
      expect(handleSubmit).toHaveBeenCalled();
    }
  });
});

describe('Form disabled 属性', () => {
  it('disabled=true 时应该正常渲染', () => {
    render(
      <Form disabled={true}>
        <div>禁用状态</div>
      </Form>
    );
    expect(screen.getByText('禁用状态')).toBeTruthy();
  });

  it('disabled=false 时应该正常渲染', () => {
    render(
      <Form disabled={false}>
        <div>可用状态</div>
      </Form>
    );
    expect(screen.getByText('可用状态')).toBeTruthy();
  });
});

describe('Form.Item 子组件渲染', () => {
  it('应该渲染 Form.Item 子组件', () => {
    render(
      <Form>
        <Form.Item name="username" label="用户名">
          <input data-testid="username-input" />
        </Form.Item>
      </Form>
    );
    expect(screen.getByText('用户名')).toBeTruthy();
    expect(screen.getByTestId('username-input')).toBeTruthy();
  });

  it('应该渲染多个 Form.Item 子组件', () => {
    render(
      <Form>
        <Form.Item name="username" label="用户名">
          <input data-testid="username-input" />
        </Form.Item>
        <Form.Item name="password" label="密码">
          <input data-testid="password-input" type="password" />
        </Form.Item>
      </Form>
    );
    expect(screen.getByText('用户名')).toBeTruthy();
    expect(screen.getByText('密码')).toBeTruthy();
    expect(screen.getByTestId('username-input')).toBeTruthy();
    expect(screen.getByTestId('password-input')).toBeTruthy();
  });
});

describe('Form 自定义 className 和 style', () => {
  it('应该接受自定义 className', () => {
    const { container } = render(
      <Form className="custom-form">
        <div>自定义类名</div>
      </Form>
    );
    const formEl = container.querySelector('.custom-form');
    expect(formEl).toBeTruthy();
  });

  it('应该接受自定义 style', () => {
    const { container } = render(
      <Form style={{ marginTop: '10px' }}>
        <div>自定义样式</div>
      </Form>
    );
    // 验证组件正常渲染
    expect(screen.getByText('自定义样式')).toBeTruthy();
  });

  it('应该同时接受自定义 className 和 style', () => {
    const { container } = render(
      <Form className="my-form" style={{ padding: '20px' }}>
        <div>组合属性</div>
      </Form>
    );
    const formEl = container.querySelector('.my-form');
    expect(formEl).toBeTruthy();
    expect(screen.getByText('组合属性')).toBeTruthy();
  });
});
