# Popconfirm 气泡确认框

**Related Components:** [Modal](./modal), [Tooltip](./tooltip)


Popconfirm 组件用于在操作前弹出确认框。支持自定义标题、按钮文案等。

## 引入

```tsx live-codeblock
import { Popconfirm } from 'orva-ui';
// 或按需导入
import { Popconfirm } from 'orva-ui/feedback';
```

## 基本使用

```tsx live-codeblock
import React, { useState } from 'react';
import { Popconfirm, Button } from 'orva-ui';

export default () => {
  const handleConfirm = () => {
    console.log('确认');
  };
  
  const handleCancel = () => {
    console.log('取消');
  };
  
  return (
    <Popconfirm title="确定要删除吗？" onConfirm={handleConfirm} onCancel={handleCancel}>
      <Button color="#ef4444">删除</Button>
    </Popconfirm>
  );
};
```

## 使用示例

### 基础确认框

```tsx live-codeblock
import React, { useState } from 'react';
import { Popconfirm, Button } from 'orva-ui';

export default () => {
  return (
    <Popconfirm title="确定要执行此操作吗？" onConfirm={() => console.log('确认')} onCancel={() => console.log('取消')}>
      <Button>确认操作</Button>
    </Popconfirm>
  );
};
```

### 删除确认

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
      cancelText="取消"
      okButtonProps={{ color: '#ef4444' }}
    >
      <Button color="#ef4444">删除</Button>
    </Popconfirm>
  );
};
```

### 不同位置

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

### 自定义按钮文案

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

### 带图标

```tsx live-codeblock
import React, { useState } from 'react';
import { Popconfirm, Button, Icon } from 'orva-ui';

export default () => {
  return (
    <Popconfirm 
      title={
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Icon name="mdi:alert" color="#f59e0b" style={{ marginRight: 8 }} />
          <span>警告</span>
        </div>
      }
      description="此操作可能会影响其他用户，请谨慎操作"
      onConfirm={() => console.log('确认')}
    >
      <Button>危险操作</Button>
    </Popconfirm>
  );
};
```

### 受控显示

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
        onConfirm={() => console.log('确认')}
        onCancel={() => console.log('取消')}
      >
        <Button>受控确认</Button>
      </Popconfirm>
      <Button onClick={() => setVisible(!visible)} style={{ marginLeft: 8 }}>
        {visible ? '隐藏' : '显示'}
      </Button>
    </>
  );
};
```

### 禁用状态

```tsx live-codeblock
import React, { useState } from 'react';
import { Popconfirm, Button } from 'orva-ui';

export default () => {
  return (
    <Popconfirm title="此操作被禁用" disabled onConfirm={() => console.log('确认')}>
      <Button disabled>禁用按钮</Button>
    </Popconfirm>
  );
};
```

### 异步确认

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
      okText="确认"
      cancelText="取消"
    >
      <Button type="primary">异步操作</Button>
    </Popconfirm>
  );
};
```

## Props

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| title | ReactNode | - | 标题 |
| description | ReactNode | - | 描述 |
| visible | boolean | - | 是否显示（受控） |
| defaultVisible | boolean | `false` | 默认是否显示 |
| placement | `'top' \| 'bottom' \| 'left' \| 'right' \| 'topLeft' \| 'topRight' \| 'bottomLeft' \| 'bottomRight'` | `'top'` | 位置 |
| okText | string | `'确定'` | 确认按钮文案 |
| cancelText | string | `'取消'` | 取消按钮文案 |
| okButtonProps | ButtonProps | - | 确认按钮配置 |
| cancelButtonProps | ButtonProps | - | 取消按钮配置 |
| onConfirm | `() => void` | - | 确认回调 |
| onCancel | `() => void` | - | 取消回调 |
| onVisibleChange | `(visible: boolean) => void` | - | 显示变化回调 |
| disabled | boolean | `false` | 是否禁用 |
| className | string | - | 自定义类名 |
| style | CSSProperties | - | 自定义样式 |

## 注意事项

- 请确保在 `ThemeProvider` 包裹下使用组件以获得完整的主题支持
- `visible` 为受控值，需配合 `onVisibleChange` 使用
- 子组件必须支持 `ref` 获取 DOM 元素
- `onConfirm` 可返回 Promise 实现异步确认
## 相关组件

以下是与当前组件相关的其他组件，可能在使用时搭配使用：

| 组件 | 说明 |
|------|------|
| [Modal](modal) | 对话框 |
| [Tooltip](tooltip) | 悬浮提示 |
