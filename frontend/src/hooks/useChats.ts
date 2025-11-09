import { useState, useEffect } from 'react';
import { Chats, Models } from '../types';

const STORAGE_KEY = 'multiChats';

export function useChats(availableModels: Models) {
  const [chats, setChats] = useState<Chats>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  });

  const [currentChatId, setCurrentChatId] = useState<string | null>(() => {
    const chatIds = Object.keys(chats);
    return chatIds.length > 0 ? chatIds[0] : null;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(chats));
  }, [chats]);

  const createNewChat = () => {
    const id = 'chat-' + Date.now();
    const defaultModel = Object.keys(availableModels)[0] || '';
    const newChat = {
      title: '新会话 ' + new Date().toLocaleTimeString(),
      model_id: defaultModel,
      system_prompt: '',
      history: []
    };
    setChats(prev => ({ ...prev, [id]: newChat }));
    setCurrentChatId(id);
  };

  const deleteChat = (id: string) => {
    if (confirm('确定删除该会话吗？')) {
      const newChats = { ...chats };
      delete newChats[id];
      setChats(newChats);
      
      const remainingIds = Object.keys(newChats);
      setCurrentChatId(remainingIds.length > 0 ? remainingIds[0] : null);
    }
  };

  const updateChat = (id: string, updates: Partial<Chats[string]>) => {
    setChats(prev => ({
      ...prev,
      [id]: { ...prev[id], ...updates }
    }));
  };

  return {
    chats,
    currentChatId,
    setCurrentChatId,
    createNewChat,
    deleteChat,
    updateChat
  };
}
