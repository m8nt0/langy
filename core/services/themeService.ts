// # Theme management logic
// I will implement this later
import { writable } from 'svelte/store';
// import { browser } from '$app/environment';

function createThemeStore() {
    // Get initial theme from localStorage or system preference
    const getInitialTheme = () => {
        // if (browser) {
            const stored = localStorage.getItem('theme');
            if (stored) return stored;
            
            const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            return systemPrefersDark ? 'dark' : 'light';
        // }
        // return 'light';
    };

    const { subscribe, set } = writable(getInitialTheme());

    return {
        subscribe,
        toggle: () => {
            // if (browser) {
                const current = document.documentElement.getAttribute('data-theme');
                const newTheme = current === 'dark' ? 'light' : 'dark';
                
                document.documentElement.setAttribute('data-theme', newTheme);
                localStorage.setItem('theme', newTheme);
                set(newTheme);
            // }
        },
        set: (theme: 'light' | 'dark') => {
            // if (browser) {
                document.documentElement.setAttribute('data-theme', theme);
                localStorage.setItem('theme', theme);
                set(theme);
            // }
        }
    };
}

export const theme = createThemeStore(); 