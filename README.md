# ODT-HPC Docs

เว็บแอปพลิเคชันคู่มือการใช้งานระบบ HPC (High-Performance Computing) พัฒนาด้วย Next.js + Tailwind CSS รองรับทั้ง Desktop และ Mobile

---

## 🖥️ ภาพรวมโปรเจกต์

| รายการ | รายละเอียด |
|---|---|
| Framework | Next.js (App Router) |
| Styling | Tailwind CSS |
| Language | TypeScript |
| Deploy | Docker + Nginx |
| HPC Platform | Slurm Workload Manager |

---

## 📁 โครงสร้างโปรเจกต์

```
ODT-HPC-Docs/
├── hpc-docs/                  # Next.js Application
│   ├── app/                   # App Router pages
│   │   ├── page.tsx           # หน้าแรก (ภาพรวมระบบ)
│   │   ├── quick-start/       # เริ่มต้นใช้งานด่วน
│   │   ├── software/          # Software & Environment
│   │   ├── slurm-commands/    # คำสั่ง Slurm
│   │   ├── job-submission/    # การส่งงาน
│   │   ├── scratch/           # การใช้งาน /scratch
│   │   ├── examples/          # ตัวอย่างสคริปต์
│   │   ├── job-management/    # การจัดการงาน
│   │   └── prompts/           # Prompt AI helper
│   ├── components/
│   │   ├── Navbar.tsx         # Navigation bar (gradient orange→yellow)
│   │   ├── Sidebar.tsx        # Sidebar with subtopics + quick links
│   │   ├── CodeBlock.tsx      # Syntax-highlighted code blocks
│   │   └── ZoomableImage.tsx  # Clickable zoom modal for images
│   ├── lib/
│   │   └── utils.ts           # Utility functions
│   ├── styles/
│   │   └── globals.css        # Global CSS (Tailwind + custom classes)
│   ├── public/
│   │   └── images/            # รูปภาพประกอบคู่มือ (image-2.png – image-18.png)
│   ├── nginx/                 # Nginx config for Docker deploy
│   ├── Dockerfile
│   ├── docker-compose.yml
│   └── package.json
├── image/                     # Source images (original)
├── confix1.md                 # Spec/Change log 1
├── confix2.md                 # Spec/Change log 2
└── README.md                  # คู่มือนี้
```

---

## 🚀 การรันโปรเจกต์

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


## 📋 หน้าต่างๆ ในระบบ

| Path | หัวข้อ |
|---|---|
| `/` | บทนำและภาพรวมระบบ HPC |
| `/quick-start` | เริ่มต้นใช้งานด่วน (OOD, JupyterHub, SSH) |
| `/software` | Software & Environment Modules |
| `/slurm-commands` | คำสั่ง Slurm พื้นฐาน |
| `/job-submission` | การส่งงาน (Batch, Interactive, GPU, MPI, Array) |
| `/scratch` | การใช้งาน /scratch (SSD Local Storage) |
| `/examples` | ตัวอย่างสคริปต์ (Python, PyTorch, R) |
| `/job-management` | การจัดการงาน (squeue, scancel, quota) |
| `/prompts` | Prompt AI สำหรับช่วยใช้งาน HPC |

---

## 🔗 ลิงก์สำหรับ Docs

| ช่องทาง | URL |
|---|---|
| คู่มือการใช้งาน (Docs) | https://odt-hpc-docs.kku.ac.th |
---

