# Avatar

**Related Components:** [Badge](./badge), [List](./list)


Avatar component for displaying user avatars or identifiers. Supports image、icon、TextThree types, CombinableUse. 

## Introduction

```tsx live-codeblock
import { Avatar } from 'orva-ui';
// 或按需导入
import { Avatar } from 'orva-ui/display';
```

## Basic Usage

```tsx live-codeblock
import React from 'react';
import { Avatar } from 'orva-ui';

export default () => (
  <Avatar src="https://via.placeholder.com/100" alt="用户Avatar" />
);
```

## Examples

### ImageAvatar

```tsx live-codeblock
import React from 'react';
import { Avatar } from 'orva-ui';

export default () => (
  <Avatar 
    src="https://via.placeholder.com/100" 
    alt="用户Avatar"
  />
);
```

### TextAvatar

```tsx live-codeblock
import React from 'react';
import { Avatar } from 'orva-ui';

export default () => (
  <>
    <Avatar>张三</Avatar>
    <Avatar color="#3b82f6">李四</Avatar>
    <Avatar color="#10b981" textColor="#fff">王五</Avatar>
  </>
);
```

### iconAvatar

```tsx live-codeblock
import React from 'react';
import { Avatar, Icon } from 'orva-ui';

export default () => (
  <>
    <Avatar icon={<Icon name="mdi:account" />} />
    <Avatar icon={<Icon name="mdi:account" />} color="#3b82f6" />
    <Avatar icon={<Icon name="mdi:account" />} size="lg" />
  </>
);
```

### sizes

```tsx live-codeblock
import React from 'react';
import { Avatar } from 'orva-ui';

export default () => (
  <>
    <Avatar size="sm">S</Avatar>
    <Avatar size="md">M</Avatar>
    <Avatar size="lg">L</Avatar>
    <Avatar size="xl">XL</Avatar>
  </>
);
```

### Shape

```tsx live-codeblock
import React from 'react';
import { Avatar } from 'orva-ui';

export default () => (
  <>
    <Avatar shape="circle">圆形</Avatar>
    <Avatar shape="square">方形</Avatar>
    <Avatar shape="round">Border radius</Avatar>
  </>
);
```

### Avatar组

```tsx live-codeblock
import React from 'react';
import { Avatar } from 'orva-ui';

export default () => (
  <>
    <Avatar src="https://via.placeholder.com/100/FF0000" size="sm" />
    <Avatar src="https://via.placeholder.com/100/00FF00" size="sm" />
    <Avatar src="https://via.placeholder.com/100/0000FF" size="sm" />
    <Avatar src="https://via.placeholder.com/100/FFFF00" size="sm" />
  </>
);
```

### 带statusIdentifier

```tsx live-codeblock
import React from 'react';
import { Avatar } from 'orva-ui';

export default () => (
  <>
    <Avatar 
      src="https://via.placeholder.com/100" 
      status="online"
    />
    <Avatar 
      src="https://via.placeholder.com/100" 
      status="offline"
    />
    <Avatar 
      src="https://via.placeholder.com/100" 
      status="busy"
    />
  </>
);
```

## Props

### Avatar

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| src | string | - | AvatarImage URL |
| alt | string | - | Imagedescription |
| icon | ReactNode | - | icon（When noneImage时Use） |
| size | `'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Avatarsizes |
| shape | `'circle' \| 'square' \| 'round'` | `'circle'` | AvatarShape |
| color | string | - | Backgroundcolors（TextAvatar） |
| textColor | string | - | Textcolors |
| status | `'online' \| 'offline' \| 'busy'` | - | statusIdentifier |
| onError | `(e: Event) => void` | - | ImageLoadingFailureCallback |
| className | string | - | Custom class name |
| style | CSSProperties | - | Custom Style |

## Theme customization

Via `createTheme` 或 `ThemeProvider` Custom主题变量, Can adjust componentcolors、Font、spacing, etc.Style. 

```tsx live-codeblock
import { createTheme, ThemeProvider } from 'orva-ui';

const theme = createTheme({
  avatar: {
    borderRadius: '50%',
    borderWidth: '2px',
  },
});
```

## Notes

- Ensure the component is wrapped in `ThemeProvider` for full theme support
- 当 `src` Loading失败时, 会AutoShow `icon` 或Text
- ImageAvatar优先于icon和Text
## Related Components

The following components are related and may be used together:

| Component | Description |
|-----------|-------------|
| [Badge](badge) | statusBadge |
| [List](list) | ListDisplay |
