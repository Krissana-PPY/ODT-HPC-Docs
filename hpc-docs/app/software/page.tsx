import { Package, CheckCircle, Dna } from "lucide-react";

export default function SoftwarePage() {
  const software = [
    { name: "NVIDIA Driver", version: "595.71.05", category: "system" },
    { name: "CUDA", version: "13.2", category: "system" },
    { name: "JupyterHub", version: "5.4.6", category: "system" },
    { name: "JupyterLab", version: "4.x", category: "system" },
    { name: "Python", version: "3.9.25", category: "system" },
    { name: "Node.js", version: "16.20.2", category: "system" },
    { name: "Open OnDemand", version: "3.1", category: "system" },
    { name: "Dorado", version: "1.3.0+6ea400189", category: "system" },
  ];

  return (
    <div className="space-y-8 animate-fade-in-up">
      <div className="border-b border-slate-200 pb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="bg-purple-100 rounded-lg p-2">
            <Package size={22} className="text-[#6B21A8]" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Software & Environment</h1>
        </div>
        <p className="text-slate-500 ml-12">ซอฟต์แวร์และสภาพแวดล้อมที่ติดตั้งบนระบบ HPC</p>
      </div>

      <section>
        <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
          <span className="text-[#003087]">3.</span> ซอฟต์แวร์ที่ติดตั้ง
        </h2>
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <table className="docs-table">
            <thead>
              <tr>
                <th>Software</th>
                <th>เวอร์ชัน</th>
                <th>สถานะ</th>
              </tr>
            </thead>
            <tbody>
              {software.map((sw) => (
                <tr key={sw.name}>
                  <td className="font-medium text-slate-800 flex items-center gap-1.5">
                    {sw.category === "bio" && <Dna size={13} className="text-green-600 flex-shrink-0" />}
                    {sw.name}
                  </td>
                  <td>
                    <code className={`px-2 py-0.5 rounded font-mono text-sm ${sw.category === "bio" ? "bg-green-100 text-green-800" : "bg-purple-100 text-purple-800"}`}>
                      {sw.version}
                    </code>
                  </td>
                  <td>
                    <span className="inline-flex items-center gap-1 text-green-600 font-medium text-sm">
                      <CheckCircle size={13} /> พร้อมใช้งาน
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold text-slate-800 mb-4">สภาพแวดล้อม Python</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { title: "Python", desc: "ภาษาหลักสำหรับการวิเคราะห์ข้อมูลและ ML", color: "blue" },
            { title: "CUDA 13.2", desc: "GPU Computing สำหรับงาน AI/ML", color: "purple" },
            { title: "JupyterHub", desc: "Notebook environment บน Web Browser", color: "orange" },
          ].map((item) => (
            <div key={item.title} className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
              <h3 className="font-semibold text-slate-800 mb-2">{item.title}</h3>
              <p className="text-slate-600 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
          <Dna size={18} className="text-green-600" />
          Bioinformatics Tools
        </h2>
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="bg-green-50 px-5 py-3 border-b border-green-100">
            <p className="text-green-800 text-sm font-medium">เครื่องมือสำหรับงานชีวสารสนเทศ พร้อมใช้งานบน GPU partition</p>
          </div>
          <div className="p-5">
            <div className="flex items-start gap-4">
              <div className="bg-green-100 rounded-xl p-3">
                <Dna size={24} className="text-green-700" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 flex-wrap">
                  <h3 className="font-bold text-slate-800">Oxford Nanopore Dorado</h3>
                  <code className="bg-green-100 text-green-800 px-2 py-0.5 rounded font-mono text-xs">1.3.0+6ea400189</code>
                </div>
                <p className="text-slate-600 text-sm mt-1.5">Basecaller สำหรับข้อมูล Oxford Nanopore sequencing รองรับ GPU เพื่อความเร็วในการประมวลผล</p>
                <div className="mt-3 bg-amber-50 border border-amber-200 rounded-lg px-4 py-3">
                  <p className="text-amber-800 text-xs font-semibold mb-1">สำคัญ: โมเดลต้องดาวน์โหลดเอง</p>
                  <p className="text-amber-700 text-xs">Dorado ไม่ได้รวมโมเดลมาด้วย ผู้ใช้ต้องดาวน์โหลดโมเดลที่ต้องการไปเก็บไว้ในพื้นที่ของตนเองก่อนใช้งาน ดูวิธีดาวน์โหลดได้ที่หน้าการส่งงาน</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="alert-info flex items-start gap-3">
        <Package size={16} className="text-blue-600 flex-shrink-0 mt-0.5" />
        <div>
          <p className="font-semibold text-blue-800 text-sm">ต้องการโปรแกรมเพิ่มเติม?</p>
          <p className="text-blue-700 text-sm mt-1">
            หากต้องการติดตั้งซอฟต์แวร์เพิ่มเติมหรือขอเพิ่มพื้นที่การใช้งาน
            กรุณากรอกแบบฟอร์มที่{" "}
            <a
              href="https://kku.world/sbqzt4"
              target="_blank"
              rel="noopener noreferrer"
              className="underline font-medium"
            >
              kku.world/sbqzt4
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
