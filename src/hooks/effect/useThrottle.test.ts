/**
 * useThrottle 节流 Hook 单元测试
 * @module hooks/effect/useThrottle.test
 */

import { describe, it, expect, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useThrottle } from './useThrottle';

describe('useThrottle 节流 Hook', () => {
  describe('基础功能', () => {
    it('应该返回初始值', () => {
      const { result } = renderHook(() => useThrottle('hello', 500));
      expect(result.current).toBe('hello');
    });

    it('应该接受自定义延迟时间', () => {
      const { result } = renderHook(() => useThrottle('test', 1000));
      expect(result.current).toBe('test');
    });
  });

  describe('节流功能', () => {
    it('应该节流更新值', async () => {
      const { result, rerender } = renderHook(
        ({ value, delay }) => useThrottle(value, delay),
        { initialProps: { value: 'initial', delay: 500 } }
      );

      expect(result.current).toBe('initial');

      // 快速更新多次
      rerender({ value: 'updated1', delay: 500 });
      expect(result.current).toBe('initial');

      rerender({ value: 'updated2', delay: 500 });
      expect(result.current).toBe('initial');

      // 等待节流时间后，值应该更新为最后一次的值
      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 600));
      });

      expect(result.current).toBe('updated2');
    });
  });

  describe('边界情况', () => {
    it('应该处理数字类型', () => {
      const { result } = renderHook(() => useThrottle(123, 500));
      expect(result.current).toBe(123);
    });

    it('应该处理对象类型', () => {
      const obj = { key: 'value' };
      const { result } = renderHook(() => useThrottle(obj, 500));
      expect(result.current).toEqual(obj);
    });

    it('应该处理空字符串', () => {
      const { result } = renderHook(() => useThrottle('', 500));
      expect(result.current).toBe('');
    });

    it('应该处理 null', () => {
      const { result } = renderHook(() => useThrottle(null, 500));
      expect(result.current).toBeNull();
    });
  });
});