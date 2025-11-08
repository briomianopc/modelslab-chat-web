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
    if not API_URL or not API_KEY:
        raise ValueError("MODELSLAB_API_URL 和 MODELSLAB_API_KEY 必须在 .env 文件中配置")
    
    headers = {"Content-Type": "application/json"}
    data = {
        "key": API_KEY,
        "model_id": model_id,
        "messages": messages
    }

    try:
        response = requests.post(API_URL, headers=headers, json=data, timeout=90)
        response.raise_for_status()
        result = response.json()

        if result.get("status") == "success":
            return result.get("message", "")
        else:
            error_msg = result.get("message", "未知错误")
            return f"模型返回错误: {error_msg}"
    except requests.exceptions.Timeout:
        return "请求超时，请稍后重试"
    except requests.exceptions.RequestException as e:
        return f"请求失败: {str(e)}"
    except json.JSONDecodeError:
        return "响应格式错误"
    except Exception as e:
        return f"发生错误: {str(e)}"
