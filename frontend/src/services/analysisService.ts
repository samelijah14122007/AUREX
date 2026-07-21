import { api } from "@/lib/api";
import type { Analysis } from "@/types/analysis";
export const analysisService = {
  analyse: async (requestText: string) => (await api.post<Analysis>("/api/analyses", { requestText })).data,
  history: async (q?: string) => (await api.get<Analysis[]>("/api/analyses", { params: q ? { q } : {} })).data,
  get: async (id: number) => (await api.get<Analysis>(`/api/analyses/${id}`)).data,
};
