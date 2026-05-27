# Timeline 时间轴

**Related Components:** [Steps](./steps), [Calendar](./calendar)


Timeline 组件用于展示时间线。支持垂直、水平、带图标、颜色等。

## 引入

```tsx live-codeblock
import { Timeline } from 'orva-ui';
// 或按需导入
import { Timeline } from 'orva-ui/display';
```

## 基本使用

```tsx live-codeblock
import React from 'react';
import { Timeline } from 'orva-ui';

export default () => {
  const items = [
    { content: '事件 1' },
    { content: '事件 2' },
    { content: '事件 3' },
  ];
  
  return <Timeline items={items} />;
};
```

## 使用示例

### 基础时间轴

```tsx live-codeblock
import React from 'react';
import { Timeline } from 'orva-ui';

export default () => {
  const items = [
    { content: '2024-01-01 创建项目' },
    { content: '2024-02-01 完成设计' },
    { content: '2024-03-01 开始开发' },
    { content: '2024-04-01 项目上线' },
  ];
  
  return <Timeline items={items} />;
};
```

### 带时间

```tsx live-codeblock
import React from 'react';
import { Timeline } from 'orva-ui';

export default () => {
  const items = [
    { content: '创建项目', time: '2024-01-01 10:00' },
    { content: '完成设计', time: '2024-02-01 14:30' },
    { content: '开始开发', time: '2024-03-01 09:00' },
    { content: '项目上线', time: '2024-04-01 18:00' },
  ];
  
  return <Timeline items={items} />;
};
```

### 带图标

```tsx live-codeblock
import React from 'react';
import { Timeline, Icon } from 'orva-ui';

export default () => {
  const items = [
    { content: '创建项目', icon: 'mdi:file-document' },
    { content: '完成设计', icon: 'mdi:palette' },
    { content: '开始开发', icon: 'mdi:code-tags' },
    { content: '项目上线', icon: 'mdi:rocket-launch' },
  ];
  
  return <Timeline items={items} />;
};
```

### 自定义颜色

```tsx live-codeblock
import React from 'react';
import { Timeline } from 'orva-ui';

export default () => {
  const items = [
    { content: '创建项目', color: '#3b82f6' },
    { content: '完成设计', color: '#10b981' },
    { content: '开始开发', color: '#f59e0b' },
    { content: '项目上线', color: '#ef4444' },
  ];
  
  return <Timeline items={items} />;
};
```

### 状态节点

```tsx live-codeblock
import React from 'react';
import { Timeline } from 'orva-ui';

export default () => {
  const items = [
    { content: '已完成', status: 'success' },
    { content: '进行中', status: 'processing' },
    { content: '待开始', status: 'pending' },
  ];
  
  return <Timeline items={items} />;
};
```

### 自定义节点

```tsx live-codeblock
import React from 'react';
import { Timeline, Icon, Badge } from 'orva-ui';

export default () => {
  const items = [
    { 
      content: '创建项目',
      dot: <Badge color="#3b82f6">1</Badge>
    },
    { 
      content: '完成设计',
      dot: <Badge color="#10b981">2</Badge>
    },
    { 
      content: '开始开发',
      dot: <Badge color="#f59e0b">3</Badge>
    },
  ];
  
  return <Timeline items={items} />;
};
```

### 水平时间轴

```tsx live-codeblock
import React from 'react';
import { Timeline } from 'orva-ui';

export default () => {
  const items = [
    { content: '2024-01' },
    { content: '2024-02' },
    { content: '2024-03' },
    { content: '2024-04' },
  ];
  
  return <Timeline items={items} mode="alternate" />;
};
```

### 带描述

```tsx live-codeblock
import React from 'react';
import { Timeline } from 'orva-ui';

export default () => {
  const items = [
    { 
      content: '创建项目',
      description: '项目初始化，搭建基础架构'
    },
    { 
      content: '完成设计',
      description: 'UI/UX 设计完成，通过评审'
    },
    { 
      content: '开始开发',
      description: '前端和后端开发同步进行'
    },
    { 
      content: '项目上线',
      description: '成功部署到生产环境'
    },
  ];
  
  return <Timeline items={items} />;
};
```

## Props

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| items | TimelineItem[] | - | 时间轴项列表 |
| mode | `'left' \| 'right' \| 'alternate'` | `'left'` | 布局模式 |
| className | string | - | 自定义类名 |
| style | CSSProperties | - | 自定义样式 |

## TimelineItem

| 属性名 | 类型 | 说明 |
|--------|------|------|
| content | ReactNode | 内容 |
| time | ReactNode | 时间 |
| description | ReactNode | 描述 |
| color | string | 节点颜色 |
| icon | string | 图标名称 |
| status | `'success' \| 'processing' \| 'pending' \| 'error'` | 状态 |
| dot | ReactNode | 自定义节点 |

## 注意事项

- 请确保在 `ThemeProvider` 包裹下使用组件以获得完整的主题支持
- `items` 支持动态更新
- `mode="alternate"` 可实现左右交替布局
## 相关组件

以下是与当前组件相关的其他组件，可能在使用时搭配使用：

| 组件 | 说明 |
|------|------|
| [Steps](steps) | 步骤导航 |
| [Calendar](calendar) | 日历视图 |
