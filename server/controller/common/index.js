const Router = require('koa-router')
const router = new Router()
const svgCaptcha = require('../../utils/svgCaptcha')

/**
 * @desc svg-captcha 驗證碼接口
 * @point **session can not use middleware to send something, that is very important**
 */
router.get('/captcha', async (ctx) => {
    const captcha = await svgCaptcha()
    
    ctx.response.type = 'image/svg+xml'
    ctx.session.captchaCode = captcha.text
    //console.log('/captcha code:',ctx.session.captchaCode)
    ctx.body = captcha.data
})

/**
 * @desc svg-captcha 驗證碼接口
 * @point **session can not use middleware to send something, that is very important**
 */
router.post('/captcha', async (ctx) => {

    const captcha = ctx.request.body.captcha
    let captchaMatch = false
    if(ctx.session.captchaCode.toLocaleUpperCase() == captcha.toLocaleUpperCase()) captchaMatch = true        
    ctx.body = {
        isMatch: captchaMatch
    }
})


module.exports = router.routes();