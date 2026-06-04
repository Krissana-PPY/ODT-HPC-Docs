<script>
	import '../app.css';
	import Sidebar from '$lib/components/Sidebar.svelte';
	import { page } from '$app/stores';

	let mobileMenuOpen = false;

	$: currentPath = $page.url.pathname;
</script>

<div class="flex min-h-screen bg-gray-50">
	<!-- Mobile overlay -->
	{#if mobileMenuOpen}
		<div
			class="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
			on:click={() => (mobileMenuOpen = false)}
			on:keydown={(e) => e.key === 'Escape' && (mobileMenuOpen = false)}
			role="button"
			tabindex="0"
		></div>
	{/if}

	<!-- Sidebar - desktop always visible, mobile slide-in -->
	<div
		class="fixed top-0 left-0 h-full z-30 transform transition-transform duration-300
		{mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static lg:z-auto"
	>
		<Sidebar />
	</div>

	<!-- Main content area -->
	<div class="flex-1 flex flex-col min-w-0 lg:ml-0">
		<!-- Mobile top bar -->
		<div class="sticky top-0 z-10 bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-3 lg:hidden">
			<button
				on:click={() => (mobileMenuOpen = !mobileMenuOpen)}
				class="p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
			>
				<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
				</svg>
			</button>
			<span class="font-semibold text-gray-800">HPC Cluster - คู่มือการใช้งาน</span>
		</div>

		<!-- Page content -->
		<main class="flex-1 overflow-auto">
			<slot />
		</main>
	</div>
</div>
