import { Settings, X, Eye, RefreshCw } from "lucide-react";
import { CodeBlock } from "@/components/CodeBlock";

export default function JobManagementPage() {
  return (
    <div className="space-y-8 animate-fade-in-up">
      <div className="border-b border-slate-200 pb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="bg-slate-100 rounded-lg p-2"><Settings size={22} className="text-slate-700" /></div>
          <h1 className="text-2xl font-bold text-slate-900">การจัดการงาน</h1>
        </div>
        <p className="text-slate-500 ml-12">ติดตาม ตรวจสอบ และจัดการงานที่ส่งไปแล้ว</p>
      </div>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          <Eye size={18} className="text-[#003087]" />
          <span className="text-[#003087]">8.1</span> ตรวจสอบสถานะงาน
        </h2>
        <CodeBlock language="bash" code={`# ดูงานของตัวเอง
squeue -u $USER

# ดูงานทั้งหมดในคิว
squeue

# ดูงานแบบละเอียด
squeue -u $USER -o "%.18i %.9P %.30j %.8u %.8T %.10M %.9l %.6D %R"

# ดูประวัติงานที่เสร็จแล้ว
sacct -u $USER --format=JobID,JobName,Partition,State,Elapsed,MaxRSS,ExitCode`} />

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <table className="docs-table">
            <thead>
              <tr>
                <th>รหัสสถานะ</th>
                <th>ความหมาย</th>
                <th>สิ่งที่ควรทำ</th>
              </tr>
            </thead>
            <tbody>
              {[
                { code: "PD", meaning: "Pending — รองคิว", action: "รอหรือตรวจสอบ sinfo" },
                { code: "R", meaning: "Running — กำลังรัน", action: "ปกติ รอผลลัพธ์" },
                { code: "CG", meaning: "Completing — กำลังจบ", action: "รอสักครู่" },
                { code: "CD", meaning: "Completed — เสร็จสิ้น", action: "ดูผลลัพธ์ใน output file" },
                { code: "F", meaning: "Failed — ล้มเหลว", action: "ดู error file แล้วแก้ไข" },
                { code: "TO", meaning: "Timeout — หมดเวลา", action: "เพิ่ม --time หรือแบ่งงานย่อย" },
              ].map((row) => (
                <tr key={row.code}>
                  <td><code className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded font-mono font-bold">{row.code}</code></td>
                  <td className="text-slate-700">{row.meaning}</td>
                  <td className="text-slate-600 text-sm">{row.action}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          <X size={18} className="text-red-500" />
          <span className="text-[#003087]">8.2</span> ยกเลิกงาน
        </h2>
        <CodeBlock language="bash" code={`# ยกเลิกงานด้วย Job ID
scancel 12345

# ยกเลิกงานทั้งหมดของตัวเอง
scancel -u $USER

# ยกเลิกงาน Array ทั้งหมด
scancel 12345_*

# ยกเลิกเฉพาะงานที่รอคิว
scancel -u $USER -t PD`} />
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          <RefreshCw size={18} className="text-[#F5A623]" />
          <span className="text-[#003087]">8.3</span> ดูทรัพยากรที่ใช้
        </h2>
        <CodeBlock language="bash" code={`# ดูรายละเอียด Job ที่กำลังรัน
sstat -j 12345 --format=JobID,AveCPU,AveRSS,MaxRSS

# ดูการใช้งาน CPU/RAM ตอน Job เสร็จ
sacct -j 12345 --format=JobID,MaxRSS,MaxVMSize,Elapsed,CPUTime

# ตรวจสอบโควตา Home Directory
du -sh /home/$USER
quota -s`} />
      </section>
    </div>
  );
}
