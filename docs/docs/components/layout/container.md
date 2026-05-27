# Container 容器

**Related Components:** [Layout](./layout), [Grid](./grid)


Container 组件用于页面布局的容器。支持固定宽度、响应式、居中、带侧边栏等。

## 引入

```tsx live-codeblock
import { Container } from 'orva-ui';
// 或按需导入
import { Container } from 'orva-ui/layout';
```

## 基本使用

```tsx live-codeblock
import React from 'react';
import { Container } from 'orva-ui';

export default () => {
  return (
    <Container>
      <h1>页面内容</h1>
      <p>这是容器内的内容</p>
    </Container>
  );
};
```

## 使用示例

### 基础容器

```tsx live-codeblock
import React from 'react';
import { Container } from 'orva-ui';

export default () => {
  return (
    <Container>
      <h1>页面标题</h1>
      <p>容器会自动设置最大宽度和左右边距</p>
    </Container>
  );
};
```

### 固定宽度

```tsx live-codeblock
import React from 'react';
import { Container } from 'orva-ui';

export default () => {
  return (
    <Container width={1200}>
      <h1>固定宽度 1200px</h1>
      <p>容器宽度固定为 1200px，超出部分会滚动</p>
    </Container>
  );
};
```

### 响应式容器

```tsx live-codeblock
import React from 'react';
import { Container } from 'orva-ui';

export default () => {
  return (
    <Container responsive>
      <h1>响应式容器</h1>
      <p>容器宽度会根据屏幕大小自动调整</p>
    </Container>
  );
};
```

### 全屏容器

```tsx live-codeblock
import React from 'react';
import { Container } from 'orva-ui';

export default () => {
  return (
    <Container fluid>
      <h1>全屏容器</h1>
      <p>容器宽度占满整个屏幕</p>
    </Container>
  );
};
```

### 带边距

```tsx live-codeblock
import React from 'react';
import { Container } from 'orva-ui';

export default () => {
  return (
    <Container padding={24}>
      <h1>带内边距</h1>
      <p>容器内部有 24px 的内边距</p>
    </Container>
  );
};
```

### 带外边距

```tsx live-codeblock
import React from 'react';
import { Container } from 'orva-ui';

export default () => {
  return (
    <Container margin={24}>
      <h1>带外边距</h1>
      <p>容器外部有 24px 的外边距</p>
    </Container>
  );
};
```

### 居中容器

```tsx live-codeblock
import React from 'react';
import { Container } from 'orva-ui';

export default () => {
  return (
    <Container centered>
      <h1>居中对齐</h1>
      <p>容器在页面中水平居中</p>
    </Container>
  );
};
```

### 带背景色

```tsx live-codeblock
import React from 'react';
import { Container } from 'orva-ui';

export default () => {
  return (
    <Container style={{ background: '#f5f5f5', borderRadius: 8 }}>
      <h1>带背景色</h1>
      <p>可以通过 style 自定义背景色</p>
    </Container>
  );
};
```

### 带阴影

```tsx live-codeblock
import React from 'react';
import { Container } from 'orva-ui';

export default () => {
  return (
    <Container shadow>
      <h1>带阴影</h1>
      <p>容器带有阴影效果</p>
    </Container>
  );
};
```

### 带圆角

```tsx live-codeblock
import React from 'react';
import { Container } from 'orva-ui';

export default () => {
  return (
    <Container rounded>
      <h1>带圆角</h1>
      <p>容器带有圆角效果</p>
    </Container>
  );
};
```

### 组合使用

```tsx live-codeblock
import React from 'react';
import { Container } from 'orva-ui';

export default () => {
  return (
    <Container 
      width={1200}
      responsive
      padding={24}
      shadow
      rounded
      style={{ background: '#fff' }}
    >
      <h1>组合效果</h1>
      <p>容器支持多种属性的组合使用</p>
    </Container>
  );
};
```

## Props

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| width | number | - | 固定宽度 |
| responsive | boolean | `false` | 是否响应式 |
| fluid | boolean | `false` | 是否全屏 |
| padding | number | `0` | 内边距 |
| margin | number | `0` | 外边距 |
| centered | boolean | `false` | 是否居中 |
| shadow | boolean | `false` | 是否阴影 |
| rounded | boolean | `false` | 是否圆角 |
| className | string | - | 自定义类名 |
| style | CSSProperties | - | 自定义样式 |

## 响应式断点

| 断点 | 宽度 | 容器最大宽度 |
|------|------|-------------|
| xs | <576px | 100% |
| sm | ≥576px | 540px |
| md | ≥768px | 720px |
| lg | ≥992px | 960px |
| xl | ≥1200px | 1140px |
| xxl | ≥1600px | 1320px |

## 注意事项

- 请确保在 `ThemeProvider` 包裹下使用组件以获得完整的主题支持
- `fluid` 为 `true` 时忽略 `width` 属性
- `responsive` 和 `width` 同时使用时，`width` 优先级更高
## 相关组件

以下是与当前组件相关的其他组件，可能在使用时搭配使用：

| 组件 | 说明 |
|------|------|
| [Layout](layout) | 页面布局 |
| [Grid](grid) | 栅格系统 |
