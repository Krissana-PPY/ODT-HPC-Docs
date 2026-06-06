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

      <section className="space-y-4">
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

# โหลด Environment (ถ้าใช้ virtualenv)
# source /home/$USER/venv/bin/activate

# รันโปรแกรม
python3 analysis.py --threads 8

echo "=== Done ==="`} />
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          <Brain size={18} className="text-[#6B21A8]" />
          <span className="text-[#003087]">7.2</span> PyTorch / Deep Learning (GPU)
        </h2>
        <CodeBlock title="pytorch_gpu.sh" language="bash" code={`#!/bin/bash

#SBATCH --job-name=pytorch-train
#SBATCH --output=/home/%u/pytorch-%j.out
#SBATCH --error=/home/%u/pytorch-%j.err
#SBATCH --partition=gpu
#SBATCH --gres=gpu:1
#SBATCH --cpus-per-task=8
#SBATCH --mem=32G
#SBATCH --time=24:00:00

echo "=== PyTorch GPU Job ==="
nvidia-smi
echo "CUDA_VISIBLE_DEVICES: $CUDA_VISIBLE_DEVICES"

python3 train.py \\
  --epochs 100 \\
  --batch-size 64 \\
  --lr 0.001 \\
  --output /home/$USER/results/

echo "Training complete!"`} />

        <CodeBlock title="train.py (ตัวอย่าง)" language="python" code={`import torch
import torch.nn as nn

# ตรวจสอบ GPU
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
print(f"Using device: {device}")

if torch.cuda.is_available():
    print(f"GPU: {torch.cuda.get_device_name(0)}")
    print(f"Memory: {torch.cuda.get_device_properties(0).total_memory / 1e9:.1f} GB")

# โมเดลของคุณที่นี่...`} />
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          <BarChart2 size={18} className="text-[#C2612B]" />
          <span className="text-[#003087]">7.3</span> R Script
        </h2>
        <CodeBlock title="r_job.sh" language="bash" code={`#!/bin/bash

#SBATCH --job-name=r-analysis
#SBATCH --output=/home/%u/r-%j.out
#SBATCH --partition=cpu
#SBATCH --cpus-per-task=4
#SBATCH --mem=8G
#SBATCH --time=02:00:00

Rscript --vanilla analysis.R`} />
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          <Cpu size={18} className="text-green-700" />
          <span className="text-[#003087]">7.4</span> Multi-GPU Training
        </h2>
        <CodeBlock title="multi_gpu.sh" language="bash" code={`#!/bin/bash

#SBATCH --job-name=multi-gpu
#SBATCH --output=/home/%u/multigpu-%j.out
#SBATCH --partition=gpu
#SBATCH --gres=gpu:2           # ขอ 2 GPU
#SBATCH --cpus-per-task=16
#SBATCH --mem=64G
#SBATCH --time=48:00:00

# ใช้ torch.nn.DataParallel หรือ torchrun
torchrun --nproc_per_node=2 train_distributed.py`} />
      </section>
    </div>
  );
}
