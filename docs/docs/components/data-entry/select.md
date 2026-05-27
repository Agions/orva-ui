# Select 选择器

**Related Components:** [AutoComplete](./autocomplete), [Cascader](./cascader)


Select 组件用于从下拉列表中选择一个或多个选项。支持搜索、分组、自定义渲染等功能。

## 引入

```tsx live-codeblock
import { Select } from 'orva-ui';
// 或按需导入
import { Select } from 'orva-ui/data-entry';
```

## 基本使用

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

## 使用示例

### 基础选择器

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

### 多选

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

### 可搜索

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

### 分组选项

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

### 自定义渲染

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

### 禁用状态

```tsx live-codeblock
import React, { useState } from 'react';
import { Select } from 'orva-ui';

export default () => {
  const [value, setValue] = useState('');
  
  const options = [
    { label: '可用选项', value: '1' },
    { label: '禁用选项', value: '2', disabled: true },
    { label: '另一个可用', value: '3' },
  ];
  
  return <Select value={value} onChange={setValue} options={options} placeholder="请选择" style={{ width: 200 }} />;
};
```

### 带清除按钮

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

### 尺寸

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
      <Select value={value1} onChange={setValue1} options={options} size="sm" placeholder="小尺寸" style={{ width: 200, marginBottom: 8 }} />
      <Select value={value2} onChange={setValue2} options={options} size="md" placeholder="中尺寸" style={{ width: 200, marginBottom: 8 }} />
      <Select value={value3} onChange={setValue3} options={options} size="lg" placeholder="大尺寸" style={{ width: 200 }} />
    </>
  );
};
```

## Props

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| value | string / string[] | - | 选中值（受控） |
| defaultValue | string / string[] | - | 默认选中值 |
| options | Array\<\{label, value, disabled?\}\> | - | 选项列表 |
| placeholder | string | - | 占位符 |
| multiple | boolean | `false` | 是否多选 |
| showSearch | boolean | `false` | 是否显示搜索 |
| allowClear | boolean | `false` | 是否显示清除按钮 |
| disabled | boolean | `false` | 是否禁用 |
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | 尺寸 |
| onChange | `(value: any) =\> void` | - | 值变化回调 |
| className | string | - | 自定义类名 |
| style | CSSProperties | - | 自定义样式 |

## 注意事项

- 请确保在 `ThemeProvider` 包裹下使用组件以获得完整的主题支持
- 多选时 `value` 为数组
- `options` 支持动态更新
## 相关组件

以下是与当前组件相关的其他组件，可能在使用时搭配使用：

| 组件 | 说明 |
|------|------|
| [AutoComplete](autocomplete) | 组件 |
| [Cascader](cascader) | 级联选择 |
