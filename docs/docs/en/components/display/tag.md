# Tag

**Related Components:** [Badge](./badge), [Tag.Group](./tag.group)


Tag Tag component for tags、status、category display. SupportsMultiplecolors、sizes、Closable, etc.. 

## Introduction

```tsx live-codeblock
import { Tag } from 'orva-ui';
// 或按需导入
import { Tag } from 'orva-ui/display';
```

## Basic Usage

```tsx live-codeblock
import React, { useState } from 'react';
import { Tag } from 'orva-ui';

export default () => <Tag>Tab/Label</Tag>;
```

## Examples

### Basic Tab/Label

```tsx live-codeblock
import React, { useState } from 'react';
import { Tag } from 'orva-ui';

export default () => (
  <>
    <Tag>默认标签</Tag>
    <Tag type="primary">主要标签</Tag>
    <Tag type="success">成功标签</Tag>
    <Tag type="warning">warning标签</Tag>
    <Tag type="danger">危险标签</Tag>
  </>
);
```

### sizes

```tsx live-codeblock
import React, { useState } from 'react';
import { Tag } from 'orva-ui';

export default () => (
  <>
    <Tag size="sm">小标签</Tag>
    <Tag size="md">中标签</Tag>
    <Tag size="lg">大标签</Tag>
  </>
);
```

### 可关闭Tag

```tsx live-codeblock
import React, { useState } from 'react';
import { Tag } from 'orva-ui';

export default () => {
  const [visible, setVisible] = useState(true);
  
  if (!visible) return null;
  
  return (
    <Tag closable onClose={() => setVisible(false)}>
      可关闭标签
    </Tag>
  );
};
```

### 带icon

```tsx live-codeblock
import React, { useState } from 'react';
import { Tag, Icon } from 'orva-ui';

export default () => (
  <>
    <Tag icon={<Icon name="mdi:star" />}>收藏</Tag>
    <Tag icon={<Icon name="mdi:check-circle" />} type="success">完成</Tag>
    <Tag icon={<Icon name="mdi:alert" />} type="warning">注意</Tag>
  </>
);
```

### Border radiusTag

```tsx live-codeblock
import React, { useState } from 'react';
import { Tag } from 'orva-ui';

export default () => (
  <>
    <Tag round>Border radius标签</Tag>
    <Tag round type="primary">主要Border radius</Tag>
    <Tag round type="success">成功Border radius</Tag>
  </>
);
```

### 组合Use

```tsx live-codeblock
import React, { useState } from 'react';
import { Tag, Card } from 'orva-ui';

export default () => (
  <Card>
    <Card.Header>
      <Tag type="primary">React</Tag>
      <Tag type="success">TypeScript</Tag>
      <Tag type="warning">Vite</Tag>
    </Card.Header>
    <Card.Body>
      这是一个Use多种标签的Card. 
    </Card.Body>
  </Card>
);
```

## Props

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| children | ReactNode | - | Tab/LabelContent |
| type | `'primary' \| 'success' \| 'warning' \| 'danger' \| 'default'` | `'default'` | Tab/LabelType |
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | Tab/Labelsizes |
| closable | boolean | `false` | WhetherClosable |
| icon | ReactNode | - | Lefticon |
| round | boolean | `false` | Whetherborder radius |
| onClose | `(e: Event) => void` | - | Close callback |
| className | string | - | Custom class name |
| style | CSSProperties | - | Custom Style |

## Theme customization

Via `createTheme` 或 `ThemeProvider` Custom主题变量, Can adjust componentcolors、Font、spacing, etc.Style. 

```tsx live-codeblock
import { createTheme, ThemeProvider } from 'orva-ui';

const theme = createTheme({
  tag: {
    borderRadius: '4px',
    padding: '2px 8px',
    fontSize: '12px',
  },
});
```

## Notes

- Ensure the component is wrapped in `ThemeProvider` for full theme support
- `closable` 为 `true` 时Show关闭Button
- SupportsNested在其他Component中Use
## Related Components

The following components are related and may be used together:

| Component | Description |
|-----------|-------------|
| [Badge](badge) | statusBadge |
| [Tag.Group](tag.group) | Component |
