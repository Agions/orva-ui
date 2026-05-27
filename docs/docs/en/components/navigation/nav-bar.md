# NavBar

**Related Components:** [Menu](./menu), [Tabs](./tabs)


NavBar NavBar component for top page navigation. Supports headings、BackButton、Sticky/FixedPosition, etc.. 

## Introduction

```tsx live-codeblock
import { NavBar } from 'orva-ui';
// 或按需导入
import { NavBar } from 'orva-ui/navigation';
```

## Basic Usage

```tsx live-codeblock
import React, { useState } from 'react';
import { NavBar } from 'orva-ui';

export default () => {
  return <NavBar title="页面Title" />;
};
```

## Examples

### Basic Navigation栏

```tsx live-codeblock
import React, { useState } from 'react';
import { NavBar } from 'orva-ui';

export default () => {
  return <NavBar title="页面Title" />;
};
```

### 带BackButton

```tsx live-codeblock
import React, { useState } from 'react';
import { NavBar } from 'orva-ui';

export default () => {
  const handleBack = () => {
    console.log('Back');
    // history.back();
  };
  
  return <NavBar title="页面Title" onBack={handleBack} />;
};
```

### CustomLeftContent

```tsx live-codeblock
import React, { useState } from 'react';
import { NavBar, Icon } from 'orva-ui';

export default () => {
  return (
    <NavBar
      title="页面Title"
      leftContent={
        <Icon name="mdi:menu" style={{ cursor: 'pointer' }} />
      }
    />
  );
};
```

### CustomRightContent

```tsx live-codeblock
import React, { useState } from 'react';
import { NavBar, Icon, Badge } from 'orva-ui';

export default () => {
  return (
    <NavBar
      title="页面Title"
      rightContent={
        <>
          <Badge count={3}>
            <Icon name="mdi:bell" style={{ cursor: 'pointer', marginRight: 16 }} />
          </Badge>
          <Icon name="mdi:account" style={{ cursor: 'pointer' }} />
        </>
      }
    />
  );
};
```

### Sticky/FixedTop

```tsx live-codeblock
import React, { useState } from 'react';
import { NavBar } from 'orva-ui';

export default () => {
  return (
    <>
      <NavBar title="页面Title" fixed />
      <div style={{ paddingTop: 56 }}>
        {/* 页面Content */}
      </div>
    </>
  );
};
```

### Customcolors

```tsx live-codeblock
import React, { useState } from 'react';
import { NavBar } from 'orva-ui';

export default () => {
  return (
    <NavBar 
      title="页面Title" 
      style={{ background: '#3b82f6', color: '#fff' }}
    />
  );
};
```

### With Search框

```tsx live-codeblock
import React, { useState } from 'react';
import { NavBar, Input, Icon } from 'orva-ui';

export default () => {
  const [searchValue, setSearchValue] = useState('');
  
  return (
    <NavBar
      title="页面Title"
      rightContent={
        <Input
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Search..."
          prefix={<Icon name="mdi:magnify" />}
          style={{ width: 200 }}
        />
      }
    />
  );
};
```

## Props

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| title | ReactNode | - | Title |
| leftContent | ReactNode | - | LeftContent |
| rightContent | ReactNode | - | RightContent |
| onBack | `() => void` | - | BackCallback |
| fixed | boolean | `false` | Fixed |
| className | string | - | Custom class name |
| style | CSSProperties | - | Custom Style |

## Notes

- Ensure the component is wrapped in `ThemeProvider` for full theme support
- `fixed` 为 `true` Should beContent添加 `paddingTop`
- `leftContent` 和 `rightContent` Can be any ReactNode
## Related Components

The following components are related and may be used together:

| Component | Description |
|-----------|-------------|
| [Menu](menu) | NavigationMenu |
| [Tabs](tabs) | Tab/LabelNavigation |
