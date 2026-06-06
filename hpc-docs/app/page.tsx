import {
  Server,
  Cpu,
  MemoryStick,
  HardDrive,
  Clock,
  Users,
  AlertTriangle,
  CheckCircle,
  ExternalLink,
  FileText,
  ArrowRight,
  Zap,
  BookOpen,
  Terminal,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function HomePage() {
  return (
    <div className="space-y-8 animate-fade-in-up">
      {/* Hero Section */}
      <div className="kku-gradient rounded-2xl p-8 text-white shadow-xl">
        <div className="flex items-start gap-4">
          <div className="bg-white/10 rounded-xl p-3 flex-shrink-0">
            <Server size={32} className="text-white" />
          </div>
          <div>
            <div className="text-orange-200 text-xs font-semibold mb-1 uppercase tracking-widest">
              คู่มือการบริการและระบบคำนวณประสิทธิภาพสูง
            </div>
            <h1 className="text-3xl font-extrabold mb-1 tracking-tight">KKU ODT-HPC Docs</h1>
            <p className="text-orange-100 text-base leading-relaxed max-w-2xl">
              ระบบคอมพิวเตอร์เพื่อการวิเคราะห์และคำนวณขั้นสูง (High-Performance Computing Cluster) — มหาวิทยาลัยขอนแก่น
            </p>
            <div className="flex items-center gap-2 mt-4">
              <span className="bg-white/10 text-white text-xs px-3 py-1 rounded-full border border-white/20 font-medium">
                Version 1.0 Production
              </span>
              <span className="bg-white/10 text-white text-xs px-3 py-1 rounded-full border border-white/20 font-medium">
                ปรับปรุง พฤษภาคม 2568
              </span>
            </div>
          </div>
        </div>

        {/* Core Request Form Buttons (Same Brick Orange Styling) */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <a
            href="https://kku.world/4rql5x"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3.5 bg-orange-700 hover:bg-orange-800 text-white font-bold rounded-xl px-5 py-4 transition-all duration-150 border border-orange-600/40 shadow-md hover:shadow-lg group"
          >
            <FileText size={20} className="text-orange-200 flex-shrink-0" />
            <div className="flex-1">
              <div className="text-sm font-bold">ขอใช้บริการ HPC Server</div>
              <div className="text-xs font-normal text-orange-200 font-mono mt-0.5">
                kku.world/4rql5x
              </div>
            </div>
            <ExternalLink
              size={15}
              className="flex-shrink-0 opacity-70 group-hover:opacity-100 transition-opacity"
            />
          </a>
          <a
            href="https://kku.world/sbqzt4"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3.5 bg-orange-700 hover:bg-orange-800 text-white font-bold rounded-xl px-5 py-4 transition-all duration-150 border border-orange-600/40 shadow-md hover:shadow-lg group"
          >
            <HardDrive size={20} className="text-orange-200 flex-shrink-0" />
            <div className="flex-1">
              <div className="text-sm font-bold">
                ขอโปรแกรมเพิ่มเติม / เพิ่มพื้นที่โควตา
              </div>
              <div className="text-xs font-normal text-orange-200 font-mono mt-0.5">
                kku.world/sbqzt4
              </div>
            </div>
            <ExternalLink
              size={15}
              className="flex-shrink-0 opacity-70 group-hover:opacity-100 transition-opacity"
            />
          </a>
        </div>
      </div>

      {/* Introduction */}
      <section id="intro" className="scroll-mt-20">
        <h2 className="text-xl font-bold text-slate-800 mb-3 flex items-center gap-2">
          <span className="text-[#C2612B]">#</span> 1. บทนำและภาพรวมระบบ
        </h2>
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
          <p className="text-slate-700 leading-relaxed text-sm sm:text-base">
            ยินดีต้อนรับสู่ระบบ{" "}
            <span className="font-bold text-[#C2612B]">
              ODT-HPC KKU (High-Performance Computing Cluster)
            </span>{" "}
            ระบบคำนวณขั้นสูงนี้จัดทำขึ้นโดยทีมงานสำนักเทคโนโลยีสารสนเทศเพื่อรองรับงานวิจัยที่ต้องใช้การจัดสรรทรัพยากร CPU, RAM, และประมวลผล GPU สปีดสูง แทนที่จะใช้คอมพิวเตอร์ส่วนตัวส่งรันงานนานหลายวัน คุณสามารถส่ง{" "}
            <code className="bg-stone-100 text-orange-800 px-1.5 py-0.5 rounded font-mono text-xs">
              job script
            </code>{" "}
            ของคุณเข้าคิวใน Cluster ระบบจะจัดคิวรันให้อัตโนมัติอย่างมีประสิทธิภาพสูงสุด
          </p>
        </div>
      </section>

      {/* Access Portals Highlights */}
      <section className="space-y-4">
        <h3 className="text-base font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
          <Zap size={16} className="text-[#C2612B]" />
          การเข้าใช้งานเครื่องคอมพิวเตอร์แม่ข่าย (Access Portals)
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <a
            href="https://odt-hpc.kku.ac.th"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-orange-50/50 hover:bg-orange-50 border border-orange-200/80 rounded-2xl p-5 transition-all duration-150 group shadow-sm text-left block"
          >
            <ExternalLink size={24} className="text-[#C2612B] mb-2" />
            <h4 className="font-bold text-slate-800 text-sm leading-none">Open OnDemand (OOD)</h4>
            <p className="text-slate-500 text-xs mt-1.5 mb-3 leading-relaxed">เข้าใช้งานหน้าเว็บหลักแบบ GUI อัปโหลดและจัดการไฟล์ผ่านระบบ Web Browser</p>
            <div className="text-[10.5px] font-mono text-[#C2612B] font-bold decoration-dotted underline group-hover:no-underline truncate">
              https://odt-hpc.kku.ac.th
            </div>
          </a>

          <a
            href="https://odt-hpc.kku.ac.th/jupyter"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-orange-50/50 hover:bg-orange-50 border border-orange-200/80 rounded-2xl p-5 transition-all duration-150 group shadow-sm text-left block"
          >
            <BookOpen size={24} className="text-[#C2612B] mb-2" />
            <h4 className="font-bold text-slate-800 text-sm leading-none">OOD JupyterHub</h4>
            <p className="text-slate-500 text-xs mt-1.5 mb-3 leading-relaxed">สร้าง Notebook สนทนาตอบโต้สำหรับ Python โปรเจกต์วิจัยดาต้าและ AI ได้ทันที</p>
            <div className="text-[10.5px] font-mono text-[#C2612B] font-bold decoration-dotted underline group-hover:no-underline truncate">
              odt-hpc.kku.ac.th/jupyter
            </div>
          </a>

          <div
            className="bg-orange-50/50 border border-orange-200/80 rounded-2xl p-5 shadow-sm text-left relative"
          >
            <Terminal size={24} className="text-[#C2612B] mb-2" />
            <h4 className="font-bold text-slate-800 text-sm leading-none">SSH Login Server</h4>
            <p className="text-slate-500 text-xs mt-1.5 mb-3 leading-relaxed">รันคำสั่งสั่งงานสคริปต์ความปลอดภัยสูงผ่าน Terminal Command Line ทั่วไป</p>
            <div className="bg-white/80 border border-orange-100 rounded-lg px-2.5 py-1 text-center">
              <code className="text-[10.5px] font-mono text-[#C2612B] font-bold select-all block">
                ssh username@odt-hpc-cn.kku.ac.th
              </code>
            </div>
          </div>
        </div>
      </section>

      {/* 1.1 System Overview */}
      <section id="overview" className="scroll-mt-20">
        <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
          <span className="text-[#C2612B]">#</span> 1.1 ภาพรวมของระบบ (Overview Spec)
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm hover:border-[#C2612B]/40 transition-all">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-orange-50 rounded-lg p-2">
                <Cpu size={20} className="text-[#C2612B]" />
              </div>
              <h3 className="font-bold text-slate-800 text-sm">Compute Nodes</h3>
            </div>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              เซิร์ฟเวอร์ <span className="font-bold text-[#C2612B]">2 โน้ดหลัก</span>:
            </p>
            <ul className="mt-2 space-y-1 text-xs text-slate-600">
              <li className="flex items-center gap-2 font-medium">• CPU 64 คอร์ต่อตัว</li>
              <li className="flex items-center gap-2 font-medium">• RAM 503 GB ต่อตัว</li>
              <li className="flex items-center gap-2 font-medium">• GPU NVIDIA A40 (45GB)</li>
            </ul>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm hover:border-[#C2612B]/40 transition-all">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-orange-50 rounded-lg p-2">
                <HardDrive size={20} className="text-[#C2612B]" />
              </div>
              <h3 className="font-bold text-slate-800 text-sm">Local Scratch SSD</h3>
            </div>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-1">
              พื้นที่รันงานชั่วคราวจัดระดับสูงความเร็วเขียนอ่านสูงสุด:
            </p>
            <div className="text-slate-800 font-bold text-xs sm:text-sm">
              ~6 TB SSD / Node ที่ <code className="bg-stone-150 text-[#C2612B] font-mono text-xs px-1 rounded">/scratch</code>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm hover:border-[#C2612B]/40 transition-all">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-orange-50 rounded-lg p-2">
                <Server size={20} className="text-[#C2612B]" />
              </div>
              <h3 className="font-bold text-slate-800 text-sm">Job Scheduler</h3>
            </div>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-1">
              ระบบจัดสรรเวลาทำงานคิวอัจฉริยะ:
            </p>
            <div className="text-[#C2612B] font-bold text-xs sm:text-sm">
              Slurm Workload Manager
            </div>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm hover:border-[#C2612B]/40 transition-all">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-orange-50 rounded-lg p-2">
                <Users size={20} className="text-[#C2612B]" />
              </div>
              <h3 className="font-bold text-slate-800 text-sm">โควตาจัดเก็บ (Quota)</h3>
            </div>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-1">
              พื้นที่เก็บผลลัพธ์ข้อมูลหลักที่ปลอดภัย:
            </p>
            <div className="text-slate-800 font-bold text-xs sm:text-sm">
              300 GB ต่อบัญชีผู้ใช้ที่ <code className="bg-stone-150 text-[#C2612B] font-mono text-xs px-1 rounded">/home</code>
            </div>
          </div>
        </div>

        {/* System Image Plan */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <p className="text-xs text-slate-400 mb-3 font-semibold uppercase tracking-wider">
            แผนผังการไหลของข้อมูลและการจัดเก็บระบบ HPC
          </p>
          <div className="rounded-xl overflow-hidden bg-stone-50 border border-slate-100 p-2">
            <Image
              src="/images/image-1.png"
              alt="HPC Cluster Architecture Flowchart"
              width={1000}
              height={500}
              className="w-full h-auto object-contain max-h-96"
              unoptimized
            />
          </div>
        </div>
      </section>

      {/* 1.2 Partitions */}
      <section id="partitions" className="scroll-mt-20">
        <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
          <span className="text-[#C2612B]">#</span> 1.2 พาร์ติชันการจัดคิว (Slurm Partitions)
        </h2>
        <p className="text-slate-600 text-sm sm:text-base mb-4 leading-relaxed">
          เวลาผู้ใช้ส่ง Job Script จะต้องระบุพาร์ติชัน (คิวงาน) ให้เหมาะสม ซึ่งได้รับการจัดสรรตามนี้:
        </p>
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="docs-table">
              <thead>
                <tr>
                  <th className="font-bold">พาร์ติชัน (Partition)</th>
                  <th className="font-bold">เวลาประมวลผลสูงสุด</th>
                  <th className="font-bold">คิวเริ่มต้น (Default)</th>
                  <th className="font-bold">ประเภทงานที่รองรับ</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <code className="bg-orange-50 text-orange-950 px-2 py-0.5 rounded font-mono text-xs sm:text-sm font-bold border border-orange-200">
                      cpu
                    </code>
                  </td>
                  <td className="text-slate-700 font-medium">7 วัน (7 days)</td>
                  <td>
                    <span className="inline-flex items-center gap-1.5 text-emerald-600 font-bold text-xs sm:text-sm">
                      <CheckCircle size={14} /> ใช่ (Yes)
                    </span>
                  </td>
                  <td className="text-slate-600 text-xs sm:text-sm">งานคำนวณด้านสถิติ และ CPU ทั่วไปทั่วไป</td>
                </tr>
                <tr>
                  <td>
                    <code className="bg-orange-50 text-orange-950 px-2 py-0.5 rounded font-mono text-xs sm:text-sm font-bold border border-orange-200">
                      gpu
                    </code>
                  </td>
                  <td className="text-slate-700 font-medium">3 วัน (3 days)</td>
                  <td>
                    <span className="text-slate-400 text-xs sm:text-sm">ไม่ใช่</span>
                  </td>
                  <td className="text-slate-600 text-xs sm:text-sm">งาน Deep Learning, Training ML, AI ใช้ GPU A40</td>
                </tr>
                <tr>
                  <td>
                    <code className="bg-orange-50 text-orange-950 px-2 py-0.5 rounded font-mono text-xs sm:text-sm font-bold border border-orange-200">
                      short
                    </code>
                  </td>
                  <td className="text-slate-700 font-medium">1 ชั่วโมง (1 hour)</td>
                  <td>
                    <span className="text-slate-400 text-xs sm:text-sm">ไม่ใช่</span>
                  </td>
                  <td className="text-slate-600 text-xs sm:text-sm">ใช้สำหรับทดสอบเขียนคำสั่ง (Debug / Test sbatch)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 1.3 Rules */}
      <section id="rules" className="scroll-mt-20">
        <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
          <span className="text-[#C2612B]">#</span> 1.3 กฎสำคัญและแนวทางด้านความปลอดภัย
        </h2>
        <div className="space-y-4">
          <div className="alert-warning flex items-start gap-3.5">
            <AlertTriangle
              size={20}
              className="text-orange-600 flex-shrink-0 mt-0.5 animate-bounce"
            />
            <div>
              <p className="font-extrabold text-orange-950 text-sm sm:text-base">
                กฎเหล็ก: ห้ามรันโปรแกรมประมวลผลหนักบน Login Node โดยเด็ดขาด!
              </p>
              <p className="text-orange-900 text-xs sm:text-sm mt-1 leading-relaxed">
                การรันโดยข้าม sbatch หรือ srun บน Login Node จะส่งผลให้ระบบช้าลงสำหรับเพื่อนผู้ใช้อื่น หากตรวจพบจะพิจารณาสั่ง Terminate เคลียร์โปรเซสโดยไม่ต้องแจ้งล่วงหน้า
              </p>
            </div>
          </div>

          {[
            {
              icon: <HardDrive size={18} className="text-[#C2612B] flex-shrink-0 mt-0.5" />,
              text: "โปรดบันทึกเขียนผลลัพธ์สำคัญ (Results) ไว้ในโฟลเดอร์ /home/username เสมอ เพราะระบบ Local Scratch (/scratch) จะทำการล้างลบทิ้งโดยอัตโนมัติทันทีที่ Job รันเสร็จสิ้น",
            },
            {
              icon: <Clock size={18} className="text-[#C2612B] flex-shrink-0 mt-0.5" />,
              text: "ตรวจสอบปริมาณการใช้งานพื้นที่จัดเก็บ (Home Directory Quota 300 GB) เป็นระยะๆ ด้วยคำสั่งเช็ค: du -sh ~",
            },
            {
              icon: <AlertTriangle size={18} className="text-[#C2612B] flex-shrink-0 mt-0.5" />,
              text: "วางแผนจัดการ checkpoint เมื่องานมีการรันเวลายาวเพื่อความต่อเนื่องหากงานถูกสับเปลี่ยนคิวงานโดย Slurm Workload Manager",
            },
          ].map((item, i) => (
            <div key={i} className="bg-stone-50 border-l-4 border-stone-400 p-4 rounded-r-xl flex items-start gap-3 shadow-xs">
              {item.icon}
              <p className="text-slate-700 text-xs sm:text-sm leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Guide quick navigational footer card */}
      <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl border border-orange-200/50 p-6">
        <h3 className="font-extrabold text-slate-800 mb-4 flex items-center gap-2">
          <Zap size={18} className="text-[#C2612B]" />
          การเชื่อมต่อและส่งไฟล์ข้อมูลเริ่มในบทถัดไป
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link
            href="/quick-start"
            className="flex items-center gap-4 bg-white hover:bg-orange-50 border border-slate-200 hover:border-orange-300 rounded-xl p-4 transition-all duration-150 group shadow-xs"
          >
            <Zap size={18} className="text-[#C2612B] flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="text-xs sm:text-sm font-bold text-slate-800">
                เริ่มต้นใช้งานด่วน (Quick Start)
              </div>
              <div className="text-xs text-slate-500 truncate mt-0.5">การผ่าน VPN, OOD, Jupyter และ SSH Terminal</div>
            </div>
            <ArrowRight
              size={15}
              className="text-slate-400 group-hover:text-[#C2612B] group-hover:translate-x-1.5 transition-transform"
            />
          </Link>
          <Link
            href="/software"
            className="flex items-center gap-4 bg-white hover:bg-orange-50 border border-slate-200 hover:border-orange-300 rounded-xl p-4 transition-all duration-150 group shadow-xs"
          >
            <Server size={18} className="text-[#C2612B] flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="text-xs sm:text-sm font-bold text-slate-800">
                Software & EnvironModules
              </div>
              <div className="text-xs text-slate-500 truncate mt-0.5">
                การตั้งค่า Environment modules โหลดแอป Python, PyTorch
              </div>
            </div>
            <ArrowRight
              size={15}
              className="text-slate-400 group-hover:text-[#C2612B] group-hover:translate-x-1.5 transition-transform"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
