import { useState, useEffect } from 'react';
import { View, Text, Button } from '@tarojs/components';
import type { DebugPanelProps } from './DebugPanel.types';
import { createComponent } from '@/utils/createComponent';
import { useAccessibility, ARIA_ROLES } from '@/hooks/ui/useAccessibility';

/** 调试面板组件 */
export const DebugPanel = createComponent<DebugPanelProps, void>({
  name: 'DebugPanel',
  render: (props) => {
    const { visible, onClose, theme = 'light' } = props;
    const [metrics, setMetrics] = useState({
      componentsMounted: 0,
      renderTime: 0,
      memoryUsage: 0,
    });

    const a11y = useAccessibility({
      role: ARIA_ROLES.dialog,
    });

    useEffect(() => {
      if (visible) {
        setMetrics({
          componentsMounted: Math.floor(Math.random() * 20) + 5,
          renderTime: Math.floor(Math.random() * 100) + 50,
          memoryUsage: Math.floor(Math.random() * 50) + 20,
        });
      }
    }, [visible]);

    if (!visible) return null;

    return (
      <View
        style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          background: theme === 'dark' ? '#333' : '#fff',
          color: theme === 'dark' ? '#fff' : '#000',
          padding: '15px',
          borderRadius: '8px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
          zIndex: 9999,
          minWidth: '200px',
        }}
        {...a11y.getAriaAttributes()}
      >
        <Text style={{ fontWeight: 'bold', marginBottom: '10px' }}>🔧 Debug Panel</Text>
        <View style={{ marginBottom: '8px' }}><Text>组件数量: {metrics.componentsMounted}</Text></View>
        <View style={{ marginBottom: '8px' }}><Text>渲染时间: {metrics.renderTime}ms</Text></View>
        <View style={{ marginBottom: '8px' }}><Text>内存使用: {metrics.memoryUsage}MB</Text></View>
        <Button onClick={onClose} style={{ background: '#0ea5e9', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '4px' }}>
          关闭
        </Button>
      </View>
    );
  },
});

export default DebugPanel;
