<template>
    <el-container>
        <el-main v-if="is_Goods">
            <el-tabs v-model="activeName">
                <el-tab-pane name="basic" class="mt-8">
                    <span slot="label"><i class="el-icon-s-order"></i> 商品基本信息</span>
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

                <el-tab-pane name="description">
                    <span slot="label"><i class="el-icon-edit"></i> 商品介紹</span>
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

                <el-tab-pane name="other" class="mt-8">
                    <span slot="label"><i class="el-icon-money"></i> 規格與顏色</span>
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

                <el-tab-pane name="version" class="mt-8">
                    <span slot="label"><i class="el-icon-connection"></i> 版本關聯</span>
                    <el-row :gutter="10">
                        <el-col :sm="24" :md="12">
                            <slot name="version-response-left"></slot>
                        </el-col>
                        <el-col :sm="24" :md="12">
                            <slot name="version-response-right"></slot>
                        </el-col>               
                        <el-col :sm="24">
                            <slot name="version-response-full"></slot>
                        </el-col>
                        <el-col :sm="24" style="padding-left:40px">
                            <el-row>
                                <slot name="version-response-checkbox"></slot>
                            </el-row>                    
                        </el-col>               
                    </el-row>
                </el-tab-pane>

                <el-tab-pane name="size" class="mt-8">
                    <span slot="label"><i class="el-icon-box"></i> 屬性與包裝</span>
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

                <el-tab-pane name="images" class="mt-8">
                    <span slot="label"><i class="el-icon-picture"></i> 商品相冊</span>
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

                <el-tab-pane name="barCode" class="mt-8">
                    <span slot="label"><i class="el-icon-s-management"></i> 商品條碼</span>
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
        </el-main>
        <el-main v-else-if="is_Articles">
            <el-tabs v-model="activeName">
                <el-tab-pane name="basic" class="mt-8">
                    <span slot="label"><i class="el-icon-s-order"></i> 文章基本信息</span>
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

                <el-tab-pane name="description">
                    <span slot="label"><i class="el-icon-edit"></i> 文章內容</span>
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
            </el-tabs>
        </el-main>
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
            },
            is_Articles() {
                if(this.$route.path.includes('/admin/articles/edit')) return true
            }
        }
    }
</script>