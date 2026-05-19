/**
 * LazyComponent 懒加载组件单元测试
 * @module components/common/LazyComponent/LazyComponent.test
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { LazyComponent, createLazyComponent, clearComponentCache } from './LazyComponent';

vi.mock('@/utils/logger', () => ({
  createLogger: () => ({
    error: vi.fn(),
    warn: vi.fn(),
    info: vi.fn(),
  }),
}));

describe('LazyComponent 组件', () => {
  describe('createLazyComponent', () => {
    it('应该创建懒加载组件', () => {
      const LazyComp = createLazyComponent(() =>
        Promise.resolve({ default: () => <div>Lazy</div> })
      );
      expect(LazyComp).toBeDefined();
    });

    it('应该创建预加载组件', () => {
      const LazyComp = createLazyComponent(
        () => Promise.resolve({ default: () => <div>Eager</div> }),
        { strategy: 'eager' }
      );
      expect(LazyComp).toBeDefined();
    });

    it('应该创建预取组件', () => {
      const LazyComp = createLazyComponent(
        () => Promise.resolve({ default: () => <div>Prefetch</div> }),
        { strategy: 'prefetch' }
      );
      expect(LazyComp).toBeDefined();
    });

    it('clearComponentCache 应该清空缓存', () => {
      expect(() => clearComponentCache()).not.toThrow();
    });
  });
});
