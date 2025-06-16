import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/styles/**/*.css',
  ],
  theme: {
    extend: {
      colors: {
        base: {
          DEFAULT: '#1D2527',
          subtle: {
            l1: '#2D3537',
            l2: '#3A4346',
            l3: '#4A5356',
          },
        },
        accent: {
          primary: '#06b6d4',
          secondary: 'teal-400',
        },
        onBase: {
          DEFAULT: 'white',
          impact: '#06b6d4',
        },
        onAccent: '#1D2527',
      },
      spacing: {
        l1: '8px',
        l2: '12px',
        l3: '16px',
        l4: '24px',
      },
    },
  },
  plugins: [],
}
export default config
