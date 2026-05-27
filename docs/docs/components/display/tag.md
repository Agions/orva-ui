# Tag 标签

**Related Components:** [Badge](./badge), [Tag.Group](./tag.group)


Tag 组件用于展示标签、状态、分类等信息。支持多种颜色、尺寸、可关闭等。

## 引入

```tsx live-codeblock
import { Tag } from 'orva-ui';
// 或按需导入
import { Tag } from 'orva-ui/display';
```

## 基本使用

```tsx live-codeblock
import React, { useState } from 'react';
import { Tag } from 'orva-ui';

export default () => <Tag>标签</Tag>;
```

## 使用示例

### 基础标签

```tsx live-codeblock
import React, { useState } from 'react';
import { Tag } from 'orva-ui';

export default () => (
  <>
    <Tag>默认标签</Tag>
    <Tag type="primary">主要标签</Tag>
    <Tag type="success">成功标签</Tag>
    <Tag type="warning">警告标签</Tag>
    <Tag type="danger">危险标签</Tag>
  </>
);
```

### 尺寸

```tsx live-codeblock
import React, { useState } from 'react';
import { Tag } from 'orva-ui';

export default () => (
  <>
    <Tag size="sm">小标签</Tag>
    <Tag size="md">中标签</Tag>
    <Tag size="lg">大标签</Tag>
  </>
);
```

### 可关闭标签

```tsx live-codeblock
import React, { useState } from 'react';
import { Tag } from 'orva-ui';

export default () => {
  const [visible, setVisible] = useState(true);
  
  if (!visible) return null;
  
  return (
    <Tag closable onClose={() => setVisible(false)}>
      可关闭标签
    </Tag>
  );
};
```

### 带图标

```tsx live-codeblock
import React, { useState } from 'react';
import { Tag, Icon } from 'orva-ui';

export default () => (
  <>
    <Tag icon={<Icon name="mdi:star" />}>收藏</Tag>
    <Tag icon={<Icon name="mdi:check-circle" />} type="success">完成</Tag>
    <Tag icon={<Icon name="mdi:alert" />} type="warning">注意</Tag>
  </>
);
```

### 圆角标签

```tsx live-codeblock
import React, { useState } from 'react';
import { Tag } from 'orva-ui';

export default () => (
  <>
    <Tag round>圆角标签</Tag>
    <Tag round type="primary">主要圆角</Tag>
    <Tag round type="success">成功圆角</Tag>
  </>
);
```

### 组合使用

```tsx live-codeblock
import React, { useState } from 'react';
import { Tag, Card } from 'orva-ui';

export default () => (
  <Card>
    <Card.Header>
      <Tag type="primary">React</Tag>
      <Tag type="success">TypeScript</Tag>
      <Tag type="warning">Vite</Tag>
    </Card.Header>
    <Card.Body>
      这是一个使用多种标签的卡片。
    </Card.Body>
  </Card>
);
```

## Props

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| children | ReactNode | - | 标签内容 |
| type | `'primary' \| 'success' \| 'warning' \| 'danger' \| 'default'` | `'default'` | 标签类型 |
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | 标签尺寸 |
| closable | boolean | `false` | 是否可关闭 |
| icon | ReactNode | - | 左侧图标 |
| round | boolean | `false` | 是否圆角 |
| onClose | `(e: Event) => void` | - | 关闭回调 |
| className | string | - | 自定义类名 |
| style | CSSProperties | - | 自定义样式 |

## 主题定制

通过 `createTheme` 或 `ThemeProvider` 自定义主题变量，可以调整组件的颜色、字体、间距等样式。

```tsx live-codeblock
import { createTheme, ThemeProvider } from 'orva-ui';

const theme = createTheme({
  tag: {
    borderRadius: '4px',
    padding: '2px 8px',
    fontSize: '12px',
  },
});
```

## 注意事项

- 请确保在 `ThemeProvider` 包裹下使用组件以获得完整的主题支持
- `closable` 为 `true` 时显示关闭按钮
- 支持嵌套在其他组件中使用
## 相关组件

以下是与当前组件相关的其他组件，可能在使用时搭配使用：

| 组件 | 说明 |
|------|------|
| [Badge](badge) | 状态徽标 |
| [Tag.Group](tag.group) | 组件 |
