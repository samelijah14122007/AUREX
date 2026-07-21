import { BrainCircuit, History, LayoutDashboard, LogOut, MessageSquare, PanelLeftClose, Settings } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

const items = [{ icon: LayoutDashboard, label: "Overview", path: "/dashboard" }, { icon: BrainCircuit, label: "New analysis", path: "/analysis" }, { icon: History, label: "Analysis history", path: "/history" }, { icon: MessageSquare, label: "Knowledge assistant", path: "/chat" }, { icon: Settings, label: "Profile & settings", path: "/settings" }];

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();
  return <aside className="hidden h-screen w-64 shrink-0 flex-col border-r border-slate-200 bg-white p-3 md:flex"><div className="flex items-center justify-between px-3 py-4"><div><h1 className="text-xl font-black tracking-[.16em] text-[#0b1f3a]">AUREX</h1><p className="mt-1 text-[10px] font-semibold uppercase tracking-[.12em] text-slate-500">Change intelligence</p></div><PanelLeftClose size={18} className="text-slate-400" /></div><div className="my-4 border-t border-slate-200" /><nav className="space-y-1">{items.map(({ icon: Icon, label, path }) => { const active = location.pathname === path; return <Link key={path} to={path} className={`group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${active ? "bg-blue-50 text-blue-700" : "text-slate-600 hover:bg-slate-50 hover:text-slate-950"}`}><Icon size={17} />{label}{active && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-cyan-500" />}</Link>; })}</nav><div className="mt-auto border-t border-slate-200 p-3"><p className="text-xs font-semibold text-slate-700">Protected workspace</p><p className="mt-1 text-xs leading-5 text-slate-500">Analyses are saved to your AUREX account.</p></div><button onClick={() => { if (confirm("Log out of AUREX?")) { logout(); navigate("/login"); } }} className="mt-2 flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-slate-500 transition hover:bg-rose-50 hover:text-rose-700"><LogOut size={17} />Sign out</button></aside>;
}
