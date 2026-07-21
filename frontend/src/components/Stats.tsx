import { motion } from "framer-motion";

const stats = [
  {
    number: "98%",
    title: "Compliance Accuracy",
    description: "AI-powered analysis with high confidence.",
  },
  {
    number: "500+",
    title: "Circulars Supported",
    description: "RBI, SEBI and banking regulations processed.",
  },
  {
    number: "24/7",
    title: "AI Availability",
    description: "Analyze documents anytime, anywhere.",
  },
  {
    number: "10x",
    title: "Faster Analysis",
    description: "Reduce manual compliance review time significantly.",
  },
];

function Stats() {
  return (
    <section className="relative overflow-hidden bg-slate-950 py-28">

      {/* Background Glow */}

      <div className="absolute left-0 top-0 h-80 w-80 rounded-full bg-cyan-500/20 blur-[120px]" />

      <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-violet-500/20 blur-[140px]" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-5 py-2 text-sm font-semibold text-cyan-300">
            Platform Statistics
          </span>

          <h2 className="mt-8 text-5xl font-black text-white md:text-6xl">
            Trusted by
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-400 bg-clip-text text-transparent">
              {" "}
              Modern Banking Teams
            </span>
          </h2>

          <p className="mt-8 text-lg leading-8 text-slate-400">
            Built for speed, accuracy and enterprise-grade compliance.
          </p>
        </motion.div>

        <div className="mt-20 grid gap-8 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: index * 0.15,
              }}
              whileHover={{
                y: -8,
                scale: 1.03,
              }}
              className="rounded-3xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur-xl transition-all duration-500 hover:border-cyan-400/40 hover:shadow-[0_20px_50px_rgba(34,211,238,0.2)]"
            >
              <h3 className="text-5xl font-black bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-400 bg-clip-text text-transparent">
                {stat.number}
              </h3>

              <h4 className="mt-5 text-xl font-bold text-white">
                {stat.title}
              </h4>

              <p className="mt-4 leading-7 text-slate-400">
                {stat.description}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default Stats;