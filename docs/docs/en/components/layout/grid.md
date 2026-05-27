# Grid

**Related Components:** [Row](./row), [Col](./col)


Grid Component for creatingresponsive widthGridSystem. Based on 24 column grid, Supportsresponsive widthBreakpoint、alignment、spacing, etc.. 

## Introduction

```tsx live-codeblock
import { Grid, Row, Col } from 'orva-ui';
// 或按需导入
import { Grid, Row, Col } from 'orva-ui/layout';
```

## Basic Usage

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

## Examples

### Basic Grid

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

### responsive widthGrid

```tsx live-codeblock
import React from 'react';
import { Grid, Row, Col } from 'orva-ui';

export default () => {
  return (
    <Grid>
      <Row>
        <Col xs={24} sm={12} md={8} lg={6} style={{ background: '#3b82f6', padding: 16, color: '#fff' }}>
          responsive width列
        </Col>
        <Col xs={24} sm={12} md={8} lg={6} style={{ background: '#10b981', padding: 16, color: '#fff' }}>
          responsive width列
        </Col>
        <Col xs={24} sm={12} md={8} lg={6} style={{ background: '#f59e0b', padding: 16, color: '#fff' }}>
          responsive width列
        </Col>
        <Col xs={24} sm={12} md={8} lg={6} style={{ background: '#ef4444', padding: 16, color: '#fff' }}>
          responsive width列
        </Col>
      </Row>
    </Grid>
  );
};
```

### Columnspacing

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

### verticalspacing

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

### alignmentMode

```tsx live-codeblock
import React from 'react';
import { Grid, Row, Col } from 'orva-ui';

export default () => {
  return (
    <Grid>
      <Row justify="center">
        <Col span={6} style={{ background: '#3b82f6', padding: 16, color: '#fff' }}>居中alignment</Col>
      </Row>
      <Row justify="end" style={{ marginTop: 8 }}>
        <Col span={6} style={{ background: '#10b981', padding: 16, color: '#fff' }}>右alignment</Col>
      </Row>
      <Row justify="space-between" style={{ marginTop: 8 }}>
        <Col span={6} style={{ background: '#f59e0b', padding: 16, color: '#fff' }}>两端alignment</Col>
        <Col span={6} style={{ background: '#ef4444', padding: 16, color: '#fff' }}>两端alignment</Col>
      </Row>
    </Grid>
  );
};
```

### verticalalignment

```tsx live-codeblock
import React from 'react';
import { Grid, Row, Col } from 'orva-ui';

export default () => {
  return (
    <Grid>
      <Row align="middle" style={{ height: 100 }}>
        <Col span={6} style={{ background: '#3b82f6', padding: 16, color: '#fff' }}>vertical居中</Col>
        <Col span={6} style={{ background: '#10b981', padding: 16, color: '#fff' }}>vertical居中</Col>
        <Col span={6} style={{ background: '#f59e0b', padding: 16, color: '#fff' }}>vertical居中</Col>
      </Row>
    </Grid>
  );
};
```

### NestedGrid

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

### Offset

```tsx live-codeblock
import React from 'react';
import { Grid, Row, Col } from 'orva-ui';

export default () => {
  return (
    <Grid>
      <Row>
        <Col span={8} style={{ background: '#3b82f6', padding: 16, color: '#fff' }}>列 1</Col>
        <Col span={8} offset={8} style={{ background: '#10b981', padding: 16, color: '#fff' }}>列 2 (Offset 8)</Col>
      </Row>
    </Grid>
  );
};
```

### responsive widthOffset

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
          列 2 (responsive widthOffset)
        </Col>
      </Row>
    </Grid>
  );
};
```

## Props

### Grid

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| gutter | number / [number, number] | `0` | Columnspacing |
| className | string | - | Custom class name |
| style | CSSProperties | - | Custom Style |

### Row (同 Row Component)

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| gutter | number / [number, number] | `0` | Columnspacing |
| justify | `'start' \| 'center' \| 'end' \| 'space-between' \| 'space-around' \| 'space-evenly'` | `'start'` | horizontalalignment |
| align | `'top' \| 'middle' \| 'bottom' \| 'stretch'` | `'top'` | verticalalignment |
| className | string | - | Custom class name |
| style | CSSProperties | - | Custom Style |

### Col (同 Col Component)

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| span | number | `24` | Column span |
| offset | number | `0` | LeftOffset |
| order | number | `0` | sortingOrder |
| xs | number | - | xs (extra small) span |
| sm | number | - | sm (small) span |
| md | number | - | 中, etc.屏 span |
| lg | number | - | lg (large) span |
| xl | number | - | 超lg (large) span |
| xxl | number | - | xxlg (large) span |
| className | string | - | Custom class name |
| style | CSSProperties | - | Custom Style |

## BreakpointDescription

| Breakpoint | Width | Description |
|------|------|------|
| xs | <576px | xs (extra small) |
| sm | ≥576px | sm (small) |
| md | ≥768px | 中, etc.屏 |
| lg | ≥992px | lg (large) |
| xl | ≥1200px | 超lg (large) |
| xxl | ≥1600px | xxlg (large) |

## Notes

- Ensure the component is wrapped in `ThemeProvider` for full theme support
- `span` Sum is 24
- `gutter` Supports数组Format `[horizontalspacing, verticalspacing]`
- Grid Component是 Row 和 Col 的包装器, 提供统一的Grid上下文
## Related Components

The following components are related and may be used together:

| Component | Description |
|------|------|
| [Row](row) | Grid row |
| [Col](col) | Grid column |
