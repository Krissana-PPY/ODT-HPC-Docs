import { Globe, Monitor, Terminal, Upload, FolderOpen, CheckCircle, Info } from "lucide-react";
import Image from "next/image";
import { CodeBlock } from "@/components/CodeBlock";
import { ZoomableImage } from "@/components/ZoomableImage";

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
      <section id="ood" className="space-y-4">
        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          <Globe size={20} className="text-[#003087]" />
          2.1 เข้าสู่ระบบผ่าน Open OnDemand (OOD)
        </h2>

        <div className="space-y-3">
          <div className="flex items-start gap-4 bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
            <span className="flex-shrink-0 w-7 h-7 rounded-full bg-[#003087] text-white text-sm font-bold flex items-center justify-center">1</span>
            <p className="text-slate-700 pt-0.5">เข้าไปยังเบราว์เซอร์ <a href="https://odt-hpc.kku.ac.th" className="text-blue-600 hover:underline font-mono">https://odt-hpc.kku.ac.th</a></p>
          </div>
          <div className="flex items-start gap-4 bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
            <span className="flex-shrink-0 w-7 h-7 rounded-full bg-[#003087] text-white text-sm font-bold flex items-center justify-center">2</span>
            <p className="text-slate-700 pt-0.5">ล็อคอินด้วย Username และ Password ของตนเอง</p>
          </div>
          <div className="flex items-start gap-4 bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
            <span className="flex-shrink-0 w-7 h-7 rounded-full bg-[#003087] text-white text-sm font-bold flex items-center justify-center">3</span>
            <p className="text-slate-700 pt-0.5">
              {"เมื่อเข้าสู่ OOD ให้ไปยัง "}
              <code className="bg-slate-100 text-purple-700 px-1.5 py-0.5 rounded text-sm font-mono">{"Files > Home Directory"}</code>
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
          <p className="text-xs text-slate-400 mb-3 font-medium uppercase tracking-wide">OOD Dashboard</p>
          <ZoomableImage src="/images/image-2.png" alt="Open OnDemand Dashboard" width={900} height={500} className="w-full h-auto rounded-lg" />
        </div>

        {/* Job steps */}
        <div className="space-y-3">
          <h3 className="font-semibold text-slate-800 flex items-center gap-2">
            <FolderOpen size={16} className="text-[#F5A623]" />
            การสร้างและส่งงานผ่าน Job Composer
          </h3>

          {[
            { step: 4, text: "ทำการสร้างงาน เลือก", detail: <><code className="bg-slate-100 text-purple-700 px-1 py-0.5 rounded text-sm font-mono">Jobs</code>{" > "}<code className="bg-slate-100 text-purple-700 px-1 py-0.5 rounded text-sm font-mono">Job Composer</code></>, img: "/images/image-3.png" },
            { step: 5, text: "เลือก", detail: <><code className="bg-slate-100 text-purple-700 px-1 py-0.5 rounded text-sm font-mono">New Job</code>{" > "}<code className="bg-slate-100 text-purple-700 px-1 py-0.5 rounded text-sm font-mono">From Default Template</code></>, img: "/images/image-4.png" },
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
              <div className="bg-slate-50 border border-slate-200 rounded-b-xl overflow-hidden p-2">
                <ZoomableImage src={item.img} alt={`ขั้นตอนที่ ${item.step}`} width={900} height={400} className="w-full h-auto" />
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

        {/* Step 9 */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm space-y-4">
          <div className="flex items-start gap-4">
            <span className="flex-shrink-0 w-7 h-7 rounded-full bg-[#003087] text-white text-sm font-bold flex items-center justify-center">
              9
            </span>
            <div>
              <p className="text-slate-700 font-bold pt-0.5">เลือก Save และ Submit งานทดสอบสคริปต์ของคุณ</p>
              <p className="text-xs text-slate-500 mt-1">คลิกปุ่ม Saveด้านบนเพื่อบันทึกการแก้ไขสคริปต์ และ คลิกปุ่ม Submit เพื่อนำเข้าคิวงานประมวลผล</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
              <ZoomableImage src="/images/image-8.png" alt="ผลลัพธ์การ Submit งาน" width={900} height={450} className="w-full h-auto rounded-lg" />
            </div>

            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
              <ZoomableImage src="/images/image-9.png" alt="ไฟล์ผลลัพธ์" width={900} height={450} className="w-full h-auto rounded-lg" />
            </div>
          </div>
        </div>

        {/* Step 10 */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm space-y-4">
          <div className="flex items-start gap-4">
            <span className="flex-shrink-0 w-7 h-7 rounded-full bg-[#003087] text-white text-sm font-bold flex items-center justify-center">
              10
            </span>
            <div>
              <p className="text-slate-700 font-bold pt-0.5">ตรวจสอบไฟล์และผลลัพธ์ทั้งหมด จาก Directory ของงาน</p>
              <p className="text-xs text-slate-500 mt-1">ไฟล์ผลลัพธ์จากสคริปต์ประมวลผลจะถูกส่งและเขียนบันทึกลงใน Folder Jobs ของคุณโดยตรง</p>
            </div>
          </div>
          <ZoomableImage src="/images/image-10.png" alt="Folder Jobs" width={900} height={400} className="w-full h-auto rounded-lg" />
        </div>

        {/* Step 11 */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm space-y-4">
          <div className="flex items-start gap-4">
            <span className="flex-shrink-0 w-7 h-7 rounded-full bg-[#003087] text-white text-sm font-bold flex items-center justify-center">
              11
            </span>
            <div>
              <p className="text-slate-700 font-bold pt-0.5">{"ตรวจสอบความเคลื่อนไหวผ่านเมนู: Jobs > Active Jobs"}</p>
              <p className="text-xs text-slate-500 mt-1">จะเห็นตารางรายละเอียดของงานที่ส่งคิว รวมถึงสถานะการประมวลผลจริงแบบ Real-time</p>
            </div>
          </div>
          <div className="space-y-4">
            <ZoomableImage src="/images/image-11.png" alt="Active Jobs 1" width={900} height={400} className="w-full h-auto rounded-lg" />
            <ZoomableImage src="/images/image-12.png" alt="Active Jobs 2" width={900} height={400} className="w-full h-auto rounded-lg" />
          </div>
        </div>
      </section>

      {/* 2.2 JupyterHub */}
      <section id="jupyter" className="space-y-4">
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
      <section id="ssh" className="space-y-4">
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

        {/* PuTTY - full row */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="px-4 py-3 bg-slate-50 border-b border-slate-200 flex items-center gap-2">
            <Monitor size={14} className="text-slate-500" />
            <span className="text-sm font-semibold text-slate-700">PuTTY SSH Client</span>
          </div>
          <div className="p-3">
            <ZoomableImage src="/images/image-14.png" alt="PuTTY SSH Configuration" width={900} height={450} className="w-full h-auto" />
          </div>
        </div>

        {/* MobaXterm - full row, images 15 and 16 clearly separated */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="px-4 py-3 bg-slate-50 border-b border-slate-200 flex items-center gap-2">
            <Monitor size={14} className="text-slate-500" />
            <span className="text-sm font-semibold text-slate-700">MobaXterm SSH Client</span>
          </div>
          <div className="p-3 space-y-4">
            <div className="space-y-1.5">
              <ZoomableImage src="/images/image-15.png" alt="MobaXterm Session Setup" width={900} height={450} className="w-full h-auto" />
            </div>
            <div className="border-t border-slate-100 pt-4 space-y-1.5">
              <ZoomableImage src="/images/image-16.png" alt="MobaXterm Connected Terminal" width={900} height={450} className="w-full h-auto" />
            </div>
          </div>
        </div>

        {/* Jupyter Terminal */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="px-4 py-3 bg-slate-50 border-b border-slate-200 flex items-center gap-2">
            <Monitor size={14} className="text-slate-500" />
            <span className="text-sm font-medium text-slate-700">Jupyter Terminal</span>
          </div>
          <div className="p-3">
            <ZoomableImage src="/images/image-17.png" alt="Jupyter Terminal" width={900} height={400} className="w-full h-auto" />
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="px-4 py-3 bg-slate-50 border-b border-slate-200 flex items-center gap-2">
            <span className="text-xs font-bold text-slate-500 bg-yellow-100 text-yellow-800 rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0">1</span>
            <span className="text-sm font-medium text-slate-700">เข้าไปยัง Directory งานของคุณพร้อมสร้างไฟล์ Script ทดสอบโดยใช้ partition cpu</span>
          </div>
          <CodeBlock
            title="ส่งงานผ่าน SSH (partition cpu)"
            language="bash"
            code={`#!/bin/bash
#SBATCH --job-name=my-job            # ชื่องาน
#SBATCH --output=/home/%u/job-%j.out # ไฟล์ผลลัพธ์ (%u=username, %j=jobid)
#SBATCH --error=/home/%u/job-%j.err  # ไฟล์ error
#SBATCH --partition=cpu              # พาร์ติชัน (cpu/gpu/short)
#SBATCH --nodes=1                    # จำนวน node
#SBATCH --ntasks=1                   # จำนวน task
#SBATCH --cpus-per-task=4            # CPU ต่อ task
#SBATCH --mem=8G                     # หน่วยความจำ
#SBATCH --time=02:00:00              # เวลาสูงสุด (HH:MM:SS)

# คำสั่งของคุณด้านล่าง
echo "Job started at $(date)"
python3 my_script.py
echo "Job finished at $(date)"`}
          />
          <div className="px-4 py-3 bg-yellow-50 border-t border-slate-200 flex items-center gap-2">
            <span className="text-xs font-bold bg-yellow-400 text-white rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0">2</span>
            <span className="text-sm font-medium text-slate-700">ส่งงานด้วยคำสั่ง <code className="bg-slate-100 px-1.5 py-0.5 rounded font-mono text-purple-700">sbatch job_test.sh</code></span>
          </div>
          <div className="px-4 py-3 bg-yellow-50 border-t border-slate-200 flex items-center gap-2">
            <span className="text-xs font-bold bg-yellow-400 text-white rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0">3</span>
            <span className="text-sm font-medium text-slate-700">ตรวจสอบดูสถานะ <code className="bg-slate-100 px-1.5 py-0.5 rounded font-mono text-purple-700">squeue -u Username</code></span>
          </div>
          <div className="p-3">
            <ZoomableImage src="/images/image-18.png" alt="SSH squeue output" width={900} height={400} className="w-full h-auto" />
          </div>
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
      <section id="transfer" className="space-y-4">
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
