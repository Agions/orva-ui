# Menu 菜单

**Related Components:** [Breadcrumb](./breadcrumb), [Tabs](./tabs)


Menu 组件用于导航和页面结构展示。支持水平、垂直、多级菜单、展开收起等。

## 引入

```tsx live-codeblock
import { Menu } from 'orva-ui';
// 或按需导入
import { Menu } from 'orva-ui/navigation';
```

## 基本使用

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

## 使用示例

### 基础菜单

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

### 多级菜单

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

### 水平菜单

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

### 选中状态

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

### 带图标

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

### 折叠菜单

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

### 带分组

```tsx live-codeblock
import React, { useState } from 'react';
import { Menu } from 'orva-ui';

export default () => {
  const items = [
    { key: '1', label: '首页' },
    { type: 'group', label: '管理' },
    { key: '2', label: '用户管理' },
    { key: '3', label: '订单管理' },
    { type: 'group', label: '设置' },
    { key: '4', label: '系统设置' },
    { key: '5', label: '安全设置' },
  ];
  
  return <Menu items={items} />;
};
```

### 禁用菜单项

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

### 受控菜单

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

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| items | MenuItem[] | - | 菜单项列表 |
| mode | `'vertical' \| 'horizontal' \| 'inline'` | `'vertical'` | 模式 |
| selectedKeys | string[] | - | 选中项（受控） |
| openKeys | string[] | - | 展开项（受控） |
| collapsed | boolean | `false` | 是否折叠 |
| onSelect | `(keys: string[]) => void` | - | 选择回调 |
| onOpenChange | `(keys: string[]) => void` | - | 展开变化回调 |
| className | string | - | 自定义类名 |
| style | CSSProperties | - | 自定义样式 |

## MenuItem

| 属性名 | 类型 | 说明 |
|--------|------|------|
| key | string | 唯一标识 |
| label | ReactNode | 标题 |
| icon | string | 图标名称 |
| children | MenuItem[] | 子菜单项 |
| disabled | boolean | 是否禁用 |
| type | `'item' \| 'group'` | 类型 |

## 注意事项

- 请确保在 `ThemeProvider` 包裹下使用组件以获得完整的主题支持
- `selectedKeys` 为受控值，需配合 `onSelect` 使用
- `openKeys` 控制子菜单展开状态
## 相关组件

以下是与当前组件相关的其他组件，可能在使用时搭配使用：

| 组件 | 说明 |
|------|------|
| [Breadcrumb](breadcrumb) | 面包屑导航 |
| [Tabs](tabs) | 标签导航 |
