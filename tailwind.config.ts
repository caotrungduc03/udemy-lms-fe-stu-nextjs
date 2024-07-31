import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    fontFamily: {
      'udemy-sans': ['var(--font-udemy-sans)', '-apple-system'],
    },
    extend: {
      colors: {
        primary: '#2d2f31',
      },
      borderRadius: {
        '50': '50%',
      },
    },
  },
  plugins: [],
};
export default config;
