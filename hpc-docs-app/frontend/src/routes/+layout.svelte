<script>
	import '../app.css';
	import Sidebar from '$lib/components/Sidebar.svelte';
</script>

<div class="flex h-screen overflow-hidden bg-gray-50">
	<!-- Sidebar - always static, always visible -->
	<div class="flex-shrink-0">
		<Sidebar />
	</div>

	<!-- Main content area -->
	<div class="flex-1 flex flex-col min-w-0 overflow-hidden">
		<!-- Page content - scrollable -->
		<main class="flex-1 overflow-y-auto">
			<slot />
		</main>
	</div>
</div>
