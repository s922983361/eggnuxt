/**
 * @desc global middleware config
 */
module.exports = {
    /** koa-session setting */
    session: {
        key: 'JSD._sess', //cookie key (default is koa:sess)
        maxAge: 3600000,    // maxAge in ms (default is 1 days)
        overwrite: true,  //overwrite the session value(default true)
        httpOnly: true,   //only server can access cookie (httpOnly or not )(default true)
        signed: true,     //default signed true
        rolling: false,   //set cookie in every request，it will reset cookie expired（default：false）
        renew: false,     //(boolean) renew session when session is nearly expired,
    },
}