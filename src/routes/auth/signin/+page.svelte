<script>
	// Sign in page logic will go here
</script>

<div class="min-h-screen flex">
	<!-- Hero Section - Only visible on desktop -->
	<div class="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary-500 to-secondary-600">
		<div class="flex flex-col justify-center items-center w-full px-12">
			<!-- Hero content will go here -->
			<div class="text-center text-white">
				<h1 class="text-4xl font-bold mb-6">Добро пожаловать!</h1>
				<p class="text-xl opacity-90 mb-8">
					Войдите в свой аккаунт, чтобы продолжить работу с нашей платформой
				</p>
				<div class="flex justify-center">
					<img src="/logo.svg" alt="Logo" class="h-16 w-auto opacity-80" />
				</div>
			</div>
		</div>
	</div>

	<!-- Form Section - Always visible, takes full width on mobile -->
	<div class="w-full lg:w-1/2 flex items-center justify-center bg-surface dark:bg-surface-dark">
		<div class="w-full max-w-md px-6 py-12">
			<!-- Sign in form will go here -->
			<div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
				<h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
					Вход в систему
				</h2>
				
				<!-- Form container -->
				<div class="space-y-6">
					<!-- Email input container -->
					<div>
						<!-- Email input will go here -->
					</div>
					
					<!-- Password input container -->
					<div>
						<!-- Password input will go here -->
					</div>
					
					<!-- Submit button container -->
					<div>
						<!-- Submit button will go here -->
					</div>
					
					<!-- Additional links container -->
					<div class="text-center">
						<!-- Forgot password, sign up links will go here -->
					</div>
				</div>
			</div>
		</div>
	</div>
</div>