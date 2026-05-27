# Layout

Layout component is used for overall page layout. Supports header, sidebar, content area, footer, and more.

## Introduction

```tsx
import { Layout } from 'orva-ui';
// Or import on-demand
import { Layout } from 'orva-ui/layout';
```

## Basic Usage

```tsx live-codeblock
import React from 'react';
import { Layout, Menu, Icon } from 'orva-ui';

const { Header, Sider, Content, Footer } = Layout;

export default () => (
  <Layout style={{ minHeight: '100vh' }}>
    <Header style={{ display: 'flex', alignItems: 'center', background: '#001529' }}>
      <Icon name="logo" style={{ fontSize: 24, color: '#fff', marginRight: 16 }} />
      <span style={{ color: '#fff', fontSize: 18 }}>Logo</span>
    </Header>
    <Layout>
      <Sider width={200} style={{ background: '#001529' }}>
        <Menu mode="inline" defaultSelectedKeys={['1']} style={{ background: '#001529' }}>
          <Menu.Item key="1" icon={<Icon name="home" />}>Home</Menu.Item>
          <Menu.Item key="2" icon={<Icon name="user" />}>User</Menu.Item>
          <Menu.Item key="3" icon={<Icon name="settings" />}>Settings</Menu.Item>
        </Menu>
      </Sider>
      <Content style={{ padding: 24, background: '#f0f2f5' }}>
        <div style={{ background: '#fff', padding: 24 }}>
          <h1>Page Content</h1>
          <p>Main content area goes here.</p>
        </div>
      </Content>
    </Layout>
    <Footer style={{ textAlign: 'center' }}>
      ©2024 Orva UI. Created by Agions.
    </Footer>
  </Layout>
);
```

### Fixed Header

```tsx live-codeblock
import React from 'react';
import { Layout, Menu } from 'orva-ui';

const { Header, Content, Footer } = Layout;

export default () => (
  <Layout style={{ minHeight: '100vh' }}>
    <Header style={{ position: 'sticky', top: 0, zIndex: 100, background: '#001529' }}>
      <Menu mode="horizontal" defaultSelectedKeys={['1']} style={{ background: '#001529', color: '#fff' }}>
        <Menu.Item key="1">Home</Menu.Item>
        <Menu.Item key="2">About</Menu.Item>
        <Menu.Item key="3">Contact</Menu.Item>
      </Menu>
    </Header>
    <Content style={{ padding: 24, background: '#f0f2f5' }}>
      <div style={{ background: '#fff', padding: 24 }}>
        <h1>Page Content</h1>
      </div>
    </Content>
    <Footer style={{ textAlign: 'center' }}>
      ©2024 Orva UI.
    </Footer>
  </Layout>
);
```

### Two Columns Layout

```tsx live-codeblock
import React from 'react';
import { Layout, Menu } from 'orva-ui';

const { Sider, Content } = Layout;

export default () => (
  <Layout style={{ minHeight: '100vh' }}>
    <Sider width={240} style={{ background: '#fff', boxShadow: '2px 0 8px rgba(0,0,0,0.1)' }}>
      <div style={{ padding: 16, textAlign: 'center', fontWeight: 'bold' }}>Sidebar</div>
      <Menu mode="inline" defaultSelectedKeys={['1']} style={{ borderRight: 0 }}>
        <Menu.Item key="1">Dashboard</Menu.Item>
        <Menu.Item key="2">Analysis</Menu.Item>
        <Menu.Item key="3">Workplace</Menu.Item>
      </Menu>
    </Sider>
    <Content style={{ padding: 24, background: '#f0f2f5' }}>
      <div style={{ background: '#fff', padding: 24 }}>
        <h1>Main Content</h1>
      </div>
    </Content>
  </Layout>
);
```

## Props

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| hasSider | boolean | - | Has sidebar |
| className | string | - | Custom class name |
| style | CSSProperties | - | Custom styles |

### Sub-components

| Component | Description |
|-----------|-------------|
| `Layout.Header` | Header section |
| `Layout.Sider` | Sidebar section |
| `Layout.Content` | Content section |
| `Layout.Footer` | Footer section |

## Related Components

The following components are related to the current component and may be used together:

| Component | Description |
|-----------|-------------|
| [Menu](../navigation/menu) | Navigation menu |
| [Grid](../layout/grid) | Grid system |
| [Space](../layout/space) | Spacing control |

## Notes

- Ensure the component is wrapped in `ThemeProvider` for full theme support
- Use `hasSider` prop when using Sider sub-component
- Layout supports responsive design
