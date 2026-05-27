# Col

**Related Components:** [Row](./row), [Grid](./grid)


Col Col component for grid layout columns. Used with Row Row component, Supportsresponsive width、Offset、sorting, etc.. 

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

### Basic Column

```tsx live-codeblock
import React from 'react';
import { Row, Col } from 'orva-ui';

export default () => {
  return (
    <Row>
      <Col span={8} style={{ background: '#3b82f6', padding: 16, color: '#fff' }}>span=8</Col>
      <Col span={8} style={{ background: '#10b981', padding: 16, color: '#fff' }}>span=8</Col>
      <Col span={8} style={{ background: '#f59e0b', padding: 16, color: '#fff' }}>span=8</Col>
    </Row>
  );
};
```

### responsive widthColumn

```tsx live-codeblock
import React from 'react';
import { Row, Col } from 'orva-ui';

export default () => {
  return (
    <Row>
      <Col xs={24} sm={12} md={8} lg={6} xl={4} style={{ background: '#3b82f6', padding: 16, color: '#fff' }}>
        responsive width列
      </Col>
      <Col xs={24} sm={12} md={8} lg={6} xl={4} style={{ background: '#10b981', padding: 16, color: '#fff' }}>
        responsive width列
      </Col>
      <Col xs={24} sm={12} md={8} lg={6} xl={4} style={{ background: '#f59e0b', padding: 16, color: '#fff' }}>
        responsive width列
      </Col>
      <Col xs={24} sm={12} md={8} lg={6} xl={4} style={{ background: '#ef4444', padding: 16, color: '#fff' }}>
        responsive width列
      </Col>
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
      <Col span={8} offset={8} style={{ background: '#10b981', padding: 16, color: '#fff' }}>列 2 (offset=8)</Col>
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
      <Col xs={24} sm={12} md={8} lg={6} style={{ background: '#3b82f6', padding: 16, color: '#fff' }}>
        列 1
      </Col>
      <Col xs={24} sm={12} md={8} lg={6} mdOffset={8} lgOffset={12} style={{ background: '#10b981', padding: 16, color: '#fff' }}>
        列 2 (responsive widthOffset)
      </Col>
    </Row>
  );
};
```

### sorting

```tsx live-codeblock
import React from 'react';
import { Row, Col } from 'orva-ui';

export default () => {
  return (
    <Row>
      <Col span={8} order={2} style={{ background: '#3b82f6', padding: 16, color: '#fff' }}>
        order=2 (实际Show第二)
      </Col>
      <Col span={8} order={1} style={{ background: '#10b981', padding: 16, color: '#fff' }}>
        order=1 (实际Show第一)
      </Col>
      <Col span={8} order={3} style={{ background: '#f59e0b', padding: 16, color: '#fff' }}>
        order=3 (实际Show第三)
      </Col>
    </Row>
  );
};
```

### HideColumn

```tsx live-codeblock
import React from 'react';
import { Row, Col } from 'orva-ui';

export default () => {
  return (
    <Row>
      <Col xs={0} sm={8} md={8} style={{ background: '#3b82f6', padding: 16, color: '#fff' }}>
        xs Hide
      </Col>
      <Col span={8} style={{ background: '#10b981', padding: 16, color: '#fff' }}>
        始终Show
      </Col>
      <Col lg={0} xl={8} style={{ background: '#f59e0b', padding: 16, color: '#fff' }}>
        lg Hide
      </Col>
    </Row>
  );
};
```

### NestedGrid

```tsx live-codeblock
import React from 'react';
import { Row, Col } from 'orva-ui';

export default () => {
  return (
    <Row>
      <Col span={12} style={{ background: '#3b82f6', padding: 16, color: '#fff' }}>
        外层列 1
        <Row style={{ marginTop: 8 }}>
          <Col span={12} style={{ background: '#10b981', padding: 8, color: '#fff' }}>内层 1/2</Col>
          <Col span={12} style={{ background: '#f59e0b', padding: 8, color: '#fff' }}>内层 1/2</Col>
        </Row>
      </Col>
      <Col span={12} style={{ background: '#ef4444', padding: 16, color: '#fff' }}>
        外层列 2
        <Row style={{ marginTop: 8 }}>
          <Col span={8} style={{ background: '#10b981', padding: 8, color: '#fff' }}>内层 1/3</Col>
          <Col span={8} style={{ background: '#f59e0b', padding: 8, color: '#fff' }}>内层 1/3</Col>
          <Col span={8} style={{ background: '#3b82f6', padding: 8, color: '#fff' }}>内层 1/3</Col>
        </Row>
      </Col>
    </Row>
  );
};
```

### , etc.宽Column

```tsx live-codeblock
import React from 'react';
import { Row, Col } from 'orva-ui';

export default () => {
  return (
    <Row>
      <Col flex="1" style={{ background: '#3b82f6', padding: 16, color: '#fff' }}>
        , etc.宽列 1
      </Col>
      <Col flex="1" style={{ background: '#10b981', padding: 16, color: '#fff' }}>
        , etc.宽列 2
      </Col>
      <Col flex="1" style={{ background: '#f59e0b', padding: 16, color: '#fff' }}>
        , etc.宽列 3
      </Col>
    </Row>
  );
};
```

### Sticky/FixedWidthColumn

```tsx live-codeblock
import React from 'react';
import { Row, Col } from 'orva-ui';

export default () => {
  return (
    <Row>
      <Col flex="200px" style={{ background: '#3b82f6', padding: 16, color: '#fff' }}>
        Fixed 200px
      </Col>
      <Col flex="1" style={{ background: '#10b981', padding: 16, color: '#fff' }}>
        自适应
      </Col>
    </Row>
  );
};
```

## Props

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| span | number | `24` | Column span |
| offset | number | `0` | LeftOffset |
| order | number | `0` | sortingOrder |
| flex | string | - | flex Layout |
| xs | number | - | xs (extra small) span |
| sm | number | - | sm (small) span |
| md | number | - | 中, etc.屏 span |
| lg | number | - | lg (large) span |
| xl | number | - | 超lg (large) span |
| xxl | number | - | xxlg (large) span |
| xsOffset | number | - | xs (extra small)Offset |
| smOffset | number | - | sm (small)Offset |
| mdOffset | number | - | 中, etc.屏Offset |
| lgOffset | number | - | lg (large)Offset |
| xlOffset | number | - | 超lg (large)Offset |
| xxlOffset | number | - | xxlg (large)Offset |
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
- `span` Sum is recommended as 24
- `flex` Supports `1`、`200px`、`auto` , etc.Format
- responsive widthBreakpointSetting `0` 可Hide该Breakpoint的Column
## Related Components

The following components are related and may be used together:

| Component | Description |
|-----------|-------------|
| [Row](row) | Grid row |
| [Grid](grid) | Grid system |
