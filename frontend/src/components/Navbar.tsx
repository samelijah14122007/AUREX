import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/70 border-b border-gray-200">

      <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-5">

        <div className="flex items-center gap-3">

          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-400 flex items-center justify-center text-white font-bold">
            A
          </div>

          <div>
            <h1 className="text-2xl font-black tracking-wide">
              AUREX
            </h1>

            <p className="text-xs text-gray-500">
              Banking Intelligence
            </p>
          </div>

        </div>

        <nav className="hidden md:flex items-center gap-10 font-medium">

          <a href="#" className="hover:text-blue-600 transition">
            Home
          </a>

          <a href="#" className="hover:text-blue-600 transition">
            Features
          </a>

          <a href="#" className="hover:text-blue-600 transition">
            Dashboard
          </a>

          <a href="#" className="hover:text-blue-600 transition">
            Contact
          </a>

        </nav>

        <Link to="/login" className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-white hover:bg-blue-700 transition-all">

          Get Started

          <ArrowRight size={18} />

        </Link>

      </div>

    </header>
  );
}

export default Navbar;
