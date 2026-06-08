"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  Zap,
  Package,
  Terminal,
  Send,
  Database,
  FileCode,
  Settings,
  HelpCircle,
  ChevronRight,
  ExternalLink,
  FileText,
  HardDrive,
  MessageSquare,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  {
    href: "/quick-start",
    label: "เริ่มต้นใช้งานด่วน",
    icon: Zap,
    description: "Quick Start Guide",
    subtopics: [
      { label: "OOD: เข้าผ่านหน้าเว็บ", hash: "#ood" },
      { label: "JupyterHub: เข้าทำงานด่วน", hash: "#jupyter" },
      { label: "SSH: ผ่านคีย์เวิร์ดหน้าจอหลัก", hash: "#ssh" },
      { label: "File Transfer: ส่งข้อมูลงาน", hash: "#transfer" },
    ],
  },
  {
    href: "/",
    label: "บทคำนำและภาพรวมระบบ",
    icon: BookOpen,
    description: "ภาพรวมระบบ HPC",
    subtopics: [
      { label: "บทนำระบบความเร็วสูง", hash: "#intro" },
      { label: "ภาพรวมสเปคฮาร์ดแวร์", hash: "#overview" },
      { label: "พาร์ติชันคิวทำงานหลัก", hash: "#partitions" },
      { label: "กฎเหล็กความปลอดภัยสำคัญ", hash: "#rules" },
    ],
  },
  {
    href: "/software",
    label: "Software & Environment",
    icon: Package,
    description: "รายการซอฟต์แวร์",
    subtopics: [
      { label: "Environment Modules", hash: "#modules" },
      { label: "รายการโมดูลสำคัญ", hash: "#important" },
      { label: "ซอฟต์แวร์หลักของระบบ", hash: "#core" },
    ],
  },
  {
    href: "/slurm-commands",
    label: "คำสั่ง Slurm พื้นฐาน",
    icon: Terminal,
    description: "คำสั่งที่จำเป็น",
    subtopics: [
      { label: "ตารางคำสั่งทั่วไป", hash: "#general" },
      { label: "สถานะคิวงาน (Job State)", hash: "#job-state" },
      { label: "สถานะโหนด (Node State)", hash: "#node-state" },
    ],
  },
  {
    href: "/job-submission",
    label: "การส่งงาน (Submission)",
    icon: Send,
    description: "Job Submission",
    subtopics: [
      { label: "สคริปต์ Batch ทั่วไป", hash: "#batch" },
      { label: "งานจำลองโต้ตอบ Interactive", hash: "#interactive" },
      { label: "ขอเปิดใช้งานการคำนวณ GPU", hash: "#gpu" },
      { label: "งานสเกลหลายโหนด (MPI)", hash: "#multinode" },
      { label: "ประเภทงานวนซ้ำ Array Job", hash: "#array" },
    ],
  },
  {
    href: "/scratch",
    label: "การใช้งาน /scratch",
    icon: Database,
    description: "I/O เร็ว SSD",
    subtopics: [
      { label: "แนะนำ SSD Local Scratch", hash: "#scratch" },
    ],
  },
  {
    href: "/examples",
    label: "ตัวอย่างสคริปต์",
    icon: FileCode,
    description: "Script Examples",
    subtopics: [
      { label: "Python CPU สากล", hash: "#python-cpu" },
      { label: "PyTorch GPU สำเร็จรูป", hash: "#pytorch-gpu" },
      { label: "สคริปต์แบบสถิติสำหรับ R", hash: "#r-script" },
      { label: "ตัวอย่างงาน Multi-GPU", hash: "#multi-gpu" },
    ],
  },
  {
    href: "/job-management",
    label: "การจัดการงาน",
    icon: Settings,
    description: "จัดการ Jobs",
    subtopics: [
      { label: "ตรวจสอบคิววิ่งงาน (squeue)", hash: "#squeue" },
      { label: "ยกเลิกงานที่รันอยู่ (scancel)", hash: "#scancel" },
      { label: "ตรวจสอบปริมาณโควตางาน", hash: "#quota" },
    ],
  },
  {
    href: "/prompts",
    label: "Prompt AI สำหรับช่วยใช้งาน",
    icon: MessageSquare,
    description: "AI Prompt helper",
    subtopics: [
      { label: "1. โค้ดกระตุ้น AI แรกเริ่ม", hash: "#prime" },
      { label: "2. เทมเพลตถามตอบที่สำคัญ", hash: "#cats" },
      { label: "3. ตัวอย่างการแก้ปัญหาจริง", hash: "#cases" },
    ],
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <>
      {/* Desktop Sidebar - Fixed */}
      <aside className="hidden lg:flex flex-col fixed left-0 top-16 bottom-0 w-72 bg-white border-r border-slate-200 z-40 overflow-y-auto select-none">
        
        {/* KKU Required links inside Sidebar vertical */}
        <div className="p-4 border-b border-slate-100 bg-gradient-to-b from-orange-50/50 to-white space-y-4">
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">
              ลิงก์ขอบริการ (Request HPC)
            </p>
            <div className="space-y-2">
              <a
                href="https://kku.world/4rql5x"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-[#C2612B] hover:bg-orange-700 text-white rounded-xl px-3 py-2 transition-all duration-150 group shadow-sm"
              >
                <FileText size={14} className="flex-shrink-0 text-orange-200" />
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-xs leading-none text-white">
                    ขอใช้บริการ HPC Server
                  </div>
                  <div className="text-orange-200 text-[10px] truncate leading-none mt-1">
                    kku.world/4rql5x
                  </div>
                </div>
                <ExternalLink size={10} className="flex-shrink-0 opacity-60 group-hover:opacity-100 text-white" />
              </a>
              
              <a
                href="https://kku.world/sbqzt4"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-[#C2612B] hover:bg-orange-700 text-white rounded-xl px-3 py-2 transition-all duration-150 group shadow-sm"
              >
                <HardDrive size={14} className="flex-shrink-0 text-orange-200" />
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-xs leading-none text-white">
                    ขอเพิ่มพื้นที่ / โปรแกรม
                  </div>
                  <div className="text-orange-200 text-[10px] truncate leading-none mt-1">
                    kku.world/sbqzt4
                  </div>
                </div>
                <ExternalLink size={10} className="flex-shrink-0 opacity-60 group-hover:opacity-100 text-white" />
              </a>
            </div>
          </div>

          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
              เข้าใช้งานระบบ (Portals & SSH)
            </p>
            <div className="space-y-2">
              <a
                href="https://odt-hpc.kku.ac.th"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-orange-50 hover:bg-orange-100 text-[#C2612B] border border-orange-200/80 rounded-xl px-3 py-1.5 transition-all duration-150 group"
              >
                <ExternalLink size={13} className="text-[#C2612B] flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-xs leading-none text-slate-800">
                    Open OnDemand (OOD)
                  </div>
                  <div className="text-[#C2612B] text-[10px] truncate leading-none mt-1 font-mono">
                    https://odt-hpc.kku.ac.th
                  </div>
                </div>
              </a>

              <a
                href="https://odt-hpc.kku.ac.th/jupyter"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-orange-50 hover:bg-orange-100 text-[#C2612B] border border-orange-200/80 rounded-xl px-3 py-1.5 transition-all duration-150 group"
              >
                <BookOpen size={13} className="text-[#C2612B] flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-xs leading-none text-slate-800">
                    OOD JupyterHub
                  </div>
                  <div className="text-[#C2612B] text-[10px] truncate leading-none mt-1 font-mono">
                    odt-hpc.kku.ac.th/jupyter
                  </div>
                </div>
              </a>

              <div
                className="flex items-center gap-2 bg-orange-50 text-slate-800 border border-orange-200/80 rounded-xl px-3 py-1.5 duration-150"
              >
                <Terminal size={13} className="text-[#C2612B] flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-xs leading-none text-slate-800">
                    SSH: Connect Server
                  </div>
                  <div className="text-[#C2612B] font-mono text-[9.5px] truncate leading-none mt-1 select-all">
                    odt-hpc-cn.kku.ac.th
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-3 py-2">
            คู่มือการใช้งานระบบ
          </p>
          <ul className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <li key={item.href} className="space-y-0.5">
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-xs sm:text-sm transition-all duration-150 group",
                      isActive
                        ? "bg-orange-50 text-orange-950 font-bold"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    )}
                  >
                    <Icon
                      size={15}
                      className={cn(
                        "flex-shrink-0",
                        isActive
                          ? "text-[#C2612B]"
                          : "text-slate-400 group-hover:text-slate-600"
                      )}
                    />
                    <span className="flex-1 truncate">{item.label}</span>
                    {isActive && (
                      <ChevronRight size={13} className="text-[#C2612B] flex-shrink-0" />
                    )}
                  </Link>
                  {/* Dynamic subtopics showing for active items */}
                  {isActive && item.subtopics && item.subtopics.length > 0 && (
                    <ul className="pl-8 pr-2 py-1 space-y-1.5 border-l border-orange-100 ml-5 animate-fade-in-up">
                      {item.subtopics.map((sub, sidx) => (
                        <li key={sidx}>
                          <Link
                            href={`${item.href === "/" ? "" : item.href}${sub.hash}`}
                            className="block text-[11.5px] text-slate-500 hover:text-orange-700 hover:underline transition-colors py-0.5 truncate"
                          >
                            • {sub.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100">
          <div className="text-xs text-slate-400 text-center">
            <div className="font-semibold text-slate-500">
              ODT-HPC · KKU v1.0
            </div>
            <div>พฤษภาคม 2568</div>
          </div>
        </div>
      </aside>
    </>
  );
}
