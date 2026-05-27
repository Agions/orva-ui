# DatePicker 日期选择器

**Related Components:** [TimePicker](./timepicker), [Calendar](./calendar)


DatePicker 组件用于选择日期。支持单选、范围选择、禁用日期、自定义格式等。

## 引入

```tsx live-codeblock
import { DatePicker } from 'orva-ui';
// 或按需导入
import { DatePicker } from 'orva-ui/data-entry';
```

## 基本使用

```tsx live-codeblock
import React, { useState } from 'react';
import { DatePicker } from 'orva-ui';

export default () => {
  const [value, setValue] = useState(null);
  
  return (
    <DatePicker 
      value={value} 
      onChange={setValue} 
      placeholder="请选择日期"
    />
  );
};
```

## 使用示例

### 基础日期选择

```tsx live-codeblock
import React, { useState } from 'react';
import { DatePicker } from 'orva-ui';

export default () => {
  const [value, setValue] = useState(null);
  
  return (
    <DatePicker 
      value={value} 
      onChange={setValue} 
      placeholder="请选择日期"
      style={{ width: 250 }}
    />
  );
};
```

### 日期范围选择

```tsx live-codeblock
import React, { useState } from 'react';
import { DatePicker } from 'orva-ui';

export default () => {
  const [value, setValue] = useState([null, null]);
  
  return (
    <DatePicker 
      range
      value={value} 
      onChange={setValue} 
      placeholder={['开始日期', '结束日期']}
      style={{ width: 400 }}
    />
  );
};
```

### 禁用日期

```tsx live-codeblock
import React, { useState } from 'react';
import { DatePicker } from 'orva-ui';

export default () => {
  const [value, setValue] = useState(null);
  
  const disabledDate = (date: Date) => {
    // 禁用过去的所有日期
    return date < new Date(new Date().setHours(0, 0, 0, 0));
  };
  
  return (
    <DatePicker 
      value={value} 
      onChange={setValue} 
      placeholder="请选择日期"
      disabledDate={disabledDate}
      style={{ width: 250 }}
    />
  );
};
```

### 自定义格式

```tsx live-codeblock
import React, { useState } from 'react';
import { DatePicker } from 'orva-ui';

export default () => {
  const [value, setValue] = useState(null);
  
  return (
    <DatePicker 
      value={value} 
      onChange={setValue} 
      placeholder="请选择日期"
      format="YYYY-MM-DD"
      style={{ width: 250 }}
    />
  );
};
```

### 显示时间

```tsx live-codeblock
import React, { useState } from 'react';
import { DatePicker } from 'orva-ui';

export default () => {
  const [value, setValue] = useState(null);
  
  return (
    <DatePicker 
      showTime
      value={value} 
      onChange={setValue} 
      placeholder="请选择日期和时间"
      format="YYYY-MM-DD HH:mm:ss"
      style={{ width: 300 }}
    />
  );
};
```

### 禁用时间

```tsx live-codeblock
import React, { useState } from 'react';
import { DatePicker } from 'orva-ui';

export default () => {
  const [value, setValue] = useState(null);
  
  const disabledTime = (date: Date) => {
    // 禁用 18:00 之后的时间
    const hours = date.getHours();
    return {
      disabledHours: () => Array.from({ length: 24 - hours }, (_, i) => i + hours),
    };
  };
  
  return (
    <DatePicker 
      showTime
      value={value} 
      onChange={setValue} 
      placeholder="请选择日期和时间"
      disabledTime={disabledTime}
      style={{ width: 300 }}
    />
  );
};
```

### 快捷选择

```tsx live-codeblock
import React, { useState } from 'react';
import { DatePicker } from 'orva-ui';

export default () => {
  const [value, setValue] = useState(null);
  
  const shortcuts = [
    { label: '今天', value: new Date() },
    { label: '昨天', value: new Date(Date.now() - 86400000) },
    { label: '本周', value: [getWeekStart(), getWeekEnd()] },
    { label: '本月', value: [getMonthStart(), getMonthEnd()] },
  ];
  
  return (
    <DatePicker 
      value={value} 
      onChange={setValue} 
      placeholder="请选择日期"
      shortcuts={shortcuts}
      style={{ width: 250 }}
    />
  );
};
```

### 月份选择

```tsx live-codeblock
import React, { useState } from 'react';
import { DatePicker } from 'orva-ui';

export default () => {
  const [value, setValue] = useState(null);
  
  return (
    <DatePicker 
      mode="month"
      value={value} 
      onChange={setValue} 
      placeholder="请选择月份"
      format="YYYY-MM"
      style={{ width: 250 }}
    />
  );
};
```

### 年份选择

```tsx live-codeblock
import React, { useState } from 'react';
import { DatePicker } from 'orva-ui';

export default () => {
  const [value, setValue] = useState(null);
  
  return (
    <DatePicker 
      mode="year"
      value={value} 
      onChange={setValue} 
      placeholder="请选择年份"
      format="YYYY"
      style={{ width: 250 }}
    />
  );
};
```

## Props

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| value | Date / [Date, Date] | - | 选中值（受控） |
| defaultValue | Date / [Date, Date] | - | 默认选中值 |
| range | boolean | `false` | 是否范围选择 |
| mode | `'date' \| 'month' \| 'year'` | `'date'` | 选择模式 |
| showTime | boolean | `false` | 是否显示时间 |
| format | string | `'YYYY-MM-DD'` | 日期格式 |
| placeholder | string / [string, string] | - | 占位符 |
| disabledDate | `(date: Date) =\> boolean` | - | 禁用日期函数 |
| disabledTime | `(date: Date) =\> DisabledTime` | - | 禁用时间函数 |
| shortcuts | Array\<\{label, value\}\> | - | 快捷选项 |
| clearable | boolean | `true` | 是否可清除 |
| disabled | boolean | `false` | 是否禁用 |
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | 尺寸 |
| onChange | `(value: any) =\> void` | - | 值变化回调 |
| className | string | - | 自定义类名 |
| style | CSSProperties | - | 自定义样式 |

## 注意事项

- 请确保在 `ThemeProvider` 包裹下使用组件以获得完整的主题支持
- 范围选择时 `value` 为 `[startDate, endDate]`
- `disabledDate` 返回 `true` 表示禁用该日期
## 相关组件

以下是与当前组件相关的其他组件，可能在使用时搭配使用：

| 组件 | 说明 |
|------|------|
| [TimePicker](timepicker) | 组件 |
| [Calendar](calendar) | 日历视图 |
