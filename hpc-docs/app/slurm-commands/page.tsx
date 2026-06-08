import { Terminal, Activity } from "lucide-react";
import { CodeBlock } from "@/components/CodeBlock";

export default function SlurmCommandsPage() {
  const commands = [
    { cmd: "sinfo", desc: "แสดงสถานะ Cluster", example: "sinfo" },
    { cmd: "squeue", desc: "แสดงคิวงาน", example: "squeue -u $USER" },
    { cmd: "sbatch", desc: "ส่งงาน Batch", example: "sbatch my_job.sh" },
    { cmd: "srun", desc: "รันคำสั่งแบบ Interactive", example: "srun --partition=short hostname" },
    { cmd: "scancel", desc: "ยกเลิกงาน", example: "scancel 123" },
    { cmd: "sacct", desc: "แสดงประวัติงาน", example: "sacct -u $USER" },
  ];

  return (
    <div className="space-y-8 animate-fade-in-up">
      <div className="border-b border-slate-200 pb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="bg-slate-100 rounded-lg p-2">
            <Terminal size={22} className="text-slate-700" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900">คำสั่ง Slurm พื้นฐาน</h1>
        </div>
        <p className="text-slate-500 ml-12">คำสั่งที่จำเป็นสำหรับการจัดการงานบน HPC Cluster</p>
      </div>

      <section>
        <h2 id="general" className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
          <span className="text-[#003087]">4.1</span> คำสั่งที่จำเป็น
        </h2>
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <table className="docs-table">
            <thead>
              <tr>
                <th>คำสั่ง</th>
                <th>คำอธิบาย</th>
                <th>ตัวอย่าง</th>
              </tr>
            </thead>
            <tbody>
              {commands.map((c) => (
                <tr key={c.cmd}>
                  <td><code className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded font-mono text-sm font-bold">{c.cmd}</code></td>
                  <td className="text-slate-700">{c.desc}</td>
                  <td><code className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-mono text-xs">{c.example}</code></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section id="job-state" className="space-y-4">
        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          <span className="text-[#003087]">4.2</span> ตรวจสอบสถานะ Cluster
        </h2>
        <CodeBlock language="bash" code={`sinfo`} />
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
          <h3 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
            <Activity size={16} className="text-[#003087]" /> สถานะ Node
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { status: "idle", label: "ว่าง", color: "bg-green-100 text-green-800 border-green-200" },
              { status: "mix", label: "ใช้งานบางส่วน", color: "bg-yellow-100 text-yellow-800 border-yellow-200" },
              { status: "alloc", label: "ใช้งานเต็ม", color: "bg-red-100 text-red-800 border-red-200" },
              { status: "down", label: "ไม่พร้อม", color: "bg-slate-100 text-slate-600 border-slate-200" },
            ].map((s) => (
              <div key={s.status} className={`${s.color} border rounded-lg p-3 text-center`}>
                <div className="font-mono font-bold text-sm">{s.status}</div>
                <div className="text-xs mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="job-status" className="space-y-4">
        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          <span className="text-[#003087]">4.3</span> ตรวจสอบงานของคุณ
        </h2>
        <CodeBlock language="bash" code={`# งานที่กำลังรันและรอคิว
squeue -u $USER

# งานที่เสร็จสิ้นแล้ว
sacct --format=JobID,JobName,State,Elapsed,MaxRSS`} />
      </section>
    </div>
  );
}
