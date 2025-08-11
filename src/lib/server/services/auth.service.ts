import { supabase } from '$lib/supabaseClient';
import { logger } from '$lib/server/services/logger.service';

export enum AuthResult {
	SUCCESS = 'success',
	FAILURE = 'failure'
}

export type AuthService = {
	signUp: (args: {
		email: string;
		password: string;
		firstName: string;
		lastName: string;
	}) => Promise<{ result: AuthResult; userId?: string; errorCode?: string }>;
};

export const authService: AuthService = {
	signUp: async (args) => {
		try {
			const { data, error } = await supabase.auth.signUp({
				email: args.email,
				password: args.password,
				options: {
					data: {
						first_name: args.firstName,
						last_name: args.lastName
					}
				}
			});

			if (error) {
				logger.error('Error signing up', { code: error.code, msg: error.message });
				return { result: AuthResult.FAILURE, errorCode: error.code };
			} else {
				logger.info('User signed up successfully', { user: data.user });
				return { result: AuthResult.SUCCESS, userId: data.user!.id };
			}
		} catch (error) {
			logger.error('Error during sign-up', { error });
			return { result: AuthResult.FAILURE, errorCode: 'unknown_error' };
		}
	}
}