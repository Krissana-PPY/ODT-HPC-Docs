"use client";

import Link from "next/link";
import { Server, Menu, X } from "lucide-react";

interface NavbarProps {
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
}

export function Navbar({ mobileOpen, setMobileOpen }: NavbarProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-gradient-to-r from-[#C2612B] via-[#C2612B] to-[#F5A623] shadow-md border-b border-orange-850">
      <div className="flex items-center justify-between h-full px-4 lg:px-6">

        {/* Logo & Brand */}
        <div className="flex items-center gap-3">
          <button
            className="lg:hidden text-white/90 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="bg-white/20 rounded-xl p-1.5 group-hover:bg-white/30 transition-colors">
              <Server size={20} className="text-yellow-300" />
            </div>
            <div className="leading-tight">
              <div className="text-white font-bold text-sm sm:text-base tracking-wide flex items-center gap-2">
                HPC Cluster
                <span className="bg-yellow-500 text-slate-900 text-[10px] font-extrabold px-1.5 py-0.5 rounded shadow-sm">ODT-KKU</span>
              </div>
              <div className="text-yellow-100 text-[11px] hidden sm:block">
                มหาวิทยาลัยขอนแก่น (Khon Kaen University)
              </div>
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
}
