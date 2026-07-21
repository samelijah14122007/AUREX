import { api } from "@/lib/api";
import type { DocumentUpload } from "@/types/document";

export const uploadService = {
  upload: async (file: File, onProgress?: (progress: number) => void) => {
    const body = new FormData();
    body.append("file", file);
    return (await api.post<DocumentUpload>("/api/documents?analyse=true", body, {
      // The shared API client defaults to JSON. Override it here so the
      // browser sends the FormData with its multipart boundary.
      headers: { "Content-Type": "multipart/form-data" },
      onUploadProgress: event => onProgress?.(event.total ? Math.round((event.loaded / event.total) * 100) : 0),
    })).data;
  },
  history: async () => (await api.get<DocumentUpload[]>("/api/documents")).data,
};
