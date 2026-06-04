<script>
	import { onMount } from 'svelte';

	export let code = '';
	export let lang = 'bash';
	export let title = '';

	let copied = false;
	let highlighted = '';

	onMount(async () => {
		try {
			const { codeToHtml } = await import('shiki');
			highlighted = await codeToHtml(code, {
				lang: lang,
				theme: 'github-dark'
			});
		} catch (e) {
			// fallback: plain text
			highlighted = '';
		}
	});

	function copyCode() {
		navigator.clipboard.writeText(code).then(() => {
			copied = true;
			setTimeout(() => (copied = false), 2000);
		});
	}
</script>

<div class="relative group my-4 rounded-lg overflow-hidden border border-gray-700">
	{#if title}
		<div class="flex items-center justify-between bg-gray-800 px-4 py-2 border-b border-gray-700">
			<span class="text-xs text-gray-400 font-mono">{title}</span>
			<button
				on:click={copyCode}
				class="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition-colors"
			>
				{#if copied}
					<svg class="w-3.5 h-3.5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
					</svg>
					<span class="text-green-400">คัดลอกแล้ว!</span>
				{:else}
					<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
							d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
					</svg>
					คัดลอก
				{/if}
			</button>
		</div>
	{:else}
		<button
			on:click={copyCode}
			class="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 flex items-center gap-1.5 bg-gray-700 hover:bg-gray-600 text-xs text-gray-300 hover:text-white px-2.5 py-1.5 rounded transition-all"
		>
			{#if copied}
				<svg class="w-3.5 h-3.5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
				</svg>
				<span class="text-green-400">คัดลอกแล้ว!</span>
			{:else}
				<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
						d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
				</svg>
				คัดลอก
			{/if}
		</button>
	{/if}

	{#if highlighted}
		{@html highlighted}
	{:else}
		<pre class="bg-gray-900 text-gray-100 p-4 overflow-x-auto text-sm"><code>{code}</code></pre>
	{/if}
</div>

<style>
	:global(.shiki) {
		padding: 1.25rem !important;
		margin: 0 !important;
		border-radius: 0 !important;
		font-size: 0.875rem !important;
		line-height: 1.6 !important;
	}
</style>
