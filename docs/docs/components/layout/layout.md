# Layout 布局

**Related Components:** [Header](./header), [Sider](./sider), [Content](./content)


Related: [布局](layout), [栅格](grid), [菜单](menu)


Layout 组件用于页面整体布局。支持头部、侧边栏、内容区、底部等。

## 引入

```tsx live-codeblock
import { Layout } from 'orva-ui';
// 或按需导入
import { Layout } from 'orva-ui/layout';
```

## 基本使用

```tsx live-codeblock
import React, { useState } from 'react';
import { Layout } from 'orva-ui';

export default () => {
  return (
    <Layout>
      <Layout.Header>头部</Layout.Header>
      <Layout.Content>内容区</Layout.Content>
      <Layout.Footer>底部</Layout.Footer>
    </Layout>
  );
};
```

## 使用示例

### 基础布局

```tsx live-codeblock
import React, { useState } from 'react';
import { Layout } from 'orva-ui';

export default () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Layout.Header style={{ background: '#3b82f6', color: '#fff' }}>
        <h1 style={{ margin: 0 }}>Logo</h1>
      </Layout.Header>
      <Layout.Content style={{ padding: 24 }}>
        <h2>页面内容</h2>
        <p>这是主要内容区域</p>
      </Layout.Content>
      <Layout.Footer style={{ background: '#f5f5f5', textAlign: 'center' }}>
        © 2024 Orva UI. All rights reserved.
      </Layout.Footer>
    </Layout>
  );
};
```

### 带侧边栏

```tsx live-codeblock
import React, { useState } from 'react';
import { Layout, Menu, Icon } from 'orva-ui';

export default () => {
  const [selectedKeys, setSelectedKeys] = useState(['1']);
  
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Layout.Header style={{ background: '#3b82f6', color: '#fff', display: 'flex', alignItems: 'center', padding: '0 24px' }}>
        <h1 style={{ margin: 0, marginRight: 24 }}>Logo</h1>
        <Menu mode="horizontal" items={[
          { key: '1', label: '首页' },
          { key: '2', label: '产品' },
          { key: '3', label: '关于' },
        ]} selectedKeys={selectedKeys} onSelect={setSelectedKeys} />
      </Layout.Header>
      <Layout>
        <Layout.Sider width={200} style={{ background: '#fff', boxShadow: '2px 0 8px rgba(0,0,0,0.1)' }}>
          <Menu mode="vertical" items={[
            { key: '1', label: '首页', icon: 'mdi:home' },
            { key: '2', label: '产品', icon: 'mdi:cube' },
            { key: '3', label: '服务', icon: 'mdi:server' },
            { key: '4', label: '关于', icon: 'mdi:information' },
          ]} selectedKeys={selectedKeys} onSelect={setSelectedKeys} />
        </Layout.Sider>
        <Layout.Content style={{ padding: 24 }}>
          <h2>页面内容</h2>
          <p>这是主要内容区域</p>
        </Layout.Content>
      </Layout>
      <Layout.Footer style={{ background: '#f5f5f5', textAlign: 'center' }}>
        © 2024 Orva UI. All rights reserved.
      </Layout.Footer>
    </Layout>
  );
};
```

### 固定头部

```tsx live-codeblock
import React, { useState } from 'react';
import { Layout } from 'orva-ui';

export default () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Layout.Header fixed style={{ background: '#3b82f6', color: '#fff' }}>
        <h1 style={{ margin: 0 }}>固定头部</h1>
      </Layout.Header>
      <Layout.Content style={{ padding: 24, marginTop: 64 }}>
        <h2>页面内容</h2>
        <p>头部固定，内容区需要添加 marginTop</p>
      </Layout.Content>
      <Layout.Footer style={{ background: '#f5f5f5', textAlign: 'center' }}>
        © 2024 Orva UI. All rights reserved.
      </Layout.Footer>
    </Layout>
  );
};
```

### 固定侧边栏

```tsx live-codeblock
import React, { useState } from 'react';
import { Layout, Menu } from 'orva-ui';

export default () => {
  const [selectedKeys, setSelectedKeys] = useState(['1']);
  
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Layout.Header style={{ background: '#3b82f6', color: '#fff' }}>
        <h1 style={{ margin: 0 }}>Logo</h1>
      </Layout.Header>
      <Layout>
        <Layout.Sider fixed width={200} style={{ background: '#fff', boxShadow: '2px 0 8px rgba(0,0,0,0.1)' }}>
          <Menu mode="vertical" items={[
            { key: '1', label: '首页' },
            { key: '2', label: '产品' },
            { key: '3', label: '服务' },
            { key: '4', label: '关于' },
          ]} selectedKeys={selectedKeys} onSelect={setSelectedKeys} />
        </Layout.Sider>
        <Layout.Content style={{ padding: 24, marginLeft: 200 }}>
          <h2>页面内容</h2>
          <p>侧边栏固定，内容区需要添加 marginLeft</p>
        </Layout.Content>
      </Layout>
      <Layout.Footer style={{ background: '#f5f5f5', textAlign: 'center' }}>
        © 2024 Orva UI. All rights reserved.
      </Layout.Footer>
    </Layout>
  );
};
```

### 折叠侧边栏

