import { FileCode, Cpu, Brain, BarChart2 } from "lucide-react";
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
    </div>
  );
}
