export interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface Chat {
  title: string;
  model_id: string;
  system_prompt: string;
  history: Message[];
}

export interface Chats {
  [key: string]: Chat;
}

export interface Models {
  [key: string]: string;
}
