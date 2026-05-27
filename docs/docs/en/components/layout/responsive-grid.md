# ResponsiveGrid

**Related Components:** [ResponsiveContainer](./responsivecontainer), [Grid](./grid)


ResponsiveGrid Component for creatingresponsive widthGrid layout. Supports auto-adjusting columns、spacing, Adapt to different screens. 

## Introduction

```tsx live-codeblock
import { ResponsiveGrid } from 'orva-ui';
// 或按需导入
import { ResponsiveGrid } from 'orva-ui/layout';
```

## Basic Usage

```tsx live-codeblock
import React from 'react';
import { ResponsiveGrid } from 'orva-ui';

export default () => {
  const items = Array.from({ length: 8 }, (_, i) => ({
    key: String(i),
    content: '项目 ' + i + 1 + '',
  }));
  
  return (
    <ResponsiveGrid>
      {items.map(item => (
        <div key={item.key} style={{ background: '#3b82f6', padding: 16, color: '#fff' }}>
          {item.content}
        </div>
      ))}
    </ResponsiveGrid>
  );
};
```

## Examples

### Basic responsive widthGrid

```tsx live-codeblock
import React from 'react';
import { ResponsiveGrid } from 'orva-ui';

export default () => {
  const items = Array.from({ length: 8 }, (_, i) => ({
    key: String(i),
    content: '项目 ' + i + 1 + '',
  }));
  
  return (
    <ResponsiveGrid>
      {items.map(item => (
        <div key={item.key} style={{ background: '#3b82f6', padding: 16, color: '#fff' }}>
          {item.content}
        </div>
      ))}
    </ResponsiveGrid>
  );
};
```

### CustomColumn数

```tsx live-codeblock
import React from 'react';
import { ResponsiveGrid } from 'orva-ui';

export default () => {
  const items = Array.from({ length: 8 }, (_, i) => ({
    key: String(i),
    content: '项目 ' + i + 1 + '',
  }));
  
  return (
    <ResponsiveGrid columns={4}>
      {items.map(item => (
        <div key={item.key} style={{ background: '#3b82f6', padding: 16, color: '#fff' }}>
          {item.content}
        </div>
      ))}
    </ResponsiveGrid>
  );
};
```

### responsive widthColumn数

```tsx live-codeblock
import React from 'react';
import { ResponsiveGrid } from 'orva-ui';

export default () => {
  const items = Array.from({ length: 8 }, (_, i) => ({
    key: String(i),
    content: '项目 ' + i + 1 + '',
  }));
  
  return (
    <ResponsiveGrid
      columns={{
        xs: 1,
        sm: 2,
        md: 3,
        lg: 4,
        xl: 5,
      }}
    >
      {items.map(item => (
        <div key={item.key} style={{ background: '#3b82f6', padding: 16, color: '#fff' }}>
          {item.content}
        </div>
      ))}
    </ResponsiveGrid>
  );
};
```

### Customspacing

```tsx live-codeblock
import React from 'react';
import { ResponsiveGrid } from 'orva-ui';

export default () => {
  const items = Array.from({ length: 8 }, (_, i) => ({
    key: String(i),
    content: '项目 ' + i + 1 + '',
  }));
  
  return (
    <ResponsiveGrid gap={16}>
      {items.map(item => (
        <div key={item.key} style={{ background: '#3b82f6', padding: 16, color: '#fff' }}>
          {item.content}
        </div>
      ))}
    </ResponsiveGrid>
  );
};
```

### responsive widthspacing

```tsx live-codeblock
import React from 'react';
import { ResponsiveGrid } from 'orva-ui';

export default () => {
  const items = Array.from({ length: 8 }, (_, i) => ({
    key: String(i),
    content: '项目 ' + i + 1 + '',
  }));
  
  return (
    <ResponsiveGrid
      gap={{
        xs: 8,
        sm: 12,
        md: 16,
        lg: 20,
        xl: 24,
      }}
    >
      {items.map(item => (
        <div key={item.key} style={{ background: '#3b82f6', padding: 16, color: '#fff' }}>
          {item.content}
        </div>
      ))}
    </ResponsiveGrid>
  );
};
```

### CardGrid

