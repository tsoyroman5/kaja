import { supabase } from '$lib/supabaseClient';
import { User } from '../models/user.model';
import type { Database } from '$lib/server/types/supabase';

export type UserRow = Database['public']['Tables']['users']['Row'];

export type UserRepository = {
	findById: (id: string) => Promise<User | null>;
	findByEmail: (email: string) => Promise<User | null>;
	update: (user: User) => Promise<User>;
};

export const userRepository: UserRepository = {
	findById: async (id: string) => {
		const { data, error } = await supabase.from('users').select('*').eq('id', id).single();

		if (error) {
			console.log('Error fetching user by ID:', error);
			return null;
		}

		return new User(data);
	},
	findByEmail: async (email: string) => {
		const { data, error } = await supabase.from('users').select('*').eq('email', email).single();

		if (error) {
			return null;
		}

		return new User(data);
	},
	update: async (user: User) => {
		throw new Error('Method not implemented.');
	}
};
