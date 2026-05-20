# 文档部署指南

## 当前状态

✅ 文档构建成功 - `npm run build` 无错误
✅ 所有文档文件存在 - sidebar 无断链
✅ 部署工作流已优化

## 手动触发部署

由于 GitHub Pages 环境需要先在仓库设置中启用，请按以下步骤操作：

### 步骤 1: 启用 GitHub Pages

1. 访问 https://github.com/Agions/orva-ui/settings/pages
2. 在 "Build and deployment" 部分:
   - **Source**: 选择 `GitHub Actions`
3. 保存设置

### 步骤 2: 手动触发部署

**方法 A - 通过 GitHub UI**:
1. 访问 https://github.com/Agions/orva-ui/actions
2. 点击左侧的 "Deploy Documentation" 工作流
3. 点击 "Run workflow" 按钮
4. 选择 `main` 分支
5. 点击 "Run workflow"

**方法 B - 通过 GitHub CLI**:
```bash
gh workflow run deploy-docs.yml -r main
```

### 步骤 3: 验证部署

部署完成后:
1. 在 Actions 页面查看工作流运行状态
2. 部署成功后，访问 https://agions.github.io/orva-ui/

## 常见问题

### Q: 部署失败 - "Environment 'github-pages' not found"

**解决**: 需要在 GitHub 仓库设置中创建 Pages 环境:
1. Settings → Environments → New environment
2. 名称: `github-pages`
3. 无需配置部署保护规则

### Q: 部署失败 - "Permission denied"

**解决**: 确保工作流有正确的权限:
- 已配置 `pages: write` 和 `id-token: write`
- 仓库 Settings → Actions → General → "Allow all actions and reusable workflows"

### Q: 文档路径错误

**解决**: 检查 `docusaurus.config.ts` 中的配置:
```typescript
url: 'https://agions.github.io',
baseUrl: '/orva-ui/',
organizationName: 'agions',
projectName: 'orva-ui',
```

## 本地验证

在推送前可以在本地验证文档构建:

```bash
cd docs
npm run build
npm run serve  # 启动本地预览服务器
# 访问 http://localhost:3000
```

## 部署工作流说明

```
deploy-docs.yml
├── build 作业
│   ├── Checkout 代码
│   ├── Setup Node.js 22
│   ├── 安装依赖 (docs/package-lock.json)
│   ├── 构建 Docusaurus
│   ├── 验证构建输出
│   └── 上传 artifact 到 GitHub Pages
│
└── deploy 作业 (依赖 build)
    ├── 使用 github-pages 环境
    └── 部署到 GitHub Pages
```

---

**最后更新**: 2026-05-20
