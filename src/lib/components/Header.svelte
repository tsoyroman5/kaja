<script lang="ts">
	import { browser } from '$app/environment';
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
		MegaMenu,
		Button
	} from 'flowbite-svelte';
	import { onMount } from 'svelte';
	import { ChevronDownOutline } from 'flowbite-svelte-icons';
	import { DarkMode } from 'flowbite-svelte';
	import { derived } from 'svelte/store';

	import { page } from '$app/state';
	import { authStore } from '$lib/stores/auth';
	import { currentLanguage } from '$lib/stores/language';
	import * as m from '$lib/paraglide/messages';
	import LangSelectDropdown from './LangSelectDropdown.svelte';
	import { signInTranslations, signUpTranslations } from '$lib/translations';
	import { authService } from '$lib/services/auth.service';

	// Create reactive stores for translations
	const navbarEventsText = derived(currentLanguage, () => m.navbar_events());
	const navbarCommunitiesText = derived(currentLanguage, () => m.navbar_communities());
	const navbarLetsGoText = derived(currentLanguage, () => m.navbar_lets_go());

	let isUserMenuOpen = $state(false);
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

	function setNavbarHeightVar() {
		if (!browser) return;
		const navbar = document.querySelector('.navbar') as HTMLDivElement;
		if (navbar) {
			const height = navbar.offsetHeight;
			// dynamically calculaet height of navbar for layout padding
			document.documentElement.style.setProperty(
				'--navbar-height',
				`calc(var(--spacing) * 2.5 * 2 + ${height}px)`
			);
		}
	}

	onMount(() => {
		setNavbarHeightVar();
		window.addEventListener('resize', setNavbarHeightVar);
		return () => {
			window.removeEventListener('resize', setNavbarHeightVar);
		};
	});

	async function signOut() {
		isUserMenuOpen = false;
		await authService.signOut();
	}
</script>

<header>
	<Navbar class="bg-surface dark:bg-surface-dark fixed" navContainerClass="navbar">
		<NavBrand href="/">
			<img src="/logo.svg" class="me-3 h-6 sm:h-9" alt="Logo" />
		</NavBrand>
		<div class="flex items-center lg:order-2">
			{#if $authStore.isAuthenticated}
				<Avatar id="avatar-menu" src="/user.svg" />
				<Dropdown
					bind:isOpen={isUserMenuOpen}
					simple
					{activeUrl}
					class="cursor-pointer"
					placement="bottom"
					triggeredBy="#avatar-menu"
				>
					<DropdownHeader>
						<span class="block text-sm">{$authStore.user?.initials || 'Гость'}</span>
						<DropdownDivider />
					</DropdownHeader>

					<DropdownGroup>
						<DropdownItem onclick={() => (isUserMenuOpen = false)}>Панель управления</DropdownItem>
						<DropdownItem onclick={() => (isUserMenuOpen = false)}>Настройки</DropdownItem>
						<DropdownDivider />
						<DropdownItem onclick={signOut}>Выйти</DropdownItem>
					</DropdownGroup>
				</Dropdown>
			{:else}
				<DarkMode class="text-primary-500 dark:text-primary-600 mr-4" />
				<LangSelectDropdown />
				<a href="/auth/sign-up">
					<Button type="submit" class="bg-primary-600 hover:bg-primary-700 w-full cursor-pointer">
						{$signUpTranslations.signUp}
					</Button>
				</a>
				<a href="/auth/sign-in">
					<Button type="submit" class="bg-primary-400 hover:bg-primary-500 ml-2 cursor-pointer">
						{$signInTranslations.signIn}
					</Button>
				</a>
			{/if}
			<NavHamburger />
		</div>
		<NavUl>
			<NavLi href="/" class="nav-item">{$navbarEventsText}</NavLi>
			<NavLi class="nav-item cursor-pointer">
				{$navbarCommunitiesText}
				<ChevronDownOutline class="nav-item ms-1 inline" />
			</NavLi>
			<MegaMenu full items={menu2}>
				{#snippet children({ item })}
					<a href="/" class="block h-full rounded-lg p-3 hover:bg-gray-50 dark:hover:bg-gray-700">
						<div class="font-semibold dark:text-white">{item.name}</div>
						<span class="text-sm font-light text-gray-500 dark:text-gray-400">{item.help}</span>
					</a>
				{/snippet}
			</MegaMenu>
			<NavLi href="/about" class="nav-item">{$navbarLetsGoText}</NavLi>
		</NavUl>
	</Navbar>
</header>

<!-- <Navbar class="bg-surface dark:bg-surface-dark fixed" navContainerClass="navbar">
	<NavBrand href="/">
		<img src="/logo.svg" class="me-3 h-6 sm:h-9" alt="Logo" />
	</NavBrand>
	<div class="flex items-center md:order-2">
		<DarkMode class="text-primary-500 dark:text-primary-600 mr-4" />
		<button
			id="lang-select"
			type="button"
			class="mr-4 inline-flex cursor-pointer items-center justify-center rounded-lg px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white"
		>
			<img src={$currentLanguage.flag} class="me-3 h-5 w-5" alt={$currentLanguage.name} />
			{$currentLanguage.name}
		</button>

		<Avatar id="avatar-menu" src="/user.svg" />
		<NavHamburger />
	</div>
	<Dropdown
		bind:isOpen={isUserMenuOpen}
		simple
		{activeUrl}
		class="cursor-pointer"
		placement="bottom"
		triggeredBy="#avatar-menu"
	>
		<DropdownHeader>
			<span class="block text-sm">{$authStore.user?.initials || 'Гость'}</span>
			<DropdownDivider />
		</DropdownHeader>
		{#if $authStore.isAuthenticated}
			<DropdownGroup>
				<DropdownItem onclick={() => (isUserMenuOpen = false)}>Панель управления</DropdownItem>
				<DropdownItem onclick={() => (isUserMenuOpen = false)}>Настройки</DropdownItem>
			</DropdownGroup>
			<div class="px-4 py-2">
				<button
					class="w-full rounded px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600"
					onclick={() => authStore.set({ isAuthenticated: false, user: null, isVerified: false })}
				>
					Выйти
				</button>
			</div>
		{:else}
			<DropdownItem href="/auth/sign-in" onclick={() => (isUserMenuOpen = false)}
				>Войти</DropdownItem
			>
			<DropdownItem href="/auth/sign-up" onclick={() => (isUserMenuOpen = false)}
				>Зарегистрироваться</DropdownItem
			>
		{/if}
	</Dropdown>
	<NavUl>
		<NavLi href="/" class="nav-item">{$navbarEventsText}</NavLi>
		<NavLi class="nav-item cursor-pointer">
			{$navbarCommunitiesText}
			<ChevronDownOutline class="nav-item ms-1 inline" />
		</NavLi>
		<MegaMenu full items={menu2}>
			{#snippet children({ item })}
				<a href="/" class="block h-full rounded-lg p-3 hover:bg-gray-50 dark:hover:bg-gray-700">
					<div class="font-semibold dark:text-white">{item.name}</div>
					<span class="text-sm font-light text-gray-500 dark:text-gray-400">{item.help}</span>
				</a>
			{/snippet}
		</MegaMenu>
		<NavLi href="/about" class="nav-item">{$navbarLetsGoText}</NavLi>
	</NavUl>
</Navbar> -->

<style>
	:global(.nav-item:hover) {
		color: var(--color-primary-500) !important;
	}

	:global(.dark .nav-item:hover) {
		color: var(--color-primary-600) !important;
	}
</style>
