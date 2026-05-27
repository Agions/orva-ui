# Space

**Related Components:** [Divider](./divider), [Layout](./layout)


Space Space component for adding spacing between elements. Supports horizontal、vertical、Auto wrap, etc.. 

## Introduction

```tsx live-codeblock
import { Space } from 'orva-ui';
// 或按需导入
import { Space } from 'orva-ui/layout';
```

## Basic Usage

```tsx live-codeblock
import React from 'react';
import { Space, Button } from 'orva-ui';

export default () => {
  return (
    <Space>
      <Button>按钮 1</Button>
      <Button>按钮 2</Button>
      <Button>按钮 3</Button>
    </Space>
  );
};
```

## Examples

### Basic spacing

```tsx live-codeblock
import React from 'react';
import { Space, Button } from 'orva-ui';

export default () => {
  return (
    <Space>
      <Button>按钮 1</Button>
      <Button>按钮 2</Button>
      <Button>按钮 3</Button>
    </Space>
  );
};
```

### Customspacing

```tsx live-codeblock
import React from 'react';
import { Space, Button } from 'orva-ui';

export default () => {
  return (
    <Space size={16}>
      <Button>按钮 1</Button>
      <Button>按钮 2</Button>
      <Button>按钮 3</Button>
    </Space>
  );
};
```

### 大spacing

```tsx live-codeblock
import React from 'react';
import { Space, Button } from 'orva-ui';

export default () => {
  return (
    <Space size="large">
      <Button>按钮 1</Button>
      <Button>按钮 2</Button>
      <Button>按钮 3</Button>
    </Space>
  );
};
```

### vertical排Column

```tsx live-codeblock
import React from 'react';
import { Space, Button } from 'orva-ui';

export default () => {
  return (
    <Space direction="vertical">
      <Button style={{ width: 120 }}>按钮 1</Button>
      <Button style={{ width: 120 }}>按钮 2</Button>
      <Button style={{ width: 120 }}>按钮 3</Button>
    </Space>
  );
};
```

### Auto wrap

```tsx live-codeblock
import React from 'react';
import { Space, Tag } from 'orva-ui';

export default () => {
  const tags = Array.from({ length: 10 }, (_, i) => 'Tab/Label ' + i + 1 + '');
  
  return (
    <Space wrap>
      {tags.map(tag => (
        <Tag key={tag}>{tag}</Tag>
      ))}
    </Space>
  );
};
```

### alignmentMode

```tsx live-codeblock
import React from 'react';
import { Space, Button, Input } from 'orva-ui';

export default () => {
  return (
    <Space align="center">
      <span>Tab/Label</span>
      <Input placeholder="请Input" style={{ width: 200 }} />
      <Button type="primary">提交</Button>
    </Space>
  );
};
```

### Divider

```tsx live-codeblock
import React from 'react';
import { Space, Button, Divider } from 'orva-ui';

export default () => {
  return (
    <Space split={<Divider vertical />}>
      <Button>按钮 1</Button>
      <Button>按钮 2</Button>
      <Button>按钮 3</Button>
    </Space>
  );
};
```

### NestedUse

```tsx live-codeblock
import React from 'react';
import { Space, Button, Input } from 'orva-ui';

export default () => {
  return (
    <Space>
      <Space>
        <Input placeholder="用户名" />
        <Input placeholder="密码" type="password" />
      </Space>
      <Button type="primary">登录</Button>
    </Space>
  );
};
```

### responsive widthspacing

```tsx live-codeblock
import React from 'react';
import { Space, Button } from 'orva-ui';

export default () => {
  return (
    <Space size={[8, 16]}>
      <Button>按钮 1</Button>
      <Button>按钮 2</Button>
      <Button>按钮 3</Button>
    </Space>
  );
};
```

## Props

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| size | number / 'small' / 'medium' / 'large' / [number, number] | `'medium'` | spacingsizes |
| direction | `'horizontal' \| 'vertical'` | `'horizontal'` | 排ColumnDirection |
| align | `'start' \| 'end' \| 'center' \| 'baseline'` | - | alignmentMode |
| wrap | boolean | `false` | Whether换Row |
| split | ReactNode | - | Separate elements |
| className | string | - | Custom class name |
| style | CSSProperties | - | Custom Style |

## Notes

- Ensure the component is wrapped in `ThemeProvider` for full theme support
- `size` Supports数组Format `[horizontalspacing, verticalspacing]`
- `split` 用于在子元素之间添加Separator
## Related Components

The following components are related and may be used together:

| Component | Description |
|-----------|-------------|
| [Divider](divider) | 视觉分隔 |
| [Layout](layout) | PageLayout |
