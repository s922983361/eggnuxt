
export default async ({ store, route , redirect}) => {
    /**
     * @desc 路由守衛
     * 登入狀態下則轉到/admin/managers
     */    
    
    let ACCESS = false
    let regex = new RegExp( /\w{24}/, 'g')
    //replace /id to /':id'
    const PATH = route.path.replace(regex, 'id')
    store.state.auth.access.indexOf(PATH) === -1 ? ACCESS = false :  ACCESS = true

    if(!ACCESS) {
        await store.dispatch('auth/logout')
        redirect('/admin/login')
    }
}    