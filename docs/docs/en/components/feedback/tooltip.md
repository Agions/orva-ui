# Tooltip

**Related Components:** [Popover](./popover), [Dropdown](./dropdown)


Tooltip Tooltip component for showing hints on hover. Supports multiple positions、custom content. 

## Introduction

```tsx live-codeblock
import { Tooltip } from 'orva-ui';
// 或按需导入
import { Tooltip } from 'orva-ui/feedback';
```

## Basic Usage

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

## Examples

### Basic Hint

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

### Different位置

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

### CustomContent

```tsx live-codeblock
import React, { useState } from 'react';
import { Tooltip, Button, Icon } from 'orva-ui';

export default () => {
  return (
    <Tooltip 
      content={
        <div>
          <div style={{ fontWeight: 500 }}>Title</div>
          <div style={{ fontSize: 12, color: '#666', marginTop: 4 }}>详细description信息</div>
        </div>
      }
    >
      <Button>CustomContent</Button>
    </Tooltip>
  );
};
```

### 带colors

```tsx live-codeblock
import React, { useState } from 'react';
import { Tooltip, Button, Space } from 'orva-ui';

export default () => {
  return (
    <Space>
      <Tooltip content="Default" placement="top">
        <Button>Default</Button>
      </Tooltip>
      <Tooltip content="Success" color="#10b981" placement="top">
        <Button color="#10b981">Success</Button>
      </Tooltip>
      <Tooltip content="warning" color="#f59e0b" placement="top">
        <Button color="#f59e0b">warning</Button>
      </Tooltip>
      <Tooltip content="error" color="#ef4444" placement="top">
        <Button color="#ef4444">error</Button>
      </Tooltip>
    </Space>
  );
};
```

### disabledTooltip

```tsx live-codeblock
import React, { useState } from 'react';
import { Tooltip, Button } from 'orva-ui';

export default () => {
  return (
    <Tooltip content="这个提示被disabled了" disabled>
      <Button>disabled提示</Button>
    </Tooltip>
  );
};
```

### ControlledShow

```tsx live-codeblock
import React, { useState } from 'react';
import { Tooltip, Button } from 'orva-ui';

export default () => {
  const [visible, setVisible] = useState(false);
  
  return (
    <>
      <Tooltip content="Controlled提示" visible={visible} onVisibleChange={setVisible}>
        <Button>Controlled</Button>
      </Tooltip>
      <Button onClick={() => setVisible(!visible)} style={{ marginLeft: 8 }}>
        {visible ? 'Hide' : 'Show'}
      </Button>
    </>
  );
};
```

### DelayShow

```tsx live-codeblock
import React, { useState } from 'react';
import { Tooltip, Button } from 'orva-ui';

export default () => {
  return (
    <Tooltip content="延迟 500ms Show" delay={500}>
      <Button>延迟Show</Button>
    </Tooltip>
  );
};
```

### 多RowTooltip

```tsx live-codeblock
import React, { useState } from 'react';
import { Tooltip, Button } from 'orva-ui';

export default () => {
  const longText = '这是一段很长的提示Content, 可能会换行Show. Tooltip 组件Supports多行Text, 会自动调整Width. ';
  
  return (
    <Tooltip content={longText} placement="topLeft" style={{ maxWidth: 200 }}>
      <Button>长Text</Button>
    </Tooltip>
  );
};
```

## Props

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| content | ReactNode | - | HintContent |
| placement | `'top' \| 'bottom' \| 'left' \| 'right' \| 'topLeft' \| 'topRight' \| 'bottomLeft' \| 'bottomRight'` | `'top'` | Position |
| visible | boolean | - | Show or hide（Controlled） |
| defaultVisible | boolean | `false` | DefaultShow or hide |
| disabled | boolean | `false` | Whetherdisabled |
| color | string | - | Backgroundcolors |
| delay | number | `0` | DelayDisplay（ms） |
| onVisibleChange | `(visible: boolean) => void` | - | DisplayChange callback |
| className | string | - | Custom class name |
| style | CSSProperties | - | Custom Style |

## Notes

- Ensure the component is wrapped in `ThemeProvider` for full theme support
- `content` Can be any ReactNode
- `visible` controlled value, 需Used with `onVisibleChange` Use
- Sub componentMustSupports `ref` 获取 DOM 元素
## Related Components

The following components are related and may be used together:

| Component | Description |
|-----------|-------------|
| [Popover](popover) | Component |
| [Dropdown](dropdown) | Component |
