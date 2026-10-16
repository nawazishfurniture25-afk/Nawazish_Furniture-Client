import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext(null);

const STORAGE_KEY = 'nawazish_theme';

export function ThemeProvider({ children }) {
    const [theme, setTheme] = useState('light');

    // Load theme on mount
    useEffect(() => {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            const prefersDark = window.matchMedia(
                '(prefers-color-scheme: dark)'
            ).matches;
            const initial = saved || (prefersDark ? 'dark' : 'light');
            setTheme(initial);
            document.documentElement.setAttribute('data-theme', initial);
        } catch (err) {
            console.error('Theme load failed:', err);
        }
    }, []);

    // Apply theme on change
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        try {
            localStorage.setItem(STORAGE_KEY, theme);
        } catch (err) {
            console.error('Theme save failed:', err);
        }
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme, isDark: theme === 'dark' }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within ThemeProvider');
    }
    return context;
}