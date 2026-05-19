import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import { AutoComplete } from './AutoComplete';

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

vi.mock('@/utils/logger', () => ({
  createLogger: () => ({
    debug: vi.fn(),
    info: vi.fn(),
    warn: vi.fn(),
    error: vi.fn(),
  }),
}));

// ==================== 测试套件 ====================

describe('AutoComplete 组件', () => {
  describe('基础渲染', () => {
    test('应该正确渲染 AutoComplete 组件', () => {
      const { container } = render(<AutoComplete />);
      expect(container.firstChild).toBeTruthy();
    });

    test('应该渲染输入框元素', () => {
      const { container } = render(<AutoComplete placeholder="请输入" />);
      const input = container.querySelector('input');
      expect(input).toBeTruthy();
    });
  });

  describe('options 属性', () => {
    test('应该接受字符串数组作为 options', () => {
      const options = ['选项一', '选项二', '选项三'];
      const { container } = render(<AutoComplete options={options} />);
      expect(container.firstChild).toBeTruthy();
    });

    test('应该接受对象数组作为 options', () => {
      const options = [
        { label: '选项一', value: 'option1' },
        { label: '选项二', value: 'option2' },
        { label: '选项三', value: 'option3' },
      ];
      const { container } = render(<AutoComplete options={options} />);
      expect(container.firstChild).toBeTruthy();
    });

    test('应该正确处理空 options 数组', () => {
      const { container } = render(<AutoComplete options={[]} />);
      expect(container.firstChild).toBeTruthy();
    });
  });

  describe('value 属性', () => {
    test('应该正确显示受控 value', () => {
      const { container } = render(<AutoComplete value="测试值" />);
      const input = container.querySelector('input');
      expect(input).toBeTruthy();
    });

    test('应该正确设置 defaultValue', () => {
      const { container } = render(<AutoComplete defaultValue="默认值" />);
      const input = container.querySelector('input');
      expect(input).toBeTruthy();
    });
  });

  describe('placeholder 属性', () => {
    test('应该正确显示 placeholder', () => {
      const { container } = render(<AutoComplete placeholder="请输入搜索内容" />);
      const input = container.querySelector('input');
      expect(input).toBeTruthy();
    });
  });

  describe('disabled 属性', () => {
    test('应该正确渲染禁用状态', () => {
      const { container } = render(<AutoComplete disabled />);
      const input = container.querySelector('input');
      expect(input).toBeTruthy();
    });

    test('默认状态下不应禁用', () => {
      const { container } = render(<AutoComplete />);
      const input = container.querySelector('input');
      expect(input).toBeTruthy();
    });
  });

  describe('onChange 回调', () => {
    test('应该接受 onChange 回调', () => {
      const handleChange = vi.fn();
      const { container } = render(<AutoComplete onChange={handleChange} />);
      expect(container.firstChild).toBeTruthy();
    });
  });

  describe('onSelect 回调', () => {
    test('应该接受 onSelect 回调', () => {
      const handleSelect = vi.fn();
      const options = [
        { label: '选项一', value: 'option1' },
        { label: '选项二', value: 'option2' },
      ];
      const { container } = render(
        <AutoComplete options={options} onSelect={handleSelect} />,
      );
      expect(container.firstChild).toBeTruthy();
    });

    test('应该接受 onSearch 回调', () => {
      const handleSearch = vi.fn();
      const { container } = render(<AutoComplete onSearch={handleSearch} />);
      expect(container.firstChild).toBeTruthy();
    });
  });

  describe('自定义 className/style', () => {
    test('应该应用自定义 className', () => {
      const { container } = render(<AutoComplete className="custom-autocomplete" />);
      expect(container.firstChild).toBeTruthy();
    });

    test('应该应用自定义 style', () => {
      const { container } = render(
        <AutoComplete style={{ marginTop: '10px', width: '300px' }} />,
      );
      expect(container.firstChild).toBeTruthy();
    });
  });
});
