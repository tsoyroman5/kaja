<script>
	import {
		Navbar,
		NavBrand,
		NavLi,
		NavUl,
		NavHamburger,
		Avatar,
		Dropdown,
		DropdownItem,
		DropdownHeader,
		DropdownGroup,
		DropdownDivider,
		MegaMenu
	} from 'flowbite-svelte';
	import { ChevronDownOutline } from 'flowbite-svelte-icons';
	import { DarkMode } from 'flowbite-svelte';
	import { auth } from '$lib/stores/auth';

	import { page } from '$app/state';
	let activeUrl = $derived(page.url.pathname);

	let menu2 = [
		{ name: 'Online Stores', help: "Connect with third-party tools that you're already using." },
		{ name: 'Segmentation', help: "Connect with third-party tools that you're already using." },
		{ name: 'Marketing CRM', help: "Connect with third-party tools that you're already using." },

		{ name: 'Online Stores', help: "Connect with third-party tools that you're already using." },
		{ name: 'Segmentation', help: "Connect with third-party tools that you're already using." },
		{ name: 'Marketing CRM', help: "Connect with third-party tools that you're already using." },
		{
			name: 'Audience Management',
			help: "Connect with third-party tools that you're already using."
		},
		{ name: 'Creative Tools', help: "Connect with third-party tools that you're already using." },
		{
			name: 'Marketing Automation',
			help: "Connect with third-party tools that you're already using."
		}
	];
</script>

<Navbar class="bg-surface dark:bg-surface-dark fixed">
	<NavBrand href="/">
		<img src="/logo.svg" class="me-3 h-6 sm:h-9" alt="Logo" />
	</NavBrand>
	<div class="flex items-center md:order-2">
		<DarkMode class="text-primary-500 dark:text-primary-600 mr-4" />
		<Avatar id="avatar-menu" src="/user.svg" />
		<NavHamburger />
	</div>
	<Dropdown simple {activeUrl} class="cursor-pointer" placement="bottom" triggeredBy="#avatar-menu">
		<DropdownHeader>
			<span class="block text-sm">{$auth.user?.name || 'Гость'}</span>
			<DropdownDivider />

			<!-- <span class="block truncate text-sm font-medium">{$auth.user?.email || 'Not signed in'}</span> -->
		</DropdownHeader>
		{#if $auth.isAuthenticated}
			<DropdownGroup>
				<DropdownItem>Панель управления</DropdownItem>
				<DropdownItem>Настройки</DropdownItem>
			</DropdownGroup>
			<div class="px-4 py-2">
				<button
					class="w-full rounded px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600"
					onclick={() => auth.logout()}
				>
					Выйти
				</button>
			</div>
		{:else}
			<DropdownItem href="/login">Войти</DropdownItem>
			<DropdownItem href="/register">Зарегистрироваться</DropdownItem>
		{/if}
	</Dropdown>
	<NavUl>
		<NavLi href="/" class="nav-item">Главная</NavLi>
		<NavLi class="cursor-pointer">
			Mega menu
            <ChevronDownOutline class="text-primary-800 ms-1 inline dark:text-white" />
		</NavLi>
		<MegaMenu full items={menu2}>
			{#snippet children({ item })}
				<a href="/" class="block h-full rounded-lg p-3 hover:bg-gray-50 dark:hover:bg-gray-700">
					<div class="font-semibold dark:text-white">{item.name}</div>
					<span class="text-sm font-light text-gray-500 dark:text-gray-400">{item.help}</span>
				</a>
			{/snippet}
		</MegaMenu>
		<NavLi href="/about" class="nav-item">О нас</NavLi>
		<NavLi href="/pricing" class="nav-item">Цены</NavLi>
		<NavLi href="/contact" class="nav-item">Контакты</NavLi>
	</NavUl>
</Navbar>

<style>
	:global(.nav-item:hover) {
		color: var(--color-primary-500) !important;
	}

	:global(.dark .nav-item:hover) {
		color: var(--color-primary-600) !important;
	}
</style>
