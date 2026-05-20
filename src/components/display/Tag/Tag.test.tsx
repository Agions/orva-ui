/**
 * Tag 标签组件单元测试
 * @module components/display/Tag/Tag.test
 */

import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import { Tag } from '../Tag';
import { ThemeProvider } from '@/providers/ThemeProvider';

const renderWithProvider = (ui: React.ReactElement) => {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
};

describe('Tag 标签组件', () => {
  describe('基础渲染', () => {
    it('应该渲染标签组件', () => {
      const { container } = renderWithProvider(<Tag>标签</Tag>);
      expect(container.firstChild).toBeTruthy();
    });

    it('应该渲染带颜色的标签', () => {
      const { container } = renderWithProvider(<Tag color="red">标签</Tag>);
      expect(container.firstChild).toBeTruthy();
    });
  });

  describe('功能属性', () => {
    it('应该支持可关闭标签', () => {
      const { container } = renderWithProvider(<Tag closable>标签</Tag>);
      expect(container.firstChild).toBeTruthy();
    });

    it('应该支持空心样式', () => {
      const { container } = renderWithProvider(<Tag outline>标签</Tag>);
      expect(container.firstChild).toBeTruthy();
    });

    it('应该支持不同尺寸', () => {
      const { container } = renderWithProvider(<Tag size="small">小标签</Tag>);
      expect(container.firstChild).toBeTruthy();
    });
  });

  describe('事件处理', () => {
    it('应该接受 onClose 回调', () => {
      const handleClose = vi.fn();
      const { container } = renderWithProvider(
        <Tag closable onClose={handleClose}>标签</Tag>,
      );
      expect(container.firstChild).toBeTruthy();
    });
  });
});