import { useRef, useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Send, Bot, User as UserIcon } from "lucide-react";
import toast from "react-hot-toast";

import DashboardLayout from "@/layouts/DashboardLayout";
import { sendChatMessage } from "@/services/chatService";
import { getErrorMessage } from "@/lib/api";
import type { ChatMessage } from "@/types/chat";

function makeMessage(role: ChatMessage["role"], content: string): ChatMessage {
  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
    role,
    content,
    createdAt: Date.now(),
  };
}

function Chat() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    makeMessage(
      "assistant",
      "Welcome to the AUREX Banking Knowledge Assistant. Ask about NEFT, RTGS, IMPS, UPI, KYC, AML, PCI DSS, SWIFT, CBS or transaction reconciliation."
    ),
  ]);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const trimmed = input.trim();
    if (!trimmed || isSending) return;

    const userMessage = makeMessage("user", trimmed);
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsSending(true);

    try {
      const reply = await sendChatMessage(trimmed);
      setMessages((prev) => [...prev, makeMessage("assistant", reply)]);
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setIsSending(false);
      setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: "smooth" }), 50);
    }
  }

  return (
    <DashboardLayout>
      <div className="flex h-[calc(100vh-8rem)] flex-col rounded-3xl border bg-white shadow">

        <div className="border-b p-6">
          <h1 className="text-2xl font-bold text-slate-900">Banking Knowledge Assistant</h1>
          <p className="mt-1 text-sm text-slate-500">
            Independent banking knowledge service. Change analysis remains available under New analysis.
          </p>
        </div>

        <div className="flex-1 space-y-4 overflow-y-auto p-6">
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex items-start gap-3 ${
                message.role === "user" ? "flex-row-reverse" : ""
              }`}
            >
              <div
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
                  message.role === "user"
                    ? "bg-cyan-500 text-white"
                    : "bg-slate-900 text-white"
                }`}
              >
                {message.role === "user" ? <UserIcon size={18} /> : <Bot size={18} />}
              </div>

              <div
                className={`max-w-[75%] rounded-2xl px-4 py-3 text-sm leading-6 whitespace-pre-wrap ${
                  message.role === "user"
                    ? "bg-cyan-500 text-white"
                    : "bg-slate-100 text-slate-800"
                }`}
              >
                {message.content}
              </div>
            </motion.div>
          ))}

          {isSending && (
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-900 text-white">
                <Bot size={18} />
              </div>
              <div className="rounded-2xl bg-slate-100 px-4 py-3 text-sm text-slate-500">
                Thinking...
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex items-center gap-3 border-t p-4"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="e.g. What is the difference between RTGS and IMPS?"
            className="h-12 flex-1 rounded-xl border border-slate-200 px-4 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30"
            disabled={isSending}
          />

          <button
            type="submit"
            disabled={isSending || !input.trim()}
            className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500 text-white transition hover:bg-cyan-600 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Send size={18} />
          </button>
        </form>

      </div>
    </DashboardLayout>
  );
}

export default Chat;
