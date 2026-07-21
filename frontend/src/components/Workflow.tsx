import { motion } from "framer-motion";
import {
  Upload,
  Brain,
  ShieldCheck,
  FileText,
  ArrowDown,
} from "lucide-react";

const workflow = [
  {
    icon: Upload,
    title: "Upload Circular",
    description:
      "Upload RBI, SEBI or internal banking circulars securely in PDF format.",
    color: "from-cyan-500 to-blue-600",
  },
  {
    icon: Brain,
    title: "Banking Rule Analysis",
    description:
      "Local banking rules identify key changes, summaries and action items.",
    color: "from-violet-500 to-fuchsia-500",
  },
  {
    icon: ShieldCheck,
    title: "Compliance Detection",
    description:
      "AUREX evaluates compliance risks and highlights impacted policies instantly.",
    color: "from-emerald-500 to-green-600",
  },
  {
    icon: FileText,
    title: "Executive Report",
    description:
      "Generate professional compliance reports ready for management review.",
    color: "from-orange-500 to-amber-500",
  },
];

function Workflow() {
  return (
    <section className="relative overflow-hidden bg-white py-32">

      {/* Background */}

      <div className="absolute left-0 top-0 h-80 w-80 rounded-full bg-cyan-200/30 blur-[120px]" />

      <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-violet-200/30 blur-[140px]" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-3xl text-center"
        >

          <span className="rounded-full border border-cyan-200 bg-cyan-50 px-5 py-2 text-sm font-semibold text-cyan-700">
            Workflow
          </span>

          <h2 className="mt-8 text-5xl font-black text-slate-900 md:text-6xl">
            How
            <span className="bg-gradient-to-r from-cyan-500 via-blue-600 to-violet-600 bg-clip-text text-transparent">
              {" "}
              AUREX
            </span>
            {" "}Works
          </h2>

          <p className="mt-8 text-lg leading-8 text-slate-600">
            From document upload to executive compliance reports,
            AUREX guides every stage with explainable banking analysis.
          </p>

        </motion.div>

        <div className="mx-auto mt-24 flex max-w-5xl flex-col items-center">

          {workflow.map((step, index) => {
            const Icon = step.icon;

            return (
              <div
                key={index}
                className="flex w-full flex-col items-center"
              >
                <motion.div
                  initial={{ opacity: 0, y: 35 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.15,
                  }}
                  whileHover={{
                    y: -8,
                    scale: 1.02,
                  }}
                  className="group w-full rounded-3xl border border-slate-200 bg-white p-8 shadow-xl transition-all duration-500 hover:shadow-[0_25px_60px_rgba(34,211,238,0.18)]"
                >
                  <div className="flex flex-col items-center text-center lg:flex-row lg:text-left">

                    <div
                      className={`flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br ${step.color} text-white shadow-xl`}
                    >
                      <Icon size={34} />
                    </div>

                    <div className="mt-6 lg:ml-8 lg:mt-0">

                      <h3 className="text-3xl font-bold text-slate-900">
                        {step.title}
                      </h3>

                      <p className="mt-4 text-lg leading-8 text-slate-600">
                        {step.description}
                      </p>

                    </div>

                  </div>
                </motion.div>

                {index !== workflow.length - 1 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="my-8 flex justify-center"
                  >
                    <ArrowDown
                      size={34}
                      className="text-cyan-500"
                    />
                  </motion.div>
                )}
              </div>
            );
          })}

        </div>

      </div>

    </section>
  );
}

export default Workflow;
 
