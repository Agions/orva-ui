# Tooltip 提示框

**Related Components:** [Popover](./popover), [Dropdown](./dropdown)


Tooltip 组件用于在鼠标悬停时显示提示信息。支持多种位置、自定义内容等。

## 引入

```tsx live-codeblock
import { Tooltip } from 'orva-ui';
// 或按需导入
import { Tooltip } from 'orva-ui/feedback';
```

## 基本使用

```tsx live-codeblock
import React, { useState } from 'react';
import { Tooltip, Button } from 'orva-ui';

export default () => {
  return (
    <Tooltip content="这是一个提示">
      <Button>悬停查看</Button>
    </Tooltip>
  );
};
```

## 使用示例

### 基础提示

```tsx live-codeblock
import React, { useState } from 'react';
import { Tooltip, Button } from 'orva-ui';

export default () => {
  return (
    <Tooltip content="这是一个提示">
      <Button>悬停查看</Button>
    </Tooltip>
  );
};
```

### 不同位置

```tsx live-codeblock
import React, { useState } from 'react';
import { Tooltip, Button, Space } from 'orva-ui';

export default () => {
  return (
    <Space>
      <Tooltip content="上方提示" placement="top">
        <Button>上</Button>
      </Tooltip>
      <Tooltip content="下方提示" placement="bottom">
        <Button>下</Button>
      </Tooltip>
      <Tooltip content="左侧提示" placement="left">
        <Button>左</Button>
      </Tooltip>
      <Tooltip content="右侧提示" placement="right">
        <Button>右</Button>
      </Tooltip>
    </Space>
  );
};
```

### 自定义内容

```tsx live-codeblock
import React, { useState } from 'react';
import { Tooltip, Button, Icon } from 'orva-ui';

export default () => {
  return (
    <Tooltip 
      content={
        <div>
          <div style={{ fontWeight: 500 }}>标题</div>
          <div style={{ fontSize: 12, color: '#666', marginTop: 4 }}>详细描述信息</div>
        </div>
      }
    >
      <Button>自定义内容</Button>
    </Tooltip>
  );
};
```

### 带颜色

```tsx live-codeblock
import React, { useState } from 'react';
import { Tooltip, Button, Space } from 'orva-ui';

export default () => {
  return (
    <Space>
      <Tooltip content="默认" placement="top">
        <Button>默认</Button>
      </Tooltip>
      <Tooltip content="成功" color="#10b981" placement="top">
        <Button color="#10b981">成功</Button>
      </Tooltip>
      <Tooltip content="警告" color="#f59e0b" placement="top">
        <Button color="#f59e0b">警告</Button>
      </Tooltip>
      <Tooltip content="错误" color="#ef4444" placement="top">
        <Button color="#ef4444">错误</Button>
      </Tooltip>
    </Space>
  );
};
```

### 禁用提示

```tsx live-codeblock
import React, { useState } from 'react';
import { Tooltip, Button } from 'orva-ui';

export default () => {
  return (
    <Tooltip content="这个提示被禁用了" disabled>
      <Button>禁用提示</Button>
    </Tooltip>
  );
};
```

### 受控显示

```tsx live-codeblock
import React, { useState } from 'react';
import { Tooltip, Button } from 'orva-ui';

export default () => {
  const [visible, setVisible] = useState(false);
  
  return (
    <>
      <Tooltip content="受控提示" visible={visible} onVisibleChange={setVisible}>
        <Button>受控</Button>
      </Tooltip>
      <Button onClick={() => setVisible(!visible)} style={{ marginLeft: 8 }}>
        {visible ? '隐藏' : '显示'}
      </Button>
    </>
  );
};
```

### 延迟显示

```tsx live-codeblock
import React, { useState } from 'react';
import { Tooltip, Button } from 'orva-ui';

export default () => {
  return (
    <Tooltip content="延迟 500ms 显示" delay={500}>
      <Button>延迟显示</Button>
    </Tooltip>
  );
};
```

### 多行提示

```tsx live-codeblock
import React, { useState } from 'react';
import { Tooltip, Button } from 'orva-ui';

export default () => {
  const longText = '这是一段很长的提示内容，可能会换行显示。Tooltip 组件支持多行文本，会自动调整宽度。';
  
  return (
    <Tooltip content={longText} placement="topLeft" style={{ maxWidth: 200 }}>
      <Button>长文本</Button>
    </Tooltip>
  );
};
```

## Props

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| content | ReactNode | - | 提示内容 |
| placement | `'top' \| 'bottom' \| 'left' \| 'right' \| 'topLeft' \| 'topRight' \| 'bottomLeft' \| 'bottomRight'` | `'top'` | 位置 |
| visible | boolean | - | 是否显示（受控） |
| defaultVisible | boolean | `false` | 默认是否显示 |
| disabled | boolean | `false` | 是否禁用 |
| color | string | - | 背景颜色 |
| delay | number | `0` | 延迟显示（ms） |
| onVisibleChange | `(visible: boolean) => void` | - | 显示变化回调 |
| className | string | - | 自定义类名 |
| style | CSSProperties | - | 自定义样式 |

## 注意事项

- 请确保在 `ThemeProvider` 包裹下使用组件以获得完整的主题支持
- `content` 可以是任意 ReactNode
- `visible` 为受控值，需配合 `onVisibleChange` 使用
- 子组件必须支持 `ref` 获取 DOM 元素
## 相关组件

以下是与当前组件相关的其他组件，可能在使用时搭配使用：

| 组件 | 说明 |
|------|------|
| [Popover](popover) | 组件 |
| [Dropdown](dropdown) | 组件 |
