import { supabase } from '$lib/supabaseClient';

export type AuthService = {
	signInWithPassword: (
		email: string,
		password: string
	) => Promise<{ userId?: string; errorCode?: string }>;
	signOut(): Promise<void>;
};

export const authService: AuthService = {
	signInWithPassword: async (email, password) => {
		try {
			const { data, error } = await supabase.auth.signInWithPassword({
				email,
				password
			});

			if (error) {
				return { errorCode: error.code };
			}

			return { userId: data.user!.id };
		} catch (error) {
			console.error('Error during sign-in', error);
			return { errorCode: 'unknown_error' };
		}
	},
	signOut: async () => {
		try {
			await supabase.auth.signOut();
		} catch (error) {
			console.error('Error during sign-out', error);
		}
	}
};
