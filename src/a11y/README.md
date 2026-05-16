# Nano-UI 无障碍(A11Y)支持

## ♿ 概述

Nano-UI 提供了完整的无障碍支持，确保所有用户都能平等地使用我们的组件库。

## 🎯 支持的辅助技术

- **屏幕阅读器**: NVDA, JAWS, VoiceOver, TalkBack
- **键盘导航**: 完整的 Tab 键和方向键支持
- **语音控制**: Dragon NaturallySpeaking, Windows Speech Recognition
- **高对比度**: 支持高对比度主题
- **放大镜**: 屏幕放大软件兼容性

## 🚀 快速开始

### 1. 启用无障碍支持

```tsx
import React from 'react';
import { A11yProvider } from 'orva-ui/a11y';

function App() {
  return (
    <A11yProvider>
      {/* 您的应用 */}
    </A11yProvider>
  );
}
```

### 2. 使用无障碍 hooks

```tsx
import React from 'react';
import { useKeyboardNavigation, useFocusManager } from 'orva-ui/a11y/hooks';

function MyComponent() {
  const { focusFirstChild } = useFocusManager();

  useKeyboardNavigation({
    onEnter: () => console.log('Enter pressed'),
    onEscape: () => console.log('Escape pressed'),
  });

  return (
    <button onClick={() => focusFirstChild('my-form')}>
      聚焦到表单
    </button>
  );
}
```

## 🔧 API 参考

### 核心 Hook

#### useKeyboardNavigation
为组件添加键盘事件处理。

```tsx
const handlers = {
  onEnter: () => {},
  onSpace: () => {},
  onEscape: () => {},
  onArrowUp: () => {},
  onArrowDown: () => {},
  onArrowLeft: () => {},
  onArrowRight: () => {},
  onTab: () => {},
};

useKeyboardNavigation(handlers, enabled);
```

#### useFocusManager
管理焦点元素。

```tsx
const { focusElementById, focusFirstChild } = useFocusManager();

// 聚焦到指定 ID
focusElementById('my-button');

// 聚焦到容器的第一个元素
focusFirstChild('my-container');
```

## 📝 无障碍最佳实践

### 1. 按钮组件

```tsx
import React from 'react';
import { AriaAssistant } from 'orva-ui/a11y/AriaAssistant';

function AccessibleButton({ 
  children, 
  disabled = false, 
  expanded = false 
}) {
  const ariaProps = AriaAssistant.generateButtonAria(disabled, expanded);

  return (
    <button {...ariaProps} disabled={disabled}>
      {children}
    </button>
  );
}
```

### 2. 输入框组件

```tsx
import React from 'react';
import { AriaAssistant } from 'orva-ui/a11y/AriaAssistant';

function AccessibleInput({ 
  label, 
  error, 
  required = false 
}) {
  const inputAria = AriaAssistant.generateInputAria(!!error, required, label);
  const labelAria = AriaAssistant.generateLabelAria('input-id', required);

  return (
    <div>
      <label {...labelAria}>
        {label}
        {required && <span aria-hidden="true"> *</span>}
      </label>
      <input id="input-id" {...inputAria} />
      {error && (
        <div 
          {...AriaAssistant.generateErrorMessageAria(error, 'error-message')}
        >
          {error}
        </div>
      )}
    </div>
  );
}
```

## 🛠️ 开发工具

### 无障碍检查脚本

```bash
npm run check-a11y
```

## 📋 无障碍标准遵循

### WCAG 2.1 AA 合规性

- ✅ **可感知性**: 内容可被所有感官感知
- ✅ **可操作性**: 界面可被所有用户操作
- ✅ **可理解性**: 信息和使用方式易于理解
- ✅ **健壮性**: 兼容辅助技术

---

*文档更新时间: 2026-05-13 21:29:18*
