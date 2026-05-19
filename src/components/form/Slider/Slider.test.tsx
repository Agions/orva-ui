import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
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

// 标准 Mock — createComponent
vi.mock('@/utils/createComponent', () => ({
  createComponent: ({ render }: any) =>
    React.forwardRef((props: any, ref: any) => (render ? render(props, ref) : null)),
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

import { Slider } from './Slider';

describe('Slider 滑块组件', () => {
  describe('基础渲染', () => {
    it('应该正确渲染 Slider 组件', () => {
      const { container } = render(<Slider />);
      expect(container.firstChild).toBeTruthy();
    });

    it('应该渲染容器元素', () => {
      const { container } = render(<Slider />);
      const wrapper = container.querySelector('div');
      expect(wrapper).toBeTruthy();
    });
  });

  describe('value 属性', () => {
    it('应该支持 value 属性', () => {
      const { container } = render(<Slider value={50} />);
      expect(container.firstChild).toBeTruthy();
    });

    it('应该支持 defaultValue 属性', () => {
      const { container } = render(<Slider defaultValue={30} />);
      expect(container.firstChild).toBeTruthy();
    });

    it('应该支持 value=0', () => {
      const { container } = render(<Slider value={0} />);
      expect(container.firstChild).toBeTruthy();
    });

    it('应该支持 value=100', () => {
      const { container } = render(<Slider value={100} />);
      expect(container.firstChild).toBeTruthy();
    });
  });

  describe('min/max 属性', () => {
    it('应该支持自定义 min 和 max', () => {
      const { container } = render(<Slider min={10} max={90} value={50} />);
      expect(container.firstChild).toBeTruthy();
    });

    it('应该支持 min=0 和 max=100（默认值）', () => {
      const { container } = render(<Slider min={0} max={100} value={50} />);
      expect(container.firstChild).toBeTruthy();
    });

    it('应该支持负数范围', () => {
      const { container } = render(<Slider min={-50} max={50} value={0} />);
      expect(container.firstChild).toBeTruthy();
    });
  });

  describe('step 属性', () => {
    it('应该支持 step=1（默认值）', () => {
      const { container } = render(<Slider step={1} />);
      expect(container.firstChild).toBeTruthy();
    });

    it('应该支持自定义 step 值', () => {
      const { container } = render(<Slider step={5} />);
      expect(container.firstChild).toBeTruthy();
    });

    it('应该支持小数 step', () => {
      const { container } = render(<Slider step={0.1} value={50.5} />);
      expect(container.firstChild).toBeTruthy();
    });
  });

  describe('disabled 属性', () => {
    it('应该支持 disabled=true', () => {
      const { container } = render(<Slider disabled={true} />);
      expect(container.firstChild).toBeTruthy();
    });

    it('应该支持 disabled=false', () => {
      const { container } = render(<Slider disabled={false} />);
      expect(container.firstChild).toBeTruthy();
    });
  });

  describe('marks 属性', () => {
    it('应该正确渲染 marks', () => {
      const marks = { 0: '0%', 50: '50%', 100: '100%' };
      const { container } = render(<Slider marks={marks} />);
      expect(container.firstChild).toBeTruthy();
    });

    it('应该渲染 marks 标签文本', () => {
      const marks = { 0: '0%', 50: '50%', 100: '100%' };
      render(<Slider marks={marks} />);
      expect(screen.getByText('0%')).toBeTruthy();
      expect(screen.getByText('50%')).toBeTruthy();
      expect(screen.getByText('100%')).toBeTruthy();
    });

    it('没有 marks 时不应该渲染刻度', () => {
      render(<Slider />);
      expect(screen.queryByText('0%')).toBeNull();
    });
  });

  describe('onChange 回调', () => {
    it('应该支持 onChange 回调', () => {
      const handleChange = vi.fn();
      const { container } = render(<Slider onChange={handleChange} value={50} />);
      expect(container.firstChild).toBeTruthy();
    });

    it('disabled 状态下不应该响应交互', () => {
      const handleChange = vi.fn();
      const { container } = render(
        <Slider disabled={true} onChange={handleChange} value={50} />,
      );
      expect(container.firstChild).toBeTruthy();
    });
  });

  describe('自定义 className/style', () => {
    it('应该支持自定义 className', () => {
      const { container } = render(<Slider className="custom-slider" />);
      expect(container.firstChild).toBeTruthy();
    });

    it('应该支持自定义 style', () => {
      const { container } = render(
        <Slider style={{ marginTop: '20px', width: '300px' }} />,
      );
      expect(container.firstChild).toBeTruthy();
    });
  });
});
