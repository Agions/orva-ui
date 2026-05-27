# Pagination

**Related Components:** [Table](./table), [List](./list)


Pagination Pagination component for data pagination. Supports page number jump、page size selection、TotalShow, etc.. 

## Introduction

```tsx live-codeblock
import { Pagination } from 'orva-ui';
// 或按需导入
import { Pagination } from 'orva-ui/navigation';
```

## Basic Usage

```tsx live-codeblock
import React, { useState } from 'react';
import { Pagination } from 'orva-ui';

export default () => {
  const [current, setCurrent] = useState(1);
  
  return <Pagination current={current} total={100} onChange={setCurrent} />;
};
```

## Examples

### Basic Pagination

```tsx live-codeblock
import React, { useState } from 'react';
import { Pagination } from 'orva-ui';

export default () => {
  const [current, setCurrent] = useState(1);
  
  return <Pagination current={current} total={100} onChange={setCurrent} />;
};
```

### ShowTotal

```tsx live-codeblock
import React, { useState } from 'react';
import { Pagination } from 'orva-ui';

export default () => {
  const [current, setCurrent] = useState(1);
  
  return <Pagination current={current} total={100} showTotal onChange={setCurrent} />;
};
```

### page size selection

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

### Page numberJump

```tsx live-codeblock
import React, { useState } from 'react';
import { Pagination } from 'orva-ui';

export default () => {
  const [current, setCurrent] = useState(1);
  
  return <Pagination current={current} total={100} showQuickJumper onChange={setCurrent} />;
};
```

### SimplePagination

```tsx live-codeblock
import React, { useState } from 'react';
import { Pagination } from 'orva-ui';

export default () => {
  const [current, setCurrent] = useState(1);
  
  return <Pagination current={current} total={100} simple onChange={setCurrent} />;
};
```

### CustomPage numberRange

```tsx live-codeblock
import React, { useState } from 'react';
import { Pagination } from 'orva-ui';

export default () => {
  const [current, setCurrent] = useState(1);
  
  return <Pagination current={current} total={100} showMore onChange={setCurrent} />;
};
```

### disabledstatus

```tsx live-codeblock
import React, { useState } from 'react';
import { Pagination } from 'orva-ui';

export default () => {
  const [current, setCurrent] = useState(1);
  
  return <Pagination current={current} total={100} disabled onChange={setCurrent} />;
};
```

### 带sizes

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

### 结合TableUse

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

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| current | number | `1` | Current page码（Controlled） |
| defaultCurrent | number | `1` | DefaultPage number |
| total | number | `0` | Total items |
| pageSize | number | `10` | Page size |
| pageSizeOptions | number[] | - | 页sizesOption |
| showTotal | boolean | `false` | Show or hideTotal |
| showSizeChanger | boolean | `false` | Show or hidepage size selection |
| showQuickJumper | boolean | `false` | Show or hide快速Jump |
| showMore | boolean | `false` | Show or hideMorePage number |
| simple | boolean | `false` | WhetherSimpleMode |
| disabled | boolean | `false` | Whetherdisabled |
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | sizes |
| onChange | `(page: number, pageSize: number) => void` | - | Change callback |
| className | string | - | Custom class name |
| style | CSSProperties | - | Custom Style |

## Notes

- Ensure the component is wrapped in `ThemeProvider` for full theme support
- `current` controlled value, 需Used with `onChange` Use
- `total` 为 `0` 时不ShowPagination
## Related Components

The following components are related and may be used together:

| Component | Description |
|-----------|-------------|
| [Table](table) | DataTable |
| [List](list) | ListDisplay |
