import { HelpCircle, AlertTriangle, CheckCircle, Phone } from "lucide-react";
import { CodeBlock } from "@/components/CodeBlock";

export default function TroubleshootingPage() {
  const faqs = [
    {
      q: "งานค้างสถานะ PD (Pending) นานเกินไป",
      a: "ระบบอาจมีงานรอคิวมาก ตรวจสอบด้วย sinfo เพื่อดูสถานะ Node ลองเปลี่ยนไปใช้ partition อื่น หรือลดทรัพยากรที่ขอ",
      cmd: "sinfo\nsqueue --all | head -20",
    },
    {
      q: "งาน Failed ทันที (exit code != 0)",
      a: "ดูไฟล์ error (.err) เพื่อหาสาเหตุ โดยทั่วไปเกิดจาก command ผิด, ไฟล์หาไม่พบ, หรือ Python error",
      cmd: "cat /home/$USER/job-123.err\nsacct -j 123 --format=ExitCode,DerivedExitCode",
    },
    {
      q: "งาน Timeout (TO) ก่อนเสร็จ",
      a: "เพิ่มค่า --time ในสคริปต์ หรือแบ่งงานเป็นชิ้นเล็กๆ แล้วบันทึก checkpoint เป็นระยะ",
      cmd: "# แก้ไข: เพิ่ม --time=24:00:00 หรือแบ่งงาน",
    },
    {
      q: "ไม่มีพื้นที่ใน /home (Disk quota exceeded)",
      a: "ตรวจสอบการใช้งานพื้นที่ ลบไฟล์ที่ไม่จำเป็น หรือย้ายข้อมูลขนาดใหญ่ออก โควตาต่อผู้ใช้คือ 300 GB",
      cmd: "du -sh /home/$USER/\ndu -sh /home/$USER/* | sort -rh | head -20",
    },
    {
      q: "SSH connection refused / timeout",
      a: "ตรวจสอบ VPN/เครือข่ายมหาวิทยาลัย ตรวจสอบชื่อ hostname และ port 22 ที่ถูกต้อง",
      cmd: "ssh -v user@odt-hpc-cn.kku.ac.th",
    },
    {
      q: "Cannot find module / ImportError ใน Python",
      a: "โมดูลที่ต้องการอาจไม่ได้ติดตั้ง ใช้ pip install หรือขอติดตั้งผ่านแบบฟอร์ม",
      cmd: "pip install --user your-package\n# หรือใช้ virtual environment",
    },
  ];

  return (
    <div className="space-y-8 animate-fade-in-up">
      <div className="border-b border-slate-200 pb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="bg-red-100 rounded-lg p-2"><HelpCircle size={22} className="text-red-600" /></div>
          <h1 className="text-2xl font-bold text-slate-900">การแก้ปัญหา (Troubleshooting)</h1>
        </div>
        <p className="text-slate-500 ml-12">ปัญหาที่พบบ่อยและวิธีแก้ไข</p>
      </div>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          <AlertTriangle size={18} className="text-orange-500" />
          <span className="text-[#003087]">9.1</span> ปัญหาที่พบบ่อย (FAQ)
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="bg-amber-50 border-b border-amber-100 px-5 py-3 flex items-start gap-3">
                <AlertTriangle size={16} className="text-amber-600 flex-shrink-0 mt-0.5" />
                <p className="font-semibold text-amber-900 text-sm">{faq.q}</p>
              </div>
              <div className="px-5 py-4 space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle size={16} className="text-green-500 flex-shrink-0 mt-0.5" />
                  <p className="text-slate-700 text-sm">{faq.a}</p>
                </div>
                {faq.cmd && (
                  <CodeBlock language="bash" code={faq.cmd} />
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          <Phone size={18} className="text-[#003087]" />
          <span className="text-[#003087]">9.2</span> ติดต่อขอความช่วยเหลือ
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <a
            href="https://kku.world/4rql5x"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 bg-[#003087] hover:bg-blue-900 text-white rounded-xl px-5 py-4 transition-all shadow-md hover:shadow-lg group"
          >
            <CheckCircle size={20} className="text-[#F5A623]" />
            <div>
              <div className="font-bold text-sm">ขอใช้บริการ HPC Server</div>
              <div className="text-blue-200 text-xs">kku.world/4rql5x</div>
            </div>
          </a>
          <a
            href="https://kku.world/sbqzt4"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 bg-[#C2612B] hover:bg-orange-700 text-white rounded-xl px-5 py-4 transition-all shadow-md hover:shadow-lg group"
          >
            <HelpCircle size={20} className="text-white/80" />
            <div>
              <div className="font-bold text-sm">ขอโปรแกรมเพิ่มเติม / เพิ่มพื้นที่</div>
              <div className="text-orange-200 text-xs">kku.world/sbqzt4</div>
            </div>
          </a>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
          <h3 className="font-semibold text-slate-800 mb-3">ข้อมูลติดต่อ</h3>
          <div className="space-y-2 text-sm text-slate-600">
            <p>📧 ศูนย์คอมพิวเตอร์ มหาวิทยาลัยขอนแก่น</p>
            <p>🌐 <a href="https://odt-hpc.kku.ac.th" className="text-blue-600 hover:underline">odt-hpc.kku.ac.th</a></p>
          </div>
        </div>
      </section>
    </div>
  );
}
