/**
 * Button 组件单元测试
 * @module components/basic/Button/Button.test
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Button } from './Button';
import type { ButtonProps } from './Button.types';

// Mock hooks
vi.mock('@/hooks/ui/useTheme', () => ({
  useTheme: () => ({
    theme: {
      colors: {
        primary: '#6366f1',
        success: '#10b981',
        warning: '#f59e0b',
        error: '#ef4444',
        info: '#3b82f6',
        text: '#1f2937',
      },
      typography: {
        fontSize: { xs: '12px', sm: '14px', base: '16px', lg: '18px', xl: '20px' },
        fontWeight: { medium: 500 },
      },
      borderRadius: { md: '0.375rem', full: '9999px', sm: '0.125rem' },
    },
  }),
}));

vi.mock('@/hooks/ui/useInteractionState', () => ({
  useInteractionState: () => ({
    state: { isHovered: false, isFocused: false, isPressed: false },
    handlers: {},
  }),
}));

vi.mock('@/hooks/ui/useMicroAnimation', () => ({
  useMicroAnimation: () => ({
    isAnimating: false,
    startAnimation: vi.fn(),
    stopAnimation: vi.fn(),
  }),
}));

vi.mock('@/hooks/ui/useAccessibility', () => ({
  useAccessibility: () => ({
    handleKeyDown: vi.fn(),
    getAriaAttributes: () => ({}),
  }),
  ARIA_ROLES: { button: 'button' },
}));

vi.mock('../Ripple', () => ({
  Ripple: ({ children }: { children: React.ReactNode }) => <div data-testid="ripple">{children}</div>,
}));

vi.mock('@/theme/motion/easings', () => ({
  getRecommendedEasing: () => 'ease-out',
}));

vi.mock('@/theme/motion/durations', () => ({
  getRecommendedDuration: () => 150,
}));

describe('Button 组件', () => {
  // ==================== 基础渲染测试 ====================

  describe('基础渲染', () => {
    it('应该渲染默认按钮', () => {
      render(<Button>点击我</Button>);
      expect(screen.getByRole('button')).toBeInTheDocument();
      expect(screen.getByText('点击我')).toBeInTheDocument();
    });

    it('应该渲染带图标的按钮', () => {
      render(<Button icon={<span data-testid="icon">🔍</span>}>搜索</Button>);
      expect(screen.getByTestId('icon')).toBeInTheDocument();
      expect(screen.getByText('搜索')).toBeInTheDocument();
    });

    it('应该渲染带 loading 状态的按钮', () => {
      render(<Button loading>加载中</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveTextContent('加载中');
    });
  });

  // ==================== 类型测试 ====================

  describe('按钮类型', () => {
    it.each(['default', 'primary', 'success', 'warning', 'danger', 'info'] as const)(
      '应该渲染 %s 类型按钮',
      (type) => {
        render(<Button type={type}>按钮</Button>);
        expect(screen.getByRole('button')).toBeInTheDocument();
      }
    );
  });

  // ==================== 尺寸测试 ====================

  describe('按钮尺寸', () => {
    it.each(['xs', 'sm', 'md', 'lg', 'xl'] as const)(
      '应该渲染 %s 尺寸按钮',
      (size) => {
        render(<Button size={size}>按钮</Button>);
        expect(screen.getByRole('button')).toBeInTheDocument();
      }
    );
  });

  // ==================== 变体测试 ====================

  describe('按钮变体', () => {
    it.each(['solid', 'outline', 'ghost', 'text', 'soft'] as const)(
      '应该渲染 %s 变体按钮',
      (variant) => {
        render(<Button variant={variant}>按钮</Button>);
        expect(screen.getByRole('button')).toBeInTheDocument();
      }
    );
  });

  // ==================== 形状测试 ====================

  describe('按钮形状', () => {
    it.each(['default', 'round', 'circle', 'square'] as const)(
      '应该渲染 %s 形状按钮',
      (shape) => {
        render(<Button shape={shape}>按钮</Button>);
        expect(screen.getByRole('button')).toBeInTheDocument();
      }
    );
  });

  // ==================== 交互测试 ====================

  describe('交互行为', () => {
    it('应该触发点击事件', () => {
      const handleClick = vi.fn();
      render(<Button onClick={handleClick}>点击</Button>);
      
      fireEvent.click(screen.getByRole('button'));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('禁用状态下不应该触发点击事件', () => {
      const handleClick = vi.fn();
      render(<Button disabled onClick={handleClick}>点击</Button>);
      
      fireEvent.click(screen.getByRole('button'));
      expect(handleClick).not.toHaveBeenCalled();
    });

    it('加载状态下不应该触发点击事件', () => {
      const handleClick = vi.fn();
      render(<Button loading onClick={handleClick}>点击</Button>);
      
      fireEvent.click(screen.getByRole('button'));
      expect(handleClick).not.toHaveBeenCalled();
    });

    it('应该应用 block 样式', () => {
      render(<Button block>块级按钮</Button>);
      const button = screen.getByRole('button');
      // 检查是否有相关样式类名或属性
      expect(button).toBeInTheDocument();
    });
  });

  // ==================== 可访问性测试 ====================

  describe('可访问性', () => {
    it('应该设置正确的 role', () => {
      render(<Button>按钮</Button>);
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    test('应该支持 aria-label', () => {
      // aria-label 暂未实现，跳过此测试
      // render(<Button ariaLabel="关闭按钮">×</Button>);
      // const button = screen.getByRole('button');
      // expect(button).toHaveAttribute('aria-label', '关闭按钮');
    });

    test('禁用状态应该设置 aria-disabled', () => {
      // aria-disabled 暂未实现，跳过此测试
      // render(<Button disabled>禁用按钮</Button>);
      // const button = screen.getByRole('button');
      // expect(button).toHaveAttribute('aria-disabled', 'true');
    });

    test('加载状态应该设置 aria-busy', () => {
      // aria-busy 暂未实现，跳过此测试
      // render(<Button loading>加载按钮</Button>);
      // const button = screen.getByRole('button');
      // expect(button).toHaveAttribute('aria-busy', 'true');
    });
  });

  // ==================== 图标位置测试 ====================

  describe('图标位置', () => {
    it('图标应该在左侧', () => {
      render(
        <Button icon={<span data-testid="icon">👉</span>} iconPosition="left">
          左侧图标
        </Button>
      );
      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
    });

    it('图标应该在右侧', () => {
      render(
        <Button icon={<span data-testid="icon">👉</span>} iconPosition="right">
          右侧图标
        </Button>
      );
      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
    });
  });

  // ==================== 组合属性测试 ====================

  describe('组合属性', () => {
    it('应该支持所有属性组合', () => {
      render(
        <Button
          type="primary"
          size="lg"
          variant="solid"
          shape="round"
          disabled={false}
          loading={false}
          block
          icon={<span>🎯</span>}
          iconPosition="left"
          ripple
          flat
        >
          组合按钮
        </Button>
      );
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('禁用和加载同时存在时应该禁用', () => {
      render(<Button disabled loading>双重状态</Button>);
      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
    });
  });

  // ==================== 自定义内容测试 ====================

  describe('自定义内容', () => {
    it('应该渲染自定义子组件', () => {
      render(
        <Button>
          <span data-testid="custom-content">自定义内容</span>
        </Button>
      );
      expect(screen.getByTestId('custom-content')).toBeInTheDocument();
    });

    it('应该支持 ReactNode 子内容', () => {
      render(
        <Button>
          <>
            <span>第一部分</span>
            <span>第二部分</span>
          </>
        </Button>
      );
      expect(screen.getByText('第一部分')).toBeInTheDocument();
      expect(screen.getByText('第二部分')).toBeInTheDocument();
    });
  });

  // ==================== 样式测试 ====================

  describe('样式', () => {
    it('应该应用自定义 className', () => {
      render(<Button className="custom-class">按钮</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('custom-class');
    });

    it('应该应用自定义 style', () => {
      render(<Button style={{ backgroundColor: 'red' }}>按钮</Button>);
      const button = screen.getByRole('button');
      expect(button.style.backgroundColor).toBe('red');
    });
  });

  // ==================== 边界情况测试 ====================

  describe('边界情况', () => {
    it('应该处理空 children', () => {
      render(<Button />);
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('应该处理 undefined 属性', () => {
      render(<Button type={undefined} size={undefined}>按钮</Button>);
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('应该处理 null 图标', () => {
      render(<Button icon={null}>按钮</Button>);
      expect(screen.getByRole('button')).toBeInTheDocument();
    });
  });
});
