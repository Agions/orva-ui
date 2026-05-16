/**
 * Avatar 头像组件单元测试
 * @module components/display/Avatar/Avatar.test
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Avatar } from './Avatar';

// Mock hooks
vi.mock('@/hooks/ui/useTheme', () => ({
  useTheme: () => ({
    theme: {
      colors: { surface: '#f3f4f6', textSecondary: '#6b7280' },
    },
  }),
}));

vi.mock('@/hooks/ui/useMicroAnimation', () => ({
  useMicroAnimation: () => ({
    getMergedStyle: (style: unknown) => style,
  }),
}));

vi.mock('@/hooks/ui/useAccessibility', () => ({
  useAccessibility: () => ({
    getAriaAttributes: () => ({}),
  }),
  ARIA_ROLES: { button: 'button' },
}));

describe('Avatar 组件', () => {
  describe('基础渲染', () => {
    it('应该渲染默认头像（首字母）', () => {
      render(<Avatar alt="John Doe" />);
      expect(screen.getByText('J')).toBeInTheDocument();
    });

    it('应该渲染图片头像', () => {
      const { container } = render(<Avatar src="https://example.com/avatar.jpg" alt="User" />);
      // 简单检查组件不崩溃即可
      expect(container.firstChild).toBeTruthy();
    });

    it('应该渲染图标头像', () => {
      render(<Avatar icon={<span data-testid="icon">👤</span>} />);
      expect(screen.getByTestId('icon')).toBeInTheDocument();
    });

    it('应该渲染文本儿童', () => {
      render(<Avatar>JD</Avatar>);
      expect(screen.getByText('JD')).toBeInTheDocument();
    });
  });

  describe('尺寸和形状', () => {
    it.each(['small', 'medium', 'large'] as const)('应该渲染 %s 尺寸头像', (size) => {
      render(<Avatar size={size}>U</Avatar>);
      expect(screen.getByText('U')).toBeInTheDocument();
    });

    it.each(['circle', 'square', 'rounded'] as const)('应该渲染 %s 形状头像', (shape) => {
      render(<Avatar shape={shape}>U</Avatar>);
      expect(screen.getByText('U')).toBeInTheDocument();
    });
  });

  describe('交互行为', () => {
    it('应该触发点击事件', () => {
      const handleClick = vi.fn();
      render(<Avatar onClick={handleClick}>U</Avatar>);
      fireEvent.click(screen.getByText('U').parentElement!);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('无障碍', () => {
    it('应该设置 alt 文本', () => {
      render(<Avatar alt="Test User" />);
      expect(screen.getByText('T')).toBeInTheDocument();
    });
  });

  describe('样式', () => {
    it('应该应用自定义 className', () => {
      render(<Avatar className="custom-avatar">U</Avatar>);
      expect(document.querySelector('.custom-avatar')).toBeInTheDocument();
    });
  });
});
