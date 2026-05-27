# Tabs

**Related Components:** [Menu](./menu), [Pagination](./pagination)


Tabs Tabs component for switching between multiple content panels. Supports horizontal、vertical、Closable、CustomTitle, etc.. 

## Introduction

```tsx live-codeblock
import { Tabs } from 'orva-ui';
// 或按需导入
import { Tabs } from 'orva-ui/navigation';
```

## Basic Usage

```tsx live-codeblock
import React, { useState } from 'react';
import { Tabs } from 'orva-ui';

export default () => {
  const items = [
    { key: '1', label: 'Tab/Label 1', children: <div>Content 1</div> },
    { key: '2', label: 'Tab/Label 2', children: <div>Content 2</div> },
    { key: '3', label: 'Tab/Label 3', children: <div>Content 3</div> },
  ];
  
  return <Tabs items={items} />;
};
```

## Examples

### Basic Tabs

```tsx live-codeblock
import React, { useState } from 'react';
import { Tabs } from 'orva-ui';

export default () => {
  const items = [
    { key: '1', label: 'Tab/Label 1', children: <div>这是标签 1 的Content</div> },
    { key: '2', label: 'Tab/Label 2', children: <div>这是标签 2 的Content</div> },
    { key: '3', label: 'Tab/Label 3', children: <div>这是标签 3 的Content</div> },
  ];
  
  return <Tabs items={items} />;
};
```

### 可关闭Tag

```tsx live-codeblock
import React, { useState } from 'react';
import { Tabs } from 'orva-ui';

export default () => {
  const [items, setItems] = useState([
    { key: '1', label: 'Tab/Label 1', children: <div>这是标签 1 的Content</div> },
    { key: '2', label: 'Tab/Label 2', children: <div>这是标签 2 的Content</div> },
    { key: '3', label: 'Tab/Label 3', children: <div>这是标签 3 的Content</div> },
  ]);
  
  const handleRemove = (key: string) => {
    setItems(items.filter(item => item.key !== key));
  };
  
  return <Tabs items={items} type="card" onRemove={handleRemove} />;
};
```

### AddableTag

```tsx live-codeblock
import React, { useState } from 'react';
import { Tabs, Button } from 'orva-ui';

export default () => {
  const [items, setItems] = useState([
    { key: '1', label: 'Tab/Label 1', children: <div>这是标签 1 的Content</div> },
    { key: '2', label: 'Tab/Label 2', children: <div>这是标签 2 的Content</div> },
  ]);
  const [nextKey, setNextKey] = useState(3);
  
  const handleAdd = () => {
    const newKey = String(nextKey);
    setItems([...items, { key: newKey, label: 'Tab/Label ' + nextKey + '', children: <div>这是标签 {nextKey} 的Content</div> }]);
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

### verticalTabs

```tsx live-codeblock
import React, { useState } from 'react';
import { Tabs } from 'orva-ui';

export default () => {
  const items = [
    { key: '1', label: 'Tab/Label 1', children: <div>这是标签 1 的Content</div> },
    { key: '2', label: 'Tab/Label 2', children: <div>这是标签 2 的Content</div> },
    { key: '3', label: 'Tab/Label 3', children: <div>这是标签 3 的Content</div> },
  ];
  
  return <Tabs items={items} direction="vertical" style={{ height: 300 }} />;
};
```

### 带icon

```tsx live-codeblock
import React, { useState } from 'react';
import { Tabs, Icon } from 'orva-ui';

export default () => {
  const items = [
    { key: '1', label: <><Icon name="mdi:home" /> 首页</>, children: <div>首页Content</div> },
    { key: '2', label: <><Icon name="mdi:account" /> 用户</>, children: <div>用户Content</div> },
    { key: '3', label: <><Icon name="mdi:settings" /> Setting</>, children: <div>设置Content</div> },
  ];
  
  return <Tabs items={items} />;
};
```

### ControlledTabs

```tsx live-codeblock
import React, { useState } from 'react';
import { Tabs } from 'orva-ui';

