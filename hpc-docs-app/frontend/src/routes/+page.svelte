<script>
	import { sections } from '$lib/data/content.js';
</script>

<svelte:head>
	<title>HPC Cluster - คู่มือการใช้งาน</title>
</svelte:head>

<div class="max-w-5xl mx-auto px-6 py-12">
	<!-- Hero Section -->
	<div class="text-center mb-12">
		<h1 class="text-4xl font-bold text-gray-900 mb-3">High-Performance Computing Cluster</h1>
		<h2 class="text-4xl font-bold text-gray-900 mb-3">Khon Kaen University</h2>
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

	<!-- Access URLs (moved above Important Rules) -->
	<div class="mb-8 bg-white rounded-xl border-2 border-primary-200 p-6 shadow-md">
		<div class="flex items-center gap-2 mb-5">
			<div class="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center">
				<svg class="w-5 h-5 text-primary-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
						d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
				</svg>
			</div>
			<h3 class="font-bold text-primary-800 text-lg mt-0 mb-0">URL สำหรับเข้าใช้งานและบริการ</h3>
		</div>

		<!-- Access URLs -->
		<p class="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">เข้าใช้งานระบบ</p>
		<div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
			<div class="bg-primary-50 border border-primary-200 rounded-lg p-4 flex flex-col gap-1">
				<div class="flex items-center gap-2 mb-1">
					<svg class="w-4 h-4 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
							d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
					</svg>
					<div class="text-xs font-semibold text-primary-700 uppercase tracking-wide">Open OnDemand</div>
				</div>
				<a href="https://odt-hpc.kku.ac.th" target="_blank" rel="noreferrer"
					class="text-primary-600 text-sm font-mono break-all no-underline hover:underline">
					odt-hpc.kku.ac.th
				</a>
			</div>
			<div class="bg-primary-50 border border-primary-200 rounded-lg p-4 flex flex-col gap-1">
				<div class="flex items-center gap-2 mb-1">
					<svg class="w-4 h-4 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
							d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
					</svg>
					<div class="text-xs font-semibold text-primary-700 uppercase tracking-wide">JupyterHub</div>
				</div>
				<a href="https://odt-hpc.kku.ac.th/jupyter" target="_blank" rel="noreferrer"
					class="text-primary-600 text-sm font-mono break-all no-underline hover:underline">
					odt-hpc.kku.ac.th/jupyter
				</a>
			</div>
			<div class="bg-primary-50 border border-primary-200 rounded-lg p-4 flex flex-col gap-1">
				<div class="flex items-center gap-2 mb-1">
					<svg class="w-4 h-4 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
							d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
					</svg>
					<a class="text-primary-600 text-sm font-mono break-all no-underline hover:underline">SSH</a>
				</div>
				<div class="text-xs font-semibold text-primary-700 uppercase tracking-wide">odt-hpc.kku.ac.th</div>
			</div>
		</div>

		<!-- Service Request URLs -->
		<p class="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">ขอใช้บริการ</p>
		<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
			<div class="bg-purple-50 border border-purple-300 rounded-lg p-4 flex flex-col gap-1">
				<div class="flex items-center gap-2 mb-1">
					<svg class="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
							d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
					</svg>
					<div class="text-xs font-semibold text-purple-700 uppercase tracking-wide">ขอใช้บริการ HPC Server</div>
				</div>
				<a href="https://kku.world/4rql5x" target="_blank" rel="noreferrer"
					class="text-purple-700 text-sm font-mono break-all no-underline hover:underline">
					e-service-hpc
				</a>
				<p class="text-xs text-purple-600 mt-1 mb-0">สำหรับการขอสิทธิ์ใช้งาน HPC Server</p>
			</div>
			<div class="bg-purple-50 border border-purple-300 rounded-lg p-4 flex flex-col gap-1">
				<div class="flex items-center gap-2 mb-1">
					<svg class="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
							d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
					</svg>
					<div class="text-xs font-semibold text-purple-700 uppercase tracking-wide">ขอโปรแกรมเพิ่มเติม / ขอเพิ่มพื้นที่</div>
				</div>
				<a href="https://kku.world/sbqzt4" target="_blank" rel="noreferrer"
					class="text-purple-700 text-sm font-mono break-all no-underline hover:underline">
					e-service-software-hpc
				</a>
				<p class="text-xs text-purple-600 mt-1 mb-0">ขอติดตั้งโปรแกรมเพิ่มเติม หรือขอเพิ่มพื้นที่การใช้งาน</p>
			</div>
		</div>
	</div>

	<!-- Important Rules -->
	<div class="bg-amber-50 border border-amber-300 rounded-xl p-6 mb-10">
		<div class="flex items-start gap-3">
			<div class="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
				<svg class="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
						d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
				</svg>
			</div>
			<div>
				<h3 class="font-semibold text-amber-800 mb-3 mt-0">กฎสำคัญที่ต้องจำ</h3>
				<ul class="text-amber-700 text-sm space-y-2 list-none mb-0 pl-0">
					<li class="flex items-start gap-2">
						<svg class="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
						</svg>
						<span><strong>ห้ามรันโปรแกรมหนักบน Login Node</strong> ให้ใช้ Slurm (sbatch/srun) เสมอ</span>
					</li>
					<li class="flex items-start gap-2">
						<svg class="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
						</svg>
						<span>บันทึกผลลัพธ์สำคัญที่ <code class="bg-amber-100 px-1 rounded">/home</code> เท่านั้น ข้อมูลใน <code class="bg-amber-100 px-1 rounded">/scratch</code> จะถูกลบหลังงานสิ้นสุด</span>
					</li>
					<li class="flex items-start gap-2">
						<svg class="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
						</svg>
						<span>โควตา Home Directory คือ <strong>300 GB</strong> ต่อผู้ใช้</span>
					</li>
					<li class="flex items-start gap-2">
						<svg class="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
						</svg>
						<span>เมื่องานถึงเวลาสูงสุด Slurm จะหยุดงานนั้น ให้บันทึก checkpoint สำหรับงานที่ใช้เวลานาน</span>
					</li>
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
</div>
