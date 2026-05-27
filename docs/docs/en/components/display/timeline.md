# Timeline

**Related Components:** [Steps](./steps), [Calendar](./calendar)


Timeline Timeline component for displaying timelines. Supportsvertical、horizontal、带icon、colors, etc.. 

## Introduction

```tsx live-codeblock
import { Timeline } from 'orva-ui';
// 或按需导入
import { Timeline } from 'orva-ui/display';
```

## Basic Usage

```tsx live-codeblock
import React from 'react';
import { Timeline } from 'orva-ui';

export default () => {
  const items = [
    { content: 'Event 1' },
    { content: 'Event 2' },
    { content: 'Event 3' },
  ];
  
  return <Timeline items={items} />;
};
```

## Examples

### Basic Timeline

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

### 带Time

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

### 带icon

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

### Customcolors

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

### statusNode

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

### CustomNode

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

### horizontalTimeline

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

### 带description

```tsx live-codeblock
import React from 'react';
import { Timeline } from 'orva-ui';

export default () => {
  const items = [
    { 
      content: '创建项目',
      description: '项目Initial化, 搭建Basic 架构'
    },
    { 
      content: '完成设计',
      description: 'UI/UX 设计完成, Via评审'
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

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| items | TimelineItem[] | - | TimeItemsList |
| mode | `'left' \| 'right' \| 'alternate'` | `'left'` | LayoutMode |
| className | string | - | Custom class name |
| style | CSSProperties | - | Custom Style |

## TimelineItem

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| content | ReactNode | Content |
| time | ReactNode | Time |
| description | ReactNode | description |
| color | string | Nodecolors |
| icon | string | iconName |
| status | `'success' \| 'processing' \| 'pending' \| 'error'` | status |
| dot | ReactNode | CustomNode |

## Notes

- Ensure the component is wrapped in `ThemeProvider` for full theme support
- `items` SupportsDynamic update
- `mode="alternate"` 可实现Left/Right交替Layout
## Related Components

The following components are related and may be used together:

| Component | Description |
|-----------|-------------|
| [Steps](steps) | StepsNavigation |
| [Calendar](calendar) | Calendar view |
