# Rate 评分

**Related Components:** [Slider](./slider), [InputNumber](./inputnumber)


Rate 组件用于评分展示。支持半星、禁用、自定义图标等。

## 引入

```tsx live-codeblock
import { Rate } from 'orva-ui';
// 或按需导入
import { Rate } from 'orva-ui/display';
```

## 基本使用

```tsx live-codeblock
import React, { useState } from 'react';
import { Rate } from 'orva-ui';

export default () => {
  const [value, setValue] = useState(3);
  
  return <Rate value={value} onChange={setValue} />;
};
```

## 使用示例

### 基础评分

```tsx live-codeblock
import React, { useState } from 'react';
import { Rate } from 'orva-ui';

export default () => {
  const [value, setValue] = useState(3);
  
  return <Rate value={value} onChange={setValue} />;
};
```

### 半星评分

```tsx live-codeblock
import React, { useState } from 'react';
import { Rate } from 'orva-ui';

export default () => {
  const [value, setValue] = useState(3.5);
  
  return <Rate value={value} onChange={setValue} allowHalf />;
};
```

### 禁用状态

```tsx live-codeblock
import React, { useState } from 'react';
import { Rate } from 'orva-ui';

export default () => {
  const [value, setValue] = useState(4);
  
  return <Rate value={value} onChange={setValue} disabled />;
};
```

### 最大分数

```tsx live-codeblock
import React, { useState } from 'react';
import { Rate } from 'orva-ui';

export default () => {
  const [value, setValue] = useState(3);
  
  return <Rate value={value} onChange={setValue} count={10} />;
};
```

### 自定义图标

```tsx live-codeblock
import React, { useState } from 'react';
import { Rate, Icon } from 'orva-ui';

export default () => {
  const [value, setValue] = useState(3);
  
  return (
    <Rate 
      value={value} 
      onChange={setValue} 
      emptyIcon={<Icon name="mdi:star-outline" />}
      filledIcon={<Icon name="mdi:star" />}
    />
  );
};
```

### 带文字提示

```tsx live-codeblock
import React, { useState } from 'react';
import { Rate } from 'orva-ui';

export default () => {
  const [value, setValue] = useState(3);
  
  const labels = ['非常差', '差', '一般', '好', '非常好'];
  
  return (
    <div>
      <Rate value={value} onChange={setValue} tooltips={labels} />
      <span style={{ marginLeft: 8 }}>{labels[value - 1]}</span>
    </div>
  );
};
```

### 只读展示

```tsx live-codeblock
import React, { useState } from 'react';
import { Rate } from 'orva-ui';

export default () => {
  return <Rate value={4.5} disabled allowHalf />;
};
```

### 带颜色

```tsx live-codeblock
import React, { useState } from 'react';
import { Rate } from 'orva-ui';

export default () => {
  const [value, setValue] = useState(3);
  
  return <Rate value={value} onChange={setValue} color="#f59e0b" />;
};
```

## Props

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| value | number | - | 评分值（受控） |
| defaultValue | number | - | 默认评分值 |
| count | number | `5` | 最大分数 |
| allowHalf | boolean | `false` | 是否允许半星 |
| disabled | boolean | `false` | 是否禁用 |
| readOnly | boolean | `false` | 是否只读 |
| color | string | - | 选中颜色 |
| emptyIcon | ReactNode | - | 未选中图标 |
| filledIcon | ReactNode | - | 选中图标 |
| tooltips | string[] | - | 提示文字数组 |
| onChange | `(value: number) => void` | - | 值变化回调 |
| className | string | - | 自定义类名 |
| style | CSSProperties | - | 自定义样式 |

## 注意事项

- 请确保在 `ThemeProvider` 包裹下使用组件以获得完整的主题支持
- `allowHalf` 为 `true` 时支持半星评分
- 受控组件请使用 `value` + `onChange`
## 相关组件

以下是与当前组件相关的其他组件，可能在使用时搭配使用：

| 组件 | 说明 |
|------|------|
| [Slider](slider) | 滑动选择 |
| [InputNumber](inputnumber) | 组件 |
