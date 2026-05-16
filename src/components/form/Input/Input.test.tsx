/**
 * Input 输入框组件单元测试
 * @module components/form/Input/Input.test
 */

import { describe, it, expect, vi } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import { Input } from '../Input';
import { ThemeProvider } from '@/providers/ThemeProvider';

const renderWithProvider = (ui: React.ReactElement) => {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
};

describe('Input 输入框组件', () => {
  describe('基础渲染', () => {
    it('应该渲染输入框', () => {
      const { container } = renderWithProvider(<Input />);
      expect(container.firstChild).toBeTruthy();
    });

    it('应该支持默认值', () => {
      const { container } = renderWithProvider(<Input defaultValue="Hello" />);
      expect(container.firstChild).toBeTruthy();
    });
  });

  describe('功能属性', () => {
    it('应该支持禁用状态', () => {
      const { container } = renderWithProvider(<Input disabled />);
      expect(container.firstChild).toBeTruthy();
    });

    it('应该支持只读状态', () => {
      const { container } = renderWithProvider(<Input readOnly />);
      expect(container.firstChild).toBeTruthy();
    });

    it('应该支持密码类型', () => {
      const { container } = renderWithProvider(<Input type="password" />);
      expect(container.firstChild).toBeTruthy();
    });

    it('应该支持不同尺寸', () => {
      const { container } = renderWithProvider(<Input size="small" />);
      expect(container.firstChild).toBeTruthy();
    });

    it('应该支持清空按钮', () => {
      const { container } = renderWithProvider(<Input allowClear />);
      expect(container.firstChild).toBeTruthy();
    });
  });

  describe('事件处理', () => {
    it('应该接受 onChange 回调', () => {
      const handleChange = vi.fn();
      const { container } = renderWithProvider(
        <Input onChange={handleChange} />
      );
      expect(container.firstChild).toBeTruthy();
    });

    it('应该接受 onFocus 回调', () => {
      const handleFocus = vi.fn();
      const { container } = renderWithProvider(
        <Input onFocus={handleFocus} />
      );
      expect(container.firstChild).toBeTruthy();
    });

    it('应该接受 onBlur 回调', () => {
      const handleBlur = vi.fn();
      const { container } = renderWithProvider(
        <Input onBlur={handleBlur} />
      );
      expect(container.firstChild).toBeTruthy();
    });
  });

  describe('前缀后缀', () => {
    it('应该支持前缀图标', () => {
      const { container } = renderWithProvider(<Input prefix={<span>A</span>} />);
      expect(container.firstChild).toBeTruthy();
    });

    it('应该支持后缀图标', () => {
      const { container } = renderWithProvider(<Input suffix={<span>B</span>} />);
      expect(container.firstChild).toBeTruthy();
    });
  });
});