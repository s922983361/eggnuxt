export default async ({ store, redirect }) => {
    /**
     * @desc 路由守衛
     * 登入狀態下則轉到/admin/managers
     */    

    if(store.state.auth.loggedIn === true) {

        const roleId = store.state.auth.role_id
        switch (roleId) {
            case '5e2039b544b8d412d0cd7997':
            redirect('/admin/managers')
            break

            case '5e26bc3ae21f282188d5acad':
            redirect('/admin/factory_Brands')
            break

            case '5e26d76cd89fec0f500c3cc0':
            redirect('/admin/shop_Orders')
            break
        }
    }
}