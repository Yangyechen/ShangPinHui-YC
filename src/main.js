import Vue from 'vue'
import App from './App.vue'
// 三级联动组件 注册全局组件
import TypeNav from "@/components/TypeNav";
import Carousel from "@/components/Carousel";
import Pagination from "@/components/Pagination";
// 第一个参数：全局组件的名字 第二个参数：注册的是哪个组件
Vue.component(TypeNav.name, TypeNav)
Vue.component(Carousel.name, Carousel)
Vue.component(Pagination.name, Pagination)
// 引入路由配置文件
import router from "@/router";
// 测试 不需要 在App组件中已经获取了
/*import {reqCategoryList} from '@/api'
reqCategoryList()*/

// 引入仓库
import store from '@/store'

Vue.config.productionTip = false

// 引入mockServe.js
import '@/mock/mockServe'

// 引入swiper样式
import 'swiper/css/swiper.min.css'

// 统一接口文件夹api中的全部请求函数
// 统一引入
import *as API from '@/api'

// 引入elementUI
import {Button, MessageBox} from 'element-ui';
// 注册全局组件 有两种写法 注册 挂载在原型对象上
Vue.component(Button.name, Button);
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;

// 图片懒加载
import VueLazyload from "vue-lazyload";
import tp from '@/assets/images/ts.gif'

Vue.use(VueLazyload, {
    loading: tp
})

// 引入自定义插件
import myPlugins from "@/plugins/myPlugins";

Vue.use(myPlugins, {
    name: 'upper',
})

// 引入表单校验插件
import '@/plugins/validate'

// console.log(API)
new Vue({
    render: h => h(App),
    // 注册路由 当这里书写router的时候 组件身上都有$route和$router属性
    router,
    // 注册仓库 组件势力的身上会增加一个$store
    store,
    // 配置全局事件总线 $bus
    beforeCreate() {
        Vue.prototype.$bus = this
        Vue.prototype.$API = API
    }


}).$mount('#app')
