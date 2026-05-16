/**
 * i18n 类型定义
 * @module i18n/types
 */

import type { ReactNode } from 'react';

/**
 * 语言代码
 */
export type Locale = 'zh-CN' | 'en-US';

/**
 * 翻译数据递归类型
 */
export type Translations = {
  [key: string]: string | Translations;
};

/**
 * i18n 上下文值
 */
export interface I18nContextValue {
  /** 当前语言 */
  locale: Locale;
  /** 翻译函数 */
  t: (key: string, params?: Record<string, string>) => string;
  /** 格式化消息 */
  formatMessage: (options: FormatMessageOptions) => ReactNode;
  /** 切换语言 */
  setLocale: (locale: Locale) => void;
  /** 消息资源 */
  messages: Record<Locale, Record<string, unknown>>;
}

/**
 * 格式化消息选项
 */
export interface FormatMessageOptions {
  /** 消息 ID */
  id: string;
  /** 默认消息 */
  defaultMessage?: string;
  /** 参数 */
  values?: Record<string, string | number | ReactNode>;
  /** 描述 */
  description?: string;
}

/**
 * i18n Provider Props
 */
export interface I18nProviderProps {
  /** 默认语言 */
  defaultLocale?: Locale;
  /** 消息资源 */
  messages?: Record<Locale, Record<string, unknown>>;
  /** 子组件 */
  children: ReactNode;
}
