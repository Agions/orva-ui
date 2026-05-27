# ResponsiveGrid 响应式网格

**Related Components:** [ResponsiveContainer](./responsivecontainer), [Grid](./grid)


ResponsiveGrid 组件用于创建响应式网格布局。支持自动调整列数、间距，适配不同屏幕。

## 引入

```tsx live-codeblock
import { ResponsiveGrid } from 'orva-ui';
// 或按需导入
import { ResponsiveGrid } from 'orva-ui/layout';
```

## 基本使用

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

## 使用示例

### 基础响应式网格

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

### 自定义列数

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

### 响应式列数

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

### 自定义间距

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

### 响应式间距

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

### 卡片网格

```tsx live-codeblock
import React from 'react';
import { ResponsiveGrid, Card } from 'orva-ui';

export default () => {
  const items = Array.from({ length: 6 }, (_, i) => ({
    key: String(i),
    title: '卡片 ' + i + 1 + '',
    description: '这是卡片 ' + i + 1 + ' 的描述信息',
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

### 图片网格

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
          <img src={item.image} alt={'图片 ' + item.key + ''} style={{ width: '100%', display: 'block' }} />
        </div>
      ))}
    </ResponsiveGrid>
  );
};
```

### 固定宽度项

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

### 自动填充

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

### 商品列表

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

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| columns | number / ResponsiveColumns | `3` | 列数 |
| gap | number / ResponsiveGap | `16` | 间距 |
| itemWidth | number | - | 固定项宽度 |
| minItemWidth | number | - | 最小项宽度 |
| className | string | - | 自定义类名 |
| style | CSSProperties | - | 自定义样式 |

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
- `columns` 和 `minItemWidth` 互斥，同时设置时 `minItemWidth` 优先
- `gap` 支持数组格式 `[水平间距, 垂直间距]`
## 相关组件

以下是与当前组件相关的其他组件，可能在使用时搭配使用：

| 组件 | 说明 |
|------|------|
| [ResponsiveContainer](responsivecontainer) | 组件 |
| [Grid](grid) | 栅格系统 |
