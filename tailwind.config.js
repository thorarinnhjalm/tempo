/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Quicksand', 'Nunito', 'sans-serif'],
                serif: ['Playfair Display', 'serif'],
            },
            colors: {
                paper: '#fcfaf8',
                ink: '#2c332e',
                forest: {
                    DEFAULT: '#2d4a3e',
                    light: '#3d6152',
                },
                clay: '#d97757',
                mustard: '#e0a458',
            },
            borderRadius: {
                '4xl': '2rem',
                '5xl': '2.5rem',
            }
        },
    },
    plugins: [],
}
