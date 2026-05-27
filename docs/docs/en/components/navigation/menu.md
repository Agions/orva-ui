# Menu

**Related Components:** [Breadcrumb](./breadcrumb), [Tabs](./tabs)


Menu Menu component for navigation and page structure display. Supports horizontal、vertical、Multi-levelMenu、ExpandCollapse, etc.. 

## Introduction

```tsx live-codeblock
import { Menu } from 'orva-ui';
// 或按需导入
import { Menu } from 'orva-ui/navigation';
```

## Basic Usage

```tsx live-codeblock
import React, { useState } from 'react';
import { Menu } from 'orva-ui';

export default () => {
  const items = [
    { key: '1', label: '首页' },
    { key: '2', label: '关于' },
    { key: '3', label: '联系' },
  ];
  
  return <Menu items={items} />;
};
```

## Examples

### Basic Menu

```tsx live-codeblock
import React, { useState } from 'react';
import { Menu } from 'orva-ui';

export default () => {
  const items = [
    { key: '1', label: '首页' },
    { key: '2', label: '产品' },
    { key: '3', label: '服务' },
    { key: '4', label: '关于' },
  ];
  
  return <Menu items={items} />;
};
```

### Multi-levelMenu

```tsx live-codeblock
import React, { useState } from 'react';
import { Menu } from 'orva-ui';

export default () => {
  const items = [
    { key: '1', label: '首页' },
    { 
      key: '2', 
      label: '产品',
      children: [
        { key: '2-1', label: '产品 1' },
        { key: '2-2', label: '产品 2' },
        { 
          key: '2-3', 
          label: '产品 3',
          children: [
            { key: '2-3-1', label: '子产品 1' },
            { key: '2-3-2', label: '子产品 2' },
          ]
        },
      ]
    },
    { key: '3', label: '服务' },
    { key: '4', label: '关于' },
  ];
  
  return <Menu items={items} />;
};
```

### horizontalMenu

```tsx live-codeblock
import React, { useState } from 'react';
import { Menu } from 'orva-ui';

export default () => {
  const items = [
    { key: '1', label: '首页' },
    { key: '2', label: '产品' },
    { key: '3', label: '服务' },
    { key: '4', label: '关于' },
  ];
  
  return <Menu items={items} mode="horizontal" />;
};
```

### Selectedstatus

```tsx live-codeblock
import React, { useState } from 'react';
import { Menu } from 'orva-ui';

export default () => {
  const [selectedKeys, setSelectedKeys] = useState(['2']);
  
  const items = [
    { key: '1', label: '首页' },
    { key: '2', label: '产品' },
    { key: '3', label: '服务' },
    { key: '4', label: '关于' },
  ];
  
  return <Menu items={items} selectedKeys={selectedKeys} onSelect={setSelectedKeys} />;
};
```

### 带icon

```tsx live-codeblock
import React, { useState } from 'react';
import { Menu, Icon } from 'orva-ui';

export default () => {
  const items = [
    { key: '1', label: '首页', icon: 'mdi:home' },
    { key: '2', label: '产品', icon: 'mdi:cube' },
    { key: '3', label: '服务', icon: 'mdi:server' },
    { key: '4', label: '关于', icon: 'mdi:information' },
  ];
  
  return <Menu items={items} />;
};
```

### CollapseMenu

```tsx live-codeblock
import React, { useState } from 'react';
import { Menu } from 'orva-ui';

export default () => {
  const [collapsed, setCollapsed] = useState(false);
  
  const items = [
    { key: '1', label: '首页', icon: 'mdi:home' },
    { 
      key: '2', 
      label: '产品',
      icon: 'mdi:cube',
      children: [
        { key: '2-1', label: '产品 1' },
        { key: '2-2', label: '产品 2' },
      ]
    },
    { key: '3', label: '服务', icon: 'mdi:server' },
    { key: '4', label: '关于', icon: 'mdi:information' },
  ];
  
  return (
    <div style={{ display: 'flex' }}>
      <Menu items={items} collapsed={collapsed} style={{ width: collapsed ? 64 : 200 }} />
      <button onClick={() => setCollapsed(!collapsed)}>折叠</button>
    </div>
  );
};
```

### 带grouped

```tsx live-codeblock
import React, { useState } from 'react';
import { Menu } from 'orva-ui';

export default () => {
  const items = [
    { key: '1', label: '首页' },
    { type: 'group', label: '管理' },
    { key: '2', label: '用户管理' },
    { key: '3', label: '订单管理' },
    { type: 'group', label: 'Setting' },
    { key: '4', label: '系统设置' },
    { key: '5', label: '安全设置' },
  ];
  
  return <Menu items={items} />;
};
```

### disabledMenu item

```tsx live-codeblock
import React, { useState } from 'react';
import { Menu } from 'orva-ui';

export default () => {
  const items = [
    { key: '1', label: '首页' },
    { key: '2', label: '产品' },
    { key: '3', label: '服务', disabled: true },
    { key: '4', label: '关于' },
  ];
  
  return <Menu items={items} />;
};
```

### ControlledMenu

```tsx live-codeblock
import React, { useState } from 'react';
import { Menu } from 'orva-ui';

export default () => {
  const [selectedKeys, setSelectedKeys] = useState(['2']);
  const [openKeys, setOpenKeys] = useState(['2']);
  
  const items = [
    { key: '1', label: '首页' },
    { 
      key: '2', 
      label: '产品',
      children: [
        { key: '2-1', label: '产品 1' },
        { key: '2-2', label: '产品 2' },
      ]
    },
    { key: '3', label: '服务' },
    { key: '4', label: '关于' },
  ];
  
  return (
    <Menu 
      items={items} 
      selectedKeys={selectedKeys} 
      openKeys={openKeys}
      onSelect={setSelectedKeys}
      onOpenChange={setOpenKeys}
    />
  );
};
```

## Props

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| items | MenuItem[] | - | Menu itemList |
| mode | `'vertical' \| 'horizontal' \| 'inline'` | `'vertical'` | Mode |
| selectedKeys | string[] | - | Selected项（Controlled） |
| openKeys | string[] | - | Expand项（Controlled） |
| collapsed | boolean | `false` | WhetherCollapse |
| onSelect | `(keys: string[]) => void` | - | Select callback callback |
| onOpenChange | `(keys: string[]) => void` | - | ExpandChange callback |
| className | string | - | Custom class name |
| style | CSSProperties | - | Custom Style |

## MenuItem

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| key | string | Unique identifier |
| label | ReactNode | Title |
| icon | string | iconName |
| children | MenuItem[] | Sub-menu项 |
| disabled | boolean | Whetherdisabled |
| type | `'item' \| 'group'` | Type |

## Notes

- Ensure the component is wrapped in `ThemeProvider` for full theme support
- `selectedKeys` controlled value, 需Used with `onSelect` Use
- `openKeys` 控制Sub-menuExpandstatus
## Related Components

The following components are related and may be used together:

| Component | Description |
|------|------|
| [Breadcrumb](breadcrumb) | BreadcrumbNavigation |
| [Tabs](tabs) | Tab/LabelNavigation |
