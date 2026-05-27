# List

**Related Components:** [Card](./card), [Table](./table)


List Table component for displaying structured dataColumn表. Supports avatar、description、Action区、Loadingstatus, etc.. 

## Introduction

```tsx live-codeblock
import { List } from 'orva-ui';
// 或按需导入
import { List } from 'orva-ui/display';
```

## Basic Usage

```tsx live-codeblock
import React, { useEffect, useState } from 'react';
import { List } from 'orva-ui';

export default () => {
  const dataSource = [
    { key: '1', title: '列表项 1' },
    { key: '2', title: '列表项 2' },
    { key: '3', title: '列表项 3' },
  ];
  
  return <List dataSource={dataSource} renderItem={(item) => <List.Item>{item.title}</List.Item>} />;
};
```

## Examples

### Basic List

```tsx live-codeblock
import React, { useEffect, useState } from 'react';
import { List } from 'orva-ui';

export default () => {
  const dataSource = [
    { key: '1', title: '列表项 1' },
    { key: '2', title: '列表项 2' },
    { key: '3', title: '列表项 3' },
    { key: '4', title: '列表项 4' },
    { key: '5', title: '列表项 5' },
  ];
  
  return (
    <List 
      dataSource={dataSource} 
      renderItem={(item) => (
        <List.Item>
          {item.title}
        </List.Item>
      )}
    />
  );
};
```

### 带Avatar

```tsx live-codeblock
import React, { useEffect, useState } from 'react';
import { List, Avatar } from 'orva-ui';

export default () => {
  const dataSource = [
    { key: '1', title: '张三', avatar: 'https://i.pravatar.cc/150?u=1' },
    { key: '2', title: '李四', avatar: 'https://i.pravatar.cc/150?u=2' },
    { key: '3', title: '王五', avatar: 'https://i.pravatar.cc/150?u=3' },
  ];
  
  return (
    <List 
      dataSource={dataSource} 
      renderItem={(item) => (
        <List.Item>
          <List.Item.Meta 
            avatar={<Avatar src={item.avatar} />}
            title={item.title}
            description="这是description信息"
          />
        </List.Item>
      )}
    />
  );
};
```

### 带Action区

```tsx live-codeblock
import React, { useEffect, useState } from 'react';
import { List, Button, Icon } from 'orva-ui';

export default () => {
  const dataSource = [
    { key: '1', title: '列表项 1' },
    { key: '2', title: '列表项 2' },
    { key: '3', title: '列表项 3' },
  ];
  
  return (
    <List 
      dataSource={dataSource} 
      renderItem={(item) => (
        <List.Item
          actions={[
            <Button size="sm" icon={<Icon name="mdi:eye" />}>查看</Button>,
            <Button size="sm" icon={<Icon name="mdi:delete" />} color="#ef4444">Delete</Button>,
          ]}
        >
          {item.title}
        </List.Item>
      )}
    />
  );
};
```

### 带Divider

```tsx live-codeblock
import React, { useEffect, useState } from 'react';
import { List } from 'orva-ui';

export default () => {
  const dataSource = [
    { key: '1', title: '列表项 1' },
    { key: '2', title: '列表项 2' },
    { key: '3', title: '列表项 3' },
  ];
  
  return (
    <List 
      dataSource={dataSource} 
      bordered
      renderItem={(item) => (
        <List.Item>
          {item.title}
        </List.Item>
      )}
    />
  );
};
```

### Loadingstatus

```tsx live-codeblock
import React, { useEffect, useState } from 'react';
import { List, Spin } from 'orva-ui';

export default () => {
  const [loading, setLoading] = useState(true);
  const [dataSource, setDataSource] = useState([]);
  
  useEffect(() => {
    // 模拟数据Loading
    setTimeout(() => {
      setDataSource([
        { key: '1', title: '列表项 1' },
        { key: '2', title: '列表项 2' },
        { key: '3', title: '列表项 3' },
      ]);
      setLoading(false);
    }, 1000);
  }, []);
  
  return (
    <List 
      dataSource={dataSource} 
      loading={loading}
      renderItem={(item) => (
        <List.Item>
          {item.title}
        </List.Item>
      )}
    />
  );
};
```

### 空status

```tsx live-codeblock
import React, { useEffect, useState } from 'react';
import { List, Empty } from 'orva-ui';

export default () => {
  const dataSource = [];
  
  return (
    <List 
      dataSource={dataSource} 
      emptyText={<Empty description="暂无数据" />}
      renderItem={(item) => (
        <List.Item>
          {item.title}
        </List.Item>
      )}
    />
  );
};
```

### 带Pagination

```tsx live-codeblock
import React, { useEffect, useState } from 'react';
import { List, Pagination } from 'orva-ui';

export default () => {
  const [current, setCurrent] = useState(1);
  const pageSize = 5;
  
  const allData = Array.from({ length: 20 }, (_, i) => ({
    key: String(i + 1),
    title: '列表项 ' + i + 1 + '',
  }));
  
  const dataSource = allData.slice((current - 1) * pageSize, current * pageSize);
  
  return (
    <>
      <List 
        dataSource={dataSource} 
        renderItem={(item) => (
          <List.Item>
            {item.title}
          </List.Item>
        )}
      />
      <Pagination 
        current={current} 
        total={allData.length} 
        pageSize={pageSize} 
        onChange={setCurrent} 
        style={{ marginTop: 16, textAlign: 'right' }}
      />
    </>
  );
};
```

## Props

### List

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| dataSource | any[] | - | Data source |
| renderItem | `(item: any) => ReactNode` | - | RenderFunction |
| loading | boolean | `false` | Loading state |
| bordered | boolean | `false` | Show or hideBorder |
| emptyText | ReactNode | - | 空statusContent |
| className | string | - | Custom class name |
| style | CSSProperties | - | Custom Style |

### List.Item

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| actions | ReactNode[] | - | ActionButtonList |
| className | string | - | Custom class name |
| style | CSSProperties | - | Custom Style |

### List.Item.Meta

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| avatar | ReactNode | - | Avatar |
| title | ReactNode | - | Title |
| description | ReactNode | - | description |

## Notes

- Ensure the component is wrapped in `ThemeProvider` for full theme support
- `renderItem` MustBack `List.Item` Component
- `dataSource` SupportsDynamic update
## Related Components

The following components are related and may be used together:

| Component | Description |
|-----------|-------------|
| [Card](card) | CardContainer |
| [Table](table) | DataTable |
