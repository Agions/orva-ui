/**
 * useDebounce 防抖 Hook 单元测试
 * @module hooks/effect/useDebounce.test
 */

import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useDebounce } from './useDebounce';

describe('useDebounce 防抖 Hook', () => {
  describe('基础功能', () => {
    it('应该返回初始值', () => {
      const { result } = renderHook(() => useDebounce('hello', 500));
      expect(result.current).toBe('hello');
    });

    it('应该接受自定义延迟时间', () => {
      const { result } = renderHook(() => useDebounce('test', 1000));
      expect(result.current).toBe('test');
    });

    it('应该处理数字类型', () => {
      const { result } = renderHook(() => useDebounce(123, 500));
      expect(result.current).toBe(123);
    });

    it('应该处理对象类型', () => {
      const obj = { key: 'value' };
      const { result } = renderHook(() => useDebounce(obj, 500));
      expect(result.current).toEqual(obj);
    });

    it('应该处理空字符串', () => {
      const { result } = renderHook(() => useDebounce('', 500));
      expect(result.current).toBe('');
    });

    it('应该处理 null', () => {
      const { result } = renderHook(() => useDebounce(null, 500));
      expect(result.current).toBeNull();
    });
  });
});