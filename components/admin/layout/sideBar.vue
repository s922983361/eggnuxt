<template>
    <el-menu
        :default-active="$route.path"
        
        :router="true"
        :unique-opened="true"
        class="el-menu-vertical-demo"
        
        background-color='#2d3748'
        text-color='#e2e8f0'
        active-text-color="#f6ad55"
        >
        <!------------------------------------------------------------------ 管理員功能配置 -->
        <el-submenu index="1" v-if="$store.state.auth.is_super">        
            <template slot="title">
                <i class="el-icon-platform-eleme" style="color:#00ff3b"></i>
                <span style="color:#ffffff">管理員配置</span>
            </template>
            <el-menu-item-group>
                <el-menu-item index="/admin/managers">                
                    <i class="el-icon-tickets"></i>
                    <span slot="title">管理員資訊</span>                                
                </el-menu-item>            
                <el-menu-item index="/admin/managers_Roles">                
                    <i class="el-icon-user"></i>
                    <span slot="title">角色 (Role)</span>                                
                </el-menu-item>

                <el-menu-item index="/admin/managers_Access">                
                    <i class="el-icon-coordinate"></i>
                    <span slot="title">權限 (Access)</span>                                
                </el-menu-item>

            </el-menu-item-group>
        </el-submenu>
        <!-- 管理員功能配置 -->
        <!------------------------------------------------------------------ 導航配置 -->
        <el-submenu index="2" v-if="$store.state.auth.is_super">        
            <template slot="title">
                <i class="el-icon-platform-eleme" style="color:#00ff3b"></i>
                <span style="color:#ffffff">導航相關配置</span>
            </template>
            <el-menu-item-group>
                <el-menu-item index="/admin/navs">                
                    <i class="el-icon-guide"></i>
                    <span slot="title">NAV 導航(navs)</span>                                
                </el-menu-item>

            </el-menu-item-group>
        </el-submenu>
        <!-- 導航配置 -->
        <!------------------------------------------------------------------ 商品配置 -->
        <el-submenu index="3" v-if="$store.state.auth.is_super">        
            <template slot="title">
                <i class="el-icon-platform-eleme" style="color:#00ff3b"></i>
                <span style="color:#ffffff">商品相關配置</span>
            </template>
            <el-menu-item-group>
                <el-menu-item index="/admin/goods_Colors">                
                    <i class="el-icon-magic-stick"></i>
                    <span slot="title">商品顏色 (goodscolor)</span>                                
                </el-menu-item>                 
                <el-menu-item index="/admin/goods_Types">                
                    <i class="el-icon-price-tag"></i>
                    <span slot="title">商品類型 (goodstype)</span>                                
                </el-menu-item>
                <el-menu-item index="/admin/goods_Cates">                
                    <i class="el-icon-collection-tag"></i>
                    <span slot="title">商品分類 (goodscate)</span>                                
                </el-menu-item>

            </el-menu-item-group>
        </el-submenu>
        <!-- 商品配置 -->
        <!------------------------------------------------------------------ 文章配置 -->
        <el-submenu index="4" v-if="$store.state.auth.is_super">        
            <template slot="title">
                <i class="el-icon-platform-eleme" style="color:#00ff3b"></i>
                <span style="color:#ffffff">文章相關配置</span>
            </template>
            <el-menu-item-group>
                <el-menu-item index="/admin/articles_Cates">                
                    <i class="el-icon-files"></i>
                    <span slot="title">文章分類(articlecate)</span>                                
                </el-menu-item>
                <el-menu-item index="/admin/articles">                
                    <i class="el-icon-edit-outline"></i>
                    <span slot="title">文章發布(article)</span>                                
                </el-menu-item>
                

            </el-menu-item-group>
        </el-submenu>        
        <!-- 文章配置 -->
        <!------------------------------------------------------------------ 廠商功能 -->
        <el-submenu index="10" v-if="$store.state.auth.is_super || $store.state.auth.role_title === '廠商'"> 
            <template slot="title">
                <i class="el-icon-platform-eleme" style="color:#0019ff"></i>
                <span style="color:#ffffff">功能列表</span>
            </template>
            <el-menu-item-group>
                <el-menu-item index="/admin/factory_Brands"> 
                    <i class="el-icon-collection"></i>
                    <span slot="title">品牌列表 (brands)</span>                                
                </el-menu-item>
                <el-menu-item index="/admin/factory_Goods">                
                    <i class="el-icon-goods"></i>                    
                    <span slot="title">商品列表 (goods)</span>                                
                </el-menu-item>
                <el-menu-item index="/admin/factory_NewProduct">                
                    <i class="el-icon-sell"></i>                    
                    <span slot="title">新品上架 (goods)</span>                                
                </el-menu-item>
                <el-menu-item index="/admin/factory_OnSale">                
                    <i class="el-icon-shopping-cart-full"></i>                    
                    <span slot="title">促銷活動 (goods)</span>                                
                </el-menu-item>
                <el-menu-item index="/admin/factory_Message">                
                    <i class="el-icon-chat-line-round"></i>                    
                    <span slot="title">發佈訊息 (goods)</span>                                
                </el-menu-item>
            </el-menu-item-group>
        </el-submenu>
        <!-- 廠商功能 -->
        <!------------------------------------------------------------------ 經銷商功能 -->    
        <el-submenu index="11" v-if="$store.state.auth.is_super || $store.state.auth.role_title === '經銷商'">
            <template slot="title">
                <i class="el-icon-platform-eleme" style="color:#4bdbf2"></i>
                <span style="color:#ffffff">功能列表</span>
            </template>
            <el-menu-item-group>
                <el-menu-item index="/admin/shop_Orders">                
                    <i class="el-icon-s-order"></i>
                    <span slot="title">訂單列表(orders)</span>                                
                </el-menu-item>
                <el-menu-item index="/admin/factory_Message">                
                    <i class="el-icon-s-goods"></i>                    
                    <span slot="title">廠商採購 (goods)</span>                                
                </el-menu-item>
                <el-menu-item index="/admin/factory_Message">                
                    <i class="el-icon-goods"></i>                    
                    <span slot="title">同行採購 (goods)</span>                                
                </el-menu-item>
                <el-menu-item index="/admin/factory_Message">                
                    <i class="el-icon-upload"></i>                    
                    <span slot="title">同行銷貨 (goods)</span>                                
                </el-menu-item>
                <el-menu-item index="/admin/factory_Message">                
                    <i class="el-icon-chat-line-round"></i>                    
                    <span slot="title">發佈訊息 (goods)</span>                                
                </el-menu-item>
            </el-menu-item-group>
        </el-submenu>
        <!-- 經銷商功能 --> 
    </el-menu>    
</template>

<script>
    export default {        
        data () {
            return {
                isCollapse: false
            };
        },
        props:['Collapse'],
        computed: {
            sideBarToggle() {
                return this.isCollapse = this.Collapse
            },            
        },
        methods: { 
        }
    }

</script>
<style scoped>
    .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 250px;
        min-height: 100vh;
    }
</style>