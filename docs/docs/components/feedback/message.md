# Message 消息

**Related Components:** [Toast](./toast), [Notification](./notification)


Message 组件用于显示全局提示信息。支持成功、警告、错误、信息四种类型。

## 引入

```tsx live-codeblock
import { Message } from 'orva-ui';
// 或按需导入
import { Message } from 'orva-ui/feedback';
```

## 基本使用

```tsx live-codeblock
import React, { useRef } from 'react';
import { Message, Button } from 'orva-ui';

export default () => (
  <Button onClick={() => Message.info('这是一条信息消息')}>
    显示信息
  </Button>
);
```

## 使用示例

### 信息消息

```tsx live-codeblock
import React, { useRef } from 'react';
import { Message, Button } from 'orva-ui';

export default () => (
  <Button onClick={() => Message.info('这是一条信息消息')}>
    显示信息
  </Button>
);
```

### 成功消息

```tsx live-codeblock
import React, { useRef } from 'react';
import { Message, Button } from 'orva-ui';

export default () => (
  <Button onClick={() => Message.success('操作成功！')}>
    显示成功
  </Button>
);
```

### 警告消息

```tsx live-codeblock
import React, { useRef } from 'react';
import { Message, Button } from 'orva-ui';

export default () => (
  <Button onClick={() => Message.warning('这是一个警告')}>
    显示警告
  </Button>
);
```

### 错误消息

```tsx live-codeblock
import React, { useRef } from 'react';
import { Message, Button } from 'orva-ui';

export default () => (
  <Button onClick={() => Message.error('操作失败！')}>
    显示错误
  </Button>
);
```

### 自定义时长

```tsx live-codeblock
import React, { useRef } from 'react';
import { Message, Button } from 'orva-ui';

export default () => (
  <Button onClick={() => Message.info('这条消息 5 秒后消失', 5000)}>
    显示 5 秒
  </Button>
);
```

### 带图标

```tsx live-codeblock
import React, { useRef } from 'react';
import { Message, Button, Icon } from 'orva-ui';

export default () => (
  <Button onClick={() => Message.info({ content: '带图标消息', icon: <Icon name="mdi:information" /> })}>
    显示带图标
  </Button>
);
```

### 连续显示

```tsx live-codeblock
import React, { useRef } from 'react';
import { Message, Button } from 'orva-ui';

export default () => (
  <Button onClick={() => {
    Message.info('第一条消息');
    setTimeout(() => Message.success('第二条消息'), 1000);
    setTimeout(() => Message.warning('第三条消息'), 2000);
  }}>
    连续显示
  </Button>
);
```

### 关闭消息

```tsx live-codeblock
import React, { useRef } from 'react';
import { Message, Button } from 'orva-ui';

export default () => {
  const key = useRef<string>();
  
  return (
    <>
      <Button onClick={() => {
        key.current = Message.info('这条消息可以关闭', 0);
      }}>
        显示持久消息
      </Button>
      <Button onClick={() => key.current && Message.destroy(key.current)}>
        关闭消息
      </Button>
    </>
  );
};
```

### 全部关闭

```tsx live-codeblock
import React, { useRef } from 'react';
import { Message, Button } from 'orva-ui';

export default () => (
  <>
    <Button onClick={() => Message.info('消息 1')}>消息 1</Button>
    <Button onClick={() => Message.success('消息 2')}>消息 2</Button>
    <Button onClick={() => Message.destroy()}>全部关闭</Button>
  </>
);
```

## API

| 方法 | 参数 | 说明 |
|------|------|------|
| `Message.info` | `(content: string, duration?: number) => string` | 显示信息消息 |
| `Message.success` | `(content: string, duration?: number) => string` | 显示成功消息 |
| `Message.warning` | `(content: string, duration?: number) => string` | 显示警告消息 |
| `Message.error` | `(content: string, duration?: number) => string` | 显示错误消息 |
| `Message.destroy` | `(key?: string) => void` | 关闭消息 |

## 配置项

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| duration | number | `3000` | 默认显示时长（ms） |
| top | number | `24` | 距离顶部距离（px） |
| maxCount | number | - | 最大显示数量 |

## 注意事项

- 请确保在 `ThemeProvider` 包裹下使用组件以获得完整的主题支持
- `duration` 为 `0` 时消息不会自动关闭
- `Message.destroy()` 可关闭所有消息
## 相关组件

以下是与当前组件相关的其他组件，可能在使用时搭配使用：

| 组件 | 说明 |
|------|------|
| [Toast](toast) | 轻提示 |
| [Notification](notification) | 通知消息 |
