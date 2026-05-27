# Drawer 抽屉

**Related Components:** [Modal](./modal), [Overlay](./overlay)


Drawer 组件用于从屏幕边缘滑出的面板。支持多种位置、大小、自定义内容等。

## 引入

```tsx live-codeblock
import { Drawer } from 'orva-ui';
// 或按需导入
import { Drawer } from 'orva-ui/feedback';
```

## 基本使用

```tsx live-codeblock
import React, { useState } from 'react';
import { Drawer, Button } from 'orva-ui';

export default () => {
  const [visible, setVisible] = useState(false);
  
  return (
    <>
      <Button onClick={() => setVisible(true)}>打开抽屉</Button>
      <Drawer title="抽屉标题" visible={visible} onClose={() => setVisible(false)}>
        <p>抽屉内容</p>
      </Drawer>
    </>
  );
};
```

## 使用示例

### 基础抽屉

```tsx live-codeblock
import React, { useState } from 'react';
import { Drawer, Button } from 'orva-ui';

export default () => {
  const [visible, setVisible] = useState(false);
  
  return (
    <>
      <Button onClick={() => setVisible(true)}>打开抽屉</Button>
      <Drawer title="抽屉标题" visible={visible} onClose={() => setVisible(false)}>
        <p>这是抽屉内容</p>
      </Drawer>
    </>
  );
};
```

### 不同位置

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
        <p>顶部抽屉内容</p>
      </Drawer>
      <Drawer title="底部抽屉" visible={visibleBottom} onClose={() => setVisibleBottom(false)} placement="bottom">
        <p>底部抽屉内容</p>
      </Drawer>
      <Drawer title="左侧抽屉" visible={visibleLeft} onClose={() => setVisibleLeft(false)} placement="left">
        <p>左侧抽屉内容</p>
      </Drawer>
      <Drawer title="右侧抽屉" visible={visibleRight} onClose={() => setVisibleRight(false)} placement="right">
        <p>右侧抽屉内容</p>
      </Drawer>
    </>
  );
};
```

### 不同尺寸

```tsx live-codeblock
import React, { useState } from 'react';
import { Drawer, Button, Space } from 'orva-ui';

export default () => {
  const [visible, setVisible] = useState(false);
  const [size, setSize] = useState('md');
  
  return (
    <>
      <Space>
        <Button onClick={() => { setSize('sm'); setVisible(true); }}>小尺寸</Button>
        <Button onClick={() => { setSize('md'); setVisible(true); }}>中尺寸</Button>
        <Button onClick={() => { setSize('lg'); setVisible(true); }}>大尺寸</Button>
        <Button onClick={() => { setSize('full'); setVisible(true); }}>全屏</Button>
      </Space>
      
      <Drawer title="抽屉" visible={visible} size={size} onClose={() => setVisible(false)}>
        <p>抽屉内容</p>
      </Drawer>
    </>
  );
};
```

### 带操作栏

```tsx live-codeblock
import React, { useState } from 'react';
import { Drawer, Button } from 'orva-ui';

export default () => {
  const [visible, setVisible] = useState(false);
  
  return (
    <>
      <Button onClick={() => setVisible(true)}>打开抽屉</Button>
      <Drawer 
        title="抽屉标题" 
        visible={visible} 
        onClose={() => setVisible(false)}
        footer={
          <>
            <Button onClick={() => setVisible(false)}>取消</Button>
            <Button type="primary" onClick={() => setVisible(false)}>确定</Button>
          </>
        }
      >
        <p>抽屉内容</p>
      </Drawer>
    </>
  );
};
```

### 不可关闭

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
        <Button onClick={() => setVisible(false)} style={{ marginTop: 16 }}>关闭</Button>
      </Drawer>
    </>
  );
};
```

### 嵌套抽屉

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
        <p>外层抽屉内容</p>
        <Button onClick={() => setVisible2(true)} style={{ marginTop: 16 }}>打开内层抽屉</Button>
      </Drawer>
      <Drawer title="内层抽屉" visible={visible2} onClose={() => setVisible2(false)}>
        <p>内层抽屉内容</p>
      </Drawer>
    </>
  );
};
```

### 自定义内容

```tsx live-codeblock
import React, { useState } from 'react';
import { Drawer, Button, Form, Input } from 'orva-ui';

export default () => {
  const [visible, setVisible] = useState(false);
  
  return (
    <>
      <Button onClick={() => setVisible(true)}>编辑</Button>
      <Drawer 
        title="编辑表单" 
        visible={visible} 
        onClose={() => setVisible(false)}
        footer={
          <>
            <Button onClick={() => setVisible(false)}>取消</Button>
            <Button type="primary" onClick={() => setVisible(false)}>保存</Button>
          </>
        }
      >
        <Form>
          <Form.Item label="姓名">
            <Input placeholder="请输入姓名" />
          </Form.Item>
          <Form.Item label="邮箱">
            <Input placeholder="请输入邮箱" />
          </Form.Item>
        </Form>
      </Drawer>
    </>
  );
};
```

## Props

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| visible | boolean | - | 是否显示（受控） |
| defaultVisible | boolean | `false` | 默认是否显示 |
| title | ReactNode | - | 标题 |
| placement | `'top' \| 'bottom' \| 'left' \| 'right'` | `'right'` | 位置 |
| size | `'sm' \| 'md' \| 'lg' \| 'full'` | `'md'` | 尺寸 |
| mask | boolean | `true` | 是否显示遮罩 |
| maskClosable | boolean | `true` | 点击遮罩是否关闭 |
| closable | boolean | `true` | 是否显示关闭按钮 |
| footer | ReactNode | - | 底部内容 |
| onClose | `() => void` | - | 关闭回调 |
| className | string | - | 自定义类名 |
| style | CSSProperties | - | 自定义样式 |

## 注意事项

- 请确保在 `ThemeProvider` 包裹下使用组件以获得完整的主题支持
- `visible` 为受控值，需配合 `onClose` 使用
- `placement` 和 `size` 组合使用可实现不同效果
## 相关组件

以下是与当前组件相关的其他组件，可能在使用时搭配使用：

| 组件 | 说明 |
|------|------|
| [Modal](modal) | 对话框 |
| [Overlay](overlay) | 组件 |
