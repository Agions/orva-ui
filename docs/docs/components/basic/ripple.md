# Ripple 波纹

**Related Components:** [Button](./button), [Card](./card)


Ripple 组件用于添加点击波纹效果。支持多种颜色、尺寸、触发方式等。

## 引入

```tsx live-codeblock
import { Ripple } from 'orva-ui';
// 或按需导入
import { Ripple } from 'orva-ui/basic';
```

## 基本使用

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

## 使用示例

### 基础波纹

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

### 自定义颜色

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

### 圆形波纹

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

### 中心波纹

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

### 无颜色波纹

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

### 组合使用

```tsx live-codeblock
import React from 'react';
import { Ripple, Space } from 'orva-ui';

export default () => {
  return (
    <Space>
      <Ripple color="#3b82f6" circle>
        <button style={{ width: 48, height: 48, borderRadius: '50%', background: '#3b82f6', color: '#fff', border: 'none', cursor: 'pointer' }}>
          圆 + 颜色
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

### 按钮波纹

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

### 图标按钮波纹

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

### 卡片波纹

```tsx live-codeblock
import React from 'react';
import { Ripple, Card } from 'orva-ui';

export default () => {
  return (
    <Ripple>
      <Card title="可点击卡片" style={{ cursor: 'pointer' }}>
        <p>点击卡片查看波纹效果</p>
      </Card>
    </Ripple>
  );
};
```

## Props

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| color | string | - | 波纹颜色 |
| circle | boolean | `false` | 是否圆形 |
| center | boolean | `false` | 是否中心触发 |
| unbounded | boolean | `false` | 是否无边界 |
| className | string | - | 自定义类名 |
| style | CSSProperties | - | 自定义样式 |

## 注意事项

- 请确保在 `ThemeProvider` 包裹下使用组件以获得完整的主题支持
- `circle` 为 `true` 时波纹以圆形扩散
- `center` 为 `true` 时波纹从点击位置中心扩散
- `unbounded` 为 `true` 时波纹不限制在子组件边界内
## 相关组件

以下是与当前组件相关的其他组件，可能在使用时搭配使用：

| 组件 | 说明 |
|------|------|
| [Button](button) | 基础交互组件 |
| [Card](card) | 卡片容器 |
