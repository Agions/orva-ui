# 多平台支持

Taro Uno UI 支持多种平台，包括微信小程序、H5、React Native 等。本指南将详细介绍如何在不同平台上使用组件库。

## 🌐 支持的平台

| 平台 | 支持状态 | 注意事项 |
| --- | --- | --- |
| 微信小程序 | ✅ 完全支持 | 需要配置 webpackChain |
| H5 | ✅ 完全支持 | 支持所有现代浏览器 |
| React Native | ✅ 部分支持 | 需额外安装依赖 |
| 支付宝小程序 | ✅ 部分支持 | 部分组件可能存在差异 |
| 百度小程序 | ✅ 部分支持 | 部分组件可能存在差异 |
| 字节跳动小程序 | ✅ 部分支持 | 部分组件可能存在差异 |

## 📱 微信小程序

### 配置要求

1. **Taro 版本**：4.x 或更高版本
2. **Node.js**：18.0.0 或更高版本
3. **微信开发者工具**：最新版本

### 配置步骤

#### 1. 安装组件库

```bash
npm install orva-ui
```

#### 2. 配置 `esnextModules`

```javascript
// config/index.js 或 config/index.ts
module.exports = {
  // ...
  mini: {
    esnextModules: ['orva-ui'],
  },
};
```

#### 3. 配置 Webpack

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

#### 4. 引入全局样式

```tsx
// app.tsx 或 app.jsx
import 'orva-ui/dist/style.css';
```

### 常见问题

#### Q: 微信小程序中组件样式不生效？

**A:** 请检查是否正确配置了 `webpackChain`，确保 `.mjs` 文件能够被正确编译。

#### Q: 微信小程序中某些组件无法使用？

**A:** 部分组件可能依赖浏览器 API，在微信小程序中不可用。请查看组件文档中的平台支持信息。

## 💻 H5

### 配置要求

1. **Taro 版本**：4.x 或更高版本
2. **Node.js**：18.0.0 或更高版本
3. **浏览器**：现代浏览器（Chrome、Firefox、Safari、Edge 等）

### 配置步骤

#### 1. 安装组件库

```bash
npm install orva-ui
```

#### 2. 配置 `esnextModules`

```javascript
// config/index.js 或 config/index.ts
module.exports = {
  // ...
  h5: {
    esnextModules: ['orva-ui'],
  },
};
```

#### 3. 引入全局样式

```tsx
// app.tsx 或 app.jsx
import 'orva-ui/dist/style.css';
```

### 常见问题

#### Q: H5 中组件样式错乱？

**A:** 请检查是否正确引入了全局样式，或者是否存在 CSS 样式冲突。

#### Q: H5 中某些组件交互异常？

**A:** 请检查浏览器控制台是否有报错信息，可能是某些浏览器 API 不被支持导致的。

## 📱 React Native

### 配置要求

1. **Taro 版本**：4.x 或更高版本
2. **Node.js**：18.0.0 或更高版本
3. **React Native**：0.70.0 或更高版本

### 配置步骤

#### 1. 安装组件库和依赖

```bash
# 安装 Taro Uno UI
npm install orva-ui

# 安装 React Native 依赖
npm install react-native-web react-native-svg
```

#### 2. 配置 Taro 项目

```javascript
// config/index.js 或 config/index.ts
module.exports = {
  // ...
  rn: {
    esnextModules: ['orva-ui'],
  },
};
```

#### 3. 引入全局样式

```tsx
// app.tsx 或 app.jsx
import 'orva-ui/dist/style.css';
```

### 常见问题

#### Q: React Native 中组件无法正常渲染？

**A:** 请确保已安装所有必要的依赖，特别是 `react-native-web` 和 `react-native-svg`。

#### Q: React Native 中某些组件功能缺失？

**A:** Taro Uno UI 对 React Native 的支持是部分的，某些依赖浏览器 API 的组件可能无法在 React Native 中使用。

