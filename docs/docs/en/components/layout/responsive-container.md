# ResponsiveContainer

**Related Components:** [ResponsiveGrid](./responsivegrid), [Container](./container)


ResponsiveContainer Component for creatingresponsive widthLayoutContainer. Supports auto-adjusting width、height, Adapt to different screens. 

## Introduction

```tsx live-codeblock
import { ResponsiveContainer } from 'orva-ui';
// 或按需导入
import { ResponsiveContainer } from 'orva-ui/layout';
```

## Basic Usage

```tsx live-codeblock
import React from 'react';
import { ResponsiveContainer } from 'orva-ui';

export default () => {
  return (
    <ResponsiveContainer>
      <div style={{ background: '#3b82f6', padding: 16, color: '#fff' }}>
        responsive widthContent
      </div>
    </ResponsiveContainer>
  );
};
```

## Examples

### Basic responsive widthContainer

```tsx live-codeblock
import React from 'react';
import { ResponsiveContainer } from 'orva-ui';

export default () => {
  return (
    <ResponsiveContainer>
      <div style={{ background: '#3b82f6', padding: 16, color: '#fff' }}>
        容器Width自动适应父容器
      </div>
    </ResponsiveContainer>
  );
};
```

### SettingMinWidth

```tsx live-codeblock
import React from 'react';
import { ResponsiveContainer } from 'orva-ui';

export default () => {
  return (
    <ResponsiveContainer minWidth={300}>
      <div style={{ background: '#3b82f6', padding: 16, color: '#fff' }}>
        最小Width 300px
      </div>
    </ResponsiveContainer>
  );
};
```

### SettingMaxWidth

```tsx live-codeblock
import React from 'react';
import { ResponsiveContainer } from 'orva-ui';

export default () => {
  return (
    <ResponsiveContainer maxWidth={1200}>
      <div style={{ background: '#3b82f6', padding: 16, color: '#fff' }}>
        最大Width 1200px
      </div>
    </ResponsiveContainer>
  );
};
```

### SettingSticky/Fixedheight

```tsx live-codeblock
import React from 'react';
import { ResponsiveContainer } from 'orva-ui';

export default () => {
  return (
    <ResponsiveContainer height={300}>
      <div style={{ background: '#3b82f6', padding: 16, color: '#fff' }}>
        固定height 300px
      </div>
    </ResponsiveContainer>
  );
};
```

### Percentageheight

```tsx live-codeblock
import React from 'react';
import { ResponsiveContainer } from 'orva-ui';

export default () => {
  return (
    <div style={{ height: 400 }}>
      <ResponsiveContainer height="100%">
        <div style={{ background: '#3b82f6', padding: 16, color: '#fff' }}>
          height 100% 父容器
        </div>
      </ResponsiveContainer>
    </div>
  );
};
```

### responsive widthBreakpoint

```tsx live-codeblock
import React from 'react';
import { ResponsiveContainer } from 'orva-ui';

export default () => {
  return (
    <ResponsiveContainer
      breakpoints={{
        xs: { padding: 8 },
        sm: { padding: 16 },
        md: { padding: 24 },
        lg: { padding: 32 },
        xl: { padding: 40 },
      }}
    >
      <div style={{ background: '#3b82f6', color: '#fff' }}>
        根据Breakpoint调整样式
      </div>
    </ResponsiveContainer>
  );
};
```

### responsive widthGrid

```tsx live-codeblock
import React from 'react';
import { ResponsiveContainer, Row, Col } from 'orva-ui';

export default () => {
  return (
    <ResponsiveContainer>
      <Row>
        <Col xs={24} sm={12} md={8} lg={6}>
          <div style={{ background: '#3b82f6', padding: 16, color: '#fff' }}>
            responsive width列
          </div>
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <div style={{ background: '#10b981', padding: 16, color: '#fff' }}>
            responsive width列
          </div>
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <div style={{ background: '#f59e0b', padding: 16, color: '#fff' }}>
            responsive width列
          </div>
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <div style={{ background: '#ef4444', padding: 16, color: '#fff' }}>
            responsive width列
          </div>
        </Col>
      </Row>
    </ResponsiveContainer>
  );
};
```

### responsive widthCard

```tsx live-codeblock
import React from 'react';
import { ResponsiveContainer, Card } from 'orva-ui';

export default () => {
  return (
    <ResponsiveContainer>
      <Card title="responsive widthCard" style={{ marginBottom: 16 }}>
        <p>CardWidth自动适应容器</p>
      </Card>
    </ResponsiveContainer>
  );
};
```

### responsive width图表Container

```tsx live-codeblock
import React from 'react';
import { ResponsiveContainer } from 'orva-ui';

export default () => {
  return (
    <ResponsiveContainer height={300}>
      <div style={{ background: '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p>图表容器（占位）</p>
      </div>
    </ResponsiveContainer>
  );
};
```

### responsive widthTableContainer

```tsx live-codeblock
import React from 'react';
import { ResponsiveContainer, Table } from 'orva-ui';

export default () => {
  const columns = [
    { title: '姓名', dataIndex: 'name', key: 'name' },
    { title: '年龄', dataIndex: 'age', key: 'age' },
    { title: '地址', dataIndex: 'address', key: 'address' },
  ];
  
  const dataSource = [
    { key: '1', name: '张三', age: 32, address: '上海市' },
    { key: '2', name: '李四', age: 42, address: '北京市' },
    { key: '3', name: '王五', age: 32, address: '广州市' },
  ];
  
  return (
    <ResponsiveContainer>
      <Table columns={columns} dataSource={dataSource} />
    </ResponsiveContainer>
  );
};
```

## Props

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| minWidth | number | `0` | MinWidth |
| maxWidth | number | `Infinity` | MaxWidth |
| height | number / string | - | height |
| minHeight | number | `0` | Minheight |
| maxHeight | number | `Infinity` | Maxheight |
| breakpoints | Breakpoints | - | BreakpointConfig |
| className | string | - | Custom class name |
| style | CSSProperties | - | Custom Style |

## Breakpoints

| Breakpoint | Width | Description |
|-----------|-------------|
| xs | <576px | xs (extra small) |
| sm | ≥576px | sm (small) |
| md | ≥768px | 中, etc.屏 |
| lg | ≥992px | lg (large) |
| xl | ≥1200px | 超lg (large) |
| xxl | ≥1600px | xxlg (large) |

## Notes

- Ensure the component is wrapped in `ThemeProvider` for full theme support
- 父Container需要有明确的height, Percentageheight才能生效
- `breakpoints` Supports为DifferentBreakpointSettingDifferent的Style
## Related Components

The following components are related and may be used together:

| Component | Description |
|-----------|-------------|
| [ResponsiveGrid](responsivegrid) | Component |
| [Container](container) | LayoutContainer |
