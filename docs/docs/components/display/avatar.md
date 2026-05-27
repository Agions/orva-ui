# Avatar 头像

**Related Components:** [Badge](./badge), [List](./list)


头像组件用于展示用户头像或标识。支持图片、图标、文字三种形式，可组合使用。

## 引入

```tsx live-codeblock
import { Avatar } from 'orva-ui';
// 或按需导入
import { Avatar } from 'orva-ui/display';
```

## 基本使用

```tsx live-codeblock
import React from 'react';
import { Avatar } from 'orva-ui';

export default () => (
  <Avatar src="https://via.placeholder.com/100" alt="用户头像" />
);
```

## 使用示例

### 图片头像

```tsx live-codeblock
import React from 'react';
import { Avatar } from 'orva-ui';

export default () => (
  <Avatar 
    src="https://via.placeholder.com/100" 
    alt="用户头像"
  />
);
```

### 文字头像

```tsx live-codeblock
import React from 'react';
import { Avatar } from 'orva-ui';

export default () => (
  <>
    <Avatar>张三</Avatar>
    <Avatar color="#3b82f6">李四</Avatar>
    <Avatar color="#10b981" textColor="#fff">王五</Avatar>
  </>
);
```

### 图标头像

```tsx live-codeblock
import React from 'react';
import { Avatar, Icon } from 'orva-ui';

export default () => (
  <>
    <Avatar icon={<Icon name="mdi:account" />} />
    <Avatar icon={<Icon name="mdi:account" />} color="#3b82f6" />
    <Avatar icon={<Icon name="mdi:account" />} size="lg" />
  </>
);
```

### 尺寸

```tsx live-codeblock
import React from 'react';
import { Avatar } from 'orva-ui';

export default () => (
  <>
    <Avatar size="sm">S</Avatar>
    <Avatar size="md">M</Avatar>
    <Avatar size="lg">L</Avatar>
    <Avatar size="xl">XL</Avatar>
  </>
);
```

### 形状

```tsx live-codeblock
import React from 'react';
import { Avatar } from 'orva-ui';

export default () => (
  <>
    <Avatar shape="circle">圆形</Avatar>
    <Avatar shape="square">方形</Avatar>
    <Avatar shape="round">圆角</Avatar>
  </>
);
```

### 头像组

```tsx live-codeblock
import React from 'react';
import { Avatar } from 'orva-ui';

export default () => (
  <>
    <Avatar src="https://via.placeholder.com/100/FF0000" size="sm" />
    <Avatar src="https://via.placeholder.com/100/00FF00" size="sm" />
    <Avatar src="https://via.placeholder.com/100/0000FF" size="sm" />
    <Avatar src="https://via.placeholder.com/100/FFFF00" size="sm" />
  </>
);
```

### 带状态标识

```tsx live-codeblock
import React from 'react';
import { Avatar } from 'orva-ui';

export default () => (
  <>
    <Avatar 
      src="https://via.placeholder.com/100" 
      status="online"
    />
    <Avatar 
      src="https://via.placeholder.com/100" 
      status="offline"
    />
    <Avatar 
      src="https://via.placeholder.com/100" 
      status="busy"
    />
  </>
);
```

## Props

### Avatar

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| src | string | - | 头像图片地址 |
| alt | string | - | 图片描述 |
| icon | ReactNode | - | 图标（当无图片时使用） |
| size | `'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | 头像尺寸 |
| shape | `'circle' \| 'square' \| 'round'` | `'circle'` | 头像形状 |
| color | string | - | 背景颜色（文字头像） |
| textColor | string | - | 文字颜色 |
| status | `'online' \| 'offline' \| 'busy'` | - | 状态标识 |
| onError | `(e: Event) => void` | - | 图片加载失败回调 |
| className | string | - | 自定义类名 |
| style | CSSProperties | - | 自定义样式 |

## 主题定制

通过 `createTheme` 或 `ThemeProvider` 自定义主题变量，可以调整组件的颜色、字体、间距等样式。

```tsx live-codeblock
import { createTheme, ThemeProvider } from 'orva-ui';

const theme = createTheme({
  avatar: {
    borderRadius: '50%',
    borderWidth: '2px',
  },
});
```

## 注意事项

- 请确保在 `ThemeProvider` 包裹下使用组件以获得完整的主题支持
- 当 `src` 加载失败时，会自动显示 `icon` 或文字
- 图片头像优先于图标和文字
## 相关组件

以下是与当前组件相关的其他组件，可能在使用时搭配使用：

| 组件 | 说明 |
|------|------|
| [Badge](badge) | 状态徽标 |
| [List](list) | 列表展示 |
