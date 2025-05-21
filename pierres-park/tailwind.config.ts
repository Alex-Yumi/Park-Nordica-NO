import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'nordic': {
          'blue': '#4A90E2',
          'orange': '#FF6B6B',
          'light': '#F5F7FA',
          'dark': '#2C3E50',
          'gray': '#95A5A6',
        }
      },
      animation: {
        'highlight': 'highlightTarget 1.5s ease-in-out',
        'slideLeft': 'slideLeft 20s linear infinite',
      },
      transformStyle: {
        '3d': 'preserve-3d',
      },
      backfaceVisibility: {
        'hidden': 'hidden',
      },
      perspective: {
        '1000': '1000px',
      },
      rotate: {
        'y-180': 'rotateY(180deg)',
      },
    },
  },
  plugins: [],
}
export default config 