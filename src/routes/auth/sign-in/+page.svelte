<script lang="ts">
	import { Button, Checkbox, Label, Input } from 'flowbite-svelte';
	import { Section, Register, HeroHeader } from 'flowbite-svelte-blocks';
	import { ArrowRightOutline } from 'flowbite-svelte-icons';
	import { derived } from 'svelte/store';

	import { currentLanguage } from '$lib/stores/language';
	import ImgWithAttribution from '$lib/components/ImgWithAttribution.svelte';
	import * as m from '$lib/paraglide/messages';

	// Reactive store for translations
	const heroSectionHeaderText = derived(currentLanguage, () => m.sign_in_hero_header());
	const heroSectionSubHeaderText = derived(currentLanguage, () => m.sign_in_hero_subheader());
	const signUpText = derived(currentLanguage, () => m.sign_up());
	const emailText = derived(currentLanguage, () => m.email());
	const passwordText = derived(currentLanguage, () => m.password());
	const rememberMeText = derived(currentLanguage, () => m.remember_me());
	const forgotPasswordText = derived(currentLanguage, () => m.forgot_password());
	const noAccountText = derived(currentLanguage, () => m.no_account_yet());
	const signInText = derived(currentLanguage, () => m.sign_in());
</script>

<Section name="heroVisual" class="dark:bg-surface-dark">
	<div class="mr-auto ml-auto place-self-center lg:col-span-7">
		<ImgWithAttribution src="/images/community.svg" />

		<HeroHeader
			h1Class="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white"
			pClass="text-left max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400 sm:px-0 lg:px-0 xl:px-0"
		>
			{#snippet h1()}{$heroSectionHeaderText}{/snippet}
			{#snippet paragraph()}{$heroSectionSubHeaderText}{/snippet}
			<a href="/auth/sign-up">
				<Button
					size="xl"
					class="bg-secondary-400 hover:bg-secondary-500 mr-3 inline-flex items-center justify-center"
				>
					{$signUpText}
					<ArrowRightOutline size="md" class="-mr-1 ml-2" />
				</Button>
			</a>
		</HeroHeader>
	</div>

	<div class="hidden lg:col-span-5 lg:mt-0 lg:flex">
		<Section name="login">
			<Register href="/">
				<div class="w-100 space-y-4 p-6 sm:p-8 md:space-y-6">
					<form class="flex flex-col space-y-6" action="/">
						<h3 class="p-0 text-xl font-medium text-gray-900 dark:text-white">{$signInText}</h3>
						<Label class="space-y-2">
							<span>{$emailText}</span>
							<Input type="email" name="email" placeholder="example@domain.com" required />
						</Label>
						<Label class="space-y-2">
							<span>{$passwordText}</span>
							<Input type="password" name="password" placeholder="•••••" required />
						</Label>
						<div class="flex items-start">
							<!-- TODO: add redirection links -->
							<Checkbox>{$rememberMeText}</Checkbox>
							<a href="/" class="ml-auto text-sm text-blue-700 hover:underline dark:text-blue-500"
								>{$forgotPasswordText}</a
							>
						</div>
						<Button type="submit" class="bg-primary-400 hover:bg-primary-500 w-full"
							>{$signInText}</Button
						>
						<p class="text-sm font-light text-gray-500 dark:text-gray-400">
							{$noAccountText}
							<a
								href="/auth/sign-up"
								class="text-primary-600 dark:text-primary-500 font-medium hover:underline"
								>{$signUpText}</a
							>
						</p>
					</form>
				</div>
			</Register>
		</Section>
	</div>
</Section>