export default () => {
  const [activeKey, setActiveKey] = useState('1');
  
  const items = [
    { key: '1', label: 'Tab/Label 1', children: <div>这是标签 1 的Content</div> },
    { key: '2', label: 'Tab/Label 2', children: <div>这是标签 2 的Content</div> },
    { key: '3', label: 'Tab/Label 3', children: <div>这是标签 3 的Content</div> },
  ];
  
  return <Tabs activeKey={activeKey} items={items} onChange={setActiveKey} />;
};
```

### CardStyle

```tsx live-codeblock
import React, { useState } from 'react';
import { Tabs } from 'orva-ui';

export default () => {
  const items = [
    { key: '1', label: 'Tab/Label 1', children: <div>这是标签 1 的Content</div> },
    { key: '2', label: 'Tab/Label 2', children: <div>这是标签 2 的Content</div> },
    { key: '3', label: 'Tab/Label 3', children: <div>这是标签 3 的Content</div> },
  ];
  
  return <Tabs items={items} type="card" />;
};
```

### UnderlineStyle

```tsx live-codeblock
import React, { useState } from 'react';
import { Tabs } from 'orva-ui';

export default () => {
  const items = [
    { key: '1', label: 'Tab/Label 1', children: <div>这是标签 1 的Content</div> },
    { key: '2', label: 'Tab/Label 2', children: <div>这是标签 2 的Content</div> },
    { key: '3', label: 'Tab/Label 3', children: <div>这是标签 3 的Content</div> },
  ];
  
  return <Tabs items={items} type="line" />;
};
```

### disabledTag

```tsx live-codeblock
import React, { useState } from 'react';
import { Tabs } from 'orva-ui';

export default () => {
  const items = [
    { key: '1', label: 'Tab/Label 1', children: <div>这是标签 1 的Content</div> },
    { key: '2', label: 'Tab/Label 2', children: <div>这是标签 2 的Content</div>, disabled: true },
    { key: '3', label: 'Tab/Label 3', children: <div>这是标签 3 的Content</div> },
  ];
  
  return <Tabs items={items} />;
};
```

### 带sizes

```tsx live-codeblock
import React, { useState } from 'react';
import { Tabs } from 'orva-ui';

export default () => {
  const items = [
    { key: '1', label: 'Tab/Label 1', children: <div>这是标签 1 的Content</div> },
    { key: '2', label: 'Tab/Label 2', children: <div>这是标签 2 的Content</div> },
    { key: '3', label: 'Tab/Label 3', children: <div>这是标签 3 的Content</div> },
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

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| activeKey | string | - | CurrentActive的Tab/Label（Controlled） |
| defaultActiveKey | string | - | DefaultActive的Tab/Label |
| items | TabItem[] | - | Tab list |
| type | `'line' \| 'card' \| 'editable-card'` | `'line'` | StyleType |
| direction | `'horizontal' \| 'vertical'` | `'horizontal'` | Direction |
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | sizes |
| onChange | `(key: string) => void` | - | 切换Callback |
| onAdd | `() => void` | - | 添加Callback |
| onRemove | `(key: string) => void` | - | 移除Callback |
| className | string | - | Custom class name |
| style | CSSProperties | - | Custom Style |

## TabItem

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| key | string | Unique identifier |
| label | ReactNode | Tab/LabelTitle |
| children | ReactNode | Content |
| disabled | boolean | Whetherdisabled |
| closable | boolean | WhetherClosable |

## Notes

- Ensure the component is wrapped in `ThemeProvider` for full theme support
- `activeKey` controlled value, 需Used with `onChange` Use
- `type="editable-card"` Supports添加和删除Tag
## Related Components

The following components are related and may be used together:

| Component | Description |
|------|------|
| [Menu](menu) | NavigationMenu |
| [Pagination](pagination) | PaginationNavigation |
