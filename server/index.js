const Koa = require('koa')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const CONFIG = require('../server.config.js')

/* middlewares */
const json = require('koa-json')//json pretty
const Router = require('koa-router')
const logger = require('koa-logger')// log requests
const helmet = require("koa-helmet")//security headers
const session = require('koa-session')
const bodyParser = require('koa-bodyparser')//post parse tools

/* router middlewares */
const auth = require('./middleware/auth')

/* main */
const app = new Koa()
const router = new Router()


//******************* */ Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = app.env !== 'production'

async function start () {
  // Instantiate nuxt.js
	const nuxt = new Nuxt(config)

	const {
		host = process.env.HOST || '127.0.0.1',
		port = process.env.PORT || 3000
	} = nuxt.options.server

	// Build in development
	if (config.dev) {
		const builder = new Builder(nuxt)
		await builder.build()
	} else {
		await nuxt.ready()
	}

	app.use((ctx) => {
		ctx.status = 200
		ctx.respond = false // Bypass Koa's built-in response handling
		ctx.req.ctx = ctx // This might be useful later on, e.g. in nuxtServerInit or with nuxt-stash
		nuxt.render(ctx.req, ctx.res)
	})

	app.listen(port, host)
	consola.ready({
		message: `Server listening on http://${host}:${port}`,
		badge: true
	})
}

start()

/********************** global middleware ******************/

app.use(logger());
app.use(json());
app.keys = [process.env.SESSIONKEY]; //session Key
app.use(session(CONFIG.session, app));
app.use(bodyParser());
/** helmet security*/
app.use(helmet())
app.use(helmet.hidePoweredBy({ setTo: 'PHP 7.0.15' }))//fake X-Powered-By

/** set koa-router*/
app.use(router.routes()).use(router.allowedMethods())

/*************************** API **************************/
/** common API */


/** public API */
router.use('/api/common', require('./controller/common'))// common includ [svg-captcha, checkCapcha]


/** private API */
router.use('/api/admin/upload', auth(), require('./controller/common/upload'))//upload image API 
router.use('/api/admin/deleteImg', auth(), require('./controller/common/deleteImg'))//delete image API
router.use('/api/admin/deleteFolder', auth(), require('./controller/common/deleteFolder'))//delete Folder API 

/*********************** Error Listen ***********************/
app.on('error', (err, ctx) => {
	consola.error(err.message)
	consola.error(ctx.request.ip)
	console.log(err);
});
