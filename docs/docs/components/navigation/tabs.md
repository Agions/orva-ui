# Tabs 标签页

**Related Components:** [Menu](./menu), [Pagination](./pagination)


Tabs 组件用于在多个内容面板之间切换。支持水平、垂直、可关闭、自定义标题等。

## 引入

```tsx live-codeblock
import { Tabs } from 'orva-ui';
// 或按需导入
import { Tabs } from 'orva-ui/navigation';
```

## 基本使用

```tsx live-codeblock
import React, { useState } from 'react';
import { Tabs } from 'orva-ui';

export default () => {
  const items = [
    { key: '1', label: '标签 1', children: <div>内容 1</div> },
    { key: '2', label: '标签 2', children: <div>内容 2</div> },
    { key: '3', label: '标签 3', children: <div>内容 3</div> },
  ];
  
  return <Tabs items={items} />;
};
```

## 使用示例

### 基础标签页

```tsx live-codeblock
import React, { useState } from 'react';
import { Tabs } from 'orva-ui';

export default () => {
  const items = [
    { key: '1', label: '标签 1', children: <div>这是标签 1 的内容</div> },
    { key: '2', label: '标签 2', children: <div>这是标签 2 的内容</div> },
    { key: '3', label: '标签 3', children: <div>这是标签 3 的内容</div> },
  ];
  
  return <Tabs items={items} />;
};
```

### 可关闭标签

```tsx live-codeblock
import React, { useState } from 'react';
import { Tabs } from 'orva-ui';

export default () => {
  const [items, setItems] = useState([
    { key: '1', label: '标签 1', children: <div>这是标签 1 的内容</div> },
    { key: '2', label: '标签 2', children: <div>这是标签 2 的内容</div> },
    { key: '3', label: '标签 3', children: <div>这是标签 3 的内容</div> },
  ]);
  
  const handleRemove = (key: string) => {
    setItems(items.filter(item => item.key !== key));
  };
  
  return <Tabs items={items} type="card" onRemove={handleRemove} />;
};
```

### 可添加标签

```tsx live-codeblock
import React, { useState } from 'react';
import { Tabs, Button } from 'orva-ui';

export default () => {
  const [items, setItems] = useState([
    { key: '1', label: '标签 1', children: <div>这是标签 1 的内容</div> },
    { key: '2', label: '标签 2', children: <div>这是标签 2 的内容</div> },
  ]);
  const [nextKey, setNextKey] = useState(3);
  
  const handleAdd = () => {
    const newKey = String(nextKey);
    setItems([...items, { key: newKey, label: '标签 ' + nextKey + '', children: <div>这是标签 {nextKey} 的内容</div> }]);
    setNextKey(nextKey + 1);
  };
  
  return (
    <>
      <Tabs items={items} type="card" onAdd={handleAdd} />
      <Button onClick={handleAdd} style={{ marginTop: 16 }}>添加标签</Button>
    </>
  );
};
```

### 垂直标签页

```tsx live-codeblock
import React, { useState } from 'react';
import { Tabs } from 'orva-ui';

export default () => {
  const items = [
    { key: '1', label: '标签 1', children: <div>这是标签 1 的内容</div> },
    { key: '2', label: '标签 2', children: <div>这是标签 2 的内容</div> },
    { key: '3', label: '标签 3', children: <div>这是标签 3 的内容</div> },
  ];
  
  return <Tabs items={items} direction="vertical" style={{ height: 300 }} />;
};
```

### 带图标

```tsx live-codeblock
import React, { useState } from 'react';
import { Tabs, Icon } from 'orva-ui';

export default () => {
  const items = [
    { key: '1', label: <><Icon name="mdi:home" /> 首页</>, children: <div>首页内容</div> },
    { key: '2', label: <><Icon name="mdi:account" /> 用户</>, children: <div>用户内容</div> },
    { key: '3', label: <><Icon name="mdi:settings" /> 设置</>, children: <div>设置内容</div> },
  ];
  
  return <Tabs items={items} />;
};
```

### 受控标签页

