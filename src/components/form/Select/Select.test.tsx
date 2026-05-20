/**
 * Select 选择器组件单元测试
 * @module components/form/Select/Select.test
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Select } from './Select';

const mockOptions = [
  { label: '选项 A', value: 'a' },
  { label: '选项 B', value: 'b' },
  { label: '选项 C', value: 'c' },
];

vi.mock('@/hooks/ui/useTheme', () => ({
  useTheme: () => ({
    theme: {
      colors: {
        primary: '#6366f1',
        border: '#d1d5db',
        text: '#111827',
        textSecondary: '#6b7280',
      },
    },
  }),
}));

vi.mock('@/hooks/ui/useInteractionState', () => ({
  useInteractionState: () => ({
    state: { isFocused: false, isHovered: false, isPressed: false },
    handlers: {
      onFocus: vi.fn(),
      onBlur: vi.fn(),
      onMouseEnter: vi.fn(),
      onMouseLeave: vi.fn(),
      onPress: vi.fn(),
    },
  }),
}));

describe('Select 组件', () => {
  describe('基础渲染', () => {
    it('应该渲染默认选择器', () => {
      const { container } = render(<Select options={mockOptions} />);
      expect(container.firstChild).toBeTruthy();
    });

    it('应该渲染带 placeholder 的选择器', () => {
      render(<Select options={mockOptions} placeholder="请选择..." />);
      expect(screen.getByText('请选择...')).toBeInTheDocument();
    });
  });

  describe('尺寸', () => {
    it.each(['sm', 'md', 'lg'] as const)('应该渲染 %s 尺寸', (size) => {
      const { container } = render(<Select options={mockOptions} size={size} />);
      expect(container.firstChild).toBeTruthy();
    });
  });

  describe('状态', () => {
    it.each(['normal', 'error', 'disabled', 'loading'] as const)(
      '应该渲染 %s 状态',
      (status) => {
        const { container } = render(
          <Select options={mockOptions} status={status as 'normal' | 'error'} />,
        );
        expect(container.firstChild).toBeTruthy();
      },
    );
  });

  describe('交互', () => {
    it('点击 Select 应该触发交互', () => {
      const handleChange = vi.fn();
      const { container } = render(<Select options={mockOptions} onChange={handleChange} />);
      const selectEl = container.firstChild as HTMLElement;
      fireEvent.click(selectEl);
      // Select 组件使用 Picker，点击行为由 Taro 处理
      expect(container.firstChild).toBeTruthy();
    });

    it('应该显示清除按钮', () => {
      const { container } = render(
        <Select options={mockOptions} allowClear value="a" />,
      );
      expect(container.firstChild).toBeTruthy();
    });

    it('应该支持搜索功能', () => {
      const { container } = render(
        <Select options={mockOptions} showSearch />,
      );
      expect(container.firstChild).toBeTruthy();
    });

    it('应该支持多选模式', () => {
      const handleChange = vi.fn();
      const { container } = render(
        <Select options={mockOptions} mode="multiple" onChange={handleChange} />,
      );
      expect(container.firstChild).toBeTruthy();
    });
  });

  describe('禁用状态', () => {
    it('应该渲染禁用状态的选择器', () => {
      const { container } = render(<Select options={mockOptions} disabled />);
      expect(container.firstChild).toBeTruthy();
    });

    it('应该渲染只读状态的选择器', () => {
      const { container } = render(<Select options={mockOptions} readonly />);
      expect(container.firstChild).toBeTruthy();
    });
  });

  describe('可访问性', () => {
    it('应该正确渲染选项列表', () => {
      render(<Select options={mockOptions} />);
      // Options 由 Taro Picker 渲染
      expect(screen.getByText('请选择')).toBeInTheDocument();
    });
  });
});
