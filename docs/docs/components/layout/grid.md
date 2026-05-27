# Grid 栅格

**Related Components:** [Row](./row), [Col](./col)


Grid 组件用于创建响应式栅格系统。基于 24 列网格，支持响应式断点、对齐、间距等。

## 引入

```tsx live-codeblock
import { Grid, Row, Col } from 'orva-ui';
// 或按需导入
import { Grid, Row, Col } from 'orva-ui/layout';
```

## 基本使用

```tsx live-codeblock
import React from 'react';
import { Grid, Row, Col } from 'orva-ui';

export default () => {
  return (
    <Grid>
      <Row>
        <Col span={8}>列 1</Col>
        <Col span={8}>列 2</Col>
        <Col span={8}>列 3</Col>
      </Row>
    </Grid>
  );
};
```

## 使用示例

### 基础栅格

```tsx live-codeblock
import React from 'react';
import { Grid, Row, Col } from 'orva-ui';

export default () => {
  return (
    <Grid>
      <Row>
        <Col span={6} style={{ background: '#3b82f6', padding: 16, color: '#fff' }}>1/4</Col>
        <Col span={6} style={{ background: '#10b981', padding: 16, color: '#fff' }}>1/4</Col>
        <Col span={6} style={{ background: '#f59e0b', padding: 16, color: '#fff' }}>1/4</Col>
        <Col span={6} style={{ background: '#ef4444', padding: 16, color: '#fff' }}>1/4</Col>
      </Row>
    </Grid>
  );
};
```

### 响应式栅格

```tsx live-codeblock
import React from 'react';
import { Grid, Row, Col } from 'orva-ui';

export default () => {
  return (
    <Grid>
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
    </Grid>
  );
};
```

### 列间距

```tsx live-codeblock
import React from 'react';
import { Grid, Row, Col } from 'orva-ui';

export default () => {
  return (
    <Grid gutter={16}>
      <Row>
        <Col span={8} style={{ background: '#3b82f6', padding: 16, color: '#fff' }}>列 1</Col>
        <Col span={8} style={{ background: '#10b981', padding: 16, color: '#fff' }}>列 2</Col>
        <Col span={8} style={{ background: '#f59e0b', padding: 16, color: '#fff' }}>列 3</Col>
      </Row>
    </Grid>
  );
};
```

### 垂直间距

```tsx live-codeblock
import React from 'react';
import { Grid, Row, Col } from 'orva-ui';

export default () => {
  return (
    <Grid gutter={[16, 16]}>
      <Row>
        <Col span={8} style={{ background: '#3b82f6', padding: 16, color: '#fff' }}>行 1 列 1</Col>
        <Col span={8} style={{ background: '#10b981', padding: 16, color: '#fff' }}>行 1 列 2</Col>
        <Col span={8} style={{ background: '#f59e0b', padding: 16, color: '#fff' }}>行 1 列 3</Col>
      </Row>
      <Row>
        <Col span={8} style={{ background: '#ef4444', padding: 16, color: '#fff' }}>行 2 列 1</Col>
        <Col span={8} style={{ background: '#3b82f6', padding: 16, color: '#fff' }}>行 2 列 2</Col>
        <Col span={8} style={{ background: '#10b981', padding: 16, color: '#fff' }}>行 2 列 3</Col>
      </Row>
    </Grid>
  );
};
```

### 对齐方式

```tsx live-codeblock
import React from 'react';
import { Grid, Row, Col } from 'orva-ui';

export default () => {
  return (
    <Grid>
      <Row justify="center">
        <Col span={6} style={{ background: '#3b82f6', padding: 16, color: '#fff' }}>居中对齐</Col>
      </Row>
      <Row justify="end" style={{ marginTop: 8 }}>
        <Col span={6} style={{ background: '#10b981', padding: 16, color: '#fff' }}>右对齐</Col>
      </Row>
      <Row justify="space-between" style={{ marginTop: 8 }}>
        <Col span={6} style={{ background: '#f59e0b', padding: 16, color: '#fff' }}>两端对齐</Col>
        <Col span={6} style={{ background: '#ef4444', padding: 16, color: '#fff' }}>两端对齐</Col>
      </Row>
    </Grid>
  );
};
```

