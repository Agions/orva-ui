# List 列表

**Related Components:** [Card](./card), [Table](./table)


List 组件用于展示结构化数据列表。支持头像、描述、操作区、加载状态等。

## 引入

```tsx live-codeblock
import { List } from 'orva-ui';
// 或按需导入
import { List } from 'orva-ui/display';
```

## 基本使用

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

## 使用示例

### 基础列表

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

### 带头像

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
            description="这是描述信息"
          />
        </List.Item>
      )}
    />
  );
};
```

### 带操作区

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
            <Button size="sm" icon={<Icon name="mdi:delete" />} color="#ef4444">删除</Button>,
          ]}
        >
          {item.title}
        </List.Item>
      )}
    />
  );
};
```

### 带分隔线

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

### 加载状态

```tsx live-codeblock
import React, { useEffect, useState } from 'react';
import { List, Spin } from 'orva-ui';

export default () => {
  const [loading, setLoading] = useState(true);
  const [dataSource, setDataSource] = useState([]);
  
  useEffect(() => {
    // 模拟数据加载
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

### 空状态

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

### 带分页

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

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| dataSource | any[] | - | 数据源 |
| renderItem | `(item: any) => ReactNode` | - | 渲染函数 |
| loading | boolean | `false` | 是否加载 |
| bordered | boolean | `false` | 是否显示边框 |
| emptyText | ReactNode | - | 空状态内容 |
| className | string | - | 自定义类名 |
| style | CSSProperties | - | 自定义样式 |

### List.Item

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| actions | ReactNode[] | - | 操作按钮列表 |
| className | string | - | 自定义类名 |
| style | CSSProperties | - | 自定义样式 |

### List.Item.Meta

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| avatar | ReactNode | - | 头像 |
| title | ReactNode | - | 标题 |
| description | ReactNode | - | 描述 |

## 注意事项

- 请确保在 `ThemeProvider` 包裹下使用组件以获得完整的主题支持
- `renderItem` 必须返回 `List.Item` 组件
- `dataSource` 支持动态更新
## 相关组件

以下是与当前组件相关的其他组件，可能在使用时搭配使用：

| 组件 | 说明 |
|------|------|
| [Card](card) | 卡片容器 |
| [Table](table) | 数据表格 |
