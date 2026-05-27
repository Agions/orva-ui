# Radio 单选框

**Related Components:** [Checkbox](./checkbox), [Form](./form)


Radio 组件用于单选。支持单独使用、分组、按钮样式、禁用等。

## 引入

```tsx live-codeblock
import { Radio } from 'orva-ui';
// 或按需导入
import { Radio } from 'orva-ui/data-entry';
```

## 基本使用

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

## 使用示例

### 基础单选

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

### 单选组

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

### 按钮样式

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

### 禁用状态

```tsx live-codeblock
import React, { useState } from 'react';
import { RadioGroup } from 'orva-ui';

export default () => {
  const [value, setValue] = useState('1');
  
  const options = [
    { label: '可用选项', value: '1' },
    { label: '禁用选项', value: '2', disabled: true },
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

### 尺寸

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

### 卡片式单选

```tsx live-codeblock
import React, { useState } from 'react';
import { RadioGroup, Card } from 'orva-ui';

export default () => {
  const [value, setValue] = useState('1');
  
  const options = [
    { label: '选项一', value: '1', description: '描述一' },
    { label: '选项二', value: '2', description: '描述二' },
    { label: '选项三', value: '3', description: '描述三' },
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

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| value | string / number | - | 选项值 |
| checked | boolean | `false` | 是否选中 |
| disabled | boolean | `false` | 是否禁用 |
| onChange | `(e: Event) => void` | - | 变化回调 |
| className | string | - | 自定义类名 |
| style | CSSProperties | - | 自定义样式 |

### RadioGroup

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| value | string / number | - | 选中值（受控） |
| defaultValue | string / number | - | 默认选中值 |
| options | Array<\{label, value, disabled?\}> | - | 选项列表 |
| buttonStyle | boolean | `false` | 是否按钮样式 |
| card | boolean | `false` | 是否卡片样式 |
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | 尺寸 |
| disabled | boolean | `false` | 是否禁用 |
| onChange | `(value: any) => void` | - | 值变化回调 |
| className | string | - | 自定义类名 |
| style | CSSProperties | - | 自定义样式 |

## 注意事项

- 请确保在 `ThemeProvider` 包裹下使用组件以获得完整的主题支持
- `Radio` 必须配合 `value` 和 `checked` 使用
- `RadioGroup` 自动管理选中状态
## 相关组件

以下是与当前组件相关的其他组件，可能在使用时搭配使用：

| 组件 | 说明 |
|------|------|
| [Checkbox](checkbox) | 多选输入 |
| [Form](form) | 表单容器 |
