import { useEffect, useState } from "react";
import UploadCard from "./UploadCard";
import { uploadService } from "@/services/uploadService";
import type { DocumentUpload } from "@/types/document";

function RecentUploads() {
  const [uploads, setUploads] = useState<DocumentUpload[]>([]);

  useEffect(() => {
    uploadService.history().then((items) => setUploads(items.slice(0, 3))).catch(() => setUploads([]));
  }, []);

  if (!uploads.length) {
    return <p className="text-sm text-slate-500">Your recent document uploads will appear here.</p>;
  }

  return (
    <div className="space-y-5">
      {uploads.map((upload) => (
        <UploadCard key={upload.id} name={upload.filename}
          status={upload.analysis ? "Analysis completed" : "Document uploaded"} />
      ))}
    </div>
  );
}

export default RecentUploads;
