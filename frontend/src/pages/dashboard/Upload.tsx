import DashboardLayout from "@/layouts/DashboardLayout";
import UploadZone from "@/components/dashboard/UploadZone";
import RecentUploads from "@/components/dashboard/RecentUploads";
import { FileUp } from "lucide-react";

function Upload() {
  return (
    <DashboardLayout>
      {/* Header */}

      <section className="mb-10">

        <div className="flex items-center gap-4">

          <div className="rounded-2xl bg-cyan-100 p-4">

            <FileUp
              size={30}
              className="text-cyan-600"
            />

          </div>

          <div>

            <h1 className="text-4xl font-bold text-slate-900">
              Upload Banking Circular
            </h1>

            <p className="mt-2 text-slate-500">
              Upload RBI, SEBI or internal banking circulars for AI-powered
              compliance analysis.
            </p>

          </div>

        </div>

      </section>

      {/* Main */}

      <section className="grid gap-8 lg:grid-cols-[2fr_1fr]">

        {/* Upload */}

        <UploadZone />

        {/* Recent Uploads */}

        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-lg">

          <h2 className="mb-6 text-2xl font-bold text-slate-900">
            Recent Uploads
          </h2>

          <RecentUploads />

        </div>

      </section>

    </DashboardLayout>
  );
}

export default Upload;