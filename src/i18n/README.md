# Nano-UI 国际化(i18n)支持

## 🌍 概述

Nano-UI 提供了完整的国际化支持，让您可以轻松构建多语言应用。

## 📦 支持的语种

- **简体中文** (zh-CN) - 默认
- **English** (en-US)  

## 🚀 快速开始

### 1. 包裹应用

```tsx
import React from 'react';
import { I18nProvider } from 'orva-ui/i18n';

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
import { useTranslation } from 'orva-ui/i18n/hooks';

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
import { useI18n } from 'orva-ui/i18n';

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
localStorage.getItem('orva-ui-locale')
```

---

*文档更新时间: 2026-05-13 21:23:56*
