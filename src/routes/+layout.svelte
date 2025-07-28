<script>
	import { ParaglideJS } from '@inlang/paraglide-sveltekit';
	import { i18n } from '$lib/i18n';
	import '../app.css';
	import Header from '../lib/components/Header.svelte';

	let { children } = $props();
</script>

<ParaglideJS {i18n}>
	<Header />

	<main style="padding-top: var(--navbar-height);">
		{@render children()}
	</main>

</ParaglideJS>
