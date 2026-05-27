# Icon 图标

**Related Components:** [Button](./button), [Badge](./badge)


Icon 组件用于展示图标，基于 Iconify 图标库，支持数千种图标。可调节大小、颜色，支持旋转和动画效果。

## 引入

```tsx live-codeblock
import { Icon } from 'orva-ui';
// 或按需导入
import { Icon } from 'orva-ui/basic';
```

## 基本使用

```tsx live-codeblock
import React from 'react';
import { Icon } from 'orva-ui';

export default () => (
  <Icon name="mdi:home" />
);
```

## 使用示例

### 基础图标

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

### 自定义颜色

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

### 自定义大小

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

### 旋转动画

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

### 与按钮组合

```tsx live-codeblock
import React from 'react';
import { Button, Icon } from 'orva-ui';

export default () => (
  <>
    <Button icon={<Icon name="mdi:search" />}>搜索</Button>
    <Button icon={<Icon name="mdi:plus" />} type="primary">新增</Button>
    <Button icon={<Icon name="mdi:download" />} iconRight>下载</Button>
  </>
);
```

## Props

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| name | string | - | 图标名称（Iconify 图标名，如 `mdi:home`） |
| size | number / string | `'1em'` | 图标大小 |
| color | string | `inherit` | 图标颜色 |
| rotate | number | `0` | 旋转角度（度） |
| spin | boolean | `false` | 是否显示旋转动画 |
| className | string | - | 自定义类名 |
| style | CSSProperties | - | 自定义样式 |

## 常用图标集合

| 集合前缀 | 说明 | 示例 |
|----------|------|------|
| `mdi:` | Material Design Icons | `mdi:home`, `mdi:heart` |
| `bi:` | Bootstrap Icons | `bi:star`, `bi:check` |
| `fa:` | Font Awesome | `fa:home`, `fa:user` |
| `ri:` | Remix Icon | `ri:home-line`, `ri:star-fill` |

## 主题定制

通过 `createTheme` 或 `ThemeProvider` 自定义主题变量，可以调整组件的颜色、字体、间距等样式。

```tsx live-codeblock
import { createTheme, ThemeProvider } from 'orva-ui';

const theme = createTheme({
  colors: {
    primary: '#a855f7',
  },
});
```

## 注意事项

- 请确保在 `ThemeProvider` 包裹下使用组件以获得完整的主题支持
- 图标名称遵循 Iconify 命名规范：`集合名:图标名`
- 组件支持服务器端渲染 (SSR)
## 相关组件

以下是与当前组件相关的其他组件，可能在使用时搭配使用：

| 组件 | 说明 |
|------|------|
| [Button](button) | 基础交互组件 |
| [Badge](badge) | 状态徽标 |
