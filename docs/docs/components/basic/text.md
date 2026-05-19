# Text 文本

Text 组件用于展示文本内容，支持不同尺寸、颜色、截断和省略。可自定义排版样式，支持复制功能。

## 引入

```tsx
import { Text } from 'orva-ui';
// 或按需导入
import { Text } from 'orva-ui/basic';
```

## 基本使用

```tsx
import React from 'react';
import { Text } from 'orva-ui';

export default () => (
  <Text>
    Content
  </Text>
);
```

## 使用示例

### 基础使用

```tsx
<Text>普通文本</Text>
<Text strong>加粗文本</Text>
<Text color="red">红色文本</Text>
```

### 省略

```tsx
<Text ellipsis style={{ width: 200 }}>这是一段很长的文本内容会被省略显示</Text>
```

### 可复制

```tsx
<Text copyable>点击右侧图标复制这段文本</Text>
```

## Props

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| children | ReactNode | - | 文本内容 |
| size | 'xs' | 'sm' | 'base' | 'lg' | 'xl' | 'base' | 字体大小 |
| color | string | - | 文本颜色 |
| strong | boolean | false | 是否加粗 |
| italic | boolean | false | 是否斜体 |
| underline | boolean | false | 是否下划线 |
| delete | boolean | false | 是否删除线 |
| ellipsis | boolean | number | false | 是否省略（数字表示行数） |
| copyable | boolean | false | 是否可复制 |
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
