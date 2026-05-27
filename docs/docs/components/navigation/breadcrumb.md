# Breadcrumb 面包屑

**Related Components:** [Menu](./menu), [Tabs](./tabs)


Breadcrumb 组件用于显示当前页面在站点结构中的位置。支持自定义分隔符、图标等。

## 引入

```tsx live-codeblock
import { Breadcrumb } from 'orva-ui';
// 或按需导入
import { Breadcrumb } from 'orva-ui/navigation';
```

## 基本使用

```tsx live-codeblock
import React from 'react';
import { Breadcrumb } from 'orva-ui';

export default () => {
  const items = [
    { title: '首页', href: '/' },
    { title: '分类', href: '/category' },
    { title: '当前页面' },
  ];
  
  return <Breadcrumb items={items} />;
};
```

## 使用示例

### 基础面包屑

```tsx live-codeblock
import React from 'react';
import { Breadcrumb } from 'orva-ui';

export default () => {
  const items = [
    { title: '首页', href: '/' },
    { title: '分类', href: '/category' },
    { title: '当前页面' },
  ];
  
  return <Breadcrumb items={items} />;
};
```

### 带图标

```tsx live-codeblock
import React from 'react';
import { Breadcrumb, Icon } from 'orva-ui';

export default () => {
  const items = [
    { title: '首页', href: '/', icon: 'mdi:home' },
    { title: '分类', href: '/category', icon: 'mdi:folder' },
    { title: '当前页面', icon: 'mdi:file' },
  ];
  
  return <Breadcrumb items={items} />;
};
```

### 自定义分隔符

```tsx live-codeblock
import React from 'react';
import { Breadcrumb, Icon } from 'orva-ui';

export default () => {
  const items = [
    { title: '首页', href: '/' },
    { title: '分类', href: '/category' },
    { title: '当前页面' },
  ];
  
  return <Breadcrumb items={items} separator={<Icon name="mdi:chevron-right" />} />;
};
```

### 带下拉菜单

```tsx live-codeblock
import React from 'react';
import { Breadcrumb, Dropdown, Menu } from 'orva-ui';

export default () => {
  const items = [
    { title: '首页', href: '/' },
    { 
      title: '分类',
      href: '/category',
      overlay: (
        <Menu>
          <Menu.Item key="1">分类 1</Menu.Item>
          <Menu.Item key="2">分类 2</Menu.Item>
          <Menu.Item key="3">分类 3</Menu.Item>
        </Menu>
      )
    },
    { title: '当前页面' },
  ];
  
  return <Breadcrumb items={items} />;
};
```

### 带点击事件

```tsx live-codeblock
import React from 'react';
import { Breadcrumb } from 'orva-ui';

export default () => {
  const items = [
    { title: '首页', href: '/', onClick: () => console.log('首页') },
    { title: '分类', href: '/category', onClick: () => console.log('分类') },
    { title: '当前页面' },
  ];
  
  return <Breadcrumb items={items} />;
};
```

### 带自定义渲染

```tsx live-codeblock
import React from 'react';
import { Breadcrumb, Icon, Badge } from 'orva-ui';

export default () => {
  const items = [
    { title: '首页', href: '/' },
    { title: '分类', href: '/category' },
    { 
      title: '当前页面',
      suffix: <Badge color="#ef4444">新</Badge>
    },
  ];
  
  return <Breadcrumb items={items} />;
};
```

### 响应式面包屑

```tsx live-codeblock
import React from 'react';
import { Breadcrumb, Dropdown, Menu } from 'orva-ui';

export default () => {
  const items = [
    { title: '首页', href: '/' },
    { title: '分类', href: '/category' },
    { title: '子分类 1', href: '/category/1' },
    { title: '子分类 2', href: '/category/2' },
    { title: '当前页面' },
  ];
  
  // 移动端只显示最后 3 项
  const displayItems = items.length > 3 
    ? [items[0], { title: '...', overlay: <Menu>{items.slice(1, -1).map(item => <Menu.Item key={item.title}>{item.title}</Menu.Item>)}</Menu> }, ...items.slice(-2)]
    : items;
  
  return <Breadcrumb items={displayItems} />;
};
```

## Props

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| items | BreadcrumbItem[] | - | 面包屑项列表 |
| separator | ReactNode | `'/'` | 分隔符 |
| className | string | - | 自定义类名 |
| style | CSSProperties | - | 自定义样式 |

## BreadcrumbItem

| 属性名 | 类型 | 说明 |
|--------|------|------|
| title | ReactNode | 标题 |
| href | string | 链接地址 |
| icon | string | 图标名称 |
| onClick | `(e: Event) => void` | 点击回调 |
| overlay | ReactNode | 下拉菜单内容 |
| suffix | ReactNode | 后缀内容 |

## 注意事项

- 请确保在 `ThemeProvider` 包裹下使用组件以获得完整的主题支持
- 最后一项通常不设置 `href`，表示当前页面
- `overlay` 支持下拉菜单功能
## 相关组件

以下是与当前组件相关的其他组件，可能在使用时搭配使用：

| 组件 | 说明 |
|------|------|
| [Menu](menu) | 导航菜单 |
| [Tabs](tabs) | 标签导航 |
