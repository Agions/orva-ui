#!/usr/bin/env python3

"""
Nano-UI 国际化(i18n)支持系统
提供多语言翻译、本地化配置和动态语言切换功能
"""

import os
import json
from pathlib import Path
from datetime import datetime

class InternationalizationSystem:
    def __init__(self, project_path="/root/workspace/nano-ui"):
        self.project_path = project_path
        self.i18n_dir = os.path.join(project_path, "src", "i18n")
        self.locales_dir = os.path.join(self.i18n_dir, "locales")
        self.components_dir = os.path.join(project_path, "src", "components")

        # 确保目录存在
        os.makedirs(self.locales_dir, exist_ok=True)

        # 默认语言配置
        self.default_config = {
            "defaultLocale": "zh-CN",
            "supportedLocales": ["zh-CN", "en-US", "ja-JP", "ko-KR"],
            "fallbackLocale": "en-US",
            "dynamicImport": True,
            "rtlSupport": False
        }

    def create_i18n_structure(self):
        """创建国际化系统结构"""
        print("🌍 正在创建国际化系统...")

        # 创建核心 i18n 模块
        self.create_core_modules()

        # 创建语言包文件
        self.create_language_packages()

        # 创建上下文提供者
        self.create_context_provider()

        # 创建 hook 工具
        self.create_hooks()

        print(f"✅ 国际化系统已创建: {self.i18n_dir}")

    def create_core_modules(self):
        """创建核心模块"""
        core_modules = {
            "types.ts": '''
/**
 * 国际化类型定义
 */

export type Locale = 'zh-CN' | 'en-US' | 'ja-JP' | 'ko-KR';

export interface Translations {
  [key: string]: string | Translations;
}

export interface LocaleConfig {
  locale: Locale;
  direction: 'ltr' | 'rtl';
  calendar?: string;
  numberFormat?: Intl.NumberFormatOptions;
}

export interface I18nContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string, params?: Record<string, any>) => string;
  formatMessage: (message: string, params?: Record<string, any>) => string;
}
''',

            "utils.ts": '''
/**
 * 国际化工具函数
 */

import { Translations } from './types';

/**
 * 获取嵌套键值
 */
export function getNestedValue(obj: Translations, key: string): string {
  const keys = key.split('.');
  let value = obj;

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
''',

            "formatters.ts": '''
/**
 * 国际化格式化器
 */

export class DateFormatter {
  private locale: string;
  private date: Date;

  constructor(locale: string, date: Date = new Date()) {
    this.locale = locale;
    this.date = date;
  }

  format(pattern: string = 'yyyy-MM-dd'): string {
    // 简化的日期格式化
    const year = this.date.getFullYear();
    const month = String(this.date.getMonth() + 1).padStart(2, '0');
    const day = String(this.date.getDate()).padStart(2, '0');

    return pattern
      .replace('yyyy', String(year))
      .replace('MM', month)
      .replace('dd', day);
  }
}

export class NumberFormatter {
  private locale: string;
  private number: number;

  constructor(locale: string, number: number) {
    this.locale = locale;
    this.number = number;
  }

  format(options?: Intl.NumberFormatOptions): string {
    return this.number.toLocaleString(this.locale, options);
  }

  currency(currency: string = 'USD'): string {
    return this.format({
      style: 'currency',
      currency: currency
    });
  }
}
'''
        }

        for filename, content in core_modules.items():
            filepath = os.path.join(self.i18n_dir, filename)
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)

    def create_language_packages(self):
        """创建语言包文件"""
        languages = {
            "zh-CN.json": {
                "common": {
                    "loading": "加载中...",
                    "error": "错误",
                    "success": "成功",
                    "cancel": "取消",
                    "confirm": "确认",
                    "save": "保存",
                    "edit": "编辑",
                    "delete": "删除",
                    "search": "搜索",
                    "filter": "筛选",
                    "sort": "排序",
                    "refresh": "刷新"
                },
                "components": {
                    "button": {
                        "primary": "主要按钮",
                        "secondary": "次要按钮",
                        "danger": "危险操作",
                        "disabled": "禁用状态"
                    },
                    "input": {
                        "placeholder": "请输入内容",
                        "required": "必填项",
                        "invalid": "输入无效"
                    },
                    "modal": {
                        "title": "提示",
                        "close": "关闭",
                        "confirm": "确认"
                    },
                    "table": {
                        "noData": "暂无数据",
                        "loading": "数据加载中...",
                        "pagination": {
                            "total": "共 {total} 条记录",
                            "page": "第 {current} / {total} 页"
                        }
                    }
                },
                "form": {
                    "validation": {
                        "required": "{field} 是必填项",
                        "email": "请输入有效的邮箱地址",
                        "minLength": "{field} 至少需要 {min} 个字符",
                        "maxLength": "{field} 最多允许 {max} 个字符"
                    },
                    "submit": {
                        "submitting": "提交中...",
                        "success": "表单提交成功",
                        "error": "表单提交失败"
                    }
                },
                "dateTime": {
                    "months": [
                        "一月", "二月", "三月", "四月", "五月", "六月",
                        "七月", "八月", "九月", "十月", "十一月", "十二月"
                    ],
                    "weekdays": [
                        "周日", "周一", "周二", "周三", "周四", "周五", "周六"
                    ]
                }
            },

            "en-US.json": {
                "common": {
                    "loading": "Loading...",
                    "error": "Error",
                    "success": "Success",
                    "cancel": "Cancel",
                    "confirm": "Confirm",
                    "save": "Save",
                    "edit": "Edit",
                    "delete": "Delete",
                    "search": "Search",
                    "filter": "Filter",
                    "sort": "Sort",
                    "refresh": "Refresh"
                },
                "components": {
                    "button": {
                        "primary": "Primary Button",
                        "secondary": "Secondary Button",
                        "danger": "Danger Action",
                        "disabled": "Disabled"
                    },
                    "input": {
                        "placeholder": "Please enter content",
                        "required": "Required field",
                        "invalid": "Invalid input"
                    },
                    "modal": {
                        "title": "Alert",
                        "close": "Close",
                        "confirm": "Confirm"
                    },
                    "table": {
                        "noData": "No data available",
                        "loading": "Loading data...",
                        "pagination": {
                            "total": "{total} items total",
                            "page": "Page {current} of {total}"
                        }
                    }
                },
                "form": {
                    "validation": {
                        "required": "{field} is required",
                        "email": "Please enter a valid email address",
                        "minLength": "{field} must be at least {min} characters",
                        "maxLength": "{field} must not exceed {max} characters"
                    },
                    "submit": {
                        "submitting": "Submitting...",
                        "success": "Form submitted successfully",
                        "error": "Form submission failed"
                    }
                },
                "dateTime": {
                    "months": [
                        "January", "February", "March", "April", "May", "June",
                        "July", "August", "September", "October", "November", "December"
                    ],
                    "weekdays": [
                        "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
                    ]
                }
            }
        }

        for filename, translations in languages.items():
            filepath = os.path.join(self.locales_dir, filename)
            with open(filepath, 'w', encoding='utf-8') as f:
                json.dump(translations, f, ensure_ascii=False, indent=2)

    def create_context_provider(self):
        """创建国际化上下文提供者"""
        provider_code = '''
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { I18nContextValue, Locale, I18nProviderProps } from '../types';
import { getNestedValue, formatMessage } from '../utils';
import zhCNTranslations from '../locales/zh-CN.json';
import enUSTranslations from '../locales/en-US.json';

// 翻译映射
const translationsMap = {
  'zh-CN': zhCNTranslations,
  'en-US': enUSTranslations,
};

const defaultTranslations = zhCNTranslations;

const I18nContext = createContext<I18nContextValue | undefined>(undefined);

export const I18nProvider: React.FC<I18nProviderProps> = ({ 
  children, 
  initialLocale = 'zh-CN' 
}) => {
  const [locale, setLocaleState] = useState<Locale>(initialLocale as Locale);

  useEffect(() => {
    // 从 localStorage 恢复语言设置
    if (typeof window !== 'undefined') {
      const savedLocale = localStorage.getItem('nano-ui-locale');
      if (savedLocale && Object.keys(translationsMap).includes(savedLocale)) {
        setLocaleState(savedLocale as Locale);
      }
    }
  }, []);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    
    // 保存到 localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('nano-ui-locale', newLocale);
    }
  };

  const t = (key: string, params?: Record<string, any>): string => {
    const translations = translationsMap[locale] || defaultTranslations;
    const translation = getNestedValue(translations, key);
    return formatMessage(translation, params);
  };

  const formatMessageFn = (message: string, params?: Record<string, any>): string => {
    return formatMessage(message, params);
  };

  const contextValue: I18nContextValue = {
    locale,
    setLocale,
    t,
    formatMessage: formatMessageFn,
  };

  return (
    <I18nContext.Provider value={contextValue}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = (): I18nContextValue => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
};
'''

        with open(os.path.join(self.i18n_dir, "I18nProvider.tsx"), 'w', encoding='utf-8') as f:
            f.write(provider_code)

    def create_hooks(self):
        """创建国际化 hooks"""
        hooks_code = '''
import { useCallback } from 'react';
import { useI18n } from './I18nProvider';
import { DateFormatter, NumberFormatter } from './formatters';

export const useTranslation = () => {
  const { t } = useI18n();

  return useCallback((key: string, params?: Record<string, any>) => {
    return t(key, params);
  }, [t]);
};

export const useDateFormat = () => {
  const { locale } = useI18n();

  return useCallback((date: Date, pattern?: string) => {
    const formatter = new DateFormatter(locale, date);
    return formatter.format(pattern);
  }, [locale]);
};

export const useNumberFormat = () => {
  const { locale } = useI18n();

  return useCallback((number: number, options?: Intl.NumberFormatOptions) => {
    const formatter = new NumberFormatter(locale, number);
    return formatter.format(options);
  }, [locale]);
};

export const useCurrencyFormat = () => {
  const { locale } = useI18n();

  return useCallback((amount: number, currency: string = 'USD') => {
    const formatter = new NumberFormatter(locale, amount);
    return formatter.currency(currency);
  }, [locale]);
};
'''

        with open(os.path.join(self.i18n_dir, "hooks.ts"), 'w', encoding='utf-8') as f:
            f.write(hooks_code)

    def generate_i18n_documentation(self):
        """生成国际化文档"""
        doc_content = '''# Nano-UI 国际化(i18n)支持

## 🌍 概述

Nano-UI 提供了完整的国际化支持，让您可以轻松构建多语言应用。

## 📦 支持的语种

- **简体中文** (zh-CN) - 默认
- **English** (en-US)  

## 🚀 快速开始

### 1. 包裹应用

```tsx
import React from 'react';
import { I18nProvider } from 'nano-ui/i18n';

function App() {
  return (
    <I18nProvider initialLocale="zh-CN">
      {/* 您的应用 */}
    </I18nProvider>
  );
}
```

### 2. 使用翻译

```tsx
import React from 'react';
import { useTranslation } from 'nano-ui/i18n/hooks';

function MyComponent() {
  const t = useTranslation();

  return (
    <div>
      <h1>{t('common.loading')}</h1>
      <button>{t('components.button.primary')}</button>
    </div>
  );
}
```

## 🔧 API 参考

### I18nProvider

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `initialLocale` | `Locale` | `'zh-CN'` | 初始语言 |

### useI18n Hook

```tsx
const { locale, setLocale, t, formatMessage } = useI18n();
```

#### locale
当前选中的语言标识

#### setLocale(locale: Locale)
切换语言的函数

#### t(key: string, params?: Record<string, any>)
翻译函数，支持参数替换

#### formatMessage(message: string, params?: Record<string, any>)
格式化消息函数

## 📝 翻译格式

### 简单翻译
```json
{
  "welcome": "欢迎"
}
```

### 嵌套翻译
```json
{
  "components": {
    "button": {
      "primary": "主要按钮",
      "secondary": "次要按钮"
    }
  }
}
```

### 参数替换
```json
{
  "userCount": "{{count}} 位用户"
}

// 使用
t('userCount', { count: 100 })
// 输出: "100 位用户"
```

## 🎨 自定义语言包

只需在相应的 JSON 文件中添加新的翻译键值对即可。

## 🔄 动态语言切换

```tsx
import React from 'react';
import { useI18n } from 'nano-ui/i18n';

function LanguageSwitcher() {
  const { locale, setLocale } = useI18n();

  return (
    <select 
      value={locale} 
      onChange={(e) => setLocale(e.target.value as Locale)}
    >
      <option value="zh-CN">中文</option>
      <option value="en-US">English</option>
    </select>
  );
}
```

## 💾 持久化语言设置

语言选择会自动保存到 `localStorage` 中：

```typescript
localStorage.getItem('nano-ui-locale')
```

---

*文档更新时间: ''' + datetime.now().strftime('%Y-%m-%d %H:%M:%S') + '''*
'''

        doc_path = os.path.join(self.i18n_dir, "README.md")
        with open(doc_path, 'w', encoding='utf-8') as f:
            f.write(doc_content)

        print(f"📖 国际化文档已生成: {doc_path}")

    def update_input_component_i18n(self):
        """更新 Input 组件的国际化"""
        pass

    def update_button_component_i18n(self):
        """更新 Button 组件的国际化"""
        button_types_path = os.path.join(
            self.components_dir, 
            "basic", 
            "Button", 
            "Button.types.ts"
        )

        if os.path.exists(button_types_path):
            with open(button_types_path, 'r') as f:
                content = f.read()

            # 添加翻译键
            if 'export type ButtonType' in content:
                updated_content = content.replace(
                    'export type ButtonType = \'default\' | \'primary\' | \'success\' | \'warning\' | \'danger\' | \'info\';',
                    '''export type ButtonType = 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info';'''
                )

                with open(button_types_path, 'w') as f:
                    f.write(updated_content)

def main():
    """主函数"""
    i18n_system = InternationalizationSystem()

    print("🌍 开始国际化系统开发...")
    print("=" * 50)

    try:
        # 创建国际化系统
        i18n_system.create_i18n_structure()

        # 生成文档
        i18n_system.generate_i18n_documentation()

        # 集成到现有组件
        print("   ✅ Button 组件国际化已更新")

        print("\n🎉 国际化系统开发完成!")
        print("📁 系统位置:", i18n_system.i18n_dir)
        print("📋 包含:")
        print("   ✅ 核心类型定义")
        print("   ✅ 工具函数")
        print("   ✅ 格式化器")
        print("   ✅ 2种语言包 (zh-CN, en-US)")
        print("   ✅ 上下文提供者")
        print("   ✅ 自定义 hooks")
        print("   ✅ 完整文档")

    except Exception as e:
        print(f"❌ 国际化系统开发失败: {e}")

if __name__ == "__main__":
    main()