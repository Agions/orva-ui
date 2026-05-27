# VirtualList 虚拟列表

**Related Components:** [List](./list), [Table](./table)


VirtualList 组件用于渲染大量数据列表。支持虚拟滚动、自定义渲染、高度固定等。

## 引入

```tsx live-codeblock
import { VirtualList } from 'orva-ui';
// 或按需导入
import { VirtualList } from 'orva-ui/common';
```

## 基本使用

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

## 使用示例

### 基础虚拟列表

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

### 自定义项高度

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

### 带头像和描述

```tsx live-codeblock
import React, { useEffect, useRef, useState } from 'react';
import { VirtualList, Avatar } from 'orva-ui';

export default () => {
  const dataSource = Array.from({ length: 1000 }, (_, i) => ({
    key: String(i),
    name: '用户 ' + i + 1 + '',
    avatar: 'https://i.pravatar.cc/150?u=' + i + '',
    description: '这是用户 ' + i + 1 + ' 的描述信息',
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

### 带操作区

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
            <Button size="sm" icon={<Icon name="mdi:delete" />} color="#ef4444" style={{ marginLeft: 8 }}>删除</Button>
          </div>
        </div>
      )}
    />
  );
};
```

### 水平虚拟列表

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

### 滚动到指定项

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

### 加载更多内容

```tsx live-codeblock
import React, { useEffect, useRef, useState } from 'react';
import { VirtualList, Spin } from 'orva-ui';

export default () => {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    // 初始加载
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

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| height | number | - | 容器高度（必需） |
| width | number | - | 容器宽度（水平模式） |
| itemHeight | number / `(item) => number` | - | 项高度 |
| itemWidth | number / `(item) => number` | - | 项宽度（水平模式） |
| dataSource | any[] | - | 数据源 |
| renderItem | `(item: any) => ReactNode` | - | 渲染函数 |
| horizontal | boolean | `false` | 是否水平 |
| onReachBottom | `() => void` | - | 触底回调 |
| loading | boolean | `false` | 是否加载 |
| className | string | - | 自定义类名 |
| style | CSSProperties | - | 自定义样式 |

## 注意事项

- 请确保在 `ThemeProvider` 包裹下使用组件以获得完整的主题支持
- `height` 或 `width` 必须指定
- `itemHeight` 或 `itemWidth` 必须指定
- 使用 `ref` 可调用 `scrollToIndex` 等方法
## 相关组件

以下是与当前组件相关的其他组件，可能在使用时搭配使用：

| 组件 | 说明 |
|------|------|
| [List](list) | 列表展示 |
| [Table](table) | 数据表格 |
