/**
 * Table 表格组件单元测试
 * @module components/display/Table/Table.test
 */

import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import { Table } from '../Table';
import { ThemeProvider } from '@/providers/ThemeProvider';

const renderWithProvider = (ui: React.ReactElement) => {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
};

const mockColumns = [
  { title: '姓名', dataIndex: 'name', key: 'name' },
  { title: '年龄', dataIndex: 'age', key: 'age' },
];

const mockDataSource = [
  { key: '1', name: '张三', age: 25 },
  { key: '2', name: '李四', age: 30 },
];

describe('Table 表格组件', () => {
  describe('基础渲染', () => {
    it('应该渲染表格组件', () => {
      const { container } = renderWithProvider(<Table columns={mockColumns} dataSource={mockDataSource} />);
      expect(container.firstChild).toBeTruthy();
    });

    it('应该渲染空数据表格', () => {
      const { container } = renderWithProvider(<Table columns={mockColumns} dataSource={[]} />);
      expect(container.firstChild).toBeTruthy();
    });
  });

  describe('功能属性', () => {
    it('应该支持斑马纹', () => {
      const { container } = renderWithProvider(<Table columns={mockColumns} dataSource={mockDataSource} striped />);
      expect(container.firstChild).toBeTruthy();
    });

    it('应该支持边框', () => {
      const { container } = renderWithProvider(<Table columns={mockColumns} dataSource={mockDataSource} bordered />);
      expect(container.firstChild).toBeTruthy();
    });
  });

  describe('事件处理', () => {
    it('应该接受 onRowClick 回调', () => {
      const handleRowClick = vi.fn();
      const { container } = renderWithProvider(
        <Table columns={mockColumns} dataSource={mockDataSource} onRowClick={handleRowClick} />
      );
      expect(container.firstChild).toBeTruthy();
    });
  });
});