<script>
	import { page } from '$app/stores';
	import { sections } from '$lib/data/content.js';
	import CodeBlock from '$lib/components/CodeBlock.svelte';

	$: slug = $page.params.slug;
	$: currentSection = sections.find((s) => s.slug === slug);

	// Navigation helpers
	$: currentIndex = sections.findIndex((s) => s.slug === slug);
	$: prevSection = currentIndex > 0 ? sections[currentIndex - 1] : null;
	$: nextSection = currentIndex < sections.length - 1 ? sections[currentIndex + 1] : null;

	// Image base URL - served by backend
	const imageBase = '/api-images';
</script>

<svelte:head>
	<title>{currentSection ? currentSection.title : slug} - HPC Cluster คู่มือการใช้งาน</title>
</svelte:head>

{#if !currentSection}
	<div class="max-w-3xl mx-auto px-6 py-20 text-center">
		<div class="text-6xl mb-4">🔍</div>
		<h1 class="text-2xl font-bold text-gray-800">ไม่พบหน้านี้</h1>
		<p class="text-gray-500 mt-2">ไม่พบเนื้อหาสำหรับ: <code>{slug}</code></p>
		<a href="/" class="mt-6 inline-block text-primary-600 hover:underline">← กลับหน้าแรก</a>
	</div>
{:else if slug === 'intro'}
	<div class="max-w-4xl mx-auto px-6 py-10">
		<div class="mb-8">
			<h1>1. บทนำ</h1>
			<p>
				ยินดีต้อนรับสู่ระบบ <strong>HPC (High-Performance Computing) Cluster</strong>
				ระบบนี้ช่วยให้คุณรันงานคำนวณที่ต้องการทรัพยากร CPU, RAM, หรือ GPU สูง
				แทนที่จะรันโปรแกรมบนคอมพิวเตอร์ส่วนตัว คุณส่ง <em>"งาน (job)"</em> ไปยัง Cluster
				และระบบจะจัดสรรทรัพยากรที่เหมาะสมให้โดยอัตโนมัติ
			</p>
		</div>

		<h2 id="overview">1.1 ภาพรวมของระบบ (Overview)</h2>
		<div class="overflow-x-auto mb-6">
			<table>
				<thead>
					<tr>
						<th>ส่วนประกอบ</th>
						<th>รายละเอียด</th>
					</tr>
				</thead>
				<tbody>
					<tr><td>Compute Nodes</td><td>เซิร์ฟเวอร์ 2 เครื่อง แต่ละเครื่องมี CPU 64 คอร์, RAM 503 GB, GPU NVIDIA A40</td></tr>
					<tr><td>Local Scratch</td><td>SSD เร็วประมาณ 6 TB ต่อ Compute Node ที่ /scratch</td></tr>
					<tr><td>Job Scheduler</td><td>Slurm Workload Manager</td></tr>
					<tr><td>โควตาผู้ใช้</td><td>300 GB ต่อผู้ใช้ (home directory)</td></tr>
				</tbody>
			</table>
		</div>

		<div class="my-6">
			<img src="{imageBase}/Image (1).png" alt="ภาพรวมระบบ HPC Cluster"
				class="w-full rounded-lg border border-gray-200 shadow-sm" />
			<p class="text-center text-sm text-gray-500 mt-2">รูปภาพที่ 1: ภาพรวมระบบ HPC Cluster</p>
		</div>

		<h2 id="partitions">1.2 พาร์ติชัน (คิวงาน)</h2>
		<p>งานจะถูกส่งไปยัง "พาร์ติชัน" ซึ่งกำหนดเวลาสูงสุดและทรัพยากรที่ใช้ได้:</p>
		<div class="overflow-x-auto mb-6">
			<table>
				<thead>
					<tr>
						<th>พาร์ติชัน</th>
						<th>เวลาสูงสุด</th>
						<th>ค่าเริ่มต้น</th>
						<th>ใช้สำหรับ</th>
					</tr>
				</thead>
				<tbody>
					<tr><td><code>cpu</code></td><td>7 วัน</td><td>✅ ใช่</td><td>งาน CPU ทั่วไป</td></tr>
					<tr><td><code>gpu</code></td><td>3 วัน</td><td>❌ ไม่ใช่</td><td>งาน GPU (AI/ML)</td></tr>
					<tr><td><code>short</code></td><td>1 ชั่วโมง</td><td>❌ ไม่ใช่</td><td>ทดสอบและดีบัก</td></tr>
				</tbody>
			</table>
		</div>

		<h2 id="rules">1.3 กฎสำคัญ</h2>
		<div class="warning-box">
			<p class="font-semibold text-amber-800 mb-2">⚠️ กฎสำคัญที่ต้องปฏิบัติ:</p>
			<ul class="text-amber-700 space-y-1 list-none pl-0 mb-0">
				<li>🚫 <strong>ห้ามรันโปรแกรมหนักบน Login Node</strong> โดยตรง ให้ใช้ Slurm (sbatch/srun) เสมอ</li>
				<li>💾 บันทึกผลลัพธ์สำคัญไว้ที่ <code>/home</code> เท่านั้น ข้อมูลใน <code>/scratch</code> จะถูกลบหลังงานสิ้นสุด</li>
				<li>📊 โควตา Home Directory คือ 300 GB ตรวจสอบการใช้งานด้วย: <code>du -sh /home/$USER</code></li>
				<li>⏰ เมื่องานถึงเวลาสูงสุด Slurm จะหยุดงานนั้น ให้บันทึก checkpoint สำหรับงานที่ใช้เวลานาน</li>
				<li>🔒 ห้ามเข้าถึงหรือแก้ไขไฟล์ของผู้ใช้คนอื่น</li>
			</ul>
		</div>
	</div>

{:else if slug === 'quickstart'}
	<div class="max-w-4xl mx-auto px-6 py-10">
		<h1>2. เริ่มต้นใช้งานด่วน (Quick Start)</h1>

		<h2 id="ood">2.1 เข้าสู่ระบบผ่าน Open OnDemand (OOD)</h2>
		<ol class="list-decimal list-inside space-y-2 mb-4">
			<li>เปิดเบราว์เซอร์ไปที่: <a href="https://klpdindaeng-ood.kku.ac.th" target="_blank" rel="noreferrer">https://klpdindaeng-ood.kku.ac.th</a></li>
			<li>ล็อคอินด้วย Username และ Password ของตนเอง</li>
			<li>เมื่อเข้าสู่ OOD ให้ไปยัง <strong>Files &gt; Home Directory</strong></li>
		</ol>

		<div class="my-6">
			<img src="{imageBase}/image (2).png" alt="Open OnDemand หน้าหลัก"
				class="w-full rounded-lg border border-gray-200 shadow-sm" />
			<p class="text-center text-sm text-gray-500 mt-2">รูปภาพที่ 2: หน้า Open OnDemand</p>
		</div>

		<div class="info-box">
			<p class="font-semibold text-blue-800 mb-2">สถานะของ Node:</p>
			<ul class="text-blue-700 text-sm space-y-1 list-none pl-0 mb-0">
				<li>🟢 <code>idle</code> = ว่าง</li>
				<li>🟡 <code>mix</code> = ใช้งานบางส่วน</li>
				<li>🔴 <code>alloc</code> = ใช้งานเต็ม</li>
				<li>⚫ <code>down</code> = ไม่พร้อมใช้งาน</li>
			</ul>
		</div>

		<p>สมมุติว่างานของ User อยู่ที่ Directory <code>my_lab</code> ทำการสร้างงาน เลือก <strong>Jobs &gt; Job Composer</strong></p>

		<div class="my-6">
			<img src="{imageBase}/image (3).png" alt="Job Composer"
				class="w-full rounded-lg border border-gray-200 shadow-sm" />
			<p class="text-center text-sm text-gray-500 mt-2">รูปภาพที่ 3: Job Composer</p>
		</div>

		<p>เลือก <strong>New Job &gt; From Default Template</strong></p>

		<div class="my-6">
			<img src="{imageBase}/image (4).png" alt="New Job Template"
				class="w-full rounded-lg border border-gray-200 shadow-sm" />
			<p class="text-center text-sm text-gray-500 mt-2">รูปภาพที่ 4: New Job from Default Template</p>
		</div>

		<p>Script location คือ Directory ที่จะเริ่มทำงาน และ Script name คือไฟล์หลักที่จะใช้งาน เลือก <strong>Edit Files</strong></p>

		<div class="my-6">
			<img src="{imageBase}/image (5).png" alt="Edit Files"
				class="w-full rounded-lg border border-gray-200 shadow-sm" />
			<p class="text-center text-sm text-gray-500 mt-2">รูปภาพที่ 5: Edit Files</p>
		</div>

		<p>เลือก <strong>Upload</strong> ไฟล์หรือโฟลเดอร์งานของตนเอง</p>

		<div class="my-6">
			<img src="{imageBase}/image (6).png" alt="Upload Files"
				class="w-full rounded-lg border border-gray-200 shadow-sm" />
			<p class="text-center text-sm text-gray-500 mt-2">รูปภาพที่ 6: Upload ไฟล์</p>
		</div>

		<p>กลับไปยัง Jobs เพื่อแก้ไข <code>main_job.sh</code> อยู่ด้านขวาล่าง</p>

		<div class="my-6">
			<img src="{imageBase}/image (7).png" alt="Edit main_job.sh"
				class="w-full rounded-lg border border-gray-200 shadow-sm" />
			<p class="text-center text-sm text-gray-500 mt-2">รูปภาพที่ 7: แก้ไข main_job.sh</p>
		</div>

		<p>ทดสอบไฟล์โดยใช้ partition <code>short</code> แก้ไขและกด Save:</p>

		<CodeBlock
			title="main_job.sh"
			lang="bash"
			code={`#!/bin/bash

#SBATCH --job-name=python_slurm_test   # ตั้งชื่อโปรเจกต์งาน
#SBATCH --output=output_%j.txt         # ไฟล์บันทึก Log ผลลัพธ์ (%j คือเลข Job ID)
#SBATCH --error=error_%j.txt           # ไฟล์บันทึกข้อผิดพลาด (ถ้ามี)
#SBATCH --partition=short              # เลือกกลุ่มเครื่องคำนวณ
#SBATCH --nodes=1                      # ขอใช้งานจำนวน 1 Node
#SBATCH --ntasks=1                     # จำนวนกระบวนการหลัก (Task)
#SBATCH --cpus-per-task=1              # ขอหัวประมวลผล (CPU Core) 1 หัวต่องาน
#SBATCH --mem=2G                       # ขอใช้หน่วยความจำ (RAM) ขนาด 2 GB
#SBATCH --time=00:10:00                # กำหนดเวลาวิ่งสูงสุด ชั่วโมง:นาที:วินาที

# พิมพ์คำสั่งที่ต้องการรันด้านล่างนี้
python3 --version
python3 my_script.py`}
		/>

		<div class="my-6">
			<img src="{imageBase}/image (8).png" alt="Save Script"
				class="w-full rounded-lg border border-gray-200 shadow-sm" />
			<p class="text-center text-sm text-gray-500 mt-2">รูปภาพที่ 8: บันทึก Script</p>
		</div>

		<p>กด <strong>Submit</strong> จะได้ไฟล์ผลลัพธ์ออกมาดังนี้:</p>

		<div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
			<div>
				<img src="{imageBase}/image (9).png" alt="Submit Job"
					class="w-full rounded-lg border border-gray-200 shadow-sm" />
				<p class="text-center text-sm text-gray-500 mt-2">รูปภาพที่ 9: Submit Job</p>
			</div>
			<div>
				<img src="{imageBase}/image (10).png" alt="Job Result"
					class="w-full rounded-lg border border-gray-200 shadow-sm" />
				<p class="text-center text-sm text-gray-500 mt-2">รูปภาพที่ 10: ผลลัพธ์งาน</p>
			</div>
		</div>

		<p>ตรวจสอบงานทั้งหมดของตนเองเลือก <strong>Job &gt; Active Jobs</strong> เพื่อดูรายละเอียด</p>

		<h2 id="jupyterhub">2.2 เข้าสู่ระบบผ่าน JupyterHub</h2>
		<ol class="list-decimal list-inside space-y-2 mb-4">
			<li>เปิดเบราว์เซอร์ไปที่: <a href="https://klpdindaeng-jpt.kku.ac.th" target="_blank" rel="noreferrer">https://klpdindaeng-jpt.kku.ac.th</a></li>
			<li>เข้าสู่ระบบด้วย Username และ Password ของตนเอง</li>
			<li>JupyterHub จะเริ่ม Jupyter Notebook บน Compute Node อัตโนมัติ</li>
			<li>คุณสามารถเขียนและรันโค้ด Python ได้โดยตรงในเบราว์เซอร์</li>
		</ol>
		<div class="info-box">
			<p class="text-blue-700 mb-0">🎯 JupyterHub จะได้: partition <code>cpu</code>, 4 CPUs, 8 GB RAM, 8 ชม.</p>
		</div>

		<h2 id="ssh">2.3 เข้าสู่ระบบผ่าน SSH</h2>
		<p>Secure Shell (SSH) ผ่าน Terminal หรือโปรแกรมต่าง ๆ เช่น PowerShell, PuTTY, MobaXterm หรือ ใช้ผ่าน Jupyter Terminal</p>

		<h3>เข้าผ่าน cmd หรือ PowerShell</h3>
		<CodeBlock lang="bash" code={`# รูปแบบ:
ssh [Username]@klpdindaeng-ood.kku.ac.th

# ตัวอย่าง:
ssh user1@klpdindaeng-ood.kku.ac.th`} />
		<p class="text-sm text-gray-600">ถ้าเข้าใช้งานครั้งแรกจะมีการถาม fingerprint ให้ตอบ <code>yes</code></p>

		<h3>เข้าผ่าน PuTTY</h3>
		<div class="my-4">
			<img src="{imageBase}/image (11).png" alt="PuTTY"
				class="w-full max-w-lg rounded-lg border border-gray-200 shadow-sm" />
			<p class="text-sm text-gray-500 mt-2">รูปภาพที่ 11: การตั้งค่า PuTTY</p>
		</div>

		<h3>เข้าผ่าน MobaXterm</h3>
		<div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
			<div>
				<img src="{imageBase}/image (12).png" alt="MobaXterm 1"
					class="w-full rounded-lg border border-gray-200 shadow-sm" />
				<p class="text-center text-sm text-gray-500 mt-2">รูปภาพที่ 12</p>
			</div>
			<div>
				<img src="{imageBase}/image (13).png" alt="MobaXterm 2"
					class="w-full rounded-lg border border-gray-200 shadow-sm" />
				<p class="text-center text-sm text-gray-500 mt-2">รูปภาพที่ 13</p>
			</div>
		</div>

		<h3>เข้าผ่าน Jupyter Terminal</h3>
		<div class="my-4">
			<img src="{imageBase}/image (14).png" alt="Jupyter Terminal"
				class="w-full rounded-lg border border-gray-200 shadow-sm" />
			<p class="text-sm text-gray-500 mt-2">รูปภาพที่ 14: Jupyter Terminal</p>
		</div>

		<p>เข้าไปยัง Directory งานของคุณพร้อมสร้างไฟล์ Script ทดสอบโดยใช้ partition <code>cpu</code></p>

		<CodeBlock
			title="job_test.sh"
			lang="bash"
			code={`#!/bin/bash

#SBATCH --job-name=my-job            # ชื่องาน
#SBATCH --output=/home/%u/job-%j.out # ไฟล์ผลลัพธ์ (%u=username, %j=jobid)
#SBATCH --error=/home/%u/job-%j.err  # ไฟล์ error
#SBATCH --partition=cpu              # พาร์ติชัน (cpu/gpu/short)
#SBATCH --nodes=1                    # จำนวน node
#SBATCH --ntasks=1                   # จำนวน task
#SBATCH --cpus-per-task=4            # CPU ต่อ task
#SBATCH --mem=8G                     # หน่วยความจำ
#SBATCH --time=02:00:00              # เวลาสูงสุด (HH:MM:SS)

# คำสั่งของคุณด้านล่าง
echo "Job started at $(date)"
python3 my_script.py
echo "Job finished at $(date)"`}
		/>

		<CodeBlock lang="bash" code={`# ส่งงาน
sbatch job_test.sh

# ตรวจสอบดูสถานะ
squeue -u Username`} />

		<div class="my-6">
			<img src="{imageBase}/image (15).png" alt="SSH Job Submit"
				class="w-full rounded-lg border border-gray-200 shadow-sm" />
			<p class="text-center text-sm text-gray-500 mt-2">รูปภาพที่ 15: การส่งงานผ่าน SSH</p>
		</div>

		<h3>สำหรับคำสั่งง่ายๆ ใช้ srun โดยตรง:</h3>
		<CodeBlock lang="bash" code={`srun --partition=short python3 my_script.py
srun --partition=gpu --gres=gpu:1 python3 train.py
srun --partition=cpu --cpus-per-task=8 --mem=16G ./my_program`} />

		<h2 id="filetransfer">2.4 การโอนย้ายไฟล์</h2>
		<p>ใช้ FileZilla, WinSCP, หรือคำสั่ง <code>scp</code> ในการโอนย้ายไฟล์:</p>

		<CodeBlock lang="bash" code={`# อัพโหลดไฟล์ไปยัง HPC
scp myfile.txt Username@klpdindaeng-ood.kku.ac.th:/home/Username/

# ดาวน์โหลดไฟล์จาก HPC
scp Username@klpdindaeng-ood.kku.ac.th:/home/Username/result.csv ./`} />

		<h3>การตั้งค่า FileZilla / WinSCP</h3>
		<div class="overflow-x-auto">
			<table>
				<thead>
					<tr><th>การตั้งค่า</th><th>ค่า</th></tr>
				</thead>
				<tbody>
					<tr><td>Protocol</td><td>SFTP</td></tr>
					<tr><td>Host</td><td>IP Address HPC</td></tr>
					<tr><td>Port</td><td>22</td></tr>
					<tr><td>Username</td><td>ชื่อผู้ใช้งานของคุณ</td></tr>
					<tr><td>Password</td><td>รหัสผ่านของคุณ</td></tr>
				</tbody>
			</table>
		</div>
	</div>

{:else if slug === 'software'}
	<div class="max-w-4xl mx-auto px-6 py-10">
		<h1>3. Software & Environment</h1>
		<p>รายการ Software และเวอร์ชันที่ติดตั้งในระบบ HPC Cluster:</p>
		<div class="overflow-x-auto">
			<table>
				<thead>
					<tr><th>Software</th><th>เวอร์ชัน</th></tr>
				</thead>
				<tbody>
					<tr><td>NVIDIA Driver</td><td>595.71.05</td></tr>
					<tr><td>CUDA</td><td>13.2</td></tr>
					<tr><td>JupyterHub</td><td>5.4.6</td></tr>
					<tr><td>JupyterLab</td><td>4.x</td></tr>
					<tr><td>Python</td><td>3.9.25</td></tr>
					<tr><td>Node.js</td><td>16.20.2</td></tr>
					<tr><td>Open OnDemand</td><td>3.1</td></tr>
				</tbody>
			</table>
		</div>
	</div>

{:else if slug === 'slurm'}
	<div class="max-w-4xl mx-auto px-6 py-10">
		<h1>4. คำสั่ง Slurm พื้นฐาน</h1>

		<h2 id="commands">4.1 คำสั่งที่จำเป็น</h2>
		<div class="overflow-x-auto mb-6">
			<table>
				<thead>
					<tr><th>คำสั่ง</th><th>คำอธิบาย</th><th>ตัวอย่าง</th></tr>
				</thead>
				<tbody>
					<tr><td><code>sinfo</code></td><td>แสดงสถานะ Cluster</td><td><code>sinfo</code></td></tr>
					<tr><td><code>squeue</code></td><td>แสดงคิวงาน</td><td><code>squeue -u $USER</code></td></tr>
					<tr><td><code>sbatch</code></td><td>ส่งงาน Batch</td><td><code>sbatch my_job.sh</code></td></tr>
					<tr><td><code>srun</code></td><td>รันคำสั่งแบบ Interactive</td><td><code>srun --partition=short hostname</code></td></tr>
					<tr><td><code>scancel</code></td><td>ยกเลิกงาน</td><td><code>scancel 123</code></td></tr>
					<tr><td><code>sacct</code></td><td>แสดงประวัติงาน</td><td><code>sacct -u $USER</code></td></tr>
				</tbody>
			</table>
		</div>

		<h2 id="cluster-status">4.2 ตรวจสอบสถานะ Cluster</h2>
		<CodeBlock lang="bash" code={`sinfo`} />
		<div class="info-box">
			<p class="font-semibold text-blue-800 mb-2">สถานะ Node:</p>
			<ul class="text-blue-700 text-sm list-none pl-0 mb-0 space-y-1">
				<li>🟢 <code>idle</code> = ว่าง</li>
				<li>🟡 <code>mix</code> = ใช้งานบางส่วน</li>
				<li>🔴 <code>alloc</code> = ใช้งานเต็ม</li>
				<li>⚫ <code>down</code> = ไม่พร้อมใช้งาน</li>
			</ul>
		</div>

		<h2 id="job-status">4.3 ตรวจสอบงานของคุณ</h2>
		<CodeBlock lang="bash" code={`# งานที่กำลังรันและรอคิว
squeue -u $USER

# งานที่เสร็จสิ้นแล้ว
sacct --format=JobID,JobName,State,Elapsed,MaxRSS`} />
	</div>

{:else if slug === 'job-submission'}
	<div class="max-w-4xl mx-auto px-6 py-10">
		<h1>5. การส่งงาน (Job Submission)</h1>

		<h2 id="batch">5.1 งาน Batch (ใช้บ่อยที่สุด)</h2>
		<p>สร้างไฟล์สคริปต์แล้วส่งงาน งานจะรันในพื้นหลัง</p>

		<h3>ขั้นตอนที่ 1: สร้างไฟล์สคริปต์งาน</h3>
		<CodeBlock
			title="my_job.sh"
			lang="bash"
			code={`#!/bin/bash

#SBATCH --job-name=my-job                   # ชื่องาน
#SBATCH --output=/home/my_lab/%u/job-%j.out # ไฟล์ผลลัพธ์(%u=username, %j=jobid)
#SBATCH --error=/home/my_lab/%u/job-%j.err  # ไฟล์ error
#SBATCH --partition=cpu                     # พาร์ติชัน (cpu/gpu/short)
#SBATCH --nodes=1                           # จำนวน node
#SBATCH --ntasks=1                          # จำนวน task
#SBATCH --cpus-per-task=4                   # CPU ต่อ task
#SBATCH --mem=8G                            # หน่วยความจำ
#SBATCH --time=02:00:00                     # เวลาสูงสุด (HH:MM:SS)

# คำสั่งของคุณด้านล่าง
echo "Job started at $(date)"
python3 my_script.py
echo "Job finished at $(date)"`}
		/>

		<h3>ขั้นตอนที่ 2: ส่งงาน</h3>
		<CodeBlock lang="bash" code={`sbatch my_job.sh`} />

		<h3>ขั้นตอนที่ 3: ตรวจสอบสถานะ</h3>
		<CodeBlock lang="bash" code={`squeue -u $USER`} />

		<h3>ขั้นตอนที่ 4: ดูผลลัพธ์</h3>
		<CodeBlock lang="bash" code={`cat /home/$USER/job-*.out`} />

		<h2 id="interactive">5.2 งาน Interactive (สำหรับทดสอบ)</h2>
		<p>รับ Shell บน Compute Node โดยตรง:</p>
		<CodeBlock lang="bash" code={`srun --partition=short --time=00:30:00 --cpus-per-task=4 --mem=8G --pty bash

# ตอนนี้คุณอยู่บน Compute Node รันคำสั่งได้ตามปกติ
# พิมพ์ 'exit' เมื่อเสร็จสิ้น`} />

		<h2 id="gpu">5.3 งาน GPU</h2>
		<p>เพื่อใช้ GPU NVIDIA A40 ให้เพิ่ม <code>--partition=gpu</code> และ <code>--gres=gpu:1</code>:</p>
		<CodeBlock
			title="gpu_job.sh"
			lang="bash"
			code={`#!/bin/bash

#SBATCH --job-name=gpu-job
#SBATCH --output=/home/%u/gpu-%j.out
#SBATCH --partition=gpu
#SBATCH --gres=gpu:1                 # ขอ GPU 1 ตัว
#SBATCH --cpus-per-task=4
#SBATCH --mem=16G
#SBATCH --time=08:00:00

nvidia-smi                           # ตรวจสอบว่า GPU พร้อมใช้งาน
python3 train_model.py`}
		/>

		<h2 id="multinode">5.4 งาน Multi-Node (MPI)</h2>
		<CodeBlock
			title="mpi_job.sh"
			lang="bash"
			code={`#!/bin/bash

#SBATCH --job-name=mpi-job
#SBATCH --output=/home/%u/mpi-%j.out
#SBATCH --partition=cpu
#SBATCH --nodes=2                    # ใช้ 2 nodes
#SBATCH --ntasks-per-node=4          # 4 tasks ต่อ node
#SBATCH --time=04:00:00

srun ./my_mpi_program`}
		/>

		<h2 id="array">5.5 Array Job (รันสคริปต์เดิมหลายครั้ง)</h2>
		<CodeBlock
			title="array_job.sh"
			lang="bash"
			code={`#!/bin/bash

#SBATCH --job-name=array-job
#SBATCH --output=/home/%u/array-%A_%a.out
#SBATCH --array=1-10                 # รัน 10 ครั้ง (index 1-10)
#SBATCH --partition=cpu
#SBATCH --cpus-per-task=2
#SBATCH --mem=4G
#SBATCH --time=01:00:00

echo "Task $SLURM_ARRAY_TASK_ID"
python3 process.py --input data_\${SLURM_ARRAY_TASK_ID}.csv`}
		/>
	</div>

{:else if slug === 'scratch'}
	<div class="max-w-4xl mx-auto px-6 py-10">
		<h1>6. การใช้งาน /scratch เพื่อ I/O เร็ว</h1>
		<p>
			<code>/scratch</code> คือ SSD เร็วในแต่ละ Compute Node (~6 TB) ใช้สำหรับข้อมูลชั่วคราวที่ต้องการอ่าน/เขียนเร็ว
		</p>
		<div class="warning-box">
			<p class="text-amber-800 mb-0">⚠️ <strong>ข้อมูลใน /scratch จะถูกลบอัตโนมัติเมื่องานสิ้นสุด</strong></p>
		</div>

		<h3>ตัวอย่าง: คัดลอกข้อมูลไปยัง scratch ประมวลผล แล้วคัดลอกผลลัพธ์กลับ:</h3>
		<CodeBlock
			title="scratch_job.sh"
			lang="bash"
			code={`#!/bin/bash

#SBATCH --job-name=scratch-example
#SBATCH --partition=cpu
#SBATCH --cpus-per-task=4
#SBATCH --mem=8G
#SBATCH --time=02:00:00

# สร้าง scratch directory สำหรับงานนี้
SCRATCH_DIR=/scratch/$SLURM_JOB_ID
mkdir -p $SCRATCH_DIR

# คัดลอก input ไปยัง scratch (SSD เร็ว)
cp /home/$USER/large_dataset.csv $SCRATCH_DIR/

# ประมวลผลบน scratch (เร็วกว่า NFS มาก)
cd $SCRATCH_DIR
python3 /home/$USER/process.py large_dataset.csv output.csv

# คัดลอกผลลัพธ์กลับมา home
cp $SCRATCH_DIR/output.csv /home/$USER/results/

# ทำความสะอาด
rm -rf $SCRATCH_DIR`}
		/>
	</div>

{:else if slug === 'examples'}
	<div class="max-w-4xl mx-auto px-6 py-10">
		<h1>7. ตัวอย่างสคริปต์งานสมบูรณ์</h1>

		<h2 id="python-analysis">7.1 การวิเคราะห์ข้อมูลด้วย Python</h2>
		<CodeBlock
			title="python_analysis.sh"
			lang="bash"
			code={`#!/bin/bash

#SBATCH --job-name=python-analysis
#SBATCH --output=/home/%u/analysis-%j.out
#SBATCH --partition=cpu
#SBATCH --cpus-per-task=8
#SBATCH --mem=32G
#SBATCH --time=04:00:00

python3 << 'PYTHON'
import numpy as np
import pandas as pd

data = pd.read_csv('/home/myuser/data.csv')
result = data.groupby('category').mean()
result.to_csv('/home/myuser/result.csv')
print('วิเคราะห์เสร็จสิ้น!')
PYTHON`}
		/>

		<h2 id="pytorch-gpu">7.2 การฝึก PyTorch บน GPU</h2>
		<CodeBlock
			title="pytorch_train.sh"
			lang="bash"
			code={`#!/bin/bash

#SBATCH --job-name=pytorch-train
#SBATCH --output=/home/%u/train-%j.out
#SBATCH --partition=gpu
#SBATCH --gres=gpu:1
#SBATCH --cpus-per-task=8
#SBATCH --mem=32G
#SBATCH --time=1-00:00:00

python3 << 'PYTHON'
import torch

print(f'CUDA available: {torch.cuda.is_available()}')
print(f'GPU: {torch.cuda.get_device_name(0)}')

model = torch.nn.Linear(100, 10).cuda()
x = torch.randn(32, 100).cuda()
output = model(x)
print(f'Output shape: {output.shape}')
print('ฝึกโมเดลเสร็จสิ้น!')
PYTHON`}
		/>

		<h2 id="multi-step">7.3 สคริปต์ Python หลายไฟล์ในงานเดียว</h2>
		<CodeBlock
			title="multi_step.sh"
			lang="bash"
			code={`#!/bin/bash

#SBATCH --job-name=multi-step
#SBATCH --output=/home/%u/multi-%j.out
#SBATCH --partition=cpu
#SBATCH --cpus-per-task=4
#SBATCH --mem=16G
#SBATCH --time=04:00:00

echo 'ขั้นตอนที่ 1: Preprocessing...'
python3 /home/$USER/scripts/preprocess.py

echo 'ขั้นตอนที่ 2: วิเคราะห์...'
python3 /home/$USER/scripts/analyze.py

echo 'ขั้นตอนที่ 3: สร้างรายงาน...'
python3 /home/$USER/scripts/report.py

echo 'เสร็จสิ้นทุกขั้นตอน!'`}
		/>

		<h2 id="single-cmd">7.4 รันคำสั่งเดียว</h2>
		<p>สำหรับคำสั่งง่ายๆ ใช้ srun โดยตรง:</p>
		<CodeBlock lang="bash" code={`srun --partition=short python3 my_script.py
srun --partition=gpu --gres=gpu:1 python3 train.py
srun --partition=cpu --cpus-per-task=8 --mem=16G ./my_program`} />
	</div>

{:else if slug === 'job-management'}
	<div class="max-w-4xl mx-auto px-6 py-10">
		<h1>8. การจัดการงาน</h1>

		<h2 id="cancel">8.1 ยกเลิกงาน</h2>
		<CodeBlock lang="bash" code={`scancel 12345                # ยกเลิกงานที่ระบุ
scancel -u $USER             # ยกเลิกงานทั้งหมดของคุณ`} />

		<h2 id="view-output">8.2 ดูผลลัพธ์งาน (ขณะกำลังรัน)</h2>
		<CodeBlock lang="bash" code={`tail -f /home/$USER/job-12345.out`} />

		<h2 id="job-details">8.3 ดูรายละเอียดงานที่เสร็จแล้ว</h2>
		<CodeBlock lang="bash" code={`sacct -j 12345 --format=JobID,JobName,State,Elapsed,MaxRSS,ExitCode`} />

		<div class="info-box mt-4">
			<p class="font-semibold text-blue-800 mb-2">สถานะงาน:</p>
			<ul class="text-blue-700 text-sm list-none pl-0 mb-0 space-y-1">
				<li>✅ <code>COMPLETED</code> = เสร็จสมบูรณ์</li>
				<li>❌ <code>FAILED</code> = เกิดข้อผิดพลาด (ตรวจสอบไฟล์ .err)</li>
				<li>⏰ <code>TIMEOUT</code> = ถึงเวลาสูงสุด (เพิ่ม --time)</li>
				<li>🚫 <code>CANCELLED</code> = คุณหรือ Admin ยกเลิก</li>
				<li>💾 <code>OUT_OF_ME+</code> = ใช้ RAM เกินที่ขอ (เพิ่ม --mem)</li>
			</ul>
		</div>

		<h2 id="disk-usage">8.4 ตรวจสอบการใช้งานดิสก์</h2>
		<CodeBlock lang="bash" code={`du -sh /home/$USER              # การใช้งานรวม
du -sh /home/$USER/*            # การใช้งานต่อโฟลเดอร์`} />
	</div>

{:else if slug === 'tips'}
	<div class="max-w-4xl mx-auto px-6 py-10">
		<h1>9. เคล็ดลับและแนวทางปฏิบัติที่ดี</h1>

		<div class="bg-green-50 border border-green-300 rounded-xl p-6 mb-8">
			<h3 class="text-green-800 font-semibold mt-0 mb-3">✅ แนวทางที่แนะนำ:</h3>
			<ul class="text-green-700 space-y-2 list-none pl-0 mb-0">
				<li>📊 ขอเฉพาะทรัพยากรที่ต้องการจริงๆ การขอเกินจะบล็อกผู้ใช้คนอื่น</li>
				<li>🧪 ใช้ <code>--partition=short</code> สำหรับการทดสอบ งานสั้นจะเริ่มได้เร็วกว่า</li>
				<li>💨 ใช้ <code>/scratch</code> สำหรับข้อมูลชั่วคราวระหว่างการคำนวณ ไม่ใช่ <code>/home</code></li>
				<li>💾 บันทึก checkpoint สำหรับงานที่รันนาน กรณีที่ timeout</li>
				<li>🔍 ตรวจสอบไฟล์ผลลัพธ์ (.out/.err) เมื่องานล้มเหลว</li>
				<li>📈 ใช้ <code>sacct</code> เพื่อดูว่างานของคุณใช้ RAM จริงเท่าไร แล้วปรับ <code>--mem</code> ให้เหมาะสม</li>
				<li>🗑️ ทำความสะอาดไฟล์ผลลัพธ์เก่าเพื่อประหยัดพื้นที่ดิสก์</li>
				<li>🔢 ใช้ Array Job แทนการส่งงานแยกจำนวนมาก</li>
			</ul>
		</div>

		<h2 id="time-format">9.1 ตารางรูปแบบเวลา</h2>
		<div class="overflow-x-auto">
			<table>
				<thead>
					<tr><th>รูปแบบ</th><th>ระยะเวลา</th></tr>
				</thead>
				<tbody>
					<tr><td><code>00:30:00</code></td><td>30 นาที</td></tr>
					<tr><td><code>02:00:00</code></td><td>2 ชั่วโมง</td></tr>
					<tr><td><code>1-00:00:00</code></td><td>1 วัน</td></tr>
					<tr><td><code>7-00:00:00</code></td><td>7 วัน</td></tr>
				</tbody>
			</table>
		</div>

		<h2 id="mem-format">9.2 ตารางรูปแบบหน่วยความจำ</h2>
		<div class="overflow-x-auto">
			<table>
				<thead>
					<tr><th>รูปแบบ</th><th>ปริมาณ</th></tr>
				</thead>
				<tbody>
					<tr><td><code>1G</code></td><td>1 GB</td></tr>
					<tr><td><code>500M</code></td><td>500 MB</td></tr>
					<tr><td><code>16G</code></td><td>16 GB</td></tr>
					<tr><td><code>64G</code></td><td>64 GB</td></tr>
				</tbody>
			</table>
		</div>

		<h2 id="env-vars">9.3 ตัวแปร Environment ของ Slurm</h2>
		<p>ภายในสคริปต์งาน ตัวแปรเหล่านี้พร้อมใช้งาน:</p>
		<div class="overflow-x-auto">
			<table>
				<thead>
					<tr><th>ตัวแปร</th><th>คำอธิบาย</th></tr>
				</thead>
				<tbody>
					<tr><td><code>$SLURM_JOB_ID</code></td><td>หมายเลข Job ID ที่ไม่ซ้ำกัน</td></tr>
					<tr><td><code>$SLURM_JOB_NAME</code></td><td>ชื่องานที่คุณระบุ</td></tr>
					<tr><td><code>$SLURM_CPUS_PER_TASK</code></td><td>จำนวน CPU ที่จัดสรร</td></tr>
					<tr><td><code>$SLURM_MEM_PER_NODE</code></td><td>หน่วยความจำที่จัดสรร</td></tr>
					<tr><td><code>$SLURM_ARRAY_TASK_ID</code></td><td>ดัชนี Array Task (สำหรับ Array Jobs)</td></tr>
					<tr><td><code>$USER</code></td><td>ชื่อผู้ใช้งานของคุณ</td></tr>
				</tbody>
			</table>
		</div>
	</div>
{/if}

<!-- Navigation buttons -->
<div class="max-w-4xl mx-auto px-6 pb-12">
	<div class="border-t border-gray-200 pt-8 flex justify-between items-center">
		{#if prevSection}
			<a
				href="/docs/{prevSection.slug}"
				class="flex items-center gap-2 text-primary-600 hover:text-primary-800 no-underline group"
			>
				<svg class="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
				</svg>
				<span class="text-sm">{prevSection.title}</span>
			</a>
		{:else}
			<div></div>
		{/if}

		{#if nextSection}
			<a
				href="/docs/{nextSection.slug}"
				class="flex items-center gap-2 text-primary-600 hover:text-primary-800 no-underline group"
			>
				<span class="text-sm">{nextSection.title}</span>
				<svg class="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
				</svg>
			</a>
		{:else}
			<div></div>
		{/if}
	</div>
</div>
