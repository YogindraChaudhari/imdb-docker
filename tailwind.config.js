/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Enable dark mode with class-based toggling
  theme: {
    extend: {
      colors: {
        // Custom color palette for dark and light modes
        light: {
          background: '#ffffff',
          text: '#333333',
          primary: '#3B82F6',
          secondary: '#6B7280',
        },
        dark: {
          background: '#121212',
          text: '#E0E0E0',
          primary: '#2563EB',
          secondary: '#9CA3AF',
        }
      },
      screens: {
        // Custom breakpoints for more granular responsiveness
        'xs': '320px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
      fontSize: {
        // Responsive typography
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
      },
      boxShadow: {
        // Enhanced shadows for dark and light modes
        'light': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'dark': '0 4px 6px -1px rgba(255, 255, 255, 0.1), 0 2px 4px -1px rgba(255, 255, 255, 0.06)',
      }
    },
  },
  plugins: [],
}