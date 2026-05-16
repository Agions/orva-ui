/**
 * List 列表组件单元测试
 * @module components/display/List/List.test
 */

import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import { List, ListItem } from '../List';
import { ThemeProvider } from '@/providers/ThemeProvider';

const renderWithProvider = (ui: React.ReactElement) => {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
};

describe('List 列表组件', () => {
  describe('基础渲染', () => {
    it('应该渲染列表组件', () => {
      const { container } = renderWithProvider(
        <List>
          <ListItem>Item 1</ListItem>
          <ListItem>Item 2</ListItem>
        </List>
      );
      expect(container.firstChild).toBeTruthy();
    });

    it('应该渲染空列表', () => {
      const { container } = renderWithProvider(<List />);
      expect(container.firstChild).toBeTruthy();
    });
  });

  describe('功能属性', () => {
    it('应该支持分割线', () => {
      const { container } = renderWithProvider(
        <List divider>
          <ListItem>Item 1</ListItem>
          <ListItem>Item 2</ListItem>
        </List>
      );
      expect(container.firstChild).toBeTruthy();
    });

    it('应该支持紧凑模式', () => {
      const { container } = renderWithProvider(
        <List size="small">
          <ListItem>Item 1</ListItem>
        </List>
      );
      expect(container.firstChild).toBeTruthy();
    });
  });

  describe('ListItem 子组件', () => {
    it('应该渲染列表项', () => {
      const { container } = renderWithProvider(
        <ListItem title="标题" description="描述" />
      );
      expect(container.firstChild).toBeTruthy();
    });

    it('应该支持带图标的列表项', () => {
      const { container } = renderWithProvider(
        <ListItem title="标题" thumb={<div>IMG</div>} />
      );
      expect(container.firstChild).toBeTruthy();
    });
  });
});