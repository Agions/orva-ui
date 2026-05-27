# Divider 分割线

**Related Components:** [Space](./space), [Layout](./layout)


Divider 组件用于在内容之间创建视觉分隔。支持水平、垂直、带文字等。

## 引入

```tsx live-codeblock
import { Divider } from 'orva-ui';
// 或按需导入
import { Divider } from 'orva-ui/basic';
```

## 基本使用

```tsx live-codeblock
import React from 'react';
import { Divider } from 'orva-ui';

export default () => {
  return (
    <>
      <div>内容 1</div>
      <Divider />
      <div>内容 2</div>
    </>
  );
};
```

## 使用示例

### 基础分割线

```tsx live-codeblock
import React from 'react';
import { Divider } from 'orva-ui';

export default () => {
  return (
    <>
      <div>内容 1</div>
      <Divider />
      <div>内容 2</div>
    </>
  );
};
```

### 带文字

```tsx live-codeblock
import React from 'react';
import { Divider } from 'orva-ui';

export default () => {
  return (
    <>
      <div>内容 1</div>
      <Divider text="分隔线" />
      <div>内容 2</div>
    </>
  );
};
```

### 垂直分割线

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

### 虚线

```tsx live-codeblock
import React from 'react';
import { Divider } from 'orva-ui';

export default () => {
  return (
    <>
      <div>内容 1</div>
      <Divider dashed />
      <div>内容 2</div>
    </>
  );
};
```

### 自定义颜色

```tsx live-codeblock
import React from 'react';
import { Divider } from 'orva-ui';

export default () => {
  return (
    <>
      <div>内容 1</div>
      <Divider color="#3b82f6" />
      <div>内容 2</div>
    </>
  );
};
```

### 带位置

```tsx live-codeblock
import React from 'react';
import { Divider } from 'orva-ui';

export default () => {
  return (
    <>
      <div>内容 1</div>
      <Divider text="左对齐" textPosition="left" />
      <Divider text="居中对齐" textPosition="center" />
      <Divider text="右对齐" textPosition="right" />
      <div>内容 2</div>
    </>
  );
};
```

### 自定义样式

```tsx live-codeblock
import React from 'react';
import { Divider } from 'orva-ui';

export default () => {
  return (
    <>
      <div>内容 1</div>
      <Divider style={{ borderColor: '#3b82f6', borderWidth: 2 }} />
      <div>内容 2</div>
    </>
  );
};
```

## Props

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| text | ReactNode | - | 分割线文字 |
| textPosition | `'left' \| 'center' \| 'right'` | `'center'` | 文字位置 |
| vertical | boolean | `false` | 是否垂直 |
| dashed | boolean | `false` | 是否虚线 |
| color | string | - | 颜色 |
| className | string | - | 自定义类名 |
| style | CSSProperties | - | 自定义样式 |

## 注意事项

- 请确保在 `ThemeProvider` 包裹下使用组件以获得完整的主题支持
- `vertical` 为 `true` 时文字位置无效
- `textPosition` 仅在 `text` 存在时生效
## 相关组件

以下是与当前组件相关的其他组件，可能在使用时搭配使用：

| 组件 | 说明 |
|------|------|
| [Space](space) | 间距控制 |
| [Layout](layout) | 页面布局 |
