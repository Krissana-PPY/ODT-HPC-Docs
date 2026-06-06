import { Package, CheckCircle } from "lucide-react";

export default function SoftwarePage() {
  const software = [
    { name: "NVIDIA Driver", version: "595.71.05" },
    { name: "CUDA", version: "13.2" },
    { name: "JupyterHub", version: "5.4.6" },
    { name: "JupyterLab", version: "4.x" },
    { name: "Python", version: "3.9.25" },
    { name: "Node.js", version: "16.20.2" },
    { name: "Open OnDemand", version: "3.1" },
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
                  <td className="font-medium text-slate-800">{sw.name}</td>
                  <td>
                    <code className="bg-purple-100 text-purple-800 px-2 py-0.5 rounded font-mono text-sm">
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
