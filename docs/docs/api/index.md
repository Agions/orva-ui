---
sidebar_label: API 参考
title: API 参考
description: Taro Uno UI 组件库 API 参考文档
displayed_sidebar: docsSidebar
---

# API 参考

本文档提供 Taro Uno UI 组件库的完整 API 参考，包括组件属性、方法、事件和类型定义。

## 组件 API 概览

### 基础组件

| 组件 | 描述 | 文档链接 |
| --- | --- | --- |
| Button | 按钮组件，支持多种类型和尺寸 | [查看文档](/components/basic/button) |
| Icon | 图标组件，支持自定义图标 | [查看文档](/components/basic/icon) |
| Text | 文本组件，支持多种样式 | [查看文档](/components/basic/text) |
| Divider | 分割线组件 | [查看文档](/components/basic/divider) |
| Typography | 排版组件 | [查看文档](/components/basic/typography) |

### 表单组件

| 组件 | 描述 | 文档链接 |
| --- | --- | --- |
| Form | 表单容器，支持表单验证 | [查看文档](/components/form/form) |
| Input | 输入框组件 | [查看文档](/components/form/input) |
| Textarea | 多行文本输入 | [查看文档](/components/form/textarea) |
| Select | 选择器组件 | [查看文档](/components/form/select) |
| Checkbox | 复选框组件 | [查看文档](/components/form/checkbox) |
| Radio | 单选框组件 | [查看文档](/components/form/radio) |
| Switch | 开关组件 | [查看文档](/components/form/switch) |
| DatePicker | 日期选择器 | [查看文档](/components/form/date-picker) |
| TimePicker | 时间选择器 | [查看文档](/components/form/time-picker) |

### 展示组件

| 组件 | 描述 | 文档链接 |
| --- | --- | --- |
| Avatar | 头像组件 | [查看文档](/components/display/avatar) |
| Badge | 徽标组件 | [查看文档](/components/display/badge) |
| Tag | 标签组件 | [查看文档](/components/display/tag) |
| Card | 卡片组件 | [查看文档](/components/display/card) |
| List | 列表组件 | [查看文档](/components/display/list) |
| Table | 表格组件 | [查看文档](/components/display/table) |
| Calendar | 日历组件 | [查看文档](/components/display/calendar) |
| Timeline | 时间轴组件 | [查看文档](/components/display/timeline) |
| Carousel | 轮播组件 | [查看文档](/components/display/carousel) |
| Rate | 评分组件 | [查看文档](/components/display/rate) |

### 反馈组件

| 组件 | 描述 | 文档链接 |
| --- | --- | --- |
| Loading | 加载组件 | [查看文档](/components/feedback/loading) |
| Progress | 进度条组件 | [查看文档](/components/feedback/progress) |
| Message | 消息提示 | [查看文档](/components/feedback/message) |
| Toast | 轻提示组件 | [查看文档](/components/feedback/toast) |
| Modal | 对话框组件 | [查看文档](/components/feedback/modal) |
| Drawer | 抽屉组件 | [查看文档](/components/feedback/drawer) |
| Tooltip | 文字提示 | [查看文档](/components/feedback/tooltip) |

### 布局组件

| 组件 | 描述 | 文档链接 |
| --- | --- | --- |
| Grid | 栅格系统 | [查看文档](/components/layout/grid) |
| Row | 行组件 | [查看文档](/components/layout/row) |
| Col | 列组件 | [查看文档](/components/layout/col) |
| Layout | 布局组件 | [查看文档](/components/layout/layout) |
| Space | 间距组件 | [查看文档](/components/layout/space) |

### 导航组件

| 组件 | 描述 | 文档链接 |
| --- | --- | --- |
| Menu | 菜单组件 | [查看文档](/components/navigation/menu) |
| NavBar | 导航栏组件 | [查看文档](/components/navigation/navbar) |
| Tabs | 标签页组件 | [查看文档](/components/navigation/tabs) |
| Steps | 步骤条组件 | [查看文档](/components/navigation/steps) |
| Pagination | 分页组件 | [查看文档](/components/navigation/pagination) |

## Hooks API 概览

| Hook | 描述 | 文档链接 |
| --- | --- | --- |
| useBoolean | 布尔值状态管理 | [查看文档](/hooks/state) |
| useToggle | 切换状态管理 | [查看文档](/hooks/state) |
| useCounter | 计数器状态管理 | [查看文档](/hooks/state) |
| useStorage | 本地存储管理 | [查看文档](/hooks/state) |
| useDebounce | 防抖处理 | [查看文档](/hooks/effect) |
| useThrottle | 节流处理 | [查看文档](/hooks/effect) |
| useRequest | 异步请求管理 | [查看文档](/hooks/async) |
| useTheme | 主题管理 | [查看文档](/hooks/ui) |
| usePlatform | 平台检测 | [查看文档](/hooks/ui) |
| useResponsive | 响应式布局 | [查看文档](/hooks/ui) |

## 通用类型定义

### 基础类型

```typescript
// 尺寸类型
type Size = 'small' | 'medium' | 'large';

// 主题类型
type ThemeType = 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';

// 方向类型
type Direction = 'horizontal' | 'vertical';

// 对齐方式
type Align = 'start' | 'center' | 'end' | 'stretch';

// 位置类型
type Placement = 'top' | 'bottom' | 'left' | 'right' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
```

### 组件通用属性

```typescript
interface BaseProps {
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
  /** 子元素 */
  children?: React.ReactNode;
}
```

### 表单组件通用属性

```typescript
interface FormItemProps extends BaseProps {
  /** 字段名 */
  name?: string;
  /** 标签文本 */
  label?: string;
  /** 是否必填 */
  required?: boolean;
  /** 是否禁用 */
  disabled?: boolean;
  /** 校验规则 */
  rules?: ValidationRule[];
}
```

## 主题配置

### 主题变量

```typescript
interface ThemeConfig {
  // 主色调
  primaryColor: string;
  // 成功色
  successColor: string;
  // 警告色
  warningColor: string;
  // 错误色
  errorColor: string;
  // 信息色
  infoColor: string;
  // 边框圆角
  borderRadius: number;
  // 字体大小
  fontSize: {
    xs: number;
    sm: number;
    base: number;
    lg: number;
    xl: number;
  };
  // 间距
  spacing: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };
}
```

### 使用主题

```tsx
import { ThemeProvider, useTheme } from 'orva-ui';

// 自定义主题配置
const customTheme = {
  primaryColor: '#6366f1',
  borderRadius: 8,
};

function App() {
  return (
    <ThemeProvider theme={customTheme}>
      <YourApp />
    </ThemeProvider>
  );
}

// 在组件中使用主题
function MyComponent() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <View style={{ color: theme.primaryColor }}>
      当前主题色: {theme.primaryColor}
    </View>
  );
}
```

## 平台兼容性

Taro Uno UI 支持以下平台：

| 平台 | 支持状态 | 备注 |
| --- | --- | --- |
| 微信小程序 | ✅ 完全支持 | 推荐使用 |
| 支付宝小程序 | ✅ 完全支持 | - |
| 百度小程序 | ✅ 完全支持 | - |
| 字节跳动小程序 | ✅ 完全支持 | - |
| QQ 小程序 | ✅ 完全支持 | - |
| H5 | ✅ 完全支持 | - |
| React Native | 🚧 部分支持 | 开发中 |

## 更多资源

- [快速开始](/quickstart) - 了解如何安装和使用
- [主题定制](/guides/theme-customization) - 自定义组件主题
- [多平台适配](/guides/multi-platform) - 跨平台开发指南
- [常见问题](/faq) - 常见问题解答
