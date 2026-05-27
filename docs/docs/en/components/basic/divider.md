# Divider

**Related Components:** [Space](./space), [Layout](./layout)


Divider Divider component for visual separation between content. Supports horizontal、vertical、带Text, etc.. 

## Introduction

```tsx live-codeblock
import { Divider } from 'orva-ui';
// 或按需导入
import { Divider } from 'orva-ui/basic';
```

## Basic Usage

```tsx live-codeblock
import React from 'react';
import { Divider } from 'orva-ui';

export default () => {
  return (
    <>
      <div>Content 1</div>
      <Divider />
      <div>Content 2</div>
    </>
  );
};
```

## Examples

### Basic Divider

```tsx live-codeblock
import React from 'react';
import { Divider } from 'orva-ui';

export default () => {
  return (
    <>
      <div>Content 1</div>
      <Divider />
      <div>Content 2</div>
    </>
  );
};
```

### 带Text

```tsx live-codeblock
import React from 'react';
import { Divider } from 'orva-ui';

export default () => {
  return (
    <>
      <div>Content 1</div>
      <Divider text="分隔线" />
      <div>Content 2</div>
    </>
  );
};
```

### verticalDivider

```tsx live-codeblock
import React from 'react';
import { Divider } from 'orva-ui';

export default () => {
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <span>项目 1</span>
      <Divider vertical />
      <span>项目 2</span>
      <Divider vertical />
      <span>项目 3</span>
    </div>
  );
};
```

### Dashed

```tsx live-codeblock
import React from 'react';
import { Divider } from 'orva-ui';

export default () => {
  return (
    <>
      <div>Content 1</div>
      <Divider dashed />
      <div>Content 2</div>
    </>
  );
};
```

### Customcolors

```tsx live-codeblock
import React from 'react';
import { Divider } from 'orva-ui';

export default () => {
  return (
    <>
      <div>Content 1</div>
      <Divider color="#3b82f6" />
      <div>Content 2</div>
    </>
  );
};
```

### With position

```tsx live-codeblock
import React from 'react';
import { Divider } from 'orva-ui';

export default () => {
  return (
    <>
      <div>Content 1</div>
      <Divider text="左alignment" textPosition="left" />
      <Divider text="居中alignment" textPosition="center" />
      <Divider text="右alignment" textPosition="right" />
      <div>Content 2</div>
    </>
  );
};
```

### Custom Style

```tsx live-codeblock
import React from 'react';
import { Divider } from 'orva-ui';

export default () => {
  return (
    <>
      <div>Content 1</div>
      <Divider style={{ borderColor: '#3b82f6', borderWidth: 2 }} />
      <div>Content 2</div>
    </>
  );
};
```

## Props

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| text | ReactNode | - | DividerText |
| textPosition | `'left' \| 'center' \| 'right'` | `'center'` | TextPosition |
| vertical | boolean | `false` | Whethervertical |
| dashed | boolean | `false` | WhetherDashed |
| color | string | - | colors |
| className | string | - | Custom class name |
| style | CSSProperties | - | Custom Style |

## Notes

- Ensure the component is wrapped in `ThemeProvider` for full theme support
- `vertical` 为 `true` 时TextInvalid position
- `textPosition` Only in `text` 存在时生效
## Related Components

The following components are related and may be used together:

| Component | Description |
|------|------|
| [Space](space) | spacing控制 |
| [Layout](layout) | PageLayout |
