import { api } from "@/lib/api";

/**
 * Downloads the PDF report for a completed analysis and triggers the
 * browser's native save dialog. There's no separate "generate" step - the
 * backend builds the PDF on demand from the stored analysis
 * (GET /api/analyses/{id}/report) and streams it back.
 */
export const reportService = {
  download: async (id: number, suggestedName?: string): Promise<void> => {
    const response = await api.get(`/api/analyses/${id}/report`, {
      responseType: "blob",
    });

    const blob = new Blob([response.data], { type: "application/pdf" });
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = suggestedName || `aurex-analysis-${id}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    window.URL.revokeObjectURL(url);
  },
};
