<template>
    <div class="list w-full">
        <header class="text-center border-b-2 border-teal-300 py-4">
            <h1 class="text-2xl font-bold text-black">{{ config.pageTitle}}</h1>
            <h3>{{$route.params.id}}</h3>
        </header>
        <div class="w-full mt-10">
            <el-table
                fit
                highlight-current-row
                size="medium"
                :border="true"
                :stripe="true"
                :data="list"
                >               
                <el-table-column                        
                    label="角色模組"
                    width="180"
                    prop="module_name"
                    key="_id"
                    >
                    </el-table-column>
                <el-table-column
                    label="授權功能列表"
                    width="auto"
                    >
                    <template slot-scope="scope">
                        <el-checkbox-group v-model="checkList">
                            <template v-for="child in scope.row.children">
                                <el-checkbox 
                                    :label="child._id" 
                                    :key="child._id"
                                    >{{child.action_name}}
                                    </el-checkbox>
                            </template>
                        </el-checkbox-group>
                    </template>
                    </el-table-column>
            </el-table>
            <el-button @click="save">送出</el-button>
        </div>
    </div>
</template>

<script>
    import notify from '@/plugins/mixins/admin/notify'

    export default {
        layout: 'admin',
        mixins: [ notify],
        data () {
            return {
                config : {
                    pageTitle: '角色授權列表',
                    serverController: 'common',
                    //relatedController: ['Role'],
                    afterSavePushTo: 'managers_Roles',//路由名稱
                    uploadImage: false,
                },
                list: [],
                checkList: []
            };
        },
        created(){
            this.fetchAccessList('Access')
            this.fetchRoleAccess('RoleAccess')
        },        
        methods: {
            async fetchAccessList(modelName) {
                try {
                    const res = await this.$axios.$get(`${process.env.EGG_API_URL}/admin/${this.config.serverController}/${modelName}`)

                    if(res.resCode !== 90500) {
                        if(!this.$_.isEmpty(res.data)) {
                             //Success to filter data -- module_id == '0'
                            const topModuleName = res.data.filter((item) => {
                                return item.module_id == '0'
                            })
                            //filter module_id == (module_id == 0)._id 
                            topModuleName.forEach((m) => {
                                m.children = res.data.filter((item) => {
                                    return item.module_id == m._id
                                })
                            })
                            this.list = topModuleName
                        }                        
                        return
                    }
                    //Server ERROR
                    await this.notifyFunc(res.resCode)
                }catch (err){
                     //Browser ERROR
                    console.log(err)
                    this.$message({                        
                        message: '瀏覽器不明錯誤,請重新操作!!',
                        type: 'error',
                        customClass: 'bg-red-200'
                    })
                }

            },
            async fetchRoleAccess(modelName) {
                try {
                    const res = await this.$axios.$get(`${process.env.EGG_API_URL}/admin/${this.config.serverController}/${modelName}`)                    
                    if(res.resCode !== 90500) {
                        if(!this.$_.isEmpty(res.data)) {
                            //Success to find data -- item.role_id == this.$route.params.id
                            const accessData = res.data.find((item) => {
                                return item.role_id == this.$route.params.id
                            })
                            //access_id is [array]
                            if(!this.$_.isEmpty(accessData)) this.checkList = accessData.access_id  
                        }                       
                        return
                    }
                    //Server ERROR
                    await this.notifyFunc(res.resCode)
                }
                catch(err) {
                     //Browser ERROR
                    console.log(err)
                    this.$message({                        
                        message: '瀏覽器不明錯誤,請重新操作!!',
                        type: 'error',
                        customClass: 'bg-red-200'
                    })
                }
            },
            async save() {
                let model = {}
                let res = {}
                model['role_id'] = this.$route.params.id
                model['access_id'] = this.checkList

                try {
                    const res = await this.$axios.$post(`${process.env.EGG_API_URL}/admin/${this.config.serverController}/RoleAccess`, model)
                    
                    if(res.resCode !== 90500) {
                        this.$router.push(this.config.afterSavePushTo)
                        await this.notifyFunc(res.resCode)                       
                        return
                    }
                    //Server ERROR
                    await this.notifyFunc(res.resCode)
                }catch (err){
                     //Browser ERROR
                    console.log(err)
                    this.$message({                        
                        message: '瀏覽器不明錯誤,請重新操作!!',
                        type: 'error',
                        customClass: 'bg-red-200'
                    })
                }
            }
        },
    }

</script>
<style scoped>

</style>