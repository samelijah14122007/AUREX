import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Upload,
  ArrowRight,
  ShieldCheck,
  BrainCircuit,
  Sparkles,
  Play,
  Star,
} from "lucide-react";

import Badge from "./Badge";
import DashboardPreview from "./DashboardPreview";

function Hero() {
  const navigate = useNavigate();
  return (
    <section className="relative isolate min-h-screen overflow-hidden bg-slate-950">
      {/* Aurora Background */}
      <div className="absolute inset-0 -z-30 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />
      <div className="absolute -left-44 -top-44 h-[36rem] w-[36rem] rounded-full bg-cyan-500/20 blur-[150px]" />
      <div className="absolute right-[-10rem] top-20 h-[34rem] w-[34rem] rounded-full bg-violet-500/20 blur-[150px]" />
      <div className="absolute bottom-[-12rem] left-1/2 h-[30rem] w-[30rem] -translate-x-1/2 rounded-full bg-fuchsia-500/20 blur-[140px]" />

      <motion.div
        animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-16 top-40 h-56 w-56 rounded-full bg-sky-400/20 blur-[120px]"
      />

      <motion.div
        animate={{ x: [0, -30, 0], y: [0, 25, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        className="absolute right-20 bottom-20 h-64 w-64 rounded-full bg-indigo-500/20 blur-[140px]"
      />

      {/* Grid */}
      <div className="absolute inset-0 -z-20 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:64px_64px]" />

      {/* Content */}
      <div className="relative mx-auto flex max-w-7xl flex-col items-center px-6 pt-32 pb-24 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <Badge text="Intelligent Banking Change Analysis Platform" />

          <motion.h1
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-10 text-5xl font-black leading-tight text-white md:text-7xl lg:text-8xl"
          >
            Transform
            <span className="block bg-gradient-to-r from-cyan-400 via-sky-400 to-violet-500 bg-clip-text text-transparent">
              Regulatory Documents
            </span>
            Into Banking Intelligence
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35 }}
            className="mx-auto mt-8 max-w-3xl text-lg leading-9 text-slate-300 md:text-xl"
          >
            AUREX uses local banking rules to analyse change requests and
            produce transparent risk scores, compliance insights, and
            implementation recommendations without external APIs.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-12 flex flex-wrap items-center justify-center gap-5"
          >
            <button onClick={() => navigate("/login")} className="group flex items-center gap-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-4 font-semibold text-white shadow-2xl transition-all duration-300 hover:scale-105">
              <Upload size={20} />
              Start analysis
              <ArrowRight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </button>

            <button onClick={() => document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-8 py-4 font-medium text-white backdrop-blur-xl transition-all duration-300 hover:bg-white/10">
              <Play size={18} />
              Watch Demo
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.65 }}
            className="mt-16 flex flex-wrap items-center justify-center gap-10"
          >
            <div className="flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-5 py-3 backdrop-blur-xl">
              <ShieldCheck className="h-5 w-5 text-emerald-400" />
              <span className="text-sm font-medium text-slate-200">
                Enterprise Security
              </span>
            </div>

            <div className="flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-5 py-3 backdrop-blur-xl">
              <BrainCircuit className="h-5 w-5 text-cyan-400" />
              <span className="text-sm font-medium text-slate-200">
                Explainable analysis
              </span>
            </div>

            <div className="flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-5 py-3 backdrop-blur-xl">
              <Sparkles className="h-5 w-5 text-yellow-400" />
              <span className="text-sm font-medium text-slate-200">
                Instant Analysis
              </span>
            </div>
          </motion.div>

          {/* Statistics */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.85 }}
            className="mt-20 grid w-full max-w-5xl grid-cols-2 gap-6 md:grid-cols-4"
          >
            <div className="rounded-3xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur-2xl">
              <h3 className="text-4xl font-black text-cyan-400">98%</h3>
              <p className="mt-2 text-sm text-slate-400">
                Compliance Accuracy
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur-2xl">
              <h3 className="text-4xl font-black text-violet-400">500+</h3>
              <p className="mt-2 text-sm text-slate-400">
                Banking Circulars
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur-2xl">
              <h3 className="text-4xl font-black text-emerald-400">24/7</h3>
              <p className="mt-2 text-sm text-slate-400">
                AI Availability
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur-2xl">
              <div className="flex justify-center gap-1">
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              </div>
              <p className="mt-3 text-sm text-slate-400">
                Trusted by Teams
              </p>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1 }}
          className="relative mt-24 w-full"
        >
          {/* Floating Analytics Card */}
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -left-6 top-10 hidden rounded-3xl border border-white/10 bg-white/10 p-5 shadow-2xl backdrop-blur-3xl lg:block"
          >
            <p className="text-xs uppercase tracking-wider text-slate-400">
              Compliance Score
            </p>
            <h3 className="mt-2 text-4xl font-black text-emerald-400">
              98%
            </h3>
            <div className="mt-4 h-2 w-44 overflow-hidden rounded-full bg-slate-700">
              <div className="h-full w-[98%] rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400" />
            </div>
          </motion.div>

          {/* Floating Risk Card */}
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -right-6 bottom-14 hidden rounded-3xl border border-white/10 bg-white/10 p-5 shadow-2xl backdrop-blur-3xl lg:block"
          >
            <p className="text-xs uppercase tracking-wider text-slate-400">
              Risk Alerts
            </p>
            <div className="mt-3 space-y-3">
              <div className="flex items-center gap-3">
                <div className="h-3 w-3 rounded-full bg-red-500" />
                <span className="text-sm text-slate-200">
                  RBI Circular Updated
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="h-3 w-3 rounded-full bg-yellow-400" />
                <span className="text-sm text-slate-200">
                  Policy Review Pending
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="h-3 w-3 rounded-full bg-emerald-400" />
                <span className="text-sm text-slate-200">
                  Compliance Passed
                </span>
              </div>
            </div>
          </motion.div>

          {/* Dashboard Glass Card */}
          <div className="relative overflow-hidden rounded-[34px] border border-white/10 bg-white/10 p-3 shadow-[0_30px_100px_rgba(0,0,0,0.45)] backdrop-blur-3xl">
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-cyan-500/10" />
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent" />
            <div className="relative">
              <DashboardPreview />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Fade */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent" />
    </section>
  );
}

export default Hero;
