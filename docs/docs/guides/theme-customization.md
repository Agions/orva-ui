# 主题定制

Taro Uno UI 支持灵活的主题定制，您可以根据项目需求自定义组件的颜色、字体、间距等样式属性。

## 🎨 主题系统概述

Taro Uno UI 的主题系统基于以下几个核心概念：

1. **主题配置对象**：通过 JavaScript 对象定义主题变量
2. **CSS 变量**：使用 CSS 变量实现主题的动态切换
3. **主题提供者**：使用 `AppProvider` 组件注入主题配置
4. **组件级样式覆盖**：支持针对单个组件的样式自定义

## 📝 全局主题配置

### 使用 AppProvider

您可以通过 `AppProvider` 组件配置全局主题，所有子组件都会继承这个主题配置：

```tsx
import { AppProvider } from 'orva-ui';
import App from './App';

const themeConfig = {
  colors: {
    primary: '#1890ff',
    success: '#52c41a',
    warning: '#faad14',
    error: '#f5222d',
    info: '#1890ff',
    text: {
      primary: '#000000d9',
      secondary: '#00000073',
      disabled: '#00000040',
    },
    background: {
      primary: '#ffffff',
      secondary: '#f5f5f5',
      disabled: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: '"Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif',
    fontSize: {
      xs: 12,
      sm: 14,
      md: 16,
      lg: 18,
      xl: 20,
    },
    fontWeight: {
      normal: 400,
      medium: 500,
      bold: 700,
    },
  },
  spacing: {
    base: 4,
  },
  effects: {
    borderRadius: {
      sm: 2,
      md: 4,
      lg: 8,
      xl: 12,
    },
    boxShadow: {
      sm: '0 2px 8px rgba(0, 0, 0, 0.15)',
      md: '0 4px 12px rgba(0, 0, 0, 0.15)',
      lg: '0 8px 24px rgba(0, 0, 0, 0.15)',
    },
  },
};

const Root = () => {
  return (
    <AppProvider theme={themeConfig}>
      <App />
    </AppProvider>
  );
};

export default Root;
```

### 主题配置类型

主题配置对象包含以下几个主要部分：

#### colors

| 属性 | 类型 | 描述 |
| --- | --- | --- |
| primary | string | 主色调 |
| success | string | 成功色 |
| warning | string | 警告色 |
| error | string | 错误色 |
| info | string | 信息色 |
| text | Object | 文本颜色配置 |
| background | Object | 背景颜色配置 |
| border | Object | 边框颜色配置 |

#### typography

| 属性 | 类型 | 描述 |
| --- | --- | --- |
| fontFamily | string | 字体族 |
| fontSize | Object | 字体大小配置 |
| fontWeight | Object | 字重配置 |
| lineHeight | Object | 行高配置 |

#### spacing

| 属性 | 类型 | 描述 |
| --- | --- | --- |
| base | number | 基础间距单位 |

#### effects

| 属性 | 类型 | 描述 |
| --- | --- | --- |
| borderRadius | Object | 边框圆角配置 |
| boxShadow | Object | 阴影配置 |

## 🔧 组件级样式覆盖

### 使用 style 属性

您可以通过 `style` 属性直接覆盖组件的内联样式：

```tsx
<Button
  type="primary"
  style={{
    backgroundColor: '#ff4d4f',
    borderRadius: '8px',
    fontSize: '16px',
    padding: '10px 20px',
  }}
>
  自定义按钮
</Button>
```

### 使用 className 属性

您可以通过 `className` 属性添加自定义类名，然后在 CSS 文件中定义样式：

```tsx
<Button type="primary" className="custom-button">
  自定义按钮
</Button>
```

```css
/* 在全局 CSS 文件中定义 */
.custom-button {
  background-color: #ff4d4f !important;
  border-radius: 8px !important;
  font-size: 16px !important;
  padding: 10px 20px !important;
}
```

### 使用 CSS 变量

Taro Uno UI 内部使用 CSS 变量实现主题，您可以直接覆盖这些变量来修改样式：

```css
/* 在全局 CSS 文件中定义 */
:root {
  --primary-color: #ff4d4f;
  --success-color: #52c41a;
  --warning-color: #faad14;
  --error-color: #f5222d;
  --info-color: #1890ff;
  --text-primary-color: #000000d9;
  --text-secondary-color: #00000073;
  --background-primary-color: #ffffff;
  --background-secondary-color: #f5f5f5;
}
```

## 🌓 暗色主题

Taro Uno UI 内置支持暗色主题，您可以通过以下方式使用：

### 自动跟随系统主题

默认情况下，Taro Uno UI 会自动跟随系统的主题设置：

