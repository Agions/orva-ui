# Textarea

**Related Components:** [Input](./input), [Form](./form)


Textarea Textarea component for multi-line text input. Supports character count、auto height、disabled, etc.. 

## Introduction

```tsx live-codeblock
import { Textarea } from 'orva-ui';
// 或按需导入
import { Textarea } from 'orva-ui/data-entry';
```

## Basic Usage

```tsx live-codeblock
import React, { useState } from 'react';
import { Textarea } from 'orva-ui';

export default () => {
  const [value, setValue] = useState('');
  
  return (
    <Textarea 
      value={value} 
      onChange={(e) => setValue(e.target.value)} 
      placeholder="请InputContent"
    />
  );
};
```

## Examples

### Basic Text域

```tsx live-codeblock
import React, { useState } from 'react';
import { Textarea } from 'orva-ui';

export default () => {
  const [value, setValue] = useState('');
  
  return (
    <Textarea 
      value={value} 
      onChange={(e) => setValue(e.target.value)} 
      placeholder="请Input多行Text"
      rows={4}
    />
  );
};
```

### 带Character Count

```tsx live-codeblock
import React, { useState } from 'react';
import { Textarea } from 'orva-ui';

export default () => {
  const [value, setValue] = useState('');
  
  return (
    <Textarea 
      value={value} 
      onChange={(e) => setValue(e.target.value)} 
      placeholder="请InputContent（最多 500 字）"
      rows={4}
      maxLength={500}
      showCount
    />
  );
};
```

### auto height

```tsx live-codeblock
import React, { useState } from 'react';
import { Textarea } from 'orva-ui';

export default () => {
  const [value, setValue] = useState('');
  
  return (
    <Textarea 
      value={value} 
      onChange={(e) => setValue(e.target.value)} 
      placeholder="Input时自动调整height"
      autoSize
      maxRows={6}
      minRows={2}
    />
  );
};
```

### disabledstatus

```tsx live-codeblock
import React, { useState } from 'react';
import { Textarea } from 'orva-ui';

export default () => (
  <Textarea 
    disabled 
    placeholder="disabledstatus"
    defaultValue="不可编辑的Content"
    rows={4}
  />
);
```

### Readonlystatus

```tsx live-codeblock
import React, { useState } from 'react';
import { Textarea } from 'orva-ui';

export default () => (
  <Textarea 
    readOnly 
    placeholder="只读status"
    defaultValue="不可编辑但可选择的Content"
    rows={4}
  />
);
```

### With prefix/Suffix

```tsx live-codeblock
import React, { useState } from 'react';
import { Textarea, Icon } from 'orva-ui';

export default () => {
  const [value, setValue] = useState('');
  
  return (
    <Textarea 
      value={value} 
      onChange={(e) => setValue(e.target.value)} 
      placeholder="请InputContent"
      prefix={<Icon name="mdi:comment" />}
      suffix={<Icon name="mdi:information" />}
      rows={4}
    />
  );
};
```

### sizes

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
        placeholder="小sizes"
        rows={3}
      />
      <Textarea 
        size="md"
        value={value2} 
        onChange={(e) => setValue2(e.target.value)} 
        placeholder="中sizes"
        rows={4}
      />
      <Textarea 
        size="lg"
        value={value3} 
        onChange={(e) => setValue3(e.target.value)} 
        placeholder="大sizes"
        rows={5}
      />
    </>
  );
};
```

### errorstatus

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
        help={error ? 'Content过短' : ''}
      />
    </>
  );
};
```

## Props

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| value | string | - | Value (controlled) |
| defaultValue | string | - | Default value |
| placeholder | string | - | Placeholder text |
| rows | number | `4` | Number of rows |
| autoSize | boolean | `false` | WhetherAuto调整height |
| minRows | number | `2` | MinNumber of rows |
| maxRows | number | `6` | MaxNumber of rows |
| maxLength | number | - | Max character count |
| showCount | boolean | `false` | Show or hideCharacter Count |
| disabled | boolean | `false` | Whetherdisabled |
| readOnly | boolean | `false` | Read-only state |
| prefix | ReactNode | - | Prefix content |
| suffix | ReactNode | - | Suffix content |
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | sizes |
| status | `'error' \| 'warning'` | - | status |
| help | ReactNode | - | Help text |
| onChange | `(e: ChangeEvent) => void` | - | Change handler callback |
| onFocus | `(e: FocusEvent) => void` | - | Focus callback |
| onBlur | `(e: FocusEvent) => void` | - | Blur callback |
| className | string | - | Custom class name |
| style | CSSProperties | - | Custom Style |

## Notes

- Ensure the component is wrapped in `ThemeProvider` for full theme support
- `autoSize` 为 `true` Ignore when `rows` Property
- For controlled components, use `value` + `onChange`
## Related Components

The following components are related and may be used together:

| Component | Description |
|-----------|-------------|
| [Input](input) | TextInput |
| [Form](form) | FormContainer |
