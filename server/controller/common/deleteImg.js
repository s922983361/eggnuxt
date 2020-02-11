
const fs = require('fs')
const Router = require('koa-router')
const router = new Router()
const tools = require('../../utils/tools')

router.post('/', async (ctx) => {
    //ctx.request.body.imgPath is database image path & should be a 'String'
    const filePath = ctx.request.body.imgPath
    tools.isEmpty(filePath) && ctx.throw(400, 'DeleteImg Without-- FilePath')
    const destPath = `${__dirname}/../../../static/uploads/${filePath}`
    if(fs.existsSync(destPath)) {
        //async delete brandLogo Image
        fs.unlink(destPath, (err) => {
            if (err) throw err
        })
        return ctx.body = 'this image is deleted!'
    }
    ctx.body = 'not found!'
})

module.exports = router.routes();