from flask import Blueprint, request, jsonify
import os
import json
from dotenv import load_dotenv
from app.utils.modelslab_api import call_modelslab

load_dotenv()

chat_bp = Blueprint("chat", __name__)

def get_allowed_models():
    """
    从环境变量获取允许的模型列表
    格式: MODEL_LIST={"model-id-1": "Model Name 1", "model-id-2": "Model Name 2"}
    如果没有配置，使用默认模型列表
    """
    model_list_str = os.getenv("MODEL_LIST", "")
    if model_list_str:
        try:
            return json.loads(model_list_str)
        except json.JSONDecodeError:
            pass
    
    # 默认模型列表
    return {
        "claude-sonnet-4.5": "Claude Sonnet 4.5",
        "gemini-pro-1.5": "Gemini Pro 1.5",
        "gpt-4o": "GPT-4o",
        "mistral-7b": "Mistral 7B"
    }

@chat_bp.route("/api/models", methods=["GET"])
def get_models():
    """
    获取可用的模型列表
    """
    models = get_allowed_models()
    return jsonify({
        "status": "success",
        "models": models
    })

@chat_bp.route("/api/chat", methods=["POST"])
def chat():
    """
    聊天接口（前端选择模型、系统提示词、历史上下文）
    """
    try:
        data = request.json or {}

        user_message = data.get("message")
        model_id = data.get("model_id")
        system_prompt = data.get("system_prompt", "")
        history = data.get("history", [])

        if not user_message:
            return jsonify({"status": "error", "message": "消息为空"}), 400

        if not model_id:
            return jsonify({"status": "error", "message": "未指定模型"}), 400

        # 安全检查：确认模型是否允许
        allowed_models = get_allowed_models()
        if model_id not in allowed_models:
            return jsonify({
                "status": "error",
                "message": f"不支持的模型: {model_id}"
            }), 400

        # 验证历史记录格式
        if not isinstance(history, list):
            history = []

        # 构建消息历史
        messages = []
        if system_prompt:
            messages.append({"role": "system", "content": system_prompt})
        messages.extend(history)
        messages.append({"role": "user", "content": user_message})

        # 调用 ModelsLab API
        reply = call_modelslab(model_id, messages)

        return jsonify({
            "status": "success",
            "model": model_id,
            "message": reply
        })
    except Exception as e:
        return jsonify({
            "status": "error",
            "message": f"服务器错误: {str(e)}"
        }), 500
