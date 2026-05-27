# Space 间距

**Related Components:** [Divider](./divider), [Layout](./layout)


Space 组件用于在元素之间添加间距。支持水平、垂直、自动换行等。

## 引入

```tsx live-codeblock
import { Space } from 'orva-ui';
// 或按需导入
import { Space } from 'orva-ui/layout';
```

## 基本使用

```tsx live-codeblock
import React from 'react';
import { Space, Button } from 'orva-ui';

export default () => {
  return (
    <Space>
      <Button>按钮 1</Button>
      <Button>按钮 2</Button>
      <Button>按钮 3</Button>
    </Space>
  );
};
```

## 使用示例

### 基础间距

```tsx live-codeblock
import React from 'react';
import { Space, Button } from 'orva-ui';

export default () => {
  return (
    <Space>
      <Button>按钮 1</Button>
      <Button>按钮 2</Button>
      <Button>按钮 3</Button>
    </Space>
  );
};
```

### 自定义间距

```tsx live-codeblock
import React from 'react';
import { Space, Button } from 'orva-ui';

export default () => {
  return (
    <Space size={16}>
      <Button>按钮 1</Button>
      <Button>按钮 2</Button>
      <Button>按钮 3</Button>
    </Space>
  );
};
```

### 大间距

```tsx live-codeblock
import React from 'react';
import { Space, Button } from 'orva-ui';

export default () => {
  return (
    <Space size="large">
      <Button>按钮 1</Button>
      <Button>按钮 2</Button>
      <Button>按钮 3</Button>
    </Space>
  );
};
```

### 垂直排列

```tsx live-codeblock
import React from 'react';
import { Space, Button } from 'orva-ui';

export default () => {
  return (
    <Space direction="vertical">
      <Button style={{ width: 120 }}>按钮 1</Button>
      <Button style={{ width: 120 }}>按钮 2</Button>
      <Button style={{ width: 120 }}>按钮 3</Button>
    </Space>
  );
};
```

### 自动换行

```tsx live-codeblock
import React from 'react';
import { Space, Tag } from 'orva-ui';

export default () => {
  const tags = Array.from({ length: 10 }, (_, i) => '标签 ' + i + 1 + '');
  
  return (
    <Space wrap>
      {tags.map(tag => (
        <Tag key={tag}>{tag}</Tag>
      ))}
    </Space>
  );
};
```

### 对齐方式

```tsx live-codeblock
import React from 'react';
import { Space, Button, Input } from 'orva-ui';

export default () => {
  return (
    <Space align="center">
      <span>标签</span>
      <Input placeholder="请输入" style={{ width: 200 }} />
      <Button type="primary">提交</Button>
    </Space>
  );
};
```

### 分隔线

```tsx live-codeblock
import React from 'react';
import { Space, Button, Divider } from 'orva-ui';

export default () => {
  return (
    <Space split={<Divider vertical />}>
      <Button>按钮 1</Button>
      <Button>按钮 2</Button>
      <Button>按钮 3</Button>
    </Space>
  );
};
```

### 嵌套使用

```tsx live-codeblock
import React from 'react';
import { Space, Button, Input } from 'orva-ui';

export default () => {
  return (
    <Space>
      <Space>
        <Input placeholder="用户名" />
        <Input placeholder="密码" type="password" />
      </Space>
      <Button type="primary">登录</Button>
    </Space>
  );
};
```

### 响应式间距

```tsx live-codeblock
import React from 'react';
import { Space, Button } from 'orva-ui';

export default () => {
  return (
    <Space size={[8, 16]}>
      <Button>按钮 1</Button>
      <Button>按钮 2</Button>
      <Button>按钮 3</Button>
    </Space>
  );
};
```

## Props

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| size | number / 'small' / 'medium' / 'large' / [number, number] | `'medium'` | 间距大小 |
| direction | `'horizontal' \| 'vertical'` | `'horizontal'` | 排列方向 |
| align | `'start' \| 'end' \| 'center' \| 'baseline'` | - | 对齐方式 |
| wrap | boolean | `false` | 是否换行 |
| split | ReactNode | - | 分隔元素 |
| className | string | - | 自定义类名 |
| style | CSSProperties | - | 自定义样式 |

## 注意事项

- 请确保在 `ThemeProvider` 包裹下使用组件以获得完整的主题支持
- `size` 支持数组格式 `[水平间距, 垂直间距]`
- `split` 用于在子元素之间添加分隔符
## 相关组件

以下是与当前组件相关的其他组件，可能在使用时搭配使用：

| 组件 | 说明 |
|------|------|
| [Divider](divider) | 视觉分隔 |
| [Layout](layout) | 页面布局 |
