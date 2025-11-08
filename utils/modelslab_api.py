import os
import requests
import json
from dotenv import load_dotenv

load_dotenv()

API_URL = os.getenv("MODELSLAB_API_URL")
API_KEY = os.getenv("MODELSLAB_API_KEY")

def call_modelslab(model_id: str, messages: list):
    """
    通用 ModelsLab API 调用
    """
    headers = {"Content-Type": "application/json"}
    data = {
        "key": API_KEY,
        "model_id": model_id,  # ✅ 动态接收模型
        "messages": messages
    }

    try:
        response = requests.post(API_URL, headers=headers, json=data, timeout=90)
        response.raise_for_status()
        result = response.json()

        if result.get("status") == "success":
            return result.get("message", "")
        else:
            return f"模型返回错误: {json.dumps(result, ensure_ascii=False)}"
    except Exception as e:
        return f"请求失败: {str(e)}"
