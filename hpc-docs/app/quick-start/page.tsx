import { Globe, Monitor, Terminal, Upload, FolderOpen, CheckCircle, Info, AlertTriangle } from "lucide-react";
import Image from "next/image";
import { CodeBlock } from "@/components/CodeBlock";

export default function QuickStartPage() {
  return (
    <div className="space-y-8 animate-fade-in-up">
      <div className="border-b border-slate-200 pb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="bg-yellow-100 rounded-lg p-2">
            <CheckCircle size={22} className="text-[#F5A623]" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900">เริ่มต้นใช้งานด่วน</h1>
        </div>
        <p className="text-slate-500 ml-12">Quick Start Guide — 3 วิธีเข้าสู่ระบบ</p>
      </div>

      {/* 2.1 OOD */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          <Globe size={20} className="text-[#003087]" />
          2.1 เข้าสู่ระบบผ่าน Open OnDemand (OOD)
        </h2>

        <div className="space-y-3">
          {[
            { step: 1, text: "เข้าไปยังเบราว์เซอร์", detail: <a href="https://odt-hpc.kku.ac.th" className="text-blue-600 hover:underline font-mono">https://odt-hpc.kku.ac.th</a> },
            { step: 2, text: "ล็อคอินด้วย Username และ Password ของตนเอง" },
            { step: 3, text: "เมื่อเข้าสู่ OOD ให้ไปยัง", detail: <code className="bg-slate-100 text-purple-700 px-1.5 py-0.5 rounded text-sm font-mono">Files &gt; Home Directory</code> },
          ].map((item) => (
            <div key={item.step} className="flex items-start gap-4 bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-[#003087] text-white text-sm font-bold flex items-center justify-center">
                {item.step}
              </span>
              <p className="text-slate-700 pt-0.5">
                {item.text} {item.detail}
              </p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
          <p className="text-xs text-slate-400 mb-3 font-medium uppercase tracking-wide">OOD Dashboard</p>
          <Image src="/images/image-2.png" alt="Open OnDemand Dashboard" width={900} height={500} className="w-full h-auto rounded-lg" unoptimized />
        </div>

        {/* Node status info */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
          <h3 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
            <Info size={16} className="text-[#003087]" />
            สถานะ Partition และ Node
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { label: "cpu", desc: "สำหรับงาน CPU ทั่วไป", color: "blue" },
              { label: "gpu", desc: "สำหรับงาน GPU (AI/ML)", color: "purple" },
              { label: "short", desc: "สำหรับงานเล็กน้อย / ทดสอบ", color: "orange" },
            ].map((p) => (
              <div key={p.label} className="flex items-center gap-2">
                <code className={`bg-${p.color}-100 text-${p.color}-800 px-2 py-0.5 rounded font-mono text-sm font-semibold w-16 text-center`}>{p.label}</code>
                <span className="text-slate-600 text-sm">{p.desc}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2">
            {[
              { status: "idle", label: "ว่าง", color: "bg-green-100 text-green-700" },
              { status: "mix", label: "ใช้งานบางส่วน", color: "bg-yellow-100 text-yellow-700" },
              { status: "alloc", label: "ใช้งานเต็ม", color: "bg-red-100 text-red-700" },
              { status: "down", label: "ไม่พร้อมใช้งาน", color: "bg-slate-100 text-slate-600" },
            ].map((s) => (
              <div key={s.status} className={`${s.color} rounded-lg px-3 py-2 text-center`}>
                <div className="font-mono font-semibold text-sm">{s.status}</div>
                <div className="text-xs mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Job steps */}
        <div className="space-y-3">
          <h3 className="font-semibold text-slate-800 flex items-center gap-2">
            <FolderOpen size={16} className="text-[#F5A623]" />
            การสร้างและส่งงานผ่าน Job Composer
          </h3>

          {[
            { step: 4, text: "ทำการสร้างงาน เลือก", detail: <><code className="bg-slate-100 text-purple-700 px-1 py-0.5 rounded text-sm font-mono">Jobs</code> &gt; <code className="bg-slate-100 text-purple-700 px-1 py-0.5 rounded text-sm font-mono">Job Composer</code></>, img: "/images/image-3.png" },
            { step: 5, text: "เลือก", detail: <><code className="bg-slate-100 text-purple-700 px-1 py-0.5 rounded text-sm font-mono">New Job</code> &gt; <code className="bg-slate-100 text-purple-700 px-1 py-0.5 rounded text-sm font-mono">From Default Template</code></>, img: "/images/image-4.png" },
            { step: 6, text: "ดู Script location และ Script name แล้วเลือก Edit Files", img: "/images/image-5.png" },
            { step: 7, text: "เลือก Upload ไฟล์หรือโฟลเดอร์งานของตนเอง", img: "/images/image-6.png" },
            { step: 8, text: "กลับไปยัง Jobs เพื่อแก้ไข main_job.sh อยู่ด้านขวาล่าง", img: "/images/image-7.png" },
          ].map((item) => (
            <div key={item.step}>
              <div className="flex items-start gap-4 bg-white rounded-t-xl border border-slate-200 border-b-0 p-4 shadow-sm">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-[#003087] text-white text-sm font-bold flex items-center justify-center">
                  {item.step}
                </span>
                <p className="text-slate-700 pt-0.5">{item.text} {item.detail}</p>
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-b-xl overflow-hidden">
                <Image src={item.img} alt={`ขั้นตอนที่ ${item.step}`} width={900} height={400} className="w-full h-auto" unoptimized />
              </div>
            </div>
          ))}
        </div>

        {/* Script example */}
        <div>
          <h3 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
            <Terminal size={16} className="text-slate-600" />
            ทดสอบไฟล์โดยใช้ partition short (แก้ไข main_job.sh)
          </h3>
          <CodeBlock
            title="main_job.sh"
            language="bash"
            code={`#!/bin/bash

#SBATCH --job-name=python_slurm_test    # ตั้งชื่อโปรเจกต์งาน
#SBATCH --output=output_%j.txt          # ไฟล์บันทึก Log ผลลัพธ์ (%j คือเลข Job ID)
#SBATCH --error=error_%j.txt            # ไฟล์บันทึกข้อผิดพลาด (ถ้ามี)
#SBATCH --partition=short               # เลือกกลุ่มเครื่องคำนวณ
#SBATCH --nodes=1                       # ขอใช้งานจำนวน 1 Node
#SBATCH --ntasks=1                      # จำนวนกระบวนการหลัก (Task)
#SBATCH --cpus-per-task=1               # ขอ CPU Core 1 หัวต่องาน
#SBATCH --mem=2G                        # ขอใช้ RAM ขนาด 2 GB
#SBATCH --time=00:10:00                 # กำหนดเวลาวิ่งสูงสุด

# พิมพ์คำสั่งที่ต้องการรันด้านล่างนี้
python3 --version
python3 my_script.py`}
          />
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
          <p className="text-xs text-slate-400 mb-3 font-medium uppercase tracking-wide">หลังกด Submit</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Image src="/images/image-8.png" alt="ผลลัพธ์การ Submit งาน" width={450} height={300} className="w-full h-auto rounded-lg border border-slate-100" unoptimized />
            <Image src="/images/image-9.png" alt="ไฟล์ผลลัพธ์" width={450} height={300} className="w-full h-auto rounded-lg border border-slate-100" unoptimized />
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
          <p className="text-xs text-slate-400 mb-3 font-medium uppercase tracking-wide">ตรวจสอบงาน: Jobs &gt; Active Jobs</p>
          <Image src="/images/image-10.png" alt="Active Jobs" width={900} height={400} className="w-full h-auto rounded-lg" unoptimized />
        </div>
      </section>

      {/* 2.2 JupyterHub */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          <Monitor size={20} className="text-[#6B21A8]" />
          2.2 เข้าสู่ระบบผ่าน JupyterHub
        </h2>
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-3">
          <div className="flex items-start gap-3">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-600 text-white text-xs font-bold flex items-center justify-center mt-0.5">1</span>
            <p className="text-slate-700 text-sm">เปิดเบราว์เซอร์แล้วไปที่ <a href="https://odt-hpc.kku.ac.th/jupyter" className="text-blue-600 hover:underline font-mono">https://odt-hpc.kku.ac.th/jupyter</a></p>
          </div>
          <div className="flex items-start gap-3">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-600 text-white text-xs font-bold flex items-center justify-center mt-0.5">2</span>
            <p className="text-slate-700 text-sm">เข้าสู่ระบบด้วย Username และ Password ของตนเอง</p>
          </div>
          <div className="alert-info flex items-start gap-3 mt-3">
            <Info size={16} className="text-blue-600 flex-shrink-0 mt-0.5" />
            <p className="text-blue-800 text-sm">JupyterHub จะเริ่ม Jupyter Notebook บน Compute Node อัตโนมัติ<br/>
            ทรัพยากรที่ได้รับ: <strong>partition cpu, 4 CPUs, 8 GB RAM, 8 ชม.</strong></p>
          </div>
        </div>
      </section>

      {/* 2.3 SSH */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          <Terminal size={20} className="text-slate-700" />
          2.3 เข้าสู่ระบบผ่าน SSH
        </h2>
        <p className="text-slate-600 text-sm">Secure Shell (SSH) ผ่าน Terminal หรือโปรแกรมต่าง ๆ เช่น PowerShell, PuTTY, MobaXterm หรือ Jupyter Terminal</p>

        <CodeBlock
          title="CMD / PowerShell"
          language="bash"
          code={`# รูปแบบ
ssh [Username]@odt-hpc-cn.kku.ac.th

# ตัวอย่าง
ssh user1@odt-hpc-cn.kku.ac.th

# ครั้งแรกจะถาม fingerprint ให้ตอบ yes`}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="px-4 py-3 bg-slate-50 border-b border-slate-200 flex items-center gap-2">
              <Monitor size={14} className="text-slate-500" />
              <span className="text-sm font-medium text-slate-700">PuTTY</span>
            </div>
            <Image src="/images/image-11.png" alt="PuTTY SSH" width={450} height={350} className="w-full h-auto" unoptimized />
          </div>
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="px-4 py-3 bg-slate-50 border-b border-slate-200 flex items-center gap-2">
              <Monitor size={14} className="text-slate-500" />
              <span className="text-sm font-medium text-slate-700">MobaXterm</span>
            </div>
            <Image src="/images/image-12.png" alt="MobaXterm SSH" width={450} height={350} className="w-full h-auto" unoptimized />
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="px-4 py-3 bg-slate-50 border-b border-slate-200 flex items-center gap-2">
            <Monitor size={14} className="text-slate-500" />
            <span className="text-sm font-medium text-slate-700">Jupyter Terminal</span>
          </div>
          <Image src="/images/image-13.png" alt="Jupyter Terminal" width={900} height={400} className="w-full h-auto" unoptimized />
        </div>

        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="px-4 py-3 bg-slate-50 border-b border-slate-200">
            <span className="text-sm font-medium text-slate-700">SSH ผ่าน Browser (Jupyter)</span>
          </div>
          <Image src="/images/image-14.png" alt="Jupyter SSH" width={900} height={400} className="w-full h-auto" unoptimized />
        </div>

        <CodeBlock
          title="ส่งงานผ่าน SSH (partition cpu)"
          language="bash"
          code={`#!/bin/bash

#SBATCH --job-name=my-job
#SBATCH --output=/home/%u/job-%j.out
#SBATCH --error=/home/%u/job-%j.err
#SBATCH --partition=cpu
#SBATCH --nodes=1
#SBATCH --ntasks=1
#SBATCH --cpus-per-task=4
#SBATCH --mem=8G
#SBATCH --time=02:00:00

# คำสั่งของคุณด้านล่าง
echo "Job started at $(date)"
python3 my_script.py
echo "Job finished at $(date)"`}
        />

        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <Image src="/images/image-15.png" alt="ผลลัพธ์การส่งงาน SSH" width={900} height={400} className="w-full h-auto rounded-lg" unoptimized />
        </div>

        <div className="space-y-2">
          <h3 className="font-semibold text-slate-800 text-sm">คำสั่งพื้นฐาน SSH</h3>
          <CodeBlock
            language="bash"
            code={`# ส่งงาน
sbatch job_test.sh

# ตรวจสอบสถานะ
squeue -u Username

# สำหรับคำสั่งง่ายๆ ใช้ srun โดยตรง
srun --partition=short python3 my_script.py
srun --partition=gpu --gres=gpu:1 python3 train.py
srun --partition=cpu --cpus-per-task=8 --mem=16G ./my_program`}
          />
        </div>
      </section>

      {/* 2.4 File Transfer */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          <Upload size={20} className="text-[#C2612B]" />
          2.4 การโอนย้ายไฟล์
        </h2>
        <p className="text-slate-600 text-sm">ใช้ FileZilla, WinSCP, หรือคำสั่ง scp ในการโอนย้ายไฟล์</p>

        <CodeBlock
          language="bash"
          code={`# อัพโหลดไฟล์ไปยัง HPC
scp myfile.txt Username@odt-hpc-cn.kku.ac.th:/home/Username/

# ดาวน์โหลดไฟล์จาก HPC
scp Username@odt-hpc-cn.kku.ac.th:/home/Username/result.csv ./`}
        />

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-4 py-3 bg-slate-50 border-b border-slate-200">
            <span className="font-semibold text-slate-700 text-sm">การตั้งค่า FileZilla / WinSCP</span>
          </div>
          <table className="docs-table">
            <thead>
              <tr>
                <th>การตั้งค่า</th>
                <th>ค่า</th>
              </tr>
            </thead>
            <tbody>
              {[
                { key: "Protocol", val: "SFTP" },
                { key: "Host", val: "IP Address HPC" },
                { key: "Port", val: "22" },
                { key: "Username", val: "ชื่อผู้ใช้งานของคุณ" },
                { key: "Password", val: "รหัสผ่านของคุณ" },
              ].map((row) => (
                <tr key={row.key}>
                  <td className="font-medium text-slate-700">{row.key}</td>
                  <td><code className="bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded text-sm">{row.val}</code></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
