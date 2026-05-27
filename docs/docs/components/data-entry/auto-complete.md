# AutoComplete 自动完成

**Related Components:** [Select](./select), [Input](./input)


AutoComplete 组件用于输入时自动显示匹配选项。支持搜索、自定义渲染、远程数据等。

## 引入

```tsx live-codeblock
import { AutoComplete } from 'orva-ui';
// 或按需导入
import { AutoComplete } from 'orva-ui/data-entry';
```

## 基本使用

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
      placeholder="请输入"
    />
  );
};
```

## 使用示例

### 基础自动完成

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

### 自定义渲染

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

### 分组选项

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

### 远程搜索

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

### 带清除按钮

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
      placeholder="请输入"
      allowClear
      style={{ width: 250 }}
    />
  );
};
```

## Props

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| value | string | - | 当前值（受控） |
| defaultValue | string | - | 默认值 |
| options | Array\<\{label, value\}\> | - | 选项列表 |
| placeholder | string | - | 占位符 |
| allowClear | boolean | `false` | 是否显示清除按钮 |
| disabled | boolean | `false` | 是否禁用 |
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | 尺寸 |
| onSearch | `(value: string) =\> void` | - | 搜索回调 |
| onChange | `(value: string) =\> void` | - | 值变化回调 |
| onSelect | `(value: string) =\> void` | - | 选择回调 |
| className | string | - | 自定义类名 |
| style | CSSProperties | - | 自定义样式 |

## 注意事项

- 请确保在 `ThemeProvider` 包裹下使用组件以获得完整的主题支持
- `options` 支持动态更新
- `onSearch` 可用于远程搜索场景
## 相关组件

以下是与当前组件相关的其他组件，可能在使用时搭配使用：

| 组件 | 说明 |
|------|------|
| [Select](select) | 下拉选择 |
| [Input](input) | 文本输入 |
