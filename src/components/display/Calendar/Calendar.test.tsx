/**
 * Calendar 日历组件单元测试
 * @module components/display/Calendar/Calendar.test
 */

import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import { Calendar } from '../Calendar';
import { ThemeProvider } from '@/providers/ThemeProvider';

const renderWithProvider = (ui: React.ReactElement) => {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
};

describe('Calendar 日历组件', () => {
  describe('基础渲染', () => {
    it('应该渲染日历组件', () => {
      const { container } = renderWithProvider(<Calendar />);
      expect(container.firstChild).toBeTruthy();
    });

    it('应该渲染月视图模式', () => {
      const { container } = renderWithProvider(<Calendar mode="month" />);
      expect(container.firstChild).toBeTruthy();
    });
  });
});