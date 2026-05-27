# Steps 步骤条

**Related Components:** [Form](./form), [Wizard](./wizard)


Steps 组件用于引导用户按步骤完成任务。支持水平、垂直、带图标、状态等。

## 引入

```tsx live-codeblock
import { Steps } from 'orva-ui';
// 或按需导入
import { Steps } from 'orva-ui/navigation';
```

## 基本使用

```tsx live-codeblock
import React, { useState } from 'react';
import { Steps } from 'orva-ui';

export default () => {
  const items = [
    { title: '步骤 1' },
    { title: '步骤 2' },
    { title: '步骤 3' },
  ];
  
  return <Steps current={1} items={items} />;
};
```

## 使用示例

### 基础步骤条

```tsx live-codeblock
import React, { useState } from 'react';
import { Steps } from 'orva-ui';

export default () => {
  const items = [
    { title: '步骤 1' },
    { title: '步骤 2' },
    { title: '步骤 3' },
  ];
  
  return <Steps current={1} items={items} />;
};
```

### 带描述

```tsx live-codeblock
import React, { useState } from 'react';
import { Steps } from 'orva-ui';

export default () => {
  const items = [
    { title: '步骤 1', description: '描述 1' },
    { title: '步骤 2', description: '描述 2' },
    { title: '步骤 3', description: '描述 3' },
  ];
  
  return <Steps current={1} items={items} />;
};
```

### 带图标

```tsx live-codeblock
import React, { useState } from 'react';
import { Steps, Icon } from 'orva-ui';

export default () => {
  const items = [
    { title: '步骤 1', icon: 'mdi:account' },
    { title: '步骤 2', icon: 'mdi:credit-card' },
    { title: '步骤 3', icon: 'mdi:check-circle' },
  ];
  
  return <Steps current={1} items={items} />;
};
```

### 垂直步骤条

```tsx live-codeblock
import React, { useState } from 'react';
import { Steps } from 'orva-ui';

export default () => {
  const items = [
    { title: '步骤 1', description: '描述 1' },
    { title: '步骤 2', description: '描述 2' },
    { title: '步骤 3', description: '描述 3' },
  ];
  
  return (
    <div style={{ width: 200 }}>
      <Steps current={1} items={items} direction="vertical" />
    </div>
  );
};
```

### 步骤状态

```tsx live-codeblock
import React, { useState } from 'react';
import { Steps } from 'orva-ui';

export default () => {
  const items = [
    { title: '步骤 1', status: 'finish' },
    { title: '步骤 2', status: 'process' },
    { title: '步骤 3', status: 'wait' },
    { title: '步骤 4', status: 'wait' },
  ];
  
  return <Steps current={1} items={items} />;
};
```

### 错误状态

```tsx live-codeblock
import React, { useState } from 'react';
import { Steps } from 'orva-ui';

export default () => {
  const items = [
    { title: '步骤 1', status: 'finish' },
    { title: '步骤 2', status: 'error' },
    { title: '步骤 3', status: 'wait' },
  ];
  
  return <Steps current={1} items={items} />;
};
```

### 自定义节点

```tsx live-codeblock
import React, { useState } from 'react';
import { Steps, Badge } from 'orva-ui';

export default () => {
  const items = [
    { title: '步骤 1', node: <Badge color="#3b82f6">1</Badge> },
    { title: '步骤 2', node: <Badge color="#10b981">2</Badge> },
    { title: '步骤 3', node: <Badge color="#f59e0b">3</Badge> },
  ];
  
  return <Steps current={1} items={items} />;
};
```

### 点击跳转

```tsx live-codeblock
import React, { useState } from 'react';
import { Steps } from 'orva-ui';

export default () => {
  const [current, setCurrent] = useState(1);
  
  const items = [
    { title: '步骤 1', description: '描述 1' },
    { title: '步骤 2', description: '描述 2' },
    { title: '步骤 3', description: '描述 3' },
  ];
  
  return <Steps current={current} items={items} onClick={(index) => setCurrent(index)} />;
};
```

### 完整表单流程

```tsx live-codeblock
import React, { useState } from 'react';
import { Steps, Button, Input, Form } from 'orva-ui';

export default () => {
  const [current, setCurrent] = useState(0);
  
  const items = [
    { title: '账户信息', description: '填写基本信息' },
    { title: '验证身份', description: '手机验证' },
    { title: '完成', description: '注册成功' },
  ];
  
  const handleNext = () => {
    if (current < items.length - 1) {
      setCurrent(current + 1);
    }
  };
  
  const handlePrev = () => {
    if (current > 0) {
      setCurrent(current - 1);
    }
  };
  
  return (
    <div style={{ maxWidth: 500, margin: '0 auto' }}>
      <Steps current={current} items={items} />
      
      <div style={{ padding: 24 }}>
        {current === 0 && (
          <div>
            <h3>账户信息</h3>
            <Form>
              <Form.Item label="用户名">
                <Input placeholder="请输入用户名" />
              </Form.Item>
              <Form.Item label="邮箱">
                <Input placeholder="请输入邮箱" />
              </Form.Item>
            </Form>
          </div>
        )}
        
        {current === 1 && (
          <div>
            <h3>验证身份</h3>
            <Form>
              <Form.Item label="手机号">
                <Input placeholder="请输入手机号" />
              </Form.Item>
              <Form.Item label="验证码">
                <Input placeholder="请输入验证码" />
              </Form.Item>
            </Form>
          </div>
        )}
        
        {current === 2 && (
          <div style={{ textAlign: 'center', padding: 40 }}>
            <h3>注册成功！</h3>
            <p>您的账户已创建完成</p>
          </div>
        )}
      </div>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 24 }}>
        <Button onClick={handlePrev} disabled={current === 0}>上一步</Button>
        <Button type="primary" onClick={handleNext} disabled={current === items.length - 1}>
          {current === items.length - 2 ? '完成' : '下一步'}
        </Button>
      </div>
    </div>
  );
};
```

## Props

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| current | number | `0` | 当前步骤（受控） |
| items | StepItem[] | - | 步骤列表 |
| direction | `'horizontal' \| 'vertical'` | `'horizontal'` | 方向 |
| size | `'small' \| 'default'` | `'default'` | 尺寸 |
| onClick | `(index: number) => void` | - | 点击回调 |
| className | string | - | 自定义类名 |
| style | CSSProperties | - | 自定义样式 |

## StepItem

| 属性名 | 类型 | 说明 |
|--------|------|------|
| title | ReactNode | 标题 |
| description | ReactNode | 描述 |
| icon | string | 图标名称 |
| node | ReactNode | 自定义节点 |
| status | `'wait' \| 'process' \| 'finish' \| 'error'` | 状态 |

## 注意事项

- 请确保在 `ThemeProvider` 包裹下使用组件以获得完整的主题支持
- `current` 为受控值，需配合 `onClick` 使用
- `status` 可自定义每个步骤的状态
## 相关组件

以下是与当前组件相关的其他组件，可能在使用时搭配使用：

| 组件 | 说明 |
|------|------|
| [Form](form) | 表单容器 |
| [Wizard](wizard) | 组件 |
