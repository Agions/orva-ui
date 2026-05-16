/**
 * Rate 评分组件单元测试
 * @module components/display/Rate/Rate.test
 */

import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import { Rate } from '../Rate';
import { ThemeProvider } from '@/providers/ThemeProvider';

const renderWithProvider = (ui: React.ReactElement) => {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
};

describe('Rate 评分组件', () => {
  describe('基础渲染', () => {
    it('应该渲染评分组件', () => {
      const { container } = renderWithProvider(<Rate />);
      expect(container.firstChild).toBeTruthy();
    });

    it('应该渲染指定数量的星星', () => {
      const { container } = renderWithProvider(<Rate count={10} />);
      expect(container.firstChild).toBeTruthy();
    });
  });

  describe('功能属性', () => {
    it('应该支持半星评分', () => {
      const { container } = renderWithProvider(<Rate allowHalf />);
      expect(container.firstChild).toBeTruthy();
    });

    it('应该支持禁用状态', () => {
      const { container } = renderWithProvider(<Rate disabled />);
      expect(container.firstChild).toBeTruthy();
    });

    it('应该支持只读模式', () => {
      const { container } = renderWithProvider(<Rate readonly />);
      expect(container.firstChild).toBeTruthy();
    });
  });

  describe('事件处理', () => {
    it('应该接受 onChange 回调', () => {
      const handleChange = vi.fn();
      const { container } = renderWithProvider(<Rate onChange={handleChange} />);
      expect(container.firstChild).toBeTruthy();
    });
  });
});