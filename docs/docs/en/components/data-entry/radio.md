# Radio

**Related Components:** [Checkbox](./checkbox), [Form](./form)


Radio Radio component for single selection. Supports standalone usage、grouped、Button Style、disabled, etc.. 

## Introduction

```tsx live-codeblock
import { Radio } from 'orva-ui';
// 或按需导入
import { Radio } from 'orva-ui/data-entry';
```

## Basic Usage

```tsx live-codeblock
import React, { useState } from 'react';
import { Radio } from 'orva-ui';

export default () => {
  const [value, setValue] = useState('1');
  
  return (
    <Radio value="1" checked={value === '1'} onChange={() => setValue('1')}>
      选项一
    </Radio>
  );
};
```

## Examples

### Basic Single select

```tsx live-codeblock
import React, { useState } from 'react';
import { Radio } from 'orva-ui';

export default () => {
  const [value, setValue] = useState('1');
  
  return (
    <>
      <Radio value="1" checked={value === '1'} onChange={() => setValue('1')}>
        选项一
      </Radio>
      <Radio value="2" checked={value === '2'} onChange={() => setValue('2')}>
        选项二
      </Radio>
      <Radio value="3" checked={value === '3'} onChange={() => setValue('3')}>
        选项三
      </Radio>
    </>
  );
};
```

### Radio Group

```tsx live-codeblock
import React, { useState } from 'react';
import { RadioGroup } from 'orva-ui';

export default () => {
  const [value, setValue] = useState('1');
  
  const options = [
    { label: '选项一', value: '1' },
    { label: '选项二', value: '2' },
    { label: '选项三', value: '3' },
  ];
  
  return (
    <RadioGroup 
      value={value} 
      onChange={setValue} 
      options={options} 
    />
  );
};
```

### Button Style

```tsx live-codeblock
import React, { useState } from 'react';
import { RadioGroup } from 'orva-ui';

export default () => {
  const [value, setValue] = useState('1');
  
  const options = [
    { label: '选项一', value: '1' },
    { label: '选项二', value: '2' },
    { label: '选项三', value: '3' },
  ];
  
  return (
    <RadioGroup 
      buttonStyle
      value={value} 
      onChange={setValue} 
      options={options} 
    />
  );
};
```

### disabledstatus

```tsx live-codeblock
import React, { useState } from 'react';
import { RadioGroup } from 'orva-ui';

export default () => {
  const [value, setValue] = useState('1');
  
  const options = [
    { label: '可用选项', value: '1' },
    { label: 'disabled选项', value: '2', disabled: true },
    { label: '另一个可用', value: '3' },
  ];
  
  return (
    <RadioGroup 
      value={value} 
      onChange={setValue} 
      options={options} 
    />
  );
};
```

### sizes

```tsx live-codeblock
import React, { useState } from 'react';
import { RadioGroup } from 'orva-ui';

export default () => {
  const [value, setValue] = useState('1');
  
  const options = [
    { label: '选项一', value: '1' },
    { label: '选项二', value: '2' },
    { label: '选项三', value: '3' },
  ];
  
  return (
    <>
      <RadioGroup 
        size="sm"
        value={value} 
        onChange={setValue} 
        options={options} 
      />
      <RadioGroup 
        size="md"
        value={value} 
        onChange={setValue} 
        options={options} 
      />
      <RadioGroup 
        size="lg"
        value={value} 
        onChange={setValue} 
        options={options} 
      />
    </>
  );
};
```

### Card式Single select

```tsx live-codeblock
import React, { useState } from 'react';
import { RadioGroup, Card } from 'orva-ui';

export default () => {
  const [value, setValue] = useState('1');
  
  const options = [
    { label: '选项一', value: '1', description: 'description一' },
    { label: '选项二', value: '2', description: 'description二' },
    { label: '选项三', value: '3', description: 'description三' },
  ];
  
  return (
    <RadioGroup 
      card
      value={value} 
      onChange={setValue} 
      options={options} 
    />
  );
};
```

## Props

### Radio

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| value | string / number | - | OptionValue |
| checked | boolean | `false` | WhetherSelected |
| disabled | boolean | `false` | Whetherdisabled |
| onChange | `(e: Event) => void` | - | Change callback |
| className | string | - | Custom class name |
| style | CSSProperties | - | Custom Style |

### RadioGroup

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| value | string / number | - | SelectedValue (controlled) |
| defaultValue | string / number | - | DefaultSelectedValue |
| options | Array<\{label, value, disabled?\}> | - | Options list |
| buttonStyle | boolean | `false` | WhetherButton Style |
| card | boolean | `false` | WhetherCardStyle |
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | sizes |
| disabled | boolean | `false` | Whetherdisabled |
| onChange | `(value: any) => void` | - | Change handler callback |
| className | string | - | Custom class name |
| style | CSSProperties | - | Custom Style |

## Notes

- Ensure the component is wrapped in `ThemeProvider` for full theme support
- `Radio` MustUsed with `value` 和 `checked` Use
- `RadioGroup` AutoManageSelectedstatus
## Related Components

The following components are related and may be used together:

| Component | Description |
|-----------|-------------|
| [Checkbox](checkbox) | multiple selectionInput |
| [Form](form) | FormContainer |
