require('dotenv').config()
const webpack = require('webpack')

module.exports = {
	mode: 'universal',
	env: {
		//baseUrl: process.env.BASE_URL || 'http://localhost:3000',
		BASE_URL: process.env.BASE_URL,
		NODE_ENV: process.env.NODE_ENV,
		IMG_PATH: `${process.env.BASE_URL}/uplods/`		
	},
	router: {
		middleware: [],		
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
			{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
			//Google Free Chinese Font-family , it is neccessary to use global CSS Link, Do not use "webfontloader"
			{ rel: 'stylesheet', href: 'https://fonts.googleapis.com/earlyaccess/cwtexkai.css' }, //Google楷體
			{ rel: 'stylesheet', href: 'https://fonts.googleapis.com/earlyaccess/cwtexyen.css' }, //Google圓體
			{ rel: 'stylesheet', href: 'https://fonts.googleapis.com/earlyaccess/cwtexfangsong.css' },//Google仿宋體
			{ rel: 'stylesheet', href: 'https://fonts.googleapis.com/earlyaccess/cwtexming.css' },//Google明體
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
		'element-ui/lib/theme-chalk/index.css', //used by element-ui		
	],

	/*
	** Plugins to load before mounting the App
	*/
	plugins: [
		{ src: '@/plugins/axios', ssr: true },
		{ src: '@/plugins/element-ui', ssr: true },
		{ src: '@/plugins/lodash.js', ssr: false },
		{ src: '@/plugins/helper.js', ssr: false },
		{ src: '@/plugins/imgCompress.js', ssr: false },
		{ src: '@/plugins/nuxt-quill-plugin.js', ssr: false },
		{ src: '@/plugins/barcode.js', ssr: false },
		{ src: '@/plugins/vue-scrollto.js', ssr: false },
		{ src: '@/plugins/vue-owl-carousel.js', ssr: false },
		{ src: '@/plugins/vue-lazyload.js', ssr: true },
		{ src: '@/plugins/vue-slick.js', ssr: false },
	],

	/*
	** Nuxt.js dev-modules
	*/
	buildModules: [
		'@nuxtjs/tailwindcss',
		'@nuxtjs/fontawesome'
	],
	/**
	 * @desc how to solve @apply in vscode error
	 * https://www.meidev.co/blog/visual-studio-code-css-linting-with-tailwind/*/
	//tailwindcss setting
	tailwindcss: {		
		purgeCSSInDev: false,
		exposeConfig: true
	},
	//tailwindcss purgeCSS setting
	purgeCSS: {
		//保留elment-ui的樣式
		whitelistPatternsChildren: [/^el-/],
		//刪除沒用到的animate.css
		keyframes: true
	},
	//fontawesome setting
	fontawesome: {
		component: 'fa',
		suffix: true,
		//list the icons you want to add, not listed icons will be tree-shaked
		icons: {
			//Which icons you will use. FontAwesome currently supports 5 icon styles of which 2 are freely available.
			solid: ['faHome', 'faHeart', 'faEye'],
			brands: []
		}
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
		'@nuxtjs/toast',
		'@nuxtjs/sitemap',
		'@nuxtjs/robots',
		'nuxt-vuex-router-sync',
		'nuxt-webfontloader',
		'nuxt-maintenance-mode',
		'nuxt-mq',
		'@tui-nuxt/editor',
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
	** Toast module configuration
	** See https://www.npmjs.com/package/@nuxtjs/toast
	*/
	toast: {
		position: 'top-center',
		register: [ // Register custom toasts
			{
				name: 'my-error',
				message: 'Oops...Something went wrong',
				options: {
					type: 'error'
				}
			}
		]
	},

	/*
	** Sitemap module configuration
	** See https://www.npmjs.com/package/@nuxtjs/sitemap
	*/
	sitemap: {
		hostname: 'https://stationeryhub.net',
		gzip: true,
		exclude: [
			'/secret',
			'/admin/**'
		]
	},

	/*
	** Robots module configuration
	** See https://www.npmjs.com/package/@nuxtjs/robots
	*/
	robots: {
		UserAgent: '*',
		Disallow: '/'
	},
	
	/*
	** Webfontloader module configuration
	** See https://www.npmjs.com/package/nuxt-webfontloader
	*/
	webfontloader: {
		google: {
			//See https://www.ctolib.com/Developmint-nuxt-webfontloader.html
			//See https://developers.google.com/fonts/docs/getting_started
			//See https://www.oxxostudio.tw/articles/201811/css-font-family.html
			//See https://www.npmjs.com/package/webfontloader
			families: [
				'Lato:n4,i4,n7,i7',
				'Noto Serif TC:n4,n7',
				'Noto Sans TC:n4,n7',
				'Playfair Display:n4,i4,n7,i7',
			],
			urls: [
				// for each Google Fonts add url + options you want
				// here add font-display option
				'https://fonts.googleapis.com/css?family=Lato:400,400i,700,700i&display=swap',
				'https://fonts.googleapis.com/css?family=Noto+Serif+TC:400,700&display=swap',
				'https://fonts.googleapis.com/css?family=Noto+Sans+TC:400,700&display=swap',
				'https://fonts.googleapis.com/css?family=Playfair+Display:400,400i,700,700i&display=swap',

			]
		}
	},

	/*
	** Maintenance mode module configuration
	** See https://www.npmjs.com/package/nuxt-maintenance-mode
	*/
	maintenance: {
		enabled: !!(process.env.MAINTENANCE_MODE), // If given truthy value, activation maintenance mode on startup your nuxt application.
		path: '/maintenance', // maintenance fallback content routing.
		matcher: /^\/admin/ // Path to be in maintenance mode (regex).
	},

	/*
	** Mq module configuration
	** See https://www.npmjs.com/package/nuxt-mq
	*/
	mq: {
		defaultBreakpoint: "desktop",
		breakpoints: {
			mobile: 768,
			tablet: 1024,
			desktop: 1400,
			desktopWide: 2000,
			desktopUltraWide: Infinity
		}
	},

	/*
	** Toast UI Editor module configuration
	** See https://github.com/tui-nuxt/editor#%EF%B8%8Feditor
	*/
	tui: {
		editor: {
			stylesheet: {
				editor: 'tui-editor/dist/tui-editor.min.css',
				contents: 'tui-editor/dist/tui-editor-contents.min.css',
				codemirror: 'codemirror/lib/codemirror.css',
				codeHighlight: 'highlight.js/styles/github.css',
				colorPicker: 'tui-color-picker/dist/tui-color-picker.min.css'
			}
		}
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
		extend (config, {isServer}, ctx) {
			config.node = {
				fs: 'empty'
			}
			if (isServer) {
				config.externals = [
					require('webpack-node-externals')({
						whitelist: [/^vue-slick/]
					})
				]
			}
		},
		plugins: [
			new webpack.ProvidePlugin({
				'window.Quill': 'quill/dist/quill.js',
				'Quill': 'quill/dist/quill.js'
			})
		]		
	}
}
