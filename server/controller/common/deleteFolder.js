
const fs = require('fs')
const Router = require('koa-router')
const router = new Router()
const tools = require('../../utils/tools')

router.post('/', async (ctx) => {
    //ctx.request.body.imgPath is database image path & should be a 'String'
    const filePath = ctx.request.body.folderPath
    tools.isEmpty(filePath) && ctx.throw(400, 'DeleteImg Without-- FilePath')
    const destPath = `${__dirname}/../../../static/uploads/${filePath}`

    if(fs.existsSync(destPath)) {
        await tools.asyncRmDir(destPath)
        return ctx.body = 'All Images are deleted!'
    }
    ctx.body = 'not found!'
})

module.exports = router.routes();