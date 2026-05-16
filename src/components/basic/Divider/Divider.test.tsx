/**
 * Divider 分割线组件单元测试
 * @module components/basic/Divider/Divider.test
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Divider } from './Divider';

// Mock hooks
vi.mock('@/hooks/ui/useTheme', () => ({
  useTheme: () => ({
    theme: { colors: { border: '#e5e7eb', textSecondary: '#6b7280' } },
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
  ARIA_ROLES: { button: 'button', separator: 'separator' },
}));

describe('Divider 组件', () => {
  describe('基础渲染', () => {
    it('应该渲染默认分割线', () => {
      const { container } = render(<Divider />);
      expect(container.firstChild).toBeTruthy();
    });

    it('应该渲染带文本的分割线', () => {
      render(<Divider>分割文本</Divider>);
      expect(screen.getByText('分割文本')).toBeInTheDocument();
    });

    it('应该渲染带图标分割线', () => {
      render(<Divider icon={<span data-testid="icon-content">📌</span>} />);
      expect(screen.getByTestId('icon-content')).toBeInTheDocument();
    });
  });

  describe('方向和类型', () => {
    it.each(['horizontal', 'vertical'] as const)('应该渲染 %s 方向', (orientation) => {
      const { container } = render(<Divider orientation={orientation} />);
      expect(container.firstChild).toBeTruthy();
    });

    it.each(['solid', 'dashed', 'dotted'] as const)('应该渲染 %s 类型', (type) => {
      const { container } = render(<Divider type={type} />);
      expect(container.firstChild).toBeTruthy();
    });
  });

  describe('位置', () => {
    it.each(['left', 'center', 'right'] as const)('应该渲染 %s 位置', (position) => {
      const { container } = render(<Divider position={position}>文本</Divider>);
      expect(container.firstChild).toBeTruthy();
    });
  });

  describe('尺寸', () => {
    it.each(['xs', 'sm', 'md', 'lg', 'xl'] as const)('应该渲染 %s 尺寸', (size) => {
      const { container } = render(<Divider size={size} />);
      expect(container.firstChild).toBeTruthy();
    });
  });

  describe('样式属性', () => {
    it('应该应用自定义 className', () => {
      const { container } = render(<Divider className="custom-divider" />);
      expect(container.querySelector('.custom-divider')).toBeInTheDocument();
    });

    it('应该应用自定义 style', () => {
      render(<Divider style={{ margin: '20px' }} />);
      expect(document.querySelector('.orva-ui-h5-divider')).toBeInTheDocument();
    });
  });

  describe('边界情况', () => {
    it('应该处理空 children', () => {
      const { container } = render(<Divider>{null}</Divider>);
      expect(container.firstChild).toBeTruthy();
    });
  });
});