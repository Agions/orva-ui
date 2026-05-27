# Toast

**Related Components:** [Message](./message), [Notification](./notification)


Toast Toast component for displaying lightweight notifications. Supports auto-dismiss、custom position. 

## Introduction

```tsx live-codeblock
import { Toast } from 'orva-ui';
// 或按需导入
import { Toast } from 'orva-ui/feedback';
```

## Basic Usage

```tsx live-codeblock
import React, { useRef } from 'react';
import { Toast, Button } from 'orva-ui';

export default () => (
  <Button onClick={() => Toast.show('这是一条提示')}>
    Show提示
  </Button>
);
```

## Examples

### Basic Hint

```tsx live-codeblock
import React, { useRef } from 'react';
import { Toast, Button } from 'orva-ui';

export default () => (
  <Button onClick={() => Toast.show('这是一条提示')}>
    Show提示
  </Button>
);
```

### SuccessTooltip

```tsx live-codeblock
import React, { useRef } from 'react';
import { Toast, Button } from 'orva-ui';

export default () => (
  <Button onClick={() => Toast.success('操作成功！')}>
    Show成功
  </Button>
);
```

### errorTooltip

```tsx live-codeblock
import React, { useRef } from 'react';
import { Toast, Button } from 'orva-ui';

export default () => (
  <Button onClick={() => Toast.error('操作失败！')}>
    Showerror
  </Button>
);
```

### warningTooltip

```tsx live-codeblock
import React, { useRef } from 'react';
import { Toast, Button } from 'orva-ui';

export default () => (
  <Button onClick={() => Toast.warning('这是一个warning')}>
    Showwarning
  </Button>
);
```

### LoadingTooltip

```tsx live-codeblock
import React, { useRef } from 'react';
import { Toast, Button } from 'orva-ui';

export default () => (
  <Button onClick={() => Toast.loading('Loading中...', 0)}>
    ShowLoading
  </Button>
);
```

### CustomDuration

```tsx live-codeblock
import React, { useRef } from 'react';
import { Toast, Button } from 'orva-ui';

export default () => (
  <Button onClick={() => Toast.show('这条提示 5 秒后消失', { duration: 5000 })}>
    5 秒后消失
  </Button>
);
```

### 带icon

```tsx live-codeblock
import React, { useRef } from 'react';
import { Toast, Button, Icon } from 'orva-ui';

export default () => (
  <Button onClick={() => Toast.show({ content: '带icon提示', icon: <Icon name="mdi:information" /> })}>
    Show带icon
  </Button>
);
```

### 关闭Tooltip

```tsx live-codeblock
import React, { useRef } from 'react';
import { Toast, Button } from 'orva-ui';

export default () => {
  const key = useRef<string>();
  
  return (
    <>
      <Button onClick={() => {
        key.current = Toast.show('这条提示可以手动关闭', { duration: 0 });
      }}>
        Show持久提示
      </Button>
      <Button onClick={() => key.current && Toast.hide(key.current)}>
        关闭提示
      </Button>
    </>
  );
};
```

### Close all

```tsx live-codeblock
import React, { useRef } from 'react';
import { Toast, Button } from 'orva-ui';

export default () => (
  <>
    <Button onClick={() => Toast.show('Hint 1')}>Hint 1</Button>
    <Button onClick={() => Toast.success('Hint 2')}>Hint 2</Button>
    <Button onClick={() => Toast.hide()}>全部关闭</Button>
  </>
);
```

## API

| Method | Parameter | Description |
|------|------|------|
| `Toast.show` | `(content: string, config?: ToastConfig) => string` | DisplayHint |
| `Toast.success` | `(content: string, config?: ToastConfig) => string` | DisplaySuccessHint |
| `Toast.error` | `(content: string, config?: ToastConfig) => string` | DisplayerrorHint |
| `Toast.warning` | `(content: string, config?: ToastConfig) => string` | DisplaywarningHint |
| `Toast.loading` | `(content: string, duration?: number) => string` | DisplayLoadingHint |
| `Toast.hide` | `(key?: string) => void` | CloseHint |

## ToastConfig

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| duration | number | `2000` | DisplayDuration |
| icon | ReactNode | - | icon |
| position | `'top' \| 'middle' \| 'bottom'` | `'middle'` | Position |

## Notes

- Ensure the component is wrapped in `ThemeProvider` for full theme support
- `duration` 为 `0` 时Tooltip不会Auto关闭
- `Toast.hide()` 可关闭所有Tooltip
## Related Components

The following components are related and may be used together:

| Component | Description |
|------|------|
| [Message](message) | MessageHint |
| [Notification](notification) | NotificationMessage |
