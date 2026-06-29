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

## Changelog

### v1.3 Test beta (มิถุนายน 2569)
- รวม Slurm Commands + Job Management เป็นหน้าเดียว (`/slurm-commands`) ส่วน 4.1–4.7
- แยกคู่มือการใช้งานซอฟต์แวร์ออกเป็นหน้าใหม่ `/software-guides` (Miniconda, Apptainer, Nextflow, Dorado, RStudio Server)
- หน้า `/software` แสดงเฉพาะตารางซอฟต์แวร์ พร้อมลิงก์ "ดูคู่มือ" ไปยัง `/software-guides`
- หน้า `/scratch` เพิ่มกล่องเตือนสีแดงชัดเจนว่าไม่สามารถเข้าถึงได้จาก Login Node
- หน้า `/prompts` แบ่งหมวด Prompt เป็น 2 กลุ่ม: งานทั่วไป (1–6) และซอฟต์แวร์เฉพาะ (7–10)
- คู่มือ RStudio Server: เพิ่มภาพประกอบขั้นตอน (image-2.1, image-19) และลิงก์ไปยัง odt-hpc.kku.ac.th
- แก้ไข Hydration Error ใน Sidebar ด้วย mounted pattern
- เพิ่ม `suppressHydrationWarning` ใน layout สำหรับ browser extension compatibility
- Sidebar: เพิ่มหัวข้อ "คู่มือการใช้งานซอฟต์แวร์" ในกลุ่ม ซอฟต์แวร์

### v1.2 Test beta (มิถุนายน 2569)
- เพิ่มซอฟต์แวร์ใหม่: Miniconda conda 26.3.2, Apptainer 1.5.1, CUDA Toolkit 12.6, Nextflow 26.04.4, RStudio Server 2026.04.0
- เพิ่มคู่มือการใช้งานซอฟต์แวร์แต่ละตัว
- Sidebar แบ่งเป็น 4 กลุ่มหัวข้อ
- เพิ่ม Job Submission sections 5.6–5.10 (Conda, Apptainer, Nextflow, RStudio, Dorado)
- เพิ่มตัวอย่างสคริปต์ 7.4–7.8
- เพิ่ม Prompt AI หมวดที่ 8–10 (Conda, Apptainer, Nextflow)
- อัปเดต System Context Prompt ให้ครอบคลุมซอฟต์แวร์ใหม่

### v1.1 Test beta (มิถุนายน 2569)
- เพิ่ม Dorado 1.3.0 ในรายการซอฟต์แวร์
- เพิ่ม Job Submission section 5.6 สำหรับ Dorado Basecalling
- เพิ่มตัวอย่างสคริปต์ 7.5 Dorado
- เพิ่ม Prompt AI หมวดที่ 7 (Dorado)
