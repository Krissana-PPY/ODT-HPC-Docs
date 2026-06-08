import { Database, AlertTriangle, CheckCircle, ArrowRight } from "lucide-react";
import { CodeBlock } from "@/components/CodeBlock";

export default function ScratchPage() {
  return (
    <div className="space-y-8 animate-fade-in-up">
      <div className="border-b border-slate-200 pb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="bg-yellow-100 rounded-lg p-2"><Database size={22} className="text-[#F5A623]" /></div>
          <h1 className="text-2xl font-bold text-slate-900">การใช้งาน /scratch</h1>
        </div>
        <p className="text-slate-500 ml-12">พื้นที่จัดเก็บ I/O เร็ว SSD สำหรับงานที่กำลังรัน</p>
      </div>

      <section>
        <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
          <span className="text-[#003087]">6.</span> /scratch คืออะไร?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { icon: <CheckCircle size={18} className="text-green-500" />, title: "เร็วกว่า /home", desc: "SSD ความเร็วสูง เหมาะสำหรับ I/O หนัก" },
            { icon: <CheckCircle size={18} className="text-green-500" />, title: "พื้นที่ขนาดใหญ่", desc: "~6 TB ต่อ Compute Node" },
            { icon: <AlertTriangle size={18} className="text-orange-500" />, title: "ข้อมูลชั่วคราว", desc: "ข้อมูลจะถูกลบหลังงานเสร็จสิ้น" },
            { icon: <AlertTriangle size={18} className="text-orange-500" />, title: "ต้องบันทึกกลับ", desc: "ต้องคัดลอกผลลัพธ์กลับ /home ก่อนงานจบ" },
          ].map((item, i) => (
            <div key={i} className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm flex items-start gap-3">
              {item.icon}
              <div>
                <div className="font-semibold text-slate-800 text-sm">{item.title}</div>
                <div className="text-slate-600 text-sm mt-0.5">{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-slate-800">วิธีใช้ /scratch ในสคริปต์งาน</h2>
        <CodeBlock title="scratch_job.sh" language="bash" code={`#!/bin/bash

#SBATCH --job-name=scratch-job
#SBATCH --output=/home/%u/scratch-%j.out
#SBATCH --partition=cpu
#SBATCH --cpus-per-task=4
#SBATCH --mem=8G
#SBATCH --time=02:00:00

# สร้างโฟลเดอร์ส่วนตัวใน /scratch
SCRATCH_DIR=/scratch/$USER/$SLURM_JOB_ID
mkdir -p $SCRATCH_DIR

# คัดลอกข้อมูลไปยัง /scratch
cp -r /home/$USER/large_dataset.csv $SCRATCH_DIR/

# เปลี่ยนไปยัง /scratch เพื่อทำงาน
cd $SCRATCH_DIR

# รันโปรแกรม (I/O จะเร็วมาก!)
python3 /home/$USER/script.py large_dataset.csv output.csv

# คัดลอกผลลัพธ์กลับ /home ก่อนงานจบ
cp -r $SCRATCH_DIR/output.csv /home/$USER/results/

# ลบ /scratch หลังเสร็จ (ทำความสะอาด)
rm -rf $SCRATCH_DIR`} />

        <div className="alert-warning flex items-start gap-3">
          <AlertTriangle size={18} className="text-orange-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-orange-800 text-sm">ข้อควรระวัง</p>
            <p className="text-orange-700 text-sm mt-1">ต้องคัดลอกผลลัพธ์กลับ <code className="bg-orange-100 px-1 rounded">/home</code> ก่อนสคริปต์จบ มิฉะนั้นข้อมูลจะหายถาวร</p>
          </div>
        </div>
      </section>
    </div>
  );
}
