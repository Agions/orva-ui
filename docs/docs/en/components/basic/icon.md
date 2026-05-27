# Icon

**Related Components:** [Button](./button), [Badge](./badge)


Icon Component用于Displayicon, Based on Iconify icon库, SupportsThousands of iconsicon. Adjustablesizes、colors, SupportsRotation and animation. 

## Introduction

```tsx live-codeblock
import { Icon } from 'orva-ui';
// 或按需导入
import { Icon } from 'orva-ui/basic';
```

## Basic Usage

```tsx live-codeblock
import React from 'react';
import { Icon } from 'orva-ui';

export default () => (
  <Icon name="mdi:home" />
);
```

## Examples

### Basic icon

```tsx live-codeblock
import React from 'react';
import { Icon } from 'orva-ui';

export default () => (
  <>
    <Icon name="mdi:home" />
    <Icon name="mdi:heart" />
    <Icon name="mdi:star" />
    <Icon name="mdi:settings" />
  </>
);
```

### Customcolors

```tsx live-codeblock
import React from 'react';
import { Icon } from 'orva-ui';

export default () => (
  <>
    <Icon name="mdi:heart" color="red" />
    <Icon name="mdi:star" color="#f59e0b" />
    <Icon name="mdi:check-circle" color="green" />
    <Icon name="mdi:alert" color="#ef4444" />
  </>
);
```

### Customsizes

```tsx live-codeblock
import React from 'react';
import { Icon } from 'orva-ui';

export default () => (
  <>
    <Icon name="mdi:home" size={16} />
    <Icon name="mdi:home" size={24} />
    <Icon name="mdi:home" size={32} />
    <Icon name="mdi:home" size={48} />
  </>
);
```

### Spin animation

```tsx live-codeblock
import React from 'react';
import { Icon } from 'orva-ui';

export default () => (
  <>
    <Icon name="mdi:loading" spin />
    <Icon name="mdi:refresh" spin />
    <Icon name="mdi:cog" spin />
  </>
);
```

### 旋转角度

```tsx live-codeblock
import React from 'react';
import { Icon } from 'orva-ui';

export default () => (
  <>
    <Icon name="mdi:arrow-right" rotate={0} />
    <Icon name="mdi:arrow-right" rotate={45} />
    <Icon name="mdi:arrow-right" rotate={90} />
    <Icon name="mdi:arrow-right" rotate={180} />
    <Icon name="mdi:arrow-right" rotate={270} />
  </>
);
```

### 与Button组合

```tsx live-codeblock
import React from 'react';
import { Button, Icon } from 'orva-ui';

export default () => (
  <>
    <Button icon={<Icon name="mdi:search" />}>Search</Button>
    <Button icon={<Icon name="mdi:plus" />} type="primary">Add</Button>
    <Button icon={<Icon name="mdi:download" />} iconRight>Download</Button>
  </>
);
```

## Props

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| name | string | - | iconName（Iconify icon名, 如 `mdi:home`） |
| size | number / string | `'1em'` | iconsizes |
| color | string | `inherit` | iconcolors |
| rotate | number | `0` | 旋转角度（度） |
| spin | boolean | `false` | Show or hideSpin animation |
| className | string | - | Custom class name |
| style | CSSProperties | - | Custom Style |

## 常用icon集合

| 集合前缀 | Description | 示例 |
|----------|------|------|
| `mdi:` | Material Design Icons | `mdi:home`, `mdi:heart` |
| `bi:` | Bootstrap Icons | `bi:star`, `bi:check` |
| `fa:` | Font Awesome | `fa:home`, `fa:user` |
| `ri:` | Remix Icon | `ri:home-line`, `ri:star-fill` |

## Theme customization

Via `createTheme` 或 `ThemeProvider` Custom主题变量, Can adjust componentcolors、Font、spacing, etc.Style. 

```tsx live-codeblock
import { createTheme, ThemeProvider } from 'orva-ui';

const theme = createTheme({
  colors: {
    primary: '#a855f7',
  },
});
```

## Notes

- Ensure the component is wrapped in `ThemeProvider` for full theme support
- icon名称遵循 Iconify 命名规范：`集合名:icon名`
- Component supports server-side rendering (SSR)
## Related Components

The following components are related and may be used together:

| Component | Description |
|------|------|
| [Button](button) | Basic InteractionComponent |
| [Badge](badge) | statusBadge |
