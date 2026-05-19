# Badge 徽标

徽标组件用于显示数字、状态或标签。可单独使用或与其他组件组合。

## 引入

```tsx
import { Badge } from 'orva-ui';
// 或按需导入
import { Badge } from 'orva-ui/display';
```

## 基本使用

```tsx
import React from 'react';
import { Badge } from 'orva-ui';

export default () => (
  <Badge>
    Content
  </Badge>
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
