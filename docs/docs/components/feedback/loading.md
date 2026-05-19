# Loading 加载

加载组件用于显示加载中状态。支持全局加载、局部加载、自定义文案等。

## 引入

```tsx
import { Loading } from 'orva-ui';
// 或按需导入
import { Loading } from 'orva-ui/feedback';
```

## 基本使用

```tsx
import React from 'react';
import { Loading } from 'orva-ui';

export default () => (
  <Loading>
    Content
  </Loading>
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
