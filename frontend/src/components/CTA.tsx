import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

function CTA() {
  return (
    <section className="relative overflow-hidden py-32">

      {/* Background */}

      <div className="absolute inset-0 bg-gradient-to-br from-cyan-600 via-blue-700 to-slate-900" />

      <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-cyan-400/20 blur-[150px]" />

      <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-violet-500/20 blur-[150px]" />

      <div className="relative mx-auto max-w-5xl px-6 text-center">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >

          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-white backdrop-blur-xl">
            <Sparkles size={16} />
            Intelligent Banking Platform
          </div>

          <h2 className="mt-10 text-5xl font-black leading-tight text-white md:text-6xl">
            Ready to Transform
            <br />
            Banking Compliance?
          </h2>

          <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-slate-200">
            Submit banking change requests and let the local rule engine analyse them,
            detect risks, generate executive reports and automate
            compliance workflows—all from one intelligent platform.
          </p>

          <div className="mt-12 flex flex-wrap justify-center gap-5">

            <button className="flex items-center gap-3 rounded-2xl bg-white px-8 py-4 font-semibold text-slate-900 shadow-2xl transition hover:scale-105">
              Get Started
              <ArrowRight size={18} />
            </button>

            <button className="rounded-2xl border border-white/20 bg-white/10 px-8 py-4 font-semibold text-white backdrop-blur-xl transition hover:bg-white/20">
              Book Demo
            </button>

          </div>

        </motion.div>

      </div>

    </section>
  );
}

export default CTA;
