# Row 行

**Related Components:** [Col](./col), [Grid](./grid)


Row 组件用于栅格布局中的行。支持响应式、对齐、间距等。

## 引入

```tsx live-codeblock
import { Row, Col } from 'orva-ui';
// 或按需导入
import { Row, Col } from 'orva-ui/layout';
```

## 基本使用

```tsx live-codeblock
import React from 'react';
import { Row, Col } from 'orva-ui';

export default () => {
  return (
    <Row>
      <Col span={8}>列 1</Col>
      <Col span={8}>列 2</Col>
      <Col span={8}>列 3</Col>
    </Row>
  );
};
```

## 使用示例

### 基础栅格

```tsx live-codeblock
import React from 'react';
import { Row, Col } from 'orva-ui';

export default () => {
  return (
    <Row>
      <Col span={8} style={{ background: '#3b82f6', padding: 16, color: '#fff' }}>列 1</Col>
      <Col span={8} style={{ background: '#10b981', padding: 16, color: '#fff' }}>列 2</Col>
      <Col span={8} style={{ background: '#f59e0b', padding: 16, color: '#fff' }}>列 3</Col>
    </Row>
  );
};
```

### 等分列

```tsx live-codeblock
import React from 'react';
import { Row, Col } from 'orva-ui';

export default () => {
  return (
    <Row>
      <Col span={6} style={{ background: '#3b82f6', padding: 16, color: '#fff' }}>1/4</Col>
      <Col span={6} style={{ background: '#10b981', padding: 16, color: '#fff' }}>1/4</Col>
      <Col span={6} style={{ background: '#f59e0b', padding: 16, color: '#fff' }}>1/4</Col>
      <Col span={6} style={{ background: '#ef4444', padding: 16, color: '#fff' }}>1/4</Col>
    </Row>
  );
};
```

### 两列布局

```tsx live-codeblock
import React from 'react';
import { Row, Col } from 'orva-ui';

export default () => {
  return (
    <Row>
      <Col span={16} style={{ background: '#3b82f6', padding: 16, color: '#fff' }}>主内容区</Col>
      <Col span={8} style={{ background: '#10b981', padding: 16, color: '#fff' }}>侧边栏</Col>
    </Row>
  );
};
```

### 响应式栅格

```tsx live-codeblock
import React from 'react';
import { Row, Col } from 'orva-ui';

export default () => {
  return (
    <Row>
      <Col xs={24} sm={12} md={8} lg={6} style={{ background: '#3b82f6', padding: 16, color: '#fff' }}>
        响应式列
      </Col>
      <Col xs={24} sm={12} md={8} lg={6} style={{ background: '#10b981', padding: 16, color: '#fff' }}>
        响应式列
      </Col>
      <Col xs={24} sm={12} md={8} lg={6} style={{ background: '#f59e0b', padding: 16, color: '#fff' }}>
        响应式列
      </Col>
      <Col xs={24} sm={12} md={8} lg={6} style={{ background: '#ef4444', padding: 16, color: '#fff' }}>
        响应式列
      </Col>
    </Row>
  );
};
```

### 列间距

```tsx live-codeblock
import React from 'react';
import { Row, Col } from 'orva-ui';

export default () => {
  return (
    <Row gutter={16}>
      <Col span={8} style={{ background: '#3b82f6', padding: 16, color: '#fff' }}>列 1</Col>
      <Col span={8} style={{ background: '#10b981', padding: 16, color: '#fff' }}>列 2</Col>
      <Col span={8} style={{ background: '#f59e0b', padding: 16, color: '#fff' }}>列 3</Col>
    </Row>
  );
};
```

### 垂直间距

```tsx live-codeblock
import React from 'react';
import { Row, Col } from 'orva-ui';

export default () => {
  return (
    <Row gutter={[16, 16]}>
      <Col span={8} style={{ background: '#3b82f6', padding: 16, color: '#fff' }}>行 1 列 1</Col>
      <Col span={8} style={{ background: '#10b981', padding: 16, color: '#fff' }}>行 1 列 2</Col>
      <Col span={8} style={{ background: '#f59e0b', padding: 16, color: '#fff' }}>行 1 列 3</Col>
      <Col span={8} style={{ background: '#ef4444', padding: 16, color: '#fff' }}>行 2 列 1</Col>
      <Col span={8} style={{ background: '#3b82f6', padding: 16, color: '#fff' }}>行 2 列 2</Col>
      <Col span={8} style={{ background: '#10b981', padding: 16, color: '#fff' }}>行 2 列 3</Col>
    </Row>
  );
};
```

