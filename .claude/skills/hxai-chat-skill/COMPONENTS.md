# React Components

## src/contexts/ThemeContext.tsx

```tsx
import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    const stored = localStorage.getItem('chat-theme');
    if (stored === 'dark' || stored === 'light') return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  useEffect(() => {
    localStorage.setItem('chat-theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
}
```

## src/components/TypingIndicator.tsx

```tsx
export function TypingIndicator() {
  return (
    <div className="flex items-start gap-2 mb-4 message-enter">
      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      </div>
      <div className="bg-[var(--agent-bubble)] rounded-2xl rounded-tl-md px-4 py-3 shadow-sm">
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 bg-[var(--text-secondary)] rounded-full typing-dot"></div>
          <div className="w-2 h-2 bg-[var(--text-secondary)] rounded-full typing-dot"></div>
          <div className="w-2 h-2 bg-[var(--text-secondary)] rounded-full typing-dot"></div>
        </div>
      </div>
    </div>
  );
}
```

## src/components/QuickReplies.tsx

```tsx
interface QuickRepliesProps {
  onSelect: (question: string) => void;
}

const QUICK_REPLIES = [
  'What can you help me with?',
  'How do I get started?',
  'Tell me about this system',
];

export function QuickReplies({ onSelect }: QuickRepliesProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {QUICK_REPLIES.map((reply, index) => (
        <button
          key={reply}
          onClick={() => onSelect(reply)}
          className="quick-reply-enter px-3 py-2 bg-[var(--bg-secondary)] hover:bg-[var(--accent)] hover:text-white text-[var(--text-primary)] text-sm rounded-full border border-[var(--border)] shadow-sm transition-all duration-200 hover:shadow-md hover:scale-105"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          {reply}
        </button>
      ))}
    </div>
  );
}
```

## src/components/MessageBubble.tsx

