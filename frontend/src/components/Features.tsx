import { motion } from "framer-motion";
import FeatureCard from "./FeatureCard";
import {
  Brain,
  ShieldCheck,
  FileText,
  Upload,
  BarChart3,
  Zap,
} from "lucide-react";

function Features() {
  return (
    <section className="relative overflow-hidden bg-slate-50 py-32">

      {/* Background Glow */}

      <div className="absolute left-0 top-0 h-80 w-80 rounded-full bg-cyan-300/20 blur-[120px]" />

      <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-violet-300/20 blur-[140px]" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">

        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-3xl text-center"
        >

          <span className="rounded-full border border-cyan-200 bg-cyan-50 px-5 py-2 text-sm font-semibold text-cyan-700">
            Why Choose AUREX
          </span>

          <h2 className="mt-8 text-5xl font-black tracking-tight text-slate-900 md:text-6xl">
            Intelligent Banking
            <span className="bg-gradient-to-r from-cyan-500 via-blue-600 to-violet-600 bg-clip-text text-transparent">
              {" "}
              Compliance
            </span>
          </h2>

          <p className="mt-8 text-lg leading-8 text-slate-600">
            AUREX transforms complex regulatory documents into clear,
            actionable insights using explainable banking analysis, helping banks and fintech
            teams stay compliant with confidence.
          </p>

        </motion.div>

        <div className="mt-24 grid gap-8 md:grid-cols-2 xl:grid-cols-3">

          <FeatureCard
            icon={<Upload size={36} />}
            title="Upload Circulars"
            description="Upload RBI, SEBI and banking circulars securely with drag-and-drop support."
          />

          <FeatureCard
            icon={<Brain size={36} />}
            title="Banking Rule Analysis"
            description="Automatically summarize lengthy documents and extract key regulatory changes."
          />

          <FeatureCard
            icon={<ShieldCheck size={36} />}
            title="Risk Detection"
            description="Identify compliance risks, impacted policies and operational changes instantly."
          />

          <FeatureCard
            icon={<BarChart3 size={36} />}
            title="Compliance Score"
            description="Receive AI-generated compliance scores with confidence levels and insights."
          />

          <FeatureCard
            icon={<FileText size={36} />}
            title="Executive Reports"
            description="Generate board-ready compliance reports and action summaries in seconds."
          />

          <FeatureCard
            icon={<Zap size={36} />}
            title="Lightning Fast"
            description="Analyse banking change requests with transparent, explainable controls."
          />

        </div>

      </div>

    </section>
  );
}

export default Features;
