# InputNumber

**Related Components:** [Slider](./slider), [Rate](./rate)


InputNumber InputNumber component for numeric input. Supports increment/decrement buttons、step size、Range limit、Formatting, etc.. 

## Introduction

```tsx live-codeblock
import { InputNumber } from 'orva-ui';
// 或按需导入
import { InputNumber } from 'orva-ui/form';
```

## Basic Usage

```tsx live-codeblock
import React, { useState } from 'react';
import { InputNumber } from 'orva-ui';

export default () => {
  const [value, setValue] = useState(0);
  
  return <InputNumber value={value} onChange={setValue} />;
};
```

## Examples

### Basic numeric badgeInput

```tsx live-codeblock
import React, { useState } from 'react';
import { InputNumber } from 'orva-ui';

export default () => {
  const [value, setValue] = useState(0);
  
  return <InputNumber value={value} onChange={setValue} placeholder="请Inputnumeric badge" style={{ width: 150 }} />;
};
```

### With increment/decrementButton

```tsx live-codeblock
import React, { useState } from 'react';
import { InputNumber } from 'orva-ui';

export default () => {
  const [value, setValue] = useState(0);
  
  return <InputNumber value={value} onChange={setValue} controls style={{ width: 150 }} />;
};
```

### step sizeSetting

```tsx live-codeblock
import React, { useState } from 'react';
import { InputNumber } from 'orva-ui';

export default () => {
  const [value, setValue] = useState(0);
  
  return <InputNumber value={value} onChange={setValue} step={10} style={{ width: 150 }} />;
};
```

### Range limit

```tsx live-codeblock
import React, { useState } from 'react';
import { InputNumber } from 'orva-ui';

export default () => {
  const [value, setValue] = useState(50);
  
  return <InputNumber value={value} onChange={setValue} min={0} max={100} style={{ width: 150 }} />;
};
```

### Decimal precision

```tsx live-codeblock
import React, { useState } from 'react';
import { InputNumber } from 'orva-ui';

export default () => {
  const [value, setValue] = useState(0);
  
  return <InputNumber value={value} onChange={setValue} precision={2} style={{ width: 150 }} />;
};
```

### FormattingShow

```tsx live-codeblock
import React, { useState } from 'react';
import { InputNumber } from 'orva-ui';

export default () => {
  const [value, setValue] = useState(1000);
  
  return <InputNumber value={value} onChange={setValue} formatter={v => '¥ ' + v + ''.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} parser={v => v?.replace(/[¥\s,]/g, '')} style={{ width: 150 }} />;
};
```

### disabledstatus

```tsx live-codeblock
import React, { useState } from 'react';
import { InputNumber } from 'orva-ui';

export default () => {
  const [value, setValue] = useState(0);
  
  return <InputNumber value={value} onChange={setValue} disabled style={{ width: 150 }} />;
};
```

### sizes

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

### errorstatus

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

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| value | number | - | Value (controlled) |
| defaultValue | number | - | Default value |
| placeholder | string | - | Placeholder text |
| min | number | `-Infinity` | MinValue |
| max | number | `Infinity` | MaxValue |
| step | number | `1` | step size |
| precision | number | - | Decimal precision |
| controls | boolean | `true` | Show or hideIncrement/DecrementButton |
| disabled | boolean | `false` | Whetherdisabled |
| readOnly | boolean | `false` | Read-only state |
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | sizes |
| status | `'error' \| 'warning'` | - | status |
| help | ReactNode | - | Help text |
| formatter | `(value: number) => string` | - | Format化Function |
| parser | `(value: string) => number` | - | ParseFunction |
| onChange | `(value: number) => void` | - | Change handler callback |
| onFocus | `(e: FocusEvent) => void` | - | Focus callback |
| onBlur | `(e: FocusEvent) => void` | - | Blur callback |
| className | string | - | Custom class name |
| style | CSSProperties | - | Custom Style |

## Notes

- Ensure the component is wrapped in `ThemeProvider` for full theme support
- `formatter` 和 `parser` 用于CustomShowFormat
- For controlled components, use `value` + `onChange`
## Related Components

The following components are related and may be used together:

| Component | Description |
|-----------|-------------|
| [Slider](slider) | Slider selection |
| [Rate](rate) | RatingInput |
