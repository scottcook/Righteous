/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{vue,js}'],
    theme: {
        colors: {
            current: 'currentColor',
            black: '#000000',
            white: '#ffffff',
            'brand-cream': '#F5F4EB',
            'brand-charcoal': '#151515',
            'brand-pink': '#EA3779',
        },
        fontFamily: {
            grotesk: ['"Space Grotesk"', 'sans-serif'] /* font-light, font-normal, font-medium, font-semibold, font-bold */,
            helveticaDisplay: ['"Helvetica Now Display"', 'sans-serif'] /* font-light, font-medium, font-bold */,
            helveticaText: ['"HelveticaNowText"', 'sans-serif'] /* font-medium */,
            canela: ['"Canela Web"', 'serif'] /* font-black */,
        },
        extend: {
            gridColumn: {
                full: 'full',
                main: 'main',
                'full/main': 'full-start/main-end',
                'main/full': 'main-start/full-end',
            },
            gridTemplateColumns: {
                // Currently set to the max (from Figma) of approx. 1440px.
                wrapper: '[full-start] minmax(1.25rem, 1fr) [main-start] minmax(0, 90rem) [main-end] minmax(1.25rem, 1fr) [full-end]',
            },
            spacing: {
                18: '4.5rem',
            },
            transformOrigin: {
                20: '8px 50%', // For menu icon path rotate
            },
        },
    },
    plugins: [],
};
