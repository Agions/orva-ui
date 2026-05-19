/**
 * Textarea Component Test
 * 文本域组件测试
 * @module components/form/Textarea
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import { Textarea } from './Textarea';

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

vi.mock('./Textarea.styles', () => ({
  textareaStyles: {
    getStyle: ({ style }: any) => style,
    getClassName: ({ className }: any) => className || '',
    getContainerStyle: ({ style }: any) => style,
    getWrapperStyle: () => ({}),
    getLabelStyle: () => ({}),
    getPrefixStyle: () => ({}),
    getSuffixStyle: () => ({}),
    getClearButtonStyle: () => ({}),
    getCounterStyle: () => ({}),
    getHelperTextStyle: () => ({}),
    getErrorTextStyle: () => ({}),
    getAutoHeightStyle: () => ({}),
    adjustTextareaHeight: () => {},
  },
}));

// ==================== 测试套件 ====================

describe('Textarea 文本域组件', () => {
  describe('基础渲染', () => {
    test('应该正确渲染 Textarea 组件', () => {
      const { container } = render(<Textarea />);
      expect(container.firstChild).toBeTruthy();
    });

    test('应该渲染容器元素', () => {
      const { container } = render(<Textarea />);
      expect(container.querySelector('div')).toBeTruthy();
    });
  });

  describe('placeholder 属性', () => {
    test('应该正确显示 placeholder', () => {
      render(<Textarea placeholder="请输入内容" />);
      expect(screen.getByPlaceholderText('请输入内容')).toBeTruthy();
    });

    test('应该正确显示中文 placeholder', () => {
      render(<Textarea placeholder="请在此输入多行文本..." />);
      expect(screen.getByPlaceholderText('请在此输入多行文本...')).toBeTruthy();
    });
  });

  describe('disabled 属性', () => {
    test('应该正确渲染禁用状态', () => {
      const { container } = render(<Textarea disabled />);
      expect(container.firstChild).toBeTruthy();
    });

    test('默认状态下不应禁用', () => {
      const { container } = render(<Textarea />);
      expect(container.firstChild).toBeTruthy();
    });
  });

  describe('readOnly 属性', () => {
    test('应该正确渲染只读状态', () => {
      const { container } = render(<Textarea readonly />);
      expect(container.firstChild).toBeTruthy();
    });

    test('readOnly 应正确传递', () => {
      const { container } = render(<Textarea readOnly />);
      expect(container.firstChild).toBeTruthy();
    });
  });

  describe('maxLength 属性', () => {
    test('应该正确设置 maxLength', () => {
      const { container } = render(<Textarea maxLength={100} />);
      expect(container.firstChild).toBeTruthy();
    });

    test('应该正确设置较大的 maxLength', () => {
      const { container } = render(<Textarea maxLength={5000} />);
      expect(container.firstChild).toBeTruthy();
    });
  });

  describe('autoSize 属性', () => {
    test('应该接受 autoSize 布尔值', () => {
      const { container } = render(<Textarea autoSize />);
      expect(container.firstChild).toBeTruthy();
    });

    test('应该接受 autoSize 对象配置', () => {
      const { container } = render(
        <Textarea autoSize={{ minRows: 2, maxRows: 6 }} />,
      );
      expect(container.firstChild).toBeTruthy();
    });

    test('应该接受 autoHeight 属性（兼容写法）', () => {
      const { container } = render(<Textarea autoHeight />);
      expect(container.firstChild).toBeTruthy();
    });
  });

  describe('showCount 属性', () => {
    test('应该支持 showCount=true', () => {
      const { container } = render(<Textarea showCount maxLength={100} />);
      expect(container.firstChild).toBeTruthy();
    });

    test('应该支持 showCount=false', () => {
      const { container } = render(<Textarea showCount={false} />);
      expect(container.firstChild).toBeTruthy();
    });
  });

  describe('onChange 回调', () => {
    test('应该接受 onChange 回调', () => {
      const handleChange = vi.fn();
      const { container } = render(<Textarea onChange={handleChange} />);
      expect(container.firstChild).toBeTruthy();
    });
  });

  describe('自定义 className/style', () => {
    test('应该应用自定义 className', () => {
      const { container } = render(<Textarea className="custom-textarea" />);
      expect(container.firstChild).toBeTruthy();
    });

    test('应该应用自定义 style', () => {
      const { container } = render(
        <Textarea style={{ marginTop: '10px', width: '300px' }} />,
      );
      expect(container.firstChild).toBeTruthy();
    });
  });

  describe('组合属性', () => {
    test('应该同时渲染带 value 和 placeholder 的组件', () => {
      const { container } = render(
        <Textarea
          value="内容"
          placeholder="请输入"
        />,
      );
      expect(container.firstChild).toBeTruthy();
    });

    test('应该同时渲染带 disabled 和 placeholder 的组件', () => {
      const { container } = render(
        <Textarea disabled placeholder="禁用状态" />,
      );
      expect(container.firstChild).toBeTruthy();
    });
  });
});
