# RichText 富文本编辑器

**Related Components:** [Editor](./editor), [Markdown](./markdown)


RichText 组件用于富文本编辑。支持多种格式、图片上传、代码块等。

## 引入

```tsx live-codeblock
import { RichText } from 'orva-ui';
// 或按需导入
import { RichText } from 'orva-ui/display';
```

## 基本使用

```tsx live-codeblock
import React, { useState } from 'react';
import { RichText } from 'orva-ui';

export default () => {
  const [value, setValue] = useState('<p>请输入内容</p>');
  
  return <RichText value={value} onChange={setValue} />;
};
```

## 使用示例

### 基础编辑器

```tsx live-codeblock
import React, { useState } from 'react';
import { RichText } from 'orva-ui';

export default () => {
  const [value, setValue] = useState('<p>请输入内容</p>');
  
  return <RichText value={value} onChange={setValue} />;
};
```

### 带工具栏配置

```tsx live-codeblock
import React, { useState } from 'react';
import { RichText } from 'orva-ui';

export default () => {
  const [value, setValue] = useState('<p>请输入内容</p>');
  
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

### 禁用编辑器

```tsx live-codeblock
import React, { useState } from 'react';
import { RichText } from 'orva-ui';

export default () => {
  const [value, setValue] = useState('<p>只读内容</p>');
  
  return <RichText value={value} onChange={setValue} disabled />;
};
```

### 设置高度

```tsx live-codeblock
import React, { useState } from 'react';
import { RichText } from 'orva-ui';

export default () => {
  const [value, setValue] = useState('<p>请输入内容</p>');
  
  return <RichText value={value} onChange={setValue} height={300} />;
};
```

### 最大字数

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

### 自定义上传

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

### 只读模式

```tsx live-codeblock
import React, { useState } from 'react';
import { RichText } from 'orva-ui';

export default () => {
  const value = '<p>这是只读内容，<strong>加粗</strong>，<em>斜体</em></p>';
  
  return <RichText value={value} readOnly />;
};
```

### 带占位符

```tsx live-codeblock
import React, { useState } from 'react';
import { RichText } from 'orva-ui';

export default () => {
  const [value, setValue] = useState('');
  
  return <RichText value={value} onChange={setValue} placeholder="请输入内容..." />;
};
```

## Props

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| value | string | - | 内容（受控） |
| defaultValue | string | - | 默认内容 |
| placeholder | string | - | 占位符 |
| disabled | boolean | `false` | 是否禁用 |
| readOnly | boolean | `false` | 是否只读 |
| height | number | `300` | 编辑器高度 |
| maxLength | number | - | 最大字数 |
| showWordLimit | boolean | `false` | 是否显示字数统计 |
| toolbarConfig | ToolbarConfig | - | 工具栏配置 |
| onImageUpload | `(file: File) => Promise<string>` | - | 图片上传回调 |
| onChange | `(value: string) => void` | - | 内容变化回调 |
| className | string | - | 自定义类名 |
| style | CSSProperties | - | 自定义样式 |

## ToolbarConfig

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| bold | boolean | `true` | 加粗 |
| italic | boolean | `true` | 斜体 |
| underline | boolean | `true` | 下划线 |
| strikeThrough | boolean | `false` | 删除线 |
| list | boolean | `true` | 列表 |
| code | boolean | `false` | 代码块 |
| link | boolean | `true` | 链接 |
| image | boolean | `false` | 图片 |

## 注意事项

- 请确保在 `ThemeProvider` 包裹下使用组件以获得完整的主题支持
- `value` 为 HTML 字符串
- `onImageUpload` 返回图片 URL
## 相关组件

以下是与当前组件相关的其他组件，可能在使用时搭配使用：

| 组件 | 说明 |
|------|------|
| [Editor](editor) | 组件 |
| [Markdown](markdown) | 组件 |