```tsx live-codeblock
import React from 'react';
import { ResponsiveGrid, Card } from 'orva-ui';

export default () => {
  const items = Array.from({ length: 6 }, (_, i) => ({
    key: String(i),
    title: 'Card ' + i + 1 + '',
    description: '这是Card ' + i + 1 + ' 的description信息',
  }));
  
  return (
    <ResponsiveGrid columns={{ xs: 1, sm: 2, md: 3 }}>
      {items.map(item => (
        <Card key={item.key} title={item.title}>
          <p>{item.description}</p>
        </Card>
      ))}
    </ResponsiveGrid>
  );
};
```

### ImageGrid

```tsx live-codeblock
import React from 'react';
import { ResponsiveGrid } from 'orva-ui';

export default () => {
  const items = Array.from({ length: 6 }, (_, i) => ({
    key: String(i),
    image: 'https://picsum.photos/400/300?random=' + i + '',
  }));
  
  return (
    <ResponsiveGrid columns={{ xs: 1, sm: 2, md: 3, lg: 4 }} gap={16}>
      {items.map(item => (
        <div key={item.key} style={{ borderRadius: 8, overflow: 'hidden' }}>
          <img src={item.image} alt={'Image ' + item.key + ''} style={{ width: '100%', display: 'block' }} />
        </div>
      ))}
    </ResponsiveGrid>
  );
};
```

### Sticky/FixedWidth项

```tsx live-codeblock
import React from 'react';
import { ResponsiveGrid } from 'orva-ui';

export default () => {
  const items = Array.from({ length: 8 }, (_, i) => ({
    key: String(i),
    content: '项目 ' + i + 1 + '',
    width: 200,
  }));
  
  return (
    <ResponsiveGrid itemWidth={200} gap={16}>
      {items.map(item => (
        <div key={item.key} style={{ background: '#3b82f6', padding: 16, color: '#fff' }}>
          {item.content}
        </div>
      ))}
    </ResponsiveGrid>
  );
};
```

### Auto填充

```tsx live-codeblock
import React from 'react';
import { ResponsiveGrid } from 'orva-ui';

export default () => {
  const items = Array.from({ length: 8 }, (_, i) => ({
    key: String(i),
    content: '项目 ' + i + 1 + '',
  }));
  
  return (
    <ResponsiveGrid minItemWidth={200} gap={16}>
      {items.map(item => (
        <div key={item.key} style={{ background: '#3b82f6', padding: 16, color: '#fff' }}>
          {item.content}
        </div>
      ))}
    </ResponsiveGrid>
  );
};
```

### 商品Column表

```tsx live-codeblock
import React from 'react';
import { ResponsiveGrid, Card, Button, Badge } from 'orva-ui';

export default () => {
  const products = Array.from({ length: 8 }, (_, i) => ({
    key: String(i),
    name: '商品 ' + i + 1 + '',
    price: (Math.random() * 1000 + 100).toFixed(2),
    image: 'https://picsum.photos/300/200?random=' + i + '',
  }));
  
  return (
    <ResponsiveGrid columns={{ xs: 1, sm: 2, md: 3, lg: 4 }} gap={16}>
      {products.map(product => (
        <Card key={product.key}>
          <img src={product.image} alt={product.name} style={{ width: '100%', height: 150, objectFit: 'cover' }} />
          <h3 style={{ margin: '12px 0 8px' }}>{product.name}</h3>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Badge color="#ef4444">¥{product.price}</Badge>
            <Button size="sm" type="primary">购买</Button>
          </div>
        </Card>
      ))}
    </ResponsiveGrid>
  );
};
```

## Props

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| columns | number / ResponsiveColumns | `3` | Column数 |
| gap | number / ResponsiveGap | `16` | spacing |
| itemWidth | number | - | Fixed项Width |
| minItemWidth | number | - | Min项Width |
| className | string | - | Custom class name |
| style | CSSProperties | - | Custom Style |

## ResponsiveColumns

```tsx live-codeblock
type ResponsiveColumns = {
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
  xxl?: number;
};
```

## ResponsiveGap

```tsx live-codeblock
type ResponsiveGap = {
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
  xxl?: number;
};
```

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
- `columns` 和 `minItemWidth` 互斥, 同时Setting时 `minItemWidth` 优先
- `gap` Supports数组Format `[horizontalspacing, verticalspacing]`
## Related Components

The following components are related and may be used together:

| Component | Description |
|-----------|-------------|
| [ResponsiveContainer](responsivecontainer) | Component |
| [Grid](grid) | Grid system |
