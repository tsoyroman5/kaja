import { authService } from '$lib/server/services/auth.service';
import { logger } from '$lib/server/services/logger.service';
import { type ServerLoadEvent, type Actions, fail, redirect } from '@sveltejs/kit';

export function load({ cookies }: ServerLoadEvent) {
}

export const actions: Actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		const firstName = data.get('firstName')!.toString();
		const lastName = data.get('lastName')!.toString();
		const email = data.get('email')!.toString();
		const password = data.get('password')!.toString();

		try {
			const { result, userId, errorCode } = await authService.signUp({
				email,
				password,
				firstName,
				lastName
			});

            console.log(result)

			if (result === 'success') {
				logger.info('User signed up successfully', { userId });
				throw redirect(303, '/auth/sign-in');
			} else {
				logger.error(`Sign-up failed. Error code: ${errorCode}. Email: ${email}`);
				switch (errorCode) {
					case 'email_address_invalid':
						return fail(400, { error: errorCode });
					case 'email_exists':
					case 'user_already_exists':
						return fail(400, { error: errorCode });
                    default:
                        return fail(500, { error: 'unknown_error' });
				}
			}
		} catch (error) {
			logger.error('Unexpected error during sign-up', { error });
			return fail(500, { error: 'unknown_error' });
		}
	}
};
