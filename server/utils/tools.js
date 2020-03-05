const fs = require("fs");
const path = require("path");

const tools = {    
    /**
     * @desc 判斷是否為空
     * return boolen
     */
    isEmpty:(value) => {
        return (
            value == undefined || 
            value === null || 
            (typeof value === 'object' && Object.keys(value).length === 0) ||
            (typeof value === 'string' && value.trim().length === 0)
        )
    },
    /**
     * @desc 異步刪除資料夾及內部所有文件
     */
    asyncRmDir: (dirPath) => {        
        return new Promise((resolve, reject) => {
            fs.stat(dirPath, (err, status) => {
                if (err) throw err
                if (status.isDirectory()) {
                    fs.readdir(dirPath, (err, file) => {
                        let res = file.map((item) => tools.asyncRmDir(path.join(dirPath, item)))
                        Promise.all(res).then( () => {
                            fs.rmdir(dirPath, resolve);
                        })
                    })
                } else {
                    fs.unlink(dirPath, resolve)
                }
            })
        })
    }
}

module.exports = tools;