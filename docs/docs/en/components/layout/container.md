# Container

**Related Components:** [Layout](./layout), [Grid](./grid)


Container Container component for page layout containers. Supports fixed width、responsive width、Centered、带Sidebar, etc.. 

## Introduction

```tsx live-codeblock
import { Container } from 'orva-ui';
// 或按需导入
import { Container } from 'orva-ui/layout';
```

## Basic Usage

```tsx live-codeblock
import React from 'react';
import { Container } from 'orva-ui';

export default () => {
  return (
    <Container>
      <h1>页面Content</h1>
      <p>这是容器内的Content</p>
    </Container>
  );
};
```

## Examples

### Basic Container

```tsx live-codeblock
import React from 'react';
import { Container } from 'orva-ui';

export default () => {
  return (
    <Container>
      <h1>页面Title</h1>
      <p>容器会自动设置最大Width和左右边距</p>
    </Container>
  );
};
```

### Sticky/FixedWidth

```tsx live-codeblock
import React from 'react';
import { Container } from 'orva-ui';

export default () => {
  return (
    <Container width={1200}>
      <h1>固定Width 1200px</h1>
      <p>容器Width固定为 1200px, 超出部分会滚动</p>
    </Container>
  );
};
```

### responsive widthContainer

```tsx live-codeblock
import React from 'react';
import { Container } from 'orva-ui';

export default () => {
  return (
    <Container responsive>
      <h1>responsive width容器</h1>
      <p>容器Width会根据屏幕sizes自动调整</p>
    </Container>
  );
};
```

### Full screenContainer

```tsx live-codeblock
import React from 'react';
import { Container } from 'orva-ui';

export default () => {
  return (
    <Container fluid>
      <h1>全屏容器</h1>
      <p>容器Width占满整个屏幕</p>
    </Container>
  );
};
```

### With margin

```tsx live-codeblock
import React from 'react';
import { Container } from 'orva-ui';

export default () => {
  return (
    <Container padding={24}>
      <h1>带Padding</h1>
      <p>容器内部有 24px 的Padding</p>
    </Container>
  );
};
```

### 带Margin

```tsx live-codeblock
import React from 'react';
import { Container } from 'orva-ui';

export default () => {
  return (
    <Container margin={24}>
      <h1>带Margin</h1>
      <p>容器外部有 24px 的Margin</p>
    </Container>
  );
};
```

### CenteredContainer

```tsx live-codeblock
import React from 'react';
import { Container } from 'orva-ui';

export default () => {
  return (
    <Container centered>
      <h1>居中alignment</h1>
      <p>容器在页面中horizontal居中</p>
    </Container>
  );
};
```

### 带Background color

```tsx live-codeblock
import React from 'react';
import { Container } from 'orva-ui';

export default () => {
  return (
    <Container style={{ background: '#f5f5f5', borderRadius: 8 }}>
      <h1>带Background color</h1>
      <p>可以Via style CustomBackground color</p>
    </Container>
  );
};
```

### 带Shadow

```tsx live-codeblock
import React from 'react';
import { Container } from 'orva-ui';

export default () => {
  return (
    <Container shadow>
      <h1>带Shadow</h1>
      <p>容器带有Shadow效果</p>
    </Container>
  );
};
```

### 带Border radius

```tsx live-codeblock
import React from 'react';
import { Container } from 'orva-ui';

export default () => {
  return (
    <Container rounded>
      <h1>带Border radius</h1>
      <p>容器带有Border radius效果</p>
    </Container>
  );
};
```

### 组合Use

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
      <p>容器Supports多种属性的组合Use</p>
    </Container>
  );
};
```

## Props

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| width | number | - | FixedWidth |
| responsive | boolean | `false` | Whetherresponsive width |
| fluid | boolean | `false` | WhetherFullscreen |
| padding | number | `0` | Padding |
| margin | number | `0` | Margin |
| centered | boolean | `false` | WhetherCentered |
| shadow | boolean | `false` | Whethershadow |
| rounded | boolean | `false` | Whetherborder radius |
| className | string | - | Custom class name |
| style | CSSProperties | - | Custom Style |

## responsive widthBreakpoint

| Breakpoint | Width | ContainerMaxWidth |
|-----------|-------------|
| xs | <576px | 100% |
| sm | ≥576px | 540px |
| md | ≥768px | 720px |
| lg | ≥992px | 960px |
| xl | ≥1200px | 1140px |
| xxl | ≥1600px | 1320px |

## Notes

- Ensure the component is wrapped in `ThemeProvider` for full theme support
- `fluid` 为 `true` Ignore when `width` Property
- `responsive` 和 `width` 同时Use时, `width` 优先级更高
## Related Components

The following components are related and may be used together:

| Component | Description |
|-----------|-------------|
| [Layout](layout) | PageLayout |
| [Grid](grid) | Grid system |
