# Calendar

**Related Components:** [DatePicker](./datepicker), [RangePicker](./rangepicker)


Calendar Calendar component for date selection or display. Supports month view、year view、CustomCell, etc.. 

## Introduction

```tsx live-codeblock
import { Calendar } from 'orva-ui';
// 或按需导入
import { Calendar } from 'orva-ui/display';
```

## Basic Usage

```tsx live-codeblock
import React, { useState } from 'react';
import { Calendar } from 'orva-ui';

export default () => {
  const [value, setValue] = useState(new Date());
  
  return <Calendar value={value} onChange={setValue} />;
};
```

## Examples

### Basic Calendar

```tsx live-codeblock
import React, { useState } from 'react';
import { Calendar } from 'orva-ui';

export default () => {
  const [value, setValue] = useState(new Date());
  
  return <Calendar value={value} onChange={setValue} />;
};
```

### disabledDate

```tsx live-codeblock
import React, { useState } from 'react';
import { Calendar } from 'orva-ui';

export default () => {
  const [value, setValue] = useState(new Date());
  
  const disabledDate = (date: Date) => {
    // disabled过去的所有日期
    return date < new Date(new Date().setHours(0, 0, 0, 0));
  };
  
  return <Calendar value={value} onChange={setValue} disabledDate={disabledDate} />;
};
```

### CustomCell

```tsx live-codeblock
import React, { useState } from 'react';
import { Calendar, Badge } from 'orva-ui';

export default () => {
  const [value, setValue] = useState(new Date());
  
  const cellRender = (current: Date) => {
    const day = current.getDate();
    const isToday = isSameDay(current, new Date());
    const hasEvent = day % 3 === 0; // 模拟有事件的日期
    
    return (
      <div style={{ position: 'relative' }}>
        {hasEvent && <Badge size="sm" color="#ef4444" style={{ position: 'absolute', top: 2, right: 2 }} />}
        {isToday && <strong>{day}</strong>}
        {!isToday && day}
      </div>
    );
  };
  
  return <Calendar value={value} onChange={setValue} cellRender={cellRender} />;
};

function isSameDay(d1: Date, d2: Date) {
  return d1.getFullYear() === d2.getFullYear() &&
         d1.getMonth() === d2.getMonth() &&
         d1.getDate() === d2.getDate();
}
```

### ShowEvent

```tsx live-codeblock
import React, { useState } from 'react';
import { Calendar, Badge } from 'orva-ui';

export default () => {
  const [value, setValue] = useState(new Date());
  
  const events = {
    1: [{ title: '会议', color: '#3b82f6' }],
    5: [{ title: '生日', color: '#10b981' }],
    10: [{ title: '截止', color: '#f59e0b' }],
    15: [{ title: '发布', color: '#ef4444' }],
  };
  
  const cellRender = (current: Date) => {
    const day = current.getDate();
    const dayEvents = events[day];
    
    return (
      <div style={{ height: '100%', padding: 4 }}>
        {dayEvents?.map((event, i) => (
          <div key={i} style={{ fontSize: 10, color: event.color }}>
            {event.title}
          </div>
        ))}
      </div>
    );
  };
  
  return <Calendar value={value} onChange={setValue} cellRender={cellRender} />;
};
```

### range selection

```tsx live-codeblock
import React, { useState } from 'react';
import { Calendar } from 'orva-ui';

export default () => {
  const [value, setValue] = useState([null, null]);
  
  return <Calendar range value={value} onChange={setValue} />;
};
```

### year view

```tsx live-codeblock
import React, { useState } from 'react';
import { Calendar } from 'orva-ui';

export default () => {
  const [value, setValue] = useState(new Date());
  
  return <Calendar value={value} onChange={setValue} mode="year" />;
};
```

## Props

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| value | Date / [Date, Date] | `new Date()` | SelectedDate |
| defaultValue | Date / [Date, Date] | - | DefaultDate |
| range | boolean | `false` | Whetherrange selection |
| mode | `'month' \| 'year'` | `'month'` | ViewMode |
| disabledDate | `(date: Date) => boolean` | - | disabledDateFunction |
| cellRender | `(current: Date) => ReactNode` | - | CellRender |
| headerRender | `(props: HeaderProps) => ReactNode` | - | 头部Render |
| onChange | `(value: Date | [Date, Date]) => void` | - | DateChange callback |
| className | string | - | Custom class name |
| style | CSSProperties | - | Custom Style |

## Notes

- Ensure the component is wrapped in `ThemeProvider` for full theme support
- `cellRender` 可用于Custom DateCellContent
- range selection时 `value` 为 `[startDate, endDate]`
## Related Components

The following components are related and may be used together:

| Component | Description |
|-----------|-------------|
| [DatePicker](datepicker) | Component |
| [RangePicker](rangepicker) | Component |