## 🔄 跨平台开发最佳实践

### 1. 检测当前平台

使用 `usePlatform` Hook 检测当前运行平台，以便进行平台特定的处理：

```tsx
import { usePlatform } from 'orva-ui';

const platform = usePlatform();

// 根据不同平台显示不同内容
{platform === 'weapp' ? <WeappComponent /> : <OtherPlatformComponent />}
```

### 2. 平台特定代码

使用 Taro 的平台条件编译语法，编写平台特定的代码：

```tsx
// #ifdef H5
// H5 平台特定代码
console.log('当前是 H5 平台');
// #endif

// #ifdef MP-WEIXIN
// 微信小程序平台特定代码
console.log('当前是微信小程序平台');
// #endif
```

### 3. 处理平台差异

对于存在平台差异的组件，使用平台特定的实现：

```tsx
// 自定义跨平台组件
const CrossPlatformComponent = () => {
  // #ifdef H5
  return <H5Component />;
  // #endif

  // #ifdef MP-WEIXIN
  return <WeappComponent />;
  // #endif

  // #ifdef RN
  return <RNComponent />;
  // #endif
};
```

### 4. 测试所有平台

确保在所有目标平台上测试你的应用，以确保组件在不同平台上都能正常工作：

```bash
# 测试 H5
npm run dev:h5

# 测试微信小程序
npm run dev:weapp

# 测试 React Native
npm run dev:rn
```

## 📦 平台特定组件

### WebView 组件

**H5 平台**：使用浏览器原生 WebView

**微信小程序**：使用微信小程序的 `<web-view>` 组件

**React Native**：使用 `react-native-webview` 库

### 支付组件

**H5 平台**：使用第三方支付 SDK

**微信小程序**：使用微信支付 API

**React Native**：使用 `react-native-payments` 库

### 地图组件

**H5 平台**：使用百度地图或高德地图 JavaScript API

**微信小程序**：使用微信小程序的 `<map>` 组件

**React Native**：使用 `react-native-maps` 库

## 🎯 性能优化

### 1. 按需加载组件

根据平台按需加载组件，减小初始包体积：

```tsx
// 按需引入组件
import { Button } from 'orva-ui';

// 或根据平台按需引入
// #ifdef H5
import { H5SpecificComponent } from 'orva-ui';
// #endif
```

### 2. 优化渲染性能

在长列表等场景下，使用虚拟列表组件优化渲染性能：

```tsx
import { VirtualList } from 'orva-ui';

<VirtualList
  data={longListData}
  height={400}
  itemHeight={50}
  renderItem={({ item }) => <div>{item}</div>}
/>
```

### 3. 减小包体积

使用 Taro 的分包加载功能，减小主包体积：

```javascript
// app.config.js 或 app.config.ts
module.exports = {
  // ...
  subpackages: [
    {
      root: 'pages/subpackage',
      pages: ['index', 'detail'],
    },
  ],
};
```

## 🔍 调试技巧

### 1. 使用开发者工具

- **H5**：使用浏览器开发者工具
- **微信小程序**：使用微信开发者工具
- **React Native**：使用 React Native Debugger

### 2. 打印平台信息

在开发过程中，打印当前平台信息，方便调试：

```tsx
import { usePlatform } from 'orva-ui';

const platform = usePlatform();
console.log('当前平台：', platform);
```

### 3. 模拟不同平台

使用 Taro 的 `--platform` 参数，模拟不同平台的运行环境：

```bash
# 模拟微信小程序
npm run dev:h5 --platform mp-weixin

# 模拟支付宝小程序
npm run dev:h5 --platform mp-alipay
```

## 📚 下一步

- [最佳实践](./best-practices) - 学习组件库的最佳使用实践
- [组件文档](../components/basic/button) - 查看所有可用组件
- [API 参考](../api) - 查看详细的 API 文档
