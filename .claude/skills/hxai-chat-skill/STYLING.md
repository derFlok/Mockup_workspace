# Styling

## src/index.css

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --bg-primary: #f3f4f6;
  --bg-secondary: #ffffff;
  --bg-chat: #ffffff;
  --text-primary: #1f2937;
  --text-secondary: #6b7280;
  --accent: #3b82f6;
  --accent-hover: #2563eb;
  --user-bubble: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
  --agent-bubble: #f3f4f6;
  --border: #e5e7eb;
}

.dark {
  --bg-primary: #111827;
  --bg-secondary: #1f2937;
  --bg-chat: #1f2937;
  --text-primary: #f9fafb;
  --text-secondary: #9ca3af;
  --accent: #60a5fa;
  --accent-hover: #3b82f6;
  --user-bubble: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
  --agent-bubble: #374151;
  --border: #374151;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
  background-color: var(--bg-primary);
  color: var(--text-primary);
  transition: background-color 0.3s ease, color 0.3s ease;
}

/* Chat Window Animations */
@keyframes chatWindowOpen {
  0% {
    opacity: 0;
    transform: scale(0.9) translateY(20px);
  }
  100% {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

@keyframes chatWindowClose {
  0% {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
  100% {
    opacity: 0;
    transform: scale(0.9) translateY(20px);
  }
}

.chat-window-enter {
  animation: chatWindowOpen 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
}

.chat-window-exit {
  animation: chatWindowClose 0.2s ease-out forwards;
}

/* Message Animations */
@keyframes messageSlideIn {
  0% {
    opacity: 0;
    transform: translateY(20px) scale(0.95);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.message-enter {
  animation: messageSlideIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
}

/* Typing Indicator Wave */
@keyframes wave {
  0%, 60%, 100% {
    transform: translateY(0);
  }
  30% {
    transform: translateY(-8px);
  }
}

.typing-dot {
  animation: wave 1.4s ease-in-out infinite;
}

.typing-dot:nth-child(2) {
  animation-delay: 0.2s;
}

.typing-dot:nth-child(3) {
  animation-delay: 0.4s;
}

/* Floating Button Animations */
@keyframes gentleBounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-6px);
  }
}

@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.5);
  }
  70% {
    box-shadow: 0 0 0 15px rgba(59, 130, 246, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(59, 130, 246, 0);
  }
}

.toggle-button-idle {
  animation: gentleBounce 2s ease-in-out infinite, pulse 2s ease-in-out infinite;
}

.toggle-button-idle:hover {
  animation: none;
  transform: scale(1.1);
}

/* Send Button Pulse */
@keyframes sendPulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

.send-button-ready {
  animation: sendPulse 1.5s ease-in-out infinite;
}

/* Glassmorphism */
.glass {
  background: rgba(59, 130, 246, 0.9);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

.dark .glass {
  background: rgba(30, 41, 59, 0.9);
}

/* Shimmer Loading Effect */
@keyframes shimmer {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}

.shimmer {
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}

.dark .shimmer {
  background: linear-gradient(90deg, #374151 25%, #4b5563 50%, #374151 75%);
  background-size: 200% 100%;
}

/* Notification Badge */
@keyframes badgePop {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}

.badge-pop {
  animation: badgePop 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
}

/* Quick Reply Buttons */
@keyframes quickReplyFadeIn {
  0% {
    opacity: 0;
    transform: translateY(10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.quick-reply-enter {
  animation: quickReplyFadeIn 0.3s ease-out forwards;
}

.quick-reply-enter:nth-child(2) {
  animation-delay: 0.1s;
}

.quick-reply-enter:nth-child(3) {
  animation-delay: 0.2s;
}

/* Emoji Picker */
.emoji-picker {
  animation: chatWindowOpen 0.2s ease-out forwards;
}

/* Scrollbar Styling */
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 3px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

.dark .custom-scrollbar::-webkit-scrollbar-thumb {
  background: #4b5563;
}

.dark .custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #6b7280;
}

/* Tooltip */
.tooltip {
  position: relative;
}

.tooltip::after {
  content: attr(data-tooltip);
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  padding: 4px 8px;
  background: #1f2937;
  color: white;
  font-size: 12px;
  border-radius: 4px;
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s;
}

.tooltip:hover::after {
  opacity: 1;
}

/* User Message Gradient */
.user-message-gradient {
  background: var(--user-bubble);
}

/* Focus Ring */
.focus-ring:focus {
  outline: none;
  ring: 2px;
  ring-color: var(--accent);
  ring-offset: 2px;
}
```

## CSS Variable Reference

### Light Theme Colors
| Variable | Value | Usage |
|----------|-------|-------|
| `--bg-primary` | #f3f4f6 | Page background |
| `--bg-secondary` | #ffffff | Card/panel backgrounds |
| `--bg-chat` | #ffffff | Chat window background |
| `--text-primary` | #1f2937 | Main text color |
| `--text-secondary` | #6b7280 | Secondary/muted text |
| `--accent` | #3b82f6 | Primary action color |
| `--accent-hover` | #2563eb | Hover state for accent |
| `--user-bubble` | gradient | User message background |
| `--agent-bubble` | #f3f4f6 | Agent message background |
| `--border` | #e5e7eb | Border color |

### Dark Theme Colors
| Variable | Value | Usage |
|----------|-------|-------|
| `--bg-primary` | #111827 | Page background |
| `--bg-secondary` | #1f2937 | Card/panel backgrounds |
| `--bg-chat` | #1f2937 | Chat window background |
| `--text-primary` | #f9fafb | Main text color |
| `--text-secondary` | #9ca3af | Secondary/muted text |
| `--accent` | #60a5fa | Primary action color |
| `--accent-hover` | #3b82f6 | Hover state for accent |
| `--agent-bubble` | #374151 | Agent message background |
| `--border` | #374151 | Border color |

## Animation Reference

| Animation | Duration | Easing | Usage |
|-----------|----------|--------|-------|
| `chatWindowOpen` | 0.3s | cubic-bezier(0.34, 1.56, 0.64, 1) | Chat window entrance |
| `chatWindowClose` | 0.2s | ease-out | Chat window exit |
| `messageSlideIn` | 0.3s | cubic-bezier(0.34, 1.56, 0.64, 1) | Message entrance |
| `wave` | 1.4s | ease-in-out | Typing dots |
| `gentleBounce` | 2s | ease-in-out | Toggle button idle |
| `pulse` | 2s | ease-in-out | Toggle button glow |
| `sendPulse` | 1.5s | ease-in-out | Send button ready |
| `shimmer` | 1.5s | linear | Loading skeleton |
| `badgePop` | 0.3s | cubic-bezier(0.34, 1.56, 0.64, 1) | Badge entrance |
| `quickReplyFadeIn` | 0.3s | ease-out | Quick reply buttons |
