import {reqAddOrUpdateShopCart, reqGoodsInfo} from '@/api'
// 封装游客身份模块uuid 生成一个随机的字符串且每次执行不能发生变化
import {getUUID} from '@/utils/uuid_token'

const state = {
    goodsInfo: {},
    // 游客的临时身份
    uuid_token: getUUID()
}
const mutations = {
    GETGOODSINFO(state, goodsInfo) {
        state.goodsInfo = goodsInfo
    }
}
const actions = {
    // 获取产品信息的action
    async getGoodsInfo({commit}, skuid) {
        let result = await reqGoodsInfo(skuid)
        if (result.code === 200) {
            commit('GETGOODSINFO', result.data)
        }
    },
    // 将产品添加到购物车中||修改某个产品的个数
    async addOrUpdateShopCart({commit}, {skuId, skuNum}) {
        // 加入购物车返回的结果
        let result = await reqAddOrUpdateShopCart(skuId, skuNum)
        // console.log(result)
        // addOrUpdateShopCart()返回的是一个promise
        if (result.code === 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('fail'))
        }
    }


}
/*getters为简化数据而生*/
const getters = {
    // 路径导航简化数据
    categoryView(state) {
        return state.goodsInfo.categoryView || {}
    },
    // 产品信息数据简化
    skuInfo(state) {
        return state.goodsInfo.skuInfo || {}
    },
    // 产品售卖属性的变化
    spuSaleAttrList(state) {
        return state.goodsInfo.spuSaleAttrList || []
    }
}
export default {
    state,
    mutations,
    actions,
    getters
}