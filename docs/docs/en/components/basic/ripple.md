# Ripple

**Related Components:** [Button](./button), [Card](./card)


Ripple Ripple component for click ripple effects. SupportsMultiplecolors、sizes、Trigger mode, etc.. 

## Introduction

```tsx live-codeblock
import { Ripple } from 'orva-ui';
// 或按需导入
import { Ripple } from 'orva-ui/basic';
```

## Basic Usage

```tsx live-codeblock
import React from 'react';
import { Ripple } from 'orva-ui';

export default () => {
  return (
    <Ripple>
      <button style={{ padding: '12px 24px', background: '#3b82f6', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer' }}>
        点击查看波纹
      </button>
    </Ripple>
  );
};
```

## Examples

### Basic Ripple

```tsx live-codeblock
import React from 'react';
import { Ripple } from 'orva-ui';

export default () => {
  return (
    <Ripple>
      <button style={{ padding: '12px 24px', background: '#3b82f6', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer' }}>
        点击查看波纹
      </button>
    </Ripple>
  );
};
```

### Customcolors

```tsx live-codeblock
import React from 'react';
import { Ripple, Space } from 'orva-ui';

export default () => {
  return (
    <Space>
      <Ripple color="#3b82f6">
        <button style={{ padding: '12px 24px', background: '#f5f5f5', border: 'none', borderRadius: 4, cursor: 'pointer' }}>
          蓝色
        </button>
      </Ripple>
      <Ripple color="#10b981">
        <button style={{ padding: '12px 24px', background: '#f5f5f5', border: 'none', borderRadius: 4, cursor: 'pointer' }}>
          绿色
        </button>
      </Ripple>
      <Ripple color="#f59e0b">
        <button style={{ padding: '12px 24px', background: '#f5f5f5', border: 'none', borderRadius: 4, cursor: 'pointer' }}>
          黄色
        </button>
      </Ripple>
      <Ripple color="#ef4444">
        <button style={{ padding: '12px 24px', background: '#f5f5f5', border: 'none', borderRadius: 4, cursor: 'pointer' }}>
          红色
        </button>
      </Ripple>
    </Space>
  );
};
```

### CircleRipple

```tsx live-codeblock
import React from 'react';
import { Ripple, Space } from 'orva-ui';

export default () => {
  return (
    <Space>
      <Ripple circle>
        <button style={{ width: 48, height: 48, borderRadius: '50%', background: '#3b82f6', color: '#fff', border: 'none', cursor: 'pointer' }}>
          圆 1
        </button>
      </Ripple>
      <Ripple circle>
        <button style={{ width: 48, height: 48, borderRadius: '50%', background: '#10b981', color: '#fff', border: 'none', cursor: 'pointer' }}>
          圆 2
        </button>
      </Ripple>
      <Ripple circle>
        <button style={{ width: 48, height: 48, borderRadius: '50%', background: '#f59e0b', color: '#fff', border: 'none', cursor: 'pointer' }}>
          圆 3
        </button>
      </Ripple>
    </Space>
  );
};
```

### CenterRipple

```tsx live-codeblock
import React from 'react';
import { Ripple } from 'orva-ui';

export default () => {
  return (
    <Ripple center>
      <button style={{ padding: '12px 24px', background: '#3b82f6', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer' }}>
        中心波纹
      </button>
    </Ripple>
  );
};
```

### 无colorsRipple

```tsx live-codeblock
import React from 'react';
import { Ripple } from 'orva-ui';

export default () => {
  return (
    <Ripple unbounded>
      <button style={{ padding: '12px 24px', background: 'transparent', border: '1px solid #3b82f6', color: '#3b82f6', borderRadius: 4, cursor: 'pointer' }}>
        无背景波纹
      </button>
    </Ripple>
  );
};
```

### 组合Use

```tsx live-codeblock
import React from 'react';
import { Ripple, Space } from 'orva-ui';

export default () => {
  return (
    <Space>
      <Ripple color="#3b82f6" circle>
        <button style={{ width: 48, height: 48, borderRadius: '50%', background: '#3b82f6', color: '#fff', border: 'none', cursor: 'pointer' }}>
          圆 + colors
        </button>
      </Ripple>
      <Ripple center unbounded>
        <button style={{ width: 48, height: 48, borderRadius: '50%', background: 'transparent', border: '1px solid #3b82f6', color: '#3b82f6', cursor: 'pointer' }}>
          中心 + 无背景
        </button>
      </Ripple>
    </Space>
  );
};
```

### ButtonRipple

```tsx live-codeblock
import React from 'react';
import { Ripple, Button } from 'orva-ui';

export default () => {
  return (
    <Ripple>
      <Button type="primary">带波纹的按钮</Button>
    </Ripple>
  );
};
```

### iconButtonRipple

```tsx live-codeblock
import React from 'react';
import { Ripple, Button, Icon } from 'orva-ui';

export default () => {
  return (
    <Ripple circle>
      <Button shape="circle" icon={<Icon name="mdi:star" />} />
    </Ripple>
  );
};
```

### CardRipple

```tsx live-codeblock
import React from 'react';
import { Ripple, Card } from 'orva-ui';

export default () => {
  return (
    <Ripple>
      <Card title="可点击Card" style={{ cursor: 'pointer' }}>
        <p>点击Card查看波纹效果</p>
      </Card>
    </Ripple>
  );
};
```

## Props

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| color | string | - | Ripplecolors |
| circle | boolean | `false` | WhetherCircle |
| center | boolean | `false` | WhetherCenter触发 |
| unbounded | boolean | `false` | Whether无Boundary |
| className | string | - | Custom class name |
| style | CSSProperties | - | Custom Style |

## Notes

- Ensure the component is wrapped in `ThemeProvider` for full theme support
- `circle` 为 `true` 时Ripple以Circle扩散
- `center` 为 `true` 时Ripple从点击位置Center扩散
- `unbounded` 为 `true` 时Ripple不Limit在Sub componentBoundary内
## Related Components

The following components are related and may be used together:

| Component | Description |
|-----------|-------------|
| [Button](button) | Basic InteractionComponent |
| [Card](card) | CardContainer |
