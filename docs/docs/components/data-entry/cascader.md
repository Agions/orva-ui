# Cascader 级联选择器

**Related Components:** [Select](./select), [Tree](./tree)


Cascader 组件用于从多层级选项中选择。支持搜索、多选、自定义渲染等。

## 引入

```tsx live-codeblock
import { Cascader } from 'orva-ui';
// 或按需导入
import { Cascader } from 'orva-ui/data-entry';
```

## 基本使用

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

## 使用示例

### 基础级联

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

### 多选模式

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
      placeholder="可多选"
      style={{ width: 300 }}
    />
  );
};
```

### 搜索功能

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

### 懒加载

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
      // 模拟加载子选项
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
      placeholder="懒加载示例"
      style={{ width: 300 }}
    />
  );
};

async function loadOptions(value: string) {
  // 模拟 API 请求
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([
        { value: '' + value + '-1', label: '' + value + '-选项 1' },
        { value: '' + value + '-2', label: '' + value + '-选项 2' },
      ]);
    }, 500);
  });
}
```

### 显示路径

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

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| value | string[] | - | 选中值（受控） |
| defaultValue | string[] | - | 默认选中值 |
| options | CascaderOption[] | - | 选项数据 |
| placeholder | string | - | 占位符 |
| multiple | boolean | `false` | 是否多选 |
| showSearch | boolean | `false` | 是否显示搜索 |
| showPath | boolean | `false` | 是否显示完整路径 |
| changeOnSelect | boolean | `false` | 是否可选择任意层级 |
| disabled | boolean | `false` | 是否禁用 |
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | 尺寸 |
| onChange | `(value: string[]) => void` | - | 值变化回调 |
| className | string | - | 自定义类名 |
| style | CSSProperties | - | 自定义样式 |

## 注意事项

- 请确保在 `ThemeProvider` 包裹下使用组件以获得完整的主题支持
- `options` 中的 `children` 支持懒加载
- 多选模式下 `value` 为二维数组
## 相关组件

以下是与当前组件相关的其他组件，可能在使用时搭配使用：

| 组件 | 说明 |
|------|------|
| [Select](select) | 下拉选择 |
| [Tree](tree) | 组件 |
