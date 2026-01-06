# API Integration

## src/services/auth.ts

```typescript
import axios from 'axios';
import type { TokenResponse } from '../types';

const AUTH_CONFIG = {
  tokenEndpoint: '/api/auth/idp/connect/token',
  clientId: 'sc-02b9ddd3-d41b-404c-8f33-ebefb1b35921',
  clientSecret: 'hyx_cs_WG3e7b6c2ESokbpEIwDrhplGZB6p5JufZECOH2E3yj9RuY7OZo',
  scope: 'hxp.integrations',
  grantType: 'urn:hyland:params:oauth:grant-type:api-credentials',
};

let cachedToken: string | null = null;
let tokenExpiry: number | null = null;

export async function getAccessToken(): Promise<string> {
  // Return cached token if still valid (with 60 second buffer)
  if (cachedToken && tokenExpiry && Date.now() < tokenExpiry - 60000) {
    return cachedToken;
  }

  const params = new URLSearchParams();
  params.append('grant_type', AUTH_CONFIG.grantType);
  params.append('client_id', AUTH_CONFIG.clientId);
  params.append('client_secret', AUTH_CONFIG.clientSecret);
  params.append('scope', AUTH_CONFIG.scope);

  const response = await axios.post<TokenResponse>(
    AUTH_CONFIG.tokenEndpoint,
    params,
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }
  );

  cachedToken = response.data.access_token;
  tokenExpiry = Date.now() + response.data.expires_in * 1000;

  return cachedToken;
}

export function clearToken(): void {
  cachedToken = null;
  tokenExpiry = null;
}
```

## src/services/api.ts

```typescript
import axios from 'axios';
import { getAccessToken } from './auth';
import type { Agent, QuestionResponse, AnswerResponse } from '../types';

const API_BASE = '/api/discovery';

const API_HEADERS = {
  'Hxp-Environment': 'dev-46a9044f0e99470e9faee8c59583c73b',
  'Hxp-App': 'hxai-discovery',
  'Content-Type': 'application/json',
};

async function getAuthHeaders() {
  const token = await getAccessToken();
  return {
    ...API_HEADERS,
    Authorization: `Bearer ${token}`,
  };
}

export async function getAgents(): Promise<Agent[]> {
  const headers = await getAuthHeaders();
  const response = await axios.get(`${API_BASE}/agent/agents`, { headers });
  return response.data;
}

export async function sendQuestion(agentId: string, question: string): Promise<QuestionResponse> {
  const headers = await getAuthHeaders();
  const payload = { question };
  const response = await axios.post<QuestionResponse>(
    `${API_BASE}/agent/agents/${agentId}/questions`,
    payload,
    { headers }
  );
  return response.data;
}

export async function getAnswer(questionId: string): Promise<AnswerResponse> {
  const headers = await getAuthHeaders();
  const response = await axios.get<AnswerResponse>(
    `${API_BASE}/qna/questions/${questionId}/answer`,
    { headers }
  );
  return response.data;
}
```

## Polling Implementation (in App.tsx)

The polling logic is implemented in App.tsx using `useEffect`:

```typescript
const POLL_INTERVAL = 3000; // 3 seconds

interface PendingQuestion {
  messageId: string;
  questionId: string;
}

const [pendingQuestion, setPendingQuestion] = useState<PendingQuestion | null>(null);

// Poll for answer when we have a pending question
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

  // Poll immediately
  pollForAnswer();

  // Then poll at intervals
  const intervalId = setInterval(pollForAnswer, POLL_INTERVAL);

  return () => clearInterval(intervalId);
}, [pendingQuestion]);
```

## Request/Response Flow

### 1. Get Agents

**Request:**

```http
GET /api/discovery/agent/agents
Headers: Authorization, Hxp-Environment, Hxp-App
```

**Response:**

```json
[
  { "id": "agent-123", "name": "Knowledge Agent" }
]
```

### 2. Send Question

**Request:**

```http
POST /api/discovery/agent/agents/{agentId}/questions
Headers: Authorization, Hxp-Environment, Hxp-App, Content-Type
Body: { "question": "What is...?" }
```

**Response:**

```json
{ "questionId": "q-abc123" }
```

### 3. Get Answer (Poll)

**Request:**

```http
GET /api/discovery/qna/questions/{questionId}/answer
Headers: Authorization, Hxp-Environment, Hxp-App
```

**Response (when ready):**

```json
{
  "answer": "Based on the documentation...",
  "status": "completed",
  "sources": ["doc1", "doc2"]
}
```

## Token Caching Logic

1. First API call triggers token fetch
2. Token cached in memory with expiry time
3. Subsequent calls use cached token
4. Token refreshed automatically 60 seconds before expiry
5. `clearToken()` available for manual invalidation
