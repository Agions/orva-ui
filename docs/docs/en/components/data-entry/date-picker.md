# DatePicker

**Related Components:** [TimePicker](./timepicker), [Calendar](./calendar)


DatePicker DatePicker component for date selection. Supports single selection、range selection、disabledDate、CustomFormat, etc.. 

## Introduction

```tsx live-codeblock
import { DatePicker } from 'orva-ui';
// 或按需导入
import { DatePicker } from 'orva-ui/data-entry';
```

## Basic Usage

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

## Examples

### Basic Date picker

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

### Daterange selection

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

### disabledDate

```tsx live-codeblock
import React, { useState } from 'react';
import { DatePicker } from 'orva-ui';

export default () => {
  const [value, setValue] = useState(null);
  
  const disabledDate = (date: Date) => {
    // disabled过去的所有日期
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

### CustomFormat

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

### ShowTime

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

### disabledTime

```tsx live-codeblock
import React, { useState } from 'react';
import { DatePicker } from 'orva-ui';

export default () => {
  const [value, setValue] = useState(null);
  
  const disabledTime = (date: Date) => {
    // disabled 18:00 之后的时间
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

### Quick Select

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

### 月份Selection

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

### 年份Selection

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

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| value | Date / [Date, Date] | - | SelectedValue (controlled) |
| defaultValue | Date / [Date, Date] | - | DefaultSelectedValue |
| range | boolean | `false` | Whetherrange selection |
| mode | `'date' \| 'month' \| 'year'` | `'date'` | SelectionMode |
| showTime | boolean | `false` | Show or hideTime |
| format | string | `'YYYY-MM-DD'` | Date Format |
| placeholder | string / [string, string] | - | Placeholder text |
| disabledDate | `(date: Date) =\> boolean` | - | disabledDateFunction |
| disabledTime | `(date: Date) =\> DisabledTime` | - | disabledTimeFunction |
| shortcuts | Array\<\{label, value\}\> | - | QuickOption |
| clearable | boolean | `true` | WhetherClearable |
| disabled | boolean | `false` | Whetherdisabled |
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | sizes |
| onChange | `(value: any) =\> void` | - | Change handler callback |
| className | string | - | Custom class name |
| style | CSSProperties | - | Custom Style |

## Notes

- Ensure the component is wrapped in `ThemeProvider` for full theme support
- range selection时 `value` 为 `[startDate, endDate]`
- `disabledDate` Back `true` Indicatedisabled该Date
## Related Components

The following components are related and may be used together:

| Component | Description |
|-----------|-------------|
| [TimePicker](timepicker) | Component |
| [Calendar](calendar) | Calendar view |
