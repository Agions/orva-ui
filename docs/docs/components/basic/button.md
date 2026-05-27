# Button 按钮

**Related Components:** [Icon](./icon), [Ripple](./ripple), [Space](./space)


Related: [按钮](button), [图标](icon), [间距](space)


按钮组件用于触发一个操作，如提交表单、打开对话框、删除数据等。支持多种类型、尺寸和状态，可自定义颜色和样式。

## 引入

```tsx live-codeblock
import { Button } from 'orva-ui';
// 或按需导入
import { Button } from 'orva-ui/basic';
```

## 基本使用

```tsx live-codeblock
import React from 'react';
import { Button } from 'orva-ui';

export default () => (
  <Button>
    默认按钮
  </Button>
);
```

## 使用示例

### 基础使用

```tsx live-codeblock
import React from 'react';
import { Button } from 'orva-ui';

export default () => (
  <>
    <Button type="primary">主要按钮</Button>
    <Button type="secondary">次要按钮</Button>
    <Button type="outline">描边按钮</Button>
    <Button type="ghost">幽灵按钮</Button>
    <Button type="text">文本按钮</Button>
  </>
);
```

### 尺寸

```tsx live-codeblock
import React from 'react';
import { Button } from 'orva-ui';

export default () => (
  <>
    <Button size="xs">超小</Button>
    <Button size="sm">小</Button>
    <Button size="md">中</Button>
    <Button size="lg">大</Button>
    <Button size="xl">超大</Button>
  </>
);
```

### 状态

```tsx live-codeblock
import React from 'react';
import { Button, Icon } from 'orva-ui';

export default () => (
  <>
    <Button disabled>禁用按钮</Button>
    <Button loading>加载中</Button>
    <Button danger>危险按钮</Button>
    <Button type="primary" danger>危险主要</Button>
  </>
);
```

### 带图标

```tsx live-codeblock
import React from 'react';
import { Button, Icon } from 'orva-ui';

export default () => (
  <>
    <Button icon={<Icon name="search" />}>搜索</Button>
    <Button icon={<Icon name="download" />} iconRight>下载</Button>
    <Button icon={<Icon name="upload" />} type="primary">上传</Button>
  </>
);
```

### 块级按钮

```tsx live-codeblock
import React from 'react';
import { Button } from 'orva-ui';

export default () => (
  <>
    <Button block type="primary">块级按钮</Button>
  </>
);
```

## Props

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| children | ReactNode | - | 按钮内容 |
| type | `'primary' \| 'secondary' \| 'outline' \| 'ghost' \| 'text'` | `'secondary'` | 按钮类型 |
| size | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | 按钮尺寸 |
| disabled | boolean | `false` | 是否禁用 |
| loading | boolean | `false` | 是否加载中 |
| icon | ReactNode | - | 左侧图标 |
| iconRight | ReactNode | - | 右侧图标 |
| block | boolean | `false` | 是否为块级按钮 |
| danger | boolean | `false` | 是否为危险按钮 |
| onClick | `(e: MouseEvent) => void` | - | 点击事件回调 |
| className | string | - | 自定义类名 |
| style | CSSProperties | - | 自定义样式 |

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

## 无障碍支持

组件遵循 WAI-ARIA 标准，内置键盘导航和屏幕阅读器支持。

## 注意事项

- 请确保在 `ThemeProvider` 包裹下使用组件以获得完整的主题支持
- 组件支持服务器端渲染 (SSR)
## 相关组件

以下是与当前组件相关的其他组件，可能在使用时搭配使用：

| 组件 | 说明 |
|------|------|
| [Icon](icon) | 图标工具 |
| [Ripple](ripple) | 交互效果 |
| [Space](space) | 间距控制 |
