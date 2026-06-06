"use client";

import React, { useState } from "react";
import { Terminal, Copy, Check, MessageSquare, ShieldAlert, Sparkles, Sliders, HelpCircle, FileJson } from "lucide-react";
import { CodeBlock } from "@/components/CodeBlock";

export default function PromptsPage() {
  const [copiedIndex, setCopiedIndex] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(id);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const systemPrompt = `คุณคือผู้เชี่ยวชาญด้านระบบ HPC และ Slurm ที่จะช่วยฉันใช้งานระบบต่อไปนี้ได้อย่างถูกต้อง
ข้อมูลระบบ HPC:

Compute Node: 2 เครื่อง แต่ละเครื่องมี CPU 64 cores, RAM 503 GB, GPU NVIDIA A40 1 ตัว
Local Scratch: SSD ~6 TB ต่อ node ที่ /scratch (ลบอัตโนมัติเมื่องานจบ)
Home Directory: 300 GB quota ต่อ user ที่ /home
Job Scheduler: Slurm Workload Manager

Partitions ที่มี:
- cpu (วิ่งได้สูงสุด 7 วัน) สำหรับงาน CPU ทั่วไป
- gpu (วิ่งได้สูงสุด 3 วัน) สำหรับงาน AI/ML ที่ต้องการ GPU
- short (วิ่งได้สูงสุด 1 ชั่วโมง) สำหรับการทดสอบและ debug

กฎสำคัญของระบบ:
1. ห้ามรันโปรแกรมหนักบน Login Node ต้องใช้ sbatch หรือ srun เท่านั้น
2. ผลลัพธ์สำคัญต้องเซฟที่ /home เท่านั้น ข้อมูลใน /scratch จะหายหลังงานจบ
3. ควร output ไฟล์ไปที่ /home/%u/job-%j.out และ /home/%u/job-%j.err
4. ควรใช้ /scratch/$SLURM_JOB_ID/ สำหรับไฟล์ชั่วคราวระหว่างงาน แล้ว copy ผลลัพธ์กลับ /home ก่อนจบ

สิ่งที่ฉันต้องการจากคุณ:
1. เมื่อเขียน job script ให้อธิบายทุก parameter ที่เลือก พร้อมเหตุผล
2. หากต้องการข้อมูลเพิ่มเติมจากฉัน ให้ถามก่อนเขียน script
3. แจ้งเตือนหากคำขอของฉันมีความเสี่ยง เช่น ขอ RAM มากเกินไป หรือ script อาจ timeout
4. แนะนำ best practice เสมอ เช่น การใช้ /scratch, การทำ checkpoint

รับทราบระบบแล้วตอบว่า "พร้อมแล้ว" และรอคำถามจากฉัน`;

  const promptCategories = [
    {
      id: "cat-1",
      title: "กลุ่มที่ 1 — วิเคราะห์และประเมินทรัพยากรก่อนส่งงาน",
      desc: "เหมาะสำหรับผู้ใช้ที่ยังไม่แน่ใจว่างานคำนวณของตนเองควรขอ CPU, RAM หรือ GPU เท่าไรจึงจะเหมาะสมที่สุด",
      icon: Sparkles,
      color: "bg-orange-50 border-orange-200 text-orange-700",
      prompt: `ฉันต้องการรันโปรแกรม Python ที่ทำ [อธิบายงาน เช่น train neural network / วิเคราะห์ CSV ขนาด 10GB / จำลองข้อมูล 1 ล้านแถว] บนระบบ HPC ที่ใช้ Slurm โดยระบบมี Compute Node 2 เครื่อง แต่ละเครื่องมี CPU 64 cores, RAM 503 GB, GPU NVIDIA A40 และ partition ที่มีคือ cpu (max 7 วัน), gpu (max 3 วัน), short (max 1 ชม.) ช่วยแนะนำว่าควรขอทรัพยากรเท่าไหร่ และเขียน job script ให้ด้วย`,
    },
    {
      id: "cat-2",
      title: "กลุ่มที่ 2 — เขียน Job Script จากโค้ดที่มีอยู่แล้ว",
      desc: "เหมาะสำหรับผู้ใช้ที่มีโค้ดโปรแกรมเรียบร้อยแล้ว แต่ต้องการให้ AI สร้างไฟล์ sbatch script (.sh) ที่สมบูรณ์และถูกต้องสำหรับนำส่งเข้าคิวงาน",
      icon: Terminal,
      color: "bg-orange-50 border-orange-200 text-orange-700",
      prompt: `นี่คือ Python script ของฉัน:
[วางโค้ดโปรแกรมของคุณที่นี่]

ช่วยเขียน Slurm job script (sbatch) ให้หน่อย โดยระบบมีข้อมูลดังนี้ — CPU: 64 cores/node, RAM: 503 GB/node, GPU: NVIDIA A40, partitions: cpu/gpu/short ช่วยเลือก partition ที่เหมาะสม ประเมิน CPU, RAM, และเวลาที่ควรขอ พร้อมอธิบายเหตุผลด้วย`,
    },
    {
      id: "cat-3",
      title: "กลุ่มที่ 3 — แก้ปัญหาเมื่องานล้มเหลว (Failed) หรือมีพฤติกรรมผิดปกติ",
      desc: "เหมาะสำหรับนำข้อความผิดพลาดจาก log file หรือสถานะงานไปให้ AI ช่วยวิเคราะห์สาเหตุและเสนอแนวทางแก้ไขให้เร็วที่สุด",
      icon: ShieldAlert,
      color: "bg-orange-50 border-orange-200 text-orange-700",
      prompt: `งาน Slurm ของฉันมีปัญหา สถานะแสดงว่า [PENDING / FAILED / TIMEOUT / OUT_OF_MEMORY] 

นี่คือ error log: 
[วางข้อความในไฟล์ error log ที่นี่]

และนี่คือ job script ที่ใช้: 
[วางสคริปต์ส่งงานคิวที่นี่]

ช่วยวิเคราะห์ว่าเกิดจากอะไร และควรแก้ไขอย่างไร`,
    },
    {
      id: "cat-4",
      title: "กลุ่มที่ 4 — ปรับปรุงสคริปต์เพื่อให้ได้ประสิทธิภาพสูงสุดและประหยัดภาระงานคิว",
      desc: "เหมาะสำหรับควบคุมการจัดการทรัพยากรให้ไม่เกินโควตาและลดระยะเวลาการรันงาน อ้างอิงจากประวัติการทำงานจริง",
      icon: Sliders,
      color: "bg-orange-50 border-orange-200 text-orange-700",
      prompt: `ฉันมี job script นี้: 
[วางสคริปต์ส่งงานปัจจุบันของคุณที่นี่]

งานรันสำเร็จแต่ใช้เวลา [X ชั่วโมง] และคำสั่ง sacct บอกว่าใช้ RAM จริงแค่ [Y GB] จากที่ขอไว้ [Z GB] ช่วยแนะนำว่าควรปรับ --cpus-per-task, --mem, --time อย่างไรให้เหมาะสมขึ้น และมีวิธีทำให้งานเร็วขึ้นได้อีกไหม`,
    },
    {
      id: "cat-5",
      title: "กลุ่มที่ 5 — ตรวจสอบ Job Script ก่อนการนำส่งงานจริง",
      desc: "ใช้สำหรับตรวจสอบพารามิเตอร์ของ Slurm ว่าขัดต่อกฎของระบบ HPC หรือเขียนตกหล่นตรงจุดใดหรือไม่ เพื่อหลีกเลี่ยงกระบวนการรันงานล้มเหลวกระทันหัน",
      icon: HelpCircle,
      color: "bg-orange-50 border-orange-200 text-orange-700",
      prompt: `ช่วยตรวจสอบ job script นี้ก่อนที่ฉันจะ submit 
[วางสคริปต์ส่งงานปัจจุบันของคุณที่นี่]

มี parameter อะไรที่ผิด, ขาดหาย, หรือไม่เหมาะสมกับระบบบ้าง`,
    },
    {
      id: "cat-6",
      title: "กลุ่มที่ 6 — ออกแบบและวางแผนงานประเภทหลายขั้นตอน (Multi-step / Pipeline)",
      desc: "ช่วยลำดับขั้นตอนและเชื่อมโยงงานก่อนหลังอย่างเป็นระบบ (Job Dependency)",
      icon: FileJson,
      color: "bg-orange-50 border-orange-200 text-orange-700",
      prompt: `ฉันต้องการทำงาน 3 ขั้นตอนตามลำดับ: 
1) preprocess ข้อมูล
2) train model
3) evaluate ผลลัพธ์

ช่วยออกแบบว่าควรแยกเป็นกี่ job และเขียน script แต่ละอันอย่างไร`,
    },
  ];

  const taskPrompts = [
    {
      title: "เขียนสคริปต์ PyTorch (Train Model)",
      prompt: `เขียน script:
ฉันจะ train PyTorch model โดยใช้ dataset ขนาด 50 GB script ใช้เวลาประมาณ 10-12 ชั่วโมงในการทดสอบบนเครื่องตัวเอง ช่วยเขียน job script ให้หน่อย`,
    },
    {
      title: "วิเคราะห์และประเมินสเปคของงาน",
      prompt: `วิเคราะห์ทรัพยากร:
นี่คือ Python script ของฉัน [วางโค้ดโปรแกรมของคุณที่นี่] ฉันควรขอ CPU และ RAM เท่าไหร่ และควรใช้ partition ไหน`,
    },
    {
      title: "วิเคราะห์และแก้ไขปัญหาเมื่อรันล้มเหลว",
      prompt: `แก้ไขปัญหา:
งานของฉัน FAILED นี่คือ error log [วางข้อความ error ที่นี่] เกิดจากอะไร`,
    },
    {
      title: "ปรับแต่งพารามิเตอร์จากประวัติใช้งานจริง",
      prompt: `ปรับปรุง script:
sacct บอกว่างานของฉันใช้ RAM จริงแค่ 8 GB จากที่ขอไว้ 64 GB และใช้เวลา 45 นาที ควรปรับ script ยังไง [วางสคริปต์ที่นี่]`,
    },
    {
      title: "การจัดสรรงานสเกลใหญ่ด้วย Array Jobs",
      prompt: `ถาม best practice:
ฉันมี array job ที่ต้องรัน 100 ครั้ง แต่ละครั้งใช้ไฟล์ input ต่างกัน ควรออกแบบ script ยังไงดี`,
    },
  ];

  return (
    <div className="space-y-8 animate-fade-in-up">
      {/* Detail Header */}
      <div className="border-b border-orange-100 pb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="bg-orange-50 rounded-lg p-2">
            <MessageSquare size={22} className="text-[#C2612B]" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900">ตัวช่วยเขียนสคริปต์ AI (Prompt AI Templates)</h1>
        </div>
        <p className="text-slate-500 ml-12">
          เทมเพลต Prompt สำหรับนำไปแช็ตถาม AI (เช่น ChatGPT, Claude, Gemini) เพื่อนำมาประเมินทรัพยากรและช่วยเขียนหรือแก้ไข Slurm Job Script ของคุณอย่างสะดวกรวดเร็ว
        </p>
      </div>

      {/* STEP 1: Priming Prompt */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="bg-orange-600 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">1</span>
          <h2 className="text-xl font-bold text-slate-800">ขั้นตอนที่ 1 : สอน AI ให้เข้าใจระบบ (System Prime Prompt)</h2>
        </div>
        <div className="bg-orange-50/40 p-5 rounded-2xl border border-orange-100 space-y-4">
          <h3 className="font-semibold text-orange-950 text-sm">
            💡 แนะนำให้ผู้ใช้งาน คัดลอก Prompt ด้านล่างนี้ไปวางใน AI เป็นแช็ตแรก เพื่อแช็ตบอทจะได้รับบทบาทเป็นผู้เชี่ยวชาญ และจดจำสเปคทั้งหมดของ ODT-HPC KKU ได้อย่างแม่นยำ
          </h3>
          <div className="relative bg-white rounded-xl border border-orange-200 overflow-hidden shadow-sm">
            <div className="flex items-center justify-between px-4 py-2.5 bg-orange-100/50 border-b border-orange-200">
              <span className="text-xs font-semibold text-orange-800 font-mono">System_Context_Prompt.txt</span>
              <button
                onClick={() => handleCopy(systemPrompt, "system")}
                className="flex items-center gap-1.5 text-orange-700 hover:text-orange-900 text-xs font-medium px-2.5 py-1 rounded-md hover:bg-orange-100 transition-colors"
              >
                {copiedIndex === "system" ? (
                  <>
                    <Check size={13} className="text-green-600" />
                    <span className="text-green-700">คัดลอกแล้ว!</span>
                  </>
                ) : (
                  <>
                    <Copy size={13} />
                    <span>คัดลอก Prompt</span>
                  </>
                )}
              </button>
            </div>
            <pre className="text-slate-700 text-sm overflow-x-auto p-4 font-mono leading-relaxed max-h-64 whitespace-pre-wrap select-all">
              {systemPrompt}
            </pre>
          </div>
        </div>
      </section>

      {/* STEP 2: General Prompt Templates */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="bg-orange-600 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">2</span>
          <h2 className="text-xl font-bold text-slate-800">ขั้นตอนที่ 2 : เลือกสไตล์คำสั่ง AI จากหมวดหมู่งานของคุณ (Category Templates)</h2>
        </div>
        <p className="text-slate-600 text-sm">
          เมื่อ prime ระบบแล้ว คุณสามารถเลือก Copy และปรับแต่ง Prompt ด้านล่างนี้ เพื่อทำคำต้องการเฉพาะทางของคุณได้ทันที:
        </p>

        <div className="grid grid-cols-1 gap-6">
          {promptCategories.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <div key={item.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden hover:border-orange-200 transition-all">
                <div className="px-5 py-4 border-b border-slate-100 bg-orange-50/30 flex items-start gap-3">
                  <div className="bg-orange-50 rounded-xl p-2 mt-0.5 text-orange-600 border border-orange-100">
                    <IconComponent size={18} />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm sm:text-base">{item.title}</h3>
                    <p className="text-slate-500 text-xs sm:text-sm mt-0.5 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
                <div className="p-5 space-y-3">
                  <div className="relative bg-slate-50 rounded-xl border border-slate-200 p-4 font-mono text-slate-700 text-sm leading-relaxed whitespace-pre-wrap select-all">
                    {item.prompt}
                  </div>
                  <div className="flex justify-end">
                    <button
                      onClick={() => handleCopy(item.prompt, item.id)}
                      className="flex items-center gap-1.5 bg-[#C2612B] hover:bg-orange-700 text-white text-xs font-bold px-4 py-2.5 rounded-lg transition-all shadow-sm hover:shadow-md"
                    >
                      {copiedIndex === item.id ? (
                        <>
                          <Check size={14} />
                          <span>คัดลอกสำเร็จ!</span>
                        </>
                      ) : (
                        <>
                          <Copy size={14} />
                          <span>คัดลอก Prompt หมวดนี้</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* STEP 3: Task Specific Real Examples */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="bg-orange-600 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">3</span>
          <h2 className="text-xl font-bold text-slate-800">ตัวอย่างคำถามเคสจริง (Real-World Use Cases)</h2>
        </div>
        <p className="text-slate-600 text-sm">
          ตัวอย่างคำถามที่พบบ่อยในการทำงานจริงร่วมกับระบบ Slurm Scheduler ของผู้ขอทำงาน HPC:
        </p>

        <div className="space-y-4">
          {taskPrompts.map((task, idx) => {
            const taskId = `task-${idx}`;
            return (
              <div key={taskId} className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-slate-800 text-sm flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
                    {task.title}
                  </h4>
                  <button
                    onClick={() => handleCopy(task.prompt, taskId)}
                    className="flex items-center gap-1 text-xs text-orange-700 hover:text-orange-950 hover:underline font-semibold"
                  >
                    {copiedIndex === taskId ? (
                      <>
                        <Check size={12} className="text-green-600" />
                        <span className="text-green-600">ก๊อปปี้แล้ว</span>
                      </>
                    ) : (
                      <>
                        <Copy size={12} />
                        <span>คัดลอกตัวอย่าง</span>
                      </>
                    )}
                  </button>
                </div>
                <div className="bg-stone-50 rounded-lg p-3.5 border border-stone-200 text-slate-700 font-mono text-sm leading-relaxed whitespace-pre-wrap select-all">
                  {task.prompt}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
