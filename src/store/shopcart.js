import {reqCartList, reqDeleteCartById, reqUpdateCheckedById} from "@/api";

const state = {
    cartList: []
}
const mutations = {
    GETCARTLIST(state, cartList) {
        state.cartList = cartList
    }
}
const actions = {
    // 获取购物车列表数据
    async getCartList({commit}) {
        let result = await reqCartList()
        if (result.code === 200) {
            commit('GETCARTLIST', result.data)
        }
    },
    // 删除购物车某个产品
    async deleteCartListBySkuId({commit}, skuId) {
        let result = await reqDeleteCartById(skuId)
        if (result.code === 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('fail'))
        }
    },
    // 修改购物车某个产品的选中状态
    async updateCheckedById({commit}, {skuId, isChecked}) {
        let result = await reqUpdateCheckedById(skuId, isChecked)
        if (result.code === 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('fail'))
        }
    },
    // 购物车中删除选中的产品
    deleteAllCheckedCart({dispatch, getters}) {
        // alert('删除？')
        // console.log(context)
        // context 小仓库 其中的commit 提交mutions修改state getters 计算属性 dispatch 派发action state 当前小仓库的数据
        // console.log(getters.cartList.cartInfoList)
        // 获取购物车中全部的产品(是一个Promise对象数组)
        let promiseAll = []
        getters.cartList.cartInfoList.forEach(item => {
            let promise = item.isChecked === 1 ? dispatch('deleteCartListBySkuId', item.skuId) : ''
            // 将每一次返回的Promise添加到数组中
            promiseAll.push(promise)
        })
        // 返回结果 一个失败 就失败 全部成功 才成功
        return Promise.all(promiseAll)
    },
    // 修改全部产品的选中状态
    updateAllCartIsChecked({dispatch, state}, isChecked) {
        let promiseAll = []
        // console.log( state, isChecked)
        state.cartList[0].cartInfoList.forEach(item => {
            let promise = dispatch('updateCheckedById', {skuId: item.skuId, isChecked})
            promiseAll.push(promise)
        })
        return Promise.all(promiseAll)
    }
}
const getters = {
    cartList(sate) {
        return state.cartList[0] || {}
    }
}
export default {
    state,
    mutations,
    actions,
    getters
}