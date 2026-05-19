# Modal 对话框

对话框组件用于展示重要信息或请求用户确认。支持自定义内容、按钮、拖拽等。

## 引入

```tsx
import { Modal } from 'orva-ui';
// 或按需导入
import { Modal } from 'orva-ui/feedback';
```

## 基本使用

```tsx
import React from 'react';
import { Modal } from 'orva-ui';

export default () => (
  <Modal>
    Content
  </Modal>
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
