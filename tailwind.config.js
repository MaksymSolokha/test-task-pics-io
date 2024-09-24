/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            boxShadow: {
                'custom-shadow':
                    '0px 8px 12px 6px rgba(60, 64, 67, 0.15), 0px 4px 4px 0px rgba(60, 64, 67, 0.30)',
            },
        },
    },
    plugins: [],
}
