# Checkbox

**Related Components:** [Radio](./radio), [Form](./form)


Checkbox Checkbox component for multiple selection. Supports standalone usage、grouped、Select all、disabled, etc.. 

## Introduction

```tsx live-codeblock
import { Checkbox } from 'orva-ui';
// 或按需导入
import { Checkbox } from 'orva-ui/data-entry';
```

## Basic Usage

```tsx live-codeblock
import React, { useState } from 'react';
import { Checkbox } from 'orva-ui';

export default () => {
  const [checked, setChecked] = useState(false);
  
  return (
    <Checkbox checked={checked} onChange={setChecked}>
      复选框
    </Checkbox>
  );
};
```

## Examples

### Basic Multiple select框

```tsx live-codeblock
import React, { useState } from 'react';
import { Checkbox } from 'orva-ui';

export default () => {
  const [checked, setChecked] = useState(false);
  
  return (
    <Checkbox checked={checked} onChange={setChecked}>
      同意协议
    </Checkbox>
  );
};
```

### multiple selection组

```tsx live-codeblock
import React, { useState } from 'react';
import { Checkbox, CheckboxGroup } from 'orva-ui';

export default () => {
  const [values, setValues] = useState([]);
  
  const options = [
    { label: '选项一', value: '1' },
    { label: '选项二', value: '2' },
    { label: '选项三', value: '3' },
  ];
  
  return (
    <CheckboxGroup 
      value={values} 
      onChange={setValues} 
      options={options} 
    />
  );
};
```

### Select All

```tsx live-codeblock
import React, { useState } from 'react';
import { Checkbox, CheckboxGroup } from 'orva-ui';

export default () => {
  const [allChecked, setAllChecked] = useState(false);
  const [values, setValues] = useState([]);
  
  const options = [
    { label: '选项一', value: '1' },
    { label: '选项二', value: '2' },
    { label: '选项三', value: '3' },
  ];
  
  const handleAllChange = (checked: boolean) => {
    setAllChecked(checked);
    setValues(checked ? options.map(o => o.value) : []);
  };
  
  return (
    <>
      <Checkbox checked={allChecked} onChange={handleAllChange}>
        全选
      </Checkbox>
      <CheckboxGroup 
        value={values} 
        onChange={setValues} 
        options={options} 
      />
    </>
  );
};
```

### disabledstatus

```tsx live-codeblock
import React, { useState } from 'react';
import { Checkbox } from 'orva-ui';

export default () => (
  <>
    <Checkbox disabled>disabled未选中</Checkbox>
    <Checkbox disabled checked>disabled已选中</Checkbox>
  </>
);
```

### 带colors

```tsx live-codeblock
import React, { useState } from 'react';
import { Checkbox } from 'orva-ui';

export default () => (
  <>
    <Checkbox color="#3b82f6">蓝色</Checkbox>
    <Checkbox color="#10b981">绿色</Checkbox>
    <Checkbox color="#f59e0b">黄色</Checkbox>
    <Checkbox color="#ef4444">红色</Checkbox>
  </>
);
```

### Card式Multiple select框

```tsx live-codeblock
import React, { useState } from 'react';
import { Checkbox, CheckboxGroup, Card } from 'orva-ui';

export default () => {
  const [values, setValues] = useState([]);
  
  const options = [
    { label: '选项一', value: '1' },
    { label: '选项二', value: '2' },
    { label: '选项三', value: '3' },
  ];
  
  return (
    <CheckboxGroup 
      card
      value={values} 
      onChange={setValues} 
      options={options} 
    />
  );
};
```

## Props

### Checkbox

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| checked | boolean | `false` | WhetherSelected（Controlled） |
| defaultChecked | boolean | `false` | DefaultWhetherSelected |
| disabled | boolean | `false` | Whetherdisabled |
| color | string | - | Selectedcolors |
| onChange | `(checked: boolean) => void` | - | Change callback |
| className | string | - | Custom class name |
| style | CSSProperties | - | Custom Style |

### CheckboxGroup

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| value | string[] | - | SelectedValue (controlled) |
| defaultValue | string[] | - | DefaultSelectedValue |
| options | Array<\{label, value, disabled?\}> | - | Options list |
| card | boolean | `false` | WhetherCardStyle |
| disabled | boolean | `false` | Whetherdisabled |
| onChange | `(values: string[]) => void` | - | Change callback |
| className | string | - | Custom class name |
| style | CSSProperties | - | Custom Style |

## Notes

- Ensure the component is wrapped in `ThemeProvider` for full theme support
- ControlledModePlease Use `checked` + `onChange`
- `CheckboxGroup` 的 `value` As array
## Related Components

The following components are related and may be used together:

| Component | Description |
|-----------|-------------|
| [Radio](radio) | Single selectInput |
| [Form](form) | FormContainer |
