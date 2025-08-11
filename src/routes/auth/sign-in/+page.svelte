<script lang="ts">
	import { Button, FloatingLabelInput, Helper, Spinner } from 'flowbite-svelte';
	import { Section, Register, HeroHeader } from 'flowbite-svelte-blocks';
	import { ArrowRightOutline } from 'flowbite-svelte-icons';
	import ImgWithAttribution from '$lib/components/ImgWithAttribution.svelte';
	import { signInTranslations, signUpTranslations } from '$lib/translations';
	import GoogleButton from '$lib/components/buttons/GoogleButton.svelte';
	
	import { goto } from '$app/navigation';
	import { authService } from '$lib/services/auth.service';

	const imgSrc = '/images/community.svg';

	let email = '';
	let password = '';
	let errCode = $state('');
	let isProcessing = $state(false);

	async function handleSignIn(event: Event) {
		event.preventDefault();
		isProcessing = true;

		const { errorCode } = await authService.signInWithPassword(email, password);

		if (errorCode) {
			errCode = errorCode;
			isProcessing = false;
			return;
		}

		errCode = '';
		// Supabase will trigger onAuthStateChange, so just redirect
		await goto('/');
	}
</script>

<Section
	name="heroVisual"
	class="dark:bg-surface-dark h-full"
	sectionClass="lg:py-0 lg:[&>*:first-child]:py-0"
>
	<div class="mr-auto ml-auto place-self-center lg:col-span-7">
		<ImgWithAttribution src={imgSrc} />

		<HeroHeader
			h1Class="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white"
			pClass="text-left max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400 sm:px-0 lg:px-0 xl:px-0"
		>
			{#snippet h1()}{$signInTranslations.heroHeader}{/snippet}
			{#snippet paragraph()}{$signInTranslations.heroSubheader}{/snippet}
			<a href="/auth/sign-up">
				<Button
					size="xl"
					class="bg-secondary-400 hover:bg-secondary-500 mr-3 inline-flex items-center justify-center"
				>
					{$signUpTranslations.signUp}
					<ArrowRightOutline size="md" class="-mr-1 ml-2" />
				</Button>
			</a>
		</HeroHeader>
	</div>

	<div class="hidden lg:col-span-5 lg:mt-0 lg:flex">
		<Section name="login">
			<Register href="/">
				<div class="w-100 space-y-4 p-6 sm:p-8 md:space-y-6">
					<form class="flex flex-col space-y-6" on:submit|preventDefault={handleSignIn}>
						<h3 class="p-0 text-xl font-medium text-gray-900 dark:text-white">
							{$signInTranslations.signIn}
						</h3>

						{#if errCode}
							<Helper class={errCode ? '' : 'm-0'} color="red">
								<span class="font-medium">
									{#if errCode === "invalid_credentials"}
										{$signInTranslations.invalidCredentialsError}
									{:else if errCode === "user_not_found"}
										{$signInTranslations.userNotFoundError}
									{:else}
										{$signUpTranslations.unknownError}
									{/if}
								</span>
							</Helper>
						{/if}

						<FloatingLabelInput
							variant="outlined"
							id="floating_outlined"
							name="email"
							type="email"
							bind:value={email}
							required>{$signInTranslations.email}</FloatingLabelInput
						>
						<FloatingLabelInput
							variant="outlined"
							id="floating_outlined"
							name="password"
							type="password"
							bind:value={password}
							required>{$signInTranslations.password}</FloatingLabelInput
						>
						<div class="flex items-end">
							<a
								href="/"
								class="text-primary-600 dark:text-primary-500 ml-auto text-sm hover:underline"
								>{$signInTranslations.forgotPassword}</a
							>
						</div>
						<Button
							type="submit"
							class="bg-primary-400 hover:bg-primary-500 w-full"
							disabled={isProcessing}
						>
							{#if isProcessing}
								<Spinner class="me-3" size="4" color="primary" />
							{/if}
							{$signInTranslations.signIn}
						</Button>
					</form>

					<hr class="my-8 h-px border-0 bg-gray-200 dark:bg-gray-700" />
					<div class="flex justify-evenly">
						<Button
							class="h-[48px] w-[48px] cursor-pointer bg-transparent !p-0 hover:bg-transparent dark:bg-transparent dark:hover:bg-transparent"
							onclick={() => {
								console.log('Facebook login');
							}}
						>
							<img src="/icons/icon-facebook.png" alt="Facebook Login" />
						</Button>

						<GoogleButton
							onclick={() => {
								console.log('Google login');
							}}
						/>

						<Button
							class="h-[48px] w-[48px] cursor-pointer bg-transparent !p-0 hover:bg-transparent dark:bg-transparent dark:hover:bg-transparent"
							onclick={() => {
								console.log('Kakao login');
							}}
						>
							<img src="/icons/icon-kakao.svg" alt="Kakao Login" />
						</Button>
					</div>
				</div>
			</Register>
		</Section>
	</div>
</Section>
