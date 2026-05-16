
/**
 * 国际化工具函数
 */

import { Translations } from './types';

/**
 * 获取嵌套键值
 */
export function getNestedValue(obj: Translations, key: string): string {
  const keys = key.split('.');
  let value: string | Translations = obj;

  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = value[k];
    } else {
      return key; // 返回原始键作为回退
    }
  }

  return typeof value === 'string' ? value : key;
}

/**
 * 参数替换
 */
export function interpolate(template: string, params?: Record<string, any>): string {
  if (!params) return template;

  return template.replace(/\{\{(\w+)\}\}/g, (match, key) => {
    return params[key] || match;
  });
}

/**
 * 格式化消息
 */
export function formatMessage(message: string, params?: Record<string, any>): string {
  const interpolated = interpolate(message, params);
  return interpolated;
}
