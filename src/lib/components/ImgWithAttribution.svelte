<script lang="ts">
    export let src: string;
    export let alt: string = '';
    export let height: string = '250px';
    export let width: string = 'auto';
    export let attribution: string = 'Designed by';
    export let attributionLink: string = 'https://www.freepik.com';
    export let attributionText: string = 'Freepik';

    $: if (!alt && src) {
        // Extract filename without extension for alt text
        const match = src.match(/\/([^\/]+)\.(\w+)$/);
        alt = match ? match[1].replace(/[-_]/g, ' ') : '';
    }
</script>

<div class="relative mx-auto mb-5 w-fit">
    <img
        {src}
        {alt}
        class="h-[{height}] w-[{width}] mx-auto"
    />
    <div class="absolute right-2 -bottom-4 rounded px-1 py-1 text-right text-xs text-text-primary dark:text-text-primary-dark">
        {attribution}
        <a href={attributionLink} class="text-primary-600" target="_blank" rel="noopener noreferrer">{attributionText}</a>
    </div>
</div>