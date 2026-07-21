export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  createdAt: number;
}

export interface ChatRequestPayload {
  message: string;
}

export interface ChatResponsePayload {
  response: string;
}
