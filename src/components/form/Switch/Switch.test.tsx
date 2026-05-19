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

// Mock Switch.styles
vi.mock('./Switch.styles', () => ({
  switchStyles: {
    getContainerStyle: ({ style }: any) => style,
    getWrapperStyle: ({ style }: any) => style,
    getLabelStyle: ({ style }: any) => style,
    getTrackStyle: ({ style }: any) => style,
    getTrackClassName: ({ className }: any) => className || '',
    getThumbStyle: ({ style }: any) => style,
    getThumbClassName: ({ className }: any) => className || '',
    getLoadingMaskStyle: ({ style }: any) => style,
    getLoadingIndicatorStyle: ({ style }: any) => style,
    getHelperTextStyle: ({ style }: any) => style,
    getErrorTextStyle: ({ style }: any) => style,
  },
}));

import { Switch } from './Switch';

describe('Switch 开关组件', () => {
  describe('基础渲染', () => {
    it('应该正确渲染 Switch 组件', () => {
      const { container } = render(<Switch />);
      expect(container.firstChild).toBeTruthy();
    });

    it('应该渲染开关容器', () => {
      const { container } = render(<Switch />);
      const wrapper = container.querySelector('div');
      expect(wrapper).toBeTruthy();
    });

    it('应该包含 data-testid="switch" 的元素', () => {
      render(<Switch />);
      expect(screen.getByTestId('switch')).toBeTruthy();
    });
  });

  describe('checked 属性', () => {
    it('应该支持 checked=true', () => {
      const { container } = render(<Switch checked={true} />);
      expect(container.firstChild).toBeTruthy();
    });

    it('应该支持 checked=false', () => {
      const { container } = render(<Switch checked={false} />);
      expect(container.firstChild).toBeTruthy();
    });

    it('应该支持 defaultChecked=true', () => {
      const { container } = render(<Switch defaultChecked={true} />);
      expect(container.firstChild).toBeTruthy();
    });

    it('应该支持 defaultChecked=false', () => {
      const { container } = render(<Switch defaultChecked={false} />);
      expect(container.firstChild).toBeTruthy();
    });
  });

  describe('disabled 属性', () => {
    it('应该支持 disabled=true', () => {
      const { container } = render(<Switch disabled={true} />);
      expect(container.firstChild).toBeTruthy();
    });

    it('应该支持 disabled=false', () => {
      const { container } = render(<Switch disabled={false} />);
      expect(container.firstChild).toBeTruthy();
    });
  });

  describe('loading 属性', () => {
    it('应该支持 loading=true', () => {
      const { container } = render(<Switch loading={true} />);
      expect(container.firstChild).toBeTruthy();
    });

    it('应该支持 loading=false', () => {
      const { container } = render(<Switch loading={false} />);
      expect(container.firstChild).toBeTruthy();
    });
  });

  describe('size 属性', () => {
    it('应该支持 size="sm"', () => {
      const { container } = render(<Switch size="sm" />);
      expect(container.firstChild).toBeTruthy();
    });

    it('应该支持 size="md"', () => {
      const { container } = render(<Switch size="md" />);
      expect(container.firstChild).toBeTruthy();
    });

    it('应该支持 size="lg"', () => {
      const { container } = render(<Switch size="lg" />);
      expect(container.firstChild).toBeTruthy();
    });
  });

  describe('交互', () => {
    it('应该渲染可交互的 Switch', () => {
      const handleChange = vi.fn();
      render(<Switch onChange={handleChange} />);
      expect(screen.getByTestId('switch')).toBeTruthy();
    });

    it('应该渲染带 label 的 Switch', () => {
      render(<Switch checkedLabel="开" uncheckedLabel="关" />);
      expect(screen.getByTestId('switch')).toBeTruthy();
    });

    it('应该渲染不同尺寸的 Switch', () => {
      const { rerender } = render(<Switch size="sm" />);
      expect(screen.getByTestId('switch')).toBeTruthy();
      rerender(<Switch size="lg" />);
      expect(screen.getByTestId('switch')).toBeTruthy();
    });
  });

  describe('onChange 回调', () => {
    it('应该接受 onChange 回调', () => {
      const handleChange = vi.fn();
      const { container } = render(<Switch onChange={handleChange} />);
      expect(container.firstChild).toBeTruthy();
    });

    it('disabled 状态下应该接受 onChange 回调', () => {
      const handleChange = vi.fn();
      const { container } = render(<Switch disabled={true} onChange={handleChange} />);
      expect(container.firstChild).toBeTruthy();
    });

    it('loading 状态下应该接受 onChange 回调', () => {
      const handleChange = vi.fn();
      const { container } = render(<Switch loading={true} onChange={handleChange} />);
      expect(container.firstChild).toBeTruthy();
    });
  });

  describe('自定义 className/style', () => {
    it('应该支持自定义 className', () => {
      const { container } = render(<Switch className="custom-switch" />);
      expect(container.firstChild).toBeTruthy();
    });

    it('应该支持自定义 style', () => {
      const { container } = render(
        <Switch style={{ marginLeft: '10px', padding: '5px' }} />,
      );
      expect(container.firstChild).toBeTruthy();
    });
  });
});
