# PageHeader 页头

**Related Components:** [Breadcrumb](./breadcrumb), [Tabs](./tabs)


PageHeader 组件用于页面顶部区域。支持标题、描述、操作区、面包屑等。

## 引入

```tsx live-codeblock
import { PageHeader } from 'orva-ui';
// 或按需导入
import { PageHeader } from 'orva-ui/navigation';
```

## 基本使用

```tsx live-codeblock
import React from 'react';
import { PageHeader } from 'orva-ui';

export default () => {
  return <PageHeader title="页面标题" />;
};
```

## 使用示例

### 基础页头

```tsx live-codeblock
import React from 'react';
import { PageHeader } from 'orva-ui';

export default () => {
  return <PageHeader title="页面标题" />;
};
```

### 带描述

```tsx live-codeblock
import React from 'react';
import { PageHeader } from 'orva-ui';

export default () => {
  return (
    <PageHeader
      title="页面标题"
      description="这是页面的描述信息，用于说明页面的用途"
    />
  );
};
```

### 带操作区

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

### 带面包屑

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

### 带标签

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

### 完整示例

```tsx live-codeblock
import React from 'react';
import { PageHeader, Breadcrumb, Button, Tag, Divider } from 'orva-ui';

export default () => {
  return (
    <>
      <PageHeader
        title="项目详情"
        description="这是一个正在进行中的项目，包含多个模块和任务"
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
            <Button>编辑</Button>
            <Button type="primary">操作</Button>
          </>
        }
      />
      <Divider />
      <div style={{ padding: 24 }}>
        {/* 页面内容 */}
      </div>
    </>
  );
};
```

### 带返回按钮

```tsx live-codeblock
import React from 'react';
import { PageHeader } from 'orva-ui';

export default () => {
  return (
    <PageHeader
      title="页面标题"
      onBack={() => console.log('返回')}
      backIcon
    />
  );
};
```

## Props

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| title | ReactNode | - | 标题 |
| description | ReactNode | - | 描述 |
| breadcrumb | ReactNode | - | 面包屑 |
| tags | ReactNode[] | - | 标签列表 |
| extra | ReactNode | - | 右侧操作区 |
| onBack | `() => void` | - | 返回回调 |
| backIcon | boolean | `false` | 是否显示返回图标 |
| className | string | - | 自定义类名 |
| style | CSSProperties | - | 自定义样式 |

## 注意事项

- 请确保在 `ThemeProvider` 包裹下使用组件以获得完整的主题支持
- `breadcrumb`、`tags`、`extra` 支持自定义内容
- `onBack` 回调用于处理返回操作
## 相关组件

以下是与当前组件相关的其他组件，可能在使用时搭配使用：

| 组件 | 说明 |
|------|------|
| [Breadcrumb](breadcrumb) | 面包屑导航 |
| [Tabs](tabs) | 标签导航 |
