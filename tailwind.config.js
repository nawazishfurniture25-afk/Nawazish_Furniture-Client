/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                cream: {
                    DEFAULT: '#f6f1e7',
                    dark: '#efe7d6',
                    darker: '#e6dcc6',
                },
                gold: {
                    DEFAULT: '#a37b34',
                    bright: '#c8a464',
                    deep: '#7a5a26',
                },
                ink: {
                    DEFAULT: '#1c1a16',
                    soft: '#3d3830',
                    muted: '#6b6256',
                },
                terra: '#b8542c',
                forest: '#2f4a3c',
            },
            fontFamily: {
                serif: ['Fraunces', 'Georgia', 'serif'],
                sans: ['Manrope', 'system-ui', 'sans-serif'],
            },
        },
    },
    plugins: [],
};