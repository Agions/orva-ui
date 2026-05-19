# Toast 轻提示

Toast 组件用于显示轻量级提示消息。支持自动消失、自定义位置等。

## 引入

```tsx
import { Toast } from 'orva-ui';
// 或按需导入
import { Toast } from 'orva-ui/feedback';
```

## 基本使用

```tsx
import React from 'react';
import { Toast } from 'orva-ui';

export default () => (
  <Toast>
    Content
  </Toast>
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
