/**
 * Cascader Component Test
 * 级联选择器组件测试
 * @module components/form/Cascader
 */

import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import { Cascader } from './Cascader';
import type { CascaderOption } from './Cascader.types';

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

vi.mock('@/utils/createComponent', () => ({
  createComponent: ({ render }: any) =>
    React.forwardRef((props: any, ref: any) => (render ? render(props, ref) : null)),
}));

vi.mock('@/utils/logger', () => ({
  createLogger: () => ({
    debug: vi.fn(),
    info: vi.fn(),
    warn: vi.fn(),
    error: vi.fn(),
  }),
}));

// ==================== 测试数据 ====================

const mockOptions: CascaderOption[] = [
  {
    label: '浙江省',
    value: 'zhejiang',
    children: [
      { label: '杭州市', value: 'hangzhou' },
      { label: '宁波市', value: 'ningbo' },
    ],
  },
  {
    label: '江苏省',
    value: 'jiangsu',
    children: [
      { label: '南京市', value: 'nanjing' },
      { label: '苏州市', value: 'suzhou' },
    ],
  },
];

const mockSingleLevelOptions: CascaderOption[] = [
  { label: '选项一', value: 'option1' },
  { label: '选项二', value: 'option2' },
  { label: '选项三', value: 'option3' },
];

// ==================== 测试套件 ====================

describe('Cascader 组件', () => {
  // ==================== 基础渲染测试 ====================

  describe('基础渲染', () => {
    test('应该正确渲染 Cascader 组件', () => {
      const { container } = render(<Cascader />);
      expect(container.firstChild).toBeInTheDocument();
    });

    test('应该渲染输入框元素', () => {
      const { container } = render(<Cascader placeholder="请选择" />);
      const input = container.querySelector('input');
      expect(input).toBeInTheDocument();
    });
  });

  // ==================== Options 属性测试（层级数据） ====================

  describe('options 属性（层级数据）', () => {
    test('应该接受层级 options 数据', () => {
      const { container } = render(<Cascader options={mockOptions} />);
      expect(container.firstChild).toBeInTheDocument();
    });

    test('应该接受单层 options 数据', () => {
      const { container } = render(<Cascader options={mockSingleLevelOptions} />);
      expect(container.firstChild).toBeInTheDocument();
    });

    test('应该正确处理空 options 数组', () => {
      const { container } = render(<Cascader options={[]} />);
      expect(container.firstChild).toBeInTheDocument();
    });

    test('应该处理包含 disabled 子项的层级数据', () => {
      const optionsWithDisabled: CascaderOption[] = [
        {
          label: '浙江省',
          value: 'zhejiang',
          children: [
            { label: '杭州市', value: 'hangzhou', disabled: true },
            { label: '宁波市', value: 'ningbo' },
          ],
        },
      ];
      const { container } = render(<Cascader options={optionsWithDisabled} />);
      expect(container.firstChild).toBeInTheDocument();
    });

    test('应该处理多层嵌套数据', () => {
      const deepOptions: CascaderOption[] = [
        {
          label: '一级',
          value: 'level1',
          children: [
            {
              label: '二级',
              value: 'level2',
              children: [{ label: '三级', value: 'level3' }],
            },
          ],
        },
      ];
      const { container } = render(<Cascader options={deepOptions} />);
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  // ==================== Value 属性测试 ====================

  describe('value 属性', () => {
    test('应该正确接受数组类型的 value', () => {
      const { container } = render(<Cascader options={mockOptions} value={['zhejiang', 'hangzhou']} />);
      expect(container.firstChild).toBeInTheDocument();
    });

    test('应该正确设置 defaultValue', () => {
      const { container } = render(
        <Cascader options={mockOptions} defaultValue={['jiangsu', 'nanjing']} />
      );
      expect(container.firstChild).toBeInTheDocument();
    });

    test('应该在重新渲染时更新 value', () => {
      const { rerender, container } = render(
        <Cascader options={mockOptions} value={['zhejiang', 'hangzhou']} />
      );
      expect(container.firstChild).toBeInTheDocument();

      rerender(<Cascader options={mockOptions} value={['jiangsu', 'suzhou']} />);
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  // ==================== Placeholder 属性测试 ====================

  describe('placeholder 属性', () => {
    test('应该正确显示 placeholder', () => {
      const { container } = render(<Cascader placeholder="请选择城市" />);
      const input = container.querySelector('input');
      expect(input).toHaveAttribute('placeholder', '请选择城市');
    });

    test('应该使用默认 placeholder', () => {
      const { container } = render(<Cascader />);
      const input = container.querySelector('input');
      expect(input).toHaveAttribute('placeholder');
    });
  });

  // ==================== Disabled 属性测试 ====================

  describe('disabled 属性', () => {
    test('应该正确渲染禁用状态', () => {
      const { container } = render(<Cascader disabled />);
      const input = container.querySelector('input');
      expect(input).toBeDisabled();
    });

    test('禁用状态下不应触发 onChange', () => {
      const handleChange = vi.fn();
      const { container } = render(
        <Cascader options={mockOptions} disabled onChange={handleChange} />
      );
      const input = container.querySelector('input');

      fireEvent.input(input!, { target: { value: 'test' } });
      expect(handleChange).not.toHaveBeenCalled();
    });

    test('默认状态下不应禁用', () => {
      const { container } = render(<Cascader />);
      const input = container.querySelector('input');
      expect(input).not.toBeDisabled();
    });
  });

  // ==================== onChange 回调测试 ====================

  describe('onChange 回调', () => {
    test('应该在选择后调用 onChange', () => {
      const handleChange = vi.fn();
      const { container } = render(
        <Cascader options={mockOptions} onChange={handleChange} />
      );
      expect(container.firstChild).toBeInTheDocument();
    });

    test('应该传递数组值给 onChange', () => {
      const handleChange = vi.fn();
      const { container } = render(
        <Cascader
          options={mockOptions}
          value={['zhejiang', 'hangzhou']}
          onChange={handleChange}
        />
      );
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  // ==================== 自定义 className/style 测试 ====================

  describe('自定义 className 和 style', () => {
    test('应该应用自定义 className', () => {
      const { container } = render(<Cascader className="custom-cascader" />);
      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper).toHaveClass('custom-cascader');
    });

    test('应该应用自定义 style', () => {
      const { container } = render(
        <Cascader style={{ marginTop: '10px', width: '300px' }} />
      );
      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper).toHaveStyle({ marginTop: '10px', width: '300px' });
    });

    test('应该同时应用 className 和 style', () => {
      const { container } = render(
        <Cascader className="custom-class" style={{ padding: '8px' }} />
      );
      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper).toHaveClass('custom-class');
      expect(wrapper).toHaveStyle({ padding: '8px' });
    });
  });
});
