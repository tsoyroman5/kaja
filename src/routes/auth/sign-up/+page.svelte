<script lang="ts">
	import { Section, Register, HeroHeader } from 'flowbite-svelte-blocks';
	import { Button, Checkbox, FloatingLabelInput, Helper, Spinner } from 'flowbite-svelte';
	import { enhance } from '$app/forms';
	import type { PageProps } from './$types';

	import ImgWithAttribution from '$lib/components/ImgWithAttribution.svelte';
	import { signUpTranslations } from '$lib/translations';

	const imgSrc = '/images/community1.svg';
	const passwordPattern =
		/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\+\-=\[\]{};':"\\|<>?,./`~]).+$/;

	let { form }: PageProps = $props();

	// states
	let password = $state('');
	let confirmPassword = $state('');
	let termsAccepted = $state(false);
	let isProcessing = $state(false);

	// derived states
	let isValidPassword = $derived(
		!password || (passwordPattern.test(password) && password.length >= 8)
	);
	let passwordMatch = $derived(password === confirmPassword);
	let isConfirmPasswordInvalid = $derived(password && confirmPassword && !passwordMatch);

	function resetFormError() {
		if (form && form.error) {
			form.error = '';
			form = { ...form };
		}
	}

	function handleEnhance({}) {
		isProcessing = true;
		return async ({ update }: { update: (opts: { reset: boolean }) => void }) => {
			update({ reset: false });
			isProcessing = false;
		};
	}
</script>

<Section
	name="heroVisual"
	class="dark:bg-surface-dark"
	sectionClass="lg:py-0 lg:[&>*:first-child]:py-0"
>
	<div class="mr-auto ml-auto place-self-center lg:col-span-7">
		<ImgWithAttribution src={imgSrc} />

		<HeroHeader
			h1Class="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white"
			pClass="text-left max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400 sm:px-0 lg:px-0 xl:px-0"
		>
			{#snippet h1()}{$signUpTranslations.heroHeader}{/snippet}
			{#snippet paragraph()}{$signUpTranslations.heroSubheader}{/snippet}
		</HeroHeader>
	</div>

	<div class="hidden lg:col-span-5 lg:mt-0 lg:flex">
		<Section name="register">
			<Register>
				<div class="w-100 space-y-4 p-6 sm:p-8 md:space-y-6">
					<form class="flex flex-col space-y-6" method="POST" use:enhance={handleEnhance}>
						<h3 class="p-0 text-xl font-medium text-gray-900 dark:text-white">
							{$signUpTranslations.title}
						</h3>

						<FloatingLabelInput
							variant="outlined"
							id="floating_outlined"
							name="firstName"
							type="text"
							required>{$signUpTranslations.firstName}</FloatingLabelInput
						>

						<FloatingLabelInput
							variant="outlined"
							id="floating_outlined"
							name="lastName"
							type="text"
							required>{$signUpTranslations.lastName}</FloatingLabelInput
						>

						<FloatingLabelInput
							class={form?.error ? 'mb-2' : ''}
							variant="outlined"
							id={form?.error ? 'outlined_error' : 'floating_outlined'}
							aria-describedby={form?.error ? 'outlined_error_help' : ''}
							color={form?.error ? 'red' : 'default'}
							name="email"
							type="email"
							onchange={resetFormError}
							required>{$signUpTranslations.email}</FloatingLabelInput
						>

						{#if form?.error}
							<Helper color="red">
								<span class="font-medium">
									{#if form.error === 'email_address_invalid'}
										{$signUpTranslations.invalidEmailError}
									{:else if form.error === 'email_exists' || form.error === 'user_already_exists'}
										{$signUpTranslations.userExistsError}
									{:else}
										{$signUpTranslations.unknownError}
									{/if}
								</span>
							</Helper>
						{/if}

						<FloatingLabelInput
							bind:value={password}
							class={!isValidPassword ? 'mb-2' : ''}
							variant="outlined"
							id={!isValidPassword ? 'outlined_error' : 'floating_outlined'}
							color={!isValidPassword ? 'red' : 'default'}
							aria-describedby={!isValidPassword ? 'outlined_error_help' : ''}
							name="password"
							type="password"
							required>{$signUpTranslations.password}</FloatingLabelInput
						>

						{#if password && !isValidPassword}
							<Helper color="red">
								<span class="font-medium">{$signUpTranslations.invalidPasswordError}</span>
							</Helper>
						{/if}

						<FloatingLabelInput
							bind:value={confirmPassword}
							class={isConfirmPasswordInvalid ? 'mb-2' : ''}
							color={isConfirmPasswordInvalid ? 'red' : 'default'}
							variant="outlined"
							id={isConfirmPasswordInvalid ? 'outlined_error' : 'floating_outlined'}
							aria-describedby={isConfirmPasswordInvalid ? 'outlined_error_help' : ''}
							name="confirmPassword"
							type="password"
							required>{$signUpTranslations.confirmPassword}</FloatingLabelInput
						>

						{#if isConfirmPasswordInvalid}
							<Helper color="red">
								<span class="font-medium">{$signUpTranslations.passwordsDoNotMatchError}</span>
							</Helper>
						{/if}

						<div class="flex items-start">
							<Checkbox bind:checked={termsAccepted}>
								{@html $signUpTranslations.acceptTerms}
							</Checkbox>
						</div>

						<Button
							type="submit"
							class="bg-primary-400 hover:bg-primary-500 w-full cursor-pointer"
							disabled={!termsAccepted || !passwordMatch || isProcessing}
						>
							{#if isProcessing}
								<Spinner class="me-3" size="4" color="primary" />
							{/if}
							{$signUpTranslations.submitButton}
						</Button>

						<div class="text-sm font-medium text-gray-500 dark:text-gray-300">
							{$signUpTranslations.alreadyHaveAccount}
							<a
								href="/auth/sign-in"
								class="text-primary-600 dark:text-primary-500 font-medium hover:underline"
								>Sign In</a
							>
						</div>
					</form>
				</div>
			</Register>
		</Section>
	</div>
</Section>
