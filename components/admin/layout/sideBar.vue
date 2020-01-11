<template>
    <el-menu
        default-active="/admin/managers"
        :router="true"
        :unique-opened="true"
        class="el-menu-vertical-demo"
        
        background-color='#2d3748'
        text-color='#e2e8f0'
        active-text-color="#f6ad55"
        >
        <el-submenu index="1">
        
            <template slot="title">
                <i class="el-icon-finished" style="color:#feb2b2"></i>
                <span style="color:#feb2b2">管理員功能模塊</span>
            </template>
            <el-menu-item-group>
                <el-menu-item index="/admin/managers">                
                    <i class="el-icon-tickets"></i>
                    <span slot="title">管理員資訊</span>                                
                </el-menu-item>            
                <el-menu-item index="/admin/managers_Roles">                
                    <i class="el-icon-user"></i>
                    <span slot="title">管理員角色</span>                                
                </el-menu-item>

                <el-menu-item index="/admin/managers_Access">                
                    <i class="el-icon-coordinate"></i>
                    <span slot="title">管理員權限</span>                                
                </el-menu-item>

            </el-menu-item-group>
        </el-submenu> 
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
            } 
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