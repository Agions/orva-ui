# Typography 排版

**Related Components:** [Text](./text), [Link](./link)


Typography 组件用于文本排版。支持标题、段落、链接、列表等。

## 引入

```tsx live-codeblock
import { Typography } from 'orva-ui';
// 或按需导入
import { Typography } from 'orva-ui/basic';
```

## 基本使用

```tsx live-codeblock
import React from 'react';
import { Typography } from 'orva-ui';

export default () => {
  return (
    <>
      <Typography.Title>标题</Typography.Title>
      <Typography.Paragraph>段落内容</Typography.Paragraph>
    </>
  );
};
```

## 使用示例

### 标题

```tsx live-codeblock
import React from 'react';
import { Typography } from 'orva-ui';

export default () => {
  return (
    <>
      <Typography.Title level={1}>一级标题</Typography.Title>
      <Typography.Title level={2}>二级标题</Typography.Title>
      <Typography.Title level={3}>三级标题</Typography.Title>
      <Typography.Title level={4}>四级标题</Typography.Title>
      <Typography.Title level={5}>五级标题</Typography.Title>
    </>
  );
};
```

### 段落

```tsx live-codeblock
import React from 'react';
import { Typography } from 'orva-ui';

export default () => {
  return (
    <Typography.Paragraph>
      这是一段段落文本。Typography 组件提供了丰富的文本排版功能，
      支持标题、段落、链接、列表等多种元素。
    </Typography.Paragraph>
  );
};
```

### 链接

```tsx live-codeblock
import React from 'react';
import { Typography } from 'orva-ui';

export default () => {
  return (
    <Typography.Paragraph>
      这是一个 <Typography.Link href="https://example.com">链接</Typography.Link>。
    </Typography.Paragraph>
  );
};
```

### 文本类型

```tsx live-codeblock
import React from 'react';
import { Typography } from 'orva-ui';

export default () => {
  return (
    <>
      <Typography.Text>默认文本</Typography.Text>
      <Typography.Text type="primary">主要文本</Typography.Text>
      <Typography.Text type="success">成功文本</Typography.Text>
      <Typography.Text type="warning">警告文本</Typography.Text>
      <Typography.Text type="error">错误文本</Typography.Text>
      <Typography.Text disabled>禁用文本</Typography.Text>
    </>
  );
};
```

### 文本样式

```tsx live-codeblock
import React from 'react';
import { Typography } from 'orva-ui';

export default () => {
  return (
    <>
      <Typography.Text mark>标记文本</Typography.Text>
      <Typography.Text code>代码文本</Typography.Text>
      <Typography.Text keyboard>键盘文本</Typography.Text>
      <Typography.Text delete>删除文本</Typography.Text>
      <Typography.Text underline>下划线文本</Typography.Text>
      <Typography.Text strong>粗体文本</Typography.Text>
      <Typography.Text italic>斜体文本</Typography.Text>
    </>
  );
};
```

### 列表

```tsx live-codeblock
import React from 'react';
import { Typography } from 'orva-ui';

export default () => {
  return (
    <>
      <Typography.Title level={3}>无序列表</Typography.Title>
      <Typography.List>
        <Typography.List.Item>列表项 1</Typography.List.Item>
        <Typography.List.Item>列表项 2</Typography.List.Item>
        <Typography.List.Item>列表项 3</Typography.List.Item>
      </Typography.List>
      
      <Typography.Title level={3}>有序列表</Typography.Title>
      <Typography.List type="ordered">
        <Typography.List.Item>第一项</Typography.List.Item>
        <Typography.List.Item>第二项</Typography.List.Item>
        <Typography.List.Item>第三项</Typography.List.Item>
      </Typography.List>
    </>
  );
};
```

### 代码块

```tsx live-codeblock
import React from 'react';
import { Typography } from 'orva-ui';

export default () => {
  return (
    <Typography.Paragraph>
      <Typography.Text code>const name = 'Orva UI';</Typography.Text>
    </Typography.Paragraph>
  );
};
```

### 引用

```tsx live-codeblock
import React from 'react';
import { Typography } from 'orva-ui';

export default () => {
  return (
    <Typography.Paragraph type="secondary">
      <Typography.Text mark>引用</Typography.Text>：
      这是一个引用块，用于突出显示重要内容。
    </Typography.Paragraph>
  );
};
```

### 完整示例

```tsx live-codeblock
import React from 'react';
import { Typography } from 'orva-ui';

export default () => {
  return (
    <div style={{ maxWidth: 600 }}>
      <Typography.Title level={2}>文章标题</Typography.Title>
      <Typography.Paragraph type="secondary">
        作者：张三 | 发布日期：2024-01-01
      </Typography.Paragraph>
      <Typography.Paragraph>
        这是一篇文章的正文内容。Typography 组件提供了丰富的文本排版功能，
        可以满足各种文本展示需求。
      </Typography.Paragraph>
      <Typography.Title level={3}>章节标题</Typography.Title>
      <Typography.Paragraph>
        这是章节内容，包含 <Typography.Link href="#section">内部链接</Typography.Link>。
      </Typography.Paragraph>
      <Typography.List>
        <Typography.List.Item>要点 1</Typography.List.Item>
        <Typography.List.Item>要点 2</Typography.List.Item>
        <Typography.List.Item>要点 3</Typography.List.Item>
      </Typography.List>
      <Typography.Paragraph>
        代码示例：<Typography.Text code>console.log('Hello');</Typography.Text>
      </Typography.Paragraph>
    </div>
  );
};
```

## Props

### Title

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| level | `1 \| 2 \| 3 \| 4 \| 5` | `1` | 标题级别 |
| children | ReactNode | - | 标题内容 |
| className | string | - | 自定义类名 |
| style | CSSProperties | - | 自定义样式 |

### Paragraph

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| type | `'primary' \| 'success' \| 'warning' \| 'error' \| 'secondary'` | - | 文本类型 |
| children | ReactNode | - | 段落内容 |
| className | string | - | 自定义类名 |
| style | CSSProperties | - | 自定义样式 |

### Text

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| type | `'primary' \| 'success' \| 'warning' \| 'error' \| 'secondary'` | - | 文本类型 |
| mark | boolean | `false` | 是否标记 |
| code | boolean | `false` | 是否代码 |
| keyboard | boolean | `false` | 是否键盘 |
| delete | boolean | `false` | 是否删除线 |
| underline | boolean | `false` | 是否下划线 |
| strong | boolean | `false` | 是否粗体 |
| italic | boolean | `false` | 是否斜体 |
| href | string | - | 链接地址 |
| children | ReactNode | - | 文本内容 |
| className | string | - | 自定义类名 |
| style | CSSProperties | - | 自定义样式 |

### List

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| type | `'unordered' \| 'ordered'` | `'unordered'` | 列表类型 |
| children | ReactNode | - | 列表项 |
| className | string | - | 自定义类名 |
| style | CSSProperties | - | 自定义样式 |

## 注意事项

- 请确保在 `ThemeProvider` 包裹下使用组件以获得完整的主题支持
- `Title` 支持 1-5 级别
- `List` 支持嵌套使用
## 相关组件

以下是与当前组件相关的其他组件，可能在使用时搭配使用：

| 组件 | 说明 |
|------|------|
| [Text](text) | 文本展示 |
| [Link](link) | 组件 |
