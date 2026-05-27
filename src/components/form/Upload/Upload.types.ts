import type * as React from 'react';
import type { BaseProps } from '@/types/component';

export interface TaroTempFile {
  path: string;
  size?: number;
  name?: string;
  type?: string;
}

export interface UploadFile {
	/** 文件唯一标识 */
  uid?: string;
	/** 文件名称 */
  name?: string;
	/** 文件大小 */
  size?: number;
	/** 文件类型 */
  type?: string;
	/** 上传状态 */
  status?: 'uploading' | 'done' | 'error';
	/** 上传进度 */
  percent?: number;
	/** 文件URL */
  url?: string;
	/** 服务器响应 */
  response?: any;
	/** 错误信息 */
  error?: Error;
	/** 无障碍访问 */
  accessible?: boolean;
	/** 无障碍标签 */
  accessibilityLabel?: string;
	/** 无障碍角色 */
  accessibilityRole?: string;
	/** 无障碍状态 */
  accessibilityState?: {
    disabled?: boolean;
    readonly?: boolean;
    busy?: boolean;
    selected?: boolean;
  };
}

export interface UploadRequestOptions {
  file: any;
  filename: string;
  data: Record<string, any>;
  headers: Record<string, string>;
  withCredentials: boolean;
  action: string;
  onProgress: (_percent: number) => void;
  onSuccess: (_response: any) => void;
  onError: (_error: Error) => void;
}

export interface UploadRef {
  getFileList: () => UploadFile[];
  clearFileList: () => void;
  upload: (file: TaroTempFile, tempFilePath?: string) => void;
  abort: (file: UploadFile) => void;
}

export type UploadSize = 'small' | 'medium' | 'large';
export type UploadVariant = 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error';

export interface UploadLocale {
  upload: string;
  remove: string;
  preview: string;
  uploadError: string;
  uploadSuccess: string;
  fileSizeError: string;
  fileTypeError: string;
  maxCountError: string;
}

export interface UploadUtilsType {
  formatFileSize: (bytes: number) => string;
  getFileExtension: (filename: string) => string;
  checkFileType: (file: any, accept: string) => boolean;
  checkFileSize: (file: any, maxSize: number) => boolean;
  generatePreviewUrl: (file: any) => Promise<string>;
}

export const UploadUtils: UploadUtilsType = {
  formatFileSize: (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  },
  getFileExtension: (filename: string) => {
    return filename.slice(((filename.lastIndexOf('.') - 1) >>> 0) + 2);
  },
  checkFileType: (file: any, accept: string) => {
    const acceptTypes = accept.split(',').map((type) => type.trim());
    const filename = file.name || file.path.split('/').pop() || '';
    const fileType = file.type || `image/${filename.split('.').pop()}`;
    return acceptTypes.some((type) => {
      if (type.startsWith('.')) {
        return filename.toLowerCase().endsWith(type.toLowerCase());
      }
      if (type.includes('/*')) {
        const mainType = type.split('/')[0];
        return fileType.startsWith(mainType || '');
      }
      return fileType === type;
    });
  },
  checkFileSize: (file: any, maxSize: number) => {
    return file.size <= maxSize;
  },
  generatePreviewUrl: (file: any) => {
    return new Promise((resolve, reject) => {
      if (file.tempFilePath) {
        resolve(file.tempFilePath);
      } else if (file.path) {
        resolve(file.path);
      } else {
        reject(new Error('Cannot generate preview URL'));
      }
    });
  },
};

/** 上传组件属性 */
export interface UploadProps {
  action?: string;
  accept?: string;
  multiple?: boolean;
  disabled?: boolean;
  maxCount?: number;
  maxSize?: number;
  fileList?: UploadFile[];
  defaultFileList?: UploadFile[];
  showUploadList?: boolean;
  listType?: 'text' | 'picture' | 'picture-card';
  onPreview?: (file: UploadFile) => void;
  onRemove?: (file: UploadFile) => boolean | Promise<boolean>;
  onChange?: (file: UploadFile, fileList: UploadFile[]) => void;
  beforeUpload?: (file: UploadFile) => boolean | Promise<boolean>;
  customRequest?: (options: UploadRequestOptions) => void;
  className?: string;
  style?: any;
  children?: React.ReactNode;
  [key: string]: any;
}
