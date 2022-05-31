// 引入mock模块
import Mock from 'mockjs'
// 引入json数据
// webpack默认对外暴露的数据有哪些 图片 json数据
import banner from './banner.json'
import floor from './floor.json'

// mock数据
// 获取banner数据
Mock.mock('/mock/banner', {code: 200, data: banner})
// 获取floor数据
Mock.mock('/mock/floor', {code: 200, data: floor})

