# Slider

**Related Components:** [Rate](./rate), [InputNumber](./inputnumber)


Slider Slider component for selecting a numeric value. Supports single selection、range selection、With Input、vertical, etc.. 

## Introduction

```tsx live-codeblock
import { Slider } from 'orva-ui';
// 或按需导入
import { Slider } from 'orva-ui/form';
```

## Basic Usage

```tsx live-codeblock
import React, { useState } from 'react';
import { Slider } from 'orva-ui';

export default () => {
  const [value, setValue] = useState(50);
  
  return <Slider value={value} onChange={setValue} />;
};
```

## Examples

### Basic Slider

```tsx live-codeblock
import React, { useState } from 'react';
import { Slider } from 'orva-ui';

export default () => {
  const [value, setValue] = useState(50);
  
  return <Slider value={value} onChange={setValue} min={0} max={100} />;
};
```

### range selection

```tsx live-codeblock
import React, { useState } from 'react';
import { Slider } from 'orva-ui';

export default () => {
  const [value, setValue] = useState([20, 80]);
  
  return <Slider range value={value} onChange={setValue} min={0} max={100} />;
};
```

### With Input

```tsx live-codeblock
import React, { useState } from 'react';
import { Slider, InputNumber } from 'orva-ui';

export default () => {
  const [value, setValue] = useState(50);
  
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
      <Slider value={value} onChange={setValue} min={0} max={100} style={{ flex: 1 }} />
      <InputNumber value={value} onChange={setValue} min={0} max={100} style={{ width: 80 }} />
    </div>
  );
};
```

### step sizeSetting

```tsx live-codeblock
import React, { useState } from 'react';
import { Slider } from 'orva-ui';

export default () => {
  const [value, setValue] = useState(0);
  
  return <Slider value={value} onChange={setValue} min={0} max={100} step={10} />;
};
```

### 带Mark

```tsx live-codeblock
import React, { useState } from 'react';
import { Slider } from 'orva-ui';

export default () => {
  const [value, setValue] = useState(50);
  
  const marks = {
    0: '0',
    25: '25',
    50: '50',
    75: '75',
    100: '100',
  };
  
  return <Slider value={value} onChange={setValue} min={0} max={100} marks={marks} />;
};
```

### verticalSlider

```tsx live-codeblock
import React, { useState } from 'react';
import { Slider } from 'orva-ui';

export default () => {
  const [value, setValue] = useState(50);
  
  return (
    <div style={{ height: 200, display: 'flex', alignItems: 'center' }}>
      <Slider value={value} onChange={setValue} vertical min={0} max={100} />
    </div>
  );
};
```

### disabledstatus

```tsx live-codeblock
import React, { useState } from 'react';
import { Slider } from 'orva-ui';

export default () => {
  const [value, setValue] = useState(50);
  
  return <Slider value={value} onChange={setValue} disabled min={0} max={100} />;
};
```

### Inverted colorSlider

```tsx live-codeblock
import React, { useState } from 'react';
import { Slider } from 'orva-ui';

export default () => {
  const [value, setValue] = useState(50);
  
  return <Slider value={value} onChange={setValue} reverse min={0} max={100} />;
};
```

### Customcolors

```tsx live-codeblock
import React, { useState } from 'react';
import { Slider } from 'orva-ui';

export default () => {
  const [value, setValue] = useState(50);
  
  return <Slider value={value} onChange={setValue} color="#3b82f6" min={0} max={100} />;
};
```

## Props

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| value | number / number[] | - | Value (controlled) |
| defaultValue | number / number[] | - | Default value |
| range | boolean | `false` | Whetherrange selection |
| min | number | `0` | MinValue |
| max | number | `100` | MaxValue |
| step | number | `1` | step size |
| marks | Record<number, string> | - | Mark |
| vertical | boolean | `false` | Whethervertical |
| reverse | boolean | `false` | WhetherReverse |
| disabled | boolean | `false` | Whetherdisabled |
| color | string | - | colors |
| onChange | `(value: number | number[]) => void` | - | Change handler callback |
| className | string | - | Custom class name |
| style | CSSProperties | - | Custom Style |

## Notes

- Ensure the component is wrapped in `ThemeProvider` for full theme support
- range selection时 `value` 为 `[min, max]`
- `marks` Object keys must match `min`/`max` Range matching
## Related Components

The following components are related and may be used together:

| Component | Description |
|-----------|-------------|
| [Rate](rate) | RatingInput |
| [InputNumber](inputnumber) | Component |
