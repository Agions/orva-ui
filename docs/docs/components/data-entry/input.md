# Input 输入框

**Related Components:** [TextArea](./textarea), [AutoComplete](./autocomplete)


Related: [输入框](input), [文本域](textarea), [表单](form)


Input 组件用于接收用户输入的文本信息。支持多种类型、前缀后缀、清除按钮、字数统计等。

## 引入

```tsx live-codeblock
import { Input } from 'orva-ui';
// 或按需导入
import { Input } from 'orva-ui/data-entry';
```

## 基本使用

```tsx live-codeblock
import React, { useState } from 'react';
import { Input } from 'orva-ui';

export default () => {
  const [value, setValue] = useState('');
  
  return <Input value={value} onChange={(e) => setValue(e.target.value)} placeholder="请输入" />;
};
```

## 使用示例

### 基础输入框

```tsx live-codeblock
import React, { useState } from 'react';
import { Input } from 'orva-ui';

export default () => {
  const [value, setValue] = useState('');
  
  return <Input value={value} onChange={(e) => setValue(e.target.value)} placeholder="请输入内容" />;
};
```

### 带前缀/后缀

```tsx live-codeblock
import React, { useState } from 'react';
import { Input, Icon } from 'orva-ui';

export default () => {
  const [value, setValue] = useState('');
  
  return (
    <Input 
      value={value} 
      onChange={(e) => setValue(e.target.value)} 
      placeholder="请输入"
      prefix={<Icon name="mdi:magnify" />}
      suffix={<Icon name="mdi:information" />}
    />
  );
};
```

### 清除按钮

```tsx live-codeblock
import React, { useState } from 'react';
import { Input } from 'orva-ui';

export default () => {
  const [value, setValue] = useState('可清除的文本');
  
  return (
    <Input 
      value={value} 
      onChange={(e) => setValue(e.target.value)} 
      placeholder="请输入"
      allowClear
    />
  );
};
```

### 禁用状态

```tsx live-codeblock
import React, { useState } from 'react';
import { Input } from 'orva-ui';

export default () => {
  const [value, setValue] = useState('');
  
  return <Input value={value} onChange={(e) => setValue(e.target.value)} disabled placeholder="禁用状态" />;
};
```

### 只读状态

```tsx live-codeblock
import React, { useState } from 'react';
import { Input } from 'orva-ui';

export default () => {
  const [value, setValue] = useState('只读内容');
  
  return <Input value={value} onChange={(e) => setValue(e.target.value)} readOnly placeholder="只读状态" />;
};
```

### 密码输入框

```tsx live-codeblock
import React, { useState } from 'react';
import { Input } from 'orva-ui';

export default () => {
  const [value, setValue] = useState('');
  
  return <Input value={value} onChange={(e) => setValue(e.target.value)} type="password" placeholder="请输入密码" />;
};
```

### 搜索输入框

```tsx live-codeblock
import React, { useState } from 'react';
import { Input, Button, Icon } from 'orva-ui';

export default () => {
  const [value, setValue] = useState('');
  
  return (
    <Input 
      value={value} 
      onChange={(e) => setValue(e.target.value)} 
      placeholder="搜索..."
      prefix={<Icon name="mdi:magnify" />}
      suffix={
        <Button size="sm" onClick={() => console.log('搜索:', value)}>
          搜索
        </Button>
      }
    />
  );
};
```

### 尺寸

```tsx live-codeblock
import React, { useState } from 'react';
import { Input } from 'orva-ui';

export default () => {
  const [value1, setValue1] = useState('');
  const [value2, setValue2] = useState('');
  const [value3, setValue3] = useState('');
  
  return (
    <>
      <Input value={value1} onChange={(e) => setValue1(e.target.value)} size="sm" placeholder="小尺寸" style={{ marginBottom: 8 }} />
      <Input value={value2} onChange={(e) => setValue2(e.target.value)} size="md" placeholder="中尺寸" style={{ marginBottom: 8 }} />
      <Input value={value3} onChange={(e) => setValue3(e.target.value)} size="lg" placeholder="大尺寸" />
    </>
  );
};
```

### 错误状态

```tsx live-codeblock
import React, { useState } from 'react';
import { Input } from 'orva-ui';

export default () => {
  const [value, setValue] = useState('');
  const [error, setError] = useState(false);
  
  return (
    <Input 
      value={value} 
      onChange={(e) => {
        setValue(e.target.value);
        setError(e.target.value.length < 5);
      }} 
      placeholder="至少 5 个字符"
      status={error ? 'error' : undefined}
      help={error ? '内容过短' : ''}
    />
  );
};
```

### 字数统计

```tsx live-codeblock
import React, { useState } from 'react';
import { Input } from 'orva-ui';

export default () => {
  const [value, setValue] = useState('');
  
  return (
    <Input 
      value={value} 
      onChange={(e) => setValue(e.target.value)} 
      placeholder="最多 100 字"
      maxLength={100}
      showCount
    />
  );
};
```

## Props

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| value | string | - | 值（受控） |
| defaultValue | string | - | 默认值 |
| placeholder | string | - | 占位符 |
| type | `'text' \| 'password' \| 'search' \| 'tel' \| 'email' \| 'url'` | `'text'` | 输入类型 |
| prefix | ReactNode | - | 前缀内容 |
| suffix | ReactNode | - | 后缀内容 |
| allowClear | boolean | `false` | 是否显示清除按钮 |
| disabled | boolean | `false` | 是否禁用 |
| readOnly | boolean | `false` | 是否只读 |
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | 尺寸 |
| status | `'error' \| 'warning'` | - | 状态 |
| help | ReactNode | - | 帮助文本 |
| maxLength | number | - | 最大字符数 |
| showCount | boolean | `false` | 是否显示字数统计 |
| onChange | `(e: ChangeEvent) => void` | - | 值变化回调 |
| onFocus | `(e: FocusEvent) => void` | - | 聚焦回调 |
| onBlur | `(e: FocusEvent) => void` | - | 失焦回调 |
| className | string | - | 自定义类名 |
| style | CSSProperties | - | 自定义样式 |

## 注意事项

- 请确保在 `ThemeProvider` 包裹下使用组件以获得完整的主题支持
- 受控组件请使用 `value` + `onChange`
- `prefix` 和 `suffix` 可以是任意 ReactNode
## 相关组件

以下是与当前组件相关的其他组件，可能在使用时搭配使用：

| 组件 | 说明 |
|------|------|
| [TextArea](textarea) | 多行输入 |
| [AutoComplete](autocomplete) | 组件 |
