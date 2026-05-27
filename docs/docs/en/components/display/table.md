# Table

**Related Components:** [List](./list), [Pagination](./pagination)


Table Table component for displaying structured data. Supportssorting、filtering、Pagination、Selection、Sticky/FixedColumn, etc.Feature. 

## Introduction

```tsx live-codeblock
import { Table } from 'orva-ui';
// 或按需导入
import { Table } from 'orva-ui/display';
```

## Basic Usage

```tsx live-codeblock
import React, { useState } from 'react';
import { Table } from 'orva-ui';

export default () => {
  const columns = [
    { title: '姓名', dataIndex: 'name', key: 'name' },
    { title: '年龄', dataIndex: 'age', key: 'age' },
    { title: '地址', dataIndex: 'address', key: 'address' },
  ];
  
  const dataSource = [
    { key: '1', name: '张三', age: 32, address: '上海市浦东新区' },
    { key: '2', name: '李四', age: 42, address: '北京市朝阳区' },
    { key: '3', name: '王五', age: 32, address: '广州市天河区' },
  ];
  
  return <Table columns={columns} dataSource={dataSource} />;
};
```

## Examples

### Basic Table

```tsx live-codeblock
import React, { useState } from 'react';
import { Table } from 'orva-ui';

export default () => {
  const columns = [
    { title: '姓名', dataIndex: 'name', key: 'name' },
    { title: '年龄', dataIndex: 'age', key: 'age' },
    { title: '地址', dataIndex: 'address', key: 'address' },
  ];
  
  const dataSource = [
    { key: '1', name: '张三', age: 32, address: '上海市浦东新区' },
    { key: '2', name: '李四', age: 42, address: '北京市朝阳区' },
    { key: '3', name: '王五', age: 32, address: '广州市天河区' },
    { key: '4', name: '赵六', age: 28, address: '深圳市南山区' },
  ];
  
  return <Table columns={columns} dataSource={dataSource} />;
};
```

### 带Selection框

```tsx live-codeblock
import React, { useState } from 'react';
import { Table, Button } from 'orva-ui';

export default () => {
  const [selectedKeys, setSelectedKeys] = useState([]);
  
  const columns = [
    { title: '姓名', dataIndex: 'name', key: 'name' },
    { title: '年龄', dataIndex: 'age', key: 'age' },
    { title: '地址', dataIndex: 'address', key: 'address' },
  ];
  
  const dataSource = [
    { key: '1', name: '张三', age: 32, address: '上海市浦东新区' },
    { key: '2', name: '李四', age: 42, address: '北京市朝阳区' },
    { key: '3', name: '王五', age: 32, address: '广州市天河区' },
  ];
  
  return (
    <>
      <Table 
        columns={columns} 
        dataSource={dataSource} 
        rowSelection={{
          selectedRowKeys: selectedKeys,
          onChange: setSelectedKeys,
        }}
      />
      <div style={{ marginTop: 16 }}>
        已选择: {selectedKeys.join(', ')}
      </div>
    </>
  );
};
```

### 可sorting

```tsx live-codeblock
import React, { useState } from 'react';
import { Table } from 'orva-ui';

export default () => {
  const [sorter, setSorter] = useState({});
  
  const columns = [
    { title: '姓名', dataIndex: 'name', key: 'name', sorter: true },
    { title: '年龄', dataIndex: 'age', key: 'age', sorter: true },
    { title: '地址', dataIndex: 'address', key: 'address' },
  ];
  
  const dataSource = [
    { key: '1', name: '张三', age: 32, address: '上海市浦东新区' },
    { key: '2', name: '李四', age: 42, address: '北京市朝阳区' },
    { key: '3', name: '王五', age: 32, address: '广州市天河区' },
  ];
  
  return (
    <Table 
      columns={columns} 
      dataSource={dataSource} 
      sortState={sorter}
      onSortChange={setSorter}
    />
  );
};
```

### 可filtering

```tsx live-codeblock
import React, { useState } from 'react';
import { Table } from 'orva-ui';

export default () => {
  const columns = [
    { 
      title: '姓名', 
      dataIndex: 'name', 
      key: 'name',
      filters: [
        { text: '张三', value: '张三' },
        { text: '李四', value: '李四' },
      ],
      onFilter: (value, record) => record.name === value,
    },
    { title: '年龄', dataIndex: 'age', key: 'age' },
    { title: '地址', dataIndex: 'address', key: 'address' },
  ];
  
  const dataSource = [
    { key: '1', name: '张三', age: 32, address: '上海市浦东新区' },
    { key: '2', name: '李四', age: 42, address: '北京市朝阳区' },
    { key: '3', name: '王五', age: 32, address: '广州市天河区' },
  ];
  
  return <Table columns={columns} dataSource={dataSource} />;
};
```

