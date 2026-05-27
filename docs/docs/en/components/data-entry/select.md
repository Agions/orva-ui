# Select

**Related Components:** [AutoComplete](./autocomplete), [Cascader](./cascader)


Select Select component for choosing one or more options from a dropdown list. Supports search、grouped、custom rendering, etc.Feature. 

## Introduction

```tsx live-codeblock
import { Select } from 'orva-ui';
// 或按需导入
import { Select } from 'orva-ui/data-entry';
```

## Basic Usage

```tsx live-codeblock
import React, { useState } from 'react';
import { Select } from 'orva-ui';

export default () => {
  const [value, setValue] = useState('');
  
  const options = [
    { label: '选项一', value: '1' },
    { label: '选项二', value: '2' },
    { label: '选项三', value: '3' },
  ];
  
  return <Select value={value} onChange={setValue} options={options} placeholder="请选择" />;
};
```

## Examples

### Basic Selector

```tsx live-codeblock
import React, { useState } from 'react';
import { Select } from 'orva-ui';

export default () => {
  const [value, setValue] = useState('');
  
  const options = [
    { label: '北京', value: 'beijing' },
    { label: '上海', value: 'shanghai' },
    { label: '广州', value: 'guangzhou' },
    { label: '深圳', value: 'shenzhen' },
  ];
  
  return <Select value={value} onChange={setValue} options={options} placeholder="请选择城市" style={{ width: 200 }} />;
};
```

### multiple selection

```tsx live-codeblock
import React, { useState } from 'react';
import { Select } from 'orva-ui';

export default () => {
  const [value, setValue] = useState([]);
  
  const options = [
    { label: '选项一', value: '1' },
    { label: '选项二', value: '2' },
    { label: '选项三', value: '3' },
  ];
  
  return <Select multiple value={value} onChange={setValue} options={options} placeholder="请选择" style={{ width: 200 }} />;
};
```

### Searchable

```tsx live-codeblock
import React, { useState } from 'react';
import { Select } from 'orva-ui';

export default () => {
  const [value, setValue] = useState('');
  
  const options = [
    { label: '北京', value: 'beijing' },
    { label: '上海', value: 'shanghai' },
    { label: '广州', value: 'guangzhou' },
    { label: '深圳', value: 'shenzhen' },
  ];
  
  return <Select showSearch value={value} onChange={setValue} options={options} placeholder="搜索城市" style={{ width: 200 }} />;
};
```

### groupedOption

```tsx live-codeblock
import React, { useState } from 'react';
import { Select } from 'orva-ui';

export default () => {
  const [value, setValue] = useState('');
  
  const options = [
    {
      label: '华东',
      options: [
        { label: '上海', value: 'shanghai' },
        { label: '杭州', value: 'hangzhou' },
        { label: '南京', value: 'nanjing' },
      ],
    },
    {
      label: '华南',
      options: [
        { label: '广州', value: 'guangzhou' },
        { label: '深圳', value: 'shenzhen' },
      ],
    },
  ];
  
  return <Select value={value} onChange={setValue} options={options} placeholder="请选择地区" style={{ width: 200 }} />;
};
```

### custom rendering

```tsx live-codeblock
import React, { useState } from 'react';
import { Select, Icon } from 'orva-ui';

export default () => {
  const [value, setValue] = useState('');
  
  const options = [
    { label: 'GitHub', value: 'github', icon: 'mdi:github' },
    { label: 'GitLab', value: 'gitlab', icon: 'mdi:gitlab' },
    { label: 'Bitbucket', value: 'bitbucket', icon: 'mdi:bitbucket' },
  ];
  
  return (
    <Select 
      value={value} 
      onChange={setValue} 
      options={options} 
      placeholder="请选择代码托管平台"
      optionRender={(option) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Icon name={option.data.icon} style={{ marginRight: 8 }} />
          {option.label}
        </div>
      )}
      style={{ width: 250 }}
    />
  );
};
```

### disabledstatus

```tsx live-codeblock
import React, { useState } from 'react';
import { Select } from 'orva-ui';

export default () => {
  const [value, setValue] = useState('');
  
  const options = [
    { label: '可用选项', value: '1' },
    { label: 'disabled选项', value: '2', disabled: true },
    { label: '另一个可用', value: '3' },
  ];
  
  return <Select value={value} onChange={setValue} options={options} placeholder="请选择" style={{ width: 200 }} />;
};
```

### 带Clear button

```tsx live-codeblock
import React, { useState } from 'react';
import { Select } from 'orva-ui';

export default () => {
  const [value, setValue] = useState('1');
  
  const options = [
    { label: '选项一', value: '1' },
    { label: '选项二', value: '2' },
    { label: '选项三', value: '3' },
  ];
  
  return <Select value={value} onChange={setValue} options={options} placeholder="请选择" allowClear style={{ width: 200 }} />;
};
```

### sizes

```tsx live-codeblock
import React, { useState } from 'react';
import { Select } from 'orva-ui';

export default () => {
  const [value1, setValue1] = useState('');
  const [value2, setValue2] = useState('');
  const [value3, setValue3] = useState('');
  
  const options = [
    { label: '选项一', value: '1' },
    { label: '选项二', value: '2' },
  ];
  
  return (
    <>
      <Select value={value1} onChange={setValue1} options={options} size="sm" placeholder="小sizes" style={{ width: 200, marginBottom: 8 }} />
      <Select value={value2} onChange={setValue2} options={options} size="md" placeholder="中sizes" style={{ width: 200, marginBottom: 8 }} />
      <Select value={value3} onChange={setValue3} options={options} size="lg" placeholder="大sizes" style={{ width: 200 }} />
    </>
  );
};
```

## Props

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| value | string / string[] | - | SelectedValue (controlled) |
| defaultValue | string / string[] | - | DefaultSelectedValue |
| options | Array\<\{label, value, disabled?\}\> | - | Options list |
| placeholder | string | - | Placeholder text |
| multiple | boolean | `false` | Whethermultiple selection |
| showSearch | boolean | `false` | Show or hideSearch |
| allowClear | boolean | `false` | Show or hideClear button |
| disabled | boolean | `false` | Whetherdisabled |
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | sizes |
| onChange | `(value: any) =\> void` | - | Change handler callback |
| className | string | - | Custom class name |
| style | CSSProperties | - | Custom Style |

## Notes

- Ensure the component is wrapped in `ThemeProvider` for full theme support
- multiple selection时 `value` As array
- `options` supports dynamic updates
## Related Components

The following components are related and may be used together:

| Component | Description |
|-----------|-------------|
| [AutoComplete](autocomplete) | Component |
| [Cascader](cascader) | Cascader Selection |
