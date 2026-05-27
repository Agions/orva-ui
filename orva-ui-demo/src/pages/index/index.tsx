import React, { useState, useEffect, useRef } from 'react';
import { View, Text } from '@tarojs/components';
import { Button, Card, Space, Badge } from 'taro-uno-ui';
import Taro from '@tarojs/taro';
import './index.scss';

/* 简易数字动画 Hook */
const useCountUp = (end: number, duration = 1500, startOnMount = true) => {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!startOnMount) return;
    const timer = setTimeout(() => setStarted(true), 300);
    return () => clearTimeout(timer);
  }, [startOnMount]);

  useEffect(() => {
    if (!started) return;
    let startTime: number;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      setCount(Math.floor(eased * end));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [started, end, duration]);

  return count;
};

const StatCounter: React.FC<{ value: number; label: string; suffix?: string }> = ({ value, label, suffix = '' }) => {
  const count = useCountUp(value, 1800);
  return (
    <View className="index__stat-item animate-slide-up">
      <Text className="index__stat-number">{count}{suffix}</Text>
      <Text className="index__stat-label">{label}</Text>
    </View>
  );
};

const Index: React.FC = () => {
  const componentCategories = [
    { name: '基础组件', count: 4, icon: '🧩', desc: 'Button, Space, Divider 等' },
    { name: '表单组件', count: 11, icon: '📝', desc: 'Input, Switch, Checkbox, Radio 等' },
    { name: '布局组件', count: 4, icon: '📐', desc: 'Card, Grid, Layout 等' },
    { name: '显示组件', count: 5, icon: '🎨', desc: 'Badge, Avatar, Tag, Image 等' },
    { name: '反馈组件', count: 5, icon: '💬', desc: 'Modal, Toast, Loading, Progress 等' },
    { name: '导航组件', count: 3, icon: '🧭', desc: 'Tabs, NavBar, TabBar 等' },
  ];

  const features = [
    { icon: '🚀', title: '跨平台', desc: '支持微信/H5/RN 等多端运行' },
    { icon: '💪', title: 'TypeScript', desc: '完整类型定义，智能提示' },
    { icon: '🎭', title: '主题定制', desc: '灵活的 CSS 变量主题系统' },
    { icon: '⚡', title: 'React Hooks', desc: '丰富的 Hooks API' },
    { icon: '📦', title: '按需引入', desc: 'Tree-shaking 支持，体积优化' },
    { icon: '🌙', title: '暗色模式', desc: '内置暗色主题无缝切换' },
    { icon: '♿', title: '无障碍', desc: 'ARIA 支持，键盘导航' },
    { icon: '🔧', title: '可组合', desc: '组件自由组合，灵活扩展' },
  ];

  const steps = [
    { title: '安装依赖', desc: '通过 npm 安装组件库', code: 'npm i taro-uno-ui' },
    { title: '引入组件', desc: '在页面中按需引入', code: "import { Button } from 'taro-uno-ui'" },
    { title: '开始使用', desc: '直接使用组件', code: '<Button type="primary">点击</Button>' },
  ];

  const totalComponents = componentCategories.reduce((sum, c) => sum + c.count, 0);

  const handleNavigate = () => {
    Taro.switchTab({ url: '/pages/components/index' });
  };

  return (
    <View className="index">
      {/* ========== Hero Section ========== */}
      <View className="index__hero">
        <View className="index__hero-inner">
          <View className="index__logo animate-scale-in">🎨</View>
          <Text className="index__title animate-slide-up delay-100">Orva UI</Text>
          <Text className="index__subtitle animate-slide-up delay-200">
            为 Taro 生态打造的跨平台组件库{'\n'}
            简洁 · 优雅 · 高效
          </Text>
          <View className="index__version-badge animate-fade-in delay-400">
            <View className="index__version-dot" />
            <Text>v1.0.2</Text>
          </View>
        </View>
      </View>

      {/* ========== Stats Bar ========== */}
      <View className="index__stats">
        <StatCounter value={totalComponents} label="组件" suffix="+" />
        <StatCounter value={6} label="分类" />
        <StatCounter value={100} label="测试覆盖" suffix="%" />
        <StatCounter value={3} label="平台支持" />
      </View>

      {/* ========== Features Section ========== */}
      <View className="index__section">
        <View className="index__section-header">
          <View className="index__section-tag">✨ 核心特性</View>
          <Text className="index__section-title">为什么选择 Orva UI</Text>
          <Text className="index__section-desc">
            精心设计的组件库，让跨平台开发更简单
          </Text>
        </View>
        <View className="index__features">
          {features.map((feature, idx) => (
            <View
              key={idx}
              className={`index__feature-item animate-slide-up delay-${(idx % 4 + 1) * 100}`}
            >
              <View className="index__feature-icon">{feature.icon}</View>
              <Text className="index__feature-title">{feature.title}</Text>
              <Text className="index__feature-desc">{feature.desc}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* ========== Component Categories ========== */}
      <View className="index__section">
        <View className="index__section-header">
          <View className="index__section-tag">📚 组件分类</View>
          <Text className="index__section-title">丰富的组件生态</Text>
          <Text className="index__section-desc">
            {totalComponents}+ 组件覆盖常见业务场景
          </Text>
        </View>
        <View className="index__categories">
          {componentCategories.map((category, idx) => (
            <Card key={idx} className="index__category-card">
              <View className="index__category">
                <View className="index__category-icon">{category.icon}</View>
                <View className="index__category-info">
                  <Text className="index__category-name">{category.name}</Text>
                  <Text className="index__category-count">
                    {category.count} 个组件 · {category.desc}
                  </Text>
                </View>
                <Text className="index__category-arrow">›</Text>
              </View>
            </Card>
          ))}
        </View>
      </View>

      {/* ========== Getting Started ========== */}
      <View className="index__section index__getting-started">
        <View className="index__section-header">
          <View className="index__section-tag" style={{ background: 'rgba(255,255,255,0.12)', color: '#c4b5fd', borderColor: 'rgba(196,181,253,0.2)' }}>
            🚀 快速开始
          </View>
          <Text className="index__section-title" style={{ color: '#ffffff' }}>三步上手</Text>
          <Text className="index__section-desc" style={{ color: 'rgba(255,255,255,0.6)' }}>
            几分钟内即可在项目中使用
          </Text>
        </View>
        <View className="index__steps">
          {steps.map((step, idx) => (
            <View key={idx} className="index__step">
              <View className="index__step-number">{idx + 1}</View>
              <View className="index__step-content">
                <Text className="index__step-title">{step.title}</Text>
                <Text className="index__step-desc">{step.desc}</Text>
                <Text className="index__step-code">{step.code}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* ========== CTA ========== */}
      <View className="index__cta">
        <Button
          type="primary"
          size="large"
          onClick={handleNavigate}
          className="index__cta-button"
        >
          浏览组件示例 →
        </Button>
        <Text className="index__cta-subtext">探索所有组件的用法和 API</Text>
      </View>

      {/* ========== Footer ========== */}
      <View className="index__footer">
        <Text>Made with ❤️ by Orva UI Team · </Text>
        <Text className="index__footer-link">GitHub</Text>
        <Text> · </Text>
        <Text className="index__footer-link">Documentation</Text>
      </View>
    </View>
  );
};

export default Index;
