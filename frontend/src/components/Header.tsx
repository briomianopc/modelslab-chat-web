import { Models } from '../types';
import './Header.css';

interface HeaderProps {
  models: Models;
  selectedModel: string;
  systemPrompt: string;
  chatTitle: string;
  onModelChange: (modelId: string) => void;
  onSystemPromptChange: (prompt: string) => void;
}

export function Header({
  models,
  selectedModel,
  systemPrompt,
  chatTitle,
  onModelChange,
  onSystemPromptChange
}: HeaderProps) {
  return (
    <div className="header">
      <div>
        <select value={selectedModel} onChange={(e) => onModelChange(e.target.value)}>
          {Object.entries(models).map(([id, name]) => (
            <option key={id} value={id}>{name}</option>
          ))}
        </select>
        <input
          type="text"
          value={systemPrompt}
          onChange={(e) => onSystemPromptChange(e.target.value)}
          placeholder="系统提示词"
        />
      </div>
      <div className="chat-title">{chatTitle}</div>
    </div>
  );
}
