
const fs = require('fs')
const Router = require('koa-router')
const router = new Router()
const multer = require('koa-multer')
const upload = multer({ dest: __dirname + '/../../../static/uploads' })
const tools = require('../../utils/tools')

router.post('/', upload.single('file'), async (ctx) => {
    tools.isEmpty(ctx.req.file) && ctx.throw(400, 'Upload Without-- File')
    tools.isEmpty(ctx.req.body.uploadFile) && ctx.throw(400, 'Upload Without-- UploadFile')
    // use upload.single('file')  => formdata.file of client is setted ctx.req.file
    const file = ctx.req.file
    //the other data field will be setted into ctx.req.body
    const uploadFile = ctx.req.body.uploadFile
    // the sourceFile path we want to move
    const sourceFile = `${__dirname}/../../../static/uploads/${file.filename}` 
    // the dest path to store sourceFile
    const destPath = `${__dirname}/../../../static/uploads/${uploadFile}/${file.filename}`
    // the dir we set the name we wnat 
    const destPathDir = `${__dirname}/../../../static/uploads/${uploadFile}`
    // mkdir if not exist dir 
    //!fs.existsSync(destPathDir) && fs.mkdirSync(destPathDir)
    if(!fs.existsSync(destPathDir)) {
        const promiseDir = new Promise((resolve, reject) => { 
            //use promise to make sure destPathDir is setted           
            fs.mkdir(destPathDir, { recursive: true }, (err) => {
                if (err) reject(new Error(err))
                resolve('isSet')
            })
        }).then((value) => {
            //upload file will be seted in default folder '/static/uploads', after upload asunc moving file to custom folder 
            fs.rename(sourceFile, destPath, (err) => { if (err) throw err})                
            return value
        }).catch((err => {
            console.log(err)  
        }))
        try {            
            const res = await promiseDir
            //make sure Promise is OK
            if(res === 'isSet') {
                file.url = `${uploadFile}/${file.filename}`            
                return ctx.body = { file }
            }
            ctx.status = 404            
        }catch(err) {
            ctx.body = { msg:err.message }
            ctx.app.emit('error', err, ctx);
        }
    } else {
        try {
            fs.rename(sourceFile, destPath, (err) => { if (err) throw err})
            file.url = `${uploadFile}/${file.filename}`
            return ctx.body = { file }
        }catch(err) {
            ctx.body = { msg:err.message }
            ctx.app.emit('error', err, ctx);
        }        
    }
    
    // if(!fs.existsSync(destPathDir)) {
    //     fs.mkdir(destPathDir, { recursive: true }, (err) => {
    //         if (err) throw err
    //     })
    // }
    // try {        
    //     //upload file will be seted in default folder '/static/uploads', after upload asunc moving file to custom folder       
    //     fs.rename(sourceFile, destPath, (err) => {
    //         if (err) throw err
    //     })
    //     //nuxt static/uploads
    //     //file.url = `${process.env.BASE_URL? process.env.BASE_URL:'http://localhost:3000'}/uploads/${uploadFile}/${file.filename}`
    //     file.url = `${uploadFile}/${file.filename}`
    //     return ctx.body = {
    //         file
    //     }
    // }
    // catch(err) {
        
    //     ctx.body = {
    //         msg:err.message
    //     }
    //     ctx.app.emit('error', err, ctx);
    // }
})

module.exports = router.routes();