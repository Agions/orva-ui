# Notification 通知

**Related Components:** [Message](./message), [Toast](./toast)


Notification 组件用于显示全局通知消息。支持多种类型、自定义位置、时长等。

## 引入

```tsx live-codeblock
import { Notification } from 'orva-ui';
// 或按需导入
import { Notification } from 'orva-ui/feedback';
```

## 基本使用

```tsx live-codeblock
import React, { useRef } from 'react';
import { Notification, Button } from 'orva-ui';

export default () => (
  <Button onClick={() => Notification.info({ title: '通知', description: '这是一条通知消息' })}>
    显示通知
  </Button>
);
```

## 使用示例

### 信息通知

```tsx live-codeblock
import React, { useRef } from 'react';
import { Notification, Button } from 'orva-ui';

export default () => (
  <Button onClick={() => Notification.info({ title: '信息', description: '这是一条信息通知' })}>
    显示信息
  </Button>
);
```

### 成功通知

```tsx live-codeblock
import React, { useRef } from 'react';
import { Notification, Button } from 'orva-ui';

export default () => (
  <Button onClick={() => Notification.success({ title: '成功', description: '操作成功！' })}>
    显示成功
  </Button>
);
```

### 警告通知

```tsx live-codeblock
import React, { useRef } from 'react';
import { Notification, Button } from 'orva-ui';

export default () => (
  <Button onClick={() => Notification.warning({ title: '警告', description: '这是一个警告通知' })}>
    显示警告
  </Button>
);
```

### 错误通知

```tsx live-codeblock
import React, { useRef } from 'react';
import { Notification, Button } from 'orva-ui';

export default () => (
  <Button onClick={() => Notification.error({ title: '错误', description: '操作失败！' })}>
    显示错误
  </Button>
);
```

### 自定义位置

```tsx live-codeblock
import React, { useRef } from 'react';
import { Notification, Button } from 'orva-ui';

export default () => (
  <>
    <Button onClick={() => Notification.info({ title: '顶部右侧', description: '通知消息', placement: 'topRight' })}>
      顶部右侧
    </Button>
    <Button onClick={() => Notification.info({ title: '顶部左侧', description: '通知消息', placement: 'topLeft' })}>
      顶部左侧
    </Button>
    <Button onClick={() => Notification.info({ title: '底部右侧', description: '通知消息', placement: 'bottomRight' })}>
      底部右侧
    </Button>
    <Button onClick={() => Notification.info({ title: '底部左侧', description: '通知消息', placement: 'bottomLeft' })}>
      底部左侧
    </Button>
  </>
);
```

### 自定义时长

```tsx live-codeblock
import React, { useRef } from 'react';
import { Notification, Button } from 'orva-ui';

export default () => (
  <Button onClick={() => Notification.info({ title: '5 秒后关闭', description: '通知消息', duration: 5000 })}>
    5 秒后关闭
  </Button>
);
```

### 带图标

```tsx live-codeblock
import React, { useRef } from 'react';
import { Notification, Button, Icon } from 'orva-ui';

export default () => (
  <Button onClick={() => Notification.info({ 
    title: '带图标通知', 
    description: '通知消息',
    icon: <Icon name="mdi:information" size={24} />
  })}>
    显示带图标
  </Button>
);
```

### 可关闭

```tsx live-codeblock
import React, { useRef } from 'react';
import { Notification, Button } from 'orva-ui';

export default () => (
  <Button onClick={() => Notification.info({ title: '可关闭通知', description: '通知消息', closable: true })}>
    显示可关闭
  </Button>
);
```

### 带按钮

```tsx live-codeblock
import React, { useRef } from 'react';
import { Notification, Button } from 'orva-ui';

export default () => {
  const key = useRef<string>();
  
  return (
    <Button onClick={() => {
      key.current = Notification.info({ 
        title: '带按钮通知', 
        description: '需要确认的操作',
        btn: <Button size="sm" onClick={() => Notification.destroy(key.current)}>确认</Button>
      });
    }}>
      显示带按钮
    </Button>
  );
};
```

### 全部关闭

```tsx live-codeblock
import React, { useRef } from 'react';
import { Notification, Button } from 'orva-ui';

export default () => (
  <>
    <Button onClick={() => Notification.info({ title: '通知 1', description: '消息 1' })}>通知 1</Button>
    <Button onClick={() => Notification.success({ title: '通知 2', description: '消息 2' })}>通知 2</Button>
    <Button onClick={() => Notification.destroy()}>全部关闭</Button>
  </>
);
```

## API

| 方法 | 参数 | 说明 |
|------|------|------|
| `Notification.info` | `(config: NotificationConfig) => string` | 显示信息通知 |
| `Notification.success` | `(config: NotificationConfig) => string` | 显示成功通知 |
| `Notification.warning` | `(config: NotificationConfig) => string` | 显示警告通知 |
| `Notification.error` | `(config: NotificationConfig) => string` | 显示错误通知 |
| `Notification.destroy` | `(key?: string) => void` | 关闭通知 |

## NotificationConfig

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| title | ReactNode | - | 标题 |
| description | ReactNode | - | 描述 |
| placement | `'topRight' \| 'topLeft' \| 'bottomRight' \| 'bottomLeft'` | `'topRight'` | 位置 |
| duration | number | `3000` | 显示时长 |
| closable | boolean | `true` | 是否可关闭 |
| icon | ReactNode | - | 图标 |
| btn | ReactNode | - | 按钮 |
| onClick | `() => void` | - | 点击回调 |
| onClose | `() => void` | - | 关闭回调 |

## 注意事项

- 请确保在 `ThemeProvider` 包裹下使用组件以获得完整的主题支持
- `duration` 为 `0` 时通知不会自动关闭
- `Notification.destroy()` 可关闭所有通知
## 相关组件

以下是与当前组件相关的其他组件，可能在使用时搭配使用：

| 组件 | 说明 |
|------|------|
| [Message](message) | 消息提示 |
| [Toast](toast) | 轻提示 |
