# AI 聊天网站

一个基于 React + Flask 的多模型 AI 聊天应用，支持多个会话管理和自定义模型配置。

## 技术栈

**前端**：React 18 + TypeScript + Vite
**后端**：Flask + Python 3.11

## 功能特性

- 🤖 支持多个 AI 模型（Claude、GPT、Gemini、Mistral 等）
- 💬 多会话管理，支持同时进行多个对话
- ⚙️ 可自定义系统提示词
- 🎨 现代化的 React 用户界面
- 📝 Markdown 渲染和代码高亮
- 🔧 通过环境变量灵活配置模型列表
- ⚡ Vite 快速构建和热更新

## 快速开始

### 方式一：使用 Docker Compose（推荐）

1. 配置环境变量

创建 `.env` 文件：

```env
MODELSLAB_API_KEY=your_api_key_here
MODELSLAB_API_URL=https://modelslab.com/api/v7/llm/chat/completions

# 可选：自定义模型列表（JSON 格式）
MODEL_LIST={"claude-sonnet-4.5": "Claude Sonnet 4.5", "gpt-4o": "GPT-4o", "gemini-pro-1.5": "Gemini Pro 1.5"}
```

2. 启动服务

```bash
docker compose up -d
```

3. 访问应用

打开浏览器访问：http://localhost:5000

### 方式二：本地开发

1. 安装后端依赖

```bash
pip install -r requirements.txt
```

2. 安装前端依赖

```bash
cd frontend
npm install
```

3. 配置环境变量

在项目根目录创建 `.env` 文件（参考上面的配置）

4. 启动后端服务

```bash
python app.py
```

5. 启动前端开发服务器（新终端）

```bash
cd frontend
npm run dev
```

6. 访问应用

打开浏览器访问：http://localhost:3000

前端开发服务器会自动代理 API 请求到后端（localhost:5000）

## 环境变量配置

### 必需配置

- `MODELSLAB_API_KEY`: ModelsLab API 密钥
- `MODELSLAB_API_URL`: ModelsLab API 地址

### 可选配置

- `MODEL_LIST`: 自定义模型列表（JSON 格式）

示例：

```env
MODEL_LIST={"model-id-1": "模型名称 1", "model-id-2": "模型名称 2"}
```

如果不配置 `MODEL_LIST`，将使用默认模型列表：
- Claude Sonnet 4.5
- Gemini Pro 1.5
- GPT-4o
- Mistral 7B

## API 接口

### 获取模型列表

```
GET /api/models
```

响应：

```json
{
  "status": "success",
  "models": {
    "claude-sonnet-4.5": "Claude Sonnet 4.5",
    "gpt-4o": "GPT-4o"
  }
}
```

### 发送聊天消息

```
POST /api/chat
Content-Type: application/json

{
  "message": "你好",
  "model_id": "claude-sonnet-4.5",
  "system_prompt": "你是一个有用的助手",
  "history": [
    {"role": "user", "content": "之前的消息"},
    {"role": "assistant", "content": "之前的回复"}
  ]
}
```

响应：

```json
{
  "status": "success",
  "model": "claude-sonnet-4.5",
  "message": "回复内容"
}
```

## 项目结构

```
.
├── frontend/              # React 前端
│   ├── src/
│   │   ├── components/   # React 组件
│   │   │   ├── Sidebar.tsx
│   │   │   ├── Header.tsx
│   │   │   ├── ChatMessages.tsx
│   │   │   └── ChatInput.tsx
│   │   ├── hooks/        # 自定义 Hooks
│   │   ├── types.ts      # TypeScript 类型定义
│   │   ├── api.ts        # API 调用
│   │   ├── App.tsx       # 主应用组件
│   │   └── main.tsx      # 入口文件
│   ├── package.json
│   ├── tsconfig.json
│   └── vite.config.ts
├── app/                   # Flask 后端
│   ├── __init__.py       # Flask 应用工厂
│   ├── routes/
│   │   └── chat.py       # 聊天路由
│   └── utils/
│       └── modelslab_api.py # ModelsLab API 调用
├── app.py                 # 应用入口
├── requirements.txt       # Python 依赖
├── Dockerfile            # Docker 多阶段构建
├── docker-compose.yml    # Docker Compose 配置
├── .env                  # 环境变量配置（需要创建）
└── README.md            # 项目文档
```

## Docker 部署

Docker 镜像使用多阶段构建，自动构建前端并打包到后端。

### 使用 Docker Compose（推荐）

```bash
docker compose up -d
```

查看日志：

```bash
docker compose logs -f
```

停止服务：

```bash
docker compose down
```

### 手动构建和运行

```bash
docker build -t ai-chat-app .
docker run -d -p 5000:5000 --env-file .env --name ai-chat ai-chat-app
```

## 开发说明

### 添加新模型

1. 在 `.env` 文件中添加模型到 `MODEL_LIST`：

```env
MODEL_LIST={"new-model-id": "新模型名称"}
```

2. 前端会自动从后端 API 获取最新的模型列表

### 自定义前端样式

编辑 `frontend/src/components/` 目录下的 `.css` 文件来修改组件样式。

### 前端构建

生产环境构建：

```bash
cd frontend
npm run build
```

构建产物会输出到 `dist/` 目录，Flask 会自动服务这些静态文件。

### 代码检查

```bash
cd frontend
npm run lint
```

## 故障排除

### 模型列表加载失败

- 检查后端服务是否正常运行
- 检查 `.env` 文件中的 `MODEL_LIST` 格式是否正确（必须是有效的 JSON）

### API 调用失败

- 检查 `MODELSLAB_API_KEY` 和 `MODELSLAB_API_URL` 是否正确配置
- 检查网络连接
- 查看后端日志获取详细错误信息

### Docker 容器无法启动

- 检查端口 5000 是否被占用
- 检查 `.env` 文件是否存在且格式正确
- 查看容器日志：`docker compose logs`

### 前端开发服务器无法启动

- 确保已安装 Node.js 18+
- 删除 `node_modules` 并重新安装：`npm install`
- 检查端口 3000 是否被占用

## 许可证

MIT License

## 贡献

欢迎提交 Issue 和 Pull Request！
