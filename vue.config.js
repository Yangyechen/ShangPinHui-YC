const {defineConfig} = require('@vue/cli-service')
module.exports = defineConfig({
    // 不打包map文件
    productionSourceMap: false,
    transpileDependencies: true,
    // 关闭elsint语法检查
    lintOnSave: false,
    // 代理跨域
    devServer: {
        // host: 'localhost',
        // host: '127.0.0.1',
        // port: 8080,
        // https: false,
        proxy: {
            '/api': {
                target: 'http://gmall-h5-api.atguigu.cn',
                // 路径重写
                // pathRewrite: {'^/api': ''}
            }
        }
    },
})
