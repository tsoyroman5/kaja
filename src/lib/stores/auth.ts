import type { User } from '$lib/server/models/user.model';
import { writable } from 'svelte/store';
import { browser } from '$app/environment';
import { supabase } from '$lib/supabaseClient';

export interface AuthState {
	isAuthenticated: boolean;
	isVerified: boolean;
	user: User | null;
}

function createAuthStore() {
	const store = writable<AuthState>({
		isAuthenticated: false,
		isVerified: false,
		user: null
	});

	if (browser) {
		supabase.auth.onAuthStateChange(async (event, session) => {
			console.log('Auth state changed:', event, session);
			switch (event) {
				case 'INITIAL_SESSION':
				case 'SIGNED_IN':
				case 'USER_UPDATED':
					break;
				case 'PASSWORD_RECOVERY':
				case 'SIGNED_OUT':
					store.set({
						isAuthenticated: false,
						user: null,
						isVerified: false
					});
					break;
				case 'TOKEN_REFRESHED':
				case 'MFA_CHALLENGE_VERIFIED':
					break;
			}
			if (session?.user) {
				const response = await fetch(`/api/users/${session.user.id}`, {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json'
					}
				});

				if (response.ok) {
					const user = (await response.json()) as User;
					store.set({
						isAuthenticated: true,
						user,
						isVerified: user.isPhoneVerified // or your logic
					});
				} else {
					store.set({
						isAuthenticated: false,
						user: null,
						isVerified: false
					});
				}
			} else {
				store.set({
					isAuthenticated: false,
					user: null,
					isVerified: false
				});
			}
		});
	}

	return store;
}

export const authStore = createAuthStore();
