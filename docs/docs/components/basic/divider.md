# Divider 分割线

Divider 组件用于在内容之间创建视觉分隔。支持水平/垂直方向、不同样式、带文字的分割线。

## 引入

```tsx
import { Divider } from 'orva-ui';
// 或按需导入
import { Divider } from 'orva-ui/basic';
```

## 基本使用

```tsx
import React from 'react';
import { Divider } from 'orva-ui';

export default () => (
  <Divider>
    Content
  </Divider>
);
```

## 使用示例

### 水平分割线

```tsx
<Divider />
<Divider type="dashed">带文字</Divider>
<Divider orientation="left">左对齐</Divider>
```

### 垂直分割线

```tsx
<Divider direction="vertical" />
```

## Props

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| direction | 'horizontal' | 'vertical' | 'horizontal' | 分割线方向 |
| type | 'solid' | 'dashed' | 'dotted' | 'solid' | 分割线样式 |
| orientation | 'left' | 'center' | 'right' | 'center' | 文字位置 |
| children | ReactNode | - | 分割线中的文字 |
| className | string | - | 自定义类名 |

## 主题定制

通过 `createTheme` 或 `ThemeProvider` 自定义主题变量，可以调整组件的颜色、字体、间距等样式。

```tsx
import { createTheme, ThemeProvider } from 'orva-ui';

const theme = createTheme({
  colors: {
    primary: '#a855f7',
  },
});
```

## 无障碍支持

组件遵循 WAI-ARIA 标准，内置键盘导航和屏幕阅读器支持。

## 注意事项

- 请确保在 `ThemeProvider` 包裹下使用组件以获得完整的主题支持
- 组件支持服务器端渲染 (SSR)
