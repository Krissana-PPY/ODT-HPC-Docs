// HPC User Guide Content Data
export const sections = [
	{
		id: 'intro',
		title: '1. บทนำ',
		slug: 'intro',
		subsections: [
			{ id: 'overview', title: '1.1 ภาพรวมของระบบ', slug: 'overview' },
			{ id: 'partitions', title: '1.2 พาร์ติชัน (คิวงาน)', slug: 'partitions' },
			{ id: 'rules', title: '1.3 กฎสำคัญ', slug: 'rules' }
		]
	},
	{
		id: 'quickstart',
		title: '2. เริ่มต้นใช้งานด่วน',
		slug: 'quickstart',
		subsections: [
			{ id: 'ood', title: '2.1 Open OnDemand (OOD)', slug: 'ood' },
			{ id: 'jupyterhub', title: '2.2 JupyterHub', slug: 'jupyterhub' },
			{ id: 'ssh', title: '2.3 SSH', slug: 'ssh' },
			{ id: 'filetransfer', title: '2.4 การโอนย้ายไฟล์', slug: 'filetransfer' }
		]
	},
	{
		id: 'software',
		title: '3. Software & Environment',
		slug: 'software',
		subsections: []
	},
	{
		id: 'slurm',
		title: '4. คำสั่ง Slurm พื้นฐาน',
		slug: 'slurm',
		subsections: [
			{ id: 'commands', title: '4.1 คำสั่งที่จำเป็น', slug: 'commands' },
			{ id: 'cluster-status', title: '4.2 ตรวจสอบสถานะ Cluster', slug: 'cluster-status' },
			{ id: 'job-status', title: '4.3 ตรวจสอบงานของคุณ', slug: 'job-status' }
		]
	},
	{
		id: 'job-submission',
		title: '5. การส่งงาน',
		slug: 'job-submission',
		subsections: [
			{ id: 'batch', title: '5.1 งาน Batch', slug: 'batch' },
			{ id: 'interactive', title: '5.2 งาน Interactive', slug: 'interactive' },
			{ id: 'gpu', title: '5.3 งาน GPU', slug: 'gpu' },
			{ id: 'multinode', title: '5.4 งาน Multi-Node (MPI)', slug: 'multinode' },
			{ id: 'array', title: '5.5 Array Job', slug: 'array' }
		]
	},
	{
		id: 'scratch',
		title: '6. การใช้งาน /scratch',
		slug: 'scratch',
		subsections: []
	},
	{
		id: 'examples',
		title: '7. ตัวอย่างสคริปต์',
		slug: 'examples',
		subsections: [
			{ id: 'python-analysis', title: '7.1 Python Analysis', slug: 'python-analysis' },
			{ id: 'pytorch-gpu', title: '7.2 PyTorch GPU', slug: 'pytorch-gpu' },
			{ id: 'multi-step', title: '7.3 Multi-Step Script', slug: 'multi-step' },
			{ id: 'single-cmd', title: '7.4 รันคำสั่งเดียว', slug: 'single-cmd' }
		]
	},
	{
		id: 'job-management',
		title: '8. การจัดการงาน',
		slug: 'job-management',
		subsections: [
			{ id: 'cancel', title: '8.1 ยกเลิกงาน', slug: 'cancel' },
			{ id: 'view-output', title: '8.2 ดูผลลัพธ์งาน', slug: 'view-output' },
			{ id: 'job-details', title: '8.3 รายละเอียดงาน', slug: 'job-details' },
			{ id: 'disk-usage', title: '8.4 ตรวจสอบดิสก์', slug: 'disk-usage' }
		]
	},
	{
		id: 'tips',
		title: '9. เคล็ดลับและแนวทาง',
		slug: 'tips',
		subsections: [
			{ id: 'time-format', title: '9.1 รูปแบบเวลา', slug: 'time-format' },
			{ id: 'mem-format', title: '9.2 รูปแบบหน่วยความจำ', slug: 'mem-format' },
			{ id: 'env-vars', title: '9.3 ตัวแปร Environment', slug: 'env-vars' }
		]
	}
];

export const BACKEND_URL = typeof window !== 'undefined'
	? (window.location.hostname === 'localhost' ? 'http://localhost:4000' : '/api-backend')
	: 'http://backend:4000';
