# Row

**Related Components:** [Col](./col), [Grid](./grid)


Row Row component for grid layout rows. Supportsresponsive width、alignment、spacing, etc.. 

## Introduction

```tsx live-codeblock
import { Row, Col } from 'orva-ui';
// 或按需导入
import { Row, Col } from 'orva-ui/layout';
```

## Basic Usage

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

## Examples

### Basic Grid

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

### , etc.分Column

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

### 两ColumnLayout

```tsx live-codeblock
import React from 'react';
import { Row, Col } from 'orva-ui';

export default () => {
  return (
    <Row>
      <Col span={16} style={{ background: '#3b82f6', padding: 16, color: '#fff' }}>主Content区</Col>
      <Col span={8} style={{ background: '#10b981', padding: 16, color: '#fff' }}>侧边栏</Col>
    </Row>
  );
};
```

### responsive widthGrid

```tsx live-codeblock
import React from 'react';
import { Row, Col } from 'orva-ui';

export default () => {
  return (
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
  );
};
```

### Columnspacing

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

### verticalspacing

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

### alignmentMode

```tsx live-codeblock
import React from 'react';
import { Row, Col } from 'orva-ui';

export default () => {
  return (
    <>
      <Row justify="start">
        <Col span={6} style={{ background: '#3b82f6', padding: 16, color: '#fff' }}>左alignment</Col>
      </Row>
      <Row justify="center" style={{ marginTop: 8 }}>
        <Col span={6} style={{ background: '#10b981', padding: 16, color: '#fff' }}>居中alignment</Col>
      </Row>
      <Row justify="end" style={{ marginTop: 8 }}>
        <Col span={6} style={{ background: '#f59e0b', padding: 16, color: '#fff' }}>右alignment</Col>
      </Row>
      <Row justify="space-between" style={{ marginTop: 8 }}>
        <Col span={6} style={{ background: '#ef4444', padding: 16, color: '#fff' }}>两端alignment</Col>
        <Col span={6} style={{ background: '#3b82f6', padding: 16, color: '#fff' }}>两端alignment</Col>
      </Row>
    </>
  );
};
```

### verticalalignment

```tsx live-codeblock
import React from 'react';
import { Row, Col } from 'orva-ui';

export default () => {
  return (
    <Row align="stretch" style={{ height: 100 }}>
      <Col span={6} style={{ background: '#3b82f6', padding: 16, color: '#fff' }}>, etc.高</Col>
      <Col span={6} style={{ background: '#10b981', padding: 16, color: '#fff' }}>, etc.高</Col>
      <Col span={6} style={{ background: '#f59e0b', padding: 16, color: '#fff' }}>, etc.高</Col>
    </Row>
  );
};
```

### Offset

```tsx live-codeblock
import React from 'react';
import { Row, Col } from 'orva-ui';

export default () => {
  return (
    <Row>
      <Col span={8} style={{ background: '#3b82f6', padding: 16, color: '#fff' }}>列 1</Col>
      <Col span={8} offset={8} style={{ background: '#10b981', padding: 16, color: '#fff' }}>列 2 (Offset 8)</Col>
    </Row>
  );
};
```

### responsive widthOffset

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
        列 2 (md 时Offset)
      </Col>
    </Row>
  );
};
```

## Props

### Row

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| gutter | number / [number, number] | `0` | Columnspacing |
| justify | `'start' \| 'center' \| 'end' \| 'space-between' \| 'space-around' \| 'space-evenly'` | `'start'` | horizontalalignment |
| align | `'top' \| 'middle' \| 'bottom' \| 'stretch'` | `'top'` | verticalalignment |
| className | string | - | Custom class name |
| style | CSSProperties | - | Custom Style |

### Col

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| span | number | `24` | Column span |
| offset | number | `0` | LeftOffset |
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
|-----------|-------------|
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
## Related Components

The following components are related and may be used together:

| Component | Description |
|-----------|-------------|
| [Col](col) | Grid column |
| [Grid](grid) | Grid system |
