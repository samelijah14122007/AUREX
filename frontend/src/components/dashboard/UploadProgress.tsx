import { motion } from "framer-motion";

type Props = {
  progress: number;
};

function UploadProgress({ progress }: Props) {
  return (
    <div className="mt-8 w-full">

      <div className="mb-2 flex justify-between text-sm text-slate-500">

        <span>Uploading...</span>

        <span>{progress}%</span>

      </div>

      <div className="h-3 overflow-hidden rounded-full bg-slate-200">

        <motion.div
          className="h-full rounded-full bg-cyan-500"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3 }}
        />

      </div>

    </div>
  );
}

export default UploadProgress;