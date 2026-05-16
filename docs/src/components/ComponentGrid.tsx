import React from 'react';
import type { Props } from '@theme/MDXComponents';

export default function ComponentGrid({ children }: Props): JSX.Element {
  const items = String(children)
    .split('-')
    .filter(item => item.trim())
    .map(item => item.trim());

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: '16px',
      margin: '24px 0'
    }}>
      {items.map((item, index) => (
        <div key={index} style={{
          padding: '20px',
          border: '1px solid #e5e7eb',
          borderRadius: '8px',
          backgroundColor: '#ffffff',
          transition: 'all 0.2s ease-in-out'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
          e.currentTarget.style.transform = 'translateY(-2px)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = 'none';
          e.currentTarget.style.transform = 'translateY(0)';
        }}>
          <h3 style={{
            margin: '0 0 12px 0',
            fontSize: '16px',
            fontWeight: '600',
            color: '#111827'
          }}>
            {item}
          </h3>
          <p style={{
            margin: 0,
            fontSize: '14px',
            color: '#6b7280',
            lineHeight: '1.5'
          }}>
            组件描述和功能说明
          </p>
        </div>
      ))}
    </div>
  );
}

export function QuickLinks({ children }: Props): JSX.Element {
  const links = String(children)
    .split('-')
    .filter(item => item.trim())
    .map(item => item.trim());

  return (
    <div style={{
      display: 'flex',
      flexWrap: 'wrap',
      gap: '12px',
      margin: '24px 0'
    }}>
      {links.map((link, index) => (
        <a key={index} href={`/docs/components/${link.toLowerCase()}`} style={{
          display: 'inline-block',
          padding: '8px 16px',
          backgroundColor: '#a855f7',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '6px',
          fontSize: '14px',
          fontWeight: '500',
          transition: 'all 0.2s ease-in-out'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = '#9333ea';
          e.currentTarget.style.transform = 'translateY(-1px)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = '#a855f7';
          e.currentTarget.style.transform = 'translateY(0)';
        }}>
          {link}
        </a>
      ))}
    </div>
  );
}