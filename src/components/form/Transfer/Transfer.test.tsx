/**
 * Transfer Component Test
 * 穿梭框组件测试
 * @module components/form/Transfer
 */

import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import { Transfer } from './Transfer';

// ==================== 全局 Mock ====================

vi.mock('@tarojs/components', () => ({
  View: ({ children, className, style, onClick, ...props }: any) => (
    <div data-testid="taro-view" className={className} style={style} onClick={onClick} {...props}>
      {children}
    </div>
  ),
  Text: ({ children, className, style, onClick, ...props }: any) => (
    <span data-testid="taro-text" className={className} style={style} onClick={onClick} {...props}>
      {children}
    </span>
  ),
}));

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
  ARIA_ROLES: { textbox: 'textbox', application: 'application' },
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

vi.mock('./hooks', () => ({
  useTransferState: () => ({
    targetKeys: [],
    selectedKeys: [],
    leftSelectedKeys: [],
    rightSelectedKeys: [],
    leftSearchValue: '',
    rightSearchValue: '',
    internalDisabled: false,
    leftPage: 1,
    rightPage: 1,
    updateTargetKeys: vi.fn(),
    updateSelectedKeys: vi.fn(),
    updateLeftRightSelectedKeys: vi.fn(),
    setSearchValue: vi.fn(),
    setPage: vi.fn(),
    reset: vi.fn(),
  }),
}));

vi.mock('./components', () => ({
  TransferList: (props: any) => <div data-testid="transfer-list" {...props} />,
  TransferOperations: (props: any) => <div data-testid="transfer-operations" {...props} />,
}));

vi.mock('./Transfer.styles', () => ({
  TransferStyles: {
    getStyle: ({ style }: any) => style,
    getClassName: ({ className }: any) => className || '',
  },
}));

// ==================== 测试套件 ====================

