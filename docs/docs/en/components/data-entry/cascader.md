# Cascader

**Related Components:** [Select](./select), [Tree](./tree)


Cascader Cascader component for selecting from hierarchical options. Supports search、multiple selection、custom rendering, etc.. 

## Introduction

```tsx live-codeblock
import { Cascader } from 'orva-ui';
// 或按需导入
import { Cascader } from 'orva-ui/data-entry';
```

## Basic Usage

```tsx live-codeblock
import React, { useState } from 'react';
import { Cascader } from 'orva-ui';

export default () => {
  const [value, setValue] = useState([]);
  
  const options = [
    {
      value: 'zhejiang',
      label: '浙江',
      children: [
        {
          value: 'hangzhou',
          label: '杭州',
          children: [
            { value: 'xihu', label: '西湖' },
          ],
        },
      ],
    },
  ];
  
  return (
    <Cascader 
      value={value} 
      onChange={setValue} 
      options={options} 
      placeholder="请选择"
    />
  );
};
```

## Examples

### Basic Cascade

```tsx live-codeblock
import React, { useState } from 'react';
import { Cascader } from 'orva-ui';

export default () => {
  const [value, setValue] = useState([]);
  
  const options = [
    {
      value: 'zhejiang',
      label: '浙江',
      children: [
        { value: 'hangzhou', label: '杭州' },
        { value: 'ningbo', label: '宁波' },
        { value: 'wenzhou', label: '温州' },
      ],
    },
    {
      value: 'jiangsu',
      label: '江苏',
      children: [
        { value: 'nanjing', label: '南京' },
        { value: 'suzhou', label: '苏州' },
        { value: 'wuxi', label: '无锡' },
      ],
    },
  ];
  
  return (
    <Cascader 
      value={value} 
      onChange={setValue} 
      options={options} 
      placeholder="请选择省份和城市"
      style={{ width: 300 }}
    />
  );
};
```

### multiple selectionMode

```tsx live-codeblock
import React, { useState } from 'react';
import { Cascader } from 'orva-ui';

export default () => {
  const [value, setValue] = useState([]);
  
  const options = [
    {
      value: 'zhejiang',
      label: '浙江',
      children: [
        { value: 'hangzhou', label: '杭州' },
        { value: 'ningbo', label: '宁波' },
      ],
    },
    {
      value: 'jiangsu',
      label: '江苏',
      children: [
        { value: 'nanjing', label: '南京' },
        { value: 'suzhou', label: '苏州' },
      ],
    },
  ];
  
  return (
    <Cascader 
      multiple
      value={value} 
      onChange={setValue} 
      options={options} 
      placeholder="可multiple selection"
      style={{ width: 300 }}
    />
  );
};
```

### 搜索Feature

```tsx live-codeblock
import React, { useState } from 'react';
import { Cascader } from 'orva-ui';

export default () => {
  const [value, setValue] = useState([]);
  
  const options = [
    {
      value: 'zhejiang',
      label: '浙江',
      children: [
        { value: 'hangzhou', label: '杭州' },
        { value: 'ningbo', label: '宁波' },
      ],
    },
    {
      value: 'jiangsu',
      label: '江苏',
      children: [
        { value: 'nanjing', label: '南京' },
        { value: 'suzhou', label: '苏州' },
      ],
    },
  ];
  
  return (
    <Cascader 
      showSearch
      value={value} 
      onChange={setValue} 
      options={options} 
      placeholder="搜索省份或城市"
      style={{ width: 300 }}
    />
  );
};
```

### 懒Loading

```tsx live-codeblock
import React, { useState } from 'react';
import { Cascader } from 'orva-ui';

export default () => {
  const [value, setValue] = useState([]);
  const [options, setOptions] = useState([
    { value: 'zhejiang', label: '浙江', isLeaf: false },
    { value: 'jiangsu', label: '江苏', isLeaf: false },
  ]);
  
  const handleChange = async (selectedValues: string[]) => {
    const targetOption = options.find(option => option.value === selectedValues[0]);
    
    if (targetOption && !targetOption.children) {
      // 模拟LoadingSub-options
      const children = await loadOptions(targetOption.value);
      targetOption.children = children;
      setOptions([...options]);
    }
    
    setValue(selectedValues);
  };
  
  return (
    <Cascader 
      value={value} 
      onChange={handleChange} 
      options={options} 
      placeholder="懒Loading示例"
      style={{ width: 300 }}
    />
  );
};

async function loadOptions(value: string) {
  // 模拟 API Request
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([
        { value: '' + value + '-1', label: '' + value + '-Option 1' },
        { value: '' + value + '-2', label: '' + value + '-Option 2' },
      ]);
    }, 500);
  });
}
```

### ShowPath

```tsx live-codeblock
import React, { useState } from 'react';
import { Cascader } from 'orva-ui';

export default () => {
  const [value, setValue] = useState([]);
  
  const options = [
    {
      value: 'zhejiang',
      label: '浙江',
      children: [
        {
          value: 'hangzhou',
          label: '杭州',
          children: [
            { value: 'xihu', label: '西湖' },
            { value: 'linan', label: '临安' },
          ],
        },
      ],
    },
  ];
  
  return (
    <Cascader 
      value={value} 
      onChange={setValue} 
      options={options} 
      placeholder="请选择"
      showPath
      style={{ width: 300 }}
    />
  );
};
```

## Props

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| value | string[] | - | SelectedValue (controlled) |
| defaultValue | string[] | - | DefaultSelectedValue |
| options | CascaderOption[] | - | OptionData |
| placeholder | string | - | Placeholder text |
| multiple | boolean | `false` | Whethermultiple selection |
| showSearch | boolean | `false` | Show or hideSearch |
| showPath | boolean | `false` | Show or hideCompletePath |
| changeOnSelect | boolean | `false` | WhetherAny level selectable |
| disabled | boolean | `false` | Whetherdisabled |
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | sizes |
| onChange | `(value: string[]) => void` | - | Change handler callback |
| className | string | - | Custom class name |
| style | CSSProperties | - | Custom Style |

## Notes

- Ensure the component is wrapped in `ThemeProvider` for full theme support
- `options` In `children` Supports懒Loading
- multiple selectionMode下 `value` 为二维数组
## Related Components

The following components are related and may be used together:

| Component | Description |
|-----------|-------------|
| [Select](select) | Dropdown select |
| [Tree](tree) | Component |
