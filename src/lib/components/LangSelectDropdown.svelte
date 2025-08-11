<script lang="ts">
	import { browser } from '$app/environment';
	import { LANGUAGES } from '$lib/constants/languages';
	import { changeLanguage, currentLanguage } from '$lib/stores/language';
	import { Dropdown, DropdownItem } from 'flowbite-svelte';

	let isLangOpen = $state(false);

	function setLang(tag: 'en' | 'kr' | 'ru') {
		if (browser) {
			isLangOpen = false;
			changeLanguage(tag);
		}
	}
</script>

<button
	id="lang-select"
	type="button"
	class="mr-4 inline-flex cursor-pointer items-center justify-center rounded-lg px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white"
>
	<img src={$currentLanguage.flag} class="me-3 h-5 w-5" alt={$currentLanguage.name} />
	{$currentLanguage.name}
</button>
<Dropdown
	bind:isOpen={isLangOpen}
	simple
	class="cursor-pointer"
	placement="bottom"
	triggeredBy="#lang-select"
>
	{#each Object.values(LANGUAGES) as lang}
		<DropdownItem onclick={() => setLang(lang.tag)}>
			<div class="inline-flex items-center">
				<img src={lang.flag} class="me-3 h-5 w-5" alt="{lang.tag}-flag" />
				{lang.name}
			</div>
		</DropdownItem>
	{/each}
</Dropdown>
