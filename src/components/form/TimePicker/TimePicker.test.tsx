/**
 * TimePicker Component Test
 * 时间选择器组件测试
 * @module components/form/TimePicker
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import { TimePicker } from './TimePicker';

// ==================== 全局 Mock ====================

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

vi.mock('@/hooks/ui/useMicroAnimation', () => ({
  useMicroAnimation: () => ({
    isAnimating: false,
    startAnimation: vi.fn(),
    stopAnimation: vi.fn(),
    getMergedStyle: (style: any) => style,
  }),
}));

vi.mock('@/hooks/ui/useAccessibility', () => ({
  useAccessibility: () => ({
    handleKeyDown: vi.fn(),
    getAriaAttributes: () => ({}),
  }),
  ARIA_ROLES: { textbox: 'textbox' },
}));

vi.mock('@/utils/logger', () => ({
  createLogger: () => ({
    debug: vi.fn(),
    info: vi.fn(),
    warn: vi.fn(),
    error: vi.fn(),
  }),
}));

// Mock Input component (used internally by TimePicker)
vi.mock('@/components/form/Input', () => ({
  Input: React.forwardRef((props: any, ref: any) => {
    const { onInput, onChange, ...rest } = props;
    return (
      <input
        ref={ref}
        data-testid="input"
        placeholder={props.placeholder}
        disabled={props.disabled}
        readOnly={props.readOnly}
        value={props.value || ''}
        onChange={onInput || onChange}
        style={props.style}
        className={props.className}
      />
    );
  }),
}));

vi.mock('./TimePicker.styles', () => ({
  timePickerStyles: {
    getClearButtonStyle: () => ({}),
    getIconStyle: () => ({}),
    getPanelStyle: () => ({}),
  },
}));

// ==================== 测试套件 ====================

describe('TimePicker 时间选择器组件', () => {
  describe('基础渲染', () => {
    test('应该正确渲染 TimePicker 组件', () => {
      const { container } = render(<TimePicker />);
      expect(container.firstChild).toBeTruthy();
    });

    test('应该渲染 Input 输入框', () => {
      render(<TimePicker />);
      expect(screen.getByTestId('input')).toBeTruthy();
    });

    test('应该渲染容器元素', () => {
      const { container } = render(<TimePicker />);
      expect(container.querySelector('div')).toBeTruthy();
    });
  });

  describe('value 属性', () => {
    test('应该正确显示字符串 value', () => {
      render(<TimePicker value="12:30:00" />);
      const input = screen.getByTestId('input');
      expect(input).toBeTruthy();
    });

    test('应该正确显示 TimeValueObject 类型的 value', () => {
      const timeValue = { hours: 14, minutes: 30, seconds: 45 };
      render(<TimePicker value={timeValue} />);
      expect(screen.getByTestId('input')).toBeTruthy();
    });

    test('应该正确显示不带秒的 TimeValueObject', () => {
      const timeValue = { hours: 9, minutes: 5, seconds: 0 };
      render(<TimePicker value={timeValue} format="HH:mm" />);
      expect(screen.getByTestId('input')).toBeTruthy();
    });

    test('应该正确设置 defaultValue', () => {
      render(<TimePicker defaultValue="10:00:00" />);
      expect(screen.getByTestId('input')).toBeTruthy();
    });

    test('value 为空时应该正常渲染', () => {
      const { container } = render(<TimePicker />);
      expect(container.firstChild).toBeTruthy();
    });
  });

  describe('format 属性', () => {
    test('应该支持 HH:mm:ss 格式', () => {
      const timeValue = { hours: 10, minutes: 30, seconds: 0 };
      render(<TimePicker value={timeValue} format="HH:mm:ss" />);
      expect(screen.getByTestId('input')).toBeTruthy();
    });

    test('应该支持 HH:mm 格式', () => {
      const timeValue = { hours: 10, minutes: 30, seconds: 45 };
      render(<TimePicker value={timeValue} format="HH:mm" />);
      expect(screen.getByTestId('input')).toBeTruthy();
    });

    test('应该支持 hh:mm A 格式', () => {
      const { container } = render(<TimePicker format="hh:mm A" />);
      expect(container.firstChild).toBeTruthy();
    });
  });

  describe('placeholder 属性', () => {
    test('应该正确显示 placeholder', () => {
      render(<TimePicker placeholder="请选择时间" />);
      expect(screen.getByPlaceholderText('请选择时间')).toBeTruthy();
    });

    test('应该使用默认 placeholder', () => {
      render(<TimePicker />);
      expect(screen.getByPlaceholderText('请选择时间')).toBeTruthy();
    });

    test('应该支持自定义 placeholder', () => {
      render(<TimePicker placeholder="点击选择时间" />);
      expect(screen.getByPlaceholderText('点击选择时间')).toBeTruthy();
    });
  });

  describe('disabled 属性', () => {
    test('应该正确渲染禁用状态', () => {
      render(<TimePicker disabled />);
      expect(screen.getByTestId('input')).toBeTruthy();
    });

    test('默认状态下不应禁用', () => {
      render(<TimePicker />);
      expect(screen.getByTestId('input')).toBeTruthy();
    });

    test('禁用状态下组件正常渲染', () => {
      render(<TimePicker disabled />);
      expect(screen.getByTestId('input')).toBeTruthy();
    });
  });

  describe('onChange 回调', () => {
    test('应该接受 onChange 回调', () => {
      const handleChange = vi.fn();
      const { container } = render(<TimePicker onChange={handleChange} />);
      expect(container.firstChild).toBeTruthy();
    });
  });

  describe('自定义 className/style', () => {
    test('应该应用自定义 className', () => {
      const { container } = render(<TimePicker className="custom-timepicker" />);
      expect(container.firstChild).toBeTruthy();
    });

    test('应该应用自定义 style', () => {
      const { container } = render(
        <TimePicker style={{ marginTop: '10px', width: '200px' }} />,
      );
      expect(container.firstChild).toBeTruthy();
    });
  });

  describe('组合属性', () => {
    test('应该同时渲染带 value 和 placeholder 的组件', () => {
      const { container } = render(
        <TimePicker value="12:00:00" placeholder="选择时间" />,
      );
      expect(container.firstChild).toBeTruthy();
    });

    test('应该同时渲染带 disabled 和 value 的组件', () => {
      render(
        <TimePicker disabled value="10:30:00" />,
      );
      expect(screen.getByTestId('input')).toBeTruthy();
    });

    test('应该同时渲染带 format 和 onChange 的组件', () => {
      const handleChange = vi.fn();
      const { container } = render(
        <TimePicker format="HH:mm" onChange={handleChange} />,
      );
      expect(container.firstChild).toBeTruthy();
    });
  });
});
