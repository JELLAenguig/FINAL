import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class', 
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
       
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
                'poppins': 'Poppins',
                'ticket': 'Times New Roman',
            },
            boxShadow: {
                'custom': '0.5px 0.8px 2px rgba(55, 65, 81, 0.5)', // Custom shadow
              },
              fontSize: {
                'text-15': '15px',
              },
              width:{
                'serviceStat': '33.6%',
                'count': '37%',
                'serveStat2': '57.4%',
              },
              height:{
                'screenvid': '70vh',
                'queue': '60vh',
                'logo': '3',
                'ticket': '30rem',
                'button': '8vh',
                'back': '6vh',
              },
              width:{
                'logo': '4vw',
              },
              fontSize:{
                'td': '2.5vh',
                'queue-td': '4vh',
                'call': '5vh',
              },
              backgroundColor: {
                'buttonsColor': 'rgb(0, 101, 74)',
                'del': 'rgba(193, 75, 75, 0.915)',
              },
              dropShadow:{
                'text-shadow': '1px 0.7px 0.5px rgb(2, 72, 58)',
              },
              
        },
    },

    plugins: [forms],
};
