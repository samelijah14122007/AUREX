import type { Analysis } from "./analysis";

export type DocumentUpload = {
  id: number;
  filename: string;
  contentType: string;
  fileSize: number;
  extractedCharacters: number;
  createdAt: string;
  analysis?: Analysis;
};
