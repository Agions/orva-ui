# Orva UI

> **Orva** /ˈɔːrvə/ — 拉丁语"金色"，象征组件库的珍贵品质

[![npm version](https://img.shields.io/npm/v/orva-ui.svg?style=flat-square)](https://www.npmjs.com/package/orva-ui)
[![TypeScript](https://img.shields.io/badge/TypeScript-100%25-blue?style=flat-square)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/license-MIT-green?style=flat-square)](./LICENSE)
[![Tests](https://img.shields.io/badge/tests-613%20passed-brightgreen?style=flat-square)](./)

Orva UI 是一个基于 React/Taro 框架的跨平台 UI 组件库，提供 70+ 组件，支持 Web、微信小程序、支付宝小程序等多端开发。

**设计哲学**：紫罗兰主题 · 类型安全 · 无障碍访问 · 国际化就绪

## ✨ v1.2.0 新特性

### 🔧 测试配置修复
- 修复 Vitest + Taro 环境配置冲突
- 补全缺失的工具函数导出（`createBEM`、`createNamespace` 等）
- 596 个测试全部通过 ✅

### 📦 组件补全
- 补全 `Input`、`Modal`、`Select` 基础组件的 barrel 导出
- 补全 `Toast` 反馈组件的 barrel 导出
- 所有组件均可通过 `import { ComponentName } from 'orva-ui'` 直接使用

### 🎨 主题系统增强
- 新增 `darkTheme`、`darkDesignTokens` 暗色主题导出
- 新增 `generateDarkThemeCSSVariables()` CSS 变量生成器
- 新增 `ThemeVariableGenerator` 工具类
- 新增 `useThemeSwitcher`、`useTheme`、`ThemeSwitcherProvider` Hook 和 Provider
- 支持 5 套预设主题：light / dark / high-contrast / warm / cool

详见 [CHANGELOG.md](./CHANGELOG.md)

## 特性

- **跨平台兼容**：支持 Web、微信小程序、支付宝小程序、H5、React Native 等多端环境
- **70+ 组件**：基础、表单、展示、反馈、布局、导航、通用 7 大类组件
- **TypeScript 100%**：完整类型定义，零类型错误
- **主题系统**：CSS 变量 + Design Tokens，支持暗色/高对比度/冷暖色调
- **无障碍访问**：WAI-ARIA 支持，键盘导航友好
- **国际化**：内置 i18n 模块，支持多语言切换
- **测试覆盖**：596 个单元测试，全部通过

## 安装

```bash
# 使用 npm
npm install orva-ui

# 使用 yarn
yarn add orva-ui

# 使用 pnpm
pnpm add orva-ui
```

## 快速开始

### 引入样式

在项目入口文件中引入全局样式：

```tsx
// app.tsx 或 app.jsx
import 'orva-ui/dist/style.css';
```

### 引入组件

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

## 组件分类

### 基础组件 (Basic)
- Button - 按钮
- Icon - 图标
- Text - 文本
- Divider - 分割线
- Typography - 排版

### 表单组件 (Form)
- Form - 表单
- Input - 输入框
- Textarea - 多行文本输入
- InputNumber - 数字输入
- Select - 选择器
- Cascader - 级联选择器
- AutoComplete - 自动完成
- DatePicker - 日期选择器
- TimePicker - 时间选择器
- Checkbox - 复选框
- Radio - 单选框
- Switch - 开关
- Slider - 滑块
- Upload - 上传
- Transfer - 穿梭框

### 展示组件 (Display)
- Avatar - 头像
- Badge - 徽标
- Tag - 标签
- Card - 卡片
- List - 列表
- Table - 表格
- Calendar - 日历
- Timeline - 时间轴
- Carousel - 轮播
- Rate - 评分
- RichText - 富文本

### 反馈组件 (Feedback)
- Loading - 加载
- Progress - 进度条
- Message - 消息提示
- Toast - 轻提示
- Notification - 通知提醒
- Modal - 对话框
- Drawer - 抽屉
- Popconfirm - 气泡确认
- Tooltip - 文字提示
- Result - 结果

### 布局组件 (Layout)
- Grid - 栅格
- Row - 行
- Col - 列
- Layout - 布局
- Container - 容器
- Space - 间距
- Affix - 固钉
- ResponsiveContainer - 响应容器
- ResponsiveGrid - 响应栅格

### 导航组件 (Navigation)
- Menu - 菜单
- NavBar - 导航栏
- PageHeader - 页头
- Tabs - 标签页
- Steps - 步骤条
- Pagination - 分页

### 通用组件 (Common)
- ErrorBoundary - 错误边界
- LazyComponent - 懒加载
- VirtualList - 虚拟列表

## 文档

### 组件文档

每个组件都配有详细的中文文档，包含：
- 功能介绍
- 基本用法
- API 参数说明
- 事件说明
- 使用示例

### 文档结构

组件文档位于 `docs/components/` 目录下，按组件类型分类：

- `docs/components/basic/` - 基础组件文档
- `docs/components/form/` - 表单组件文档
- `docs/components/layout/` - 布局组件文档
- `docs/components/display/` - 显示组件文档
- `docs/components/feedback/` - 反馈组件文档
- `docs/components/navigation/` - 导航组件文档

### 示例代码

每个组件的文档目录中包含 `examples` 文件夹，提供可运行的示例代码，方便开发者快速了解组件的使用方法。

### 文档生成

我们提供了自动化的文档生成工具：

```bash
# 生成所有文档
node scripts/generate-docs.js all

# 生成组件文档
node scripts/generate-docs.js components

# 生成 API 文档
node scripts/generate-docs.js api

# 生成类型文档
node scripts/generate-docs.js types
```

### 文档验证

使用文档验证工具确保文档质量：

```bash
# 验证文档
node scripts/validate-docs.js

# 更新文档
node scripts/update-docs.js --commit
```

### 文档部署

文档自动化部署到 GitHub Pages：
- 每次代码提交自动构建和部署
- 支持多环境部署
- 自动生成文档统计和报告

### API 文档

项目使用 TypeDoc 自动生成 API 文档：

```bash
# 生成 API 文档
npm run docs:generate

# 监听模式（文件变化自动重新生成）
npm run docs:watch
```

生成的文档位于 `docs/api/` 目录，包含：
- 完整的类型定义
- 组件 Props 接口
- 工具函数文档
- 类型别名和枚举

### 本地开发

```bash
# 启动文档开发服务器
cd docs
pnpm install
pnpm dev

# 构建文档
pnpm build
```

## 开发指南

### 开发环境设置

1. 克隆仓库
```bash
git clone https://github.com/agions/taro-lite.git
cd taro-lite
```

2. 安装依赖
```bash
pnpm install
```

3. 启动开发服务器
```bash
# H5
pnpm dev:h5

# 微信小程序
pnpm dev:weapp
```

### 构建

```bash
# 构建 H5
pnpm build:h5

# 构建微信小程序
pnpm build:weapp

# 构建所有平台
pnpm build:all
```

### 测试

```bash
# 运行单元测试
pnpm test

# 运行 ESLint 检查
pnpm lint
```

## 🤝 贡献指南

我们欢迎所有形式的贡献！请阅读 [贡献指南](./CONTRIBUTING.md) 了解详情。

### 开发流程

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request

### 代码规范

- 使用 TypeScript 编写代码
- 遵循 ESLint 和 Prettier 规范
- 编写完整的单元测试
- 添加详细的 JSDoc 注释
- 遵循 Git 提交规范

## 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

## 更新日志

详细的更新日志请查看 [CHANGELOG.md](CHANGELOG.md)

## 联系我们

|- GitHub: https://github.com/agions/taro-lite
|- Issues: https://github.com/agions/taro-lite/issues
