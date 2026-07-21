import { motion } from "framer-motion";
import type { ReactNode } from "react";

type AuthCardProps = {
  title: string;
  subtitle: string;
  children: ReactNode;
};

function AuthCard({
  title,
  subtitle,
  children,
}: AuthCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 35, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7 }}
      className="
        w-full
        max-w-md
        rounded-3xl
        border
        border-white/10
        bg-white/10
        p-8
        shadow-[0_20px_80px_rgba(0,0,0,0.45)]
        backdrop-blur-2xl
      "
    >
      <div className="mb-8">

        <h2 className="text-3xl font-bold text-white">
          {title}
        </h2>

        <p className="mt-2 text-slate-300">
          {subtitle}
        </p>

      </div>

      {children}
    </motion.div>
  );
}

export default AuthCard;