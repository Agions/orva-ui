# Ripple 涟漪

Ripple 组件提供点击涟漪效果，增强用户交互反馈。可包裹任意子组件，支持自定义颜色和持续时间。

## 引入

```tsx
import { Ripple } from 'orva-ui';
// 或按需导入
import { Ripple } from 'orva-ui/basic';
```

## 基本使用

```tsx
import React from 'react';
import { Ripple } from 'orva-ui';

export default () => (
  <Ripple>
    Content
  </Ripple>
);
```

## 使用示例

### 基础使用

```tsx
<Ripple>
  <Button>点击我</Button>
</Ripple>
```

### 自定义颜色

```tsx
<Ripple color="rgba(0,0,0,0.2)">
  <div style={{ padding: 20 }}>自定义涟漪颜色</div>
</Ripple>
```

## Props

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| children | ReactNode | - | 子元素 |
| color | string | rgba(255,255,255,0.3) | 涟漪颜色 |
| duration | number | 600 | 动画持续时间(ms) |
| disabled | boolean | false | 是否禁用 |
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
