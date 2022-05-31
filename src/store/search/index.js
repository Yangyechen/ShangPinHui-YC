import {reqGetSearchInfo} from "@/api";

// search模块的小仓库
const state = {
    // 仓库初始状态
    searchList: {},
}
const mutations = {
    GETSEARCHLIST(state, searchList) {
        state.searchList = searchList
    }
}
const actions = {
    // 获取search模块的数据
    // 第一个参数：上下文 第二个参数：载荷
    async getSearchList({commit}, params = {}) {
        // 当前 reqGetSearchInfo函数在调用服务器获取数据的时候 需要至少传递一个参数（空对象）
        // params形参是在用户派发（dispatch）action的时候第二个参数传递过来的 至少为一个空对象
        let result = await reqGetSearchInfo(params)
        // console.log(result)
        if (result.code === 200) {
            commit('GETSEARCHLIST', result.data)
        }
    }
}

// 用来计算属性
// 主要作用是简化仓库中的数据
const getters = {
    // state是当前仓库(search)中的state 并非是大仓库中的state
    goodsList(state) {
        // console.log(state)
        // 如果没有网络state.searchList.goodsList返回的是一个undefined会报错
        return state.searchList.goodsList || []
    },
    trademarkList(state) {
        return state.searchList.trademarkList
    },
    attrsList(state) {
        return state.searchList.attrsList
    }
}
export default {
    state, mutations, actions, getters
}