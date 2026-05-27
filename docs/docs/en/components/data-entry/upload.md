# Upload

**Related Components:** [Dragger](./dragger), [Image](./image)


Upload Upload component for file uploading. Supports single selection、multiple selection、Drag and Drop、Preview、ProgressShow, etc.. 

## Introduction

```tsx live-codeblock
import { Upload } from 'orva-ui';
// 或按需导入
import { Upload } from 'orva-ui/data-entry';
```

## Basic Usage

```tsx live-codeblock
import React, { useState } from 'react';
import { Upload } from 'orva-ui';

export default () => {
  const [fileList, setFileList] = useState([]);
  
  return <Upload fileList={fileList} onChange={(info) => setFileList(info.fileList)} />;
};
```

## Examples

### Basic Upload

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

### image upload

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

### ImageCardUpload

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

### Drag and Drop

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

### LimitFile type

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

### Limit文件sizes

```tsx live-codeblock
import React, { useState } from 'react';
import { Upload } from 'orva-ui';

export default () => {
  const [fileList, setFileList] = useState([]);
  
  const beforeUpload = (file: File) => {
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      Upload.message.error('文件sizes不能超过 2MB');
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

### Limit文件数量

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

### CustomUploadButton

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

### UploadProgress

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

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| fileList | UploadFile[] | - | File List（Controlled） |
| action | string | - | Upload URL |
| multiple | boolean | `false` | Whethermultiple selection |
| drag | boolean | `false` | WhetherSupportsDrag and drop |
| listType | `'text' \| 'picture' \| 'picture-card'` | `'text'` | ListType |
| accept | string | - | 接受的文件Type |
| maxCount | number | - | Max文件数 |
| beforeUpload | `(file: File) => boolean \| Promise<boolean>` | - | Upload前钩子 |
| customRequest | `(options: any) => void` | - | CustomUpload |
| onRemove | `(file: UploadFile) => void` | - | DeleteCallback |
| onChange | `(info: UploadChangeParam) => void` | - | Change callback |
| className | string | - | Custom class name |
| style | CSSProperties | - | Custom Style |

## Notes

- Ensure the component is wrapped in `ThemeProvider` for full theme support
- `beforeUpload` Back `false` 或 `Promise.resolve(false)` 可阻止Upload
- For controlled components, use `fileList` + `onChange`
## Related Components

The following components are related and may be used together:

| Component | Description |
|-----------|-------------|
| [Dragger](dragger) | Component |
| [Image](image) | Component |
