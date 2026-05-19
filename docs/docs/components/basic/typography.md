# Typography 排版

Typography 组件提供统一的排版样式，包含标题（h1-h6）、段落、辅助文字等。确保全站文字风格一致。

## 引入

```tsx
import { Typography } from 'orva-ui';
// 或按需导入
import { Typography } from 'orva-ui/basic';
```

## 基本使用

```tsx
import React from 'react';
import { Typography } from 'orva-ui';

export default () => (
  <Typography>
    Content
  </Typography>
);
```

## 使用示例

### 标题

```tsx
<Typography variant="h1">一级标题</Typography>
<Typography variant="h2">二级标题</Typography>
```

### 段落

```tsx
<Typography variant="p">这是一段正文内容，Typography 组件提供了统一的排版样式。</Typography>
```

## Props

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| children | ReactNode | - | 内容 |
| variant | 'h1'|'h2'|'h3'|'h4'|'h5'|'h6'|'p'|'span'|'caption' | 'p' | 排版变体 |
| color | string | - | 文字颜色 |
| align | 'left'|'center'|'right'|'justify' | 'left' | 对齐方式 |
| ellipsis | boolean | number | false | 是否省略 |
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
