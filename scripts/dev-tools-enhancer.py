#!/usr/bin/env python3

"""
Nano-UI 开发工具增强套件
提供调试工具、热重载监控、组件预览和错误追踪功能
"""

import os
import json
import subprocess
import time
from pathlib import Path
from datetime import datetime

class DevToolsEnhancer:
    def __init__(self, project_path="/root/workspace/nano-ui"):
        self.project_path = project_path
        self.tools_dir = os.path.join(project_path, "dev-tools")
        self.logs_dir = os.path.join(self.tools_dir, "logs")
        self.config_file = os.path.join(self.tools_dir, "dev-config.json")

        # 确保目录存在
        os.makedirs(self.tools_dir, exist_ok=True)
        os.makedirs(self.logs_dir, exist_ok=True)

        # 默认配置
        self.default_config = {
            "hotReload": True,
            "errorTracking": True,
            "componentPreview": True,
            "performanceMonitoring": True,
            "debugMode": False,
            "autoSave": True,
            "port": 3000
        }

    def setup_dev_environment(self):
        """设置开发环境增强功能"""
        print("🔧 正在设置开发环境增强功能...")

        # 创建配置文件
        if not os.path.exists(self.config_file):
            with open(self.config_file, 'w') as f:
                json.dump(self.default_config, f, indent=2)
            print(f"✅ 配置文件已创建: {self.config_file}")

        # 生成开发工具脚本
        self.generate_dev_scripts()
        print("✅ 开发脚本已生成")

        # 创建调试组件
        self.create_debug_components()
        print("✅ 调试组件已创建")

        return True

    def generate_dev_scripts(self):
        """生成开发脚本"""
        scripts = {
            "start-dev-enhanced.sh": '''#!/bin/bash
# Nano-UI 增强开发启动脚本
echo "🚀 启动 Nano-UI 增强开发环境..."
echo "📝 启用热重载、错误追踪和性能监控"
echo "🔍 端口: 3000"

# 检查依赖
if ! command -v npm &> /dev/null; then
    echo "❌ 未找到 npm，请安装 Node.js"
    exit 1
fi

# 安装依赖
echo "📦 安装依赖..."
npm install

# 启动开发服务器
echo "⚡ 启动开发服务器..."
npm run dev

echo "✅ 开发环境启动完成!"
''',

            "debug-component.js": '''// Nano-UI 调试组件生成器
const fs = require('fs');
const path = require('path');

function generateDebugComponent(componentName) {
    const componentDir = `src/components/${componentName}`;
    const debugFile = `${componentDir}/Debug${componentName}.tsx`;

    const content = \`
import React from 'react';
import { View, Text } from '@tarojs/components';
import { ${componentName} } from './index';

export interface DebugProps {
  name: string;
  props?: Record<string, any>;
}

export const Debug${componentName}: React.FC<DebugProps> = ({ name, props = {} }) => {
  const [mountedTime] = React.useState(Date.now());

  React.useEffect(() => {
    console.log(\`[${componentName}] 组件渲染: \${name}\`);
    console.log('[${componentName}] Props:', props);
    
    // 性能监控
    if (window.performance) {
      window.performance.mark(\`${componentName}-\${name}-render-start\`);
    }
  }, []);

  return (
    <View style={{ border: '1px solid #ccc', padding: '10px', margin: '10px' }}>
      <Text style={{ color: '#666', fontSize: '12px' }}>
        [${componentName}] {name}
      </Text>
      <${componentName} {...props} />
    </View>
  );
};
\`;

    // 确保目录存在
    if (!fs.existsSync(componentDir)) {
      fs.mkdirSync(componentDir, { recursive: true });
    }

    // 写入调试组件
    fs.writeFileSync(debugFile, content);
    console.log(\`✅ 调试组件已生成: \${debugFile}\`);
}

module.exports = { generateDebugComponent };
''',

            "performance-monitor.js": '''// Nano-UI 性能监控器
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
'''
        }

        for filename, content in scripts.items():
            filepath = os.path.join(self.tools_dir, filename)
            with open(filepath, 'w') as f:
                f.write(content)
            os.chmod(filepath, 0o755)

    def create_debug_components(self):
        """创建调试组件"""
        debug_dir = os.path.join(self.project_path, "src", "components", "_debug")
        os.makedirs(debug_dir, exist_ok=True)

        # 创建调试面板组件
        debug_panel = '''
import React from 'react';
import { View, Text, Button } from '@tarojs/components';

export interface DebugPanelProps {
  visible: boolean;
  onClose: () => void;
  theme: 'light' | 'dark';
}

export const DebugPanel: React.FC<DebugPanelProps> = ({ 
  visible, 
  onClose, 
  theme 
}) => {
  const [metrics, setMetrics] = React.useState({
    componentsMounted: 0,
    renderTime: 0,
    memoryUsage: 0
  });

  React.useEffect(() => {
    if (visible) {
      // 模拟获取性能指标
      setMetrics({
        componentsMounted: Math.floor(Math.random() * 20) + 5,
        renderTime: Math.floor(Math.random() * 100) + 50,
        memoryUsage: Math.floor(Math.random() * 50) + 20
      });
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <View style={{
      position: 'fixed',
      top: '20px',
      right: '20px',
      background: theme === 'dark' ? '#333' : '#fff',
      color: theme === 'dark' ? '#fff' : '#000',
      padding: '15px',
      borderRadius: '8px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      zIndex: 9999,
      minWidth: '200px'
    }}>
      <Text style={{ fontWeight: 'bold', marginBottom: '10px' }}>🔧 Debug Panel</Text>
      
      <View style={{ marginBottom: '8px' }}>
        <Text>组件数量: {metrics.componentsMounted}</Text>
      </View>
      
      <View style={{ marginBottom: '8px' }}>
        <Text>渲染时间: {metrics.renderTime}ms</Text>
      </View>
      
      <View style={{ marginBottom: '8px' }}>
        <Text>内存使用: {metrics.memoryUsage}MB</Text>
      </View>
      
      <Button 
        onClick={onClose}
        style={{ 
          background: '#0ea5e9', 
          color: 'white', 
          border: 'none',
          padding: '5px 10px',
          borderRadius: '4px'
        }}
      >
        关闭
      </Button>
    </View>
  );
};'''

        with open(os.path.join(debug_dir, "DebugPanel.tsx"), 'w') as f:
            f.write(debug_panel)

    def generate_error_tracking(self):
        """生成错误追踪配置"""
        error_config = {
            "enabled": True,
            "captureConsoleErrors": True,
            "reportComponentErrors": True,
            "trackPerformance": True,
            "errorBoundaryEnabled": True,
            "reportingEndpoints": {
                "local": "http://localhost:3000/api/errors",
                "production": "https://api.nano-ui.com/errors"
            },
            "errorCategories": [
                "runtime",
                "build",
                "network",
                "performance",
                "userInteraction"
            ]
        }

        config_path = os.path.join(self.tools_dir, "error-tracking.json")
        with open(config_path, 'w') as f:
            json.dump(error_config, f, indent=2)

        print(f"✅ 错误追踪配置已生成: {config_path}")

    def create_performance_dashboard(self):
        """创建性能仪表板"""
        dashboard_html = '''<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nano-UI 性能仪表板</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            margin: 0;
            padding: 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
        }
        
        .dashboard {
            max-width: 1200px;
            margin: 0 auto;
        }
        
        .header {
            text-align: center;
            margin-bottom: 30px;
        }
        
        .header h1 {
            margin: 0;
            font-size: 2.5em;
            background: linear-gradient(45deg, #a855f7, #f97316);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
        
        .metrics-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
            margin-bottom: 30px;
        }
        
        .metric-card {
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            border-radius: 15px;
            padding: 20px;
            text-align: center;
            border: 1px solid rgba(255, 255, 255, 0.2);
        }
        
        .metric-value {
            font-size: 2em;
            font-weight: bold;
            color: #a855f7;
            margin: 10px 0;
        }
        
        .metric-label {
            font-size: 0.9em;
            opacity: 0.8;
        }
        
        .chart-section {
            background: rgba(255, 255, 255, 0.1);
            border-radius: 15px;
            padding: 20px;
            margin-bottom: 20px;
        }
        
        .chart-title {
            margin-top: 0;
            color: #f97316;
        }
        
        .loading {
            text-align: center;
            padding: 40px;
            font-style: italic;
            opacity: 0.7;
        }
        
        @media (max-width: 768px) {
            .metrics-grid {
                grid-template-columns: 1fr;
            }
            
            .header h1 {
                font-size: 2em;
            }
        }
    </style>
</head>
<body>
    <div class="dashboard">
        <div class="header">
            <h1>🎯 Nano-UI 性能仪表板</h1>
            <p>实时监控组件性能和用户体验</p>
        </div>
        
        <div class="metrics-grid">
            <div class="metric-card">
                <div class="metric-value" id="componentCount">--</div>
                <div class="metric-label">活跃组件</div>
            </div>
            
            <div class="metric-card">
                <div class="metric-value" id="avgRenderTime">--</div>
                <div class="metric-label">平均渲染时间 (ms)</div>
            </div>
            
            <div class="metric-card">
                <div class="metric-value" id="memoryUsage">--</div>
                <div class="metric-label">内存使用 (MB)</div>
            </div>
            
            <div class="metric-card">
                <div class="metric-value" id="errorRate">--</div>
                <div class="metric-label">错误率 (%)</div>
            </div>
        </div>
        
        <div class="chart-section">
            <h3 class="chart-title">📈 实时性能趋势</h3>
            <div class="loading">加载中...</div>
        </div>
        
        <div class="chart-section">
            <h3 class="chart-title">🚨 最近错误</h3>
            <div class="loading">等待数据...</div>
        </div>
    </div>

    <script>
        class PerformanceDashboard {
            constructor() {
                this.updateInterval = null;
                this.init();
            }
            
            init() {
                this.startPeriodicUpdate();
                this.setupEventListeners();
            }
            
            startPeriodicUpdate() {
                this.updateInterval = setInterval(() => {
                    this.updateMetrics();
                }, 2000);
            }
            
            updateMetrics() {
                // 模拟性能指标更新
                const componentCount = Math.floor(Math.random() * 20) + 5;
                const avgRenderTime = Math.floor(Math.random() * 100) + 50;
                const memoryUsage = Math.floor(Math.random() * 50) + 20;
                const errorRate = Math.floor(Math.random() * 5);
                
                document.getElementById('componentCount').textContent = componentCount;
                document.getElementById('avgRenderTime').textContent = avgRenderTime;
                document.getElementById('memoryUsage').textContent = memoryUsage;
                document.getElementById('errorRate').textContent = errorRate;
                
                // 这里可以集成真实的性能API
                console.log('[Performance Dashboard] 指标更新:', {
                    componentCount,
                    avgRenderTime,
                    memoryUsage,
                    errorRate
                });
            }
            
            setupEventListeners() {
                // 添加键盘快捷键
                document.addEventListener('keydown', (e) => {
                    if (e.ctrlKey && e.key === 'd') {
                        this.toggleDebugMode();
                    }
                });
            }
            
            toggleDebugMode() {
                console.log('[Performance Dashboard] 切换到调试模式');
                // 实现调试模式切换
            }
        }
        
        // 初始化仪表板
        window.addEventListener('load', () => {
            new PerformanceDashboard();
        });
        
        // 导出到全局，便于调试
        window.PerformanceDashboard = PerformanceDashboard;
    </script>
</body>
</html>'''

        dashboard_path = os.path.join(self.tools_dir, "performance-dashboard.html")
        with open(dashboard_path, 'w', encoding='utf-8') as f:
            f.write(dashboard_html)

        print(f"🖥️ 性能仪表板已创建: {dashboard_path}")

def main():
    """主函数"""
    enhancer = DevToolsEnhancer()

    print("🛠️ 开始开发工具增强...")
    print("=" * 50)

    try:
        # 设置开发环境
        enhancer.setup_dev_environment()

        # 生成错误追踪配置
        enhancer.generate_error_tracking()

        # 创建性能仪表板
        enhancer.create_performance_dashboard()

        print("\n🎉 开发工具增强完成!")
        print("📁 工具位置:", enhancer.tools_dir)
        print("📋 包含:")
        print("   ✅ 增强开发脚本")
        print("   ✅ 调试组件生成器")
        print("   ✅ 性能监控工具")
        print("   ✅ 错误追踪配置")
        print("   ✅ 性能仪表板")

    except Exception as e:
        print(f"❌ 开发工具增强失败: {e}")

if __name__ == "__main__":
    main()