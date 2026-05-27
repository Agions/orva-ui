# Notification

**Related Components:** [Message](./message), [Toast](./toast)


Notification Notification component for displaying global notifications. Supports multiple types、custom position、Duration, etc.. 

## Introduction

```tsx live-codeblock
import { Notification } from 'orva-ui';
// 或按需导入
import { Notification } from 'orva-ui/feedback';
```

## Basic Usage

```tsx live-codeblock
import React, { useRef } from 'react';
import { Notification, Button } from 'orva-ui';

export default () => (
  <Button onClick={() => Notification.info({ title: 'Notification', description: '这是一条NotificationMessage' })}>
    ShowNotification
  </Button>
);
```

## Examples

### InfoNotification

```tsx live-codeblock
import React, { useRef } from 'react';
import { Notification, Button } from 'orva-ui';

export default () => (
  <Button onClick={() => Notification.info({ title: 'Info', description: '这是一条信息Notification' })}>
    Show信息
  </Button>
);
```

### SuccessNotification

```tsx live-codeblock
import React, { useRef } from 'react';
import { Notification, Button } from 'orva-ui';

export default () => (
  <Button onClick={() => Notification.success({ title: 'Success', description: '操作成功！' })}>
    Show成功
  </Button>
);
```

### warningNotification

```tsx live-codeblock
import React, { useRef } from 'react';
import { Notification, Button } from 'orva-ui';

export default () => (
  <Button onClick={() => Notification.warning({ title: 'warning', description: '这是一个warningNotification' })}>
    Showwarning
  </Button>
);
```

### errorNotification

```tsx live-codeblock
import React, { useRef } from 'react';
import { Notification, Button } from 'orva-ui';

export default () => (
  <Button onClick={() => Notification.error({ title: 'error', description: '操作失败！' })}>
    Showerror
  </Button>
);
```

### custom position

```tsx live-codeblock
import React, { useRef } from 'react';
import { Notification, Button } from 'orva-ui';

export default () => (
  <>
    <Button onClick={() => Notification.info({ title: '顶部右侧', description: 'NotificationMessage', placement: 'topRight' })}>
      顶部右侧
    </Button>
    <Button onClick={() => Notification.info({ title: '顶部左侧', description: 'NotificationMessage', placement: 'topLeft' })}>
      顶部左侧
    </Button>
    <Button onClick={() => Notification.info({ title: '底部右侧', description: 'NotificationMessage', placement: 'bottomRight' })}>
      底部右侧
    </Button>
    <Button onClick={() => Notification.info({ title: '底部左侧', description: 'NotificationMessage', placement: 'bottomLeft' })}>
      底部左侧
    </Button>
  </>
);
```

### CustomDuration

```tsx live-codeblock
import React, { useRef } from 'react';
import { Notification, Button } from 'orva-ui';

export default () => (
  <Button onClick={() => Notification.info({ title: '5 秒后关闭', description: 'NotificationMessage', duration: 5000 })}>
    5 秒后关闭
  </Button>
);
```

### 带icon

```tsx live-codeblock
import React, { useRef } from 'react';
import { Notification, Button, Icon } from 'orva-ui';

export default () => (
  <Button onClick={() => Notification.info({ 
    title: '带iconNotification', 
    description: 'NotificationMessage',
    icon: <Icon name="mdi:information" size={24} />
  })}>
    Show带icon
  </Button>
);
```

### Closable

```tsx live-codeblock
import React, { useRef } from 'react';
import { Notification, Button } from 'orva-ui';

export default () => (
  <Button onClick={() => Notification.info({ title: '可关闭Notification', description: 'NotificationMessage', closable: true })}>
    Show可关闭
  </Button>
);
```

### 带Button

```tsx live-codeblock
import React, { useRef } from 'react';
import { Notification, Button } from 'orva-ui';

export default () => {
  const key = useRef<string>();
  
  return (
    <Button onClick={() => {
      key.current = Notification.info({ 
        title: '带按钮Notification', 
        description: '需要确认的操作',
        btn: <Button size="sm" onClick={() => Notification.destroy(key.current)}>Confirm</Button>
      });
    }}>
      Show带按钮
    </Button>
  );
};
```

### Close all

```tsx live-codeblock
import React, { useRef } from 'react';
import { Notification, Button } from 'orva-ui';

export default () => (
  <>
    <Button onClick={() => Notification.info({ title: 'Notification 1', description: 'Message 1' })}>Notification 1</Button>
    <Button onClick={() => Notification.success({ title: 'Notification 2', description: 'Message 2' })}>Notification 2</Button>
    <Button onClick={() => Notification.destroy()}>全部关闭</Button>
  </>
);
```

## API

| Method | Parameter | Description |
|-----------|-------------|
| `Notification.info` | `(config: NotificationConfig) => string` | DisplayInfoNotification |
| `Notification.success` | `(config: NotificationConfig) => string` | DisplaySuccessNotification |
| `Notification.warning` | `(config: NotificationConfig) => string` | DisplaywarningNotification |
| `Notification.error` | `(config: NotificationConfig) => string` | DisplayerrorNotification |
| `Notification.destroy` | `(key?: string) => void` | CloseNotification |

## NotificationConfig

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| title | ReactNode | - | Title |
| description | ReactNode | - | description |
| placement | `'topRight' \| 'topLeft' \| 'bottomRight' \| 'bottomLeft'` | `'topRight'` | Position |
| duration | number | `3000` | DisplayDuration |
| closable | boolean | `true` | WhetherClosable |
| icon | ReactNode | - | icon |
| btn | ReactNode | - | Button |
| onClick | `() => void` | - | Click callback |
| onClose | `() => void` | - | Close callback |

## Notes

- Ensure the component is wrapped in `ThemeProvider` for full theme support
- `duration` 为 `0` 时Notification不会Auto关闭
- `Notification.destroy()` 可关闭所有Notification
## Related Components

The following components are related and may be used together:

| Component | Description |
|-----------|-------------|
| [Message](message) | MessageHint |
| [Toast](toast) | 轻Hint |
