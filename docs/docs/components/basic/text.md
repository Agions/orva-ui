# Text 文本

**Related Components:** [Typography](./typography), [Link](./link)


Text 组件用于文本展示。支持多种样式、颜色、尺寸等。

## 引入

```tsx live-codeblock
import { Text } from 'orva-ui';
// 或按需导入
import { Text } from 'orva-ui/basic';
```

## 基本使用

```tsx live-codeblock
import React, { useState } from 'react';
import { Text } from 'orva-ui';

export default () => {
  return <Text>这是一段文本</Text>;
};
```

## 使用示例

### 基础文本

```tsx live-codeblock
import React, { useState } from 'react';
import { Text } from 'orva-ui';

export default () => {
  return <Text>这是一段基础文本</Text>;
};
```

### 不同尺寸

```tsx live-codeblock
import React, { useState } from 'react';
import { Text, Space } from 'orva-ui';

export default () => {
  return (
    <Space direction="vertical">
      <Text size="xs">超小文本 xs</Text>
      <Text size="sm">小文本 sm</Text>
      <Text size="md">中文本 md</Text>
      <Text size="lg">大文本 lg</Text>
      <Text size="xl">超大文本 xl</Text>
    </Space>
  );
};
```

### 不同颜色

```tsx live-codeblock
import React, { useState } from 'react';
import { Text, Space } from 'orva-ui';

export default () => {
  return (
    <Space>
      <Text color="default">默认</Text>
      <Text color="primary">主要</Text>
      <Text color="success">成功</Text>
      <Text color="warning">警告</Text>
      <Text color="error">错误</Text>
      <Text color="#3b82f6">自定义</Text>
    </Space>
  );
};
```

### 文本样式

```tsx live-codeblock
import React, { useState } from 'react';
import { Text, Space } from 'orva-ui';

export default () => {
  return (
    <Space direction="vertical">
      <Text bold>粗体文本</Text>
      <Text italic>斜体文本</Text>
      <Text underline>下划线文本</Text>
      <Text strikeThrough>删除线文本</Text>
    </Space>
  );
};
```

### 文本对齐

```tsx live-codeblock
import React, { useState } from 'react';
import { Text } from 'orva-ui';

export default () => {
  return (
    <>
      <Text align="left">左对齐</Text>
      <Text align="center">居中对齐</Text>
      <Text align="right">右对齐</Text>
    </>
  );
};
```

### 文本截断

```tsx live-codeblock
import React, { useState } from 'react';
import { Text } from 'orva-ui';

export default () => {
  const longText = '这是一段非常长的文本内容，当文本超出容器宽度时，可以自动截断显示';
  
  return (
    <div style={{ width: 200 }}>
      <Text ellipsis>{longText}</Text>
    </div>
  );
};
```

### 带前缀/后缀

```tsx live-codeblock
import React, { useState } from 'react';
import { Text, Icon } from 'orva-ui';

export default () => {
  return (
    <Text 
      prefix={<Icon name="mdi:information" />}
      suffix={<Icon name="mdi:close" />}
    >
      带图标的文本
    </Text>
  );
};
```

### 链接文本

```tsx live-codeblock
import React, { useState } from 'react';
import { Text } from 'orva-ui';

export default () => {
  return (
    <Text href="https://example.com" target="_blank">
      点击访问示例网站
    </Text>
  );
};
```

### 可编辑文本

```tsx live-codeblock
import React, { useState } from 'react';
import { Text } from 'orva-ui';

export default () => {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState('可编辑文本');
  
  return (
    <Text 
      editable={{
        editing,
        onChange: setValue,
        onStart: () => setEditing(true),
        onCancel: () => setEditing(false),
      }}
    >
      {value}
    </Text>
  );
};
```

### 组合使用

```tsx live-codeblock
import React, { useState } from 'react';
import { Text, Space } from 'orva-ui';

export default () => {
  return (
    <Space direction="vertical">
      <Text size="lg" bold color="primary">
        标题文本
      </Text>
      <Text size="sm" color="default">
        描述文本
      </Text>
      <Text size="xs" color="disabled">
        辅助文本
      </Text>
    </Space>
  );
};
```

## Props

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| children | ReactNode | - | 文本内容 |
| size | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | 尺寸 |
| color | `'default' \| 'primary' \| 'success' \| 'warning' \| 'error' \| 'disabled'` \| string | `'default'` | 颜色 |
| bold | boolean | `false` | 是否粗体 |
| italic | boolean | `false` | 是否斜体 |
| underline | boolean | `false` | 是否下划线 |
| strikeThrough | boolean | `false` | 是否删除线 |
| align | `'left' \| 'center' \| 'right'` | `'left'` | 对齐方式 |
| ellipsis | boolean | `false` | 是否截断 |
| href | string | - | 链接地址 |
| target | string | `'_blank'` | 链接目标 |
| editable | EditableConfig | - | 可编辑配置 |
| prefix | ReactNode | - | 前缀内容 |
| suffix | ReactNode | - | 后缀内容 |
| className | string | - | 自定义类名 |
| style | CSSProperties | - | 自定义样式 |

## 注意事项

- 请确保在 `ThemeProvider` 包裹下使用组件以获得完整的主题支持
- `ellipsis` 为 `true` 时需要设置固定宽度
- `editable` 支持行内编辑功能
## 相关组件

以下是与当前组件相关的其他组件，可能在使用时搭配使用：

| 组件 | 说明 |
|------|------|
| [Typography](typography) | 文本排版 |
| [Link](link) | 组件 |