```tsx live-codeblock
import React, { useState } from 'react';
import { Tabs } from 'orva-ui';

export default () => {
  const [activeKey, setActiveKey] = useState('1');
  
  const items = [
    { key: '1', label: '标签 1', children: <div>这是标签 1 的内容</div> },
    { key: '2', label: '标签 2', children: <div>这是标签 2 的内容</div> },
    { key: '3', label: '标签 3', children: <div>这是标签 3 的内容</div> },
  ];
  
  return <Tabs activeKey={activeKey} items={items} onChange={setActiveKey} />;
};
```

### 卡片样式

```tsx live-codeblock
import React, { useState } from 'react';
import { Tabs } from 'orva-ui';

export default () => {
  const items = [
    { key: '1', label: '标签 1', children: <div>这是标签 1 的内容</div> },
    { key: '2', label: '标签 2', children: <div>这是标签 2 的内容</div> },
    { key: '3', label: '标签 3', children: <div>这是标签 3 的内容</div> },
  ];
  
  return <Tabs items={items} type="card" />;
};
```

### 下划线样式

```tsx live-codeblock
import React, { useState } from 'react';
import { Tabs } from 'orva-ui';

export default () => {
  const items = [
    { key: '1', label: '标签 1', children: <div>这是标签 1 的内容</div> },
    { key: '2', label: '标签 2', children: <div>这是标签 2 的内容</div> },
    { key: '3', label: '标签 3', children: <div>这是标签 3 的内容</div> },
  ];
  
  return <Tabs items={items} type="line" />;
};
```

### 禁用标签

```tsx live-codeblock
import React, { useState } from 'react';
import { Tabs } from 'orva-ui';

export default () => {
  const items = [
    { key: '1', label: '标签 1', children: <div>这是标签 1 的内容</div> },
    { key: '2', label: '标签 2', children: <div>这是标签 2 的内容</div>, disabled: true },
    { key: '3', label: '标签 3', children: <div>这是标签 3 的内容</div> },
  ];
  
  return <Tabs items={items} />;
};
```

### 带尺寸

```tsx live-codeblock
import React, { useState } from 'react';
import { Tabs } from 'orva-ui';

export default () => {
  const items = [
    { key: '1', label: '标签 1', children: <div>这是标签 1 的内容</div> },
    { key: '2', label: '标签 2', children: <div>这是标签 2 的内容</div> },
    { key: '3', label: '标签 3', children: <div>这是标签 3 的内容</div> },
  ];
  
  return (
    <>
      <Tabs items={items} size="sm" style={{ marginBottom: 16 }} />
      <Tabs items={items} size="md" style={{ marginBottom: 16 }} />
      <Tabs items={items} size="lg" />
    </>
  );
};
```

## Props

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| activeKey | string | - | 当前激活的标签（受控） |
| defaultActiveKey | string | - | 默认激活的标签 |
| items | TabItem[] | - | 标签列表 |
| type | `'line' \| 'card' \| 'editable-card'` | `'line'` | 样式类型 |
| direction | `'horizontal' \| 'vertical'` | `'horizontal'` | 方向 |
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | 尺寸 |
| onChange | `(key: string) => void` | - | 切换回调 |
| onAdd | `() => void` | - | 添加回调 |
| onRemove | `(key: string) => void` | - | 移除回调 |
| className | string | - | 自定义类名 |
| style | CSSProperties | - | 自定义样式 |

## TabItem

| 属性名 | 类型 | 说明 |
|--------|------|------|
| key | string | 唯一标识 |
| label | ReactNode | 标签标题 |
| children | ReactNode | 内容 |
| disabled | boolean | 是否禁用 |
| closable | boolean | 是否可关闭 |

## 注意事项

- 请确保在 `ThemeProvider` 包裹下使用组件以获得完整的主题支持
- `activeKey` 为受控值，需配合 `onChange` 使用
- `type="editable-card"` 支持添加和删除标签
## 相关组件

以下是与当前组件相关的其他组件，可能在使用时搭配使用：

| 组件 | 说明 |
|------|------|
| [Menu](menu) | 导航菜单 |
| [Pagination](pagination) | 分页导航 |
