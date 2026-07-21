import { motion } from "framer-motion";
import {
  FileText,
  ShieldCheck,
  TriangleAlert,
  Brain,
  CheckCircle2,
} from "lucide-react";

function DashboardPreview() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-[0_30px_80px_rgba(15,23,42,0.15)]"
    >
      {/* Top Bar */}

      <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4 bg-slate-50">

        <div className="flex items-center gap-3">

          <div className="h-3 w-3 rounded-full bg-red-500" />

          <div className="h-3 w-3 rounded-full bg-yellow-400" />

          <div className="h-3 w-3 rounded-full bg-green-500" />

        </div>

        <div className="rounded-full bg-cyan-100 px-4 py-1 text-sm font-semibold text-cyan-700">
          AUREX Dashboard
        </div>

      </div>

      {/* Body */}

      <div className="grid gap-6 p-6 lg:grid-cols-2">

        {/* Left */}

        <div className="space-y-5">

          <div className="rounded-2xl border border-slate-200 p-5">

            <div className="flex items-center gap-3">

              <FileText className="text-cyan-600" />

              <h3 className="font-bold text-slate-900">
                RBI Circular
              </h3>

            </div>

            <p className="mt-4 text-sm leading-7 text-slate-600">
              RBI/2026-27/145
              <br />
              Digital Banking Security Guidelines
            </p>

          </div>

          <div className="rounded-2xl border border-slate-200 p-5">

            <div className="flex items-center gap-3">

              <Brain className="text-violet-600" />

              <h3 className="font-bold text-slate-900">
                Banking Analysis Summary
              </h3>

            </div>

            <p className="mt-4 text-sm leading-7 text-slate-600">
              New authentication policies introduced.
              Multi-factor authentication is mandatory.
              Banks must update internal policies within
              90 days.
            </p>

          </div>

        </div>

        {/* Right */}

        <div className="space-y-5">

          <div className="rounded-2xl border border-slate-200 p-5">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm text-slate-500">
                  Compliance Score
                </p>

                <h2 className="mt-2 text-5xl font-black text-emerald-500">
                  98%
                </h2>

              </div>

              <ShieldCheck
                size={48}
                className="text-emerald-500"
              />

            </div>

          </div>

          <div className="rounded-2xl border border-slate-200 p-5">

            <div className="flex items-center gap-3">

              <TriangleAlert className="text-orange-500" />

              <h3 className="font-bold text-slate-900">
                Risk Alerts
              </h3>

            </div>

            <ul className="mt-5 space-y-3">

              <li className="flex items-center gap-3">

                <CheckCircle2 className="text-green-500" size={18} />

                <span className="text-sm text-slate-600">
                  MFA Policy Updated
                </span>

              </li>

              <li className="flex items-center gap-3">

                <CheckCircle2 className="text-green-500" size={18} />

                <span className="text-sm text-slate-600">
                  Security Audit Required
                </span>

              </li>

              <li className="flex items-center gap-3">

                <TriangleAlert
                  className="text-orange-500"
                  size={18}
                />

                <span className="text-sm text-slate-600">
                  Customer Login Flow Impacted
                </span>

              </li>

            </ul>

          </div>

        </div>

      </div>

    </motion.div>
  );
}

export default DashboardPreview;
