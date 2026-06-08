import { Settings, X, Eye, RefreshCw, CheckCircle, Database } from "lucide-react";
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
          <X size={18} className="text-red-500" />
          <span className="text-[#003087]">8.1</span> ยกเลิกงาน
        </h2>
        <CodeBlock language="bash" code={`# ยกเลิกงานด้วย Job ID
scancel 12345

# ยกเลิกงานทั้งหมดของตัวเอง
scancel -u $USER`} />
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          <RefreshCw size={18} className="text-[#F5A623]" />
          <span className="text-[#003087]">8.2</span> ดูผลลัพธ์งาน (ขณะกำลังรัน)
        </h2>
        <CodeBlock language="bash" code={`# ดูรายละเอียด Job ที่กำลังรัน
tail -f /home/$USER/job-12345.out`} />
      </section>
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          <CheckCircle size={18} className="text-[#F5A623]" />
          <span className="text-[#003087]">8.3</span> ดูรายละเอียดงานที่เสร็จแล้ว
        </h2>
        <CodeBlock language="bash" code={`sacct -j 12345 --format=JobID,JobName,State,Elapsed,MaxRSS,ExitCode

# สถานะงาน:
# COMPLETED  = เสร็จสมบูรณ์
# FAILED     = เกิดข้อผิดพลาด (ตรวจสอบไฟล์ .err)
# TIMEOUT    = ถึงเวลาสูงสุด (เพิ่ม --time)
# CANCELLED  = คุณหรือ Admin ยกเลิก
# OUT_OF_ME+ = ใช้ RAM เกินที่ขอ (เพิ่ม --mem)
`} />
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          <Database size={18} className="text-[#F5A623]" />
          <span className="text-[#003087]">8.4</span> ตรวจสอบการใช้งานดิสก์
        </h2>
        <CodeBlock language="bash" code={`du -sh /home/$USER              # การใช้งานรวม
du -sh /home/$USER/*            # การใช้งานต่อโฟลเดอร์
`} />
      </section>
    </div>
  );
}