### 垂直对齐

```tsx live-codeblock
import React from 'react';
import { Grid, Row, Col } from 'orva-ui';

export default () => {
  return (
    <Grid>
      <Row align="middle" style={{ height: 100 }}>
        <Col span={6} style={{ background: '#3b82f6', padding: 16, color: '#fff' }}>垂直居中</Col>
        <Col span={6} style={{ background: '#10b981', padding: 16, color: '#fff' }}>垂直居中</Col>
        <Col span={6} style={{ background: '#f59e0b', padding: 16, color: '#fff' }}>垂直居中</Col>
      </Row>
    </Grid>
  );
};
```

### 嵌套栅格

```tsx live-codeblock
import React from 'react';
import { Grid, Row, Col } from 'orva-ui';

export default () => {
  return (
    <Grid>
      <Row>
        <Col span={12} style={{ background: '#3b82f6', padding: 16, color: '#fff' }}>
          外层列 1
          <Grid gutter={8} style={{ marginTop: 8 }}>
            <Row>
              <Col span={12} style={{ background: '#10b981', padding: 8, color: '#fff' }}>内层 1/2</Col>
              <Col span={12} style={{ background: '#f59e0b', padding: 8, color: '#fff' }}>内层 1/2</Col>
            </Row>
          </Grid>
        </Col>
        <Col span={12} style={{ background: '#ef4444', padding: 16, color: '#fff' }}>
          外层列 2
          <Grid gutter={8} style={{ marginTop: 8 }}>
            <Row>
              <Col span={8} style={{ background: '#10b981', padding: 8, color: '#fff' }}>内层 1/3</Col>
              <Col span={8} style={{ background: '#f59e0b', padding: 8, color: '#fff' }}>内层 1/3</Col>
              <Col span={8} style={{ background: '#3b82f6', padding: 8, color: '#fff' }}>内层 1/3</Col>
            </Row>
          </Grid>
        </Col>
      </Row>
    </Grid>
  );
};
```

### 偏移

```tsx live-codeblock
import React from 'react';
import { Grid, Row, Col } from 'orva-ui';

export default () => {
  return (
    <Grid>
      <Row>
        <Col span={8} style={{ background: '#3b82f6', padding: 16, color: '#fff' }}>列 1</Col>
        <Col span={8} offset={8} style={{ background: '#10b981', padding: 16, color: '#fff' }}>列 2 (偏移 8)</Col>
      </Row>
    </Grid>
  );
};
```

### 响应式偏移

```tsx live-codeblock
import React from 'react';
import { Grid, Row, Col } from 'orva-ui';

export default () => {
  return (
    <Grid>
      <Row>
        <Col xs={24} sm={12} md={8} lg={6} style={{ background: '#3b82f6', padding: 16, color: '#fff' }}>
          列 1
        </Col>
        <Col xs={24} sm={12} md={8} lg={6} mdOffset={8} lgOffset={12} style={{ background: '#10b981', padding: 16, color: '#fff' }}>
          列 2 (响应式偏移)
        </Col>
      </Row>
    </Grid>
  );
};
```

## Props

### Grid

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| gutter | number / [number, number] | `0` | 列间距 |
| className | string | - | 自定义类名 |
| style | CSSProperties | - | 自定义样式 |

### Row (同 Row 组件)

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| gutter | number / [number, number] | `0` | 列间距 |
| justify | `'start' \| 'center' \| 'end' \| 'space-between' \| 'space-around' \| 'space-evenly'` | `'start'` | 水平对齐 |
| align | `'top' \| 'middle' \| 'bottom' \| 'stretch'` | `'top'` | 垂直对齐 |
| className | string | - | 自定义类名 |
| style | CSSProperties | - | 自定义样式 |

### Col (同 Col 组件)

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| span | number | `24` | 占据列数 |
| offset | number | `0` | 左侧偏移 |
| order | number | `0` | 排序顺序 |
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
- Grid 组件是 Row 和 Col 的包装器，提供统一的栅格上下文
## 相关组件

以下是与当前组件相关的其他组件，可能在使用时搭配使用：

| 组件 | 说明 |
|------|------|
| [Row](row) | 栅格行 |
| [Col](col) | 栅格列 |