### 对齐方式

```tsx live-codeblock
import React from 'react';
import { Row, Col } from 'orva-ui';

export default () => {
  return (
    <>
      <Row justify="start">
        <Col span={6} style={{ background: '#3b82f6', padding: 16, color: '#fff' }}>左对齐</Col>
      </Row>
      <Row justify="center" style={{ marginTop: 8 }}>
        <Col span={6} style={{ background: '#10b981', padding: 16, color: '#fff' }}>居中对齐</Col>
      </Row>
      <Row justify="end" style={{ marginTop: 8 }}>
        <Col span={6} style={{ background: '#f59e0b', padding: 16, color: '#fff' }}>右对齐</Col>
      </Row>
      <Row justify="space-between" style={{ marginTop: 8 }}>
        <Col span={6} style={{ background: '#ef4444', padding: 16, color: '#fff' }}>两端对齐</Col>
        <Col span={6} style={{ background: '#3b82f6', padding: 16, color: '#fff' }}>两端对齐</Col>
      </Row>
    </>
  );
};
```

### 垂直对齐

```tsx live-codeblock
import React from 'react';
import { Row, Col } from 'orva-ui';

export default () => {
  return (
    <Row align="stretch" style={{ height: 100 }}>
      <Col span={6} style={{ background: '#3b82f6', padding: 16, color: '#fff' }}>等高</Col>
      <Col span={6} style={{ background: '#10b981', padding: 16, color: '#fff' }}>等高</Col>
      <Col span={6} style={{ background: '#f59e0b', padding: 16, color: '#fff' }}>等高</Col>
    </Row>
  );
};
```

### 偏移

```tsx live-codeblock
import React from 'react';
import { Row, Col } from 'orva-ui';

export default () => {
  return (
    <Row>
      <Col span={8} style={{ background: '#3b82f6', padding: 16, color: '#fff' }}>列 1</Col>
      <Col span={8} offset={8} style={{ background: '#10b981', padding: 16, color: '#fff' }}>列 2 (偏移 8)</Col>
    </Row>
  );
};
```

### 响应式偏移

```tsx live-codeblock
import React from 'react';
import { Row, Col } from 'orva-ui';

export default () => {
  return (
    <Row>
      <Col xs={24} sm={12} md={8} style={{ background: '#3b82f6', padding: 16, color: '#fff' }}>
        列 1
      </Col>
      <Col xs={24} sm={12} md={8} mdOffset={8} style={{ background: '#10b981', padding: 16, color: '#fff' }}>
        列 2 (md 时偏移)
      </Col>
    </Row>
  );
};
```

## Props

### Row

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| gutter | number / [number, number] | `0` | 列间距 |
| justify | `'start' \| 'center' \| 'end' \| 'space-between' \| 'space-around' \| 'space-evenly'` | `'start'` | 水平对齐 |
| align | `'top' \| 'middle' \| 'bottom' \| 'stretch'` | `'top'` | 垂直对齐 |
| className | string | - | 自定义类名 |
| style | CSSProperties | - | 自定义样式 |

### Col

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| span | number | `24` | 占据列数 |
| offset | number | `0` | 左侧偏移 |
| xs | number | - | 超小屏 span |
| sm | number | - | 小屏 span |
| md | number | - | 中等屏 span |
| lg | number | - | 大屏 span |
| xl | number | - | 超大屏 span |
| xxl | number | - | 超超大屏 span |
| className | string | - | 自定义类名 |
| style | CSSProperties | - | 自定义样式 |

## 断点说明

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
- `span` 总和为 24
- `gutter` 支持数组格式 `[水平间距, 垂直间距]`
## 相关组件

以下是与当前组件相关的其他组件，可能在使用时搭配使用：

| 组件 | 说明 |
|------|------|
| [Col](col) | 栅格列 |
| [Grid](grid) | 栅格系统 |
