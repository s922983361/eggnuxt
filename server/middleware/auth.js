/**
 * @https://www.npmjs.com/package/superagent
 * @https://blog.csdn.net/liebert/article/details/82790701
 * @desc use superagent module to do httpclient request & Isauth from EGG_API_URL/admin/common/isAuthenticated API
 */

const curl = require('superagent')

module.exports = () => {
    return async (ctx, next) => {
        try {
            const token = ctx.request.header.authorization
            const URL = `${process.env.EGG_API_URL}/admin/common/isAuthenticated`
            const res = await curl.get(URL).set('authorization', token).accept('application/json')
            //res is "http Response" not ctx.body of eggServer
            if(res.status == 200 && res.body.auth == true) await next()
        }
        catch(err) {
            ctx.app.emit('error', err, ctx);
        }        
    }
}