```tsx
import { AppProvider } from 'orva-ui';
import App from './App';

const Root = () => {
  return (
    <AppProvider>
      <App />
    </AppProvider>
  );
};

export default Root;
```

### 手动切换主题

您可以使用 `useTheme` Hook 手动切换主题：

```tsx
import { useTheme } from 'orva-ui';
import { Button } from 'orva-ui';

const ThemeToggle = () => {
  const { theme, toggleTheme, setTheme } = useTheme();

  return (
    <View>
      <Text>当前主题：{theme}</Text>
      <Button onClick={toggleTheme}>切换主题</Button>
      <Button onClick={() => setTheme('light')}>切换到亮色主题</Button>
      <Button onClick={() => setTheme('dark')}>切换到暗色主题</Button>
    </View>
  );
};

export default ThemeToggle;
```

### 自定义暗色主题

您可以为暗色主题单独配置样式：

```tsx
import { AppProvider } from 'orva-ui';
import App from './App';

const themeConfig = {
  colors: {
    primary: '#1890ff',
    // ... 其他颜色配置
  },
  dark: {
    colors: {
      primary: '#40a9ff',
      text: {
        primary: '#ffffffd9',
        secondary: '#ffffff73',
        disabled: '#ffffff40',
      },
      background: {
        primary: '#141414',
        secondary: '#1f1f1f',
        disabled: '#1f1f1f',
      },
    },
  },
};

const Root = () => {
  return (
    <AppProvider theme={themeConfig}>
      <App />
    </AppProvider>
  );
};

export default Root;
```

## 📦 主题包

### 创建主题包

您可以将主题配置封装成主题包，方便在多个项目中共享：

```tsx
// my-theme.ts
export const myTheme = {
  colors: {
    primary: '#1890ff',
    // ... 其他颜色配置
  },
  // ... 其他主题配置
};
```

### 使用主题包

在项目中引入并使用主题包：

```tsx
import { AppProvider } from 'orva-ui';
import { myTheme } from 'my-theme-package';
import App from './App';

const Root = () => {
  return (
    <AppProvider theme={myTheme}>
      <App />
    </AppProvider>
  );
};

export default Root;
```

## 🎯 最佳实践

### 1. 统一主题管理

将所有主题配置集中在一个文件中管理，方便维护和修改：

```tsx
// src/theme/index.ts
export const themeConfig = {
  colors: {
    primary: '#1890ff',
    // ... 其他颜色配置
  },
  // ... 其他主题配置
};
```

### 2. 使用设计系统

结合设计系统使用主题定制，确保设计的一致性：

```tsx
// src/theme/design-system.ts
export const designSystem = {
  colors: {
    brand: '#1890ff',
    accent: '#52c41a',
    // ... 其他设计系统颜色
  },
  typography: {
    heading: {
      h1: { fontSize: 32, fontWeight: 700 },
      h2: { fontSize: 24, fontWeight: 600 },
      h3: { fontSize: 20, fontWeight: 500 },
    },
    // ... 其他排版配置
  },
};
```

### 3. 渐进式主题切换

在主题切换时，使用过渡效果提升用户体验：

```css
/* 在全局 CSS 文件中定义 */
:root {
  transition: background-color 0.3s ease, color 0.3s ease;
}

* {
  transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;
}
```

## 🔍 主题变量参考

### 颜色变量

```css
/* 主色调 */
--primary-color: #1890ff;
--success-color: #52c41a;
--warning-color: #faad14;
--error-color: #f5222d;
--info-color: #1890ff;

/* 文本颜色 */
--text-primary-color: #000000d9;
--text-secondary-color: #00000073;
--text-disabled-color: #00000040;

/* 背景颜色 */
--background-primary-color: #ffffff;
--background-secondary-color: #f5f5f5;
--background-disabled-color: #f5f5f5;

/* 边框颜色 */
--border-color: #d9d9d9;
--border-radius-sm: 2px;
--border-radius-md: 4px;
--border-radius-lg: 8px;
--border-radius-xl: 12px;
```

### 间距变量

```css
--spacing-xs: 4px;
--spacing-sm: 8px;
--spacing-md: 16px;
--spacing-lg: 24px;
--spacing-xl: 32px;
```

### 字体变量

```css
--font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
--font-size-xs: 12px;
--font-size-sm: 14px;
--font-size-md: 16px;
--font-size-lg: 18px;
--font-size-xl: 20px;

--font-weight-normal: 400;
--font-weight-medium: 500;
--font-weight-bold: 700;
```

## 📚 下一步

- [多平台支持](./multi-platform) - 了解如何在不同平台上使用组件库
- [最佳实践](./best-practices) - 学习组件库的最佳使用实践
- [组件文档](../components/basic/button) - 查看所有可用组件
