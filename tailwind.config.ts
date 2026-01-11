import type { Config } from "tailwindcss"

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                alcovia: {
                    green: '#234944',    // Primary: Deep Forest Green
                    beige: '#E5D1BE',    // Primary: Warm Beige
                    mustard: '#EABF36',  // Primary: Golden Mustard
                    blue: '#002C45',     // Secondary: Dark Navy Blue
                    burgundy: '#912F3C', // Secondary: Deep Burgundy
                }
            },

            fontFamily: {
                display: ['var(--font-monument)', 'sans-serif'], // For Headlines
                body: ['var(--font-satoshi)', 'sans-serif'],     // For Paragraphs
            },
            animation: {
                marquee: 'marquee 25s linear infinite',
            },
            keyframes: {
                marquee: {
                    '0%': { transform: 'translateX(0%)' },
                    '100%': { transform: 'translateX(-100%)' },
                }
            }
        },
    },
    plugins: [],
}
export default config
