# Form 表单

**Related Components:** [Input](./input), [Select](./select), [Checkbox](./checkbox)


Form 组件用于收集、校验和提交用户输入的数据。内置表单验证、字段管理、布局配置等功能。

## 引入

```tsx live-codeblock
import { Form } from 'orva-ui';
// 或按需导入
import { Form } from 'orva-ui/data-entry';
```

## 基本使用

```tsx live-codeblock
import React, { useRef, useState } from 'react';
import { Form, Input, Button } from 'orva-ui';

export default () => {
  const onFinish = (values: any) => {
    console.log('提交值:', values);
  };
  
  return (
    <Form onFinish={onFinish}>
      <Form.Item name="username" label="用户名" rules={[{ required: true }]}>
        <Input placeholder="请输入用户名" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">提交</Button>
      </Form.Item>
    </Form>
  );
};
```

## 使用示例

### 基础表单

```tsx live-codeblock
import React, { useRef, useState } from 'react';
import { Form, Input, Button } from 'orva-ui';

export default () => {
  const onFinish = (values: any) => {
    console.log('提交值:', values);
  };
  
  return (
    <Form onFinish={onFinish} layout="vertical">
      <Form.Item name="username" label="用户名" rules={[{ required: true, message: '请输入用户名' }]}>
        <Input placeholder="请输入用户名" />
      </Form.Item>
      <Form.Item name="email" label="邮箱" rules={[{ required: true, type: 'email', message: '请输入有效邮箱' }]}>
        <Input placeholder="请输入邮箱" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">提交</Button>
      </Form.Item>
    </Form>
  );
};
```

### 表单验证

```tsx live-codeblock
import React, { useRef, useState } from 'react';
import { Form, Input, Button } from 'orva-ui';

export default () => {
  const onFinish = (values: any) => {
    console.log('提交值:', values);
  };
  
  return (
    <Form onFinish={onFinish} layout="vertical">
      <Form.Item 
        name="username" 
        label="用户名" 
        rules={[
          { required: true, message: '请输入用户名' },
          { min: 3, message: '至少 3 个字符' },
          { max: 20, message: '最多 20 个字符' },
        ]}
      >
        <Input placeholder="请输入用户名" />
      </Form.Item>
      <Form.Item 
        name="password" 
        label="密码" 
        rules={[
          { required: true, message: '请输入密码' },
          { min: 6, message: '至少 6 个字符' },
        ]}
      >
        <Input type="password" placeholder="请输入密码" />
      </Form.Item>
      <Form.Item 
        name="confirmPassword" 
        label="确认密码" 
        rules={[
          { required: true, message: '请确认密码' },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('两次密码不一致'));
            },
          }),
        ]}
      >
        <Input type="password" placeholder="请确认密码" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">提交</Button>
      </Form.Item>
    </Form>
  );
};
```

### 水平布局

```tsx live-codeblock
import React, { useRef, useState } from 'react';
import { Form, Input, Button } from 'orva-ui';

export default () => {
  const onFinish = (values: any) => {
    console.log('提交值:', values);
  };
  
  return (
    <Form onFinish={onFinish} layout="horizontal" labelCol={{ span: 6 }}>
      <Form.Item name="username" label="用户名" rules={[{ required: true }]}>
        <Input placeholder="请输入用户名" />
      </Form.Item>
      <Form.Item name="email" label="邮箱" rules={[{ required: true, type: 'email' }]}>
        <Input placeholder="请输入邮箱" />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 6 }}>
        <Button type="primary" htmlType="submit">提交</Button>
      </Form.Item>
    </Form>
  );
};
```

### 内联布局

```tsx live-codeblock
import React, { useRef, useState } from 'react';
import { Form, Input, Button } from 'orva-ui';

export default () => {
  const onFinish = (values: any) => {
    console.log('提交值:', values);
  };
  
  return (
    <Form onFinish={onFinish} layout="inline">
      <Form.Item name="username" label="用户名" rules={[{ required: true }]}>
        <Input placeholder="用户名" />
      </Form.Item>
      <Form.Item name="password" label="密码" rules={[{ required: true }]}>
        <Input type="password" placeholder="密码" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">登录</Button>
      </Form.Item>
    </Form>
  );
};
```

