import { motion } from "framer-motion";
import { CheckCircle2, XCircle } from "lucide-react";

const comparisons = [
  {
    traditional: "Manual document review",
    aurex: "AI-powered document analysis",
  },
  {
    traditional: "Hours of compliance checking",
    aurex: "Results within seconds",
  },
  {
    traditional: "High chance of human error",
    aurex: "Intelligent risk detection",
  },
  {
    traditional: "Static compliance reports",
    aurex: "Dynamic executive reports",
  },
  {
    traditional: "Manual policy tracking",
    aurex: "Automated policy monitoring",
  },
  {
    traditional: "Complex workflows",
    aurex: "Simple AI-assisted workflow",
  },
];

function WhyAurex() {
  return (
    <section className="relative overflow-hidden bg-white py-32">

      <div className="absolute left-0 top-0 h-80 w-80 rounded-full bg-cyan-200/30 blur-[120px]" />
      <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-violet-200/30 blur-[140px]" />

      <div className="relative mx-auto max-w-7xl px-6">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="rounded-full bg-cyan-50 border border-cyan-200 px-5 py-2 text-sm font-semibold text-cyan-700">
            Why AUREX
          </span>

          <h2 className="mt-8 text-5xl font-black text-slate-900 md:text-6xl">
            Traditional Compliance
            <span className="bg-gradient-to-r from-cyan-500 via-blue-600 to-violet-600 bg-clip-text text-transparent">
              {" "}vs AUREX AI
            </span>
          </h2>

          <p className="mt-8 text-lg leading-8 text-slate-600">
            Experience how AI transforms regulatory compliance.
          </p>
        </motion.div>

        <div className="mt-20 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl">

          <div className="grid grid-cols-2 bg-slate-900 text-white">

            <div className="p-6 text-center text-2xl font-bold">
              Traditional
            </div>

            <div className="bg-gradient-to-r from-cyan-500 to-blue-600 p-6 text-center text-2xl font-bold">
              AUREX
            </div>

          </div>

          {comparisons.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 border-t border-slate-200"
            >
              <div className="flex items-center gap-4 p-6">

                <XCircle className="text-red-500" />

                <span className="text-slate-600">
                  {item.traditional}
                </span>

              </div>

              <div className="flex items-center gap-4 bg-cyan-50 p-6">

                <CheckCircle2 className="text-green-500" />

                <span className="font-semibold text-slate-900">
                  {item.aurex}
                </span>

              </div>

            </motion.div>
          ))}

        </div>

      </div>

    </section>
  );
}

export default WhyAurex;