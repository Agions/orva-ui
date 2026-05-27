# InputNumber 数字输入框

**Related Components:** [Slider](./slider), [Rate](./rate)


InputNumber 组件用于数字输入。支持加减按钮、步长、范围限制、格式化等。

## 引入

```tsx live-codeblock
import { InputNumber } from 'orva-ui';
// 或按需导入
import { InputNumber } from 'orva-ui/form';
```

## 基本使用

```tsx live-codeblock
import React, { useState } from 'react';
import { InputNumber } from 'orva-ui';

export default () => {
  const [value, setValue] = useState(0);
  
  return <InputNumber value={value} onChange={setValue} />;
};
```

## 使用示例

### 基础数字输入

```tsx live-codeblock
import React, { useState } from 'react';
import { InputNumber } from 'orva-ui';

export default () => {
  const [value, setValue] = useState(0);
  
  return <InputNumber value={value} onChange={setValue} placeholder="请输入数字" style={{ width: 150 }} />;
};
```

### 带加减按钮

```tsx live-codeblock
import React, { useState } from 'react';
import { InputNumber } from 'orva-ui';

export default () => {
  const [value, setValue] = useState(0);
  
  return <InputNumber value={value} onChange={setValue} controls style={{ width: 150 }} />;
};
```

### 步长设置

```tsx live-codeblock
import React, { useState } from 'react';
import { InputNumber } from 'orva-ui';

export default () => {
  const [value, setValue] = useState(0);
  
  return <InputNumber value={value} onChange={setValue} step={10} style={{ width: 150 }} />;
};
```

### 范围限制

```tsx live-codeblock
import React, { useState } from 'react';
import { InputNumber } from 'orva-ui';

export default () => {
  const [value, setValue] = useState(50);
  
  return <InputNumber value={value} onChange={setValue} min={0} max={100} style={{ width: 150 }} />;
};
```

### 小数精度

```tsx live-codeblock
import React, { useState } from 'react';
import { InputNumber } from 'orva-ui';

export default () => {
  const [value, setValue] = useState(0);
  
  return <InputNumber value={value} onChange={setValue} precision={2} style={{ width: 150 }} />;
};
```

### 格式化显示

```tsx live-codeblock
import React, { useState } from 'react';
import { InputNumber } from 'orva-ui';

export default () => {
  const [value, setValue] = useState(1000);
  
  return <InputNumber value={value} onChange={setValue} formatter={v => '¥ ' + v + ''.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} parser={v => v?.replace(/[¥\s,]/g, '')} style={{ width: 150 }} />;
};
```

### 禁用状态

```tsx live-codeblock
import React, { useState } from 'react';
import { InputNumber } from 'orva-ui';

export default () => {
  const [value, setValue] = useState(0);
  
  return <InputNumber value={value} onChange={setValue} disabled style={{ width: 150 }} />;
};
```

### 尺寸

```tsx live-codeblock
import React, { useState } from 'react';
import { InputNumber } from 'orva-ui';

export default () => {
  const [value1, setValue1] = useState(0);
  const [value2, setValue2] = useState(0);
  const [value3, setValue3] = useState(0);
  
  return (
    <>
      <InputNumber value={value1} onChange={setValue1} size="sm" style={{ width: 150, marginRight: 8 }} />
      <InputNumber value={value2} onChange={setValue2} size="md" style={{ width: 150, marginRight: 8 }} />
      <InputNumber value={value3} onChange={setValue3} size="lg" style={{ width: 150 }} />
    </>
  );
};
```

### 错误状态

```tsx live-codeblock
import React, { useState } from 'react';
import { InputNumber } from 'orva-ui';

export default () => {
  const [value, setValue] = useState(0);
  const [error, setError] = useState(false);
  
  return (
    <InputNumber 
      value={value} 
      onChange={(v) => {
        setValue(v);
        setError(v < 0);
      }} 
      status={error ? 'error' : undefined}
      help={error ? '数值不能为负' : ''}
      style={{ width: 150 }}
    />
  );
};
```

## Props

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| value | number | - | 值（受控） |
| defaultValue | number | - | 默认值 |
| placeholder | string | - | 占位符 |
| min | number | `-Infinity` | 最小值 |
| max | number | `Infinity` | 最大值 |
| step | number | `1` | 步长 |
| precision | number | - | 小数精度 |
| controls | boolean | `true` | 是否显示加减按钮 |
| disabled | boolean | `false` | 是否禁用 |
| readOnly | boolean | `false` | 是否只读 |
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | 尺寸 |
| status | `'error' \| 'warning'` | - | 状态 |
| help | ReactNode | - | 帮助文本 |
| formatter | `(value: number) => string` | - | 格式化函数 |
| parser | `(value: string) => number` | - | 解析函数 |
| onChange | `(value: number) => void` | - | 值变化回调 |
| onFocus | `(e: FocusEvent) => void` | - | 聚焦回调 |
| onBlur | `(e: FocusEvent) => void` | - | 失焦回调 |
| className | string | - | 自定义类名 |
| style | CSSProperties | - | 自定义样式 |

## 注意事项

- 请确保在 `ThemeProvider` 包裹下使用组件以获得完整的主题支持
- `formatter` 和 `parser` 用于自定义显示格式
- 受控组件请使用 `value` + `onChange`
## 相关组件

以下是与当前组件相关的其他组件，可能在使用时搭配使用：

| 组件 | 说明 |
|------|------|
| [Slider](slider) | 滑动选择 |
| [Rate](rate) | 评分输入 |
