#!/bin/bash
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
