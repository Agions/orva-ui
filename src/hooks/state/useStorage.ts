/**
 * useLocalStorage Hook
 * Persist state to localStorage with automatic serialization
 *
 * @example
 * ```typescript
 * const [user, setUser, removeUser] = useLocalStorage<User>('user', null);
 * setUser({ id: 1, name: 'John' }); // Saved to localStorage['user']
 * removeUser(); // Clears from localStorage
 * ```
 */

import { useState, useCallback, useEffect, useRef } from 'react';
import Taro from '@tarojs/taro';
import { createLogger } from '@/utils/logger';

const logger = createLogger('UseStorage');

export interface UseStorageOptions<T> {
  /** Custom serializer */
  serializer?: (value: T) => string;
  /** Custom deserializer */
  deserializer?: (value: string) => T;
  /** Initialize from storage on mount */
  initializeWithValue?: boolean;
}

/**
 * Hook for persisting state to localStorage
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T,
  options: UseStorageOptions<T> = {},
): [T, (value: T | ((prev: T) => T)) => void, () => void] {
  const { serializer = JSON.stringify, deserializer = JSON.parse, initializeWithValue = true } = options;

  const readValue = useCallback((): T => {
    try {
      return initialValue;
    } catch (error) {
      logger.warn(`Error reading storage key "${key}":`, error);
      return initialValue;
    }
  }, [initialValue]);

  const [storedValue, setStoredValue] = useState<T>(() => {
    if (initializeWithValue) {
      return readValue();
    }
    return initialValue;
  });

  // 用 ref 保存最新值，避免 setValue 依赖 storedValue 导致每次变化重建回调
  const storedValueRef = useRef(storedValue);
  storedValueRef.current = storedValue;

  // Set value in storage — 不依赖 storedValue，通过 ref 读取最新值
  const setValue = useCallback(
    (value: T | ((prev: T) => T)) => {
      try {
        const valueToStore = value instanceof Function ? value(storedValueRef.current) : value;
        setStoredValue(valueToStore);
        Taro.setStorageSync(key, serializer(valueToStore));
      } catch (error) {
        logger.warn(`Error setting storage key "${key}":`, error);
      }
    },
    [key, serializer],
  );

  // Remove value from storage
  const removeValue = useCallback(() => {
    try {
      Taro.removeStorageSync(key);
      setStoredValue(initialValue);
    } catch (error) {
      logger.warn(`Error removing storage key "${key}":`, error);
    }
  }, [key, initialValue]);

  // Fetch initial value from storage on mount
  useEffect(() => {
    try {
      const item = Taro.getStorageSync(key);
      if (item.data) {
        setStoredValue(deserializer(item.data));
      }
    } catch (error) {
      logger.warn(`Error reading storage key "${key}":`, error);
    }
  }, [key, deserializer]);

  return [storedValue, setValue, removeValue];
}

/**
 * Hook for persisting state to sessionStorage
 */
export function useSessionStorage<T>(
  key: string,
  initialValue: T,
  options: UseStorageOptions<T> = {},
): [T, (value: T | ((prev: T) => T)) => void, () => void] {
  const { serializer = JSON.stringify, deserializer = JSON.parse, initializeWithValue = true } = options;

  const readValue = useCallback((): T => {
    try {
      return initialValue;
    } catch (error) {
      logger.warn(`Error reading storage key "${key}":`, error);
      return initialValue;
    }
  }, [initialValue]);

  const [storedValue, setStoredValue] = useState<T>(() => {
    if (initializeWithValue) {
      return readValue();
    }
    return initialValue;
  });

  // 用 ref 保存最新值
  const storedValueRef = useRef(storedValue);
  storedValueRef.current = storedValue;

  const setValue = useCallback(
    (value: T | ((prev: T) => T)) => {
      try {
        const valueToStore = value instanceof Function ? value(storedValueRef.current) : value;
        setStoredValue(valueToStore);
        Taro.setStorageSync(key, serializer(valueToStore));
      } catch (error) {
        logger.warn(`Error setting storage key "${key}":`, error);
      }
    },
    [key, serializer],
  );

  const removeValue = useCallback(() => {
    try {
      Taro.removeStorageSync(key);
      setStoredValue(initialValue);
    } catch (error) {
      logger.warn(`Error removing storage key "${key}":`, error);
    }
  }, [key, initialValue]);

  return [storedValue, setValue, removeValue];
}
