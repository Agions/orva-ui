/**
 * 响应式工具测试
 */

import { describe, it, expect } from 'vitest';
import {
  getBreakpoint,
  isBreakpoint,
  getContainerWidth,
  getContainerStyle,
  getResponsiveValue,
  getResponsivePadding,
  getResponsiveMargin,
  getResponsiveFontSize,
  getResponsiveLineHeight,
} from '../../utils/responsive';

describe('responsiveUtils', () => {
  describe('getBreakpoint', () => {
    it('should get breakpoint value', () => {
      expect(getBreakpoint('xs')).toBe(0);
      expect(getBreakpoint('sm')).toBe(640);
      expect(getBreakpoint('md')).toBe(768);
      expect(getBreakpoint('lg')).toBe(1024);
      expect(getBreakpoint('xl')).toBe(1280);
      expect(getBreakpoint('2xl')).toBe(1536);
    });
  });

  describe('isBreakpoint', () => {
    it('should check if width matches breakpoint', () => {
      expect(isBreakpoint(500, 'xs')).toBe(true);
      expect(isBreakpoint(500, 'sm')).toBe(false);
      expect(isBreakpoint(800, 'md')).toBe(true);
      expect(isBreakpoint(800, 'lg')).toBe(false);
    });
  });

  describe('getContainerWidth', () => {
    it('should get container width by breakpoint', () => {
      expect(getContainerWidth('sm')).toBe(640);
      expect(getContainerWidth('md')).toBe(768);
      expect(getContainerWidth('lg')).toBe(1024);
      expect(getContainerWidth('xl')).toBe(1280);
    });
  });

  describe('getContainerStyle', () => {
    it('should get container style', () => {
      const style = getContainerStyle('md');
      expect(style.maxWidth).toBe('768px');
      expect(style.width).toBe('100%');
    });
  });

  describe('getResponsiveValue', () => {
    it('should get responsive value by breakpoint', () => {
      const values = { xs: 1, sm: 2, md: 3, lg: 4, xl: 5 };
      expect(getResponsiveValue(values, 'xs')).toBe(1);
      expect(getResponsiveValue(values, 'sm')).toBe(2);
      expect(getResponsiveValue(values, 'md')).toBe(3);
    });
  });

  describe('getResponsivePadding', () => {
    it('should get responsive padding', () => {
      const padding = { xs: 4, sm: 8, md: 12, lg: 16, xl: 20 };
      expect(getResponsivePadding(padding, 'md')).toBe(12);
    });
  });

  describe('getResponsiveMargin', () => {
    it('should get responsive margin', () => {
      const margin = { xs: 4, sm: 8, md: 12, lg: 16, xl: 20 };
      expect(getResponsiveMargin(margin, 'lg')).toBe(16);
    });
  });

  describe('getResponsiveFontSize', () => {
    it('should get responsive font size', () => {
      const sizes = { xs: 12, sm: 14, md: 16, lg: 18, xl: 20 };
      expect(getResponsiveFontSize(sizes, 'md')).toBe(16);
    });
  });

  describe('getResponsiveLineHeight', () => {
    it('should get responsive line height', () => {
      const heights = { xs: 1.4, sm: 1.5, md: 1.6, lg: 1.7, xl: 1.8 };
      expect(getResponsiveLineHeight(heights, 'md')).toBe(1.6);
    });
  });
});
