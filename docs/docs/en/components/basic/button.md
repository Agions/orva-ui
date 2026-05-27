# Button

Button component is used to trigger an action, such as submitting a form, opening a dialog, deleting data, etc. Supports multiple types, sizes, and states, with customizable colors and styles.

## Introduction

```tsx
import { Button } from 'orva-ui';
// Or import on-demand
import { Button } from 'orva-ui/basic';
```

## Basic Usage

```tsx live-codeblock
import React from 'react';
import { Button } from 'orva-ui';

export default () => (
  <Button>
    Default Button
  </Button>
);
```

### Types

```tsx live-codeblock
import React from 'react';
import { Button } from 'orva-ui';

export default () => (
  <>
    <Button type="primary">Primary</Button>
    <Button type="default">Default</Button>
    <Button type="dashed">Dashed</Button>
    <Button type="text">Text</Button>
    <Button type="link">Link</Button>
  </>
);
```

### Sizes

```tsx live-codeblock
import React from 'react';
import { Button } from 'orva-ui';

export default () => (
  <>
    <Button size="sm" style={{ marginRight: 8 }}>Small</Button>
    <Button size="md" style={{ marginRight: 8 }}>Medium</Button>
    <Button size="lg">Large</Button>
  </>
);
```

### Loading State

```tsx live-codeblock
import React from 'react';
import { Button, Loading } from 'orva-ui';

export default () => {
  const [loading, setLoading] = React.useState(false);

  return (
    <Button loading={loading} onClick={() => setLoading(true)}>
      {loading ? 'Loading...' : 'Click Me'}
    </Button>
  );
};
```

### Disabled State

```tsx live-codeblock
import React from 'react';
import { Button } from 'orva-ui';

export default () => (
  <Button disabled>Disabled</Button>
);
```

### Icon Button

```tsx live-codeblock
import React from 'react';
import { Button, Icon } from 'orva-ui';

export default () => (
  <>
    <Button icon={<Icon name="search" />}>Search</Button>
    <Button icon={<Icon name="plus" />} type="primary">Add</Button>
  </>
);
```

## Props

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| type | `'primary' \| 'default' \| 'dashed' \| 'text' \| 'link'` | `'default'` | Button type |
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | Button size |
| loading | boolean | `false` | Loading state |
| disabled | boolean | `false` | Disabled state |
| icon | ReactNode | - | Icon before text |
| onClick | `(e: MouseEvent) => void` | - | Click handler |
| className | string | - | Custom class name |
| style | CSSProperties | - | Custom styles |

## Related Components

The following components are related to the current component and may be used together:

| Component | Description |
|-----------|-------------|
| [Icon](../basic/icon) | Icon tool |
| [Ripple](../basic/ripple) | Interaction effect |
| [Space](../layout/space) | Spacing control |

## Notes

- Ensure the component is wrapped in `ThemeProvider` for full theme support
- Component supports server-side rendering (SSR)
