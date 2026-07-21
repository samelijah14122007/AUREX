import { useRef, useState } from "react";
import { UploadCloud, FileText, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import UploadProgress from "./UploadProgress";
import { uploadService } from "@/services/uploadService";
import { getErrorMessage } from "@/lib/api";

const supported = new Set(["pdf", "docx", "txt", "csv", "xlsx"]);

export default function UploadZone() {
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const select = (selected?: File) => {
    if (!selected) return;
    if (!supported.has(selected.name.split(".").pop()?.toLowerCase() || "")) {
      setError("Supported formats are PDF, DOCX, TXT, CSV and XLSX.");
      return;
    }
    if (selected.size > 20 * 1024 * 1024) {
      setError("Document size must not exceed 20 MB.");
      return;
    }
    setError(""); setFile(selected); setProgress(0);
  };
  const upload = async () => {
    if (!file) return;
    setUploading(true); setError("");
    try {
      const result = await uploadService.upload(file, setProgress);
      navigate("/analysis", { state: { analysis: result.analysis } });
    } catch (uploadError) {
      setError(getErrorMessage(uploadError));
      setUploading(false);
    }
  };
  return <motion.div whileHover={{ scale: 1.01 }} onDragOver={event => event.preventDefault()} onDrop={event => { event.preventDefault(); select(event.dataTransfer.files[0]); }} className="flex min-h-[420px] flex-col items-center justify-center rounded-3xl border-2 border-dashed border-cyan-300 bg-cyan-50 p-8">
    <input ref={inputRef} hidden type="file" accept=".pdf,.docx,.txt,.csv,.xlsx" onChange={event => select(event.target.files?.[0])}/>
    <UploadCloud size={60} className="text-cyan-600"/>
    <h2 className="mt-6 text-3xl font-bold">Upload Banking Document</h2>
    <p className="mt-3 text-center text-slate-500">Drop a PDF, DOCX, TXT, CSV or XLSX document here (maximum 20 MB), or browse.</p>
    <button onClick={() => inputRef.current?.click()} className="mt-8 rounded-xl bg-cyan-500 px-8 py-3 font-semibold text-white hover:bg-cyan-600">Browse document</button>
    {file && <div className="mt-8 flex items-center gap-3 rounded-xl bg-white p-4 shadow"><FileText className="text-cyan-600"/><span className="font-medium">{file.name}</span></div>}
    {file && !uploading && <button onClick={upload} className="mt-6 rounded-xl bg-slate-900 px-8 py-3 font-semibold text-white hover:bg-slate-800">Upload &amp; Analyze</button>}
    {uploading && <UploadProgress progress={progress}/>}
    {error && <p className="mt-5 flex items-center gap-2 text-sm text-rose-600"><AlertCircle size={16}/>{error}</p>}
  </motion.div>;
}
