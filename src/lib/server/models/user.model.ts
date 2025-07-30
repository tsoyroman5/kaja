import type { Database } from '$lib/server/types/supabase';
type UserRow = Database['public']['Tables']['users']['Row'];

export class User {
	id: string;
	email: string;
	firstName: string;
	lastname: string;
	bio: string | null;
	profileImageUrl: string | null;
	isPhoneVerified: boolean;
	initials: string;
	createdAt: Date;

	constructor(data: UserRow) {
		this.id = data.id;
		this.email = data.email;
		this.firstName = data.first_name;
		this.lastname = data.last_name;
		this.bio = data.bio;
		this.profileImageUrl = data.profile_image_url;
		this.isPhoneVerified = data.is_phone_verified;
		this.initials = this.getInitials(`${data.first_name} ${data.last_name}`);
		this.createdAt = new Date(data.created_at);
	}

	private getInitials(name: string): string {
		if (!name) return '?';
		const parts = name.split(' ');
		if (parts.length > 1) {
			return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
		}
		return name.substring(0, 2).toUpperCase();
	}
}

export function toUser(data: UserRow): User {
	return new User(data);
}

// Optional: Mapper for a list of users
export function toUsers(data: UserRow[]): User[] {
	return data.map(toUser);
}
