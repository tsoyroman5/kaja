<script lang="ts">
	import { toast } from '$lib/stores/toast.js';
	import { scale } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import { Toast } from 'flowbite-svelte';
	import {
		CheckCircleSolid,
		CloseCircleSolid,
		FireOutline,
		PaperPlaneOutline
	} from 'flowbite-svelte-icons';

	let message = '';
	let type = 'success';
	let toastStatus = false;

	toast.subscribe((value) => {
		message = value.message;
		type = value.type;
		toastStatus = value.visible;
	});

	function getColor() {
		switch (type) {
			case 'success':
				return 'green';
			case 'error':
				return 'red';
			case 'info':
				return 'blue';
			case 'warning':
				return 'yellow';
			default:
				return 'gray';
		}
	}
</script>

<Toast
	bind:toastStatus
	transition={scale}
	position="top-right"
	params={{ delay: 100, duration: 300, easing: quintOut }}
	color={getColor()}
	class="dark:text-text-primary-dark mb-4"
>
	{#snippet icon()}
		{#if type == 'success'}
			<CheckCircleSolid class="h-5 w-5" />
			<span class="sr-only">Check icon</span>
		{:else if type == 'error'}
			<CloseCircleSolid class="h-5 w-5" />
			<span class="sr-only">Error icon</span>
		{:else if type == 'info'}
			<FireOutline class="h-6 w-6" />
		{:else if type == 'warning'}
			<FireOutline class="h-6 w-6" />
		{:else}
			<PaperPlaneOutline class="text-primary-600 dark:text-primary-500 h-5 w-5 rotate-45" />
		{/if}
	{/snippet}
	{message}
</Toast>
