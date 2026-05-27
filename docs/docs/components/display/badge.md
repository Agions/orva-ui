# Badge 徽标

**Related Components:** [Avatar](./avatar), [Button](./button)


Badge 组件用于在元素右上角显示数字或状态标识。支持红点、数字、文字等。

## 引入

```tsx live-codeblock
import { Badge } from 'orva-ui';
// 或按需导入
import { Badge } from 'orva-ui/display';
```

## 基本使用

```tsx live-codeblock
import React from 'react';
import { Badge } from 'orva-ui';

export default () => (
  <Badge count={5}>
    <button>通知</button>
  </Badge>
);
```

## 使用示例

### 数字徽标

```tsx live-codeblock
import React from 'react';
import { Badge } from 'orva-ui';

export default () => (
  <>
    <Badge count={5}>消息</Badge>
    <Badge count={12}>通知</Badge>
    <Badge count={100}>提醒</Badge>
  </>
);
```

### 红点徽标

```tsx live-codeblock
import React from 'react';
import { Badge } from 'orva-ui';

export default () => (
  <>
    <Badge dot>消息</Badge>
    <Badge dot>通知</Badge>
    <Badge dot>提醒</Badge>
  </>
);
```

### 最大显示值

```tsx live-codeblock
import React from 'react';
import { Badge } from 'orva-ui';

export default () => (
  <>
    <Badge count={5} maxCount={9}>消息</Badge>
    <Badge count={20} maxCount={9}>通知</Badge>
    <Badge count={100} maxCount={99}>提醒</Badge>
  </>
);
```

### 自定义内容

```tsx live-codeblock
import React from 'react';
import { Badge, Icon } from 'orva-ui';

export default () => (
  <>
    <Badge content="New">消息</Badge>
    <Badge content={<Icon name="mdi:star" />}>收藏</Badge>
    <Badge content="Hot">热门</Badge>
  </>
);
```

### 状态徽标

```tsx live-codeblock
import React from 'react';
import { Badge } from 'orva-ui';

export default () => (
  <>
    <Badge status="success">成功</Badge>
    <Badge status="processing">处理中</Badge>
    <Badge status="error">错误</Badge>
    <Badge status="warning">警告</Badge>
    <Badge status="default">默认</Badge>
  </>
);
```

### 与头像组合

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

### 与按钮组合

```tsx live-codeblock
import React from 'react';
import { Badge, Button } from 'orva-ui';

export default () => (
  <Badge count={3} offset={[-5, 5]}>
    <Button icon={<Icon name="mdi:bell" />}>通知</Button>
  </Badge>
);
```

## Props

### Badge

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| count | number | - | 徽标数字 |
| content | ReactNode | - | 自定义内容 |
| dot | boolean | `false` | 是否显示红点 |
| maxCount | number | `99` | 最大显示值 |
| status | `'success' \| 'processing' \| 'error' \| 'warning' \| 'default'` | - | 状态类型 |
| offset | `[number, number]` | - | 偏移量 `[x, y]` |
| color | string | - | 自定义颜色 |
| className | string | - | 自定义类名 |
| style | CSSProperties | - | 自定义样式 |

## 主题定制

通过 `createTheme` 或 `ThemeProvider` 自定义主题变量，可以调整组件的颜色、字体、间距等样式。

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

## 注意事项

- 请确保在 `ThemeProvider` 包裹下使用组件以获得完整的主题支持
- `count` 和 `content` 互斥，同时设置时 `content` 优先
- `dot` 为 `true` 时显示红点而非数字
## 相关组件

以下是与当前组件相关的其他组件，可能在使用时搭配使用：

| 组件 | 说明 |
|------|------|
| [Avatar](avatar) | 用户头像 |
| [Button](button) | 基础交互组件 |
