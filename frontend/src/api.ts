import { Message, Models } from './types';

export async function fetchModels(): Promise<Models> {
  const response = await fetch('/api/models');
  const data = await response.json();
  if (data.status === 'success' && data.models) {
    return data.models;
  }
  throw new Error('Failed to load models');
}

export async function sendMessage(
  message: string,
  modelId: string,
  systemPrompt: string,
  history: Message[]
): Promise<string> {
  const response = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      message,
      model_id: modelId,
      system_prompt: systemPrompt,
      history
    })
  });

  const data = await response.json();
  if (data.status === 'success') {
    return data.message || '（无响应）';
  }
  throw new Error(data.message || '请求失败');
}
