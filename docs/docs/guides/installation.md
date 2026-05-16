# 安装指南

本指南将详细介绍如何在 Taro 项目中安装和配置 Taro Uno UI 组件库。

## 📋 前提条件

在安装 Taro Uno UI 之前，请确保您的项目满足以下条件：

- **Node.js**: 18.0.0 或更高版本
- **Taro**: 4.x 或更高版本
- **包管理器**: npm、yarn 或 pnpm

## 📦 安装步骤

### 1. 使用包管理器安装

选择您喜欢的包管理器来安装 Taro Uno UI：

```bash
# 使用 npm
npm install orva-ui

# 使用 yarn
yarn add orva-ui

# 使用 pnpm
pnpm add orva-ui
```

### 2. 配置 Taro 项目

#### 配置 `esnextModules`

在 Taro 项目的配置文件中添加 `esnextModules` 配置，确保组件库能够正确编译：

```javascript
// config/index.js 或 config/index.ts
module.exports = {
  // ...
  h5: {
    esnextModules: ['orva-ui'],
  },
  mini: {
    esnextModules: ['orva-ui'],
  },
};
```

#### 配置 Webpack（仅微信小程序）

对于微信小程序，需要在 `webpackChain` 中添加特殊配置，以处理 `.mjs` 文件：

```javascript
// config/index.js 或 config/index.ts
module.exports = {
  // ...
  mini: {
    webpackChain(chain) {
      // 添加 Taro Uno UI 到 mjsScript 规则
      chain.merge({
        module: {
          rule: {
            mjsScript: {
              test: /\.mjs$/,
              include: [/orva-ui/],
              use: {
                babelLoader: {
                  loader: require.resolve('babel-loader'),
                },
              },
            },
          },
        },
      });
    },
  },
};
```

### 3. 引入全局样式

在项目的入口文件中引入 Taro Uno UI 的全局样式：

```tsx
// app.tsx 或 app.jsx
import 'orva-ui/dist/style.css';
```

### 4. 开始使用组件

现在您可以在项目中使用 Taro Uno UI 组件了：

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

## 🔧 验证安装

### 检查版本

您可以通过以下方式检查 Taro Uno UI 的版本：

```bash
# 使用 npm
npm list orva-ui

# 使用 yarn
yarn list orva-ui

# 使用 pnpm
pnpm list orva-ui
```

### 运行示例

创建一个简单的示例页面，验证组件是否正常工作：

```tsx
// pages/index/index.tsx
import React from 'react';
import { View } from '@tarojs/components';
import { Button, Card, Text } from 'orva-ui';

const Index = () => {
  return (
    <View style={{ padding: '20px' }}>
      <Card title="欢迎使用 Taro Uno UI">
        <Text>这是一个简单的示例页面，用于验证组件库是否正常工作。</Text>
        <Button type="primary" style={{ marginTop: '20px' }}>
          点击按钮
        </Button>
      </Card>
    </View>
  );
};

export default Index;
```

然后运行项目：

```bash
# 运行 H5 版本
npm run dev:h5

# 运行微信小程序版本
npm run dev:weapp
```

如果页面正常显示，并且组件可以正常交互，说明安装成功。

## 🎯 常见问题

### Q: 安装后组件样式不生效怎么办？

**A:** 请检查以下几点：

1. 是否已在入口文件中引入全局样式？
2. 是否已正确配置 `esnextModules`？
3. 是否使用了正确的 Taro 版本？

### Q: 如何更新 Taro Uno UI？

**A:** 使用包管理器更新：

```bash
# 使用 npm
npm update orva-ui

# 使用 yarn
yarn upgrade orva-ui

# 使用 pnpm
pnpm update orva-ui
```

### Q: 如何卸载 Taro Uno UI？

**A:** 使用包管理器卸载：

```bash
# 使用 npm
npm uninstall orva-ui

# 使用 yarn
yarn remove orva-ui

# 使用 pnpm
pnpm remove orva-ui
```

然后删除入口文件中的全局样式引入：

```tsx
// 移除这行代码
// import 'orva-ui/dist/style.css';
```

## 📚 下一步

- [主题定制](./theme-customization) - 学习如何自定义组件主题
- [多平台支持](./multi-platform) - 了解如何在不同平台上使用组件库
- [最佳实践](./best-practices) - 学习组件库的最佳使用实践
- [组件文档](../components/basic/button) - 查看所有可用组件
