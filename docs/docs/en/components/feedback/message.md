# Message

**Related Components:** [Toast](./toast), [Notification](./notification)


Message Message component for displaying global messages. Supports success、warning、error、Info四种Type. 

## Introduction

```tsx live-codeblock
import { Message } from 'orva-ui';
// 或按需导入
import { Message } from 'orva-ui/feedback';
```

## Basic Usage

```tsx live-codeblock
import React, { useRef } from 'react';
import { Message, Button } from 'orva-ui';

export default () => (
  <Button onClick={() => Message.info('这是一条信息Message')}>
    Show信息
  </Button>
);
```

## Examples

### InfoMessage

```tsx live-codeblock
import React, { useRef } from 'react';
import { Message, Button } from 'orva-ui';

export default () => (
  <Button onClick={() => Message.info('这是一条信息Message')}>
    Show信息
  </Button>
);
```

### SuccessMessage

```tsx live-codeblock
import React, { useRef } from 'react';
import { Message, Button } from 'orva-ui';

export default () => (
  <Button onClick={() => Message.success('操作成功！')}>
    Show成功
  </Button>
);
```

### warningMessage

```tsx live-codeblock
import React, { useRef } from 'react';
import { Message, Button } from 'orva-ui';

export default () => (
  <Button onClick={() => Message.warning('这是一个warning')}>
    Showwarning
  </Button>
);
```

### errorMessage

```tsx live-codeblock
import React, { useRef } from 'react';
import { Message, Button } from 'orva-ui';

export default () => (
  <Button onClick={() => Message.error('操作失败！')}>
    Showerror
  </Button>
);
```

### CustomDuration

```tsx live-codeblock
import React, { useRef } from 'react';
import { Message, Button } from 'orva-ui';

export default () => (
  <Button onClick={() => Message.info('这条Message 5 秒后消失', 5000)}>
    Show 5 秒
  </Button>
);
```

### 带icon

```tsx live-codeblock
import React, { useRef } from 'react';
import { Message, Button, Icon } from 'orva-ui';

export default () => (
  <Button onClick={() => Message.info({ content: '带iconMessage', icon: <Icon name="mdi:information" /> })}>
    Show带icon
  </Button>
);
```

### SequentialShow

```tsx live-codeblock
import React, { useRef } from 'react';
import { Message, Button } from 'orva-ui';

export default () => (
  <Button onClick={() => {
    Message.info('第一条Message');
    setTimeout(() => Message.success('第二条Message'), 1000);
    setTimeout(() => Message.warning('第三条Message'), 2000);
  }}>
    连续Show
  </Button>
);
```

### 关闭Message

```tsx live-codeblock
import React, { useRef } from 'react';
import { Message, Button } from 'orva-ui';

export default () => {
  const key = useRef<string>();
  
  return (
    <>
      <Button onClick={() => {
        key.current = Message.info('这条Message可以关闭', 0);
      }}>
        Show持久Message
      </Button>
      <Button onClick={() => key.current && Message.destroy(key.current)}>
        关闭Message
      </Button>
    </>
  );
};
```

### Close all

```tsx live-codeblock
import React, { useRef } from 'react';
import { Message, Button } from 'orva-ui';

export default () => (
  <>
    <Button onClick={() => Message.info('Message 1')}>Message 1</Button>
    <Button onClick={() => Message.success('Message 2')}>Message 2</Button>
    <Button onClick={() => Message.destroy()}>全部关闭</Button>
  </>
);
```

## API

| Method | Parameter | Description |
|------|------|------|
| `Message.info` | `(content: string, duration?: number) => string` | DisplayInfoMessage |
| `Message.success` | `(content: string, duration?: number) => string` | DisplaySuccessMessage |
| `Message.warning` | `(content: string, duration?: number) => string` | DisplaywarningMessage |
| `Message.error` | `(content: string, duration?: number) => string` | DisplayerrorMessage |
| `Message.destroy` | `(key?: string) => void` | CloseMessage |

## Config项

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| duration | number | `3000` | DefaultDisplayDuration（ms） |
| top | number | `24` | DistanceTopDistance（px） |
| maxCount | number | - | MaxDisplay数量 |

## Notes

- Ensure the component is wrapped in `ThemeProvider` for full theme support
- `duration` 为 `0` 时Message不会Auto关闭
- `Message.destroy()` 可关闭所有Message
## Related Components

The following components are related and may be used together:

| Component | Description |
|------|------|
| [Toast](toast) | 轻Hint |
| [Notification](notification) | NotificationMessage |
