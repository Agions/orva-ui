# Textarea 文本域

**Related Components:** [Input](./input), [Form](./form)


Textarea 组件用于多行文本输入。支持字数统计、自动高度、禁用等。

## 引入

```tsx live-codeblock
import { Textarea } from 'orva-ui';
// 或按需导入
import { Textarea } from 'orva-ui/data-entry';
```

## 基本使用

```tsx live-codeblock
import React, { useState } from 'react';
import { Textarea } from 'orva-ui';

export default () => {
  const [value, setValue] = useState('');
  
  return (
    <Textarea 
      value={value} 
      onChange={(e) => setValue(e.target.value)} 
      placeholder="请输入内容"
    />
  );
};
```

## 使用示例

### 基础文本域

```tsx live-codeblock
import React, { useState } from 'react';
import { Textarea } from 'orva-ui';

export default () => {
  const [value, setValue] = useState('');
  
  return (
    <Textarea 
      value={value} 
      onChange={(e) => setValue(e.target.value)} 
      placeholder="请输入多行文本"
      rows={4}
    />
  );
};
```

### 带字数统计

```tsx live-codeblock
import React, { useState } from 'react';
import { Textarea } from 'orva-ui';

export default () => {
  const [value, setValue] = useState('');
  
  return (
    <Textarea 
      value={value} 
      onChange={(e) => setValue(e.target.value)} 
      placeholder="请输入内容（最多 500 字）"
      rows={4}
      maxLength={500}
      showCount
    />
  );
};
```

### 自动高度

```tsx live-codeblock
import React, { useState } from 'react';
import { Textarea } from 'orva-ui';

export default () => {
  const [value, setValue] = useState('');
  
  return (
    <Textarea 
      value={value} 
      onChange={(e) => setValue(e.target.value)} 
      placeholder="输入时自动调整高度"
      autoSize
      maxRows={6}
      minRows={2}
    />
  );
};
```

### 禁用状态

```tsx live-codeblock
import React, { useState } from 'react';
import { Textarea } from 'orva-ui';

export default () => (
  <Textarea 
    disabled 
    placeholder="禁用状态"
    defaultValue="不可编辑的内容"
    rows={4}
  />
);
```

### 只读状态

```tsx live-codeblock
import React, { useState } from 'react';
import { Textarea } from 'orva-ui';

export default () => (
  <Textarea 
    readOnly 
    placeholder="只读状态"
    defaultValue="不可编辑但可选择的内容"
    rows={4}
  />
);
```

### 带前缀/后缀

```tsx live-codeblock
import React, { useState } from 'react';
import { Textarea, Icon } from 'orva-ui';

export default () => {
  const [value, setValue] = useState('');
  
  return (
    <Textarea 
      value={value} 
      onChange={(e) => setValue(e.target.value)} 
      placeholder="请输入内容"
      prefix={<Icon name="mdi:comment" />}
      suffix={<Icon name="mdi:information" />}
      rows={4}
    />
  );
};
```

### 尺寸

```tsx live-codeblock
import React, { useState } from 'react';
import { Textarea } from 'orva-ui';

export default () => {
  const [value1, setValue1] = useState('');
  const [value2, setValue2] = useState('');
  const [value3, setValue3] = useState('');
  
  return (
    <>
      <Textarea 
        size="sm"
        value={value1} 
        onChange={(e) => setValue1(e.target.value)} 
        placeholder="小尺寸"
        rows={3}
      />
      <Textarea 
        size="md"
        value={value2} 
        onChange={(e) => setValue2(e.target.value)} 
        placeholder="中尺寸"
        rows={4}
      />
      <Textarea 
        size="lg"
        value={value3} 
        onChange={(e) => setValue3(e.target.value)} 
        placeholder="大尺寸"
        rows={5}
      />
    </>
  );
};
```

### 错误状态

```tsx live-codeblock
import React, { useState } from 'react';
import { Textarea } from 'orva-ui';

export default () => {
  const [value, setValue] = useState('');
  const [error, setError] = useState(false);
  
  return (
    <>
      <Textarea 
        value={value} 
        onChange={(e) => {
          setValue(e.target.value);
          setError(e.target.value.length < 10);
        }} 
        placeholder="至少 10 个字符"
        rows={4}
        status={error ? 'error' : undefined}
        help={error ? '内容过短' : ''}
      />
    </>
  );
};
```

## Props

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| value | string | - | 值（受控） |
| defaultValue | string | - | 默认值 |
| placeholder | string | - | 占位符 |
| rows | number | `4` | 行数 |
| autoSize | boolean | `false` | 是否自动调整高度 |
| minRows | number | `2` | 最小行数 |
| maxRows | number | `6` | 最大行数 |
| maxLength | number | - | 最大字符数 |
| showCount | boolean | `false` | 是否显示字数统计 |
| disabled | boolean | `false` | 是否禁用 |
| readOnly | boolean | `false` | 是否只读 |
| prefix | ReactNode | - | 前缀内容 |
| suffix | ReactNode | - | 后缀内容 |
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | 尺寸 |
| status | `'error' \| 'warning'` | - | 状态 |
| help | ReactNode | - | 帮助文本 |
| onChange | `(e: ChangeEvent) => void` | - | 值变化回调 |
| onFocus | `(e: FocusEvent) => void` | - | 聚焦回调 |
| onBlur | `(e: FocusEvent) => void` | - | 失焦回调 |
| className | string | - | 自定义类名 |
| style | CSSProperties | - | 自定义样式 |

## 注意事项

- 请确保在 `ThemeProvider` 包裹下使用组件以获得完整的主题支持
- `autoSize` 为 `true` 时忽略 `rows` 属性
- 受控组件请使用 `value` + `onChange`
## 相关组件

以下是与当前组件相关的其他组件，可能在使用时搭配使用：

| 组件 | 说明 |
|------|------|
| [Input](input) | 文本输入 |
| [Form](form) | 表单容器 |
