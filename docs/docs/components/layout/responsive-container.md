# ResponsiveContainer 响应式容器

**Related Components:** [ResponsiveGrid](./responsivegrid), [Container](./container)


ResponsiveContainer 组件用于创建响应式布局容器。支持自动调整宽度、高度，适配不同屏幕。

## 引入

```tsx live-codeblock
import { ResponsiveContainer } from 'orva-ui';
// 或按需导入
import { ResponsiveContainer } from 'orva-ui/layout';
```

## 基本使用

```tsx live-codeblock
import React from 'react';
import { ResponsiveContainer } from 'orva-ui';

export default () => {
  return (
    <ResponsiveContainer>
      <div style={{ background: '#3b82f6', padding: 16, color: '#fff' }}>
        响应式内容
      </div>
    </ResponsiveContainer>
  );
};
```

## 使用示例

### 基础响应式容器

```tsx live-codeblock
import React from 'react';
import { ResponsiveContainer } from 'orva-ui';

export default () => {
  return (
    <ResponsiveContainer>
      <div style={{ background: '#3b82f6', padding: 16, color: '#fff' }}>
        容器宽度自动适应父容器
      </div>
    </ResponsiveContainer>
  );
};
```

### 设置最小宽度

```tsx live-codeblock
import React from 'react';
import { ResponsiveContainer } from 'orva-ui';

export default () => {
  return (
    <ResponsiveContainer minWidth={300}>
      <div style={{ background: '#3b82f6', padding: 16, color: '#fff' }}>
        最小宽度 300px
      </div>
    </ResponsiveContainer>
  );
};
```

### 设置最大宽度

```tsx live-codeblock
import React from 'react';
import { ResponsiveContainer } from 'orva-ui';

export default () => {
  return (
    <ResponsiveContainer maxWidth={1200}>
      <div style={{ background: '#3b82f6', padding: 16, color: '#fff' }}>
        最大宽度 1200px
      </div>
    </ResponsiveContainer>
  );
};
```

### 设置固定高度

```tsx live-codeblock
import React from 'react';
import { ResponsiveContainer } from 'orva-ui';

export default () => {
  return (
    <ResponsiveContainer height={300}>
      <div style={{ background: '#3b82f6', padding: 16, color: '#fff' }}>
        固定高度 300px
      </div>
    </ResponsiveContainer>
  );
};
```

### 百分比高度

```tsx live-codeblock
import React from 'react';
import { ResponsiveContainer } from 'orva-ui';

export default () => {
  return (
    <div style={{ height: 400 }}>
      <ResponsiveContainer height="100%">
        <div style={{ background: '#3b82f6', padding: 16, color: '#fff' }}>
          高度 100% 父容器
        </div>
      </ResponsiveContainer>
    </div>
  );
};
```

### 响应式断点

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
        根据断点调整样式
      </div>
    </ResponsiveContainer>
  );
};
```

### 响应式网格

```tsx live-codeblock
import React from 'react';
import { ResponsiveContainer, Row, Col } from 'orva-ui';

export default () => {
  return (
    <ResponsiveContainer>
      <Row>
        <Col xs={24} sm={12} md={8} lg={6}>
          <div style={{ background: '#3b82f6', padding: 16, color: '#fff' }}>
            响应式列
          </div>
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <div style={{ background: '#10b981', padding: 16, color: '#fff' }}>
            响应式列
          </div>
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <div style={{ background: '#f59e0b', padding: 16, color: '#fff' }}>
            响应式列
          </div>
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <div style={{ background: '#ef4444', padding: 16, color: '#fff' }}>
            响应式列
          </div>
        </Col>
      </Row>
    </ResponsiveContainer>
  );
};
```

### 响应式卡片

```tsx live-codeblock
import React from 'react';
import { ResponsiveContainer, Card } from 'orva-ui';

export default () => {
  return (
    <ResponsiveContainer>
      <Card title="响应式卡片" style={{ marginBottom: 16 }}>
        <p>卡片宽度自动适应容器</p>
      </Card>
    </ResponsiveContainer>
  );
};
```

### 响应式图表容器

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

### 响应式表格容器

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

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| minWidth | number | `0` | 最小宽度 |
| maxWidth | number | `Infinity` | 最大宽度 |
| height | number / string | - | 高度 |
| minHeight | number | `0` | 最小高度 |
| maxHeight | number | `Infinity` | 最大高度 |
| breakpoints | Breakpoints | - | 断点配置 |
| className | string | - | 自定义类名 |
| style | CSSProperties | - | 自定义样式 |

## Breakpoints

| 断点 | 宽度 | 说明 |
|------|------|------|
| xs | <576px | 超小屏 |
| sm | ≥576px | 小屏 |
| md | ≥768px | 中等屏 |
| lg | ≥992px | 大屏 |
| xl | ≥1200px | 超大屏 |
| xxl | ≥1600px | 超超大屏 |

## 注意事项

- 请确保在 `ThemeProvider` 包裹下使用组件以获得完整的主题支持
- 父容器需要有明确的高度，百分比高度才能生效
- `breakpoints` 支持为不同断点设置不同的样式
## 相关组件

以下是与当前组件相关的其他组件，可能在使用时搭配使用：

| 组件 | 说明 |
|------|------|
| [ResponsiveGrid](responsivegrid) | 组件 |
| [Container](container) | 布局容器 |
