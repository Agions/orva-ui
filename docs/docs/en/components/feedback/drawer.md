# Drawer

**Related Components:** [Modal](./modal), [Overlay](./overlay)


Drawer Drawer component for panels that slide in from screen edges. Supports multiple positions、sizes、custom content. 

## Introduction

```tsx live-codeblock
import { Drawer } from 'orva-ui';
// 或按需导入
import { Drawer } from 'orva-ui/feedback';
```

## Basic Usage

```tsx live-codeblock
import React, { useState } from 'react';
import { Drawer, Button } from 'orva-ui';

export default () => {
  const [visible, setVisible] = useState(false);
  
  return (
    <>
      <Button onClick={() => setVisible(true)}>打开抽屉</Button>
      <Drawer title="抽屉Title" visible={visible} onClose={() => setVisible(false)}>
        <p>抽屉Content</p>
      </Drawer>
    </>
  );
};
```

## Examples

### Basic Drawer

```tsx live-codeblock
import React, { useState } from 'react';
import { Drawer, Button } from 'orva-ui';

export default () => {
  const [visible, setVisible] = useState(false);
  
  return (
    <>
      <Button onClick={() => setVisible(true)}>打开抽屉</Button>
      <Drawer title="抽屉Title" visible={visible} onClose={() => setVisible(false)}>
        <p>这是抽屉Content</p>
      </Drawer>
    </>
  );
};
```

### Different位置

```tsx live-codeblock
import React, { useState } from 'react';
import { Drawer, Button, Space } from 'orva-ui';

export default () => {
  const [visibleTop, setVisibleTop] = useState(false);
  const [visibleBottom, setVisibleBottom] = useState(false);
  const [visibleLeft, setVisibleLeft] = useState(false);
  const [visibleRight, setVisibleRight] = useState(false);
  
  return (
    <>
      <Space>
        <Button onClick={() => setVisibleTop(true)}>上</Button>
        <Button onClick={() => setVisibleBottom(true)}>下</Button>
        <Button onClick={() => setVisibleLeft(true)}>左</Button>
        <Button onClick={() => setVisibleRight(true)}>右</Button>
      </Space>
      
      <Drawer title="顶部抽屉" visible={visibleTop} onClose={() => setVisibleTop(false)} placement="top">
        <p>顶部抽屉Content</p>
      </Drawer>
      <Drawer title="底部抽屉" visible={visibleBottom} onClose={() => setVisibleBottom(false)} placement="bottom">
        <p>底部抽屉Content</p>
      </Drawer>
      <Drawer title="左侧抽屉" visible={visibleLeft} onClose={() => setVisibleLeft(false)} placement="left">
        <p>左侧抽屉Content</p>
      </Drawer>
      <Drawer title="右侧抽屉" visible={visibleRight} onClose={() => setVisibleRight(false)} placement="right">
        <p>右侧抽屉Content</p>
      </Drawer>
    </>
  );
};
```

### Differentsizes

```tsx live-codeblock
import React, { useState } from 'react';
import { Drawer, Button, Space } from 'orva-ui';

export default () => {
  const [visible, setVisible] = useState(false);
  const [size, setSize] = useState('md');
  
  return (
    <>
      <Space>
        <Button onClick={() => { setSize('sm'); setVisible(true); }}>小sizes</Button>
        <Button onClick={() => { setSize('md'); setVisible(true); }}>中sizes</Button>
        <Button onClick={() => { setSize('lg'); setVisible(true); }}>大sizes</Button>
        <Button onClick={() => { setSize('full'); setVisible(true); }}>Fullscreen</Button>
      </Space>
      
      <Drawer title="抽屉" visible={visible} size={size} onClose={() => setVisible(false)}>
        <p>抽屉Content</p>
      </Drawer>
    </>
  );
};
```

### 带Action栏

