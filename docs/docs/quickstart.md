---
sidebar_position: 2
---

# 快速开始

本指南将帮助您快速上手 orva-ui 组件库，包括安装、配置和使用基本组件。

## 📦 安装

### 前提条件

- 已安装 Node.js 18.0.0 或更高版本
- 已安装 Taro 4.x 框架
- 已安装 React 19+

### 安装步骤

使用 npm、yarn 或 pnpm 安装 orva-ui：

```bash
# 使用 npm
npm install orva-ui

# 使用 yarn
yarn add orva-ui

# 使用 pnpm
pnpm add orva-ui
```

## 🚀 基本使用

### 1. 引入全局样式

在项目入口文件中引入全局样式：

```tsx
// app.tsx 或 app.jsx
import 'orva-ui/dist/style.css';
```

### 2. 引入组件

在需要使用组件的页面中按需引入：

```tsx
import React from 'react';
import { View } from '@tarojs/components';
import { Button, Input } from 'orva-ui';

const App = () => {
  return (
    <View>
      <Input placeholder="请输入内容" />
      <Button type="primary">点击我</Button>
    </View>
  );
};

export default App;
```

### 3. 使用 Hooks

```tsx
import React from 'react';
import { View, Text } from '@tarojs/components';
import { useTheme, useToggle } from 'orva-ui/hooks';

const ThemeToggle = () => {
  const { isDark, toggleMode } = useTheme();
  const [count, toggle] = useToggle(false);

  return (
    <View>
      <Text>当前主题：{isDark ? '暗色' : '亮色'}</Text>
      <Button onClick={toggleMode}>切换主题</Button>
      <Button onClick={toggle}>
        {count ? '开启' : '关闭'}
      </Button>
    </View>
  );
};
```

## 🎨 主题配置

### 1. 全局主题配置

使用 ThemeProvider 配置主题：

```tsx
import React from 'react';
import { ThemeProvider } from 'orva-ui/hooks';
import App from './App';

const themeConfig = {
  colors: {
    primary: '#6366f1',
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
  },
  typography: {
    fontFamily: 'Arial, sans-serif',
  },
};

const Root = () => {
  return (
    <ThemeProvider defaultMode="system" theme={themeConfig}>
      <App />
    </ThemeProvider>
  );
};

export default Root;
```

### 2. 使用 useTheme Hook

```tsx
import { useTheme } from 'orva-ui/hooks';

function MyComponent() {
  const { theme, isDark, toggleMode } = useTheme();
  
  return (
    <div style={{ 
      backgroundColor: isDark ? theme.colors.primary : '#fff',
      color: isDark ? '#fff' : theme.colors.primary 
    }}>
      <button onClick={toggleMode}>
        切换主题
      </button>
    </div>
  );
}
```

### 3. CSS 变量覆盖

```css
/* 自定义主题变量 */
:root {
  --color-primary: #ff6b6b;
  --spacing-md: 16px;
  --radius-md: 8px;
}

/* 暗色主题 */
.dark {
  --color-primary: #ff8787;
}
```

## 🔧 配置选项

### 1. Taro 配置

在 `config/index.js` 中添加以下配置：

```javascript
module.exports = {
  h5: {
    esnextModules: ['orva-ui'],
  },
  mini: {
    webpackChain(chain) {
      chain.merge({
        module: {
          rule: {
            mjsScript: {
              test: /\.mjs$/,
              include: [/orva-ui/],
            },
          },
        },
      });
    },
  },
};
```

### 2. TypeScript 配置

确保 `tsconfig.json` 中包含以下配置：

```json
{
  "compilerOptions": {
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "moduleResolution": "node",
    "jsx": "react-jsx",
    "strict": true
  }
}
```

## 📝 示例项目

### 创建示例项目

```bash
# 创建 Taro 项目
taro init my-taro-app

# 进入项目目录
cd my-taro-app

# 安装 orva-ui
npm install orva-ui
```

### 运行示例项目

```bash
# 运行 H5 版本
npm run dev:h5

# 运行微信小程序版本
npm run dev:weapp
```

## 📚 下一步

- [查看组件库](./components/basic/button) 了解所有可用组件
- [阅读开发指南](./guides/installation) 深入学习使用技巧
- [探索核心功能](./features) 了解组件库的强大特性
- [查看 Hooks 文档](./hooks/) 学习自定义 Hooks

## 💡 常见问题

### Q: 组件样式不生效怎么办？

A: 请确保已在入口文件中正确引入全局样式：

```tsx
import 'orva-ui/dist/style.css';
```

### Q: 如何按需引入组件？

A: orva-ui 支持 Tree Shaking，直接按需引入组件即可：

```tsx
import { Button } from 'orva-ui';
```

### Q: 支持哪些平台？

A: 支持微信小程序、H5、React Native 等 Taro 支持的所有平台。

### Q: 如何切换暗色主题？

A: 使用 `useTheme` Hook：

```tsx
const { isDark, toggleMode } = useTheme();
<button onClick={toggleMode}>切换主题</button>
```

## 📞 获得帮助

如果您在使用过程中遇到问题，可以通过以下方式获得帮助：

- [查看常见问题](./faq)
- [提交 Issue](https://github.com/agions/orva-ui/issues)
- [加入社区讨论](https://github.com/agions/orva-ui/discussions)