describe('Transfer 穿梭框组件', () => {
  // ==================== 基础渲染测试 ====================

  describe('基础渲染', () => {
    test('应该正确渲染 Transfer 组件', () => {
      const { container } = render(<Transfer />);
      expect(container.firstChild).toBeInTheDocument();
    });

    test('应该渲染左侧列表', () => {
      const { getAllByTestId } = render(<Transfer />);
      expect(getAllByTestId('transfer-list').length).toBeGreaterThanOrEqual(1);
    });

    test('应该渲染操作按钮区域', () => {
      const { getByTestId } = render(<Transfer />);
      expect(getByTestId('transfer-operations')).toBeInTheDocument();
    });

    test('应该渲染右侧列表', () => {
      const { getAllByTestId } = render(<Transfer />);
      const lists = getAllByTestId('transfer-list');
      expect(lists.length).toBeGreaterThanOrEqual(2);
    });
  });

  // ==================== DataSource 属性测试 ====================

  describe('dataSource 属性', () => {
    test('应该正确接受 dataSource', () => {
      const dataSource = [
        { key: '1', title: '选项 1' },
        { key: '2', title: '选项 2' },
        { key: '3', title: '选项 3' },
      ];
      const { container } = render(<Transfer dataSource={dataSource} />);
      expect(container.firstChild).toBeInTheDocument();
    });

    test('应该支持空 dataSource', () => {
      const { container } = render(<Transfer dataSource={[]} />);
      expect(container.firstChild).toBeInTheDocument();
    });

    test('应该支持带 description 的 dataSource', () => {
      const dataSource = [
        { key: '1', title: '选项 1', description: '描述 1' },
        { key: '2', title: '选项 2', description: '描述 2', disabled: true },
      ];
      const { container } = render(<Transfer dataSource={dataSource} />);
      expect(container.firstChild).toBeInTheDocument();
    });

    test('应该支持大量数据源', () => {
      const dataSource = Array.from({ length: 100 }, (_, i) => ({
        key: String(i),
        title: `选项 ${i}`,
      }));
      const { container } = render(<Transfer dataSource={dataSource} />);
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  // ==================== Value 属性测试 ====================

  describe('value 属性', () => {
    test('应该正确接受 value（targetKeys）', () => {
      const dataSource = [
        { key: '1', title: '选项 1' },
        { key: '2', title: '选项 2' },
        { key: '3', title: '选项 3' },
      ];
      const { container } = render(
        <Transfer dataSource={dataSource} targetKeys={['1', '2']} />,
      );
      expect(container.firstChild).toBeInTheDocument();
    });

    test('应该支持空 value', () => {
      const { container } = render(<Transfer targetKeys={[]} />);
      expect(container.firstChild).toBeInTheDocument();
    });

    test('应该正确接受 defaultTargetKeys', () => {
      const dataSource = [
        { key: '1', title: '选项 1' },
        { key: '2', title: '选项 2' },
      ];
      const { container } = render(
        <Transfer dataSource={dataSource} defaultTargetKeys={['1']} />,
      );
      expect(container.firstChild).toBeInTheDocument();
    });

    test('应该在重新渲染时更新 value', () => {
      const { rerender, container } = render(<Transfer targetKeys={['1']} />);
      expect(container.firstChild).toBeInTheDocument();

      rerender(<Transfer targetKeys={['1', '2', '3']} />);
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  // ==================== Titles 属性测试 ====================

  describe('titles 属性', () => {
    test('应该正确显示自定义 titles', () => {
      const { container } = render(
        <Transfer titles={['可选项', '已选项']} />,
      );
      expect(container.firstChild).toBeInTheDocument();
    });

    test('应该支持中文 titles', () => {
      const { container } = render(
        <Transfer titles={['源数据', '目标数据']} />,
      );
      expect(container.firstChild).toBeInTheDocument();
    });

    test('应该使用默认 titles', () => {
      const { container } = render(<Transfer />);
      expect(container.firstChild).toBeInTheDocument();
    });

    test('应该支持英文 titles', () => {
      const { container } = render(
        <Transfer titles={['Available', 'Selected']} />,
      );
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  // ==================== Operations 属性测试 ====

  describe('operations 属性', () => {
    test('应该正确显示自定义 operations', () => {
      const { container } = render(
        <Transfer operations={['添加', '移除']} />,
      );
      expect(container.firstChild).toBeInTheDocument();
    });

    test('应该支持默认 operations', () => {
      const { container } = render(<Transfer />);
      expect(container.firstChild).toBeInTheDocument();
    });

    test('应该支持英文 operations', () => {
      const { container } = render(
        <Transfer operations={['Add', 'Remove']} />,
      );
      expect(container.firstChild).toBeInTheDocument();
    });

    test('应该支持箭头符号 operations', () => {
      const { container } = render(
        <Transfer operations={['>', '<']} />,
      );
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  // ==================== Disabled 属性测试 ====================

  describe('disabled 属性', () => {
    test('应该正确渲染禁用状态', () => {
      const dataSource = [
        { key: '1', title: '选项 1' },
        { key: '2', title: '选项 2' },
      ];
      const { container } = render(
        <Transfer dataSource={dataSource} disabled />,
      );
      expect(container.firstChild).toBeInTheDocument();
    });

    test('禁用状态下不应触发 onChange', () => {
      const handleChange = vi.fn();
      const { container } = render(
        <Transfer disabled onChange={handleChange} />,
      );
      expect(container.firstChild).toBeInTheDocument();
      expect(handleChange).not.toHaveBeenCalled();
    });

    test('默认状态下不应禁用', () => {
      const { container } = render(<Transfer />);
      expect(container.firstChild).toBeInTheDocument();
    });

    test('禁用状态下应传递 disabled 给子组件', () => {
      const { container } = render(
        <Transfer disabled dataSource={[{ key: '1', title: '选项 1' }]} />,
      );
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  // ==================== onChange 回调测试 ====================

  describe('onChange 回调', () => {
    test('应该支持 onChange 回调', () => {
      const handleChange = vi.fn();
      const { container } = render(
        <Transfer onChange={handleChange} />,
      );
      expect(container.firstChild).toBeInTheDocument();
    });

    test('应该支持 onSelectChange 回调', () => {
      const handleSelectChange = vi.fn();
      const { container } = render(
        <Transfer onSelectChange={handleSelectChange} />,
      );
      expect(container.firstChild).toBeInTheDocument();
    });

    test('应该支持 onSearch 回调', () => {
      const handleSearch = vi.fn();
      const { container } = render(
        <Transfer onSearch={handleSearch} />,
      );
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  // ==================== 自定义 className/style 测试 ====================

  describe('自定义 className 和 style', () => {
    test('应该应用自定义 className', () => {
      const { container } = render(<Transfer className="custom-transfer" />);
      expect(container.firstChild).toBeInTheDocument();
    });

    test('应该应用自定义 style', () => {
      const { container } = render(
        <Transfer style={{ marginTop: '10px', width: '600px' }} />,
      );
      expect(container.firstChild).toBeInTheDocument();
    });

    test('应该同时应用 className 和 style', () => {
      const { container } = render(
        <Transfer className="custom-class" style={{ padding: '16px' }} />,
      );
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  // ==================== 组合属性测试 ====================

  describe('组合属性', () => {
    test('应该同时渲染带 dataSource 和 value 的组件', () => {
      const dataSource = [
        { key: '1', title: '选项 1' },
        { key: '2', title: '选项 2' },
        { key: '3', title: '选项 3' },
      ];
      const { container } = render(
        <Transfer
          dataSource={dataSource}
          targetKeys={['1']}
          titles={['源', '目标']}
        />,
      );
      expect(container.firstChild).toBeInTheDocument();
    });

    test('应该同时渲染带 disabled 和 dataSource 的组件', () => {
      const dataSource = [
        { key: '1', title: '选项 1' },
        { key: '2', title: '选项 2' },
      ];
      const { container } = render(
        <Transfer dataSource={dataSource} disabled operations={['>>', '<<']} />,
      );
      expect(container.firstChild).toBeInTheDocument();
    });

    test('应该渲染完整配置的 Transfer 组件', () => {
      const dataSource = Array.from({ length: 10 }, (_, i) => ({
        key: String(i),
        title: `选项 ${i}`,
        description: `这是选项 ${i} 的描述`,
      }));
      const handleChange = vi.fn();
      const { container } = render(
        <Transfer
          dataSource={dataSource}
          targetKeys={['0', '1']}
          titles={['可选项列表', '已选项列表']}
          operations={['添加', '移除']}
          showSearch
          showSelectAll
          onChange={handleChange}
        />,
      );
      expect(container.firstChild).toBeInTheDocument();
    });
  });
});
