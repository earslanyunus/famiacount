/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    container:{
      center: true,
      padding:{
        DEFAULT: '1rem',
      }
    },
    fontSize:{
      'text-xs': ['0.75rem', '1.125rem'],
      'text-sm': ['0.875rem', '1.25rem'],
      'text-md': ['1rem', '1.5rem'],
      'text-lg': ['1.125rem', '1.75rem'],
      'text-xl': ['1.25rem', '1.875rem'],
      'display-xs': ['1.5rem', '2rem'],
      'display-sm': ['1.875rem', '2.375rem'],
      'display-md': ['2.25rem', '2.75rem'],
      'display-lg': ['3rem', '3.75rem'],
      'display-xl': ['3.75rem', '4.5rem'],

    },
    extend: {
      colors:{
        warning: {
            '25': '#fffcf5',
            '50': '#fffaeb',
            '100': '#fef0c7',
            '200': '#fedf89',
            '300': '#fec84b',
            '400': '#fdb022',
            '500': '#f79009',
            '600': '#dc6803',
            '700': '#b54708',
            '800': '#93370d',
            '900': '#7a2e0e',
        },
   
        gray: {
            '25': '#fcfcfd',
            '50': '#f9fafb',
            '100': '#f2f4f7',
            '200': '#eaecf0',
            '300': '#d0d5dd',
            '400': '#98a2b3',
            '500': '#667085',
            '600': '#475467',
            '700': '#344054',
            '800': '#1d2939',
            '900': '#101828',
        },     primary: {
          '25': '#fdf7f3',
          '50': '#fbeee8',
          '100': '#f7ded1',
          '200': '#f5d6c5',
          '300': '#f0c5ae',
          '400': '#eebda2',
          '500': '#eaac8b',
          '600': '#d39b7d',
          '700': '#bb8a6f',
          '800': '#a47861',
          '900': '#8c6753',
        },
        }
    },
  },
  plugins: [function({addComponents,theme}){
   
    addComponents({
      // // px-5 py-3 bg-primary-600 text-text-md font-semibold text-white rounded-lg hover:bg-primary-700
      '.btn-primary-lg':{
        padding:'0.75rem 1.5rem',
        backgroundColor:theme('colors.primary.600'),
        color:theme('textColor.white'),
        fontSize:theme('fontSize.text-lg'),
        lineHeight:'1.75rem',
        fontWeight:'600',
        borderRadius:theme('borderRadius.lg'),
        '&:hover':{
          backgroundColor:theme('colors.primary.700'),
        },
        '&:focus':{
          boxShadow: '0px 1px 2px rgba(16, 24, 40, 0.05), 0px 0px 0px 4px #F4EBFF'
        }
      
      },
      '.btn-color-link':{
        fontSize:theme('fontSize.text-sm'),
        lineHeight:'1.25rem',
        fontWeight:'600',
        color:theme('colors.primary.700'),

      },
// px-3.5 py-2.5 text-text-md font-normal rounded-lg border text-gray-900 border-gray-300 placeholder:text-gray-500 focus:border-primary-300 focus:outline-none
      '.input-field':{
        padding:'0.625rem 0.875rem',
        fontSize:theme('fontSize.text-md'),
        lineHeight:'1.5rem',
        fontWeight:'400',
        borderRadius:theme('borderRadius.lg'),
        border:'1px solid',
        borderColor:theme('colors.gray.300'),
        color:theme('colors.gray.900'),
        '&:focus':{
          borderColor:theme('colors.primary.300'),
          outline:'none',
          boxShadow: '0px 1px 2px rgba(16, 24, 40, 0.05), 0px 0px 0px 4px #F4EBFF'
        },
        '&::placeholder':{
          color:theme('colors.gray.500')
        }


      }
    })
  }],
}

