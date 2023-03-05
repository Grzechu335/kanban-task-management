/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class',
    content: [
        './app/**/*.{js,ts,jsx,tsx}',
        './pages/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',

        // Or if using `src` directory:
        './src/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        screens: {
            tablet: '768px',
            desktop: '1440px',
        },
        colors: {
            'main-purple': '#635FC7',
            'main-purple-hover': '#A8A4FF',
            black: '#000112',
            'very-dark-grey': '#20212C',
            'dark-grey': '#2B2C37',
            'lines-dark': '#3E3F4E',
            'medium-gray': '#828FA3',
            'lines-light': '#E4EBFA',
            'light-grey': '#F4F7FD',
            white: '#fff',
            red: '#EA5555',
            'red-hover': '#FF9898',
        },
        extend: {
            fontFamily: {
                sans: ['var(--font-jakarta-sans)'],
            },
        },
    },
    plugins: [require('tailwind-scrollbar-hide')],
}
