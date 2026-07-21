import { motion } from "framer-motion";
import type { ReactNode } from "react";

type FeatureCardProps = {
  icon: ReactNode;
  title: string;
  description: string;
};

function FeatureCard({
  icon,
  title,
  description,
}: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{
        y: -10,
        scale: 1.02,
      }}
      transition={{
        duration: 0.5,
      }}
      viewport={{ once: true }}
      className="group relative overflow-hidden rounded-3xl border border-slate-200/60 bg-white/80 p-8 shadow-xl backdrop-blur-xl transition-all duration-500 hover:border-cyan-300 hover:shadow-[0_25px_60px_rgba(34,211,238,0.18)]"
    >
      {/* Gradient Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 via-blue-500/0 to-violet-500/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      {/* Top Glow Line */}
      <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      <div className="relative z-10">
        {/* Icon */}
        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-100 via-blue-100 to-violet-100 text-cyan-700 shadow-md transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110">
          {icon}
        </div>

        {/* Title */}
        <h3 className="text-2xl font-bold text-slate-900 transition-colors duration-300 group-hover:text-cyan-700">
          {title}
        </h3>

        {/* Description */}
        <p className="mt-4 leading-7 text-slate-600">
          {description}
        </p>

        {/* Bottom Arrow */}
        <div className="mt-8 flex items-center text-sm font-semibold text-cyan-600 opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100">
          Learn more →
        </div>
      </div>
    </motion.div>
  );
}

export default FeatureCard;