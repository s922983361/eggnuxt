<template>
    <div class="clearfix">
        <div :class="$store.state.hiddenCateList ? 'hidden' : 'block w-full'" class="md:block md:w-1/5 float-left">
            <el-tree
                empty-text="規格和顏色都必需填入一個或一個以上的值!"
                :data="treeData"
                :highlight-current="true"
                :accordion="true"
                :render-content="renderContent"
            >
            </el-tree>
        </div>

        <div :class="$store.state.hiddenCateList ? 'w-full' : 'hidden'" class=" md:w-4/5 flex flex-wrap float-right justify-around mb-4">
            <div class="p-4 w-full md:w-1/2 h-20 mt-4" v-for="i in 10" :key="i">
                <div class="flex items-center rounded-lg bg-green-100 overflow-hidden border hover:border-indigo-500 cursor-pointer relative">                               
                    <img class="h-20 w-30" v-lazy="'/images/logos/01.png'" alt="">
                    <div class="w-auto text-grey-darker items-center p-4">
                        <span class="text-lg font-bold pb-4">
                            品牌名稱
                            <p class="inline leading-tight text-xs text-gray-400">
                                品牌的隸屬公司 
                            </p>
                        </span>
                        <p class="text-xs mt-2">
                            品牌的商品類型...等等的簡單描述 
                        </p>
                    </div>
                    <span class=" absolute right-0 bottom-0 px-4 py-1 rounded-full bg-indigo-300 text-sm text-white hover:bg-indigo-100 hover:text-black cursor-pointer mr-1 mb-1">查詢</span>
                </div>
            </div>

            <div class="mt-8">
                <div class="inline-block border-t-2 border-b-2 border-gray-400 py-4">
                    <el-pagination
                        background                    
                        prev-text="prev"
                        next-text="next"
                        layout="prev, pager, next"
                        :total="100"
                        >
                        </el-pagination>
                </div>            
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        layout: 'store',
        data () {
            return { 
                treeData: [
                    {
                        label: '書寫用品',
                        img:'/images/icon/001.png',
                        children: [
                            {
                                label:' 原子筆',
                                img:'/images/icon/001.png',
                                link: '/store/product_List/001',
                            },
                            {
                                label:' 中性筆',
                                img:'/images/icon/001.png',
                                link: '/store/product_List/002',
                            },
                        ]
                    },
                    {
                        label: '桌上文具',
                        img:'/images/icon/002.png',
                        children: [
                            {
                                label:'釘書機',
                                img:'/images/icon/002.png',
                                link: '/store/product_List/003',
                            },
                            {
                                label:'除針器',
                                img:'/images/icon/002.png',
                                link: '/store/product_List/004',                                
                            },
                        ]
                    },
                    
                    {
                        label: '檔案收納',
                        img:'/images/icon/003.png',
                        children: [
                            {
                                label:'檔案夾',
                                img:'/images/icon/003.png',
                                link: '/store/product_List/005',
                            },
                            {
                                label:'風琴夾',
                                img:'/images/icon/003.png',
                                link: '/store/product_List/006',
                            },
                        ]
                    },
                    
                    {
                        label: '事務機器',
                        img:'/images/icon/004.png',
                        children: [
                            {
                                label:'印表機',
                                img:'/images/icon/004.png',
                                link: '/store/product_List/007',                                
                            },
                            {
                                label:'噴墨印表機',
                                img:'/images/icon/004.png',
                                link: '/store/product_List/008',                                
                            },
                        ]
                    },
                ]
            };
        },
        computed: {},
        methods: {
            renderContent(h, { node, data, store }) {
                if(node.level == 1 && node.childNodes.length > 0) {
                    return h(
                        'span', {
                            class: 'custom-tree-node'
                        },
                        [
                            h(
                                'div',{
                                    class: "w-10 h-10 rounded-full inline-block"
                                },
                                [
                                    h(
                                        'img', 
                                        {
                                            attrs: {
                                                src: data.img,
                                            },
                                        },                                        
                                    )
                                ]
                            ),
                            h(
                                'span', {
                                    class: 'text-md pl-4'
                                },
                                node.label
                            )
                        ]
                    )
                }else {
                    return h(
                        'div',
                        {
                            class: 'flex items-center border-b border-orange-200',
                            on: {
                                click: () => {
                                    this.$router.push(`${data.link}?cate=${node.label}`)
                                }
                            }
                        },                        
                        [
                            h(
                                'p',
                                {
                                    class:'pl-48 text-sm md:pl-16'
                                },
                                [node.label],
                            ),
                            h(
                                'img',{
                                    attrs: {
                                        src: data.img,
                                    },
                                    class:'w-10 h-10 ml-4'
                                },
                            )
                        ]
                    )
                }
            }
        },
        components: {},
    }

</script>
<style>

</style>