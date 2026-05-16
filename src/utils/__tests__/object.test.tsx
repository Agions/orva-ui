/**
 * 对象工具测试
 */

import { describe, it, expect } from 'vitest';
import {
  deepClone,
  deepMerge,
  pick,
  omit,
  get,
  set,
  has,
  isEqual,
  mapKeys,
  mapValues,
  deepMergeWithArrays,
  pickBy,
  omitBy,
  unset,
  diff,
  isEmpty,
  keys,
  values,
  entries,
  flatten,
  unflatten,
} from '../../utils/object';

describe('object', () => {
  describe('deepClone', () => {
    it('should clone primitive values', () => {
      expect(deepClone(42)).toBe(42);
      expect(deepClone('hello')).toBe('hello');
      expect(deepClone(true)).toBe(true);
    });

    it('should clone arrays', () => {
      const arr = [1, 2, 3];
      const cloned = deepClone(arr);
      expect(cloned).toEqual(arr);
      expect(cloned).not.toBe(arr);
    });

    it('should clone objects', () => {
      const obj = { a: 1, b: { c: 2 } };
      const cloned = deepClone(obj);
      expect(cloned).toEqual(obj);
      expect(cloned).not.toBe(obj);
      expect(cloned.b).not.toBe(obj.b);
    });

    it('should clone nested objects', () => {
      const obj = { a: { b: { c: { d: 1 } } } };
      const cloned = deepClone(obj);
      expect(cloned).toEqual(obj);
      expect(cloned.a.b.c).not.toBe(obj.a.b.c);
    });

    it('should clone dates', () => {
      const date = new Date('2024-01-01');
      const cloned = deepClone(date);
      expect(cloned).toEqual(date);
      expect(cloned).not.toBe(date);
    });

    it('should clone regex', () => {
      const regex = /test/gi;
      const cloned = deepClone(regex);
      expect(cloned).toEqual(regex);
      expect(cloned).not.toBe(regex);
    });
  });

  describe('deepMerge', () => {
    it('should merge simple objects', () => {
      const target = { a: 1 };
      const source = { b: 2 };
      const result = deepMerge(target, source);
      expect(result).toEqual({ a: 1, b: 2 });
    });

    it('should merge nested objects', () => {
      const target = { a: { b: 1 } };
      const source = { a: { c: 2 } };
      const result = deepMerge(target, source);
      expect(result).toEqual({ a: { b: 1, c: 2 } });
    });

    it('should overwrite nested values', () => {
      const target = { a: { b: 1 } };
      const source = { a: { b: 2 } };
      const result = deepMerge(target, source);
      expect(result).toEqual({ a: { b: 2 } });
    });

    it('should handle arrays by replacing', () => {
      const target = { a: [1, 2] };
      const source = { a: [3, 4] };
      const result = deepMerge(target, source);
      expect(result).toEqual({ a: [3, 4] });
    });
  });

  describe('deepMergeWithArrays', () => {
    it('should merge arrays by concatenating', () => {
      const target = { a: [1, 2] };
      const source = { a: [3, 4] };
      const result = deepMergeWithArrays(target, source);
      expect(result).toEqual({ a: [1, 2, 3, 4] });
    });
  });

  describe('pick', () => {
    it('should pick specified keys', () => {
      const obj = { a: 1, b: 2, c: 3 };
      expect(pick(obj, ['a', 'b'])).toEqual({ a: 1, b: 2 });
    });

    it('should return empty object for non-existent keys', () => {
      const obj = { a: 1 };
      expect(pick(obj, ['b', 'c'])).toEqual({});
    });

    it('should handle empty keys', () => {
      const obj = { a: 1 };
      expect(pick(obj, [])).toEqual({});
    });
  });

  describe('omit', () => {
    it('should omit specified keys', () => {
      const obj = { a: 1, b: 2, c: 3 };
      expect(omit(obj, ['b', 'c'])).toEqual({ a: 1 });
    });

    it('should return empty object when omitting all keys', () => {
      const obj = { a: 1 };
      expect(omit(obj, ['a'])).toEqual({});
    });
  });

  describe('pickBy', () => {
    it('should pick by predicate', () => {
      const obj = { a: 1, b: 2, c: 3 };
      expect(pickBy(obj, (v) => v > 1)).toEqual({ b: 2, c: 3 });
    });
  });

  describe('omitBy', () => {
    it('should omit by predicate', () => {
      const obj = { a: 1, b: 2, c: 3 };
      expect(omitBy(obj, (v) => v > 1)).toEqual({ a: 1 });
    });
  });

  describe('get', () => {
    it('should get nested values', () => {
      const obj = { a: { b: { c: 1 } } };
      expect(get(obj, 'a.b.c')).toBe(1);
    });

    it('should return undefined for non-existent paths', () => {
      const obj = { a: 1 };
      expect(get(obj, 'a.b.c')).toBeUndefined();
    });

    it('should support default value', () => {
      const obj = { a: 1 };
      expect(get(obj, 'a.b.c', 'default')).toBe('default');
    });

    it('should support array paths', () => {
      const obj = { a: [{ b: 1 }, { b: 2 }] };
      expect(get(obj, ['a', 0, 'b'])).toBe(1);
    });
  });

  describe('set', () => {
    it('should set nested values', () => {
      const obj = {};
      const result = set(obj as any, 'a.b.c', 1);
      expect(result).toEqual({ a: { b: { c: 1 } } });
    });

    it('should overwrite existing values', () => {
      const obj = { a: { b: 1 } };
      const result = set(obj, 'a.b', 2);
      expect(result).toEqual({ a: { b: 2 } });
    });
  });

  describe('unset', () => {
    it('should unset nested values', () => {
      const obj = { a: { b: { c: 1 } } };
      const result = unset(obj, 'a.b.c');
      expect(result).toEqual({ a: { b: {} } });
    });
  });

  describe('has', () => {
    it('should check nested keys', () => {
      const obj = { a: { b: 1 } };
      expect(has(obj, 'a.b')).toBe(true);
      expect(has(obj, 'a.c')).toBe(false);
    });

    it('should support array paths', () => {
      const obj = { a: [1, 2, 3] };
      expect(has(obj, ['a', 0])).toBe(true);
      expect(has(obj, ['a', 5])).toBe(false);
    });
  });

  describe('isEqual', () => {
    it('should compare primitives', () => {
      expect(isEqual(1, 1)).toBe(true);
      expect(isEqual(1, 2)).toBe(false);
      expect(isEqual('a', 'a')).toBe(true);
      expect(isEqual('a', 'b')).toBe(false);
    });

    it('should compare arrays', () => {
      expect(isEqual([1, 2, 3], [1, 2, 3])).toBe(true);
      expect(isEqual([1, 2, 3], [1, 2, 4])).toBe(false);
    });

    it('should compare objects', () => {
      expect(isEqual({ a: 1 }, { a: 1 })).toBe(true);
      expect(isEqual({ a: 1 }, { a: 2 })).toBe(false);
    });
  });

  describe('mapKeys', () => {
    it('should map object keys', () => {
      const obj = { a: 1, b: 2 };
      const result = mapKeys(obj, (key, value) => key.toUpperCase());
      expect(result).toEqual({ A: 1, B: 2 });
    });
  });

  describe('mapValues', () => {
    it('should map object values', () => {
      const obj = { a: 1, b: 2 };
      const result = mapValues(obj, (value) => value * 2);
      expect(result).toEqual({ a: 2, b: 4 });
    });
  });

  describe('diff', () => {
    it('should find differences between objects', () => {
      const obj1 = { a: 1, b: 2 };
      const obj2 = { a: 1, b: 3 };
      const result = diff(obj1, obj2);
      expect(result).toEqual({ b: 3 });
    });
  });

  describe('isEmpty', () => {
    it('should check empty objects', () => {
      expect(isEmpty({})).toBe(true);
      expect(isEmpty({ a: 1 })).toBe(false);
    });

    it('should check empty arrays', () => {
      expect(isEmpty([])).toBe(true);
      expect(isEmpty([1])).toBe(false);
    });
  });

  describe('keys', () => {
    it('should get object keys', () => {
      const obj = { a: 1, b: 2, c: 3 };
      expect(keys(obj)).toEqual(['a', 'b', 'c']);
    });
  });

  describe('values', () => {
    it('should get object values', () => {
      const obj = { a: 1, b: 2, c: 3 };
      expect(values(obj)).toEqual([1, 2, 3]);
    });
  });

  describe('flatten', () => {
    it('should flatten nested objects', () => {
      const obj = { a: 1, b: { c: 2, d: 3 } };
      expect(flatten(obj)).toEqual({ a: 1, 'b.c': 2, 'b.d': 3 });
    });
  });

  describe('unflatten', () => {
    it('should unflatten object to nested structure', () => {
      const obj = { a: 1, 'b.c': 2, 'b.d': 3 };
      const result = unflatten(obj);
      expect(result).toEqual({ a: 1, b: { c: 2, d: 3 } });
    });
  });
});
