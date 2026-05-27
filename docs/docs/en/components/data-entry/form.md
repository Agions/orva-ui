# Form

**Related Components:** [Input](./input), [Select](./select), [Checkbox](./checkbox)


Form Form component for collecting、validating and submitting user input data. Built-in form validation、Field Management、Layout Configuration, etc.Feature. 

## Introduction

```tsx live-codeblock
import { Form } from 'orva-ui';
// 或按需导入
import { Form } from 'orva-ui/data-entry';
```

## Basic Usage

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
        <Input placeholder="请Input用户名" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">提交</Button>
      </Form.Item>
    </Form>
  );
};
```

## Examples

### Basic Form

```tsx live-codeblock
import React, { useRef, useState } from 'react';
import { Form, Input, Button } from 'orva-ui';

export default () => {
  const onFinish = (values: any) => {
    console.log('提交值:', values);
  };
  
  return (
    <Form onFinish={onFinish} layout="vertical">
      <Form.Item name="username" label="用户名" rules={[{ required: true, message: '请Input用户名' }]}>
        <Input placeholder="请Input用户名" />
      </Form.Item>
      <Form.Item name="email" label="邮箱" rules={[{ required: true, type: 'email', message: '请Input有效邮箱' }]}>
        <Input placeholder="请Input邮箱" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">提交</Button>
      </Form.Item>
    </Form>
  );
};
```

### Form Validation

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
          { required: true, message: '请Input用户名' },
          { min: 3, message: '至少 3 个字符' },
          { max: 20, message: '最多 20 个字符' },
        ]}
      >
        <Input placeholder="请Input用户名" />
      </Form.Item>
      <Form.Item 
        name="password" 
        label="密码" 
        rules={[
          { required: true, message: '请Input密码' },
          { min: 6, message: '至少 6 个字符' },
        ]}
      >
        <Input type="password" placeholder="请Input密码" />
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

### horizontalLayout

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
        <Input placeholder="请Input用户名" />
      </Form.Item>
      <Form.Item name="email" label="邮箱" rules={[{ required: true, type: 'email' }]}>
        <Input placeholder="请Input邮箱" />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 6 }}>
        <Button type="primary" htmlType="submit">提交</Button>
      </Form.Item>
    </Form>
  );
};
```

### InlineLayout

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

### 多ColumnForm

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

### disabledForm

```tsx live-codeblock
import React, { useRef, useState } from 'react';
import { Form, Input, Button } from 'orva-ui';

export default () => {
  const [disabled, setDisabled] = useState(false);
  
  return (
    <>
      <Button onClick={() => setDisabled(!disabled)}>
        {disabled ? '启用Form' : 'disabledForm'}
      </Button>
      <Form disabled={disabled} layout="vertical">
        <Form.Item name="username" label="用户名">
          <Input placeholder="请Input用户名" />
        </Form.Item>
        <Form.Item name="email" label="邮箱">
          <Input placeholder="请Input邮箱" />
        </Form.Item>
      </Form>
    </>
  );
};
```

### FormReset

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
          <Input placeholder="请Input用户名" />
        </Form.Item>
        <Form.Item name="email" label="邮箱">
          <Input placeholder="请Input邮箱" />
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

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| initialValues | Record<string, any> | - | InitialValue |
| layout | `'vertical' \| 'horizontal' \| 'inline'` | `'vertical'` | LayoutMode |
| labelCol | ColProps | - | Tab/LabelColumn config |
| wrapperCol | ColProps | - | ContentColumn config |
| disabled | boolean | `false` | Whetherdisabled |
| onFinish | `(values: any) => void` | - | Submit handler |
| onFinishFailed | `(errorInfo: any) => void` | - | SubmitFailureCallback |
| className | string | - | Custom class name |
| style | CSSProperties | - | Custom Style |

### Form.Item

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| name | string | - | Field名 |
| label | ReactNode | - | Tab/Label |
| rules | ValidationRule[] | - | Validation rules |
| initialValue | any | - | InitialValue |
| required | boolean | - | WhetherRequired |
| help | ReactNode | - | Help text |
| extra | ReactNode | - | ExtraDescription |
| validateStatus | `'success' \| 'warning' \| 'error' \| 'validating'` | - | Validationstatus |
| className | string | - | Custom class name |
| style | CSSProperties | - | Custom Style |

## Notes

- Ensure the component is wrapped in `ThemeProvider` for full theme support
- `rules` SupportsMultipleValidation rules
- For controlled components, use `formRef` ManageFormstatus
## Related Components

The following components are related and may be used together:

| Component | Description |
|-----------|-------------|
| [Input](input) | TextInput |
| [Select](select) | Dropdown select |
| [Checkbox](checkbox) | multiple selectionInput |
| [Radio](radio) | Single selectInput |
