# Text

**Related Components:** [Typography](./typography), [Link](./link)


Text Text component for text display. Supports multiple styles、colors、sizes, etc.. 

## Introduction

```tsx live-codeblock
import { Text } from 'orva-ui';
// 或按需导入
import { Text } from 'orva-ui/basic';
```

## Basic Usage

```tsx live-codeblock
import React, { useState } from 'react';
import { Text } from 'orva-ui';

export default () => {
  return <Text>这是一段Text</Text>;
};
```

## Examples

### Basic Text

```tsx live-codeblock
import React, { useState } from 'react';
import { Text } from 'orva-ui';

export default () => {
  return <Text>这是一段Basic Text</Text>;
};
```

### Differentsizes

```tsx live-codeblock
import React, { useState } from 'react';
import { Text, Space } from 'orva-ui';

export default () => {
  return (
    <Space direction="vertical">
      <Text size="xs">超小Text xs</Text>
      <Text size="sm">小Text sm</Text>
      <Text size="md">中Text md</Text>
      <Text size="lg">大Text lg</Text>
      <Text size="xl">超大Text xl</Text>
    </Space>
  );
};
```

### Differentcolors

```tsx live-codeblock
import React, { useState } from 'react';
import { Text, Space } from 'orva-ui';

export default () => {
  return (
    <Space>
      <Text color="default">Default</Text>
      <Text color="primary">主要</Text>
      <Text color="success">Success</Text>
      <Text color="warning">warning</Text>
      <Text color="error">error</Text>
      <Text color="#3b82f6">Custom</Text>
    </Space>
  );
};
```

### TextStyle

```tsx live-codeblock
import React, { useState } from 'react';
import { Text, Space } from 'orva-ui';

export default () => {
  return (
    <Space direction="vertical">
      <Text bold>粗体Text</Text>
      <Text italic>ItalicText</Text>
      <Text underline>UnderlineText</Text>
      <Text strikeThrough>删除线Text</Text>
    </Space>
  );
};
```

### Textalignment

```tsx live-codeblock
import React, { useState } from 'react';
import { Text } from 'orva-ui';

export default () => {
  return (
    <>
      <Text align="left">左alignment</Text>
      <Text align="center">居中alignment</Text>
      <Text align="right">右alignment</Text>
    </>
  );
};
```

### TextTruncate

```tsx live-codeblock
import React, { useState } from 'react';
import { Text } from 'orva-ui';

export default () => {
  const longText = '这是一段非常长的TextContent, 当Text超出容器Width时, 可以自动截断Show';
  
  return (
    <div style={{ width: 200 }}>
      <Text ellipsis>{longText}</Text>
    </div>
  );
};
```

### With prefix/Suffix

```tsx live-codeblock
import React, { useState } from 'react';
import { Text, Icon } from 'orva-ui';

export default () => {
  return (
    <Text 
      prefix={<Icon name="mdi:information" />}
      suffix={<Icon name="mdi:close" />}
    >
      带icon的Text
    </Text>
  );
};
```

### LinkText

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

### 可编辑Text

```tsx live-codeblock
import React, { useState } from 'react';
import { Text } from 'orva-ui';

export default () => {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState('可编辑Text');
  
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

### 组合Use

```tsx live-codeblock
import React, { useState } from 'react';
import { Text, Space } from 'orva-ui';

export default () => {
  return (
    <Space direction="vertical">
      <Text size="lg" bold color="primary">
        TitleText
      </Text>
      <Text size="sm" color="default">
        descriptionText
      </Text>
      <Text size="xs" color="disabled">
        辅助Text
      </Text>
    </Space>
  );
};
```

## Props

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| children | ReactNode | - | TextContent |
| size | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | sizes |
| color | `'default' \| 'primary' \| 'success' \| 'warning' \| 'error' \| 'disabled'` \| string | `'default'` | colors |
| bold | boolean | `false` | Whether粗体 |
| italic | boolean | `false` | WhetherItalic |
| underline | boolean | `false` | WhetherUnderline |
| strikeThrough | boolean | `false` | WhetherDelete线 |
| align | `'left' \| 'center' \| 'right'` | `'left'` | alignmentMode |
| ellipsis | boolean | `false` | WhetherTruncate |
| href | string | - | Link URL |
| target | string | `'_blank'` | Link目标 |
| editable | EditableConfig | - | 可EditConfig |
| prefix | ReactNode | - | Prefix content |
| suffix | ReactNode | - | Suffix content |
| className | string | - | Custom class name |
| style | CSSProperties | - | Custom Style |

## Notes

- Ensure the component is wrapped in `ThemeProvider` for full theme support
- `ellipsis` 为 `true` 时需要SettingSticky/FixedWidth
- `editable` SupportsRow内编辑Feature
## Related Components

The following components are related and may be used together:

| Component | Description |
|------|------|
| [Typography](typography) | TextTypography |
| [Link](link) | Component |
