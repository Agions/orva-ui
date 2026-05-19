# Carousel 轮播

轮播组件用于在有限空间内循环展示内容。支持自动播放、指示器、箭头导航等。

## 引入

```tsx
import { Carousel } from 'orva-ui';
// 或按需导入
import { Carousel } from 'orva-ui/display';
```

## 基本使用

```tsx
import React from 'react';
import { Carousel } from 'orva-ui';

export default () => (
  <Carousel>
    Content
  </Carousel>
);
```

## Props

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| children | ReactNode | - | 子元素 |
| className | string | - | 自定义类名 |
| style | CSSProperties | - | 自定义样式 |

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
