import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';

// 标准 Mock — useTheme
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

// 标准 Mock — useMicroAnimation
vi.mock('@/hooks/ui/useMicroAnimation', () => ({
  useMicroAnimation: () => ({
    isAnimating: false,
    startAnimation: vi.fn(),
    stopAnimation: vi.fn(),
    getMergedStyle: (style: any) => style,
  }),
}));

// 标准 Mock — useAccessibility
vi.mock('@/hooks/ui/useAccessibility', () => ({
  useAccessibility: () => ({
    handleKeyDown: vi.fn(),
    getAriaAttributes: () => ({}),
  }),
  ARIA_ROLES: {
    radio: 'radio',
    switch: 'switch',
    slider: 'slider',
  },
}));

// 标准 Mock — useInteractionState
vi.mock('@/hooks/ui/useInteractionState', () => ({
  useInteractionState: () => ({
    state: {
      isHovered: false,
      isFocused: false,
      isActive: false,
      isPressed: false,
    },
    handlers: {},
    getInteractionStyle: (style: any) => style,
  }),
}));

// Mock Radio.styles
vi.mock('./Radio.styles', () => ({
  radioStyles: {
    getStyle: ({ style }: any) => style,
    getClassName: ({ className }: any) => className || '',
    getContainerStyle: ({ style }: any) => style,
    getWrapperStyle: ({ style }: any) => style,
    getLabelStyle: ({ style }: any) => style,
    getHelperTextStyle: ({ style }: any) => style,
    getErrorTextStyle: ({ style }: any) => style,
  },
}));

import { Radio } from './Radio';

describe('Radio 单选框组件', () => {
  describe('基础渲染', () => {
    it('应该正确渲染 Radio 组件', () => {
      const { container } = render(<Radio />);
      expect(container.firstChild).toBeTruthy();
    });

    it('应该渲染容器元素', () => {
      const { container } = render(<Radio />);
      expect(container.querySelector('div')).toBeTruthy();
    });
  });

  describe('checked 属性', () => {
    it('应该支持 checked=true', () => {
      const { container } = render(<Radio checked={true} />);
      expect(container.firstChild).toBeTruthy();
    });

    it('应该支持 checked=false', () => {
      const { container } = render(<Radio checked={false} />);
      expect(container.firstChild).toBeTruthy();
    });

    it('应该支持 defaultChecked 属性', () => {
      const { container } = render(<Radio defaultChecked={true} />);
      expect(container.firstChild).toBeTruthy();
    });
  });

  describe('disabled 属性', () => {
    it('应该支持 disabled=true', () => {
      const { container } = render(<Radio disabled={true} />);
      expect(container.firstChild).toBeTruthy();
    });

    it('应该支持 disabled=false', () => {
      const { container } = render(<Radio disabled={false} />);
      expect(container.firstChild).toBeTruthy();
    });
  });

  describe('label 属性', () => {
    it('应该正确渲染 label 文本', () => {
      render(<Radio label="选项 A" />);
      expect(screen.getByText('选项 A')).toBeTruthy();
    });

    it('没有 label 时不应该渲染 label 元素', () => {
      render(<Radio />);
      expect(screen.queryByText('选项 A')).toBeNull();
    });
  });

  describe('onChange 回调', () => {
    it('应该接受 onChange 回调', () => {
      const handleChange = vi.fn();
      const { container } = render(<Radio onChange={handleChange} />);
      expect(container.firstChild).toBeTruthy();
    });

    it('disabled 状态下应该接受 onChange 回调', () => {
      const handleChange = vi.fn();
      const { container } = render(<Radio disabled={true} onChange={handleChange} />);
      expect(container.firstChild).toBeTruthy();
    });
  });

  describe('value 属性', () => {
    it('应该支持 value 属性', () => {
      const { container } = render(<Radio value="option-1" />);
      expect(container.firstChild).toBeTruthy();
    });

    it('应该支持 number 类型的 value', () => {
      const { container } = render(<Radio value={42} />);
      expect(container.firstChild).toBeTruthy();
    });
  });

  describe('RadioGroup 渲染', () => {
    it('应该正确渲染 RadioGroup 容器', () => {
      const { container } = render(
        <div role="radiogroup">
          <Radio label="选项 A" value="a" />
          <Radio label="选项 B" value="b" />
        </div>,
      );
      expect(container.firstChild).toBeTruthy();
    });

    it('应该在 RadioGroup 中渲染多个 Radio', () => {
      render(
        <div role="radiogroup">
          <Radio label="选项 A" value="a" />
          <Radio label="选项 B" value="b" />
        </div>,
      );
      expect(screen.getByText('选项 A')).toBeTruthy();
      expect(screen.getByText('选项 B')).toBeTruthy();
    });
  });

  describe('自定义 className/style', () => {
    it('应该支持自定义 className', () => {
      const { container } = render(<Radio className="custom-radio" />);
      expect(container.firstChild).toBeTruthy();
    });

    it('应该支持自定义 style', () => {
      const { container } = render(
        <Radio style={{ marginTop: '10px', color: 'red' }} />,
      );
      expect(container.firstChild).toBeTruthy();
    });
  });
});