```tsx
import { useState } from 'react';
import type { ChatMessage } from '../types';

interface MessageBubbleProps {
  message: ChatMessage;
}

function getRelativeTime(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins} min ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  return date.toLocaleDateString();
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const [copied, setCopied] = useState(false);
  const isUser = message.type === 'user';
  const isProcessing = message.status === 'processing' || message.status === 'sending';

  const handleCopy = async () => {
    await navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4 message-enter group`}>
      {!isUser && (
        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0 mr-2 shadow-md">
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
      )}
      <div className="flex flex-col">
        <div
          className={`max-w-[280px] px-4 py-3 shadow-sm transition-all duration-200 ${
            isUser
              ? 'user-message-gradient text-white rounded-2xl rounded-br-md'
              : 'bg-[var(--agent-bubble)] text-[var(--text-primary)] rounded-2xl rounded-tl-md'
          }`}
        >
          {isProcessing && !isUser ? (
            <div className="flex items-center gap-2">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-[var(--text-secondary)] rounded-full typing-dot" />
                <span className="w-2 h-2 bg-[var(--text-secondary)] rounded-full typing-dot" />
                <span className="w-2 h-2 bg-[var(--text-secondary)] rounded-full typing-dot" />
              </div>
              <span className="text-sm text-[var(--text-secondary)]">Thinking...</span>
            </div>
          ) : (
            <div className="whitespace-pre-wrap text-sm leading-relaxed">{message.content}</div>
          )}
        </div>
        <div className={`flex items-center gap-2 mt-1 ${isUser ? 'justify-end' : 'justify-start'}`}>
          <span className={`text-xs text-[var(--text-secondary)]`}>
            {getRelativeTime(message.timestamp)}
          </span>
          {isUser && message.status === 'complete' && (
            <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          )}
          {!isUser && !isProcessing && (
            <button
              onClick={handleCopy}
              className="opacity-0 group-hover:opacity-100 p-1 hover:bg-[var(--bg-secondary)] rounded transition-all duration-200"
              title="Copy message"
            >
              {copied ? (
                <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <svg className="w-4 h-4 text-[var(--text-secondary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
```

## src/components/MessageList.tsx

```tsx
import { useEffect, useRef } from 'react';
import { MessageBubble } from './MessageBubble';
import { QuickReplies } from './QuickReplies';
import type { ChatMessage } from '../types';

interface MessageListProps {
  messages: ChatMessage[];
  onQuickReply: (question: string) => void;
}

export function MessageList({ messages, onQuickReply }: MessageListProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (messages.length === 0) {
    return (
      <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
        <div className="flex flex-col items-center justify-center h-full">
          <div className="text-center mb-6 message-enter">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
              Welcome to HxAI Discovery!
            </h3>
            <p className="text-sm text-[var(--text-secondary)] mb-1">
              I'm here to help you find information.
            </p>
            <p className="text-xs text-[var(--text-secondary)]">
              Select an agent above and ask me anything!
            </p>
          </div>
          <QuickReplies onSelect={onQuickReply} />
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
      {messages.map((message) => (
        <MessageBubble key={message.id} message={message} />
      ))}
      <div ref={bottomRef} />
    </div>
  );
}
```

## src/components/ChatInput.tsx

```tsx
import { useState, useRef, useEffect } from 'react';

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

export function ChatInput({ onSend, disabled, placeholder = 'Type a message...' }: ChatInputProps) {
  const [message, setMessage] = useState('');
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (!disabled) {
      inputRef.current?.focus();
    }
  }, [disabled]);

  const adjustHeight = () => {
    const textarea = inputRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    adjustHeight();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSend(message.trim());
      setMessage('');
      if (inputRef.current) {
        inputRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const hasContent = message.trim().length > 0;

  return (
    <form onSubmit={handleSubmit} className="border-t border-[var(--border)] p-3 bg-[var(--bg-secondary)]">
      <div className="flex items-end gap-2">
        <textarea
          ref={inputRef}
          value={message}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          placeholder={placeholder}
          rows={1}
          className="flex-1 px-4 py-2 bg-[var(--bg-primary)] border border-[var(--border)] rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed text-sm text-[var(--text-primary)] placeholder:text-[var(--text-secondary)] transition-all duration-200"
          style={{ minHeight: '40px', maxHeight: '120px' }}
        />
        <button
          type="submit"
          disabled={disabled || !hasContent}
          className={`p-2.5 rounded-full transition-all duration-200 ${
            hasContent && !disabled
              ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md hover:shadow-lg hover:scale-105 send-button-ready'
              : 'bg-[var(--bg-primary)] text-[var(--text-secondary)] cursor-not-allowed'
          }`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
        </button>
      </div>
      <p className="text-xs text-[var(--text-secondary)] mt-2 text-center">
        Press Enter to send, Shift+Enter for new line
      </p>
    </form>
  );
}
```

## src/components/ChatHeader.tsx

```tsx
import { useTheme } from '../contexts/ThemeContext';
import type { Agent } from '../types';

interface ChatHeaderProps {
  agents: Agent[];
  selectedAgentId: string | null;
  onSelectAgent: (agentId: string) => void;
  onClose: () => void;
  onClearChat: () => void;
  isLoading?: boolean;
}

export function ChatHeader({ agents, selectedAgentId, onSelectAgent, onClose, onClearChat, isLoading }: ChatHeaderProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="glass text-white px-4 py-3 rounded-t-2xl flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="relative">
          <div className="w-10 h-10 bg-gradient-to-br from-white/30 to-white/10 rounded-full flex items-center justify-center shadow-lg">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white shadow-sm"></div>
        </div>
        <div>
          <h2 className="font-semibold text-sm">HxAI Agent</h2>
          <select
            value={selectedAgentId || ''}
            onChange={(e) => onSelectAgent(e.target.value)}
            disabled={isLoading}
            className="text-xs bg-white/10 border border-white/20 rounded-md px-2 py-1 text-white focus:outline-none focus:ring-2 focus:ring-white/30 cursor-pointer disabled:cursor-not-allowed transition-all hover:bg-white/20 max-w-[150px] truncate"
          >
            <option value="" className="text-gray-800 bg-white">Select agent...</option>
            {agents.map((agent) => (
              <option key={agent.id} value={agent.id} className="text-gray-800 bg-white">
                {agent.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="flex items-center gap-1">
        <button
          onClick={toggleTheme}
          className="p-2 hover:bg-white/20 rounded-full transition-all duration-200"
          aria-label="Toggle theme"
          title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {theme === 'dark' ? (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          )}
        </button>
        <button
          onClick={onClearChat}
          className="p-2 hover:bg-white/20 rounded-full transition-all duration-200"
          aria-label="Clear chat"
          title="Clear conversation"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
        <button
          onClick={onClose}
          className="p-2 hover:bg-white/20 rounded-full transition-all duration-200"
          aria-label="Close chat"
          title="Close chat"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}
```

## src/components/ChatToggleButton.tsx

```tsx
interface ChatToggleButtonProps {
  isOpen: boolean;
  onClick: () => void;
  hasUnread?: boolean;
  unreadCount?: number;
}

export function ChatToggleButton({ isOpen, onClick, hasUnread, unreadCount = 0 }: ChatToggleButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`fixed bottom-4 right-4 w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 z-50 ${
        isOpen
          ? 'bg-gray-600 hover:bg-gray-700 rotate-0 scale-100'
          : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 toggle-button-idle'
      }`}
      aria-label={isOpen ? 'Close chat' : 'Open chat'}
    >
      {isOpen ? (
        <svg className="w-6 h-6 text-white transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      ) : (
        <>
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          {hasUnread && (
            <span className="absolute -top-1 -right-1 min-w-5 h-5 px-1.5 bg-red-500 rounded-full border-2 border-white flex items-center justify-center badge-pop">
              {unreadCount > 0 && (
                <span className="text-white text-xs font-bold">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </span>
          )}
        </>
      )}
    </button>
  );
}
```

## src/components/ChatWindow.tsx

```tsx
import { useState, useEffect } from 'react';
import { ChatHeader } from './ChatHeader';
import { MessageList } from './MessageList';
import { ChatInput } from './ChatInput';
import type { Agent, ChatMessage } from '../types';

interface ChatWindowProps {
  isOpen: boolean;
  onClose: () => void;
  agents: Agent[];
  selectedAgentId: string | null;
  onSelectAgent: (agentId: string) => void;
  messages: ChatMessage[];
  onSendMessage: (message: string) => void;
  onClearChat: () => void;
  isLoading?: boolean;
  isSending?: boolean;
}

export function ChatWindow({
  isOpen,
  onClose,
  agents,
  selectedAgentId,
  onSelectAgent,
  messages,
  onSendMessage,
  onClearChat,
  isLoading,
  isSending,
}: ChatWindowProps) {
  const [animationClass, setAnimationClass] = useState('');
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      setAnimationClass('chat-window-enter');
    } else if (shouldRender) {
      setAnimationClass('chat-window-exit');
      const timer = setTimeout(() => {
        setShouldRender(false);
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [isOpen, shouldRender]);

  if (!shouldRender) return null;

  return (
    <div
      className={`fixed bottom-20 right-4 w-[380px] h-[550px] bg-[var(--bg-chat)] rounded-2xl shadow-2xl flex flex-col z-50 border border-[var(--border)] overflow-hidden ${animationClass}`}
    >
      <ChatHeader
        agents={agents}
        selectedAgentId={selectedAgentId}
        onSelectAgent={onSelectAgent}
        onClose={onClose}
        onClearChat={onClearChat}
        isLoading={isLoading}
      />
      <MessageList
        messages={messages}
        onQuickReply={onSendMessage}
      />
      <ChatInput
        onSend={onSendMessage}
        disabled={!selectedAgentId || isSending}
        placeholder={!selectedAgentId ? 'Select an agent first...' : 'Type a message...'}
      />
    </div>
  );
}
```

## src/App.tsx

```tsx
import { useState, useEffect, useCallback } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { ChatWindow } from './components/ChatWindow';
import { ChatToggleButton } from './components/ChatToggleButton';
import { getAgents, sendQuestion, getAnswer } from './services/api';
import type { Agent, ChatMessage } from './types';

const POLL_INTERVAL = 3000;

interface PendingQuestion {
  messageId: string;
  questionId: string;
}

function AppContent() {
  const [isOpen, setIsOpen] = useState(false);
  const [agents, setAgents] = useState<Agent[]>([]);
  const [selectedAgentId, setSelectedAgentId] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [pendingQuestion, setPendingQuestion] = useState<PendingQuestion | null>(null);

  useEffect(() => {
    async function loadAgents() {
      try {
        const agentList = await getAgents();
        setAgents(agentList);
      } catch (err) {
        console.error('Failed to load agents:', err);
      } finally {
        setIsLoading(false);
      }
    }
    loadAgents();
  }, []);

  useEffect(() => {
    if (!pendingQuestion) return;

    const { messageId, questionId } = pendingQuestion;

    const pollForAnswer = async () => {
      try {
        const response = await getAnswer(questionId);
        const answerText = response.answer || response.text;

        if (answerText) {
          setMessages(prev => prev.map(msg =>
            msg.id === messageId
              ? { ...msg, content: answerText, status: 'complete' as const }
              : msg
          ));
          setPendingQuestion(null);
          setIsSending(false);
        }
      } catch (err) {
        console.log('Polling error (will retry):', err);
      }
    };

    pollForAnswer();
    const intervalId = setInterval(pollForAnswer, POLL_INTERVAL);
    return () => clearInterval(intervalId);
  }, [pendingQuestion]);

  const handleSendMessage = useCallback(async (content: string) => {
    if (!selectedAgentId || isSending) return;

    const userMessageId = `user-${Date.now()}`;
    const agentMessageId = `agent-${Date.now()}`;

    const userMessage: ChatMessage = {
      id: userMessageId,
      type: 'user',
      content,
      timestamp: new Date(),
      status: 'complete',
    };

    const agentMessage: ChatMessage = {
      id: agentMessageId,
      type: 'agent',
      content: '',
      timestamp: new Date(),
      status: 'processing',
    };

    setMessages(prev => [...prev, userMessage, agentMessage]);
    setIsSending(true);

    try {
      const response = await sendQuestion(selectedAgentId, content);
      setPendingQuestion({
        messageId: agentMessageId,
        questionId: response.questionId,
      });
    } catch (err) {
      setMessages(prev => prev.map(msg =>
        msg.id === agentMessageId
          ? { ...msg, content: 'Sorry, something went wrong. Please try again.', status: 'error' as const }
          : msg
      ));
      setIsSending(false);
    }
  }, [selectedAgentId, isSending]);

  const handleClearChat = useCallback(() => {
    setMessages([]);
    setPendingQuestion(null);
    setIsSending(false);
  }, []);

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] transition-colors duration-300">
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-[var(--text-primary)] mb-4 transition-colors">
            Welcome to HxAI Discovery
          </h1>
          <p className="text-[var(--text-secondary)] mb-8 transition-colors">
            Click the chat button to start asking questions to our AI agents
          </p>
          <div className="animate-bounce">
            <svg className="w-12 h-12 mx-auto text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </div>

      <ChatWindow
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        agents={agents}
        selectedAgentId={selectedAgentId}
        onSelectAgent={setSelectedAgentId}
        messages={messages}
        onSendMessage={handleSendMessage}
        onClearChat={handleClearChat}
        isLoading={isLoading}
        isSending={isSending}
      />

      <ChatToggleButton
        isOpen={isOpen}
        onClick={() => setIsOpen(!isOpen)}
      />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
```
