<script>
	import { page } from '$app/stores';
	import { sections } from '$lib/data/content.js';

	let expandedSections = {};

	// Initialize all sections as expanded
	sections.forEach((s) => {
		expandedSections[s.id] = true;
	});

	function toggleSection(id) {
		expandedSections[id] = !expandedSections[id];
		expandedSections = { ...expandedSections };
	}

	$: currentPath = $page.url.pathname;
</script>

<aside class="w-72 h-screen bg-white border-r border-gray-200 flex-shrink-0 flex flex-col overflow-hidden">
	<!-- Logo / Title - static header -->
	<div class="bg-primary-800 px-4 py-4 flex-shrink-0">
		<a href="/" class="flex items-center gap-3 no-underline">
			<div class="w-9 h-9 bg-white/20 rounded-lg flex items-center justify-center">
				<svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
						d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18" />
				</svg>
			</div>
			<div>
				<div class="font-bold text-white text-base leading-tight">HPC Cluster</div>
				<div class="text-xs text-blue-200">คู่มือการใช้งาน</div>
			</div>
		</a>
	</div>

	<!-- Navigation - scrollable -->
	<nav class="flex-1 overflow-y-auto px-3 py-4 space-y-1">
		<!-- Home -->
		<a
			href="/"
			class="sidebar-link no-underline {currentPath === '/' ? 'active' : ''}"
		>
			<svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
					d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
			</svg>
			หน้าแรก
		</a>

		<!-- Sections -->
		{#each sections as section}
			<div>
				<!-- Section Header -->
				<button
					on:click={() => toggleSection(section.id)}
					class="w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-primary-50 hover:text-primary-700 transition-colors"
				>
					<a
						href="/docs/{section.slug}"
						on:click|stopPropagation
						class="no-underline text-left flex-1 {currentPath === '/docs/' + section.slug ? 'text-primary-700 font-semibold' : 'text-gray-700'}"
					>
						{section.title}
					</a>
					{#if section.subsections.length > 0}
						<svg
							class="w-4 h-4 text-gray-400 transition-transform flex-shrink-0 {expandedSections[section.id] ? 'rotate-180' : ''}"
							fill="none" stroke="currentColor" viewBox="0 0 24 24"
						>
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
						</svg>
					{/if}
				</button>

				<!-- Subsections -->
				{#if section.subsections.length > 0 && expandedSections[section.id]}
					<div class="mt-1 space-y-0.5">
						{#each section.subsections as sub}
							<a
								href="/docs/{section.slug}#{sub.slug}"
								class="sidebar-link-sub no-underline {currentPath === '/docs/' + section.slug ? 'active' : ''}"
							>
								{sub.title}
							</a>
						{/each}
					</div>
				{/if}
			</div>
		{/each}
	</nav>

	<!-- Version badge - static footer -->
	<div class="px-4 py-3 border-t border-gray-200 bg-gray-50 flex-shrink-0">
		<div class="text-xs text-gray-400 text-center">เวอร์ชัน 1.0 — พฤษภาคม 2568</div>
	</div>
</aside>
