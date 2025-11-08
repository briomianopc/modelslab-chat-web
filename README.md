# AI 聊天网站

一个基于 Flask 的多模型 AI 聊天应用，支持多个会话管理和自定义模型配置。

## 功能特性

- 🤖 支持多个 AI 模型（Claude、GPT、Gemini、Mistral 等）
- 💬 多会话管理，支持同时进行多个对话
- ⚙️ 可自定义系统提示词
- 🎨 现代化的用户界面
- 📝 Markdown 渲染和代码高亮
- 🔧 通过环境变量灵活配置模型列表

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

1. 安装依赖

```bash
pip install -r requirements.txt
```

2. 配置环境变量

创建 `.env` 文件（参考上面的配置）

3. 运行应用

```bash
python app.py
```

4. 访问应用

打开浏览器访问：http://localhost:5000

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
├── app.py                 # 应用入口
├── index.html            # 前端页面
├── app/
│   ├── __init__.py      # Flask 应用工厂
│   ├── routes/
│   │   ├── __init__.py
│   │   └── chat.py      # 聊天路由
│   └── utils/
│       ├── __init__.py
│       └── modelslab_api.py # ModelsLab API 调用工具
├── requirements.txt      # Python 依赖
├── Dockerfile           # Docker 镜像配置
├── docker-compose.yml   # Docker Compose 配置
├── .env                 # 环境变量配置（需要创建）
├── .env.example         # 环境变量配置示例
└── README.md           # 项目文档
```

## Docker 部署

### 构建镜像

```bash
docker build -t ai-chat-app .
```

### 运行容器

```bash
docker run -d \
  -p 5000:5000 \
  --env-file .env \
  --name ai-chat \
  ai-chat-app
```

### 使用 Docker Compose

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

## 开发说明

### 添加新模型

1. 在 `.env` 文件中添加模型到 `MODEL_LIST`：

```env
MODEL_LIST={"new-model-id": "新模型名称"}
```

2. 前端会自动从后端 API 获取最新的模型列表

### 自定义前端样式

编辑 `index.html` 中的 `<style>` 部分来修改界面样式。

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

## 许可证

MIT License

## 贡献

欢迎提交 Issue 和 Pull Request！
