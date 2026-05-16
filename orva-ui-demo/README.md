# Orva UI Demo

这是 Orva UI 组件库的官方演示应用。

## 📦 项目结构

```
demo/
├── config/              # Taro 配置
│   ├── index.ts         # 主配置
│   ├── dev.ts           # 开发环境配置
│   └── prod.ts          # 生产环境配置
├── src/
│   ├── app.config.ts    # 应用配置
│   ├── app.tsx          # 应用入口
│   ├── app.scss         # 全局样式
│   └── pages/           # 页面
│       ├── index/       # 首页
│       ├── components/  # 组件展示
│       └── about/       # 关于页面
├── package.json
└── tsconfig.json
```

## 🚀 快速开始

### 安装依赖

```bash
cd demo
npm install
```

### 开发模式

```bash
# H5
npm run dev:h5

# 微信小程序
npm run dev:weapp

# 支付宝小程序
npm run dev:alipay
```

### 构建

```bash
# H5
npm run build:h5

# 微信小程序
npm run build:weapp
```

## 📱 页面说明

### 首页 (pages/index)
- 展示组件库特性
- 组件分类概览
- 快速导航

### 组件展示 (pages/components)
- 基础组件：Button、Space、Divider
- 表单组件：Input、Switch、Checkbox、Radio、Slider
- 展示组件：Card、Badge、Avatar、Loading
- 反馈组件：Modal、Toast

### 关于 (pages/about)
- 组件库介绍
- 安装说明
- 相关链接

## 🎨 自定义主题

在 `src/app.scss` 中修改 CSS 变量：

```scss
:root {
  --primary-color: #0ea5e9;
  --success-color: #22c55e;
  --warning-color: #f59e0b;
  --error-color: #ef4444;
}
```

## 📝 注意事项

1. 确保已安装 `orva-ui` 依赖
2. 在 `app.tsx` 中引入样式：`import 'orva-ui/dist/style.css'`
3. 微信小程序需要在微信开发者工具中打开 `dist` 目录
