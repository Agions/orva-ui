/**
 * Icon 图标组件单元测试
 * @module components/basic/Icon/Icon.test
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Icon } from './Icon';

vi.mock('@/hooks/ui/useTheme', () => ({
  useTheme: () => ({
    theme: { colors: { primary: '#6366f1' } },
  }),
}));

vi.mock('@/hooks/ui/useMicroAnimation', () => ({
  useMicroAnimation: () => ({
    getMergedStyle: (style: unknown) => style,
  }),
}));

describe('Icon 组件', () => {
  describe('基础渲染', () => {
    it('应该渲染默认图标', () => {
      const { container } = render(<Icon name="check" />);
      expect(container.firstChild).toBeTruthy();
    });

    it('应该渲染图标（检查渲染成功）', () => {
      const { container } = render(<Icon><span>★</span></Icon>);
      expect(container.firstChild).toBeTruthy();
    });
  });

  describe('尺寸', () => {
    it.each(['xs', 'sm', 'md', 'lg', 'xl'] as const)('应该渲染 %s 尺寸', (size) => {
      const { container } = render(<Icon name="check" size={size} />);
      expect(container.firstChild).toBeTruthy();
    });
  });

  describe('颜色', () => {
    it.each(['primary', 'success', 'warning', 'danger', 'info'] as const)(
      '应该渲染 %s 颜色',
      (color) => {
        const { container } = render(<Icon name="check" color={color} />);
        expect(container.firstChild).toBeTruthy();
      }
    );
  });

  describe('样式', () => {
    it('应该应用自定义 className', () => {
      const { container } = render(<Icon name="check" className="custom-icon" />);
      expect(container.querySelector('.custom-icon')).toBeInTheDocument();
    });
  });
});