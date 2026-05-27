# Pagination 分页

**Related Components:** [Table](./table), [List](./list)


Pagination 组件用于数据分页。支持页码跳转、页大小选择、总数显示等。

## 引入

```tsx live-codeblock
import { Pagination } from 'orva-ui';
// 或按需导入
import { Pagination } from 'orva-ui/navigation';
```

## 基本使用

```tsx live-codeblock
import React, { useState } from 'react';
import { Pagination } from 'orva-ui';

export default () => {
  const [current, setCurrent] = useState(1);
  
  return <Pagination current={current} total={100} onChange={setCurrent} />;
};
```

## 使用示例

### 基础分页

```tsx live-codeblock
import React, { useState } from 'react';
import { Pagination } from 'orva-ui';

export default () => {
  const [current, setCurrent] = useState(1);
  
  return <Pagination current={current} total={100} onChange={setCurrent} />;
};
```

### 显示总数

```tsx live-codeblock
import React, { useState } from 'react';
import { Pagination } from 'orva-ui';

export default () => {
  const [current, setCurrent] = useState(1);
  
  return <Pagination current={current} total={100} showTotal onChange={setCurrent} />;
};
```

### 页大小选择

```tsx live-codeblock
import React, { useState } from 'react';
import { Pagination } from 'orva-ui';

export default () => {
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  
  return (
    <Pagination 
      current={current} 
      total={100} 
      pageSize={pageSize}
      pageSizeOptions={[10, 20, 50, 100]}
      showSizeChanger
      onChange={(page, size) => {
        setCurrent(page);
        setPageSize(size);
      }}
    />
  );
};
```

### 页码跳转

```tsx live-codeblock
import React, { useState } from 'react';
import { Pagination } from 'orva-ui';

export default () => {
  const [current, setCurrent] = useState(1);
  
  return <Pagination current={current} total={100} showQuickJumper onChange={setCurrent} />;
};
```

### 简单分页

```tsx live-codeblock
import React, { useState } from 'react';
import { Pagination } from 'orva-ui';

export default () => {
  const [current, setCurrent] = useState(1);
  
  return <Pagination current={current} total={100} simple onChange={setCurrent} />;
};
```

### 自定义页码范围

```tsx live-codeblock
import React, { useState } from 'react';
import { Pagination } from 'orva-ui';

export default () => {
  const [current, setCurrent] = useState(1);
  
  return <Pagination current={current} total={100} showMore onChange={setCurrent} />;
};
```

### 禁用状态

```tsx live-codeblock
import React, { useState } from 'react';
import { Pagination } from 'orva-ui';

export default () => {
  const [current, setCurrent] = useState(1);
  
  return <Pagination current={current} total={100} disabled onChange={setCurrent} />;
};
```

### 带尺寸

```tsx live-codeblock
import React, { useState } from 'react';
import { Pagination } from 'orva-ui';

export default () => {
  const [current1, setCurrent1] = useState(1);
  const [current2, setCurrent2] = useState(1);
  const [current3, setCurrent3] = useState(1);
  
  return (
    <>
      <Pagination current={current1} total={100} size="sm" onChange={setCurrent1} style={{ marginBottom: 16 }} />
      <Pagination current={current2} total={100} size="md" onChange={setCurrent2} style={{ marginBottom: 16 }} />
      <Pagination current={current3} total={100} size="lg" onChange={setCurrent3} />
    </>
  );
};
```

### 结合表格使用

```tsx live-codeblock
import React, { useState } from 'react';
import { Pagination, Table } from 'orva-ui';

export default () => {
  const [current, setCurrent] = useState(1);
  const pageSize = 10;
  
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
    (current - 1) * pageSize,
    current * pageSize
  );
  
  return (
    <>
      <Table columns={columns} dataSource={dataSource} />
      <Pagination 
        current={current} 
        total={allData.length} 
        pageSize={pageSize}
        showTotal
        onChange={setCurrent} 
        style={{ marginTop: 16, textAlign: 'right' }}
      />
    </>
  );
};
```

## Props

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| current | number | `1` | 当前页码（受控） |
| defaultCurrent | number | `1` | 默认页码 |
| total | number | `0` | 总条数 |
| pageSize | number | `10` | 每页条数 |
| pageSizeOptions | number[] | - | 页大小选项 |
| showTotal | boolean | `false` | 是否显示总数 |
| showSizeChanger | boolean | `false` | 是否显示页大小选择 |
| showQuickJumper | boolean | `false` | 是否显示快速跳转 |
| showMore | boolean | `false` | 是否显示更多页码 |
| simple | boolean | `false` | 是否简单模式 |
| disabled | boolean | `false` | 是否禁用 |
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | 尺寸 |
| onChange | `(page: number, pageSize: number) => void` | - | 变化回调 |
| className | string | - | 自定义类名 |
| style | CSSProperties | - | 自定义样式 |

## 注意事项

- 请确保在 `ThemeProvider` 包裹下使用组件以获得完整的主题支持
- `current` 为受控值，需配合 `onChange` 使用
- `total` 为 `0` 时不显示分页
## 相关组件

以下是与当前组件相关的其他组件，可能在使用时搭配使用：

| 组件 | 说明 |
|------|------|
| [Table](table) | 数据表格 |
| [List](list) | 列表展示 |
