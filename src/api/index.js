// 对所有的API接口进行统一管理
import requests from "@/api/request";
import mockRequests from './mockAjax'
// 三级联动的接口
// 请求地址：/api/product/getBaseCategoryList get 请求 不需要参数
// http://gmall-h5-api.atguigu.cn
/*export const reqCategoryList = () => {
    // 发送请求 axios发送的请求 返回的结果是Promise对象
    return requests({url: '/product/getBaseCategoryList', method: 'get'})
}*/
// export const reqCategoryList = () => requests({url: '/product/getBaseCategoryList', method: 'get'})
export const reqCategoryList = () => requests.get(`/product/getBaseCategoryList`)

// 获取home首页banner轮播图的接口
export const reqGetBannerList = () => mockRequests.get('/banner')

// 获取floor首页banner轮播图的接口
export const reqFloorList = () => mockRequests.get('/floor')


// 获取搜索模块的数据
// 请求地址 /api/list 请求方式 POST
// 需要传参 category1Id category2Id category3Id categoryName keyword props trademark order pageNo pageSize
// params 参数至少应该为一个空对象 需要设置默认值
export const reqGetSearchInfo = (params) => requests({
    url: '/list',
    method: 'post',
    data: params
})

// 获取产品详情信息的接口 URL:/api/item{skuid} GET
export const reqGoodsInfo = (skuid) => requests({
    url: `/item/${skuid}`,
    method: 'get'
})

// 将产品添加到购物车中||获取更新某一个产品的个数
// api/cart/addToCart/{skuId}/{skuNum}
export const reqAddOrUpdateShopCart = (skuId, skuNum) => requests({
    url: `/cart/addToCart/${skuId}/${skuNum}`,
    method: 'post'
})
// 获取购物车列表数据的接口
// url:/api/cart/cartList method:get
export const reqCartList = () => requests({
    url: '/cart/cartList/', method: 'get'
})
// 删除购物车产品的接口
// URL:/api/cart/deleteCart/{skuId} method:DELETE
export const reqDeleteCartById = (skuId) => requests({
    url: `/cart/deleteCart/${skuId}`, method: 'delete'
})

// 修改购物车商品选中的状态
// URL:/api/cart/checkCart/{skuId}/{isChecked} method:GET
export const reqUpdateCheckedById = (skuId, isChecked) => requests({
    url: `/cart/checkCart/${skuId}/${isChecked}`,
    method: 'get'
})

// 注册页面 获取验证码
// URL:/api/user/passport/sendCode/{phone} method:get
export const reqGetCode = (phone) => requests({
    url: `/user/passport/sendCode/${phone}`,
    method: 'get'
})

// 注册接口 URL:/api/user/passport/register method:POST phone code password
/*export const reqUserRegister = (data) => requests({
    url: '/user/passport/register',
    data,
    method: 'post'
})*/
export const reqUserRegister = (data) => requests({url: '/user/passport/register', data, method: 'post'});
// 登录接口 URL:/api/user/passport/login method:POST phone password
export const reqUserLogin = (data) => requests({
    url: '/user/passport/login',
    data,
    method: 'post'
})


// 获取用户信息 token
// URL:/api/user/passport/auth/getUserInfo method:get token
export const reqUserInfo = () => requests({
    url: '/user/passport/auth/getUserInfo',
    method: 'get'
})

//退出登录
// URL:/api/user/passport/logout method:get
export const reqLogOut = () => requests({
    url: '/user/passport/logout',
    method: 'get'
})

// 获取用户地址信息
// URL：/api/user/userAddress/auth/findUserAddressList method :get
export const reqAddressInfo = () => requests({
    url: '/user/userAddress/auth/findUserAddressList',
    method: 'get'
})

// 获取商品清单 URL：/api/order/auth/trade method:get
export const reqOrderInfo = () => requests({
    url: '/order/auth/trade',
    method: 'get'
})


// 提交订单的接口 URL:/api/order/auth/submitOrder?tradeNo={tradeNo} method:post
export const reqSubmitOrder = (tradeNo, data) => requests({
    url: `/order/auth/submitOrder?tradeNo=${tradeNo}`,
    data,
    method: 'post'
})

// 获取支付信息 URL：/api/payment/weixin/createNative/{orderId} method:get
export const reqPayInfo = (orderId) => requests({
    url: `/payment/weixin/createNative/${orderId}`,
    method: 'get'
})


// 获取支付订单状态 URL:/api/payment/weixin/queryPayStatus/{orderId} method:get
export const reqPayStatus = (orderId) => requests({
    url: `/payment/weixin/queryPayStatus/$l{orderId}`,
    method: 'get'
})


// 获取个人中心的数据
// url:/api/order/auth/{page}/{limit} method:get page limit
export const reqMyOrderList = (page, limit) => requests({
    url: `/order/auth/${page}/${limit}`,
    method: 'get'
})
