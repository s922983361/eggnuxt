require('dotenv').config()

module.exports = {
	mode: 'universal',
	env: {
		//baseUrl: process.env.BASE_URL || 'http://localhost:3000',
		BASE_URL: process.env.BASE_URL,
		NODE_ENV: process.env.NODE_ENV		
	},
	router: {
		middleware: []
	},
	
	/*
	** Headers of the page
	*/
	head: {
		title: process.env.npm_package_name || '',
		meta: [
			{ charset: 'utf-8' },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
			{ hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
		],
		link: [
			{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
		]
	},

	/*
	** Customize the progress-bar color
	*/
	loading: { color: '#fff' },
	/*
	** Global CSS
	*/
	css: [
		'element-ui/lib/theme-chalk/index.css'
	],

	/*
	** Plugins to load before mounting the App
	*/
	plugins: [
		{ src: '@/plugins/axios', ssr: true },
		{ src: '@/plugins/element-ui', ssr: true },
		{ src: '@/plugins/lodash.js', ssr: false },
		{ src: '@/plugins/imgCompress.js', ssr: false },	
	],

	/*
	** Nuxt.js dev-modules
	*/
	buildModules: [
		'@nuxtjs/tailwindcss'
	],
	purgeCSS: {
		//保留elment-ui的樣式
		whitelistPatternsChildren: [/^el-/],
		//刪除沒用到的animate.css
		keyframes: true
	},

	/*
	** Nuxt.js modules
	*/
	modules: [
		// Doc: https://axios.nuxtjs.org/usage
		'@nuxtjs/axios',
		'@nuxtjs/pwa',
		// Doc: https://github.com/nuxt-community/dotenv-module
		'@nuxtjs/dotenv',
	],

	/*
	** Axios module configuration
	** See https://axios.nuxtjs.org/options
	*/
	axios: {
		//baseURL: process.env.BASE_URL,
		retry: { retries: 3 },
	},	
	/*
	** Build configuration
	*/
	build: {
		analyza: { // 啟動分析 npm run build --analyze
			analyzeMode: 'static'
		},

		extractCSS: true,//提取css
		transpile: [/^element-ui/],
		/*
		** You can extend webpack config here
		*/
		extend (config, ctx) {
			config.node = {
				fs: 'empty'
			}
		}
	}
}
