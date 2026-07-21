import { motion } from "framer-motion";
import { ShieldCheck, BrainCircuit, Sparkles } from "lucide-react";
import type { ReactNode } from "react";

type AuthLayoutProps = {
  children: ReactNode;
};

function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="relative flex min-h-screen overflow-hidden bg-slate-950">

      {/* Background Glow */}
      <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-cyan-500/20 blur-[140px]" />
      <div className="absolute bottom-0 right-0 h-[500px] w-[500px] rounded-full bg-blue-600/20 blur-[170px]" />

      {/* Left Side */}
      <div className="hidden lg:flex lg:w-1/2 relative items-center justify-center p-16">

        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-lg"
        >
          <h1 className="text-6xl font-black tracking-tight text-white">
            AUREX
          </h1>

          <p className="mt-6 text-2xl font-semibold text-cyan-400">
            Intelligent Banking Change Analysis
          </p>

          <p className="mt-8 text-lg leading-8 text-slate-300">
            Transform regulatory documents into intelligent compliance
            insights through governed banking controls. Analyse change requests,
            detect risks, and accelerate governed delivery workflows.
          </p>

          <div className="mt-12 space-y-6">

            <div className="flex items-center gap-4">
              <ShieldCheck className="text-green-400" size={28} />
              <span className="text-slate-200">
                Enterprise-grade Security
              </span>
            </div>

            <div className="flex items-center gap-4">
              <BrainCircuit className="text-cyan-400" size={28} />
              <span className="text-slate-200">
                Explainable banking analysis
              </span>
            </div>

            <div className="flex items-center gap-4">
              <Sparkles className="text-yellow-400" size={28} />
              <span className="text-slate-200">
                Instant Compliance Analysis
              </span>
            </div>

          </div>
        </motion.div>

      </div>

      {/* Right Side */}
      <div className="flex flex-1 items-center justify-center p-6">

        {children}

      </div>

    </div>
  );
}

export default AuthLayout;
