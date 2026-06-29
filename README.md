# ODT-HPC Docs

เว็บแอปพลิเคชันคู่มือการใช้งานระบบ HPC (High-Performance Computing) พัฒนาด้วย Next.js + Tailwind CSS รองรับทั้ง Desktop และ Mobile

---

## ภาพรวมโปรเจกต์

| รายการ | รายละเอียด |
|---|---|
| Framework | Next.js (App Router) |
| Styling | Tailwind CSS |
| Language | TypeScript |
| Deploy | Docker + Nginx |
| HPC Platform | Slurm Workload Manager |
| Version | 1.2 Test beta |
| ปรับปรุงล่าสุด | มิถุนายน 2569 |

---

## โครงสร้างโปรเจกต์

```
ODT-HPC-Docs/
├── hpc-docs/                  # Next.js Application
│   ├── app/                   # App Router pages
│   │   ├── page.tsx           # หน้าแรก (ภาพรวมระบบ)
│   │   ├── quick-start/       # เริ่มต้นใช้งานด่วน
│   │   ├── software/          # Software & Environment + Usage Guides
│   │   ├── slurm-commands/    # คำสั่ง Slurm
│   │   ├── job-submission/    # การส่งงาน (รวม /scratch)
│   │   ├── scratch/           # /scratch (redirect ไว้ backward compat)
│   │   ├── examples/          # ตัวอย่างสคริปต์
│   │   ├── job-management/    # การจัดการงาน
│   │   └── prompts/           # Prompt AI helper
│   ├── components/
│   │   ├── Navbar.tsx         # Navigation bar (gradient orange→yellow)
│   │   ├── Sidebar.tsx        # Sidebar แบบ grouped (4 กลุ่ม)
│   │   ├── CodeBlock.tsx      # Syntax-highlighted code blocks
│   │   └── ZoomableImage.tsx  # Clickable zoom modal for images
│   ├── lib/
│   │   └── utils.ts
│   ├── styles/
│   │   └── globals.css
│   ├── public/
│   │   └── images/
│   ├── nginx/
│   ├── Dockerfile
│   ├── docker-compose.yml
│   └── package.json
├── image/
├── confix.md
├── confix1.md
├── confix2.md
└── README.md
```

---

## การรันโปรเจกต์

### วิธีที่ 1: รันด้วย npm (Development)

```bash
cd hpc-docs
npm install
npm run dev
```

เปิดเบราว์เซอร์ที่ http://localhost:3000

### วิธีที่ 2: Build แบบ Production

```bash
cd hpc-docs
npm install
npm run build
npm start
```

### วิธีที่ 3: Docker (Production-ready)

```bash
cd hpc-docs
docker-compose up -d
```

---

## หน้าต่างๆ ในระบบ

| Path | หัวข้อ |
|---|---|
| `/` | บทนำและภาพรวมระบบ HPC |
| `/quick-start` | เริ่มต้นใช้งานด่วน (OOD, JupyterHub, SSH) |
| `/software` | Software & Environment + Guides (Miniconda, Apptainer, Dorado, Nextflow) |
| `/slurm-commands` | คำสั่ง Slurm พื้นฐาน |
| `/job-submission` | การส่งงาน (Batch, Interactive, GPU, MPI, Array, Conda, Apptainer, Nextflow, RStudio, Dorado) |
| `/scratch` | การใช้งาน /scratch (ยังคงอยู่เพื่อ backward compat) |
| `/examples` | ตัวอย่างสคริปต์ (Python, GPU, Conda, Apptainer, Nextflow, Dorado) |
| `/job-management` | การจัดการงาน (squeue, scancel, quota) |
| `/prompts` | Prompt AI สำหรับช่วยใช้งาน HPC (10 กลุ่ม) |

---

## ลิงก์สำหรับ Docs

| ช่องทาง | URL |
|---|---|
| คู่มือการใช้งาน (Docs) | https://odt-hpc-docs.kku.ac.th |
| ขอใช้บริการ HPC Server | https://kku.world/4rql5x |
| ขอโปรแกรม / ขอเพิ่มพื้นที่ | https://kku.world/sbqzt4 |

---

## Changelog

### v1.2 Test beta (มิถุนายน 2569)
- เพิ่มซอฟต์แวร์: Miniconda (conda 26.3.2), Apptainer 1.5.1, CUDA Toolkit 12.6, Nextflow 26.04.4, RStudio Server 2026.04.0
- เพิ่ม Usage Guides สำหรับ Miniconda และ Apptainer ใน Software page
- ปรับโครงสร้าง Sidebar เป็น 4 กลุ่ม (เริ่มต้น, ซอฟต์แวร์, Slurm, ตัวอย่าง)
- ย้ายเนื้อหา /scratch เข้า Job Submission page
- เพิ่ม Job Submission: Conda, Apptainer, Nextflow, RStudio Server (5.6–5.10)
- เพิ่มตัวอย่างสคริปต์: Conda, Apptainer, Nextflow (7.4–7.7)
- เพิ่ม Prompt AI กลุ่ม 8–10: Conda, Apptainer, Nextflow
- อัปเดต System Prompt ครอบคลุมซอฟต์แวร์ทั้งหมด

### v1.1 Testbeta (มิถุนายน 2569)
- เพิ่ม Dorado 1.3.0+6ea400189 ใน Software & Environment
- เพิ่ม Dorado Basecalling ใน Job Submission, Examples, Prompt AI
- อัปเดต System Prompt ครอบคลุม Bioinformatics tools
