// https://segmentfault.com/a/1190000014928116
import Vue from 'vue'
import VueLazyLoad from 'vue-lazyload'

Vue.use(VueLazyLoad,{
    error:`${process.env.BASE_URL}/error.png`,
    loading: `${process.env.BASE_URL}/loading.png`,
})