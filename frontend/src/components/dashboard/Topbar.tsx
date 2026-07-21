import { Bell, ChevronDown, Search } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

export default function Topbar() {
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-slate-200 bg-white/90 px-5 backdrop-blur-xl md:px-8">
      <div className="relative hidden w-80 md:block">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pl-9 pr-4 text-sm text-slate-800 outline-none transition focus:border-blue-500" placeholder="Search analyses or controls" />
      </div>
      <div className="ml-auto flex items-center gap-2">
        <button title="Notifications" aria-label="Notifications" className="relative rounded-lg p-2 text-slate-500 transition hover:bg-slate-100">
          <Bell size={18} />
          <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-cyan-500" />
        </button>
        <button className="ml-2 flex items-center gap-3 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-left">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-blue-700 to-cyan-500 text-xs font-bold text-white">{user?.name?.slice(0, 2).toUpperCase() || "AU"}</span>
          <span className="hidden md:block"><span className="block text-sm font-semibold text-slate-800">{user?.name || "AUREX User"}</span><span className="block text-xs text-slate-500">Banking operations</span></span>
          <ChevronDown size={15} className="text-slate-400" />
        </button>
      </div>
    </header>
  );
}
