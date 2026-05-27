# AutoComplete

**Related Components:** [Select](./select), [Input](./input)


AutoComplete AutoComplete component provides input suggestions on typing. Supports search、custom rendering、Remote Data, etc.. 

## Introduction

```tsx live-codeblock
import { AutoComplete } from 'orva-ui';
// 或按需导入
import { AutoComplete } from 'orva-ui/data-entry';
```

## Basic Usage

```tsx live-codeblock
import React, { useState } from 'react';
import { AutoComplete } from 'orva-ui';

export default () => {
  const [value, setValue] = useState('');
  
  const options = [
    { label: '选项一', value: '1' },
    { label: '选项二', value: '2' },
    { label: '选项三', value: '3' },
  ];
  
  return (
    <AutoComplete 
      value={value} 
      onChange={setValue} 
      options={options} 
      placeholder="请Input"
    />
  );
};
```

## Examples

### Basic Auto complete

```tsx live-codeblock
import React, { useState } from 'react';
import { AutoComplete } from 'orva-ui';

export default () => {
  const [value, setValue] = useState('');
  
  const options = [
    { label: '北京', value: 'beijing' },
    { label: '上海', value: 'shanghai' },
    { label: '广州', value: 'guangzhou' },
    { label: '深圳', value: 'shenzhen' },
  ];
  
  return (
    <AutoComplete 
      value={value} 
      onChange={setValue} 
      options={options} 
      placeholder="搜索城市"
      style={{ width: 250 }}
    />
  );
};
```

### custom rendering

```tsx live-codeblock
import React, { useState } from 'react';
import { AutoComplete, Icon } from 'orva-ui';

export default () => {
  const [value, setValue] = useState('');
  
  const options = [
    { label: 'GitHub', value: 'github', icon: 'mdi:github' },
    { label: 'GitLab', value: 'gitlab', icon: 'mdi:gitlab' },
    { label: 'Bitbucket', value: 'bitbucket', icon: 'mdi:bitbucket' },
  ];
  
  return (
    <AutoComplete 
      value={value} 
      onChange={setValue} 
      options={options} 
      placeholder="搜索代码托管平台"
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

### groupedOption

```tsx live-codeblock
import React, { useState } from 'react';
import { AutoComplete } from 'orva-ui';

export default () => {
  const [value, setValue] = useState('');
  
  const options = [
    {
      label: '常用联系⼈',
      options: [
        { label: '张三', value: 'zhangsan' },
        { label: '李四', value: 'lisi' },
      ],
    },
    {
      label: '部门成员',
      options: [
        { label: '王五', value: 'wangwu' },
        { label: '赵六', value: 'zhaoliu' },
      ],
    },
  ];
  
  return (
    <AutoComplete 
      value={value} 
      onChange={setValue} 
      options={options} 
      placeholder="搜索联系人"
      style={{ width: 250 }}
    />
  );
};
```

### Remote search

```tsx live-codeblock
import React, { useState } from 'react';
import { AutoComplete } from 'orva-ui';

export default () => {
  const [value, setValue] = useState('');
  const [options, setOptions] = useState([]);
  
  const handleSearch = async (searchValue: string) => {
    if (!searchValue) {
      setOptions([]);
      return;
    }
    
    // 模拟远程搜索
    const response = await fetch('/api/search?q=' + encodeURIComponent(searchValue));
    const data = await response.json();
    setOptions(data.map(item => ({ label: item.name, value: item.id })));
  };
  
  return (
    <AutoComplete 
      value={value} 
      onChange={setValue} 
      onSearch={handleSearch}
      options={options} 
      placeholder="搜索用户"
      style={{ width: 250 }}
    />
  );
};
```

### 带Clear button

```tsx live-codeblock
import React, { useState } from 'react';
import { AutoComplete } from 'orva-ui';

export default () => {
  const [value, setValue] = useState('');
  
  const options = [
    { label: '选项一', value: '1' },
    { label: '选项二', value: '2' },
    { label: '选项三', value: '3' },
  ];
  
  return (
    <AutoComplete 
      value={value} 
      onChange={setValue} 
      options={options} 
      placeholder="请Input"
      allowClear
      style={{ width: 250 }}
    />
  );
};
```

## Props

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| value | string | - | CurrentValue (controlled) |
| defaultValue | string | - | Default value |
| options | Array\<\{label, value\}\> | - | Options list |
| placeholder | string | - | Placeholder text |
| allowClear | boolean | `false` | Show or hideClear button |
| disabled | boolean | `false` | Whetherdisabled |
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | sizes |
| onSearch | `(value: string) =\> void` | - | Search callback |
| onChange | `(value: string) =\> void` | - | Change handler callback |
| onSelect | `(value: string) =\> void` | - | Select callback callback |
| className | string | - | Custom class name |
| style | CSSProperties | - | Custom Style |

## Notes

- Ensure the component is wrapped in `ThemeProvider` for full theme support
- `options` supports dynamic updates
- `onSearch` can be used for remote search scenarios
## Related Components

The following components are related and may be used together:

| Component | Description |
|-----------|-------------|
| [Select](select) | Dropdown select |
| [Input](input) | TextInput |
