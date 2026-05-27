# Popconfirm

**Related Components:** [Modal](./modal), [Tooltip](./tooltip)


Popconfirm Popconfirm component for confirmation popups before actions. Supports custom title、button text. 

## Introduction

```tsx live-codeblock
import { Popconfirm } from 'orva-ui';
// 或按需导入
import { Popconfirm } from 'orva-ui/feedback';
```

## Basic Usage

```tsx live-codeblock
import React, { useState } from 'react';
import { Popconfirm, Button } from 'orva-ui';

export default () => {
  const handleConfirm = () => {
    console.log('Confirm');
  };
  
  const handleCancel = () => {
    console.log('Cancel');
  };
  
  return (
    <Popconfirm title="确定要删除吗？" onConfirm={handleConfirm} onCancel={handleCancel}>
      <Button color="#ef4444">Delete</Button>
    </Popconfirm>
  );
};
```

## Examples

### Basic Confirm框

```tsx live-codeblock
import React, { useState } from 'react';
import { Popconfirm, Button } from 'orva-ui';

export default () => {
  return (
    <Popconfirm title="确定要执行此操作吗？" onConfirm={() => console.log('Confirm')} onCancel={() => console.log('Cancel')}>
      <Button>确认操作</Button>
    </Popconfirm>
  );
};
```

### 删除Confirm

```tsx live-codeblock
import React, { useState } from 'react';
import { Popconfirm, Button } from 'orva-ui';

export default () => {
  const handleDelete = () => {
    console.log('删除成功');
  };
  
  return (
    <Popconfirm 
      title="确定要删除吗？" 
      description="此操作不可撤销"
      onConfirm={handleDelete}
      okText="确定删除"
      cancelText="Cancel"
      okButtonProps={{ color: '#ef4444' }}
    >
      <Button color="#ef4444">Delete</Button>
    </Popconfirm>
  );
};
```

### Different位置

```tsx live-codeblock
import React, { useState } from 'react';
import { Popconfirm, Button, Space } from 'orva-ui';

export default () => {
  return (
    <Space>
      <Popconfirm title="上方提示" placement="top">
        <Button>上</Button>
      </Popconfirm>
      <Popconfirm title="下方提示" placement="bottom">
        <Button>下</Button>
      </Popconfirm>
      <Popconfirm title="左侧提示" placement="left">
        <Button>左</Button>
      </Popconfirm>
      <Popconfirm title="右侧提示" placement="right">
        <Button>右</Button>
      </Popconfirm>
    </Space>
  );
};
```

### CustomButton text

```tsx live-codeblock
import React, { useState } from 'react';
import { Popconfirm, Button } from 'orva-ui';

export default () => {
  return (
    <Popconfirm 
      title="确定提交吗？" 
      onConfirm={() => console.log('提交')}
      okText="立即提交"
      cancelText="再想想"
    >
      <Button type="primary">提交</Button>
    </Popconfirm>
  );
};
```

### 带icon

```tsx live-codeblock
import React, { useState } from 'react';
import { Popconfirm, Button, Icon } from 'orva-ui';

export default () => {
  return (
    <Popconfirm 
      title={
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Icon name="mdi:alert" color="#f59e0b" style={{ marginRight: 8 }} />
          <span>warning</span>
        </div>
      }
      description="此操作可能会影响其他用户, 请谨慎操作"
      onConfirm={() => console.log('Confirm')}
    >
      <Button>危险操作</Button>
    </Popconfirm>
  );
};
```

### ControlledShow

```tsx live-codeblock
import React, { useState } from 'react';
import { Popconfirm, Button } from 'orva-ui';

export default () => {
  const [visible, setVisible] = useState(false);
  
  return (
    <>
      <Popconfirm 
        title="确定吗？" 
        visible={visible}
        onVisibleChange={setVisible}
        onConfirm={() => console.log('Confirm')}
        onCancel={() => console.log('Cancel')}
      >
        <Button>Controlled确认</Button>
      </Popconfirm>
      <Button onClick={() => setVisible(!visible)} style={{ marginLeft: 8 }}>
        {visible ? 'Hide' : 'Show'}
      </Button>
    </>
  );
};
```

### disabledstatus

```tsx live-codeblock
import React, { useState } from 'react';
import { Popconfirm, Button } from 'orva-ui';

export default () => {
  return (
    <Popconfirm title="此操作被disabled" disabled onConfirm={() => console.log('Confirm')}>
      <Button disabled>disabled按钮</Button>
    </Popconfirm>
  );
};
```

### 异步Confirm

```tsx live-codeblock
import React, { useState } from 'react';
import { Popconfirm, Button, Message } from 'orva-ui';

export default () => {
  const handleConfirm = async () => {
    Message.loading('处理中...');
    // 模拟异步操作
    await new Promise(resolve => setTimeout(resolve, 1000));
    Message.success('操作成功');
  };
  
  return (
    <Popconfirm 
      title="确定要执行吗？" 
      onConfirm={handleConfirm}
      okText="Confirm"
      cancelText="Cancel"
    >
      <Button type="primary">异步操作</Button>
    </Popconfirm>
  );
};
```

## Props

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| title | ReactNode | - | Title |
| description | ReactNode | - | description |
| visible | boolean | - | Show or hide（Controlled） |
| defaultVisible | boolean | `false` | DefaultShow or hide |
| placement | `'top' \| 'bottom' \| 'left' \| 'right' \| 'topLeft' \| 'topRight' \| 'bottomLeft' \| 'bottomRight'` | `'top'` | Position |
| okText | string | `'OK'` | ConfirmButton text |
| cancelText | string | `'Cancel'` | CancelButton text |
| okButtonProps | ButtonProps | - | ConfirmButtonConfig |
| cancelButtonProps | ButtonProps | - | CancelButtonConfig |
| onConfirm | `() => void` | - | ConfirmCallback |
| onCancel | `() => void` | - | Cancel callback |
| onVisibleChange | `(visible: boolean) => void` | - | DisplayChange callback |
| disabled | boolean | `false` | Whetherdisabled |
| className | string | - | Custom class name |
| style | CSSProperties | - | Custom Style |

## Notes

- Ensure the component is wrapped in `ThemeProvider` for full theme support
- `visible` controlled value, 需Used with `onVisibleChange` Use
- Sub componentMustSupports `ref` 获取 DOM 元素
- `onConfirm` 可Back Promise 实现异步Confirm
## Related Components

The following components are related and may be used together:

| Component | Description |
|-----------|-------------|
| [Modal](modal) | Dialog/Modal |
| [Tooltip](tooltip) | HoverHint |
