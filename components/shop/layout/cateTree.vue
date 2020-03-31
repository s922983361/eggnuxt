<template>
    <div id="cateTree">
        <el-tree 
            empty-text="尚無數據!"
            :data="treeData"
            :highlight-current="true"
            :accordion="true"
            :render-content="renderContent"
            >
            </el-tree>
    </div>
</template>

<script>
    export default {
        data () {
            return { 
                treeData: [
                    {
                        label: '書寫用品',
                        img:'/images/icon/001.png',
                        children: [
                            {
                                label:'原子筆',
                                img:'/images/icon/001.png',
                                link: '/shop/cateList/001',
                            },
                            {
                                label:'中性筆',
                                img:'/images/icon/001.png',
                                link: '/shop/cateList/002',
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
                                link: '/shop/cateList/003',
                            },
                            {
                                label:'除針器',
                                img:'/images/icon/002.png',
                                link: '/shop/cateList/004',                                
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
                                link: '/shop/cateList/005',
                            },
                            {
                                label:'風琴夾',
                                img:'/images/icon/003.png',
                                link: '/shop/cateList/006',
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
                                link: '/shop/cateList/007',                                
                            },
                            {
                                label:'噴墨印表機',
                                img:'/images/icon/004.png',
                                link: '/shop/cateList/008',                                
                            },
                        ]
                    },
                ]
            };
        },
        methods: {
            renderContent(h, { node, data, store }) {
                if(node.level == 1 && node.childNodes.length > 0) {
                    return h( 'span', { class: 'custom-tree-node' },
                                [
                                    h('div', { class: "w-10 h-10 rounded-full inline-block" },
                                        [
                                            h('img',{ attrs: { src: data.img,}},),
                                        ]
                                    ),
                                    h('span', { class: 'text-md pl-4' }, node.label)
                                ])
                } else {
                    return h('div', {  
                            class:'flex items-center border-b border-orange-200',
                            on: { 
                                click: () => { this.$router.push(`${data.link}?cate=${node.label}`)
                                }
                            }},
                            [
                                h('p', { class:'pl-32 text-sm md:pl-10'}, node.label),
                                h('img', { attrs: { src: data.img, }, class:'w-10 h-10 ml-4'},)
                            ]
                        )
                }
            }
        },
    }

</script>
<style>
.custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    font-size: 16px;
    padding-right: 8px;
}
#cateTree .el-tree-node__content {
    height: 50px !important
}
#cateTree .el-form-item .el-form-item__label {
    border-bottom: 1px solid #959595;
}
</style>