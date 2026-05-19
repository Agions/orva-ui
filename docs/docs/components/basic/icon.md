# Icon 图标

Icon 组件用于展示图标，基于 Iconify 图标库，支持数千种图标。可调节大小、颜色，支持旋转和动画效果。

## 引入

```tsx
import { Icon } from 'orva-ui';
// 或按需导入
import { Icon } from 'orva-ui/basic';
```

## 基本使用

```tsx
import React from 'react';
import { Icon } from 'orva-ui';

export default () => (
  <Icon>
    Content
  </Icon>
);
```

## 使用示例

### 基础使用

```tsx
<Icon name="mdi:home" />
<Icon name="mdi:heart" color="red" />
<Icon name="mdi:star" color="gold" size={24} />
```

### 旋转动画

```tsx
<Icon name="mdi:loading" spin />
<Icon name="mdi:refresh" rotate={90} />
```

## Props

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| name | string | - | 图标名称（Iconify icon name） |
| size | number | string | '1em' | 图标大小 |
| color | string | inherit | 图标颜色 |
| rotate | number | 0 | 旋转角度 |
| spin | boolean | false | 是否旋转动画 |
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
