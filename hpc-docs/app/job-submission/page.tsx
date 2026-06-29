import { Send, Cpu, Zap, GitBranch, List, Dna, Download, AlertTriangle, Database, FlaskConical, Box, Monitor } from "lucide-react";
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

      {/* ─── /scratch ─── */}
      <section id="scratch" className="space-y-4">
        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          <Database size={18} className="text-[#F5A623]" />
          เกี่ยวกับ /scratch (Local SSD)
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { ok: true,  title: "เร็วกว่า /home",    desc: "SSD ความเร็วสูง เหมาะสำหรับ I/O หนัก" },
            { ok: true,  title: "พื้นที่ ~6 TB/node", desc: "สำหรับไฟล์ชั่วคราวระหว่างงานรัน" },
            { ok: false, title: "ข้อมูลชั่วคราว",    desc: "ข้อมูลถูกลบอัตโนมัติหลังงานจบ" },
            { ok: false, title: "ต้อง copy กลับ",    desc: "copy ผลลัพธ์กลับ /home ก่อนงานจบ" },
          ].map((item, i) => (
            <div key={i} className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm flex items-start gap-3">
              {item.ok
                ? <span className="text-green-500 mt-0.5">✓</span>
                : <AlertTriangle size={16} className="text-orange-500 flex-shrink-0 mt-0.5" />}
              <div>
                <div className="font-semibold text-slate-800 text-sm">{item.title}</div>
                <div className="text-slate-600 text-sm mt-0.5">{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
        <CodeBlock title="scratch_pattern.sh" language="bash" code={`# รูปแบบ /scratch ที่แนะนำในทุก job script
SCRATCH="/scratch/\${USER}/\${SLURM_JOB_ID}"
mkdir -p \${SCRATCH}

cp -r \${INPUT}/* \${SCRATCH}/      # copy ข้อมูลเข้า scratch

# ... รัน process ของคุณที่นี่ ...

cp \${SCRATCH}/output* \${OUTPUT}/  # copy ผลลัพธ์กลับ /home
rm -rf \${SCRATCH}                 # ลบ scratch`} />
      </section>

      {/* ─── 5.1 Batch ─── */}
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
#SBATCH --job-name=my-job
#SBATCH --output=/home/my_lab/%u/job-%j.out
#SBATCH --error=/home/my_lab/%u/job-%j.err
#SBATCH --partition=cpu
#SBATCH --nodes=1
#SBATCH --ntasks=1
#SBATCH --cpus-per-task=4
#SBATCH --mem=8G
#SBATCH --time=02:00:00

echo "Job started at $(date)"
python3 my_script.py
echo "Job finished at $(date)"`} />
        <CodeBlock language="bash" code={`sbatch my_job.sh
squeue -u $USER
cat /home/$USER/job-*.out`} />
      </section>

      {/* ─── 5.2 Interactive ─── */}
      <section id="interactive" className="space-y-4">
        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          <Zap size={18} className="text-[#F5A623]" />
          <span className="text-[#003087]">5.2</span> งาน Interactive (สำหรับทดสอบ)
        </h2>
        <CodeBlock language="bash" code={`srun --partition=short --time=00:30:00 --cpus-per-task=4 --mem=8G --pty bash`} />
      </section>

      {/* ─── 5.3 GPU ─── */}
      <section id="gpu" className="space-y-4">
        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          <Cpu size={18} className="text-[#6B21A8]" />
          <span className="text-[#003087]">5.3</span> งาน GPU
        </h2>
        <CodeBlock title="gpu_job.sh" language="bash" code={`#!/bin/bash
#SBATCH --job-name=gpu-job
#SBATCH --output=/home/%u/gpu-%j.out
#SBATCH --partition=gpu
#SBATCH --gres=gpu:1
#SBATCH --cpus-per-task=4
#SBATCH --mem=16G
#SBATCH --time=08:00:00

nvidia-smi
python3 train_model.py`} />
      </section>

      {/* ─── 5.4 MPI ─── */}
      <section id="multinode" className="space-y-4">
        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          <GitBranch size={18} className="text-slate-600" />
          <span className="text-[#003087]">5.4</span> งาน Multi-Node (MPI)
        </h2>
        <CodeBlock title="mpi_job.sh" language="bash" code={`#!/bin/bash
#SBATCH --job-name=mpi-job
#SBATCH --output=/home/%u/mpi-%j.out
#SBATCH --partition=cpu
#SBATCH --nodes=2
#SBATCH --ntasks-per-node=4
#SBATCH --time=04:00:00

srun ./my_mpi_program`} />
      </section>

      {/* ─── 5.5 Array ─── */}
      <section id="array" className="space-y-4">
        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          <List size={18} className="text-[#C2612B]" />
          <span className="text-[#003087]">5.5</span> Array Job (รันสคริปต์เดิมหลายครั้ง)
        </h2>
        <CodeBlock title="array_job.sh" language="bash" code={`#!/bin/bash
#SBATCH --job-name=array-job
#SBATCH --output=/home/%u/array-%A_%a.out
#SBATCH --array=1-10
#SBATCH --partition=cpu
#SBATCH --cpus-per-task=2
#SBATCH --mem=4G
#SBATCH --time=01:00:00

echo "Task $SLURM_ARRAY_TASK_ID"
python3 process.py --input data_\${SLURM_ARRAY_TASK_ID}.csv`} />
      </section>

      {/* ─── 5.6 Conda ─── */}
      <section id="conda" className="space-y-4">
        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          <FlaskConical size={18} className="text-blue-600" />
          <span className="text-[#003087]">5.6</span> งานใน Conda Environment
        </h2>
        <p className="text-slate-600 text-sm">ใช้ <code className="bg-slate-100 px-1 rounded font-mono">conda activate</code> ภายใน script เพื่อใช้ environment ที่สร้างไว้</p>
        <CodeBlock title="conda_job.sh" language="bash" code={`#!/bin/bash
#SBATCH --job-name=conda-job
#SBATCH --partition=cpu
#SBATCH --cpus-per-task=8
#SBATCH --mem=32G
#SBATCH --time=04:00:00
#SBATCH --output=%x_%j.out

# เปิดใช้งาน conda
source $HOME/miniconda3/etc/profile.d/conda.sh
conda activate myenv

python3 analysis.py`} />
      </section>

      {/* ─── 5.7 Apptainer ─── */}
      <section id="apptainer-job" className="space-y-4">
        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          <Box size={18} className="text-indigo-600" />
          <span className="text-[#003087]">5.7</span> งาน Apptainer Container
        </h2>
        <p className="text-slate-600 text-sm">รัน container ด้วย Apptainer บน Compute Node รองรับทั้ง CPU และ GPU</p>
        <CodeBlock title="apptainer_job.sh" language="bash" code={`#!/bin/bash
#SBATCH --job-name=apptainer-job
#SBATCH --partition=gpu
#SBATCH --gres=gpu:1
#SBATCH --cpus-per-task=8
#SBATCH --mem=32G
#SBATCH --time=08:00:00
#SBATCH --output=%x_%j.out

IMAGE="$HOME/containers/pytorch_2.2.sif"
INPUT="$HOME/data"
OUTPUT="$HOME/results"

# รัน container พร้อม GPU
apptainer exec --nv \\
  --bind \${INPUT}:/data,\${OUTPUT}:/output \\
  \${IMAGE} \\
  python3 /app/train.py`} />
      </section>

      {/* ─── 5.8 Nextflow ─── */}
      <section id="nextflow" className="space-y-4">
        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          <GitBranch size={18} className="text-teal-600" />
          <span className="text-[#003087]">5.8</span> Nextflow Pipeline
        </h2>
        <p className="text-slate-600 text-sm">Nextflow รองรับ Slurm executor โดยตรง สามารถส่ง sub-job เข้าคิวงาน Slurm ได้อัตโนมัติ</p>
        <CodeBlock title="nextflow_job.sh" language="bash" code={`#!/bin/bash
#SBATCH --job-name=nextflow
#SBATCH --partition=cpu
#SBATCH --cpus-per-task=2
#SBATCH --mem=8G
#SBATCH --time=24:00:00
#SBATCH --output=%x_%j.out

# nextflow.config ต้องกำหนด executor = 'slurm'
nextflow run my_pipeline.nf -profile slurm`} />
        <CodeBlock title="nextflow.config (ตัวอย่าง)" language="bash" code={`process {
  executor = 'slurm'
  queue    = 'cpu'
  cpus     = 4
  memory   = '16 GB'
  time     = '4h'
}

withLabel: gpu {
  queue = 'gpu'
  clusterOptions = '--gres=gpu:1'
}`} />
      </section>

      {/* ─── 5.9 RStudio ─── */}
      <section id="rstudio" className="space-y-4">
        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          <Monitor size={18} className="text-blue-700" />
          <span className="text-[#003087]">5.9</span> RStudio Server (ผ่าน OOD)
        </h2>
        <p className="text-slate-600 text-sm">เข้าใช้ RStudio Server ผ่าน Open OnDemand โดยไม่ต้อง SSH</p>
        <div className="space-y-3">
          {[
            "เปิด https://odt-hpc.kku.ac.th แล้ว login",
            "เลือก Interactive Apps → RStudio Server",
            "กำหนดทรัพยากร: Partition, CPU, RAM, เวลา",
            "กด Launch แล้วรอ session พร้อม",
            "กด Connect to RStudio Server",
          ].map((s, i) => (
            <div key={i} className="flex items-center gap-3 bg-blue-50 rounded-lg px-4 py-2.5">
              <span className="w-6 h-6 rounded-full bg-[#003087] text-white text-xs font-bold flex items-center justify-center flex-shrink-0">{i+1}</span>
              <span className="text-slate-700 text-sm">{s}</span>
            </div>
          ))}
        </div>
        <CodeBlock title="rstudio_batch.sh (กรณีต้องการรัน R script แบบ batch)" language="bash" code={`#!/bin/bash
#SBATCH --job-name=r-analysis
#SBATCH --partition=cpu
#SBATCH --cpus-per-task=8
#SBATCH --mem=32G
#SBATCH --time=04:00:00
#SBATCH --output=%x_%j.out

Rscript my_analysis.R`} />
      </section>

      {/* ─── 5.10 Dorado ─── */}
      <section id="dorado" className="space-y-4">
        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          <Dna size={18} className="text-green-700" />
          <span className="text-[#003087]">5.10</span> Dorado Basecalling (Oxford Nanopore)
        </h2>
        <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4">
          <AlertTriangle size={18} className="text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-amber-800 text-sm">ต้องดาวน์โหลดโมเดลก่อนใช้งาน</p>
            <p className="text-amber-700 text-sm mt-1">Dorado ไม่ได้รวมโมเดลมาในระบบ ผู้ใช้ต้องดาวน์โหลดโมเดลไปเก็บในพื้นที่ของตนเองก่อน</p>
          </div>
        </div>
        <CodeBlock language="bash" code={`# ดาวน์โหลดโมเดลไปยัง $HOME/dorado_models
dorado download --model dna_r10.4.1_e8.2_400bps_hac@v5.0.0 --directory $HOME/dorado_models

# ดูรายการโมเดลที่มี
dorado download --list`} />
        <CodeBlock title="dorado_job.sh" language="bash" code={`#!/bin/bash
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
rm -rf \${SCRATCH}`} />
      </section>
    </div>
  );
}
