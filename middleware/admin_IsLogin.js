export default async ({ store, redirect }) => {
    /**
     * @desc 路由守衛
     * 登入狀態下則轉到/admin/managers
     */    

    if(store.state.auth.loggedIn === true) {

        const roleTitle = store.state.auth.role_title
        switch (roleTitle) {
            case '網站管理員':
            redirect('/admin/managers')
            break

            case '廠商':
            redirect('/admin/factory_Brands')
            break

            case '經銷商':
            redirect('/admin/shop_Orders')
            break
        }
    }
}