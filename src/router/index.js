// 配置路由的地方
import Vue from 'vue'
import VueRouter from 'vue-router'
// 引入routes路由配置信息
import routes from "@/router/routes";
import store from "@/store";


// 使用插件
Vue.use(VueRouter)

// 把VueRouter原型对象上的push 先保存一份
let origionPush = VueRouter.prototype.push;
let origionReplace = VueRouter.prototype.replace;
// 重写VueRouter
// 第一个参数 location参数 往哪里跳转，传递哪些参数
// 第二个参数 resolve参数 成功的回调
// 第三个参数 reject参数 失败的回调
VueRouter.prototype.push = function (location, resolve, reject) {
    if (resolve && reject) {
        // call apply 都可以调用函数一次 都可以篡改函数的上下文一次 传参不同 call 多个参数用,隔开 apply 传递数组
        origionPush.call(this, location, resolve, reject)
    } else {
        origionPush.call(this, location, () => {
        }, () => {
        })
    }
}

VueRouter.prototype.push = function (location, resolve, reject) {
    if (resolve && reject) {
        // call apply 都可以调用函数一次 都可以篡改函数的上下文一次 传参不同 call 多个参数用,隔开 apply 传递数组
        origionReplace.call(this, location, resolve, reject)
    } else {
        origionReplace.call(this, location, () => {
        }, () => {
        })
    }
}

// 配置路由
let router = new VueRouter({
    // 配置路由
    // routes: routes
    routes,
    // 滚动行为
    scrollBehavior(to, from, savedPosition) {
        // 始终滚动到顶部 距离顶部的距离
        return {y: 0}
    },
})
// 全局守卫 前置守卫 在路由跳转之前进行判断
router.beforeEach(async (to, from, next) => {
    // to 可以获取到要跳转到的路由信息 from 从哪里来 next 放行
    // console.log(to, from, next)
    // 直接调用 直接放行 next()
    // 测试全部放行
    next()
    // 放行到指定的路由 next(path)
    // next('/home')
    // next(false)
    // console.log(store)
    // 用户登录才会有登录
    let token = store.state.user.token
    // 用户信息
    let name = store.state.user.userInfo.name
    // console.log(userInfo)
    if (token) {
        // 已经登录则停留在首页
        if (to.path === '/login' || to.path === '/register') {
            next('/')
            // next('/home')
        } else {
            // 登录了但是不是跳转到login
            // 如果已经有name 用户名 那么放行
            if (name) {
                next()
            } else {
                // 没有用户信息
                // 派发action 让仓库存户用户信息再跳转
                try {
                    // 获取用户信息成功
                    await store.dispatch('getUserInfo')
                    // 放行
                    next()
                } catch (error) {
                    // token过期失效 获取不到用户信息
                    // 清除本地token和所有用户信息并重新登录
                    // 清除token
                    await store.dispatch('userLogOut')
                    next('/login')
                }
            }
        }
    } else {
        // 未登录 不能去交易和支付相关的页面 个人中心不可以
        // next()
        let toPath = to.path
        // console.log(toPath)
        // if (toPath === '/trade') {
        if (toPath.indexOf('/trade') !== -1 || toPath.indexOf('/pay') !== -1 || toPath.indexOf('/center') !== -1) {
            // 未登录想要跳转的信息存储与地址栏中（路由）
            next('/login?redirect=' + toPath)
        } else {
            next()
        }
    }
})

export default router