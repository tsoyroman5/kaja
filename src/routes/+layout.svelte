<script>
	import { ParaglideJS } from '@inlang/paraglide-sveltekit';
	import { i18n } from '$lib/i18n';
	import Header from '../lib/components/Header.svelte';
	import Toast from '$lib/components/Toast.svelte';
	import '../app.css';

	let { children } = $props();
</script>

<ParaglideJS {i18n}>
	<Header />

	<main style="padding-top: var(--navbar-height);">
		{@render children()}
		<Toast />
	</main>

</ParaglideJS>
