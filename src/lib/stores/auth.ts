import { writable } from 'svelte/store';

export interface User {
    id: string;
    email: string;
    name: string;
    avatar?: string;
    role?: string;
}

export interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    loading: boolean;
}

function createAuthStore() {
    const { subscribe, set, update } = writable<AuthState>({
        user: null,
        isAuthenticated: false,
        loading: true
    });

    return {
        subscribe,
        login: (userData: User) => set({ 
            user: userData, 
            isAuthenticated: true, 
            loading: false 
        }),
        logout: () => set({ 
            user: null, 
            isAuthenticated: false, 
            loading: false 
        }),
        setLoading: (loading: boolean) => update(state => ({ 
            ...state, 
            loading 
        })),
        updateUser: (userData: Partial<User>) => update(state => ({
            ...state,
            user: state.user ? { ...state.user, ...userData } : null
        }))
    };
}

export const auth = createAuthStore();
