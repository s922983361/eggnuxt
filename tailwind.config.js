/*
** TailwindCSS Configuration File
**
** Docs: https://tailwindcss.com/docs/configuration
** Default: https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
*/
module.exports = {
    theme: {
        fontFamily: {
            'sans': ['Helvetica', 'Arial', '微軟正黑體', 'STHeiti ', 'sans-serif'],
            'serif': ['Georgia', 'Cambria', 'PMingLiU', 'PingFang', 'serif'],
            'kai': 'cwtexkai',
            'yen': 'cwtexyen',
            'fangsong': 'cwtexfangsong',
            'ming': 'cwtexming',
        },
        screens: { 
            'sm': '640px',// => @media (min-width: 640px) { ... }
            'md': '768px',// => @media (min-width: 768px) { ... }
            'lg': '1024px',// => @media (min-width: 1024px) { ... }
            'xl': '1280px',// => @media (min-width: 1280px) { ... }
        },
    },
    variants: {
        backgroundColor: ['responsive', 'hover', 'focus', 'active']
    },
    plugins: []
}
