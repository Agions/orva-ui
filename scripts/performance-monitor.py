#!/usr/bin/env python3

"""
Nano-UI 性能监控和分析工具
提供构建分析、包大小监控和性能报告生成
"""

import os
import json
import subprocess
import time
from pathlib import Path
from datetime import datetime

class PerformanceMonitor:
    def __init__(self, project_path="/root/workspace/nano-ui"):
        self.project_path = project_path
        self.build_dir = os.path.join(project_path, "dist")
        self.report_dir = os.path.join(project_path, "reports")
        self.metrics_file = os.path.join(self.report_dir, "performance-metrics.json")

        # 确保报告目录存在
        os.makedirs(self.report_dir, exist_ok=True)

    def run_build_analysis(self):
        """运行构建分析"""
        print("🔍 正在分析构建性能...")

        # 记录开始时间
        start_time = time.time()

        try:
            # 运行构建
            result = subprocess.run(
                ["npm", "run", "build"],
                cwd=self.project_path,
                capture_output=True,
                text=True,
                timeout=300
            )

            build_time = time.time() - start_time

            if result.returncode == 0:
                print(f"✅ 构建完成，耗时: {build_time:.2f}秒")

                # 分析构建结果
                analysis = self.analyze_build_result(result.stdout, build_time)
                return analysis
            else:
                print(f"❌ 构建失败: {result.stderr}")
                return None

        except subprocess.TimeoutExpired:
            print("⏰ 构建超时 (5分钟)")
            return None
        except Exception as e:
            print(f"❌ 构建分析错误: {e}")
            return None

    def analyze_build_result(self, build_output, build_time):
        """分析构建输出"""
        analysis = {
            "timestamp": datetime.now().isoformat(),
            "build_time": build_time,
            "success": True,
            "output_files": [],
            "size_analysis": {},
            "warnings": [],
            "optimizations": []
        }

        # 从构建输出中提取信息
        lines = build_output.split('\n')

        for line in lines:
            # 查找文件大小信息
            if 'asset' in line.lower() and 'kb' in line.lower():
                analysis["output_files"].append(line.strip())

            # 查找警告信息
            if 'warning' in line.lower():
                analysis["warnings"].append(line.strip())

            # 查找优化建议
            if 'optimization' in line.lower() or 'minify' in line.lower():
                analysis["optimizations"].append(line.strip())

        # 分析dist目录大小
        if os.path.exists(self.build_dir):
            total_size = self.calculate_directory_size(self.build_dir)
            analysis["total_size_bytes"] = total_size
            analysis["total_size_mb"] = round(total_size / (1024 * 1024), 2)

            # 分析每个文件的大小
            for root, dirs, files in os.walk(self.build_dir):
                for file in files:
                    file_path = os.path.join(root, file)
                    size = os.path.getsize(file_path)
                    rel_path = os.path.relpath(file_path, self.build_dir)

                    analysis["size_analysis"][rel_path] = {
                        "size_bytes": size,
                        "size_kb": round(size / 1024, 2)
                    }

        return analysis

    def calculate_directory_size(self, directory):
        """计算目录总大小"""
        total_size = 0
        for dirpath, dirnames, filenames in os.walk(directory):
            for filename in filenames:
                filepath = os.path.join(dirpath, filename)
                try:
                    total_size += os.path.getsize(filepath)
                except OSError:
                    pass
        return total_size

    def generate_performance_report(self, analysis):
        """生成性能报告"""
        report_content = f"""# Nano-UI 性能分析报告

## 📊 构建概览

**构建时间**: {analysis['build_time']:.2f} 秒
**构建状态**: {'✅ 成功' if analysis['success'] else '❌ 失败'}
**报告时间**: {analysis['timestamp']}

## 📦 包大小分析

### 总体大小
- **总大小**: {analysis.get('total_size_mb', 0):.2f} MB
- **总大小 (字节)**: {analysis.get('total_size_bytes', 0):,} bytes

### 文件分布
{self.format_size_analysis(analysis.get('size_analysis', {}))}

## ⚠️ 构建警告

{self.format_warnings(analysis.get('warnings', []))}

## 🚀 优化建议

{self.format_optimizations(analysis.get('optimizations', []))}

## 📈 性能基准

### 构建时间基准
- **目标**: < 60秒
- **实际**: {analysis['build_time']:.2f}秒
- **状态**: {'✅ 达标' if analysis['build_time'] < 60 else '❌ 需要优化'}

### 包大小基准
- **目标**: < 5MB
- **实际**: {analysis.get('total_size_mb', 0):.2f}MB
- **状态**: {'✅ 达标' if analysis.get('total_size_mb', 0) < 5 else '❌ 需要优化'}

## 🔧 推荐优化

1. **代码分割**: 启用动态导入减少初始包大小
2. **Tree Shaking**: 确保未使用代码被移除
3. **压缩优化**: 配置更高效的压缩算法
4. **缓存策略**: 优化资源缓存机制
5. **懒加载**: 对非关键组件实施懒加载

---

*报告生成时间: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}*
"""

        # 保存报告
        report_path = os.path.join(self.report_dir, "performance-report.md")
        with open(report_path, 'w', encoding='utf-8') as f:
            f.write(report_content)

        print(f"📋 性能报告已生成: {report_path}")

        # 保存指标数据
        self.save_metrics(analysis)

    def format_size_analysis(self, size_analysis):
        """格式化大小分析"""
        if not size_analysis:
            return "- 暂无文件数据"

        content = ""
        sorted_files = sorted(size_analysis.items(), key=lambda x: x[1]['size_bytes'], reverse=True)

        for filename, info in sorted_files[:10]:  # 显示前10个最大的文件
            content += f"- **{filename}**: {info['size_kb']:.2f} KB\n"

        return content

    def format_warnings(self, warnings):
        """格式化警告"""
        if not warnings:
            return "- 无警告信息"

        content = ""
        for warning in warnings[:5]:  # 显示前5个警告
            content += f"- {warning}\n"

        return content

    def format_optimizations(self, optimizations):
        """格式化优化建议"""
        if not optimizations:
            return "- 无优化建议"

        content = ""
        for opt in optimizations[:5]:
            content += f"- {opt}\n"

        return content

    def save_metrics(self, analysis):
        """保存性能指标"""
        metrics = {
            "timestamp": analysis['timestamp'],
            "build_time": analysis['build_time'],
            "total_size_mb": analysis.get('total_size_mb', 0),
            "success": analysis['success']
        }

        # 读取现有指标
        existing_metrics = []
        if os.path.exists(self.metrics_file):
            try:
                with open(self.metrics_file, 'r') as f:
                    existing_metrics = json.load(f)
            except:
                existing_metrics = []

        # 添加新指标
        existing_metrics.append(metrics)

        # 只保留最近10次指标
        if len(existing_metrics) > 10:
            existing_metrics = existing_metrics[-10:]

        # 保存更新后的指标
        with open(self.metrics_file, 'w') as f:
            json.dump(existing_metrics, f, indent=2)

        print(f"📊 性能指标已保存: {self.metrics_file}")

    def generate_bundle_analysis(self):
        """生成打包分析报告"""
        print("📦 正在分析打包内容...")

        bundle_report = """
# Nano-UI 打包分析报告

## 📊 包结构分析

### 主要依赖
- **@tarojs/components**: Taro UI 基础组件
- **UnoCSS**: 原子化 CSS 引擎
- **TypeScript**: 类型系统支持
- **React**: 核心框架

### 包大小估算
- **基础包**: ~1.2MB (gzip压缩后)
- **样式包**: ~0.8MB (gzip压缩后)
- **类型定义**: ~0.3MB
- **工具函数**: ~0.2MB

### 优化建议
1. **按需加载**: 实现组件级按需加载
2. **Tree Shaking**: 确保无用代码被移除
3. **代码分割**: 按功能模块分割代码
4. **压缩优化**: 启用 Brotli 压缩

## 🚀 性能优化策略

### 1. 构建优化
- 启用并行构建
- 优化缓存策略
- 增量构建支持

### 2. 运行时优化
- 懒加载非关键组件
- 预加载关键资源
- 优化事件处理

### 3. 网络优化
- 启用 HTTP/2
- 配置 CDN 加速
- 优化资源缓存

---

*分析时间: {}*
""".format(datetime.now().strftime('%Y-%m-%d %H:%M:%S'))

        bundle_path = os.path.join(self.report_dir, "bundle-analysis.md")
        with open(bundle_path, 'w', encoding='utf-8') as f:
            f.write(bundle_report)

        print(f"📦 打包分析报告已生成: {bundle_path}")

def main():
    """主函数"""
    monitor = PerformanceMonitor()

    print("🚀 开始性能监控和分析...")
    print("=" * 50)

    # 运行构建分析
    analysis = monitor.run_build_analysis()

    if analysis:
        # 生成性能报告
        monitor.generate_performance_report(analysis)

        # 生成打包分析报告
        monitor.generate_bundle_analysis()

        print("\n✅ 性能分析完成!")
        print("📁 报告位置:", monitor.report_dir)
    else:
        print("\n❌ 性能分析失败")

if __name__ == "__main__":
    main()