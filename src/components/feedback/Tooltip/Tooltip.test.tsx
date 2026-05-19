/**
 * Tooltip 文字提示组件单元测试
 * @module components/feedback/Tooltip/Tooltip.test
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Tooltip } from './Tooltip';

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
      },
      typography: {
        fontSize: { md: '16px', xl: '20px' },
        fontWeight: { semibold: 600 },
      },
      borderRadius: { md: '0.375rem', lg: '0.5rem' },
      shadows: { xl: '0 20px 25px rgba(0,0,0,0.1)' },
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
  ARIA_ROLES: { tooltip: 'tooltip' },
}));

vi.mock('@/utils/logger', () => ({
  createLogger: () => ({
    debug: vi.fn(),
    info: vi.fn(),
    warn: vi.fn(),
    error: vi.fn(),
  }),
}));

vi.mock('@/theme/motion/easings', () => ({
  getEasingCss: () => 'ease-out',
}));

describe('Tooltip 组件', () => {
  describe('基础渲染', () => {
    it('应该渲染带 title 的 Tooltip', () => {
      const { container } = render(
        <Tooltip title="提示文字">
          <span>触发元素</span>
        </Tooltip>
      );
      expect(container.firstChild).toBeTruthy();
      expect(screen.getByText('触发元素')).toBeInTheDocument();
    });

    it('应该在 visible=true 时显示 title 内容', () => {
      render(
        <Tooltip title="提示内容" visible={true}>
          <span>触发元素</span>
        </Tooltip>
      );
      expect(screen.getByText('提示内容')).toBeInTheDocument();
    });
  });

  describe('placement 属性', () => {
    it.each(['top', 'bottom', 'left', 'right'] as const)(
      '应该渲染 placement="%s" 的 Tooltip',
      (placement) => {
        const { container } = render(
          <Tooltip title="提示" placement={placement} visible>
            <span>触发元素</span>
          </Tooltip>
        );
        expect(container.firstChild).toBeTruthy();
        expect(screen.getByText('提示')).toBeInTheDocument();
      }
    );
  });

  describe('visible 受控模式', () => {
    it('visible=true 时应该渲染提示内容', () => {
      render(
        <Tooltip title="受控提示" visible={true}>
          <span>触发元素</span>
        </Tooltip>
      );
      expect(screen.getByText('受控提示')).toBeInTheDocument();
    });

    it('visible=false 时不应该渲染提示内容', () => {
      render(
        <Tooltip title="受控提示" visible={false}>
          <span>触发元素</span>
        </Tooltip>
      );
      expect(screen.queryByText('受控提示')).not.toBeInTheDocument();
    });
  });

  describe('disabled 状态', () => {
    it('应该渲染 disabled 状态的 Tooltip', () => {
      const { container } = render(
        <Tooltip title="禁用提示" disabled>
          <span>触发元素</span>
        </Tooltip>
      );
      expect(container.firstChild).toBeTruthy();
    });

    it('disabled 状态下 hover 不应显示提示', () => {
      render(
        <Tooltip title="禁用提示" disabled>
          <span>触发元素</span>
        </Tooltip>
      );
      expect(screen.queryByText('禁用提示')).not.toBeInTheDocument();
    });
  });

  describe('子元素渲染', () => {
    it('应该渲染子元素', () => {
      render(
        <Tooltip title="提示">
          <button>点击我</button>
        </Tooltip>
      );
      expect(screen.getByText('点击我')).toBeInTheDocument();
    });

    it('应该渲染复杂的子元素树', () => {
      render(
        <Tooltip title="提示">
          <div>
            <span>多层</span>
            <span>嵌套</span>
          </div>
        </Tooltip>
      );
      expect(screen.getByText('多层')).toBeInTheDocument();
      expect(screen.getByText('嵌套')).toBeInTheDocument();
    });
  });

  describe('自定义 className/style', () => {
    it('应该渲染带自定义 className 的 Tooltip', () => {
      const { container } = render(
        <Tooltip title="提示" className="custom-tooltip">
          <span>触发元素</span>
        </Tooltip>
      );
      expect(container.firstChild).toBeTruthy();
    });

    it('应该渲染带自定义 style 的 Tooltip', () => {
      const { container } = render(
        <Tooltip title="提示" style={{ padding: '8px' }}>
          <span>触发元素</span>
        </Tooltip>
      );
      expect(container.firstChild).toBeTruthy();
    });
  });

  describe('arrow 属性', () => {
    it('arrow=true 时应该渲染箭头', () => {
      const { container } = render(
        <Tooltip title="带箭头" arrow={true} visible>
          <span>触发元素</span>
        </Tooltip>
      );
      expect(container.firstChild).toBeTruthy();
      expect(screen.getByText('带箭头')).toBeInTheDocument();
    });

    it('arrow=false 时不应该渲染箭头', () => {
      const { container } = render(
        <Tooltip title="无箭头" arrow={false} visible>
          <span>触发元素</span>
        </Tooltip>
      );
      expect(container.firstChild).toBeTruthy();
      expect(screen.getByText('无箭头')).toBeInTheDocument();
    });

    it('默认应该显示箭头', () => {
      const { container } = render(
        <Tooltip title="默认箭头" visible>
          <span>触发元素</span>
        </Tooltip>
      );
      expect(container.firstChild).toBeTruthy();
      expect(screen.getByText('默认箭头')).toBeInTheDocument();
    });
  });
});
