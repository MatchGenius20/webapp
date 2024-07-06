import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      sm: '480px',
      md: '600px',
      mdlg: '800px',
      lg: '976px',
      lgx: '1200px',
      xl: '1440px',
    },
    fontFamily: {
      base: ['Inter', 'Raleway', 'sans-serif'],
    },
    extend: {
      colors: {
        base: '#FFFFFF',
        baseTwo: '#D9D9D9',
        // primary: '#012C7A',
        primary: '#305dbf',
        secondary: '#00BE9D',
        primaryShade: '#C0DDF9',
        panelDark: '#213555',
        panelLight: '#19376D',
      },
    },
  },
  plugins: [],
}
export default config
