/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Paleta KIKK style
        'kikk-black': '#000000',
        'kikk-dark': '#111111', // Gris muy oscuro para fondos
        'kikk-white': '#FFFFFF',
        'kikk-orange': '#FF9900',
        'kikk-orange-light': '#FFA500',
        'kikk-gray-dark': '#333333',
        'kikk-gray': '#666666',
        // Colores originales mantenidos para compatibilidad
        //#000000, #FFFFFF, #FFA500, #FF8C00, #8A2BE2, #4B0082, #696969
        // #000000, #FFFFFF, #FFA500, #FF8C00, #FF4500, #F5F5DC
        'black': {
          DEFAULT: '#000000',
          100: '#000000',
          200: '#000000',
          300: '#000000',
          400: '#000000',
          500: '#000000',
          600: '#333333',
          700: '#666666',
          800: '#999999',
          900: '#cccccc'
        },
        'licorice': {
          DEFAULT: '#24120d',
          100: '#070403',
          200: '#0f0705',
          300: '#160b08',
          400: '#1e0f0b',
          500: '#24120d',
          600: '#693426',
          700: '#ac563e',
          800: '#ce8b78',
          900: '#e7c5bc'
        },
        'jet': {
          DEFAULT: '#33302f',
          100: '#0a0909',
          200: '#141313',
          300: '#1e1c1c',
          400: '#282625',
          500: '#33302f',
          600: '#5d5856',
          700: '#88817e',
          800: '#b0aba9',
          900: '#d7d5d4'
        },
        'giants-orange': {
          DEFAULT: '#f96230',
          100: '#391002',
          200: '#731f04',
          300: '#ac2f05',
          400: '#e63f07',
          500: '#f96230',
          600: '#fa8159',
          700: '#fba182',
          800: '#fcc0ac',
          900: '#fee0d5'
        },
        'sandy-brown': {
          DEFAULT: '#fca045',
          100: '#3f2001',
          200: '#7f4002',
          300: '#be6003',
          400: '#fb8106',
          500: '#fca045',
          600: '#fdb46a',
          700: '#fdc68f',
          800: '#fed9b5',
          900: '#feecda'
        },
        'rust': {
          DEFAULT: '#b94722',
          100: '#250e07',
          200: '#4a1d0e',
          300: '#6f2b14',
          400: '#94391b',
          500: '#b94722',
          600: '#db633a',
          700: '#e48a6c',
          800: '#edb19d',
          900: '#f6d8ce'
        },
        'red': {
          DEFAULT: '#ff0000',
          100: '#330000',
          200: '#660000',
          300: '#990000',
          400: '#cc0000',
          500: '#ff0000',
          600: '#ff3333',
          700: '#ff6666',
          800: '#ff9999',
          900: '#ffcccc'
        },
        'seasalt': {
          DEFAULT: '#fafafa',
          100: '#323232',
          200: '#646464',
          300: '#969696',
          400: '#c8c8c8',
          500: '#fafafa',
          600: '#fbfbfb',
          700: '#fcfcfc',
          800: '#fdfdfd',
          900: '#fefefe'
        }
      }
    },
  },
  plugins: [],
}

