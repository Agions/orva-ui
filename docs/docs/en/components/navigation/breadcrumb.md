# Breadcrumb

**Related Components:** [Menu](./menu), [Tabs](./tabs)


Breadcrumb Breadcrumb component for showing current page location in site structure. Supports custom separators、icon, etc.. 

## Introduction

```tsx live-codeblock
import { Breadcrumb } from 'orva-ui';
// 或按需导入
import { Breadcrumb } from 'orva-ui/navigation';
```

## Basic Usage

```tsx live-codeblock
import React from 'react';
import { Breadcrumb } from 'orva-ui';

export default () => {
  const items = [
    { title: '首页', href: '/' },
    { title: '分类', href: '/category' },
    { title: 'Current page面' },
  ];
  
  return <Breadcrumb items={items} />;
};
```

## Examples

### Basic Breadcrumb

```tsx live-codeblock
import React from 'react';
import { Breadcrumb } from 'orva-ui';

export default () => {
  const items = [
    { title: '首页', href: '/' },
    { title: '分类', href: '/category' },
    { title: 'Current page面' },
  ];
  
  return <Breadcrumb items={items} />;
};
```

### 带icon

```tsx live-codeblock
import React from 'react';
import { Breadcrumb, Icon } from 'orva-ui';

export default () => {
  const items = [
    { title: '首页', href: '/', icon: 'mdi:home' },
    { title: '分类', href: '/category', icon: 'mdi:folder' },
    { title: 'Current page面', icon: 'mdi:file' },
  ];
  
  return <Breadcrumb items={items} />;
};
```

### CustomSeparator

```tsx live-codeblock
import React from 'react';
import { Breadcrumb, Icon } from 'orva-ui';

export default () => {
  const items = [
    { title: '首页', href: '/' },
    { title: '分类', href: '/category' },
    { title: 'Current page面' },
  ];
  
  return <Breadcrumb items={items} separator={<Icon name="mdi:chevron-right" />} />;
};
```

### 带Dropdown menu

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
    { title: 'Current page面' },
  ];
  
  return <Breadcrumb items={items} />;
};
```

### With click event

```tsx live-codeblock
import React from 'react';
import { Breadcrumb } from 'orva-ui';

export default () => {
  const items = [
    { title: '首页', href: '/', onClick: () => console.log('首页') },
    { title: '分类', href: '/category', onClick: () => console.log('分类') },
    { title: 'Current page面' },
  ];
  
  return <Breadcrumb items={items} />;
};
```

### 带custom rendering

```tsx live-codeblock
import React from 'react';
import { Breadcrumb, Icon, Badge } from 'orva-ui';

export default () => {
  const items = [
    { title: '首页', href: '/' },
    { title: '分类', href: '/category' },
    { 
      title: 'Current page面',
      suffix: <Badge color="#ef4444">新</Badge>
    },
  ];
  
  return <Breadcrumb items={items} />;
};
```

### responsive widthBreadcrumb

```tsx live-codeblock
import React from 'react';
import { Breadcrumb, Dropdown, Menu } from 'orva-ui';

export default () => {
  const items = [
    { title: '首页', href: '/' },
    { title: '分类', href: '/category' },
    { title: '子分类 1', href: '/category/1' },
    { title: '子分类 2', href: '/category/2' },
    { title: 'Current page面' },
  ];
  
  // 移动端只Show最后 3 项
  const displayItems = items.length > 3 
    ? [items[0], { title: '...', overlay: <Menu>{items.slice(1, -1).map(item => <Menu.Item key={item.title}>{item.title}</Menu.Item>)}</Menu> }, ...items.slice(-2)]
    : items;
  
  return <Breadcrumb items={displayItems} />;
};
```

## Props

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| items | BreadcrumbItem[] | - | Breadcrumb项List |
| separator | ReactNode | `'/'` | Separator |
| className | string | - | Custom class name |
| style | CSSProperties | - | Custom Style |

## BreadcrumbItem

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| title | ReactNode | Title |
| href | string | Link URL |
| icon | string | iconName |
| onClick | `(e: Event) => void` | Click callback |
| overlay | ReactNode | Dropdown menuContent |
| suffix | ReactNode | Suffix content |

## Notes

- Ensure the component is wrapped in `ThemeProvider` for full theme support
- Last item usually notSetting `href`, IndicateCurrent page面
- `overlay` SupportsDropdown menuFeature
## Related Components

The following components are related and may be used together:

| Component | Description |
|-----------|-------------|
| [Menu](menu) | NavigationMenu |
| [Tabs](tabs) | Tab/LabelNavigation |
