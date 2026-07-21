import type { ReactNode } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import Topbar from "@/components/dashboard/Topbar";

type DashboardLayoutProps = {
  children: ReactNode;
};

function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  return (
    <div className="flex h-screen bg-[#f5f7fa]">

      {/* Sidebar */}

      <Sidebar />

      {/* Main */}

      <div className="flex flex-1 flex-col overflow-hidden">

        <Topbar />

        <main className="flex-1 overflow-y-auto p-5 md:p-8">

          {children}

        </main>

      </div>

    </div>
  );
}

export default DashboardLayout;
