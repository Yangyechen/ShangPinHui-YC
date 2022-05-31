// 引入路由组件
import Detail from "@/pages/Detail";
// import Home from "@/pages/Home";
import Search from "@/pages/Search";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import AddCartSuccess from "@/pages/AddCartSuccess";
import ShopCart from "@/pages/ShopCart";
import Trade from "@/pages/Trade";
import Pay from "@/pages/Pay";
import PaySuccess from "@/pages/PaySuccess";
import Center from "@/pages/Center";

// 路由懒加载
/*const foo = () => {
    console.log('路由懒加载')
    return import('@/pages/Home')
}*/

import MyOrder from "@/pages/Center/myOrder";
import GroupOrder from "@/pages/Center/groupOrder";
// 暴露路由配置信息
export default [
    {
        path: '/center',
        component: Center,
        meta: {show: true},
        // 二级路由
        children: [{
            path: 'myorder',
            component: MyOrder,
        },
            {
                path: 'grouporder',
                component: GroupOrder
            },
            {
                path: '/center',
                redirect: '/center/myorder'
            }
        ]

    },
    {
        path: '/paysuccess',
        component: PaySuccess,
        meta: {show: true}
    },
    {
        path: '/pay',
        component: Pay,
        meta: {show: true},
        // 路由独享守卫
        beforeEnter: (to, from, next) => {
            if (from.path === '/trade') {
                next()
            } else {
                next(false)
            }
        }
    },
    {
        path: '/trade',
        component: Trade,
        meta: {show: true},
        // 路由独享守卫
        beforeEnter: (to, from, next) => {
            // 必须从购物车才能进入交易组件 其他的路由组件则会停留在当前
            if (from.path === '/shopcart') {
                next()
            } else {
                next(false)
            }
        }
    },
    {
        path: '/shopcart',
        name: 'shopcart',
        component: ShopCart,
        meta: {show: true}
    },
    {
        path: '/addcartsuccess',
        name: 'addcartsuccess',
        component: AddCartSuccess,
        meta: {show: true}
    },
    {
        path: '/detail/:skuid',
        component: Detail,
        meta: {show: true}
    },
    {
        path: '/home',
        // component: Home,
        // component: foo,
        component: () =>
            // console.log('路由懒加载')
            import('@/pages/Home'),
        meta: {show: true}
    },
    {
        // ?代表可传可不传
        path: '/search/:keyword?',
        component: Search,
        meta: {show: true},
        name: 'search',
        // 路由组件能不能传递props数据？ 可以
        // 1.布尔值 但是只能传递params参数
        // props: true
        // 2.对象 可以额外的给路由组件传递一些props
        // props: {a: 1, b: 2},
        // 3.函数 可以把params参数 query参数 通过props传递给路由组件
        /*props: ($route) => {
            return {keyword: $route.params.keyword, k: $route.query.k}
        }*/
        // 简写
        props: ($route) => ({keyword: $route.params.keyword, k: $route.query.k})
    },
    {
        path: '/login',
        component: Login,
        meta: {show: false}
    },
    {
        path: '/register',
        component: Register,
        meta: {show: false}
    },
    // 重定向 在项目运行时 立马定向到首页
    {
        path: '*',
        redirect: '/home'
    },



    {
        path: '/communication',
        component: () => import('@/pages/Communication/Communication'),
        children: [
            {
                path: 'event',
                component: () => import('@/pages/Communication/EventTest/EventTest'),
                meta: {
                    isHideFooter: true
                },
            },
            {
                path: 'model',
                component: () => import('@/pages/Communication/ModelTest/ModelTest'),
                meta: {
                    isHideFooter: true
                },
            },
            {
                path: 'sync',
                component: () => import('@/pages/Communication/SyncTest/SyncTest'),
                meta: {
                    isHideFooter: true
                },
            },
            {
                path: 'attrs-listeners',
                component: () => import('@/pages/Communication/AttrsListenersTest/AttrsListenersTest'),
                meta: {
                    isHideFooter: true
                },
            },
            {
                path: 'children-parent',
                component: () => import('@/pages/Communication/ChildrenParentTest/ChildrenParentTest'),
                meta: {
                    isHideFooter: true
                },
            },
            {
                path: 'scope-slot',
                component: () => import('@/pages/Communication/ScopeSlotTest/ScopeSlotTest'),
                meta: {
                    isHideFooter: true
                },
            }
        ],
    }



]