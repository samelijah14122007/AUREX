import DashboardLayout from "@/layouts/DashboardLayout";
import { BrainCircuit } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const steps = [
  "Uploading PDF...",
  "Extracting Text...",
  "Reading Banking Circular...",
  "Running banking rule analysis...",
  "Generating Executive Summary...",
  "Calculating Compliance Score...",
  "Preparing Final Report..."
];

function Processing() {
    const navigate = useNavigate();

useEffect(() => {
  const timer = setTimeout(() => {
    navigate("/analysis");
  }, 6000);

  return () => clearTimeout(timer);
}, [navigate]);
  return (
    <DashboardLayout>
      <div className="flex min-h-[80vh] flex-col items-center justify-center">

        <motion.div
          animate={{
            rotate: 360,
          }}
          transition={{
            repeat: Infinity,
            duration: 6,
            ease: "linear",
          }}
          className="rounded-full bg-cyan-100 p-8"
        >
          <BrainCircuit
            size={70}
            className="text-cyan-600"
          />
        </motion.div>

        <h1 className="mt-10 text-4xl font-bold text-slate-900">
          AUREX AI is Processing...
        </h1>

        <p className="mt-3 text-slate-500">
          Please wait while we analyze your banking document.
        </p>

        <div className="mt-12 w-full max-w-xl space-y-5">

          {steps.map((step, index) => (
            <motion.div
              key={step}
              initial={{ opacity: 0 }}
              animate={{
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                delay: index * 0.6,
                repeat: Infinity,
                duration: 2,
              }}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow"
            >
              {step}
            </motion.div>
          ))}

        </div>

      </div>
    </DashboardLayout>
  );
}

export default Processing;
