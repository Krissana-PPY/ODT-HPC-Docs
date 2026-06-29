import { FileCode, Cpu, Brain, BarChart2, Dna, FlaskConical, Box, GitBranch } from "lucide-react";
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

      {/* 7.1 Python CPU */}
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

python3 analysis.py

echo "=== Done ==="`} />
      </section>

      {/* 7.2 Python GPU */}
      <section id="gpu-script" className="space-y-4">
        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          <Brain size={18} className="text-[#6B21A8]" />
          <span className="text-[#003087]">7.2</span> Python / Deep Learning (GPU)
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

echo "=== Python GPU Job ==="
nvidia-smi
echo "CUDA_VISIBLE_DEVICES: $CUDA_VISIBLE_DEVICES"

python3 train.py \\
  --epochs 100 \\
  --batch-size 64 \\
  --lr 0.001 \\
  --output /home/$USER/results/

echo "Training complete!"`} />
      </section>

      {/* 7.3 Multi-step */}
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

echo 'เสร็จสิ้นทุกขั้นตอน!'`} />
      </section>

      {/* 7.4 Conda */}
      <section id="conda-script" className="space-y-4">
        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          <FlaskConical size={18} className="text-blue-600" />
          <span className="text-[#003087]">7.4</span> Conda Environment Job
        </h2>
        <p className="text-slate-600 text-sm">ใช้ conda environment ที่สร้างไว้ล่วงหน้าภายใน job script</p>
        <CodeBlock title="conda_job.sh" language="bash" code={`#!/bin/bash
#SBATCH --job-name=conda-ml
#SBATCH --partition=cpu
#SBATCH --cpus-per-task=8
#SBATCH --mem=32G
#SBATCH --time=06:00:00
#SBATCH --output=%x_%j.out

# โหลด conda ก่อนเสมอ
source $HOME/miniconda3/etc/profile.d/conda.sh
conda activate myenv

echo "Python: $(python --version)"
echo "Conda env: $CONDA_DEFAULT_ENV"

python3 ml_pipeline.py \\
  --data $HOME/data/train.csv \\
  --output $HOME/results/

conda deactivate`} />
      </section>

      {/* 7.5 Apptainer */}
      <section id="apptainer-script" className="space-y-4">
        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          <Box size={18} className="text-indigo-600" />
          <span className="text-[#003087]">7.5</span> Apptainer Container Job
        </h2>
        <p className="text-slate-600 text-sm">รัน software ใน container ด้วย Apptainer รองรับ GPU ผ่าน flag <code className="bg-slate-100 px-1 rounded font-mono">--nv</code></p>
        <CodeBlock title="apptainer_gpu.sh" language="bash" code={`#!/bin/bash
#SBATCH --job-name=apptainer-gpu
#SBATCH --partition=gpu
#SBATCH --gres=gpu:1
#SBATCH --cpus-per-task=8
#SBATCH --mem=32G
#SBATCH --time=08:00:00
#SBATCH --output=%x_%j.out

IMAGE="$HOME/containers/pytorch_2.2.sif"
SCRATCH="/scratch/\${USER}/\${SLURM_JOB_ID}"
mkdir -p \${SCRATCH}

cp -r $HOME/data/* \${SCRATCH}/

# --nv = ส่ง GPU เข้า container, --bind = mount directory
apptainer exec --nv \\
  --bind \${SCRATCH}:/data,$HOME/results:/output \\
  \${IMAGE} \\
  python3 /app/train.py --data /data --output /output

rm -rf \${SCRATCH}`} />
      </section>

      {/* 7.6 Nextflow */}
      <section id="nextflow-script" className="space-y-4">
        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          <GitBranch size={18} className="text-teal-600" />
          <span className="text-[#003087]">7.6</span> Nextflow Pipeline (Slurm Executor)
        </h2>
        <p className="text-slate-600 text-sm">Nextflow จัดการ sub-job เข้าคิว Slurm ได้เองโดยอัตโนมัติผ่าน Slurm executor</p>
        <CodeBlock title="run_nextflow.sh" language="bash" code={`#!/bin/bash
#SBATCH --job-name=nextflow-head
#SBATCH --partition=cpu
#SBATCH --cpus-per-task=2
#SBATCH --mem=8G
#SBATCH --time=48:00:00
#SBATCH --output=%x_%j.out

# Nextflow head job จะส่ง sub-job เข้า Slurm เองอัตโนมัติ
nextflow run nf-core/rnaseq \\
  --input samplesheet.csv \\
  --outdir $HOME/results/rnaseq \\
  -profile slurm \\
  -resume`} />
        <CodeBlock title="nextflow.config" language="bash" code={`process {
  executor     = 'slurm'
  queue        = 'cpu'
  cpus         = 4
  memory       = '16 GB'
  time         = '4h'
}

withLabel: high_memory {
  memory = '64 GB'
  cpus   = 16
}

withLabel: gpu {
  queue          = 'gpu'
  clusterOptions = '--gres=gpu:1'
  memory         = '32 GB'
}`} />
      </section>

      {/* 7.7 Dorado */}
      <section id="dorado-script" className="space-y-4">
        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          <Dna size={18} className="text-green-700" />
          <span className="text-[#003087]">7.7</span> Dorado Basecalling (Oxford Nanopore GPU)
        </h2>
        <p className="text-slate-600 text-sm">
          สคริปต์สำหรับ Dorado basecalling — โมเดลต้องดาวน์โหลดไว้ก่อน:
          {" "}<code className="bg-slate-100 px-1.5 rounded font-mono text-xs">dorado download --model dna_r10.4.1_e8.2_400bps_hac@v5.0.0 --directory $HOME/dorado_models</code>
        </p>
        <CodeBlock title="dorado_basecall.sh" language="bash" code={`#!/bin/bash
#SBATCH --job-name=dorado
#SBATCH --partition=gpu
#SBATCH --gres=gpu:1
#SBATCH --cpus-per-task=16
#SBATCH --mem=64G
#SBATCH --time=24:00:00
#SBATCH --output=%x_%j.out
#SBATCH --error=%x_%j.err

INPUT="$HOME/data"
OUTPUT="$HOME/results"
MODEL="$HOME/dorado_models/dna_r10.4.1_e8.2_400bps_hac@v5.0.0"

SCRATCH="/scratch/\${USER}/\${SLURM_JOB_ID}"
mkdir -p \${SCRATCH}
cp -r \${INPUT}/* \${SCRATCH}/

mkdir -p \${OUTPUT}
dorado basecaller \${MODEL} \${SCRATCH} --device cuda:0 > \${SCRATCH}/calls.bam

cp \${SCRATCH}/calls.bam \${OUTPUT}/
rm -rf \${SCRATCH}

echo "Basecalling เสร็จสิ้น ผลลัพธ์: \${OUTPUT}/calls.bam"`} />
      </section>

      {/* 7.8 Quick srun */}
      <section id="fast-commands" className="space-y-4">
        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          <Cpu size={18} className="text-green-700" />
          <span className="text-[#003087]">7.8</span> คำสั่งด่วน (srun)
        </h2>
        <CodeBlock language="bash" code={`srun --partition=short python3 my_script.py
srun --partition=gpu --gres=gpu:1 python3 train.py
srun --partition=cpu --cpus-per-task=8 --mem=16G ./my_program`} />
      </section>
    </div>
  );
}
