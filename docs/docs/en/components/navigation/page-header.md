# PageHeader

**Related Components:** [Breadcrumb](./breadcrumb), [Tabs](./tabs)


PageHeader PageHeader component for page top area. Supports headings、description、Action区、Breadcrumb, etc.. 

## Introduction

```tsx live-codeblock
import { PageHeader } from 'orva-ui';
// 或按需导入
import { PageHeader } from 'orva-ui/navigation';
```

## Basic Usage

```tsx live-codeblock
import React from 'react';
import { PageHeader } from 'orva-ui';

export default () => {
  return <PageHeader title="页面Title" />;
};
```

## Examples

### Basic Page header

```tsx live-codeblock
import React from 'react';
import { PageHeader } from 'orva-ui';

export default () => {
  return <PageHeader title="页面Title" />;
};
```

### 带description

```tsx live-codeblock
import React from 'react';
import { PageHeader } from 'orva-ui';

export default () => {
  return (
    <PageHeader
      title="页面Title"
      description="这是页面的description信息, 用于说明页面的用途"
    />
  );
};
```

### 带Action区

```tsx live-codeblock
import React from 'react';
import { PageHeader, Button } from 'orva-ui';

export default () => {
  return (
    <PageHeader
      title="用户管理"
      description="管理所有用户信息"
      extra={
        <Button type="primary">新增用户</Button>
      }
    />
  );
};
```

### 带Breadcrumb

```tsx live-codeblock
import React from 'react';
import { PageHeader, Breadcrumb } from 'orva-ui';

export default () => {
  return (
    <PageHeader
      title="用户详情"
      breadcrumb={
        <Breadcrumb>
          <Breadcrumb.Item>首页</Breadcrumb.Item>
          <Breadcrumb.Item>用户管理</Breadcrumb.Item>
          <Breadcrumb.Item>用户详情</Breadcrumb.Item>
        </Breadcrumb>
      }
    />
  );
};
```

### 带Tag

```tsx live-codeblock
import React from 'react';
import { PageHeader, Tag } from 'orva-ui';

export default () => {
  return (
    <PageHeader
      title="项目详情"
      description="这是一个正在进行中的项目"
      tags={[
        <Tag color="#3b82f6">进行中</Tag>,
        <Tag color="#10b981">重要</Tag>,
      ]}
    />
  );
};
```

### Complete示例

```tsx live-codeblock
import React from 'react';
import { PageHeader, Breadcrumb, Button, Tag, Divider } from 'orva-ui';

export default () => {
  return (
    <>
      <PageHeader
        title="项目详情"
        description="这是一个正在进行中的项目, 包含多个模块和任务"
        breadcrumb={
          <Breadcrumb>
            <Breadcrumb.Item>首页</Breadcrumb.Item>
            <Breadcrumb.Item>项目管理</Breadcrumb.Item>
            <Breadcrumb.Item>项目详情</Breadcrumb.Item>
          </Breadcrumb>
        }
        tags={[
          <Tag color="#3b82f6">进行中</Tag>,
          <Tag color="#10b981">重要</Tag>,
        ]}
        extra={
          <>
            <Button>Edit</Button>
            <Button type="primary">操作</Button>
          </>
        }
      />
      <Divider />
      <div style={{ padding: 24 }}>
        {/* 页面Content */}
      </div>
    </>
  );
};
```

### 带BackButton

```tsx live-codeblock
import React from 'react';
import { PageHeader } from 'orva-ui';

export default () => {
  return (
    <PageHeader
      title="页面Title"
      onBack={() => console.log('Back')}
      backIcon
    />
  );
};
```

## Props

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| title | ReactNode | - | Title |
| description | ReactNode | - | description |
| breadcrumb | ReactNode | - | Breadcrumb |
| tags | ReactNode[] | - | Tab list |
| extra | ReactNode | - | RightAction区 |
| onBack | `() => void` | - | BackCallback |
| backIcon | boolean | `false` | Show or hideBackicon |
| className | string | - | Custom class name |
| style | CSSProperties | - | Custom Style |

## Notes

- Ensure the component is wrapped in `ThemeProvider` for full theme support
- `breadcrumb`、`tags`、`extra` SupportsCustomContent
- `onBack` Callback for handlingBackAction
## Related Components

The following components are related and may be used together:

| Component | Description |
|-----------|-------------|
| [Breadcrumb](breadcrumb) | BreadcrumbNavigation |
| [Tabs](tabs) | Tab/LabelNavigation |
