// 插件一定是暴露一个对象 一定拥有 install方法
let myPlugins = {}
export default myPlugins.install = function (Vue, options) {
    // console.log('自定义的插件！！！',Vue,options)
    // 全局指令
    Vue.directive(options.name, (element, params) => {
        // console.log('执行', element, params)
        element.innerHTML = params.value.toUpperCase()
    })
}
