import React from 'react';
import { View, Text } from '@tarojs/components';
import { Card, Button, Space, Divider } from 'taro-uno-ui';
import Taro from '@tarojs/taro';
import './index.scss';

const About: React.FC = () => {
  const handleCopyNpm = () => {
    Taro.setClipboardData({
      data: 'npm install taro-uno-ui',
      success: () => {
        Taro.showToast({ title: '已复制', icon: 'success' });
      },
    });
  };

  const handleOpenGithub = () => {
    Taro.setClipboardData({
      data: 'https://github.com/agions/taro-uno',
      success: () => {
        Taro.showToast({ title: 'GitHub 地址已复制', icon: 'success' });
      },
    });
  };

  const handleOpenDocs = () => {
    Taro.setClipboardData({
      data: 'https://agions.github.io/taro-uno',
      success: () => {
        Taro.showToast({ title: '文档地址已复制', icon: 'success' });
      },
    });
  };

  return (
    <View className="about">
      {/* Header */}**
      <View className="about__header">
        <Text className="about__logo">🎨</Text>
        <Text className="about__title">Taro Uno UI</Text>
        <Text className="about__version">v1.0.2</Text>
      </View>

      {/* Description */}**
      <Card className="about__card">
        <Text className="about__desc">
          Taro Uno UI 是一个为 Taro 生态系统打造的跨平台 UI 组件库，
          提供丰富的 UI 组件和表单控件，支持微信小程序、H5、React Native 等多端开发。
        </Text>
      </Card>

      {/* Features */}**
      <Card title="✨ 核心特性" className="about__card">
        <View className="about__features">
          <View className="about__feature">
            <Text className="about__feature-icon">🌐</Text>
            <Text className="about__feature-text">跨平台兼容</Text>
          </View>
          <View className="about__feature">
            <Text className="about__feature-icon">📦</Text>
            <Text className="about__feature-text">30+ 组件</Text>
          </View>
          <View className="about__feature">
            <Text className="about__feature-icon">🔷</Text>
            <Text className="about__feature-text">TypeScript</Text>
          </View>
          <View className="about__feature">
            <Text className="about__feature-icon">🎣</Text>
            <Text className="about__feature-text">React Hooks</Text>
          </View>
          <View className="about__feature">
            <Text className="about__feature-icon">🎨</Text>
            <Text className="about__feature-text">主题定制</Text>
          </View>
          <View className="about__feature">
            <Text className="about__feature-icon">📡</Text>
            <Text className="about__feature-text">智能请求</Text>
          </View>
        </View>
      </Card>

      {/* Install */}**
      <Card title="📥 安装" className="about__card">
        <View className="about__install">
          <Text className="about__install-code">npm install taro-uno-ui</Text>
          <Button size="small" onClick={handleCopyNpm}>复制</Button>
        </View>
      </Card>

      {/* Links */}**
      <Card title="🔗 链接" className="about__card">
        <Space direction="vertical" size="medium" style={{ width: '100%' }}>
          <Button type="primary" block onClick={handleOpenDocs}>
            📚 查看文档
          </Button>
          <Button type="default" block onClick={handleOpenGithub}>
            ⭐ GitHub
          </Button>
        </Space>
      </Card>

      <Divider />

      {/* Footer */}**
      <View className="about__footer">
        <Text className="about__copyright">MIT License © 2026 Agions</Text>
      </View>
    </View>
  );
};

export default About;
