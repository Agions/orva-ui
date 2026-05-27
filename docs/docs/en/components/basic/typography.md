# Typography

**Related Components:** [Text](./text), [Link](./link)


Typography Typography component for text typesetting. Supports headings、paragraphs、Link、List, etc.. 

## Introduction

```tsx live-codeblock
import { Typography } from 'orva-ui';
// 或按需导入
import { Typography } from 'orva-ui/basic';
```

## Basic Usage

```tsx live-codeblock
import React from 'react';
import { Typography } from 'orva-ui';

export default () => {
  return (
    <>
      <Typography.Title>Title</Typography.Title>
      <Typography.Paragraph>paragraphsContent</Typography.Paragraph>
    </>
  );
};
```

## Examples

### Title

```tsx live-codeblock
import React from 'react';
import { Typography } from 'orva-ui';

export default () => {
  return (
    <>
      <Typography.Title level={1}>一级Title</Typography.Title>
      <Typography.Title level={2}>二级Title</Typography.Title>
      <Typography.Title level={3}>三级Title</Typography.Title>
      <Typography.Title level={4}>四级Title</Typography.Title>
      <Typography.Title level={5}>五级Title</Typography.Title>
    </>
  );
};
```

### paragraphs

```tsx live-codeblock
import React from 'react';
import { Typography } from 'orva-ui';

export default () => {
  return (
    <Typography.Paragraph>
      这是一段paragraphsText. Typography 组件提供了丰富的Text排版功能, 
      Supports headings、paragraphs、链接、List, etc.多种元素. 
    </Typography.Paragraph>
  );
};
```

### Link

```tsx live-codeblock
import React from 'react';
import { Typography } from 'orva-ui';

export default () => {
  return (
    <Typography.Paragraph>
      这是一个 <Typography.Link href="https://example.com">链接</Typography.Link>. 
    </Typography.Paragraph>
  );
};
```

### TextType

```tsx live-codeblock
import React from 'react';
import { Typography } from 'orva-ui';

export default () => {
  return (
    <>
      <Typography.Text>默认Text</Typography.Text>
      <Typography.Text type="primary">主要Text</Typography.Text>
      <Typography.Text type="success">成功Text</Typography.Text>
      <Typography.Text type="warning">warningText</Typography.Text>
      <Typography.Text type="error">errorText</Typography.Text>
      <Typography.Text disabled>disabledText</Typography.Text>
    </>
  );
};
```

### TextStyle

```tsx live-codeblock
import React from 'react';
import { Typography } from 'orva-ui';

export default () => {
  return (
    <>
      <Typography.Text mark>MarkText</Typography.Text>
      <Typography.Text code>代码Text</Typography.Text>
      <Typography.Text keyboard>键盘Text</Typography.Text>
      <Typography.Text delete>删除Text</Typography.Text>
      <Typography.Text underline>UnderlineText</Typography.Text>
      <Typography.Text strong>粗体Text</Typography.Text>
      <Typography.Text italic>ItalicText</Typography.Text>
    </>
  );
};
```

### List

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

### Code block

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
      这是一个引用块, 用于突出Show重要Content. 
    </Typography.Paragraph>
  );
};
```

### Complete示例

```tsx live-codeblock
import React from 'react';
import { Typography } from 'orva-ui';

export default () => {
  return (
    <div style={{ maxWidth: 600 }}>
      <Typography.Title level={2}>文章Title</Typography.Title>
      <Typography.Paragraph type="secondary">
        作者：张三 | 发布日期：2024-01-01
      </Typography.Paragraph>
      <Typography.Paragraph>
        这是一篇文章的正文Content. Typography 组件提供了丰富的Text排版功能, 
        可以满足各种TextDisplay需求. 
      </Typography.Paragraph>
      <Typography.Title level={3}>章节Title</Typography.Title>
      <Typography.Paragraph>
        这是章节Content, 包含 <Typography.Link href="#section">内部链接</Typography.Link>. 
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

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| level | `1 \| 2 \| 3 \| 4 \| 5` | `1` | Title级别 |
| children | ReactNode | - | TitleContent |
| className | string | - | Custom class name |
| style | CSSProperties | - | Custom Style |

### Paragraph

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| type | `'primary' \| 'success' \| 'warning' \| 'error' \| 'secondary'` | - | TextType |
| children | ReactNode | - | paragraphsContent |
| className | string | - | Custom class name |
| style | CSSProperties | - | Custom Style |

### Text

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| type | `'primary' \| 'success' \| 'warning' \| 'error' \| 'secondary'` | - | TextType |
| mark | boolean | `false` | WhetherMark |
| code | boolean | `false` | Whether代码 |
| keyboard | boolean | `false` | Whether键盘 |
| delete | boolean | `false` | WhetherDelete线 |
| underline | boolean | `false` | WhetherUnderline |
| strong | boolean | `false` | Whether粗体 |
| italic | boolean | `false` | WhetherItalic |
| href | string | - | Link URL |
| children | ReactNode | - | TextContent |
| className | string | - | Custom class name |
| style | CSSProperties | - | Custom Style |

### List

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| type | `'unordered' \| 'ordered'` | `'unordered'` | ListType |
| children | ReactNode | - | List项 |
| className | string | - | Custom class name |
| style | CSSProperties | - | Custom Style |

## Notes

- Ensure the component is wrapped in `ThemeProvider` for full theme support
- `Title` Supports 1-5 级别
- `List` SupportsNestedUse
## Related Components

The following components are related and may be used together:

| Component | Description |
|-----------|-------------|
| [Text](text) | TextDisplay |
| [Link](link) | Component |
