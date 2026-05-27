# VirtualList

**Related Components:** [List](./list), [Table](./table)


VirtualList VirtualList component for rendering large data lists. Supports virtual scrolling、custom rendering、heightSticky/Fixed, etc.. 

## Introduction

```tsx live-codeblock
import { VirtualList } from 'orva-ui';
// 或按需导入
import { VirtualList } from 'orva-ui/common';
```

## Basic Usage

```tsx live-codeblock
import React, { useEffect, useRef, useState } from 'react';
import { VirtualList } from 'orva-ui';

export default () => {
  const dataSource = Array.from({ length: 1000 }, (_, i) => ({
    key: String(i),
    title: '列表项 ' + i + 1 + '',
  }));
  
  return (
    <VirtualList
      height={400}
      itemHeight={50}
      dataSource={dataSource}
      renderItem={(item) => <div style={{ height: 50, borderBottom: '1px solid #eee' }}>{item.title}</div>}
    />
  );
};
```

## Examples

### Basic VirtualColumn表

```tsx live-codeblock
import React, { useEffect, useRef, useState } from 'react';
import { VirtualList } from 'orva-ui';

export default () => {
  const dataSource = Array.from({ length: 10000 }, (_, i) => ({
    key: String(i),
    title: '列表项 ' + i + 1 + '',
  }));
  
  return (
    <VirtualList
      height={400}
      itemHeight={50}
      dataSource={dataSource}
      renderItem={(item) => (
        <div style={{ height: 50, borderBottom: '1px solid #eee', display: 'flex', alignItems: 'center' }}>
          {item.title}
        </div>
      )}
    />
  );
};
```

### Custom项height

```tsx live-codeblock
import React, { useEffect, useRef, useState } from 'react';
import { VirtualList } from 'orva-ui';

export default () => {
  const dataSource = Array.from({ length: 1000 }, (_, i) => ({
    key: String(i),
    title: '列表项 ' + i + 1 + '',
    height: i % 2 === 0 ? 80 : 50,
  }));
  
  return (
    <VirtualList
      height={400}
      itemHeight={(item) => item.height}
      dataSource={dataSource}
      renderItem={(item) => (
        <div style={{ height: item.height, borderBottom: '1px solid #eee', display: 'flex', alignItems: 'center' }}>
          {item.title}
        </div>
      )}
    />
  );
};
```

### 带Avatar和description

```tsx live-codeblock
import React, { useEffect, useRef, useState } from 'react';
import { VirtualList, Avatar } from 'orva-ui';

export default () => {
  const dataSource = Array.from({ length: 1000 }, (_, i) => ({
    key: String(i),
    name: '用户 ' + i + 1 + '',
    avatar: 'https://i.pravatar.cc/150?u=' + i + '',
    description: '这是用户 ' + i + 1 + ' 的description信息',
  }));
  
  return (
    <VirtualList
      height={400}
      itemHeight={70}
      dataSource={dataSource}
      renderItem={(item) => (
        <div style={{ height: 70, borderBottom: '1px solid #eee', display: 'flex', alignItems: 'center', padding: '0 16px' }}>
          <Avatar src={item.avatar} style={{ marginRight: 12 }} />
          <div>
            <div style={{ fontWeight: 500 }}>{item.name}</div>
            <div style={{ fontSize: 12, color: '#999' }}>{item.description}</div>
          </div>
        </div>
      )}
    />
  );
};
```

### 带Action区

```tsx live-codeblock
import React, { useEffect, useRef, useState } from 'react';
import { VirtualList, Button, Icon } from 'orva-ui';

export default () => {
  const dataSource = Array.from({ length: 1000 }, (_, i) => ({
    key: String(i),
    title: '列表项 ' + i + 1 + '',
  }));
  
  return (
    <VirtualList
      height={400}
      itemHeight={60}
      dataSource={dataSource}
      renderItem={(item) => (
        <div style={{ height: 60, borderBottom: '1px solid #eee', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 16px' }}>
          <span>{item.title}</span>
          <div>
            <Button size="sm" icon={<Icon name="mdi:eye" />}>查看</Button>
            <Button size="sm" icon={<Icon name="mdi:delete" />} color="#ef4444" style={{ marginLeft: 8 }}>Delete</Button>
          </div>
        </div>
      )}
    />
  );
};
```

### horizontalVirtualColumn表

```tsx live-codeblock
import React, { useEffect, useRef, useState } from 'react';
import { VirtualList } from 'orva-ui';

export default () => {
  const dataSource = Array.from({ length: 100 }, (_, i) => ({
    key: String(i),
    title: '项目 ' + i + 1 + '',
  }));
  
  return (
    <VirtualList
      width={800}
      itemWidth={200}
      dataSource={dataSource}
      horizontal
      renderItem={(item) => (
        <div style={{ width: 200, height: 100, border: '1px solid #eee', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {item.title}
        </div>
      )}
    />
  );
};
```

### Scroll to item

```tsx live-codeblock
import React, { useEffect, useRef, useState } from 'react';
import { VirtualList, Button } from 'orva-ui';

export default () => {
  const listRef = useRef(null);
  
  const dataSource = Array.from({ length: 1000 }, (_, i) => ({
    key: String(i),
    title: '列表项 ' + i + 1 + '',
  }));
  
  return (
    <>
      <Button onClick={() => listRef.current?.scrollToIndex(500)}>滚动到第 500 项</Button>
      <VirtualList
        ref={listRef}
        height={400}
        itemHeight={50}
        dataSource={dataSource}
        renderItem={(item) => <div style={{ height: 50, borderBottom: '1px solid #eee' }}>{item.title}</div>}
      />
    </>
  );
};
```

### LoadingMoreContent

```tsx live-codeblock
import React, { useEffect, useRef, useState } from 'react';
import { VirtualList, Spin } from 'orva-ui';

export default () => {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    // InitialLoading
    loadMore(100);
  }, []);
  
  const loadMore = (count: number) => {
    setLoading(true);
    setTimeout(() => {
      const newData = Array.from({ length: count }, (_, i) => ({
        key: String(dataSource.length + i),
        title: '列表项 ' + dataSource.length + i + 1 + '',
      }));
      setDataSource([...dataSource, ...newData]);
      setLoading(false);
    }, 500);
  };
  
  return (
    <VirtualList
      height={400}
      itemHeight={50}
      dataSource={dataSource}
      onReachBottom={() => loadMore(50)}
      loading={loading}
      renderItem={(item) => <div style={{ height: 50, borderBottom: '1px solid #eee' }}>{item.title}</div>}
    />
  );
};
```

## Props

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| height | number | - | Containerheight（Required） |
| width | number | - | ContainerWidth（horizontalMode） |
| itemHeight | number / `(item) => number` | - | 项height |
| itemWidth | number / `(item) => number` | - | 项Width（horizontalMode） |
| dataSource | any[] | - | Data source |
| renderItem | `(item: any) => ReactNode` | - | RenderFunction |
| horizontal | boolean | `false` | Whetherhorizontal |
| onReachBottom | `() => void` | - | 触底Callback |
| loading | boolean | `false` | Loading state |
| className | string | - | Custom class name |
| style | CSSProperties | - | Custom Style |

## Notes

- Ensure the component is wrapped in `ThemeProvider` for full theme support
- `height` 或 `width` Must指定
- `itemHeight` 或 `itemWidth` Must指定
- Use `ref` 可调用 `scrollToIndex` , etc.Method
## Related Components

The following components are related and may be used together:

| Component | Description |
|-----------|-------------|
| [List](list) | ListDisplay |
| [Table](table) | DataTable |
