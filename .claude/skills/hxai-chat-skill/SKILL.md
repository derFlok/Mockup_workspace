---
name: hxai-chat-integration
description: Build a complete HxAI Discovery chat application with React. Creates a WhatsApp-style floating chat widget with agent selection, real-time messaging, dark mode, animations, and OAuth2 authentication. Use when asked to build HxAI chat, create AI agent interface, or integrate Hyland Discovery API.
---

# HxAI Chat Integration Skill

Build a production-ready chat interface for Hyland's HxAI Discovery API in minutes.

## What You'll Get

- Floating chat widget (WhatsApp-style)
- Agent selection dropdown
- Real-time messaging with polling
- Dark mode with theme toggle
- Smooth animations (slide-in, wave typing, bounce)
- Glassmorphism header design
- Copy-to-clipboard for responses
- Relative timestamps
- Quick reply suggestions
- Auto-resize text input
- OAuth2 authentication (pre-configured)

## Quick Start

```bash
# 1. Create new project
npm create vite@latest my-hxai-chat -- --template react-ts
cd my-hxai-chat

# 2. Install dependencies
npm install axios
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# 3. Run development server
npm run dev
```

Then follow the file-by-file instructions below.

## Architecture

```
src/
├── App.tsx                    # Main app with ThemeProvider
├── main.tsx                   # Entry point
├── index.css                  # Tailwind + animations + theming
├── contexts/
│   └── ThemeContext.tsx       # Dark mode state
├── components/
│   ├── ChatWindow.tsx         # Main chat container
│   ├── ChatHeader.tsx         # Glassmorphism header + agent selector
│   ├── MessageList.tsx        # Message thread + welcome screen
│   ├── MessageBubble.tsx      # User/agent message styling
│   ├── ChatInput.tsx          # Auto-resize input + send
│   ├── ChatToggleButton.tsx   # Floating button with animations
│   ├── TypingIndicator.tsx    # Wave animation dots
│   └── QuickReplies.tsx       # Suggestion buttons
├── services/
│   ├── auth.ts                # OAuth2 token management
│   └── api.ts                 # API calls (agents, questions, answers)
└── types/
    └── index.ts               # TypeScript interfaces
```

## Component Hierarchy

```
App (ThemeProvider wrapper)
└── AppContent
    ├── ChatWindow (conditional modal)
    │   ├── ChatHeader
    │   │   ├── Agent avatar + status indicator
    │   │   ├── Agent dropdown selector
    │   │   ├── Theme toggle button
    │   │   ├── Clear chat button
    │   │   └── Close button
    │   ├── MessageList
    │   │   ├── Welcome screen (when empty)
    │   │   │   └── QuickReplies
    │   │   ├── MessageBubble (for each message)
    │   │   └── TypingIndicator (when processing)
    │   └── ChatInput
    └── ChatToggleButton (fixed bottom-right)
```

## API Reference

### Endpoints

| Endpoint | Method | URL |
|----------|--------|-----|
| Get Agents | GET | `/agent/agents` |
| Send Question | POST | `/agent/agents/{agentId}/questions` |
| Get Answer | GET | `/qna/questions/{questionId}/answer` |

### Base URLs

- **API**: `https://discovery.experience.hyland.com`
- **Auth**: `https://auth.iam.experience.hyland.com`

### Required Headers

```
Authorization: Bearer {token}
Hxp-Environment: dev-46a9044f0e99470e9faee8c59583c73b
Hxp-App: hxai-discovery
Content-Type: application/json
```

### OAuth2 Configuration

```
Token Endpoint: /idp/connect/token
Client ID: sc-02b9ddd3-d41b-404c-8f33-ebefb1b35921
Client Secret: hyx_cs_WG3e7b6c2ESokbpEIwDrhplGZB6p5JufZECOH2E3yj9RuY7OZo
Grant Type: urn:hyland:params:oauth:grant-type:api-credentials
Scope: hxp.integrations
```

### Message Flow

1. User sends question -> POST `/agent/agents/{agentId}/questions`
2. API returns `{ questionId: "..." }`
3. Poll GET `/qna/questions/{questionId}/answer` every 3 seconds
4. When `answer` or `text` field present, display response

## Implementation Steps

### Step 1: Project Setup

See [PROJECT_SETUP.md](PROJECT_SETUP.md) for:
- vite.config.ts (with proxy configuration)
- tailwind.config.js
- postcss.config.js
- index.html

### Step 2: TypeScript Types

See [TYPES.md](TYPES.md) for:
- Agent interface
- ChatMessage interface
- QuestionResponse interface
- AnswerResponse interface

### Step 3: API Integration

See [API_INTEGRATION.md](API_INTEGRATION.md) for:
- src/services/auth.ts (OAuth2 token management)
- src/services/api.ts (API calls)

### Step 4: Styling

See [STYLING.md](STYLING.md) for:
- Complete src/index.css
- CSS custom properties for theming
- All keyframe animations

### Step 5: Components

See [COMPONENTS.md](COMPONENTS.md) for complete code of all components:
- ThemeContext.tsx
- App.tsx
- ChatWindow.tsx
- ChatHeader.tsx
- MessageList.tsx
- MessageBubble.tsx
- ChatInput.tsx
- ChatToggleButton.tsx
- TypingIndicator.tsx
- QuickReplies.tsx

## File Creation Order

1. `src/types/index.ts`
2. `src/services/auth.ts`
3. `src/services/api.ts`
4. `src/contexts/ThemeContext.tsx`
5. `src/index.css`
6. `src/components/TypingIndicator.tsx`
7. `src/components/QuickReplies.tsx`
8. `src/components/MessageBubble.tsx`
9. `src/components/MessageList.tsx`
10. `src/components/ChatInput.tsx`
11. `src/components/ChatHeader.tsx`
12. `src/components/ChatToggleButton.tsx`
13. `src/components/ChatWindow.tsx`
14. `src/App.tsx`
15. `vite.config.ts`

## Key Features Explained

### Dark Mode
- Uses React Context for state
- Persists to localStorage
- Respects system preference on first load
- CSS custom properties for all colors

### Animations
- Chat window: scale + fade (0.3s enter, 0.2s exit)
- Messages: slide up with bounce
- Typing dots: wave effect with staggered delays
- Toggle button: gentle bounce + pulse when idle
- Send button: pulse when content ready

### Polling Logic
- 3-second interval after question submitted
- Stops when answer received or error occurs
- Uses React useEffect with cleanup

### Token Caching
- Stored in memory (not localStorage)
- Cached until 60 seconds before expiry
- Auto-refreshes transparently

## Customization

### Change Colors
Edit CSS variables in `src/index.css` under `:root` and `.dark`

### Change Animations
Edit `@keyframes` in `src/index.css`

### Change Quick Replies
Edit `QUICK_REPLIES` array in `src/components/QuickReplies.tsx`

### Change Polling Interval
Edit `POLL_INTERVAL` constant in `src/App.tsx`

## Troubleshooting

### CORS Errors
Ensure vite.config.ts has proxy configuration for `/api/auth` and `/api/discovery`

### Token Errors
Check client credentials and token endpoint URL

### No Agents Loading
Verify Hxp-Environment and Hxp-App headers

### Messages Not Appearing
Check console for API errors, verify agentId is selected
