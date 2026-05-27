# Input

Input component is used for receiving text input from users. Supports multiple types, prefixes/suffixes, clear button, character count, and more.

## Introduction

```tsx
import { Input } from 'orva-ui';
// Or import on-demand
import { Input } from 'orva-ui/data-entry';
```

## Basic Usage

```tsx live-codeblock
import React from 'react';
import { Input } from 'orva-ui';

export default () => {
  const [value, setValue] = React.useState('');

  return (
    <Input 
      value={value} 
      onChange={(e) => setValue(e.target.value)} 
      placeholder="Enter text"
    />
  );
};
```

### With Prefix and Suffix

```tsx live-codeblock
import React from 'react';
import { Input, Icon } from 'orva-ui';

export default () => (
  <>
    <Input 
      prefix={<Icon name="user" />} 
      placeholder="Username"
      style={{ marginBottom: 8 }}
    />
    <Input 
      suffix={<Icon name="search" />} 
      placeholder="Search"
    />
  </>
);
```

### Clearable

```tsx live-codeblock
import React from 'react';
import { Input } from 'orva-ui';

export default () => {
  const [value, setValue] = React.useState('Clearable input');

  return (
    <Input 
      value={value} 
      onChange={(e) => setValue(e.target.value)}
      allowClear
      placeholder="Type something..."
    />
  );
};
```

### Password Input

```tsx live-codeblock
import React from 'react';
import { Input } from 'orva-ui';

export default () => {
  const [value, setValue] = React.useState('');

  return (
    <Input 
      type="password"
      value={value} 
      onChange={(e) => setValue(e.target.value)}
      placeholder="Enter password"
    />
  );
};
```

### Character Count

```tsx live-codeblock
import React from 'react';
import { Input } from 'orva-ui';

export default () => {
  const [value, setValue] = React.useState('');

  return (
    <Input 
      value={value} 
      onChange={(e) => setValue(e.target.value)}
      placeholder="Max 100 characters"
      maxLength={100}
      showCount
    />
  );
};
```

### Disabled State

```tsx live-codeblock
import React from 'react';
import { Input } from 'orva-ui';

export default () => (
  <Input 
    disabled 
    defaultValue="This input is disabled"
  />
);
```

## Props

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| value | string | - | Value (controlled) |
| defaultValue | string | - | Default value |
| placeholder | string | - | Placeholder text |
| type | `'text' \| 'password' \| 'search' \| 'tel' \| 'email' \| 'url'` | `'text'` | Input type |
| prefix | ReactNode | - | Prefix content |
| suffix | ReactNode | - | Suffix content |
| allowClear | boolean | `false` | Show clear button |
| disabled | boolean | `false` | Disabled state |
| readOnly | boolean | `false` | Read-only state |
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | Size |
| status | `'error' \| 'warning'` | - | Status |
| help | ReactNode | - | Help text |
| maxLength | number | - | Max character count |
| showCount | boolean | `false` | Show character count |
| onChange | `(e: ChangeEvent) => void` | - | Change handler |
| onFocus | `(e: FocusEvent) => void` | - | Focus handler |
| onBlur | `(e: FocusEvent) => void` | - | Blur handler |
| className | string | - | Custom class name |
| style | CSSProperties | - | Custom styles |

## Related Components

The following components are related to the current component and may be used together:

| Component | Description |
|-----------|-------------|
| [TextArea](../data-entry/textarea) | Multi-line text input |
| [AutoComplete](../data-entry/auto-complete) | Auto-complete input |
| [Form](../data-entry/form) | Form container |

## Notes

- Ensure the component is wrapped in `ThemeProvider` for full theme support
- Use `value` + `onChange` for controlled components
- `prefix` and `suffix` can be any ReactNode
