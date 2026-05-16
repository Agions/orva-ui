import React from 'react';
import type { Props } from '@theme/MDXComponents';

export default function ComponentPreview({ children }: Props): JSX.Element {
  return (
    <div style={{
      border: '1px solid #e5e7eb',
      borderRadius: '8px',
      margin: '24px 0',
      overflow: 'hidden'
    }}>
      {/* 预览区域 */}
      <div style={{
        padding: '24px',
        backgroundColor: '#f9fafb',
        minHeight: '200px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        {children}
      </div>
      
      {/* 代码标签栏 */}
      <div style={{
        backgroundColor: '#ffffff',
        borderTop: '1px solid #e5e7eb',
        padding: '16px'
      }}>
        <div style={{
          display: 'flex',
          gap: '16px',
          marginBottom: '12px'
        }}>
          <button style={{
            padding: '6px 12px',
            border: 'none',
            backgroundColor: '#a855f7',
            color: 'white',
            borderRadius: '6px',
            fontSize: '14px',
            fontWeight: '500',
            cursor: 'pointer'
          }}>
            预览
          </button>
          <button style={{
            padding: '6px 12px',
            border: '1px solid #d1d5db',
            backgroundColor: 'transparent',
            color: '#6b7280',
            borderRadius: '6px',
            fontSize: '14px',
            cursor: 'pointer'
          }}>
            代码
          </button>
        </div>
        
        {/* 代码块 */}
        <pre style={{
          margin: 0,
          padding: '16px',
          backgroundColor: '#1f2937',
          color: '#f9fafb',
          borderRadius: '6px',
          fontSize: '14px',
          fontFamily: '"Fira Code", "Monaco", "Consolas", monospace',
          overflow: 'auto',
          maxHeight: '400px'
        }}>
          <code>{String(children).replace(/\n$/, '')}</code>
        </pre>
      </div>
    </div>
  );
}