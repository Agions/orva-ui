# Badge

**Related Components:** [Avatar](./avatar), [Button](./button)


Badge Component for top-right corner of elementShownumeric badge或statusIdentifier. Supports dot badge、numeric badge、Text, etc.. 

## Introduction

```tsx live-codeblock
import { Badge } from 'orva-ui';
// 或按需导入
import { Badge } from 'orva-ui/display';
```

## Basic Usage

```tsx live-codeblock
import React from 'react';
import { Badge } from 'orva-ui';

export default () => (
  <Badge count={5}>
    <button>Notification</button>
  </Badge>
);
```

## Examples

### numeric badgeBadge

```tsx live-codeblock
import React from 'react';
import { Badge } from 'orva-ui';

export default () => (
  <>
    <Badge count={5}>Message</Badge>
    <Badge count={12}>Notification</Badge>
    <Badge count={100}>提醒</Badge>
  </>
);
```

### DotBadge

```tsx live-codeblock
import React from 'react';
import { Badge } from 'orva-ui';

export default () => (
  <>
    <Badge dot>Message</Badge>
    <Badge dot>Notification</Badge>
    <Badge dot>提醒</Badge>
  </>
);
```

### MaxShow值

```tsx live-codeblock
import React from 'react';
import { Badge } from 'orva-ui';

export default () => (
  <>
    <Badge count={5} maxCount={9}>Message</Badge>
    <Badge count={20} maxCount={9}>Notification</Badge>
    <Badge count={100} maxCount={99}>提醒</Badge>
  </>
);
```

### CustomContent

```tsx live-codeblock
import React from 'react';
import { Badge, Icon } from 'orva-ui';

export default () => (
  <>
    <Badge content="New">Message</Badge>
    <Badge content={<Icon name="mdi:star" />}>收藏</Badge>
    <Badge content="Hot">热门</Badge>
  </>
);
```

### statusBadge

```tsx live-codeblock
import React from 'react';
import { Badge } from 'orva-ui';

export default () => (
  <>
    <Badge status="success">Success</Badge>
    <Badge status="processing">处理中</Badge>
    <Badge status="error">error</Badge>
    <Badge status="warning">warning</Badge>
    <Badge status="default">Default</Badge>
  </>
);
```

### 与Avatar组合

```tsx live-codeblock
import React from 'react';
import { Badge, Avatar } from 'orva-ui';

export default () => (
  <>
    <Badge count={5} offset={[10, 10]}>
      <Avatar src="https://via.placeholder.com/100" />
    </Badge>
    <Badge dot offset={[10, 10]}>
      <Avatar src="https://via.placeholder.com/100" />
    </Badge>
  </>
);
```

### 与Button组合

```tsx live-codeblock
import React from 'react';
import { Badge, Button } from 'orva-ui';

export default () => (
  <Badge count={3} offset={[-5, 5]}>
    <Button icon={<Icon name="mdi:bell" />}>Notification</Button>
  </Badge>
);
```

## Props

### Badge

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| count | number | - | Badgenumeric badge |
| content | ReactNode | - | CustomContent |
| dot | boolean | `false` | Show or hideDot |
| maxCount | number | `99` | MaxDisplayValue |
| status | `'success' \| 'processing' \| 'error' \| 'warning' \| 'default'` | - | statusType |
| offset | `[number, number]` | - | Offset量 `[x, y]` |
| color | string | - | Customcolors |
| className | string | - | Custom class name |
| style | CSSProperties | - | Custom Style |

## Theme customization

Via `createTheme` 或 `ThemeProvider` Custom主题变量, Can adjust componentcolors、Font、spacing, etc.Style. 

```tsx live-codeblock
import { createTheme, ThemeProvider } from 'orva-ui';

const theme = createTheme({
  badge: {
    minWidth: '20px',
    height: '20px',
    borderRadius: '10px',
    fontSize: '12px',
  },
});
```

## Notes

- Ensure the component is wrapped in `ThemeProvider` for full theme support
- `count` 和 `content` 互斥, 同时Setting时 `content` 优先
- `dot` 为 `true` 时ShowDot而非numeric badge
## Related Components

The following components are related and may be used together:

| Component | Description |
|-----------|-------------|
| [Avatar](avatar) | 用户Avatar |
| [Button](button) | Basic InteractionComponent |