### 带Pagination

```tsx live-codeblock
import React, { useState } from 'react';
import { Table } from 'orva-ui';

export default () => {
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });
  
  const columns = [
    { title: '姓名', dataIndex: 'name', key: 'name' },
    { title: '年龄', dataIndex: 'age', key: 'age' },
    { title: '地址', dataIndex: 'address', key: 'address' },
  ];
  
  const allData = Array.from({ length: 50 }, (_, i) => ({
    key: String(i),
    name: '用户' + i + 1 + '',
    age: 20 + (i % 30),
    address: '地址' + i + 1 + '',
  }));
  
  const dataSource = allData.slice(
    (pagination.current - 1) * pagination.pageSize,
    pagination.current * pagination.pageSize
  );
  
  return (
    <Table 
      columns={columns} 
      dataSource={dataSource} 
      pagination={{
        current: pagination.current,
        pageSize: pagination.pageSize,
        total: allData.length,
        onChange: (page, pageSize) => setPagination({ current: page, pageSize }),
      }}
    />
  );
};
```

### Sticky/FixedColumn

```tsx live-codeblock
import React, { useState } from 'react';
import { Table } from 'orva-ui';

export default () => {
  const columns = [
    { title: '姓名', dataIndex: 'name', key: 'name', fixed: 'left' },
    { title: '年龄', dataIndex: 'age', key: 'age' },
    { title: '地址', dataIndex: 'address', key: 'address' },
    { title: '城市', dataIndex: 'city', key: 'city' },
    { title: '省份', dataIndex: 'province', key: 'province' },
    { title: '国家', dataIndex: 'country', key: 'country', fixed: 'right' },
  ];
  
  const dataSource = [
    { key: '1', name: '张三', age: 32, address: '浦东新区', city: '上海', province: '上海', country: '中国' },
    { key: '2', name: '李四', age: 42, address: '朝阳区', city: '北京', province: '北京', country: '中国' },
  ];
  
  return <Table columns={columns} dataSource={dataSource} scroll={{ x: 800 }} />;
};
```

### CustomColumnRender

```tsx live-codeblock
import React, { useState } from 'react';
import { Table, Button, Tag } from 'orva-ui';

export default () => {
  const columns = [
    { title: '姓名', dataIndex: 'name', key: 'name' },
    { 
      title: 'status', 
      dataIndex: 'status', 
      key: 'status',
      render: (status: string) => (
        <Tag color={status === 'active' ? '#10b981' : '#f59e0b'}>
          {status === 'active' ? '活跃' : '停用'}
        </Tag>
      ),
    },
    { 
      title: '操作', 
      key: 'actions',
      render: (_, record) => (
        <>
          <Button size="sm">Edit</Button>
          <Button size="sm" color="#ef4444" style={{ marginLeft: 8 }}>Delete</Button>
        </>
      ),
    },
  ];
  
  const dataSource = [
    { key: '1', name: '张三', status: 'active' },
    { key: '2', name: '李四', status: 'inactive' },
  ];
  
  return <Table columns={columns} dataSource={dataSource} />;
};
```

### Loadingstatus

```tsx live-codeblock
import React, { useState } from 'react';
import { Table } from 'orva-ui';

export default () => {
  const [loading, setLoading] = useState(true);
  
  const columns = [
    { title: '姓名', dataIndex: 'name', key: 'name' },
    { title: '年龄', dataIndex: 'age', key: 'age' },
    { title: '地址', dataIndex: 'address', key: 'address' },
  ];
  
  const dataSource = [
    { key: '1', name: '张三', age: 32, address: '上海市浦东新区' },
    { key: '2', name: '李四', age: 42, address: '北京市朝阳区' },
  ];
  
  return <Table columns={columns} dataSource={dataSource} loading={loading} />;
};
```

## Props

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| columns | Column[] | - | Column definitions |
| dataSource | any[] | - | Data source |
| rowSelection | RowSelection | - | Row selection config |
| pagination | Pagination | - | Pagination config |
| sortState | SortState | - | sortingstatus |
| onSortChange | `(sorter: SortState) => void` | - | sortingChange callback |
| loading | boolean | `false` | Loading state |
| scroll | `\{ x?: number, y?: number \}` | - | Scroll config |
| className | string | - | Custom class name |
| style | CSSProperties | - | Custom Style |

## Notes

- Ensure the component is wrapped in `ThemeProvider` for full theme support
- `columns` In `render` Function forcustom rendering
- `rowSelection` Supports single selection和multiple selection
## Related Components

The following components are related and may be used together:

| Component | Description |
|------|------|
| [List](list) | ListDisplay |
| [Pagination](pagination) | PaginationNavigation |
