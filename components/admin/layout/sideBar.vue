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
        <!------------------------------------------------------------------ 廠商功能配置 -->
        <el-submenu index="2" v-if="$store.state.auth.is_super">        
            <template slot="title">
                <i class="el-icon-platform-eleme" style="color:#00ff3b"></i>
                <span style="color:#ffffff">廠商功能配置</span>
            </template>
            <el-menu-item-group>
                <el-menu-item index="/admin/login">                
                    <i class="el-icon-tickets"></i>
                    <span slot="title">管理員資訊</span>                                
                </el-menu-item>           
                

            </el-menu-item-group>
        </el-submenu>
        <!-- 廠商功能配置 -->
        <!------------------------------------------------------------------ 經銷商功能配置 -->
        <el-submenu index="3" v-if="$store.state.auth.is_super">        
            <template slot="title">
                <i class="el-icon-platform-eleme" style="color:#00ff3b"></i>
                <span style="color:#ffffff">經銷商功能配置</span>
            </template>
            <el-menu-item-group>
                <el-menu-item index="/admin/login">                
                    <i class="el-icon-tickets"></i>
                    <span slot="title">管理員資訊</span>                                
                </el-menu-item>           
                

            </el-menu-item-group>
        </el-submenu>
        <!-- 經銷商功能配置 -->
        <!------------------------------------------------------------------ 廠商功能 -->
        <el-submenu index="10" v-if="$store.state.auth.is_super || $store.state.auth.role_id === '5e26bc3ae21f282188d5acad'"> 
            <template slot="title">
                <i class="el-icon-platform-eleme" style="color:#0019ff"></i>
                <span style="color:#ffffff">廠商功能</span>
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
            </el-menu-item-group>
        </el-submenu>
        <!-- 廠商功能 -->
        <!------------------------------------------------------------------ 經銷商功能 -->    
        <el-submenu index="11" v-if="$store.state.auth.is_super || $store.state.auth.role_id === '5e26d76cd89fec0f500c3cc0'">
            <template slot="title">
                <i class="el-icon-platform-eleme" style="color:#4bdbf2"></i>
                <span style="color:#ffffff">經銷商功能</span>
            </template>
            <el-menu-item-group>
                <el-menu-item index="/admin/shop_Orders">                
                    <i class="el-icon-s-order"></i>
                    <span slot="title">訂單列表(orders)</span>                                
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