"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Server,
  Menu,
  X,
  ExternalLink,
  FileText,
  HardDrive,
} from "lucide-react";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-[#C2612B] shadow-md border-b border-orange-850">
      <div className="flex items-center justify-between h-full px-4 lg:px-6">
        
        {/* Logo & Brand */}
        <div className="flex items-center gap-3">
          <button
            className="lg:hidden text-white/90 hover:text-white p-1.5 rounded-lg hover:bg-white/10"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="bg-white/20 rounded-xl p-1.5 group-hover:bg-white/30 transition-colors">
              <Server size={20} className="text-white" />
            </div>
            <div className="leading-tight">
              <div className="text-white font-bold text-sm sm:text-base tracking-wide flex items-center gap-2">
                HPC Cluster
                <span className="bg-orange-800 text-orange-200 text-[10px] font-bold px-1.5 py-0.5 rounded">ODT-KKU</span>
              </div>
              <div className="text-orange-50 text-[11px] hidden sm:block">
                มหาวิทยาลัยขอนแก่น (Khon Kaen University)
              </div>
            </div>
          </Link>
        </div>

        {/* Right: Action Links */}
        <div className="flex items-center gap-2">
          <a
            href="https://kku.world/4rql5x"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-1.5 bg-orange-800 hover:bg-orange-900 text-white text-xs font-bold px-3 py-2 rounded-lg transition-all duration-200 border border-orange-700/50"
          >
            <FileText size={13} />
            <span>ขอใช้บริการ HPC</span>
            <ExternalLink size={10} />
          </a>
          <a
            href="https://kku.world/sbqzt4"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center gap-1.5 bg-orange-800 hover:bg-orange-900 text-white text-xs font-bold px-3 py-2 rounded-lg transition-all duration-200 border border-orange-700/50"
          >
            <HardDrive size={13} />
            <span>ขอโปรแกรม/พื้นที่</span>
            <ExternalLink size={10} />
          </a>
          <a
            href="https://odt-hpc.kku.ac.th"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.25 bg-white/10 hover:bg-white/20 text-white text-xs font-medium px-3 py-2 rounded-lg transition-all duration-200 border border-white/20"
          >
            <ExternalLink size={13} />
            <span>Open OnDemand</span>
          </a>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-16 left-0 right-0 bg-white border-b border-slate-200 shadow-xl z-50 animate-fade-in">
          <div className="p-4 space-y-3">
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-widest px-1">
              ลิงก์สำคัญด่วน
            </div>
            <a
              href="https://kku.world/4rql5x"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-slate-800 font-bold py-2 px-3 rounded-lg hover:bg-orange-50 hover:text-[#C2612B] transition-colors text-sm"
              onClick={() => setMobileMenuOpen(false)}
            >
              <FileText size={16} className="text-[#C2612B]" />
              ขอใช้บริการ HPC Server (kku.world/4rql5x)
              <ExternalLink size={13} className="ml-auto text-slate-400" />
            </a>
            <a
              href="https://kku.world/sbqzt4"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-slate-800 font-bold py-2 px-3 rounded-lg hover:bg-orange-50 hover:text-[#C2612B] transition-colors text-sm"
              onClick={() => setMobileMenuOpen(false)}
            >
              <HardDrive size={16} className="text-[#C2612B]" />
              ขอโปรแกรม / ขอเพิ่มพื้นที่ (kku.world/sbqzt4)
              <ExternalLink size={13} className="ml-auto text-slate-400" />
            </a>
            
            <hr className="border-slate-100" />

            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-widest px-1">
              ช่องทางการเข้าใช้งาน
            </div>
            <a
              href="https://odt-hpc.kku.ac.th"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-slate-800 font-medium py-2 px-3 rounded-lg hover:bg-orange-50 transition-colors text-sm"
              onClick={() => setMobileMenuOpen(false)}
            >
              <ExternalLink size={16} className="text-[#C2612B]" />
              Open OnDemand (ODT-HPC)
            </a>
            <a
              href="https://odt-hpc.kku.ac.th/jupyter"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-slate-800 font-medium py-2 px-3 rounded-lg hover:bg-orange-50 transition-colors text-sm"
              onClick={() => setMobileMenuOpen(false)}
            >
              <ExternalLink size={16} className="text-[#C2612B]" />
              OOD JupyterHub
            </a>
            <div
              className="flex items-center gap-2 text-slate-800 font-medium py-2 px-3 rounded-lg bg-slate-55 text-sm"
            >
              <Server size={16} className="text-[#C2612B]" />
              SSH host: <code className="font-mono text-xs bg-slate-100 px-1 py-0.5 rounded text-orange-800 ml-1">odt-hpc-cn.kku.ac.th</code>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
