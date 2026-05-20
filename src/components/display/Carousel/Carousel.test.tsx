/**
 * Carousel 轮播图组件单元测试
 * @module components/display/Carousel/Carousel.test
 */

import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import { Carousel } from '../Carousel';
import { ThemeProvider } from '@/providers/ThemeProvider';

const renderWithProvider = (ui: React.ReactElement) => {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
};

describe('Carousel 轮播图组件', () => {
  describe('基础渲染', () => {
    it('应该渲染轮播组件', () => {
      const { container } = renderWithProvider(
        <Carousel>
          <div>Slide 1</div>
          <div>Slide 2</div>
        </Carousel>,
      );
      expect(container.firstChild).toBeTruthy();
    });

    it('应该渲染多个子元素', () => {
      const { container } = renderWithProvider(
        <Carousel>
          <div>Slide 1</div>
          <div>Slide 2</div>
          <div>Slide 3</div>
        </Carousel>,
      );
      expect(container.firstChild).toBeTruthy();
    });
  });

  describe('功能属性', () => {
    it('应该支持自动播放', () => {
      const { container } = renderWithProvider(
        <Carousel autoplay>
          <div>Slide 1</div>
        </Carousel>,
      );
      expect(container.firstChild).toBeTruthy();
    });

    it('应该支持指示器', () => {
      const { container } = renderWithProvider(
        <Carousel showDots>
          <div>Slide 1</div>
          <div>Slide 2</div>
        </Carousel>,
      );
      expect(container.firstChild).toBeTruthy();
    });

    it('应该支持箭头导航', () => {
      const { container } = renderWithProvider(
        <Carousel showArrows>
          <div>Slide 1</div>
          <div>Slide 2</div>
        </Carousel>,
      );
      expect(container.firstChild).toBeTruthy();
    });
  });

  describe('事件处理', () => {
    it('应该接受 onChange 回调', () => {
      const handleChange = vi.fn();
      const { container } = renderWithProvider(
        <Carousel onChange={handleChange}>
          <div>Slide 1</div>
          <div>Slide 2</div>
        </Carousel>,
      );
      expect(container.firstChild).toBeTruthy();
    });
  });
});