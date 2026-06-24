import { Send, Cpu, Zap, GitBranch, List, Dna, Download, AlertTriangle } from "lucide-react";
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

      <section id="batch" className="space-y-4">
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

      <section id="interactive" className="space-y-4">
        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          <Zap size={18} className="text-[#F5A623]" />
          <span className="text-[#003087]">5.2</span> งาน Interactive (สำหรับทดสอบ)
        </h2>
        <p className="text-slate-600 text-sm">รับ Shell บน Compute Node โดยตรง:</p>
        <CodeBlock language="bash" code={`srun --partition=short --time=00:30:00 --cpus-per-task=4 --mem=8G --pty bash

# ตอนนี้คุณอยู่บน Compute Node รันคำสั่งได้ตามปกติ
# พิมพ์ 'exit' เมื่อเสร็จสิ้น`} />
      </section>

      <section id="gpu" className="space-y-4">
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

      <section id="multinode" className="space-y-4">
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

      <section id="array" className="space-y-4">
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

      <section id="dorado" className="space-y-4">
        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          <Dna size={18} className="text-green-700" />
          <span className="text-[#003087]">5.6</span> Dorado Basecalling (Oxford Nanopore)
        </h2>
        <p className="text-slate-600 text-sm">Dorado เป็น basecaller สำหรับข้อมูล Oxford Nanopore sequencing รองรับการประมวลผลด้วย GPU เพื่อความเร็วสูง</p>

        {/* Warning box */}
        <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4">
          <AlertTriangle size={18} className="text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-amber-800 text-sm">ต้องดาวน์โหลดโมเดลก่อนใช้งาน</p>
            <p className="text-amber-700 text-sm mt-1">
              Dorado ไม่ได้รวมโมเดลมาในระบบ ผู้ใช้ต้องดาวน์โหลดโมเดลที่ต้องการไปเก็บไว้ในพื้นที่ของตนเองก่อนส่งงาน
              เนื่องจากระบบไม่ได้สำรองโมเดลไว้กลาง
            </p>
          </div>
        </div>

        {/* Download model */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Download size={15} className="text-green-700" />
            <h3 className="font-semibold text-slate-700 text-sm">ตัวอย่าง : ดาวน์โหลดโมเดลไปยัง directory ของตนเอง</h3>
          </div>
          <CodeBlock language="bash" code={`# ดาวน์โหลดโมเดลไปยัง $HOME/dorado_models
dorado download --model dna_r10.4.1_e8.2_400bps_hac@v5.0.0 --directory $HOME/dorado_models

# ดูรายการโมเดลที่มีทั้งหมด
dorado download --list`} />
        </div>

        {/* Job script */}
        <CodeBlock title="dorado_job.sh" language="bash" code={`#!/bin/bash
#SBATCH --job-name=dorado
#SBATCH --partition=gpu
#SBATCH --gres=gpu:1
#SBATCH --cpus-per-task=16
#SBATCH --mem=64G
#SBATCH --time=24:00:00
#SBATCH --output=%x_%j.out
#SBATCH --error=%x_%j.err

# ── 1. กำหนด path ──────────────────────────────────────────
# แก้ทั้ง 3 ค่านี้ให้ตรงกับข้อมูลของคุณ
INPUT="$HOME/data"          # ที่อยู่ของข้อมูล (POD5/FAST5 files)
OUTPUT="$HOME/results"      # ที่อยู่ของผลลัพธ์
MODEL="$HOME/dorado_models/dna_r10.4.1_e8.2_400bps_hac@v5.0.0"  # โมเดลที่เลือกใช้

# ── 2. เตรียม scratch (local SSD บน compute node) ─────────
# copy input ไปไว้ที่ scratch ก่อนเสมอ เพื่อความเร็ว
SCRATCH="/scratch/\${USER}/\${SLURM_JOB_ID}"
mkdir -p \${SCRATCH}
cp -r \${INPUT}/* \${SCRATCH}/

# สร้าง directory output หากยังไม่มี
mkdir -p \${OUTPUT}

# ── 3. รัน basecalling ─────────────────────────────────────
dorado basecaller \${MODEL} \${SCRATCH} --device cuda:0 > \${SCRATCH}/calls.bam

# ── 4. เก็บผลลัพธ์กลับ $HOME ──────────────────────────────
# ต้อง copy กลับก่อน job จบ เพราะ scratch ไม่ได้ backup
cp \${SCRATCH}/calls.bam \${OUTPUT}/

# ── 5. ล้าง scratch ────────────────────────────────────────
rm -rf \${SCRATCH}`} />

        <div className="alert-info flex items-start gap-3">
          <Dna size={16} className="text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-blue-800 text-sm">เกี่ยวกับ /scratch</p>
            <p className="text-blue-700 text-sm mt-1">
              ข้อมูลใน <code className="bg-blue-100 px-1 rounded font-mono">/scratch</code> จะถูกลบอัตโนมัติเมื่องานสิ้นสุด
              ผลลัพธ์ที่ต้องการเก็บต้อง copy กลับมาที่ <code className="bg-blue-100 px-1 rounded font-mono">/home</code> ก่อนงานจบทุกครั้ง
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
