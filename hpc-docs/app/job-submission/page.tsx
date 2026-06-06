import { Send, Cpu, Zap, GitBranch, List } from "lucide-react";
import { CodeBlock } from "@/components/CodeBlock";

export default function JobSubmissionPage() {
  return (
    <div className="space-y-8 animate-fade-in-up">
      <div className="border-b border-slate-200 pb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="bg-blue-100 rounded-lg p-2"><Send size={22} className="text-[#003087]" /></div>
          <h1 className="text-2xl font-bold text-slate-900">การส่งงาน (Job Submission)</h1>
        </div>
        <p className="text-slate-500 ml-12">รูปแบบต่างๆ ในการส่งงานไปยัง HPC Cluster</p>
      </div>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          <span className="text-[#003087]">5.1</span> งาน Batch (ใช้บ่อยที่สุด)
        </h2>
        <p className="text-slate-600 text-sm">สร้างไฟล์สคริปต์แล้วส่งงาน งานจะรันในพื้นหลัง</p>
        <div className="space-y-3">
          {["ขั้นตอนที่ 1: สร้างไฟล์สคริปต์งาน", "ขั้นตอนที่ 2: ส่งงาน", "ขั้นตอนที่ 3: ตรวจสอบสถานะ", "ขั้นตอนที่ 4: ดูผลลัพธ์"].map((s, i) => (
            <div key={i} className="flex items-center gap-3 bg-blue-50 rounded-lg px-4 py-2.5">
              <span className="w-6 h-6 rounded-full bg-[#003087] text-white text-xs font-bold flex items-center justify-center flex-shrink-0">{i+1}</span>
              <span className="text-slate-700 text-sm font-medium">{s}</span>
            </div>
          ))}
        </div>
        <CodeBlock title="my_job.sh" language="bash" code={`#!/bin/bash

#SBATCH --job-name=my-job                   # ชื่องาน
#SBATCH --output=/home/my_lab/%u/job-%j.out # ไฟล์ผลลัพธ์ (%u=username, %j=jobid)
#SBATCH --error=/home/my_lab/%u/job-%j.err  # ไฟล์ error
#SBATCH --partition=cpu                     # พาร์ติชัน (cpu/gpu/short)
#SBATCH --nodes=1                           # จำนวน node
#SBATCH --ntasks=1                          # จำนวน task
#SBATCH --cpus-per-task=4                   # CPU ต่อ task
#SBATCH --mem=8G                            # หน่วยความจำ
#SBATCH --time=02:00:00                     # เวลาสูงสุด (HH:MM:SS)

# คำสั่งของคุณด้านล่าง
echo "Job started at $(date)"
python3 my_script.py
echo "Job finished at $(date)"`} />
        <CodeBlock language="bash" code={`# ส่งงาน
sbatch my_job.sh

# ตรวจสอบสถานะ
squeue -u $USER

# ดูผลลัพธ์
cat /home/$USER/job-*.out`} />
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          <Zap size={18} className="text-[#F5A623]" />
          <span className="text-[#003087]">5.2</span> งาน Interactive (สำหรับทดสอบ)
        </h2>
        <p className="text-slate-600 text-sm">รับ Shell บน Compute Node โดยตรง:</p>
        <CodeBlock language="bash" code={`srun --partition=short --time=00:30:00 --cpus-per-task=4 --mem=8G --pty bash

# ตอนนี้คุณอยู่บน Compute Node รันคำสั่งได้ตามปกติ
# พิมพ์ 'exit' เมื่อเสร็จสิ้น`} />
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          <Cpu size={18} className="text-[#6B21A8]" />
          <span className="text-[#003087]">5.3</span> งาน GPU
        </h2>
        <p className="text-slate-600 text-sm">เพื่อใช้ GPU NVIDIA A40 ให้เพิ่ม <code className="bg-slate-100 text-purple-700 px-1 rounded font-mono">--partition=gpu</code> และ <code className="bg-slate-100 text-purple-700 px-1 rounded font-mono">--gres=gpu:1</code></p>
        <CodeBlock title="gpu_job.sh" language="bash" code={`#!/bin/bash

#SBATCH --job-name=gpu-job
#SBATCH --output=/home/%u/gpu-%j.out
#SBATCH --partition=gpu
#SBATCH --gres=gpu:1          # ขอ GPU 1 ตัว
#SBATCH --cpus-per-task=4
#SBATCH --mem=16G
#SBATCH --time=08:00:00

nvidia-smi                    # ตรวจสอบว่า GPU พร้อมใช้งาน
python3 train_model.py`} />
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          <GitBranch size={18} className="text-slate-600" />
          <span className="text-[#003087]">5.4</span> งาน Multi-Node (MPI)
        </h2>
        <CodeBlock title="mpi_job.sh" language="bash" code={`#!/bin/bash

#SBATCH --job-name=mpi-job
#SBATCH --output=/home/%u/mpi-%j.out
#SBATCH --partition=cpu
#SBATCH --nodes=2             # ใช้ 2 nodes
#SBATCH --ntasks-per-node=4   # 4 tasks ต่อ node
#SBATCH --time=04:00:00

srun ./my_mpi_program`} />
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          <List size={18} className="text-[#C2612B]" />
          <span className="text-[#003087]">5.5</span> Array Job (รันสคริปต์เดิมหลายครั้ง)
        </h2>
        <CodeBlock title="array_job.sh" language="bash" code={`#!/bin/bash

#SBATCH --job-name=array-job
#SBATCH --output=/home/%u/array-%A_%a.out
#SBATCH --array=1-10          # รัน 10 ครั้ง (index 1-10)
#SBATCH --partition=cpu
#SBATCH --cpus-per-task=2
#SBATCH --mem=4G
#SBATCH --time=01:00:00

echo "Task $SLURM_ARRAY_TASK_ID"
python3 process.py --input data_\${SLURM_ARRAY_TASK_ID}.csv`} />
      </section>
    </div>
  );
}
