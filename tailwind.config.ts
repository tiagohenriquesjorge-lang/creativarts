import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // CreativART's Brand Colors
        brand: {
          yellow: '#F9D648',
          blue: '#00AEEF',
          red: '#ED1C24',
          black: '#000000',
          'gray-dark': '#333333',
          'gray-light': '#F5F5F5',
          white: '#FFFFFF',
        },
        primary: '#ED1C24', // Red for primary actions
        secondary: '#00AEEF', // Blue
        accent: '#F9D648', // Yellow
      },
      fontFamily: {
        // Headings
        heading: ['Fredoka', 'Pacifico', 'Montserrat', 'sans-serif'],
        // Body text
        sans: ['Inter', 'Roboto', 'Poppins', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
}
export default config

