# RichText

**Related Components:** [Editor](./editor), [Markdown](./markdown)


RichText RichText component for rich text editing. Supports multiple formats、image upload、Code block, etc.. 

## Introduction

```tsx live-codeblock
import { RichText } from 'orva-ui';
// 或按需导入
import { RichText } from 'orva-ui/display';
```

## Basic Usage

```tsx live-codeblock
import React, { useState } from 'react';
import { RichText } from 'orva-ui';

export default () => {
  const [value, setValue] = useState('<p>请InputContent</p>');
  
  return <RichText value={value} onChange={setValue} />;
};
```

## Examples

### Basic Editor

```tsx live-codeblock
import React, { useState } from 'react';
import { RichText } from 'orva-ui';

export default () => {
  const [value, setValue] = useState('<p>请InputContent</p>');
  
  return <RichText value={value} onChange={setValue} />;
};
```

### With toolbarConfig

```tsx live-codeblock
import React, { useState } from 'react';
import { RichText } from 'orva-ui';

export default () => {
  const [value, setValue] = useState('<p>请InputContent</p>');
  
  const toolbarConfig = {
    bold: true,
    italic: true,
    underline: true,
    strikeThrough: true,
    list: true,
    code: true,
    link: true,
    image: true,
  };
  
  return <RichText value={value} onChange={setValue} toolbarConfig={toolbarConfig} />;
};
```

### disabledEditor

```tsx live-codeblock
import React, { useState } from 'react';
import { RichText } from 'orva-ui';

export default () => {
  const [value, setValue] = useState('<p>只读Content</p>');
  
  return <RichText value={value} onChange={setValue} disabled />;
};
```

### Settingheight

```tsx live-codeblock
import React, { useState } from 'react';
import { RichText } from 'orva-ui';

export default () => {
  const [value, setValue] = useState('<p>请InputContent</p>');
  
  return <RichText value={value} onChange={setValue} height={300} />;
};
```

### Max字数

```tsx live-codeblock
import React, { useState } from 'react';
import { RichText } from 'orva-ui';

export default () => {
  const [value, setValue] = useState('');
  
  return (
    <RichText 
      value={value} 
      onChange={setValue} 
      maxLength={500}
      showWordLimit
    />
  );
};
```

### CustomUpload

```tsx live-codeblock
import React, { useState } from 'react';
import { RichText, Message } from 'orva-ui';

export default () => {
  const [value, setValue] = useState('');
  
  const handleImageUpload = async (file: File) => {
    // 上传到服务器
    const formData = new FormData();
    formData.append('image', file);
    
    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });
    
    const data = await response.json();
    
    if (data.url) {
      return data.url;
    }
    
    throw new Error('上传失败');
  };
  
  return <RichText value={value} onChange={setValue} onImageUpload={handleImageUpload} />;
};
```

### ReadonlyMode

```tsx live-codeblock
import React, { useState } from 'react';
import { RichText } from 'orva-ui';

export default () => {
  const value = '<p>这是只读Content, <strong>加粗</strong>, <em>Italic</em></p>';
  
  return <RichText value={value} readOnly />;
};
```

### 带Placeholder text

```tsx live-codeblock
import React, { useState } from 'react';
import { RichText } from 'orva-ui';

export default () => {
  const [value, setValue] = useState('');
  
  return <RichText value={value} onChange={setValue} placeholder="请InputContent..." />;
};
```

## Props

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| value | string | - | Content（Controlled） |
| defaultValue | string | - | DefaultContent |
| placeholder | string | - | Placeholder text |
| disabled | boolean | `false` | Whetherdisabled |
| readOnly | boolean | `false` | Read-only state |
| height | number | `300` | Edit器height |
| maxLength | number | - | Max字数 |
| showWordLimit | boolean | `false` | Show or hideCharacter Count |
| toolbarConfig | ToolbarConfig | - | 工具栏Config |
| onImageUpload | `(file: File) => Promise<string>` | - | image uploadCallback |
| onChange | `(value: string) => void` | - | ContentChange callback |
| className | string | - | Custom class name |
| style | CSSProperties | - | Custom Style |

## ToolbarConfig

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| bold | boolean | `true` | 加粗 |
| italic | boolean | `true` | Italic |
| underline | boolean | `true` | Underline |
| strikeThrough | boolean | `false` | Delete线 |
| list | boolean | `true` | List |
| code | boolean | `false` | Code block |
| link | boolean | `true` | Link |
| image | boolean | `false` | Image |

## Notes

- Ensure the component is wrapped in `ThemeProvider` for full theme support
- `value` 为 HTML 字符串
- `onImageUpload` BackImage URL
## Related Components

The following components are related and may be used together:

| Component | Description |
|-----------|-------------|
| [Editor](editor) | Component |
| [Markdown](markdown) | Component |
