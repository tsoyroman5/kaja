import { writable } from 'svelte/store';

export const toast = writable({
    message: '',
    type: 'success',
    visible: false
});

export function showToast(message: string, type: 'success' | 'error' | 'info' | 'warning' = 'info', duration: number = 3000) {
    toast.set({ message, type, visible: true });

    setTimeout(() => {
        toast.set({ message: '', type, visible: false });
    }, duration);
}