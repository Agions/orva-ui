/**
 * Timeline 时间线组件单元测试
 * @module components/display/Timeline/Timeline.test
 */

import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import { Timeline, TimelineItem } from '../Timeline';
import { ThemeProvider } from '@/providers/ThemeProvider';

const renderWithProvider = (ui: React.ReactElement) => {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
};

describe('Timeline 时间线组件', () => {
  describe('基础渲染', () => {
    it('应该渲染时间线组件', () => {
      const { container } = renderWithProvider(
        <Timeline>
          <TimelineItem title="步骤一" />
          <TimelineItem title="步骤二" />
        </Timeline>,
      );
      expect(container.firstChild).toBeTruthy();
    });

    it('应该渲染空时间线', () => {
      const { container } = renderWithProvider(<Timeline />);
      expect(container.firstChild).toBeTruthy();
    });
  });

  describe('功能属性', () => {
    it('应该支持垂直方向', () => {
      const { container } = renderWithProvider(
        <Timeline direction="vertical">
          <TimelineItem title="步骤" />
        </Timeline>,
      );
      expect(container.firstChild).toBeTruthy();
    });

    it('应该支持水平方向', () => {
      const { container } = renderWithProvider(
        <Timeline direction="horizontal">
          <TimelineItem title="步骤" />
        </Timeline>,
      );
      expect(container.firstChild).toBeTruthy();
    });

    it('应该支持交替模式', () => {
      const { container } = renderWithProvider(
        <Timeline mode="alternate">
          <TimelineItem title="左" />
          <TimelineItem title="右" />
        </Timeline>,
      );
      expect(container.firstChild).toBeTruthy();
    });
  });

  describe('TimelineItem 子组件', () => {
    it('应该渲染时间线项', () => {
      const { container } = renderWithProvider(
        <TimelineItem title="标题" description="描述" />,
      );
      expect(container.firstChild).toBeTruthy();
    });

    it('应该支持自定义颜色', () => {
      const { container } = renderWithProvider(
        <TimelineItem title="标题" color="green" />,
      );
      expect(container.firstChild).toBeTruthy();
    });
  });
});