import { supabase } from '$lib/supabaseClient';
import { logger } from '$lib/server/services/logger.service';

export type AuthService = {
	signUp: (args: {
		email: string;
		password: string;
		firstName: string;
		lastName: string;
	}) => Promise<{ result: 'success' | 'failure'; userId?: string; errorCode?: string }>;
	signInWithPassword: (args: { email: string; password: string }) => Promise<void>;
	signInWithOAuth: (provider: 'facebook' | 'google' | 'kakao') => Promise<void>;
	signOut: () => Promise<void>;
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
				return { result: 'failure', errorCode: error.code };
			} else {
				logger.info('User signed up successfully', { user: data.user });
				return { result: 'success', userId: data.user!.id };
			}
		} catch (error) {
			logger.error('Error during sign-up', { error });
			return { result: 'failure', errorCode: 'unknown_error' };
		}
	},
	signInWithPassword: async (args) => {
		try {
			const { data, error } = await supabase.auth.signInWithPassword({
				email: args.email,
				password: args.password
			});

			if (error) {
				logger.error('Error signing in with password', { error: error.message });
			}

			logger.info('User signed in successfully', { user: data.user });
		} catch (error) {
			logger.error('Error during sign-in', { error });
		}
	},
	signInWithOAuth: async (provider) => {
		// Implementation for signInWithOAuth
		try {
			// const { user, error } = await supabase.auth.signInWithOAuth({ provider });
			// console.log(user);
			// console.log(error);
			// Handle successful sign-in
		} catch (error) {
			// Handle error
			logger.error(`Error signing in with ${provider}`, { error });
		}
	},
	signOut: async () => {
		// Implementation for signOut
	}
};
