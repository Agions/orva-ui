# Modal 对话框

**Related Components:** [Drawer](./drawer), [Dialog](./dialog)


Related: [对话框](modal), [抽屉](drawer), [按钮](button)


对话框组件用于展示重要信息或请求用户确认。支持自定义内容、按钮、拖拽等。

## 引入

```tsx live-codeblock
import { Modal } from 'orva-ui';
// 或按需导入
import { Modal } from 'orva-ui/feedback';
```

## 基本使用

```tsx live-codeblock
import React, { useState } from 'react';
import { Modal, Button } from 'orva-ui';

export default () => {
  const [visible, setVisible] = useState(false);
  
  return (
    <>
      <Button onClick={() => setVisible(true)}>打开对话框</Button>
      <Modal visible={visible} onClose={() => setVisible(false)}>
        <Modal.Header>对话框标题</Modal.Header>
        <Modal.Body>
          这是对话框的内容区域。
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setVisible(false)}>取消</Button>
          <Button type="primary" onClick={() => setVisible(false)}>确定</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
```

## 使用示例

### 基础对话框

```tsx live-codeblock
import React, { useState } from 'react';
import { Modal, Button } from 'orva-ui';

export default () => {
  const [visible, setVisible] = useState(false);
  
  return (
    <>
      <Button onClick={() => setVisible(true)}>打开</Button>
      <Modal visible={visible} onClose={() => setVisible(false)}>
        <Modal.Header>标题</Modal.Header>
        <Modal.Body>对话框内容</Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setVisible(false)}>关闭</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
```

### 确认对话框

```tsx live-codeblock
import React, { useState } from 'react';
import { Modal, Button } from 'orva-ui';

export default () => {
  const [visible, setVisible] = useState(false);
  
  const handleConfirm = () => {
    console.log('确认操作');
    setVisible(false);
  };
  
  return (
    <>
      <Button type="danger" onClick={() => setVisible(true)}>删除</Button>
      <Modal visible={visible} onClose={() => setVisible(false)}>
        <Modal.Header>确认删除</Modal.Header>
        <Modal.Body>
          确定要删除此项吗？此操作不可撤销。
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setVisible(false)}>取消</Button>
          <Button type="danger" onClick={handleConfirm}>确定删除</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
```

### 表单对话框

```tsx live-codeblock
import React, { useState } from 'react';
import { Modal, Button, Input, Form } from 'orva-ui';

export default () => {
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  
  const handleSubmit = () => {
    form.validateFields().then(values => {
      console.log('提交数据:', values);
      setVisible(false);
    });
  };
  
  return (
    <>
      <Button onClick={() => setVisible(true)}>新建</Button>
      <Modal visible={visible} onClose={() => setVisible(false)}>
        <Modal.Header>新建项目</Modal.Header>
        <Modal.Body>
          <Form form={form}>
            <Form.Item name="name" label="项目名称" rules={[{ required: true }]}>
              <Input placeholder="请输入项目名称" />
            </Form.Item>
            <Form.Item name="description" label="描述">
              <Input placeholder="请输入描述" />
            </Form.Item>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setVisible(false)}>取消</Button>
          <Button type="primary" onClick={handleSubmit}>提交</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
```

### 全屏对话框

```tsx live-codeblock
import React, { useState } from 'react';
import { Modal, Button } from 'orva-ui';

export default () => {
  const [visible, setVisible] = useState(false);
  
  return (
    <>
      <Button onClick={() => setVisible(true)}>全屏对话框</Button>
      <Modal visible={visible} onClose={() => setVisible(false)} fullscreen>
        <Modal.Header>全屏内容</Modal.Header>
        <Modal.Body>
          这里可以放置大量内容，适合编辑器或复杂表单。
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setVisible(false)}>关闭</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
```

### 自定义宽度

```tsx live-codeblock
import React, { useState } from 'react';
import { Modal, Button } from 'orva-ui';

export default () => {
  const [visible, setVisible] = useState(false);
  
  return (
    <>
      <Button onClick={() => setVisible(true)}>自定义宽度</Button>
      <Modal visible={visible} onClose={() => setVisible(false)} width={600}>
        <Modal.Header>自定义宽度</Modal.Header>
        <Modal.Body>
          通过 width 属性可以设置对话框的宽度（单位：px）。
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setVisible(false)}>关闭</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
```

## Props

### Modal

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| visible | boolean | `false` | 是否显示 |
| title | string | - | 标题（快捷方式） |
| width | number | `520` | 宽度（单位：px） |
| fullscreen | boolean | `false` | 是否全屏 |
| centered | boolean | `false` | 是否垂直居中 |
| closable | boolean | `true` | 是否显示关闭按钮 |
| maskClosable | boolean | `true` | 点击遮罩是否关闭 |
| keyboard | boolean | `true` | 是否支持 ESC 关闭 |
| destroyOnClose | boolean | `false` | 关闭时是否销毁内容 |
| mask | boolean | `true` | 是否显示遮罩 |
| onCancel | `() => void` | - | 取消回调 |
| onOk | `() => void` | - | 确认回调 |
| className | string | - | 自定义类名 |
| style | CSSProperties | - | 自定义样式 |

### Modal.Header

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| children | ReactNode | - | 标题内容 |

### Modal.Body

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| children | ReactNode | - | 内容区域 |

### Modal.Footer

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| children | ReactNode | - | 底部按钮区域 |

## 主题定制

通过 `createTheme` 或 `ThemeProvider` 自定义主题变量，可以调整组件的颜色、字体、间距等样式。

```tsx live-codeblock
import { createTheme, ThemeProvider } from 'orva-ui';

const theme = createTheme({
  modal: {
    borderRadius: '16px',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
  },
});
```

## 注意事项

- 请确保在 `ThemeProvider` 包裹下使用组件以获得完整的主题支持
- 使用受控模式时，请同时处理 `visible` 和 `onClose`
- 表单对话框建议使用 `Form.useForm()` 获取表单实例
## 相关组件

以下是与当前组件相关的其他组件，可能在使用时搭配使用：

| 组件 | 说明 |
|------|------|
| [Drawer](drawer) | 侧边抽屉 |
| [Dialog](dialog) | 组件 |
