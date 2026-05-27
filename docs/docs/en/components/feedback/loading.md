# Loading

**Related Components:** [Spin](./spin), [Skeleton](./skeleton)


Loading component for displaying loading state. Supports global loading、local loading、CustomText, etc.. 

## Introduction

```tsx live-codeblock
import { Loading } from 'orva-ui';
// 或按需导入
import { Loading } from 'orva-ui/feedback';
```

## Basic Usage

```tsx live-codeblock
import React, { useState } from 'react';
import { Loading } from 'orva-ui';

export default () => <Loading />;
```

## Examples

### Basic Loading

```tsx live-codeblock
import React, { useState } from 'react';
import { Loading } from 'orva-ui';

export default () => <Loading />;
```

### With text

```tsx live-codeblock
import React, { useState } from 'react';
import { Loading } from 'orva-ui';

export default () => <Loading tip="Loading中...">Content</Loading>;
```

### Full screenLoading

```tsx live-codeblock
import React, { useState } from 'react';
import { Loading } from 'orva-ui';

export default () => (
  <Loading fullscreen tip="正在Loading数据...">
    <div>页面Content</div>
  </Loading>
);
```

### sizes

```tsx live-codeblock
import React, { useState } from 'react';
import { Loading } from 'orva-ui';

export default () => (
  <>
    <Loading size="sm" />
    <Loading size="md" />
    <Loading size="lg" />
  </>
);
```

### Customcolors

```tsx live-codeblock
import React, { useState } from 'react';
import { Loading } from 'orva-ui';

export default () => (
  <>
    <Loading color="#3b82f6" />
    <Loading color="#10b981" />
    <Loading color="#f59e0b" />
  </>
);
```

### WrapContent

```tsx live-codeblock
import React, { useState } from 'react';
import { Loading, Card } from 'orva-ui';

export default () => (
  <Loading loading>
    <Card>
      <Card.Body>CardContent</Card.Body>
    </Card>
  </Loading>
);
```

### ConditionLoading

```tsx live-codeblock
import React, { useState } from 'react';
import { Loading, Button } from 'orva-ui';

export default () => {
  const [loading, setLoading] = useState(false);
  
  const handleClick = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };
  
  return (
    <>
      <Button onClick={handleClick}>触发Loading</Button>
      <Loading loading={loading} tip="Loading中...">
        <div>Content区域</div>
      </Loading>
    </>
  );
};
```

## Props

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| loading | boolean | `true` | Show or hideLoading |
| fullscreen | boolean | `false` | WhetherFullscreenDisplay |
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | Loadingiconsizes |
| color | string | - | Loadingiconcolors |
| tip | string | - | LoadingHintText |
| children | ReactNode | - | Wrap的Content |
| className | string | - | Custom class name |
| style | CSSProperties | - | Custom Style |

## Theme customization

Via `createTheme` 或 `ThemeProvider` Custom主题变量, Can adjust componentcolors、Font、spacing, etc.Style. 

```tsx live-codeblock
import { createTheme, ThemeProvider } from 'orva-ui';

const theme = createTheme({
  loading: {
    size: '40px',
    color: '#3b82f6',
  },
});
```

## Notes

- Ensure the component is wrapped in `ThemeProvider` for full theme support
- `loading` 为 `false` 时不ShowLoadingstatus
- `fullscreen` Mode会覆盖整个视口
## Related Components

The following components are related and may be used together:

| Component | Description |
|-----------|-------------|
| [Spin](spin) | Component |
| [Skeleton](skeleton) | Component |
