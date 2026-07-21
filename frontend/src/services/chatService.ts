import { api } from "@/lib/api";
import type { ChatResponsePayload } from "@/types/chat";

/**
 * Sends a message to the AI chat endpoint and returns the assistant's
 * reply text. Backed by POST /api/ai/chat (protected - the JWT is
 * attached automatically by the axios interceptor in lib/api.ts).
 */
export async function sendChatMessage(message: string): Promise<string> {
  const { data } = await api.post<ChatResponsePayload>("/api/ai/chat", {
    message,
  });
  return data.response;
}
