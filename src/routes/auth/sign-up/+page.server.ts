import { AuthResult, authService } from '$lib/server/services/auth.service';
import { logger } from '$lib/server/services/logger.service';
import { type Actions, fail, redirect } from '@sveltejs/kit';

export const actions: Actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		const firstName = data.get('firstName')!.toString();
		const lastName = data.get('lastName')!.toString();
		const email = data.get('email')!.toString();
		const password = data.get('password')!.toString();

		const { result, userId, errorCode } = await authService.signUp({
			email,
			password,
			firstName,
			lastName
		});

		if (result === AuthResult.SUCCESS) {
			logger.info('User signed up successfully', { userId });
			throw redirect(303, '/auth/sign-in');
		} else {
			logger.error(`Sign-up failed. Error code: ${errorCode}. Email: ${email}`);
			return fail(400, { error: errorCode });
		}
	}
};
