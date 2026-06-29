import { BookOpen, FlaskConical, Box, Dna, GitBranch, Monitor, Download } from "lucide-react";
import { CodeBlock } from "@/components/CodeBlock";

export default function SoftwareGuidesPage() {
  return (
    <div className="space-y-10 animate-fade-in-up">
      <div className="border-b border-slate-200 pb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="bg-blue-100 rounded-lg p-2">
            <BookOpen size={22} className="text-[#003087]" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900">คู่มือการใช้งานซอฟต์แวร์</h1>
        </div>
        <p className="text-slate-500 ml-12">วิธีใช้งานซอฟต์แวร์แต่ละตัวบนระบบ HPC</p>
      </div>

      {/* ─── Miniconda ─── */}
      <section id="miniconda" className="space-y-4">
        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          <FlaskConical size={18} className="text-blue-600" />
          Miniconda — สร้าง Environment ใน HOME
        </h2>
        <p className="text-slate-600 text-sm">
          Miniconda ช่วยให้ผู้ใช้แต่ละคนสร้าง Python/R environment ของตนเองได้โดยไม่ต้องรอผู้ดูแลระบบ
          Environment จะถูกเก็บใน <code className="bg-slate-100 px-1 rounded font-mono">$HOME/miniconda3/envs/</code> (นับรวมใน quota 300 GB)
        </p>

        <div className="space-y-3">
          <h3 className="font-semibold text-slate-700 text-sm">สร้างและใช้งาน conda environment</h3>
          <CodeBlock language="bash" code={`# สร้าง environment ชื่อ myenv พร้อม Python 3.11
conda create -n myenv python=3.11 -y

# เปิดใช้งาน environment
conda activate myenv

# ติดตั้งแพ็กเกจ
conda install numpy pandas scikit-learn -y
pip install torch torchvision

# ดู environment ทั้งหมด
conda env list

# ปิด environment
conda deactivate`} />
        </div>

        <div className="space-y-3">
          <h3 className="font-semibold text-slate-700 text-sm">ใช้ conda environment ใน Job Script</h3>
          <CodeBlock title="conda_job.sh" language="bash" code={`#!/bin/bash
#SBATCH --job-name=conda-job
#SBATCH --partition=cpu
#SBATCH --cpus-per-task=4
#SBATCH --mem=16G
#SBATCH --time=02:00:00
#SBATCH --output=%x_%j.out

# ต้องมีบรรทัดนี้เสมอ ก่อน conda activate
source $HOME/miniconda3/etc/profile.d/conda.sh
conda activate myenv

python3 my_analysis.py`} />
        </div>

        <div className="alert-info flex items-start gap-3">
          <FlaskConical size={16} className="text-blue-600 flex-shrink-0 mt-0.5" />
          <p className="text-blue-700 text-sm">
            Environment ถูกเก็บใน <code className="bg-blue-100 px-1 rounded font-mono">$HOME/miniconda3/envs/</code> ซึ่งนับรวมเป็น quota ของ /home (300 GB) ควรลบ environment ที่ไม่ใช้แล้วออกเพื่อประหยัดพื้นที่
          </p>
        </div>
      </section>

      <hr className="border-slate-100" />

      {/* ─── Apptainer ─── */}
      <section id="apptainer" className="space-y-4">
        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          <Box size={18} className="text-indigo-600" />
          Apptainer — รัน Container บน HPC
        </h2>
        <p className="text-slate-600 text-sm">
          Apptainer (เดิมชื่อ Singularity) คือระบบ container สำหรับ HPC ที่ปลอดภัยกว่า Docker
          รองรับการรัน container จาก Docker Hub, BioContainers และไฟล์ .sif
        </p>

        <div className="space-y-3">
          <h3 className="font-semibold text-slate-700 text-sm">ดึง container จาก Docker Hub</h3>
          <CodeBlock language="bash" code={`# ดึง container มาเป็นไฟล์ .sif (ทำบน Login Node ได้)
apptainer pull docker://ubuntu:22.04
apptainer pull docker://python:3.11-slim

# ดึงจาก BioContainers
apptainer pull docker://biocontainers/samtools:v1.9-4-deb_cv1`} />
        </div>

        <div className="space-y-3">
          <h3 className="font-semibold text-slate-700 text-sm">รันคำสั่งใน container</h3>
          <CodeBlock language="bash" code={`# รันคำสั่งเดียวใน container
apptainer exec ubuntu_22.04.sif python3 --version

# เข้า shell ของ container
apptainer shell ubuntu_22.04.sif

# bind mount directory จาก host เข้า container
apptainer exec --bind /home/$USER:/data ubuntu_22.04.sif bash`} />
        </div>

        <div className="space-y-3">
          <h3 className="font-semibold text-slate-700 text-sm">รัน container ด้วย GPU (--nv flag)</h3>
          <CodeBlock language="bash" code={`# ต้องเพิ่ม --nv เพื่อใช้ NVIDIA GPU ใน container
apptainer exec --nv pytorch_2.2.sif python3 train.py`} />
        </div>
      </section>

      <hr className="border-slate-100" />

      {/* ─── Nextflow ─── */}
      <section id="nextflow" className="space-y-4">
        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          <GitBranch size={18} className="text-teal-600" />
          Nextflow — Pipeline บน Slurm
        </h2>
        <p className="text-slate-600 text-sm">
          Nextflow รองรับ Slurm executor โดยตรง สามารถส่ง sub-job เข้าคิว Slurm ได้อัตโนมัติผ่าน <code className="bg-slate-100 px-1 rounded font-mono">nextflow.config</code>
        </p>

        <div className="space-y-3">
          <h3 className="font-semibold text-slate-700 text-sm">ตัวอย่าง nextflow.config สำหรับ Slurm</h3>
          <CodeBlock title="nextflow.config" language="bash" code={`process {
  executor = 'slurm'
  queue    = 'cpu'
  cpus     = 4
  memory   = '16 GB'
  time     = '4h'
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
        </div>

        <div className="space-y-3">
          <h3 className="font-semibold text-slate-700 text-sm">ส่ง Nextflow เป็น Batch Job</h3>
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
  --outdir $HOME/results/ \\
  -profile slurm \\
  -resume`} />
        </div>
      </section>

      <hr className="border-slate-100" />

      {/* ─── Dorado ─── */}
      <section id="dorado" className="space-y-4">
        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          <Dna size={18} className="text-green-600" />
          Dorado — Oxford Nanopore Basecalling
        </h2>
        <p className="text-slate-600 text-sm">
          Dorado เป็น basecaller สำหรับข้อมูล Oxford Nanopore sequencing รองรับ GPU เพื่อความเร็วสูง
          ต้องรันบน <code className="bg-slate-100 px-1 rounded font-mono">gpu</code> partition เท่านั้น
        </p>

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
          <Download size={16} className="text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-amber-800 text-sm">ต้องดาวน์โหลดโมเดลก่อนใช้งาน</p>
            <p className="text-amber-700 text-sm mt-1">Dorado ไม่ได้รวมโมเดลมาในระบบ ผู้ใช้ต้องดาวน์โหลดโมเดลที่ต้องการไปเก็บไว้ในพื้นที่ของตนเองก่อน</p>
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="font-semibold text-slate-700 text-sm">ดาวน์โหลดโมเดล</h3>
          <CodeBlock language="bash" code={`# ดาวน์โหลดโมเดลไปยัง $HOME/dorado_models
dorado download --model dna_r10.4.1_e8.2_400bps_hac@v5.0.0 --directory $HOME/dorado_models

# ดูรายการโมเดลที่มีทั้งหมด
dorado download --list`} />
        </div>

        <div className="space-y-3">
          <h3 className="font-semibold text-slate-700 text-sm">ตัวอย่าง Job Script</h3>
          <CodeBlock title="dorado_job.sh" language="bash" code={`#!/bin/bash
#SBATCH --job-name=dorado
#SBATCH --partition=gpu
#SBATCH --gres=gpu:1
#SBATCH --cpus-per-task=16
#SBATCH --mem=64G
#SBATCH --time=24:00:00
#SBATCH --output=%x_%j.out

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
        </div>
      </section>

      <hr className="border-slate-100" />

      {/* ─── RStudio ─── */}
      <section id="rstudio" className="space-y-4">
        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          <Monitor size={18} className="text-blue-700" />
          RStudio Server — R IDE ผ่าน OOD
        </h2>
        <p className="text-slate-600 text-sm">เข้าใช้ RStudio Server ผ่าน Open OnDemand โดยไม่ต้อง SSH</p>

        <div className="space-y-3">
          <div className="flex items-center gap-3 bg-blue-50 rounded-lg px-4 py-2.5">
            <span className="w-6 h-6 rounded-full bg-[#003087] text-white text-xs font-bold flex items-center justify-center flex-shrink-0">1</span>
            <span className="text-slate-700 text-sm">
              เข้าสู่ OOD ผ่าน{" "}
              <a href="https://odt-hpc.kku.ac.th" target="_blank" rel="noopener noreferrer"
                className="text-[#003087] font-semibold underline hover:text-[#F5A623] transition-colors">
                odt-hpc.kku.ac.th
              </a>{" "}
              แล้ว login ด้วย username/password
            </span>
          </div>

          <div className="flex items-center gap-3 bg-blue-50 rounded-lg px-4 py-2.5">
            <span className="w-6 h-6 rounded-full bg-[#003087] text-white text-xs font-bold flex items-center justify-center flex-shrink-0">2</span>
            <span className="text-slate-700 text-sm">เลือก <strong>Interactive Apps</strong> → <strong>RStudio Server</strong></span>
          </div>
          <div className="rounded-xl border border-slate-200 overflow-hidden shadow-sm">
            <img src="/images/image-2.1.png" alt="เลือก Interactive Apps → RStudio Server" className="w-full h-auto" />
          </div>

          <div className="flex items-center gap-3 bg-blue-50 rounded-lg px-4 py-2.5">
            <span className="w-6 h-6 rounded-full bg-[#003087] text-white text-xs font-bold flex items-center justify-center flex-shrink-0">3</span>
            <span className="text-slate-700 text-sm">กำหนดทรัพยากร: Partition, CPU, RAM, เวลาที่ต้องการ</span>
          </div>
          <div className="rounded-xl border border-slate-200 overflow-hidden shadow-sm">
            <img src="/images/image-19.png" alt="กำหนดทรัพยากร RStudio Session" className="w-full h-auto" />
          </div>

          <div className="flex items-center gap-3 bg-blue-50 rounded-lg px-4 py-2.5">
            <span className="w-6 h-6 rounded-full bg-[#003087] text-white text-xs font-bold flex items-center justify-center flex-shrink-0">4</span>
            <span className="text-slate-700 text-sm">กด <strong>Launch</strong> แล้วรอ session พร้อมใช้งาน</span>
          </div>

          <div className="flex items-center gap-3 bg-blue-50 rounded-lg px-4 py-2.5">
            <span className="w-6 h-6 rounded-full bg-[#003087] text-white text-xs font-bold flex items-center justify-center flex-shrink-0">5</span>
            <span className="text-slate-700 text-sm">กด <strong>Connect to RStudio Server</strong></span>
          </div>
        </div>
      </section>
    </div>
  );
}
