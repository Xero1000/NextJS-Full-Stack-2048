import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      spacing: {
        '128': '32rem',
      },
      colors: {
        'light-green': '#7ffc74',
        'green': '#05fa19',
        'yellow': '#FFFF00',
        'red': '#f70202',
        'orange': '#FFA500',
        'blue': '#1900ff'
      }
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light", "black", "luxury"],
  },
}
export default config
