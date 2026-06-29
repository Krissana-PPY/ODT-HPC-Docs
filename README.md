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
| Version | 1.3 Test beta |
| ปรับปรุงล่าสุด | มิถุนายน 2569 |

---

## โครงสร้างโปรเจกต์

```
ODT-HPC-Docs/
├── hpc-docs/                  # Next.js Application
│   ├── app/                   # App Router pages
│   │   ├── page.tsx           # หน้าแรก (ภาพรวมระบบ)
│   │   ├── quick-start/       # เริ่มต้นใช้งานด่วน
│   │   ├── software/          # รายการซอฟต์แวร์ที่ติดตั้ง
│   │   ├── software-guides/   # คู่มือการใช้งานซอฟต์แวร์
│   │   ├── slurm-commands/    # คำสั่ง Slurm + การจัดการงาน
│   │   ├── job-submission/    # การส่งงาน (รวม /scratch)
│   │   ├── scratch/           # /scratch (backward compat)
│   │   ├── job-management/    # การจัดการงาน (backward compat)
│   │   ├── examples/          # ตัวอย่างสคริปต์
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
| `/software` | รายการซอฟต์แวร์ที่ติดตั้ง |
| `/software-guides` | คู่มือการใช้งาน (Miniconda, Apptainer, Nextflow, Dorado, RStudio) |
| `/slurm-commands` | คำสั่ง Slurm + การจัดการงาน (รวมกัน) |
| `/job-submission` | การส่งงาน (Batch, Interactive, GPU, MPI, Array, Conda, Apptainer, Nextflow, RStudio, Dorado) |
| `/examples` | ตัวอย่างสคริปต์ (Python CPU/GPU, Conda, Apptainer, Nextflow, Dorado) |
| `/prompts` | Prompt AI สำหรับช่วยใช้งาน HPC (10 กลุ่ม แยก งานทั่วไป / ซอฟต์แวร์เฉพาะ) |

---

## ลิงก์สำหรับ Docs

| ช่องทาง | URL |
|---|---|
| คู่มือการใช้งาน (Docs) | https://odt-hpc-docs.kku.ac.th |
| ขอใช้บริการ HPC Server | https://kku.world/4rql5x |
| ขอโปรแกรม / ขอเพิ่มพื้นที่ | https://kku.world/sbqzt4 |

---