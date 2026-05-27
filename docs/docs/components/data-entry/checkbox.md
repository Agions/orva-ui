# Checkbox 复选框

**Related Components:** [Radio](./radio), [Form](./form)


Checkbox 组件用于多选。支持单独使用、分组、全选、禁用等。

## 引入

```tsx live-codeblock
import { Checkbox } from 'orva-ui';
// 或按需导入
import { Checkbox } from 'orva-ui/data-entry';
```

## 基本使用

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

## 使用示例

### 基础复选框

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

### 多选组

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

### 全选功能

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

### 禁用状态

```tsx live-codeblock
import React, { useState } from 'react';
import { Checkbox } from 'orva-ui';

export default () => (
  <>
    <Checkbox disabled>禁用未选中</Checkbox>
    <Checkbox disabled checked>禁用已选中</Checkbox>
  </>
);
```

### 带颜色

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

### 卡片式复选框

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

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| checked | boolean | `false` | 是否选中（受控） |
| defaultChecked | boolean | `false` | 默认是否选中 |
| disabled | boolean | `false` | 是否禁用 |
| color | string | - | 选中颜色 |
| onChange | `(checked: boolean) => void` | - | 变化回调 |
| className | string | - | 自定义类名 |
| style | CSSProperties | - | 自定义样式 |

### CheckboxGroup

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| value | string[] | - | 选中值（受控） |
| defaultValue | string[] | - | 默认选中值 |
| options | Array<\{label, value, disabled?\}> | - | 选项列表 |
| card | boolean | `false` | 是否卡片样式 |
| disabled | boolean | `false` | 是否禁用 |
| onChange | `(values: string[]) => void` | - | 变化回调 |
| className | string | - | 自定义类名 |
| style | CSSProperties | - | 自定义样式 |

## 注意事项

- 请确保在 `ThemeProvider` 包裹下使用组件以获得完整的主题支持
- 受控模式请使用 `checked` + `onChange`
- `CheckboxGroup` 的 `value` 为数组
## 相关组件

以下是与当前组件相关的其他组件，可能在使用时搭配使用：

| 组件 | 说明 |
|------|------|
| [Radio](radio) | 单选输入 |
| [Form](form) | 表单容器 |