```tsx live-codeblock
import React, { useState } from 'react';
import { Layout, Menu, Icon } from 'orva-ui';

export default () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKeys, setSelectedKeys] = useState(['1']);
  
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Layout.Header style={{ background: '#3b82f6', color: '#fff', display: 'flex', alignItems: 'center', padding: '0 16px' }}>
        <h1 style={{ margin: 0, marginRight: 24, display: !collapsed && 'none' }}>Logo</h1>
        <Icon name="mdi:menu" onClick={() => setCollapsed(!collapsed)} style={{ cursor: 'pointer' }} />
      </Layout.Header>
      <Layout>
        <Layout.Sider collapsed={collapsed} width={200} triggerWidth={64} style={{ background: '#fff', boxShadow: '2px 0 8px rgba(0,0,0,0.1)' }}>
          <Menu mode="vertical" items={[
            { key: '1', label: '首页', icon: 'mdi:home' },
            { key: '2', label: '产品', icon: 'mdi:cube' },
            { key: '3', label: '服务', icon: 'mdi:server' },
            { key: '4', label: '关于', icon: 'mdi:information' },
          ]} selectedKeys={selectedKeys} onSelect={setSelectedKeys} />
        </Layout.Sider>
        <Layout.Content style={{ padding: 24, marginLeft: collapsed ? 64 : 200 }}>
          <h2>页面内容</h2>
          <p>侧边栏可折叠</p>
        </Layout.Content>
      </Layout>
      <Layout.Footer style={{ background: '#f5f5f5', textAlign: 'center' }}>
        © 2024 Orva UI. All rights reserved.
      </Layout.Footer>
    </Layout>
  );
};
```

### 右侧侧边栏

```tsx live-codeblock
import React, { useState } from 'react';
import { Layout, Menu } from 'orva-ui';

export default () => {
  const [selectedKeys, setSelectedKeys] = useState(['1']);
  
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Layout.Header style={{ background: '#3b82f6', color: '#fff' }}>
        <h1 style={{ margin: 0 }}>Logo</h1>
      </Layout.Header>
      <Layout>
        <Layout.Content style={{ padding: 24 }}>
          <h2>页面内容</h2>
          <p>这是主要内容区域</p>
        </Layout.Content>
        <Layout.Sider width={200} placement="right" style={{ background: '#fff', boxShadow: '-2px 0 8px rgba(0,0,0,0.1)' }}>
          <Menu mode="vertical" items={[
            { key: '1', label: '首页' },
            { key: '2', label: '产品' },
            { key: '3', label: '服务' },
            { key: '4', label: '关于' },
          ]} selectedKeys={selectedKeys} onSelect={setSelectedKeys} />
        </Layout.Sider>
      </Layout>
      <Layout.Footer style={{ background: '#f5f5f5', textAlign: 'center' }}>
        © 2024 Orva UI. All rights reserved.
      </Layout.Footer>
    </Layout>
  );
};
```

### 多层布局

```tsx live-codeblock
import React, { useState } from 'react';
import { Layout, Menu } from 'orva-ui';

export default () => {
  const [selectedKeys, setSelectedKeys] = useState(['1']);
  
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Layout.Header style={{ background: '#3b82f6', color: '#fff' }}>
        <h1 style={{ margin: 0 }}>主布局</h1>
      </Layout.Header>
      <Layout>
        <Layout.Sider width={200} style={{ background: '#fff' }}>
          <Menu mode="vertical" items={[
            { key: '1', label: '一级菜单 1' },
            { key: '2', label: '一级菜单 2' },
          ]} selectedKeys={selectedKeys} onSelect={setSelectedKeys} />
        </Layout.Sider>
        <Layout>
          <Layout.Header style={{ background: '#f5f5f5' }}>
            <Menu mode="horizontal" items={[
              { key: '1-1', label: '二级菜单 1' },
              { key: '1-2', label: '二级菜单 2' },
            ]} selectedKeys={selectedKeys} onSelect={setSelectedKeys} />
          </Layout.Header>
          <Layout.Content style={{ padding: 24 }}>
            <h2>页面内容</h2>
            <p>多层嵌套布局</p>
          </Layout.Content>
        </Layout>
      </Layout>
      <Layout.Footer style={{ background: '#f5f5f5', textAlign: 'center' }}>
        © 2024 Orva UI. All rights reserved.
      </Layout.Footer>
    </Layout>
  );
};
```

## Props

### Layout

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| className | string | - | 自定义类名 |
| style | CSSProperties | - | 自定义样式 |

### Header

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| fixed | boolean | `false` | 是否固定 |
| className | string | - | 自定义类名 |
| style | CSSProperties | - | 自定义样式 |

### Sider

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| width | number | `200` | 宽度 |
| triggerWidth | number | `64` | 折叠时宽度 |
| collapsed | boolean | `false` | 是否折叠 |
| fixed | boolean | `false` | 是否固定 |
| placement | `'left' \| 'right'` | `'left'` | 位置 |
| className | string | - | 自定义类名 |
| style | CSSProperties | - | 自定义样式 |

### Content

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| className | string | - | 自定义类名 |
| style | CSSProperties | - | 自定义样式 |

### Footer

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| className | string | - | 自定义类名 |
| style | CSSProperties | - | 自定义样式 |

## 注意事项

- 请确保在 `ThemeProvider` 包裹下使用组件以获得完整的主题支持
- `fixed` 为 `true` 时需要为 Content 添加相应的偏移
- `Sider` 支持嵌套使用实现多层布局
## 相关组件

以下是与当前组件相关的其他组件，可能在使用时搭配使用：

| 组件 | 说明 |
|------|------|
| [Header](header) | 组件 |
| [Sider](sider) | 组件 |
| [Content](content) | 组件 |
