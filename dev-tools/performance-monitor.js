// Nano-UI 性能监控器
class PerformanceMonitor {
  constructor() {
    this.metrics = [];
    this.enabled = true;
    
    // 监听组件渲染
    this.observeComponents();
    
    // 定期报告性能数据
    setInterval(this.reportMetrics.bind(this), 5000);
  }

  observeComponents() {
    // 监听所有组件的挂载
    const originalCreateElement = React.createElement;
    
    React.createElement = function(type, props, ...children) {
      if (typeof type === 'string' && type.includes('Component')) {
        const startTime = performance.now();
        
        const element = originalCreateElement.apply(this, arguments);
        
        // 记录渲染时间
        setTimeout(() => {
          const renderTime = performance.now() - startTime;
          console.log(\`[Performance] 组件渲染耗时: \${renderTime.toFixed(2)}ms\`);
        }, 0);
        
        return element;
      }
      
      return originalCreateElement.apply(this, arguments);
    };
  }

  reportMetrics() {
    if (this.metrics.length > 0) {
      console.log('[Performance Monitor] 当前指标:', {
        totalComponents: this.metrics.length,
        avgRenderTime: this.metrics.reduce((a, b) => a + b.renderTime, 0) / this.metrics.length,
        maxRenderTime: Math.max(...this.metrics.map(m => m.renderTime))
      });
      
      this.metrics = []; // 清空指标
    }
  }

  recordMetric(component, renderTime) {
    if (this.enabled) {
      this.metrics.push({
        component,
        renderTime,
        timestamp: Date.now()
      });
    }
  }
}

// 全局性能监控器实例
window.NanoUIPerformance = new PerformanceMonitor();
