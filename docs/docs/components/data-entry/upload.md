# Upload 上传

**Related Components:** [Dragger](./dragger), [Image](./image)


Upload 组件用于文件上传。支持单选、多选、拖拽上传、预览、进度显示等。

## 引入

```tsx live-codeblock
import { Upload } from 'orva-ui';
// 或按需导入
import { Upload } from 'orva-ui/data-entry';
```

## 基本使用

```tsx live-codeblock
import React, { useState } from 'react';
import { Upload } from 'orva-ui';

export default () => {
  const [fileList, setFileList] = useState([]);
  
  return <Upload fileList={fileList} onChange={(info) => setFileList(info.fileList)} />;
};
```

## 使用示例

### 基础上传

```tsx live-codeblock
import React, { useState } from 'react';
import { Upload } from 'orva-ui';

export default () => {
  const [fileList, setFileList] = useState([]);
  
  return (
    <Upload 
      fileList={fileList} 
      onChange={(info) => setFileList(info.fileList)}
      action="/api/upload"
    />
  );
};
```

### 图片上传

```tsx live-codeblock
import React, { useState } from 'react';
import { Upload, Icon } from 'orva-ui';

export default () => {
  const [fileList, setFileList] = useState([]);
  
  return (
    <Upload 
      fileList={fileList} 
      onChange={(info) => setFileList(info.fileList)}
      action="/api/upload"
      listType="picture"
      multiple
    />
  );
};
```

### 图片卡片上传

```tsx live-codeblock
import React, { useState } from 'react';
import { Upload, Icon } from 'orva-ui';

export default () => {
  const [fileList, setFileList] = useState([]);
  
  return (
    <Upload 
      fileList={fileList} 
      onChange={(info) => setFileList(info.fileList)}
      action="/api/upload"
      listType="picture-card"
      multiple
    />
  );
};
```

### 拖拽上传

```tsx live-codeblock
import React, { useState } from 'react';
import { Upload, Icon } from 'orva-ui';

export default () => {
  const [fileList, setFileList] = useState([]);
  
  return (
    <Upload 
      fileList={fileList} 
      onChange={(info) => setFileList(info.fileList)}
      action="/api/upload"
      drag
    >
      <div style={{ padding: 40 }}>
        <Icon name="mdi:upload" size={48} color="#999" />
        <p>点击或拖拽文件到此处上传</p>
      </div>
    </Upload>
  );
};
```

### 限制文件类型

```tsx live-codeblock
import React, { useState } from 'react';
import { Upload } from 'orva-ui';

export default () => {
  const [fileList, setFileList] = useState([]);
  
  return (
    <Upload 
      fileList={fileList} 
      onChange={(info) => setFileList(info.fileList)}
      action="/api/upload"
      accept="image/*"
      multiple
    />
  );
};
```

### 限制文件大小

```tsx live-codeblock
import React, { useState } from 'react';
import { Upload } from 'orva-ui';

export default () => {
  const [fileList, setFileList] = useState([]);
  
  const beforeUpload = (file: File) => {
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      Upload.message.error('文件大小不能超过 2MB');
    }
    return isLt2M;
  };
  
  return (
    <Upload 
      fileList={fileList} 
      onChange={(info) => setFileList(info.fileList)}
      action="/api/upload"
      beforeUpload={beforeUpload}
      multiple
    />
  );
};
```

### 限制文件数量

```tsx live-codeblock
import React, { useState } from 'react';
import { Upload } from 'orva-ui';

export default () => {
  const [fileList, setFileList] = useState([]);
  
  return (
    <Upload 
      fileList={fileList} 
      onChange={(info) => setFileList(info.fileList)}
      action="/api/upload"
      maxCount={3}
      multiple
    />
  );
};
```

### 自定义上传按钮

```tsx live-codeblock
import React, { useState } from 'react';
import { Upload, Button, Icon } from 'orva-ui';

export default () => {
  const [fileList, setFileList] = useState([]);
  
  return (
    <Upload 
      fileList={fileList} 
      onChange={(info) => setFileList(info.fileList)}
      action="/api/upload"
      showUploadList={false}
    >
      <Button icon={<Icon name="mdi:upload" />}>选择文件</Button>
    </Upload>
  );
};
```

### 上传进度

```tsx live-codeblock
import React, { useState } from 'react';
import { Upload } from 'orva-ui';

export default () => {
  const [fileList, setFileList] = useState([]);
  
  const handleUpload = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    
    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/api/upload');
    
    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable) {
        const percentComplete = (e.loaded / e.total) * 100;
        // 更新进度
      }
    };
    
    xhr.send(formData);
  };
  
  return (
    <Upload 
      fileList={fileList} 
      onChange={(info) => setFileList(info.fileList)}
      customRequest={handleUpload}
      multiple
    />
  );
};
```

## Props

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| fileList | UploadFile[] | - | 文件列表（受控） |
| action | string | - | 上传地址 |
| multiple | boolean | `false` | 是否多选 |
| drag | boolean | `false` | 是否支持拖拽 |
| listType | `'text' \| 'picture' \| 'picture-card'` | `'text'` | 列表类型 |
| accept | string | - | 接受的文件类型 |
| maxCount | number | - | 最大文件数 |
| beforeUpload | `(file: File) => boolean \| Promise<boolean>` | - | 上传前钩子 |
| customRequest | `(options: any) => void` | - | 自定义上传 |
| onRemove | `(file: UploadFile) => void` | - | 删除回调 |
| onChange | `(info: UploadChangeParam) => void` | - | 变化回调 |
| className | string | - | 自定义类名 |
| style | CSSProperties | - | 自定义样式 |

## 注意事项

- 请确保在 `ThemeProvider` 包裹下使用组件以获得完整的主题支持
- `beforeUpload` 返回 `false` 或 `Promise.resolve(false)` 可阻止上传
- 受控组件请使用 `fileList` + `onChange`
## 相关组件

以下是与当前组件相关的其他组件，可能在使用时搭配使用：

| 组件 | 说明 |
|------|------|
| [Dragger](dragger) | 组件 |
| [Image](image) | 组件 |
