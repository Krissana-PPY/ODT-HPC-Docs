import { Package, CheckCircle, Dna, Box, FlaskConical, GitBranch, Monitor } from "lucide-react";
import { CodeBlock } from "@/components/CodeBlock";

export default function SoftwarePage() {
  const software = [
    { name: "NVIDIA Driver",    version: "595.71.05",           category: "system" },
    { name: "CUDA",             version: "13.2",                category: "system" },
    { name: "CUDA Toolkit",     version: "12.6",                category: "system" },
    { name: "Open OnDemand",    version: "3.1",                 category: "system" },
    { name: "Node.js",          version: "16.20.2",             category: "system" },
    { name: "Python",           version: "3.9.25",              category: "lang" },
    { name: "Miniconda",        version: "conda 26.3.2",        category: "lang" },
    { name: "RStudio Server",   version: "2026.04.0",           category: "lang" },
    { name: "JupyterHub",       version: "5.4.6",               category: "interactive" },
    { name: "JupyterLab",       version: "4.x",                 category: "interactive" },
    { name: "Apptainer",        version: "1.5.1",               category: "container" },
    { name: "Nextflow",         version: "26.04.4",             category: "workflow" },
    { name: "Dorado",           version: "1.3.0+6ea400189",     category: "bio" },
  ];

  const categoryLabel: Record<string, { label: string; color: string }> = {
    system:      { label: "System",      color: "bg-slate-100 text-slate-700" },
    lang:        { label: "Language",    color: "bg-blue-100 text-blue-800" },
    interactive: { label: "Interactive", color: "bg-yellow-100 text-yellow-800" },
    container:   { label: "Container",   color: "bg-indigo-100 text-indigo-800" },
    workflow:    { label: "Workflow",    color: "bg-teal-100 text-teal-800" },
    bio:         { label: "Bio",         color: "bg-green-100 text-green-800" },
  };

  return (
    <div className="space-y-10 animate-fade-in-up">
      <div className="border-b border-slate-200 pb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="bg-purple-100 rounded-lg p-2">
            <Package size={22} className="text-[#6B21A8]" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Software & Environment</h1>
        </div>
        <p className="text-slate-500 ml-12">ซอฟต์แวร์และสภาพแวดล้อมที่ติดตั้งบนระบบ HPC</p>
      </div>

      {/* ─── Software Table ─── */}
      <section id="installed">
        <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
          <span className="text-[#003087]">3.</span> ซอฟต์แวร์ที่ติดตั้ง
        </h2>
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <table className="docs-table">
            <thead>
              <tr>
                <th>Software</th>
                <th>เวอร์ชัน</th>
                <th>ประเภท</th>
                <th>สถานะ</th>
              </tr>
            </thead>
            <tbody>
              {software.map((sw) => {
                const cat = categoryLabel[sw.category];
                return (
                  <tr key={sw.name}>
                    <td className="font-medium text-slate-800">{sw.name}</td>
                    <td>
                      <code className="bg-purple-100 text-purple-800 px-2 py-0.5 rounded font-mono text-sm">
                        {sw.version}
                      </code>
                    </td>
                    <td>
                      <span className={`inline-block px-2 py-0.5 rounded text-xs font-semibold ${cat.color}`}>
                        {cat.label}
                      </span>
                    </td>
                    <td>
                      <span className="inline-flex items-center gap-1 text-green-600 font-medium text-sm">
                        <CheckCircle size={13} /> พร้อมใช้งาน
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* ─── Miniconda Guide ─── */}
      <section id="miniconda" className="space-y-4">
        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          <FlaskConical size={18} className="text-blue-600" />
          คู่มือ Miniconda — สร้าง Environment ใน HOME
        </h2>
        <p className="text-slate-600 text-sm">
          Miniconda ช่วยให้ผู้ใช้แต่ละคนสร้าง Python/R environment ของตนเองได้โดยไม่ต้องรอผู้ดูแลระบบ
          Environment จะถูกเก็บใน <code className="bg-slate-100 px-1 rounded font-mono">$HOME</code> ของตนเอง
        </p>

        <div className="space-y-3">
          <h3 className="font-semibold text-slate-700 text-sm">สร้าง conda environment ใหม่</h3>
          <CodeBlock language="bash" code={`# สร้าง environment ชื่อ myenv พร้อม Python 3.11
conda create -n myenv python=3.11 -y

# เปิดใช้งาน environment
conda activate myenv

# ติดตั้งแพ็กเกจต่างๆ
conda install numpy pandas scikit-learn -y
pip install torch torchvision  # หรือใช้ pip ได้เช่นกัน

# ดู environment ที่มีทั้งหมด
conda env list

# ปิด environment
conda deactivate`} />
        </div>

        <div className="space-y-3">
          <h3 className="font-semibold text-slate-700 text-sm">ใช้ conda environment ใน Job Script</h3>
          <CodeBlock language="bash" code={`#!/bin/bash
#SBATCH --job-name=conda-job
#SBATCH --partition=cpu
#SBATCH --cpus-per-task=4
#SBATCH --mem=16G
#SBATCH --time=02:00:00
#SBATCH --output=%x_%j.out

# เปิดใช้งาน conda ก่อนเสมอใน script
source $HOME/miniconda3/etc/profile.d/conda.sh
conda activate myenv

python3 my_analysis.py`} />
        </div>

        <div className="alert-info flex items-start gap-3">
          <FlaskConical size={16} className="text-blue-600 flex-shrink-0 mt-0.5" />
          <p className="text-blue-700 text-sm">
            Environment และแพ็กเกจทั้งหมดถูกเก็บใน <code className="bg-blue-100 px-1 rounded font-mono">$HOME/miniconda3/envs/</code> ซึ่งนับรวมเป็น quota ของ /home (300 GB)
          </p>
        </div>
      </section>

      {/* ─── Apptainer Guide ─── */}
      <section id="apptainer" className="space-y-4">
        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          <Box size={18} className="text-indigo-600" />
          คู่มือ Apptainer — รัน Container บน HPC
        </h2>
        <p className="text-slate-600 text-sm">
          Apptainer (เดิมชื่อ Singularity) คือระบบ container สำหรับ HPC ที่ปลอดภัยกว่า Docker
          รองรับการรัน container จาก Docker Hub, BioContainers, และ SIF image
        </p>

        <div className="space-y-3">
          <h3 className="font-semibold text-slate-700 text-sm">ดึง container จาก Docker Hub</h3>
          <CodeBlock language="bash" code={`# ดึง container จาก Docker Hub มาเป็นไฟล์ .sif (ทำบน Login Node ได้)
apptainer pull docker://ubuntu:22.04
apptainer pull docker://python:3.11-slim

# ดึงจาก BioContainers
apptainer pull docker://biocontainers/samtools:latest`} />
        </div>

        <div className="space-y-3">
          <h3 className="font-semibold text-slate-700 text-sm">รัน container แบบ interactive</h3>
          <CodeBlock language="bash" code={`# รันคำสั่งเดียวใน container
apptainer exec ubuntu_22.04.sif python3 --version

# เข้า shell ของ container
apptainer shell ubuntu_22.04.sif

# bind mount directory จาก host เข้า container
apptainer exec --bind /home/$USER:/data ubuntu_22.04.sif bash`} />
        </div>

        <div className="space-y-3">
          <h3 className="font-semibold text-slate-700 text-sm">รัน container ด้วย GPU</h3>
          <CodeBlock language="bash" code={`# เพิ่ม --nv เพื่อใช้ NVIDIA GPU ใน container
apptainer exec --nv pytorch_2.2.sif python3 train.py`} />
        </div>
      </section>

      {/* ─── Bioinformatics Tools ─── */}
      <section id="bio-tools" className="space-y-4">
        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          <Dna size={18} className="text-green-600" />
          Bioinformatics Tools
        </h2>
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="bg-green-50 px-5 py-3 border-b border-green-100">
            <p className="text-green-800 text-sm font-medium">เครื่องมือสำหรับงานชีวสารสนเทศ</p>
          </div>
          <div className="p-5 space-y-4">
            <div className="flex items-start gap-4">
              <div className="bg-green-100 rounded-xl p-3 flex-shrink-0">
                <Dna size={22} className="text-green-700" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 flex-wrap">
                  <h3 className="font-bold text-slate-800">Oxford Nanopore Dorado</h3>
                  <code className="bg-green-100 text-green-800 px-2 py-0.5 rounded font-mono text-xs">1.3.0+6ea400189</code>
                </div>
                <p className="text-slate-600 text-sm mt-1.5">Basecaller สำหรับข้อมูล Oxford Nanopore sequencing รองรับ GPU</p>
                <div className="mt-3 bg-amber-50 border border-amber-200 rounded-lg px-4 py-3">
                  <p className="text-amber-800 text-xs font-semibold mb-1">สำคัญ: โมเดลต้องดาวน์โหลดเอง</p>
                  <p className="text-amber-700 text-xs">
                    ดาวน์โหลดโมเดลก่อนใช้งาน:{" "}
                    <code className="bg-amber-100 px-1 rounded font-mono">dorado download --model dna_r10.4.1_e8.2_400bps_hac@v5.0.0 --directory $HOME/dorado_models</code>
                  </p>
                </div>
              </div>
            </div>

            <hr className="border-slate-100" />

            <div className="flex items-start gap-4">
              <div className="bg-teal-100 rounded-xl p-3 flex-shrink-0">
                <GitBranch size={22} className="text-teal-700" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 flex-wrap">
                  <h3 className="font-bold text-slate-800">Nextflow</h3>
                  <code className="bg-teal-100 text-teal-800 px-2 py-0.5 rounded font-mono text-xs">26.04.4</code>
                </div>
                <p className="text-slate-600 text-sm mt-1.5">Workflow manager สำหรับงาน bioinformatics pipeline รองรับ Slurm executor โดยตรง</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── RStudio / Workflow info ─── */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          <Monitor size={18} className="text-blue-700" />
          RStudio Server
        </h2>
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-2">
          <div className="flex items-center gap-3 flex-wrap">
            <h3 className="font-bold text-slate-800">RStudio Server</h3>
            <code className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded font-mono text-xs">2026.04.0</code>
          </div>
          <p className="text-slate-600 text-sm">IDE สำหรับภาษา R สามารถเข้าใช้งานผ่าน Open OnDemand (OOD) ได้โดยไม่ต้อง SSH ดูวิธีส่งงานได้ที่หน้าการส่งงาน section RStudio</p>
        </div>
      </section>

      <div className="alert-info flex items-start gap-3">
        <Package size={16} className="text-blue-600 flex-shrink-0 mt-0.5" />
        <div>
          <p className="font-semibold text-blue-800 text-sm">ต้องการโปรแกรมเพิ่มเติม?</p>
          <p className="text-blue-700 text-sm mt-1">
            หากต้องการติดตั้งซอฟต์แวร์เพิ่มเติมหรือขอเพิ่มพื้นที่การใช้งาน
            กรุณากรอกแบบฟอร์มที่{" "}
            <a href="https://kku.world/sbqzt4" target="_blank" rel="noopener noreferrer" className="underline font-medium">
              kku.world/sbqzt4
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
