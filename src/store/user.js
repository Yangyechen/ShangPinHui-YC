// 登录与注册
import {reqGetCode, reqLogOut, reqUserInfo, reqUserLogin, reqUserRegister} from "@/api";
import {setToken, getToken, removeToken} from "@/utils/token";

const state = {
    code: '',
    token: getToken(),
    userInfo: {}
}
const mutations = {
    GETCODE(state, code) {
        state.code = code
    },
    USERLOGIN(state, token) {
        state.token = token
    },
    GETUSERINFO(state, userInfo) {
        state.userInfo = userInfo
    },
    // 清除本地数据
    CLEAR(state) {
        // 清空仓库中的数据
        state.token = ''
        state.userInfo = {}
        // 本地存储数据清空
        removeToken()
    }
}
const actions = {
    // 获取验证码
    async getCode({commit}, phone) {
        let result = await reqGetCode(phone)
        // console.log(result)
        if (result.code === 200) {
            commit('GETCODE', result.data)
            return 'ok'
        } else {
            return Promise.reject(new Error('fail'))
        }
    },
    // 用户注册
    async userRegister({commit}, user) {
        let result = await reqUserRegister(user)
        // console.log(result)
        if (result.code === 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('fail'))
        }
    },

    // 用户登录
    async userLogin({commit}, data) {
        let result = await reqUserLogin(data)
        // console.log(result)
        if (result.code === 200) {
            // 服务器下发token 用户的唯一标识
            // 将来经常通过token找服务器要用户信息进行展示
            commit('USERLOGIN', result.data.token)
            // 本地持久化存储token
            // localStorage.setItem('TOKEN',result.data.token)
            setToken(result.data.token)
            return 'ok'
        } else {
            return Promise.reject(new Error('fail'))
        }

    },
    // 获取用户信息
    async getUserInfo({commit}) {
        let result = await reqUserInfo()
        // console.log(result)
        if (result.code === 200) {
            // 提交用户信息
            commit('GETUSERINFO', result.data)
            return 'ok'
        } else {
            return Promise.reject(new Error('fail'))
        }
    },

    // 退出登录
    async userLogOut({commit}) {
        // 清除服务器的token
        let result = await reqLogOut()
        if (result.code === 200) {
            // 清除state中的数据
            commit('CLEAR')
            return 'ok'
        } else {
            return Promise.reject(new Error('fail'))
        }
    }

}
const getters = {}
export default {
    state,
    mutations,
    actions,
    getters
}