import { Chats } from '../types';
import './Sidebar.css';

interface SidebarProps {
  chats: Chats;
  currentChatId: string | null;
  onSelectChat: (id: string) => void;
  onNewChat: () => void;
  onDeleteChat: () => void;
}

export function Sidebar({ chats, currentChatId, onSelectChat, onNewChat, onDeleteChat }: SidebarProps) {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <span>💬 会话列表</span>
        <button onClick={onDeleteChat} title="删除当前会话">🗑️</button>
      </div>
      <div className="chat-list">
        {Object.entries(chats).map(([id, chat]) => (
          <div
            key={id}
            className={`chat-item ${id === currentChatId ? 'active' : ''}`}
            onClick={() => onSelectChat(id)}
          >
            {chat.title || '未命名会话'}
          </div>
        ))}
      </div>
      <div className="new-chat" onClick={onNewChat}>
        ➕ 新建会话
      </div>
    </div>
  );
}
