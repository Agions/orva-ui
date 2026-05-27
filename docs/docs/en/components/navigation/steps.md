# Steps

**Related Components:** [Form](./form), [Wizard](./wizard)


Steps Steps component for guiding users through step-by-step tasks. Supports horizontal、vertical、带icon、status, etc.. 

## Introduction

```tsx live-codeblock
import { Steps } from 'orva-ui';
// 或按需导入
import { Steps } from 'orva-ui/navigation';
```

## Basic Usage

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

## Examples

### Basic Steps条

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

### 带description

```tsx live-codeblock
import React, { useState } from 'react';
import { Steps } from 'orva-ui';

export default () => {
  const items = [
    { title: '步骤 1', description: 'description 1' },
    { title: '步骤 2', description: 'description 2' },
    { title: '步骤 3', description: 'description 3' },
  ];
  
  return <Steps current={1} items={items} />;
};
```

### 带icon

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

### verticalSteps条

```tsx live-codeblock
import React, { useState } from 'react';
import { Steps } from 'orva-ui';

export default () => {
  const items = [
    { title: '步骤 1', description: 'description 1' },
    { title: '步骤 2', description: 'description 2' },
    { title: '步骤 3', description: 'description 3' },
  ];
  
  return (
    <div style={{ width: 200 }}>
      <Steps current={1} items={items} direction="vertical" />
    </div>
  );
};
```

### Stepsstatus

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

### errorstatus

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

### CustomNode

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

### 点击Jump

```tsx live-codeblock
import React, { useState } from 'react';
import { Steps } from 'orva-ui';

export default () => {
  const [current, setCurrent] = useState(1);
  
  const items = [
    { title: '步骤 1', description: 'description 1' },
    { title: '步骤 2', description: 'description 2' },
    { title: '步骤 3', description: 'description 3' },
  ];
  
  return <Steps current={current} items={items} onClick={(index) => setCurrent(index)} />;
};
```

### CompleteFormProcess

```tsx live-codeblock
import React, { useState } from 'react';
import { Steps, Button, Input, Form } from 'orva-ui';

export default () => {
  const [current, setCurrent] = useState(0);
  
  const items = [
    { title: '账户信息', description: '填写Basic Info' },
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
                <Input placeholder="请Input用户名" />
              </Form.Item>
              <Form.Item label="邮箱">
                <Input placeholder="请Input邮箱" />
              </Form.Item>
            </Form>
          </div>
        )}
        
        {current === 1 && (
          <div>
            <h3>验证身份</h3>
            <Form>
              <Form.Item label="手机号">
                <Input placeholder="请Input手机号" />
              </Form.Item>
              <Form.Item label="验证码">
                <Input placeholder="请Input验证码" />
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

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| current | number | `0` | Current step（Controlled） |
| items | StepItem[] | - | Steps list |
| direction | `'horizontal' \| 'vertical'` | `'horizontal'` | Direction |
| size | `'small' \| 'default'` | `'default'` | sizes |
| onClick | `(index: number) => void` | - | Click callback |
| className | string | - | Custom class name |
| style | CSSProperties | - | Custom Style |

## StepItem

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| title | ReactNode | Title |
| description | ReactNode | description |
| icon | string | iconName |
| node | ReactNode | CustomNode |
| status | `'wait' \| 'process' \| 'finish' \| 'error'` | status |

## Notes

- Ensure the component is wrapped in `ThemeProvider` for full theme support
- `current` controlled value, 需Used with `onClick` Use
- `status` 可CustomEachSteps的status
## Related Components

The following components are related and may be used together:

| Component | Description |
|-----------|-------------|
| [Form](form) | FormContainer |
| [Wizard](wizard) | Component |
