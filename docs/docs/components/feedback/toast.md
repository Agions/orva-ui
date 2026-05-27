# Toast 轻提示

**Related Components:** [Message](./message), [Notification](./notification)


Toast 组件用于显示轻量级提示消息。支持自动消失、自定义位置等。

## 引入

```tsx live-codeblock
import { Toast } from 'orva-ui';
// 或按需导入
import { Toast } from 'orva-ui/feedback';
```

## 基本使用

```tsx live-codeblock
import React, { useRef } from 'react';
import { Toast, Button } from 'orva-ui';

export default () => (
  <Button onClick={() => Toast.show('这是一条提示')}>
    显示提示
  </Button>
);
```

## 使用示例

### 基础提示

```tsx live-codeblock
import React, { useRef } from 'react';
import { Toast, Button } from 'orva-ui';

export default () => (
  <Button onClick={() => Toast.show('这是一条提示')}>
    显示提示
  </Button>
);
```

### 成功提示

```tsx live-codeblock
import React, { useRef } from 'react';
import { Toast, Button } from 'orva-ui';

export default () => (
  <Button onClick={() => Toast.success('操作成功！')}>
    显示成功
  </Button>
);
```

### 错误提示

```tsx live-codeblock
import React, { useRef } from 'react';
import { Toast, Button } from 'orva-ui';

export default () => (
  <Button onClick={() => Toast.error('操作失败！')}>
    显示错误
  </Button>
);
```

### 警告提示

```tsx live-codeblock
import React, { useRef } from 'react';
import { Toast, Button } from 'orva-ui';

export default () => (
  <Button onClick={() => Toast.warning('这是一个警告')}>
    显示警告
  </Button>
);
```

### 加载提示

```tsx live-codeblock
import React, { useRef } from 'react';
import { Toast, Button } from 'orva-ui';

export default () => (
  <Button onClick={() => Toast.loading('加载中...', 0)}>
    显示加载
  </Button>
);
```

### 自定义时长

```tsx live-codeblock
import React, { useRef } from 'react';
import { Toast, Button } from 'orva-ui';

export default () => (
  <Button onClick={() => Toast.show('这条提示 5 秒后消失', { duration: 5000 })}>
    5 秒后消失
  </Button>
);
```

### 带图标

```tsx live-codeblock
import React, { useRef } from 'react';
import { Toast, Button, Icon } from 'orva-ui';

export default () => (
  <Button onClick={() => Toast.show({ content: '带图标提示', icon: <Icon name="mdi:information" /> })}>
    显示带图标
  </Button>
);
```

### 关闭提示

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
        显示持久提示
      </Button>
      <Button onClick={() => key.current && Toast.hide(key.current)}>
        关闭提示
      </Button>
    </>
  );
};
```

### 全部关闭

```tsx live-codeblock
import React, { useRef } from 'react';
import { Toast, Button } from 'orva-ui';

export default () => (
  <>
    <Button onClick={() => Toast.show('提示 1')}>提示 1</Button>
    <Button onClick={() => Toast.success('提示 2')}>提示 2</Button>
    <Button onClick={() => Toast.hide()}>全部关闭</Button>
  </>
);
```

## API

| 方法 | 参数 | 说明 |
|------|------|------|
| `Toast.show` | `(content: string, config?: ToastConfig) => string` | 显示提示 |
| `Toast.success` | `(content: string, config?: ToastConfig) => string` | 显示成功提示 |
| `Toast.error` | `(content: string, config?: ToastConfig) => string` | 显示错误提示 |
| `Toast.warning` | `(content: string, config?: ToastConfig) => string` | 显示警告提示 |
| `Toast.loading` | `(content: string, duration?: number) => string` | 显示加载提示 |
| `Toast.hide` | `(key?: string) => void` | 关闭提示 |

## ToastConfig

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| duration | number | `2000` | 显示时长 |
| icon | ReactNode | - | 图标 |
| position | `'top' \| 'middle' \| 'bottom'` | `'middle'` | 位置 |

## 注意事项

- 请确保在 `ThemeProvider` 包裹下使用组件以获得完整的主题支持
- `duration` 为 `0` 时提示不会自动关闭
- `Toast.hide()` 可关闭所有提示
## 相关组件

以下是与当前组件相关的其他组件，可能在使用时搭配使用：

| 组件 | 说明 |
|------|------|
| [Message](message) | 消息提示 |
| [Notification](notification) | 通知消息 |
