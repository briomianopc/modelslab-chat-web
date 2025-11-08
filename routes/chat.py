from flask import Blueprint, request, jsonify
from app.utils.modelslab_api import call_modelslab

chat_bp = Blueprint("chat", __name__)

# ✅ 允许的模型列表（与前端一致）
ALLOWED_MODELS = {
    "claude-sonnet-4.5": "Claude Sonnet 4.5",
    "gemini-pro-1.5": "Gemini Pro 1.5",
    "gpt-4o": "GPT-4o",
    "mistral-7b": "Mistral 7B"
}

@chat_bp.route("/api/chat", methods=["POST"])
def chat():
    """
    聊天接口（前端选择模型、系统提示词、历史上下文）
    """
    data = request.json or {}

    user_message = data.get("message")
    model_id = data.get("model_id")
    system_prompt = data.get("system_prompt", "")
    history = data.get("history", [])

    if not user_message:
        return jsonify({"status": "error", "message": "消息为空"}), 400

    # ✅ 安全检查：确认模型是否允许
    if model_id not in ALLOWED_MODELS:
        return jsonify({
            "status": "error",
            "message": f"不支持的模型: {model_id}"
        }), 400

    # ✅ 构建消息历史
    messages = []
    if system_prompt:
        messages.append({"role": "system", "content": system_prompt})
    messages.extend(history)
    messages.append({"role": "user", "content": user_message})

    # ✅ 调用 ModelsLab API
    reply = call_modelslab(model_id, messages)

    return jsonify({
        "status": "success",
        "model": model_id,
        "message": reply
    })
