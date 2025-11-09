import { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { ChatMessages } from './components/ChatMessages';
import { ChatInput } from './components/ChatInput';
import { useChats } from './hooks/useChats';
import { fetchModels, sendMessage } from './api';
import { Models } from './types';
import './App.css';

function App() {
  const [models, setModels] = useState<Models>({});
  const [loading, setLoading] = useState(false);
  const {
    chats,
    currentChatId,
    setCurrentChatId,
    createNewChat,
    deleteChat,
    updateChat
  } = useChats(models);

  useEffect(() => {
    fetchModels().then(setModels).catch(console.error);
  }, []);

  useEffect(() => {
    if (Object.keys(chats).length === 0 && Object.keys(models).length > 0) {
      createNewChat();
    }
  }, [models]);

  const currentChat = currentChatId ? chats[currentChatId] : null;

  const handleSendMessage = async (message: string) => {
    if (!currentChatId || !currentChat) return;

    const newHistory = [...currentChat.history, { role: 'user' as const, content: message }];
    updateChat(currentChatId, { history: newHistory });

    setLoading(true);
    try {
      const reply = await sendMessage(
        message,
        currentChat.model_id,
        currentChat.system_prompt,
        currentChat.history
      );
      updateChat(currentChatId, {
        history: [...newHistory, { role: 'assistant' as const, content: reply }]
      });
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : '网络错误';
      updateChat(currentChatId, {
        history: [...newHistory, { role: 'assistant' as const, content: `错误: ${errorMsg}` }]
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCurrentChat = () => {
    if (currentChatId) {
      deleteChat(currentChatId);
    }
  };

  return (
    <div className="app">
      <Sidebar
        chats={chats}
        currentChatId={currentChatId}
        onSelectChat={setCurrentChatId}
        onNewChat={createNewChat}
        onDeleteChat={handleDeleteCurrentChat}
      />
      <div className="chat-container">
        {currentChat && (
          <>
            <Header
              models={models}
              selectedModel={currentChat.model_id}
              systemPrompt={currentChat.system_prompt}
              chatTitle={currentChat.title}
              onModelChange={(modelId) => updateChat(currentChatId!, { model_id: modelId })}
              onSystemPromptChange={(prompt) => updateChat(currentChatId!, { system_prompt: prompt })}
            />
            <ChatMessages messages={currentChat.history} />
            <ChatInput onSend={handleSendMessage} disabled={loading} />
          </>
        )}
      </div>
    </div>
  );
}

export default App;
