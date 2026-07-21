import { motion } from "framer-motion";
import type { ReactNode } from "react";

type StatCardProps = {
  title: string;
  value: string;
  subtitle: string;
  icon: ReactNode;
};

function StatCard({
  title,
  value,
  subtitle,
  icon,
}: StatCardProps) {
  return (
    <motion.div
      whileHover={{
        y: -6,
        scale: 1.02,
      }}
      transition={{ duration: 0.25 }}
      className="
        rounded-3xl
        bg-white
        p-6
        shadow-lg
        border
        border-slate-200
      "
    >
      <div className="flex items-center justify-between">

        <div>

          <p className="text-sm text-slate-500">
            {title}
          </p>

          <h3 className="mt-3 text-4xl font-bold text-slate-900">
            {value}
          </h3>

          <p className="mt-2 text-sm text-green-600">
            {subtitle}
          </p>

        </div>

        <div className="
          flex
          h-16
          w-16
          items-center
          justify-center
          rounded-2xl
          bg-cyan-100
          text-cyan-600
        ">
          {icon}
        </div>

      </div>
    </motion.div>
  );
}

export default StatCard;