```tsx live-codeblock
import React, { useState } from 'react';
import { Drawer, Button } from 'orva-ui';

export default () => {
  const [visible, setVisible] = useState(false);
  
  return (
    <>
      <Button onClick={() => setVisible(true)}>打开抽屉</Button>
      <Drawer 
        title="抽屉Title" 
        visible={visible} 
        onClose={() => setVisible(false)}
        footer={
          <>
            <Button onClick={() => setVisible(false)}>Cancel</Button>
            <Button type="primary" onClick={() => setVisible(false)}>确定</Button>
          </>
        }
      >
        <p>抽屉Content</p>
      </Drawer>
    </>
  );
};
```

### Not closable

```tsx live-codeblock
import React, { useState } from 'react';
import { Drawer, Button } from 'orva-ui';

export default () => {
  const [visible, setVisible] = useState(false);
  
  return (
    <>
      <Button onClick={() => setVisible(true)}>打开抽屉</Button>
      <Drawer title="抽屉" visible={visible} onClose={() => setVisible(false)} maskClosable={false}>
        <p>此抽屉必须点击按钮关闭</p>
        <Button onClick={() => setVisible(false)} style={{ marginTop: 16 }}>Close</Button>
      </Drawer>
    </>
  );
};
```

### NestedDrawer

```tsx live-codeblock
import React, { useState } from 'react';
import { Drawer, Button } from 'orva-ui';

export default () => {
  const [visible1, setVisible1] = useState(false);
  const [visible2, setVisible2] = useState(false);
  
  return (
    <>
      <Button onClick={() => setVisible1(true)}>打开外层抽屉</Button>
      <Drawer title="外层抽屉" visible={visible1} onClose={() => setVisible1(false)}>
        <p>外层抽屉Content</p>
        <Button onClick={() => setVisible2(true)} style={{ marginTop: 16 }}>打开内层抽屉</Button>
      </Drawer>
      <Drawer title="内层抽屉" visible={visible2} onClose={() => setVisible2(false)}>
        <p>内层抽屉Content</p>
      </Drawer>
    </>
  );
};
```

### CustomContent

```tsx live-codeblock
import React, { useState } from 'react';
import { Drawer, Button, Form, Input } from 'orva-ui';

export default () => {
  const [visible, setVisible] = useState(false);
  
  return (
    <>
      <Button onClick={() => setVisible(true)}>Edit</Button>
      <Drawer 
        title="编辑Form" 
        visible={visible} 
        onClose={() => setVisible(false)}
        footer={
          <>
            <Button onClick={() => setVisible(false)}>Cancel</Button>
            <Button type="primary" onClick={() => setVisible(false)}>保存</Button>
          </>
        }
      >
        <Form>
          <Form.Item label="姓名">
            <Input placeholder="请Input姓名" />
          </Form.Item>
          <Form.Item label="邮箱">
            <Input placeholder="请Input邮箱" />
          </Form.Item>
        </Form>
      </Drawer>
    </>
  );
};
```

## Props

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| visible | boolean | - | Show or hide（Controlled） |
| defaultVisible | boolean | `false` | DefaultShow or hide |
| title | ReactNode | - | Title |
| placement | `'top' \| 'bottom' \| 'left' \| 'right'` | `'right'` | Position |
| size | `'sm' \| 'md' \| 'lg' \| 'full'` | `'md'` | sizes |
| mask | boolean | `true` | Show or hideMask |
| maskClosable | boolean | `true` | 点击MaskWhetherClose |
| closable | boolean | `true` | Show or hideCloseButton |
| footer | ReactNode | - | BottomContent |
| onClose | `() => void` | - | Close callback |
| className | string | - | Custom class name |
| style | CSSProperties | - | Custom Style |

## Notes

- Ensure the component is wrapped in `ThemeProvider` for full theme support
- `visible` controlled value, 需Used with `onClose` Use
- `placement` 和 `size` 组合Use可实现DifferentEffect
## Related Components

The following components are related and may be used together:

| Component | Description |
|-----------|-------------|
| [Modal](modal) | Dialog/Modal |
| [Overlay](overlay) | Component |