### 多列表单

```tsx live-codeblock
import React, { useRef, useState } from 'react';
import { Form, Input, Row, Col } from 'orva-ui';

export default () => {
  const onFinish = (values: any) => {
    console.log('提交值:', values);
  };
  
  return (
    <Form onFinish={onFinish} layout="vertical">
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item name="firstName" label="名" rules={[{ required: true }]}>
            <Input placeholder="名" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="lastName" label="姓" rules={[{ required: true }]}>
            <Input placeholder="姓" />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item name="email" label="邮箱" rules={[{ required: true, type: 'email' }]}>
        <Input placeholder="邮箱" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">提交</Button>
      </Form.Item>
    </Form>
  );
};
```

### 禁用表单

```tsx live-codeblock
import React, { useRef, useState } from 'react';
import { Form, Input, Button } from 'orva-ui';

export default () => {
  const [disabled, setDisabled] = useState(false);
  
  return (
    <>
      <Button onClick={() => setDisabled(!disabled)}>
        {disabled ? '启用表单' : '禁用表单'}
      </Button>
      <Form disabled={disabled} layout="vertical">
        <Form.Item name="username" label="用户名">
          <Input placeholder="请输入用户名" />
        </Form.Item>
        <Form.Item name="email" label="邮箱">
          <Input placeholder="请输入邮箱" />
        </Form.Item>
      </Form>
    </>
  );
};
```

### 表单重置

```tsx live-codeblock
import React, { useRef, useState } from 'react';
import { Form, Input, Button } from 'orva-ui';

export default () => {
  const formRef = useRef(null);
  
  const onFinish = (values: any) => {
    console.log('提交值:', values);
  };
  
  return (
    <>
      <Button onClick={() => formRef.current?.resetFields()}>重置</Button>
      <Form ref={formRef} onFinish={onFinish} layout="vertical">
        <Form.Item name="username" label="用户名">
          <Input placeholder="请输入用户名" />
        </Form.Item>
        <Form.Item name="email" label="邮箱">
          <Input placeholder="请输入邮箱" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">提交</Button>
        </Form.Item>
      </Form>
    </>
  );
};
```

## Props

### Form

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| initialValues | Record<string, any> | - | 初始值 |
| layout | `'vertical' \| 'horizontal' \| 'inline'` | `'vertical'` | 布局模式 |
| labelCol | ColProps | - | 标签列配置 |
| wrapperCol | ColProps | - | 内容列配置 |
| disabled | boolean | `false` | 是否禁用 |
| onFinish | `(values: any) => void` | - | 提交回调 |
| onFinishFailed | `(errorInfo: any) => void` | - | 提交失败回调 |
| className | string | - | 自定义类名 |
| style | CSSProperties | - | 自定义样式 |

### Form.Item

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| name | string | - | 字段名 |
| label | ReactNode | - | 标签 |
| rules | ValidationRule[] | - | 验证规则 |
| initialValue | any | - | 初始值 |
| required | boolean | - | 是否必填 |
| help | ReactNode | - | 帮助文本 |
| extra | ReactNode | - | 额外说明 |
| validateStatus | `'success' \| 'warning' \| 'error' \| 'validating'` | - | 验证状态 |
| className | string | - | 自定义类名 |
| style | CSSProperties | - | 自定义样式 |

## 注意事项

- 请确保在 `ThemeProvider` 包裹下使用组件以获得完整的主题支持
- `rules` 支持多种验证规则
- 受控组件请使用 `formRef` 管理表单状态
## 相关组件

以下是与当前组件相关的其他组件，可能在使用时搭配使用：

| 组件 | 说明 |
|------|------|
| [Input](input) | 文本输入 |
| [Select](select) | 下拉选择 |
| [Checkbox](checkbox) | 多选输入 |
| [Radio](radio) | 单选输入 |
