# Table 表格

**Related Components:** [List](./list), [Pagination](./pagination)


Table 组件用于展示结构化数据。支持排序、筛选、分页、选择、固定列等功能。

## 引入

```tsx live-codeblock
import { Table } from 'orva-ui';
// 或按需导入
import { Table } from 'orva-ui/display';
```

## 基本使用

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

## 使用示例

### 基础表格

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

### 带选择框

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

### 可排序

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

### 可筛选

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

### 带分页

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

### 固定列

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

### 自定义列渲染

```tsx live-codeblock
import React, { useState } from 'react';
import { Table, Button, Tag } from 'orva-ui';

export default () => {
  const columns = [
    { title: '姓名', dataIndex: 'name', key: 'name' },
    { 
      title: '状态', 
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
          <Button size="sm">编辑</Button>
          <Button size="sm" color="#ef4444" style={{ marginLeft: 8 }}>删除</Button>
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

### 加载状态

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

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| columns | Column[] | - | 列定义 |
| dataSource | any[] | - | 数据源 |
| rowSelection | RowSelection | - | 行选择配置 |
| pagination | Pagination | - | 分页配置 |
| sortState | SortState | - | 排序状态 |
| onSortChange | `(sorter: SortState) => void` | - | 排序变化回调 |
| loading | boolean | `false` | 是否加载 |
| scroll | `\{ x?: number, y?: number \}` | - | 滚动配置 |
| className | string | - | 自定义类名 |
| style | CSSProperties | - | 自定义样式 |

## 注意事项

- 请确保在 `ThemeProvider` 包裹下使用组件以获得完整的主题支持
- `columns` 中的 `render` 函数用于自定义渲染
- `rowSelection` 支持单选和多选
## 相关组件

以下是与当前组件相关的其他组件，可能在使用时搭配使用：

| 组件 | 说明 |
|------|------|
| [List](list) | 列表展示 |
| [Pagination](pagination) | 分页导航 |
