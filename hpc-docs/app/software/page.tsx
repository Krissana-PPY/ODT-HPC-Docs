import Link from "next/link";
import { Package, CheckCircle, BookOpen } from "lucide-react";

export default function SoftwarePage() {
  const software = [
    { name: "NVIDIA Driver",  version: "595.71.05",        category: "system",      guideId: null },
    { name: "CUDA",           version: "13.2",             category: "system",      guideId: null },
    { name: "CUDA Toolkit",   version: "12.6",             category: "system",      guideId: null },
    { name: "Open OnDemand",  version: "3.1",              category: "system",      guideId: null },
    { name: "Node.js",        version: "16.20.2",          category: "system",      guideId: null },
    { name: "Python",         version: "3.9.25",           category: "lang",        guideId: null },
    { name: "Miniconda",      version: "conda 26.3.2",     category: "lang",        guideId: "miniconda" },
    { name: "RStudio Server", version: "2026.04.0",        category: "lang",        guideId: "rstudio" },
    { name: "JupyterHub",     version: "5.4.6",            category: "interactive", guideId: null },
    { name: "JupyterLab",     version: "4.x",              category: "interactive", guideId: null },
    { name: "Apptainer",      version: "1.5.1",            category: "container",   guideId: "apptainer" },
    { name: "Nextflow",       version: "26.04.4",          category: "workflow",    guideId: "nextflow" },
    { name: "Dorado",         version: "1.3.0+6ea400189",  category: "bio",         guideId: "dorado" },
  ];

  const categoryLabel: Record<string, { label: string; color: string }> = {
    system:      { label: "System",      color: "bg-slate-100 text-slate-700" },
    lang:        { label: "Language",    color: "bg-blue-100 text-blue-800" },
    interactive: { label: "Interactive", color: "bg-yellow-100 text-yellow-800" },
    container:   { label: "Container",   color: "bg-indigo-100 text-indigo-800" },
    workflow:    { label: "Workflow",    color: "bg-teal-100 text-teal-800" },
    bio:         { label: "Bio",         color: "bg-green-100 text-green-800" },
  };

  return (
    <div className="space-y-8 animate-fade-in-up">
      <div className="border-b border-slate-200 pb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="bg-purple-100 rounded-lg p-2">
            <Package size={22} className="text-[#6B21A8]" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Software & Environment</h1>
        </div>
        <p className="text-slate-500 ml-12">ซอฟต์แวร์ที่ติดตั้งบนระบบ HPC — คลิก "ดูคู่มือ" เพื่ออ่านวิธีใช้งาน</p>
      </div>

      <section id="installed">
        <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
          <span className="text-[#003087]">3.</span> ซอฟต์แวร์ที่ติดตั้ง
        </h2>
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <table className="docs-table">
            <thead>
              <tr>
                <th>Software</th>
                <th>เวอร์ชัน</th>
                <th>ประเภท</th>
                <th>สถานะ</th>
              </tr>
            </thead>
            <tbody>
              {software.map((sw) => {
                const cat = categoryLabel[sw.category];
                return (
                  <tr key={sw.name}>
                    <td className="font-medium text-slate-800">{sw.name}</td>
                    <td>
                      <code className="bg-purple-100 text-purple-800 px-2 py-0.5 rounded font-mono text-sm">
                        {sw.version}
                      </code>
                    </td>
                    <td>
                      <span className={`inline-block px-2 py-0.5 rounded text-xs font-semibold ${cat.color}`}>
                        {cat.label}
                      </span>
                    </td>
                    <td>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="inline-flex items-center gap-1 text-green-600 font-medium text-sm">
                          <CheckCircle size={13} /> พร้อมใช้งาน
                        </span>
                        {sw.guideId && (
                          <Link
                            href={`/software-guides#${sw.guideId}`}
                            className="inline-flex items-center gap-1 text-[#003087] hover:text-[#F5A623] text-xs font-semibold hover:underline transition-colors"
                          >
                            <BookOpen size={11} /> ดูคู่มือ
                          </Link>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      <div className="alert-info flex items-start gap-3">
        <Package size={16} className="text-blue-600 flex-shrink-0 mt-0.5" />
        <div>
          <p className="font-semibold text-blue-800 text-sm">ต้องการโปรแกรมเพิ่มเติม?</p>
          <p className="text-blue-700 text-sm mt-1">
            กรอกแบบฟอร์มขอติดตั้งที่{" "}
            <a href="https://kku.world/sbqzt4" target="_blank" rel="noopener noreferrer" className="underline font-medium">
              kku.world/sbqzt4
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
