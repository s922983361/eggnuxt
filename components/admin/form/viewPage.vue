<template>
    <el-container>
        <el-tabs v-model="activeName" v-if="is_Goods">
            <el-tab-pane label="商品基本信息" name="basic">
                <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium, eaque ullam neque saepe tenetur hic illo unde minima suscipit fuga! Optio iste id ullam provident adipisci necessitatibus reprehenderit quod repellendus?</div>
                <el-row :gutter="10">
                    <el-col :sm="24" :md="12">
                        <slot name="basic-response-left"></slot>
                    </el-col>
                    <el-col :sm="24" :md="12">
                        <slot name="basic-response-right"></slot>
                    </el-col>               
                    <el-col :sm="24">
                        <slot name="basic-response-full"></slot>
                    </el-col>
                    <el-col :sm="24" style="padding-left:40px">
                        <el-row>
                            <slot name="basic-response-checkbox"></slot>
                        </el-row>                    
                    </el-col>               
                </el-row>
            </el-tab-pane>

            <el-tab-pane label="詳細描述" name="description">
                
                <el-row :gutter="10">
                    <el-col :sm="24" :md="12">                        
                        <slot name="description-response-left"></slot>
                    </el-col>
                    <el-col :sm="24" :md="12">
                        <slot name="description-response-right"></slot>
                    </el-col>               
                    <el-col :sm="24">
                        <slot name="description-response-full"></slot>
                    </el-col>
                    <el-col :sm="24" style="padding-left:40px">
                        <el-row>
                            <slot name="description-response-checkbox"></slot>
                        </el-row>                    
                    </el-col>               
                </el-row>
            </el-tab-pane>

            <el-tab-pane label="其他信息" name="other">
                <el-row :gutter="10">
                    <el-col :sm="24" :md="12">
                        <slot name="other-response-left"></slot>
                    </el-col>
                    <el-col :sm="24" :md="12">
                        <slot name="other-response-right"></slot>
                    </el-col>               
                    <el-col :sm="24">
                        <slot name="other-response-full"></slot>
                    </el-col>
                    <el-col :sm="24" style="padding-left:40px">
                        <el-row>
                            <slot name="other-response-checkbox"></slot>
                        </el-row>                    
                    </el-col>               
                </el-row>
            </el-tab-pane>

            <el-tab-pane label="規格與包裝" name="size">
                <el-row :gutter="10">
                    <el-col :sm="24" :md="12">
                        <slot name="size-response-left"></slot>
                    </el-col>
                    <el-col :sm="24" :md="12">
                        <slot name="size-response-right"></slot>
                    </el-col>               
                    <el-col :sm="24">
                        <slot name="size-response-full"></slot>
                    </el-col>
                    <el-col :sm="24" style="padding-left:40px">
                        <el-row>
                            <slot name="size-response-checkbox"></slot>
                        </el-row>                    
                    </el-col>               
                </el-row>
            </el-tab-pane>

            <el-tab-pane label="商品相冊" name="images">
                商品相冊
                <el-row :gutter="10">
                    <el-col :sm="24" :md="12">
                        <slot name="images-response-left"></slot>
                    </el-col>
                    <el-col :sm="24" :md="12">
                        <slot name="images-response-right"></slot>
                    </el-col>               
                    <el-col :sm="24">
                        <slot name="images-response-full"></slot>
                    </el-col>
                    <el-col :sm="24" style="padding-left:40px">
                        <el-row>
                            <slot name="images-response-checkbox"></slot>
                        </el-row>                    
                    </el-col>               
                </el-row>
            </el-tab-pane>

            <el-tab-pane label="商品條碼" name="barCode">
                商品條碼
                <el-row :gutter="10">
                    <el-col :sm="24" :md="12">
                        <slot name="barCode-response-left"></slot>
                    </el-col>
                    <el-col :sm="24" :md="12">
                        <slot name="barCode-response-right"></slot>
                    </el-col>               
                    <el-col :sm="24">
                        <slot name="barCode-response-full"></slot>
                    </el-col>
                    <el-col :sm="24" style="padding-left:40px">
                        <el-row>
                            <slot name="barCode-response-checkbox"></slot>
                        </el-row>                    
                    </el-col>               
                </el-row>
            </el-tab-pane>
        </el-tabs>
        
        <el-main v-else>
            <el-row :gutter="10">
                <el-col :sm="24" :md="12">
                    <slot name="response-left"></slot>
                </el-col>
                <el-col :sm="24" :md="12">
                    <slot name="response-right"></slot>
                </el-col>               
                <el-col :sm="24">
                    <slot name="response-full"></slot>
                </el-col>
                <el-col :sm="24" style="padding-left:40px">
                    <el-row>
                        <slot name="response-checkbox"></slot>
                    </el-row>                    
                </el-col>               
            </el-row>
        </el-main>
    </el-container>
</template>

<script>
    export default {
        data () {
            return {
                activeName: 'basic'
            }
        },
        methods:{},
        computed:{
            is_Goods() {
                if(this.$route.path.includes('/admin/factory_Goods/edit')) return true
            }
        }
    }
</script>