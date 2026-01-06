# TypeScript Types

## src/types/index.ts

```typescript
export interface Agent {
  id: string;
  name: string;
  description?: string;
}

export interface QuestionResponse {
  questionId: string;
}

export interface AnswerResponse {
  answer?: string;
  text?: string;
  status?: string;
  sources?: string[];
}

export interface TokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

export type MessageStatus = 'sending' | 'processing' | 'complete' | 'error';

export interface ChatMessage {
  id: string;
  type: 'user' | 'agent';
  content: string;
  timestamp: Date;
  status?: MessageStatus;
  questionId?: string;
}
```

## Type Explanations

### Agent
Represents an AI agent available in the system.
- `id`: Unique identifier used in API calls
- `name`: Display name shown in dropdown
- `description`: Optional description (not always provided by API)

### QuestionResponse
Response from POST `/agent/agents/{agentId}/questions`
- `questionId`: ID to use for polling the answer endpoint

### AnswerResponse
Response from GET `/qna/questions/{questionId}/answer`
- `answer` or `text`: The actual answer content (API may use either field)
- `status`: Processing status (optional)
- `sources`: Citation sources (optional)

### TokenResponse
Response from OAuth2 token endpoint.

- `access_token`: The bearer token for API authorization
- `token_type`: Usually "Bearer"
- `expires_in`: Token lifetime in seconds

### MessageStatus
Possible states for a chat message:
- `sending`: User message being sent to API
- `processing`: Waiting for agent response (polling)
- `complete`: Message fully delivered/answered
- `error`: Something went wrong

### ChatMessage
Internal representation of messages in the chat UI.
- `id`: Unique ID (generated client-side)
- `type`: Whether from user or agent
- `content`: Message text
- `timestamp`: When message was created
- `status`: Current state (used for UI indicators)
- `questionId`: Links agent message to its question (for polling)
