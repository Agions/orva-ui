# Col 列

**Related Components:** [Row](./row), [Grid](./grid)


Col 组件用于栅格布局中的列。配合 Row 组件使用，支持响应式、偏移、排序等。

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

### 基础列

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

### 响应式列

```tsx live-codeblock
import React from 'react';
import { Row, Col } from 'orva-ui';

export default () => {
  return (
    <Row>
      <Col xs={24} sm={12} md={8} lg={6} xl={4} style={{ background: '#3b82f6', padding: 16, color: '#fff' }}>
        响应式列
      </Col>
      <Col xs={24} sm={12} md={8} lg={6} xl={4} style={{ background: '#10b981', padding: 16, color: '#fff' }}>
        响应式列
      </Col>
      <Col xs={24} sm={12} md={8} lg={6} xl={4} style={{ background: '#f59e0b', padding: 16, color: '#fff' }}>
        响应式列
      </Col>
      <Col xs={24} sm={12} md={8} lg={6} xl={4} style={{ background: '#ef4444', padding: 16, color: '#fff' }}>
        响应式列
      </Col>
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
      <Col span={8} offset={8} style={{ background: '#10b981', padding: 16, color: '#fff' }}>列 2 (offset=8)</Col>
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
      <Col xs={24} sm={12} md={8} lg={6} style={{ background: '#3b82f6', padding: 16, color: '#fff' }}>
        列 1
      </Col>
      <Col xs={24} sm={12} md={8} lg={6} mdOffset={8} lgOffset={12} style={{ background: '#10b981', padding: 16, color: '#fff' }}>
        列 2 (响应式偏移)
      </Col>
    </Row>
  );
};
```

### 排序

```tsx live-codeblock
import React from 'react';
import { Row, Col } from 'orva-ui';

export default () => {
  return (
    <Row>
      <Col span={8} order={2} style={{ background: '#3b82f6', padding: 16, color: '#fff' }}>
        order=2 (实际显示第二)
      </Col>
      <Col span={8} order={1} style={{ background: '#10b981', padding: 16, color: '#fff' }}>
        order=1 (实际显示第一)
      </Col>
      <Col span={8} order={3} style={{ background: '#f59e0b', padding: 16, color: '#fff' }}>
        order=3 (实际显示第三)
      </Col>
    </Row>
  );
};
```

### 隐藏列

```tsx live-codeblock
import React from 'react';
import { Row, Col } from 'orva-ui';

export default () => {
  return (
    <Row>
      <Col xs={0} sm={8} md={8} style={{ background: '#3b82f6', padding: 16, color: '#fff' }}>
        xs 隐藏
      </Col>
      <Col span={8} style={{ background: '#10b981', padding: 16, color: '#fff' }}>
        始终显示
      </Col>
      <Col lg={0} xl={8} style={{ background: '#f59e0b', padding: 16, color: '#fff' }}>
        lg 隐藏
      </Col>
    </Row>
  );
};
```

### 嵌套栅格

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

### 等宽列

```tsx live-codeblock
import React from 'react';
import { Row, Col } from 'orva-ui';

export default () => {
  return (
    <Row>
      <Col flex="1" style={{ background: '#3b82f6', padding: 16, color: '#fff' }}>
        等宽列 1
      </Col>
      <Col flex="1" style={{ background: '#10b981', padding: 16, color: '#fff' }}>
        等宽列 2
      </Col>
      <Col flex="1" style={{ background: '#f59e0b', padding: 16, color: '#fff' }}>
        等宽列 3
      </Col>
    </Row>
  );
};
```

### 固定宽度列

```tsx live-codeblock
import React from 'react';
import { Row, Col } from 'orva-ui';

export default () => {
  return (
    <Row>
      <Col flex="200px" style={{ background: '#3b82f6', padding: 16, color: '#fff' }}>
        固定 200px
      </Col>
      <Col flex="1" style={{ background: '#10b981', padding: 16, color: '#fff' }}>
        自适应
      </Col>
    </Row>
  );
};
```

## Props

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| span | number | `24` | 占据列数 |
| offset | number | `0` | 左侧偏移 |
| order | number | `0` | 排序顺序 |
| flex | string | - | flex 布局 |
| xs | number | - | 超小屏 span |
| sm | number | - | 小屏 span |
| md | number | - | 中等屏 span |
| lg | number | - | 大屏 span |
| xl | number | - | 超大屏 span |
| xxl | number | - | 超超大屏 span |
| xsOffset | number | - | 超小屏偏移 |
| smOffset | number | - | 小屏偏移 |
| mdOffset | number | - | 中等屏偏移 |
| lgOffset | number | - | 大屏偏移 |
| xlOffset | number | - | 超大屏偏移 |
| xxlOffset | number | - | 超超大屏偏移 |
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
- `span` 总和建议为 24
- `flex` 支持 `1`、`200px`、`auto` 等格式
- 响应式断点设置 `0` 可隐藏该断点的列
## 相关组件

以下是与当前组件相关的其他组件，可能在使用时搭配使用：

| 组件 | 说明 |
|------|------|
| [Row](row) | 栅格行 |
| [Grid](grid) | 栅格系统 |
