import { FileCode, Cpu, Brain, BarChart2, Dna } from "lucide-react";
import { CodeBlock } from "@/components/CodeBlock";

export default function ExamplesPage() {
  return (
    <div className="space-y-8 animate-fade-in-up">
      <div className="border-b border-slate-200 pb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="bg-green-100 rounded-lg p-2"><FileCode size={22} className="text-green-700" /></div>
          <h1 className="text-2xl font-bold text-slate-900">ตัวอย่างสคริปต์</h1>
        </div>
        <p className="text-slate-500 ml-12">ตัวอย่างสคริปต์พร้อมใช้งาน สำหรับงานประเภทต่างๆ</p>
      </div>

      <section id="cpu-script" className="space-y-4">
        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          <Cpu size={18} className="text-[#003087]" />
          <span className="text-[#003087]">7.1</span> Python ทั่วไป (CPU)
        </h2>
        <CodeBlock title="python_cpu.sh" language="bash" code={`#!/bin/bash

#SBATCH --job-name=python-cpu
#SBATCH --output=/home/%u/python-%j.out
#SBATCH --error=/home/%u/python-%j.err
#SBATCH --partition=cpu
#SBATCH --nodes=1
#SBATCH --ntasks=1
#SBATCH --cpus-per-task=8
#SBATCH --mem=16G
#SBATCH --time=04:00:00

echo "=== Python CPU Job ==="
echo "Node: $(hostname)"
echo "Date: $(date)"

# รันโปรแกรม
python3 analysis.py

echo "=== Done ==="`} />
      </section>

      <section id="gpu-script" className="space-y-4">
        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          <Brain size={18} className="text-[#6B21A8]" />
          <span className="text-[#003087]">7.2</span> python / Deep Learning (GPU)
        </h2>
        <CodeBlock title="python_gpu.sh" language="bash" code={`#!/bin/bash

#SBATCH --job-name=python-train
#SBATCH --output=/home/%u/python-%j.out
#SBATCH --error=/home/%u/python-%j.err
#SBATCH --partition=gpu
#SBATCH --gres=gpu:1
#SBATCH --cpus-per-task=8
#SBATCH --mem=32G
#SBATCH --time=24:00:00

echo "=== python GPU Job ==="
nvidia-smi
echo "CUDA_VISIBLE_DEVICES: $CUDA_VISIBLE_DEVICES"

python3 train.py \\
  --epochs 100 \\
  --batch-size 64 \\
  --lr 0.001 \\
  --output /home/$USER/results/

echo "Training complete!"`} />

      </section>

      <section id="multi-script" className="space-y-4">
        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          <BarChart2 size={18} className="text-[#C2612B]" />
          <span className="text-[#003087]">7.3</span> Script Python หลายไฟล์ในงานเดียว
        </h2>
        <CodeBlock title="python_job.sh" language="bash" code={`#!/bin/bash
#SBATCH --job-name=multi-step
#SBATCH --output=/home/%u/multi-%j.out
#SBATCH --partition=cpu
#SBATCH --cpus-per-task=4
#SBATCH --mem=16G
#SBATCH --time=04:00:00

echo 'ขั้นตอนที่ 1: Preprocessing...'
python3 /home/$USER/scripts/preprocess.py

echo 'ขั้นตอนที่ 2: วิเคราะห์...'
python3 /home/$USER/scripts/analyze.py

echo 'ขั้นตอนที่ 3: สร้างรายงาน...'
python3 /home/$USER/scripts/report.py

echo 'เสร็จสิ้นทุกขั้นตอน!'
`} />
      </section>

      <section id="fast-commands" className="space-y-4">
        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          <Cpu size={18} className="text-green-700" />
          <span className="text-[#003087]">7.4</span> รันคำสั่งเดียว
        </h2>
        <CodeBlock title="multi_gpu.sh" language="bash" code={`srun --partition=short python3 my_script.py
srun --partition=gpu --gres=gpu:1 python3 train.py
srun --partition=cpu --cpus-per-task=8 --mem=16G ./my_program
`} />
      </section>

      <section id="dorado-script" className="space-y-4">
        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          <Dna size={18} className="text-green-700" />
          <span className="text-[#003087]">7.5</span> Dorado Basecalling (Oxford Nanopore GPU)
        </h2>
        <p className="text-slate-600 text-sm">
          สคริปต์ตัวอย่างสำหรับรัน Dorado basecaller บน GPU partition
          โมเดลต้องดาวน์โหลดไว้ที่พื้นที่ของตนเองก่อนส่งงาน
        </p>
        <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl p-3.5 text-sm">
          <Dna size={15} className="text-amber-600 flex-shrink-0 mt-0.5" />
          <p className="text-amber-700">
            ดาวน์โหลดโมเดลก่อน:{" "}
            <code className="bg-amber-100 px-1.5 py-0.5 rounded font-mono text-xs">
              dorado download --model dna_r10.4.1_e8.2_400bps_hac@v5.0.0 --directory $HOME/dorado_models
            </code>
          </p>
        </div>
        <CodeBlock title="dorado_basecall.sh" language="bash" code={`#!/bin/bash
#SBATCH --job-name=dorado
#SBATCH --partition=gpu
#SBATCH --gres=gpu:1
#SBATCH --cpus-per-task=16
#SBATCH --mem=64G
#SBATCH --time=24:00:00
#SBATCH --output=%x_%j.out
#SBATCH --error=%x_%j.err

# ── 1. กำหนด path (แก้ค่าให้ตรงกับข้อมูลของคุณ) ──────────
INPUT="$HOME/data"
OUTPUT="$HOME/results"
MODEL="$HOME/dorado_models/dna_r10.4.1_e8.2_400bps_hac@v5.0.0"

# ── 2. เตรียม scratch (local SSD) เพื่อความเร็ว ──────────
SCRATCH="/scratch/\${USER}/\${SLURM_JOB_ID}"
mkdir -p \${SCRATCH}
cp -r \${INPUT}/* \${SCRATCH}/

mkdir -p \${OUTPUT}

# ── 3. รัน basecalling ────────────────────────────────────
dorado basecaller \${MODEL} \${SCRATCH} --device cuda:0 > \${SCRATCH}/calls.bam

# ── 4. เก็บผลลัพธ์กลับ $HOME (ก่อน job จบ เพราะ scratch ถูกลบ) ──
cp \${SCRATCH}/calls.bam \${OUTPUT}/

# ── 5. ล้าง scratch ───────────────────────────────────────
rm -rf \${SCRATCH}

echo "Basecalling เสร็จสิ้น ผลลัพธ์อยู่ที่ \${OUTPUT}/calls.bam"`} />
      </section>
    </div>
  );
}
