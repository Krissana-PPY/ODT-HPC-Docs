<script>
	import { sections } from '$lib/data/content.js';
</script>

<svelte:head>
	<title>HPC Cluster - คู่มือการใช้งาน</title>
</svelte:head>

<div class="max-w-5xl mx-auto px-6 py-12">
	<!-- Hero Section -->
	<div class="text-center mb-16">
		<div class="inline-flex items-center justify-center w-20 h-20 bg-primary-700 rounded-2xl mb-6 shadow-lg">
			<svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
					d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18" />
			</svg>
		</div>
		<h1 class="text-4xl font-bold text-gray-900 mb-3">HPC Cluster</h1>
		<p class="text-xl text-primary-600 font-medium mb-4">คู่มือการใช้งานสำหรับผู้ใช้</p>
		<p class="text-gray-500 text-sm">เวอร์ชัน 1.0 — พฤษภาคม 2568</p>
		<div class="mt-6 flex flex-wrap justify-center gap-3">
			<a
				href="/docs/quickstart"
				class="inline-flex items-center gap-2 bg-primary-700 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-800 transition-colors no-underline shadow"
			>
				<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
				</svg>
				เริ่มต้นใช้งานด่วน
			</a>
			<a
				href="/docs/slurm"
				class="inline-flex items-center gap-2 bg-white text-primary-700 border border-primary-300 px-6 py-3 rounded-lg font-medium hover:bg-primary-50 transition-colors no-underline shadow-sm"
			>
				<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
						d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
				</svg>
				คำสั่ง Slurm
			</a>
		</div>
	</div>

	<!-- System Overview Cards -->
	<div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
		<div class="bg-white rounded-xl p-5 border border-gray-200 shadow-sm text-center">
			<div class="text-3xl font-bold text-primary-700 mb-1">2</div>
			<div class="text-sm text-gray-600">Compute Nodes</div>
		</div>
		<div class="bg-white rounded-xl p-5 border border-gray-200 shadow-sm text-center">
			<div class="text-3xl font-bold text-primary-700 mb-1">64</div>
			<div class="text-sm text-gray-600">CPU Cores / Node</div>
		</div>
		<div class="bg-white rounded-xl p-5 border border-gray-200 shadow-sm text-center">
			<div class="text-3xl font-bold text-primary-700 mb-1">503</div>
			<div class="text-sm text-gray-600">GB RAM / Node</div>
		</div>
		<div class="bg-white rounded-xl p-5 border border-gray-200 shadow-sm text-center">
			<div class="text-3xl font-bold text-primary-700 mb-1">A40</div>
			<div class="text-sm text-gray-600">NVIDIA GPU</div>
		</div>
	</div>

	<!-- Quick Access - Important Rules -->
	<div class="bg-amber-50 border border-amber-300 rounded-xl p-6 mb-10">
		<div class="flex items-start gap-3">
			<span class="text-2xl">⚠️</span>
			<div>
				<h3 class="font-semibold text-amber-800 mb-2 mt-0">กฎสำคัญที่ต้องจำ</h3>
				<ul class="text-amber-700 text-sm space-y-1 list-none mb-0 pl-0">
					<li>• <strong>ห้ามรันโปรแกรมหนักบน Login Node</strong> ให้ใช้ Slurm (sbatch/srun) เสมอ</li>
					<li>• บันทึกผลลัพธ์สำคัญที่ <code class="bg-amber-100 px-1 rounded">/home</code> เท่านั้น ข้อมูลใน <code class="bg-amber-100 px-1 rounded">/scratch</code> จะถูกลบหลังงานสิ้นสุด</li>
					<li>• โควตา Home Directory คือ <strong>300 GB</strong> ต่อผู้ใช้</li>
					<li>• เมื่องานถึงเวลาสูงสุด Slurm จะหยุดงานนั้น ให้บันทึก checkpoint สำหรับงานที่ใช้เวลานาน</li>
				</ul>
			</div>
		</div>
	</div>

	<!-- Section Cards Grid -->
	<h2 class="text-xl font-bold text-gray-800 mb-6">เนื้อหาทั้งหมด</h2>
	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
		{#each sections as section}
			<a
				href="/docs/{section.slug}"
				class="group bg-white rounded-xl border border-gray-200 p-5 hover:border-primary-300 hover:shadow-md transition-all no-underline"
			>
				<div class="font-semibold text-gray-800 group-hover:text-primary-700 mb-2 transition-colors">
					{section.title}
				</div>
				{#if section.subsections.length > 0}
					<ul class="text-sm text-gray-500 space-y-0.5 list-none pl-0 mb-0">
						{#each section.subsections.slice(0, 3) as sub}
							<li class="truncate">• {sub.title}</li>
						{/each}
						{#if section.subsections.length > 3}
							<li class="text-primary-500">+ {section.subsections.length - 3} หัวข้อย่อย...</li>
						{/if}
					</ul>
				{/if}
			</a>
		{/each}
	</div>

	<!-- Access URLs -->
	<div class="mt-12 bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
		<h3 class="font-semibold text-gray-800 mb-4 mt-0">🔗 URL สำหรับเข้าใช้งาน</h3>
		<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
			<div class="bg-gray-50 rounded-lg p-4">
				<div class="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Open OnDemand</div>
				<a href="https://klpdindaeng-ood.kku.ac.th" target="_blank" rel="noreferrer"
					class="text-primary-600 text-sm font-mono break-all">
					klpdindaeng-ood.kku.ac.th
				</a>
			</div>
			<div class="bg-gray-50 rounded-lg p-4">
				<div class="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">JupyterHub</div>
				<a href="https://klpdindaeng-jpt.kku.ac.th" target="_blank" rel="noreferrer"
					class="text-primary-600 text-sm font-mono break-all">
					klpdindaeng-jpt.kku.ac.th
				</a>
			</div>
			<div class="bg-gray-50 rounded-lg p-4">
				<div class="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">SSH</div>
				<code class="text-gray-700 text-sm">klpdindaeng-ood.kku.ac.th</code>
			</div>
		</div>
	</div>
</div>
