# 更新日志

## [2.0.0] - 2025-11-09

### 🎉 重大重构：前端迁移到 React

#### 新增
- ✨ 使用 **React 18 + TypeScript + Vite** 重构整个前端
- 📦 组件化架构：Sidebar, Header, ChatMessages, ChatInput
- 🎯 TypeScript 类型安全，提升代码质量
- ⚡ Vite 快速开发服务器，支持热模块替换（HMR）
- 🎨 模块化 CSS，每个组件独立样式
- 🪝 自定义 React Hooks（useChats）管理状态
- 🔧 API 层抽离，统一管理后端请求

#### 改进
- 🐳 Docker 多阶段构建，自动构建前端并打包
- 📝 更新 README.md，包含前端开发指南
- 🗂️ 优化项目结构，前后端分离
- ⚙️ 改进 Flask 应用配置，服务 React 构建产物

#### 删除
- 🗑️ 移除根目录旧的 index.html（单文件前端）
- 🧹 优化 .dockerignore，排除前端开发文件

#### 技术栈变化
**之前**：
- 前端：纯 HTML + JavaScript + CDN 库

**现在**：
- 前端：React 18 + TypeScript + Vite
- 后端：Flask + Python 3.11（保持不变）

#### 迁移指南
如需从旧版本迁移到新版本：

1. 安装前端依赖：
   ```bash
   cd frontend
   npm install
   ```

2. 本地开发：
   - 启动后端：`python app.py`
   - 启动前端：`cd frontend && npm run dev`
   - 访问：http://localhost:3000

3. Docker 部署（自动构建）：
   ```bash
   docker compose up -d --build
   ```

---

## [1.0.0] - 初始版本

### 功能
- 🤖 支持多个 AI 模型
- 💬 多会话管理
- ⚙️ 自定义系统提示词
- 📝 Markdown 渲染和代码高亮
- 🐳 Docker 部署支持
