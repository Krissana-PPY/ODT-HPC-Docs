อัพเดตข้อมูลให้ฉันที แก้ไข version 1.1 Testbeta ปรับปรุง มิถุนายน 2569
ช่วยอัพเดต Software & Environment ให้ฉันที
ฉันได้ติดตั้งและเพิ่ม Dorado 1.3.0+6ea400189
และช่วยอัพเดตเพิ่ม การส่งงาน (Submission) สำหรับ Dorado ให้ฉันด้วย
ขึ้นเตือนด้วยว่าควรดาวน์โหลดโมเดลที่ต้องคุณต้องการใช้เองเก็บไว้ที่พื้นที่ของตนเอง
คำสั่งตัวอย่างดาวน์โหลดโมเดลไปยัง directory ของตนเอง 
dorado download --model dna_r10.4.1_e8.2_400bps_hac@v5.0.0 --directory $HOME/dorado_models
ตัวอย่างการส่งงาน ตรวจสอบความถูกต้องและสามารถเพิ่มเติมความถูกต้องได้

#!/bin/bash
#SBATCH --job-name=dorado
#SBATCH --partition=gpu
#SBATCH --gres=gpu:1
#SBATCH --cpus-per-task=16
#SBATCH --mem=64G
#SBATCH --time=24:00:00
#SBATCH --output=%x_%j.out
#SBATCH --error=%x_%j.err

# ── 1. กำหนด path ──────────────────────────────────────────
# แก้ทั้ง 3 ค่านี้ให้ตรงกับข้อมูลของคุณ
INPUT="$HOME/data"          #ที่อยู่ของข้อมูล
OUTPUT="$HOME/results"      #ที่อยู่ของผลลัพธ์
MODEL="$HOME/dorado_models/dna_r10.4.1_e8.2_400bps_hac@v5.0.0"  #โมเดลที่เลือกใช้ของผู้ใช้งาน

# ── 2. เตรียม scratch (local SSD บน compute node) ─────────
# copy input ไปไว้ที่ scratch ก่อนเสมอ เพื่อความเร็ว
SCRATCH="/scratch/${USER}/${SLURM_JOB_ID}"
mkdir -p ${SCRATCH}
cp -r ${INPUT}/* ${SCRATCH}/

# สร้าง directory output หากยังไม่มี
# mkdir -p ${OUTPUT}

# ── 3. รัน basecalling ─────────────────────────────────────
dorado basecaller ${MODEL} ${SCRATCH} --device cuda:0 > ${SCRATCH}/calls.bam

# ── 4. เก็บผลลัพธ์กลับ $HOME ──────────────────────────────
# ต้อง copy กลับก่อน job จบ เพราะ scratch ไม่ได้ backup
cp ${SCRATCH}/calls.bam ${OUTPUT}/

# ── 5. ล้าง scratch ────────────────────────────────────────
rm -rf ${SCRATCH}

เพิ่ม ตัวอย่างสคริปต์ สำหรับ Dorado ให้ด้วย

อัพเดต Prompt AI สำหรับช่วยงานให้ฉันตามความเหมาะสมด้วย

อัพเดต README.md ให้ฉันด้วย