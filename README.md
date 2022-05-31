# app

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

# Day1

前端：结构层 样式层 行为层

1. vue-cli脚手架初始化项目
2. node+webpack+淘宝镜像

3. node_modules文件夹：项目依赖

4. public文件夹：一般放置一些静态资源 其中的静态资源 webpack在进行打包的时候会原封不动的打包到dist文件夹中

5. src文件夹（程序员源代码文件夹）：
    + assets文件夹：一般放置静态资源（一般是多个组件公用的静态资源）其中的静态资源在webpack惊醒打包的时候会把静态资源当作一个模块 打包到JS文件里面
    + components文件夹：一般放置的是一些非路由组件（或全局组件）
    + App.vue:唯一的根组件 Vue当中的组件都是.vue组件
    + main.js 程序的入口文件 也是程序中最先执行的文件

6. babel.config.js文件：配置文件（bable相关）
7. package.json文件：可以认为是项目的身份证 项目信息 依赖 运行命令
8. package-lock.json文件：缓存性的文件

1. 项目的其他配置：
2. 当项目运行起来的时候，让浏览器自动打开
    + package.json中
    + "serve": "vue-cli-service serve"
    + "serve": "vue-cli-service serve --open"
3. eslint校验功能关闭
    + 在vue.config.js中添加 lintOnSave: false
4. src文件夹简写方法，配置别名
    + @代表src文件夹 现在vue2中已经自动添加
    + jsconfig.json中进行配置

```js
    ({
    "compilerOptions": {
        "baseUrl": "./",
        "paths": {
            "@/*": [
                "src/*"
            ]
        },
        "exclude": ["node_modules", "dist"]
    }
})
```

1. 项目路由的分析
2. vue-router
    + 前端路由：KV键值对
    + key:URL(地址栏中的路径)
    + value：相应的路由组件
3. 路由组件
    + Home首页路由组件 Search路由组件 Login登陆路由 Register注册组件
    + Header 非路由组件 旨在首页和搜索页出现
    + Footer 非路由组件（首页 搜索页有 登录注册页面没有）
4. Header Footer 非路由组件
    + 书写静态页面（HTML+CSS）
    + 拆分组件
    + 获取服务器的数据动态展示
    + 完成相应的动态业务逻辑

+ less样式 需要安装 less-loader 并在style中添加 lang="less"
+ 使用组件的步骤
+ 创建 引入 注册 使用

5. 搭建路由组件 Home Search LoginRegister
    + components放置全局或者非路由组件
    + pages|views文件夹 放置路由组件
    + 配置路由 一般放置在router文件夹中

    + 5.1 路由组件与非路由组件的区别
        + 路由组件一般放置在pages|views文件夹当中 非路由组件一般放置在components文件夹当中

        + 路由组件一般需要在router文件夹中进行注册（使用的即为组件的名字） 非路由组件一般是以标签的形式
            + $route:获取路由信息（路径、query、params等）
            + $router:编程式导航进行路由跳转（push|replace）
        + 路由注册完毕后 不管是路由组件或非路由组件 都有$route和$router属性
            +
    + 5.2 路由的跳转
        + 声明式导航router-link 可以进行路由的跳转
        + 编程式导航push或replace
        + 编程式导航：声明式导航能做的都能做 除了进行路由跳转 还可以进行其他的业务逻辑
6. Footer组件显示与隐藏
    + v-show v-if
    + Footer在Home Search显示 Login Register隐藏
    + 配置路由的时候可以为路由配置路由原信息meta属性 进行显示或者隐藏的判断
7. 路由传参
    1. 路由的跳转方式
        1. 声明式导航 router-link 务必要有to属性
        2. 编程式导航：利用租金按实力的$router.push|replace方法 可以书写一些自己的业务
8. 路由传参
    1. params参数：属于路径当中的一部分，在配置路由时需要占位
    2. query参数：不属于路径当中的一部分。蕾仕于ajax中queryString /home?k=v&kv= 不需要占位
9. 路由传参的面试题
    1. 路由传参对象写法 path是否可以结合params参数一起使用？
        1. 路由跳转传参的时候，对象的写法可以使name、path形式，但是path不能与params参数一起使用
    2. 如何指定params参数可传可不传？
        1. 如果路由要求传递params参数 但是在路由跳转配置的时候没有传递，就会出现URL不准确的现象
        2. 在占位的后面加上 ? 代表params可以传递或者不传递
    3. params可以传递也可以不传递，但是如果传递的是空串，如何解决？
        1. 使用undefined解决：params参数可以传递、不传递（空的字符串）
    4. 路由组件能不能传递props数据？ 可以
        1. 布尔值 但是只能传递params参数
        2. 对象 可以额外的给路由组件传递一些props
        3. 函数 可以把params参数 query参数 通过props传递给路由组件
            1. > 1.布尔值 但是只能传递params参数\
               props: true\
               2.对象 可以额外的给路由组件传递一些props
               props: {a: 1, b: 2},\
               3.函数 可以把params参数 query参数 通过props传递给路由组件\
               props: ($route) => {
               return {keyword: $route.params.keyword, k: $route.query.k}
               }
10. 编程式导航进行路由跳转时会出现NavigationDuplicated错误警告
    1. "vue-router": "^3.5.3" 引入了promise
    2. 通过给push方法传递对应的成功、失败的回调函数 可以解决警告报错的问题 但是治标不治本
    3. ```js
             this.$router.push({name: 'search',
              params: {keyword: this.keyword},
              query: {k: this.keyword.toUpperCase()}
              },
              () => {},
              (error) => {
                     console.log(error)
              })
         ```

# Day2

1. 三级联动组件
    1. 全局组件 只需要注册一次 就可以在项目的任何地方使用
2. POSTMAN测试接口
    1. http://gmall-h5-api.atguigu.cn/api/product/getBaseCategoryList 接口没有问题
    2. code:200 代表服务器数据返回成功
    3. 整个项目 接口前缀都有/api字样
3. axios的二次封装
    1. XMLHttpRequest fetch JQ axios 语法
    2. 二次封装的意义
        1. 请求拦截器 在发请求之前处理一些业务
        2. 响应拦截器 在服务器返回数据后，可以处理一些业务
    3. 在项目当中API文件夹主要用来放置一些axios的文件按
        1. 接口中：路径都带有/api baseURL:'/api' http://xxx.xxx:8080/api
4. 接口统一管理
    1. 项目很小：完全可以在组建的生命周期函数中发送请求
    2. 项目大：axios.get('xxxx')
    3. 跨域问题 可以使用JSONP cors 代理服务器进行解决
        1. 协议 域名或者端口号不同的请求 称之为跨域
        2. 前端项目的本地服务器：http://localhost:8080/#/home
        3. 后台服务器：http://gmall-h5-api.atguigu.cn

5. nprogress进度条
    1. start 进度条开始
    2. done 进度条结束
    3. 进度条颜色可以修改
6. vuex状态管理库
    1. vuex官方提供的插件 状态管理插件集中式管理项目中组件公用的数据
        1. 项目小 不需要
        2. 项目大 组件多 数据很多 维护很费劲 Vuex
    2. state 存储数据
    3. mutations 修改state
    4. actions
    5. getters
    6. modules
    7. vuex基本使用
    8. 实现模块式开发
7. 完成一级分类动态添加背景颜色
    1. 采用样式完成
    2. js
8. 函数的节流与防抖
    1. 节流:在规定的时间范围内不会重复触发回调 只有大于这个时间间隔才会触发回调 把频繁出发变为少量触发 在规定的时间范围内执行一次
    2. 防抖:前面的所有触发都被取消 最后一次执行在规定的时间之后才会触发 也就是说连续的快速触发只会触发一次
9. 三级联动
    1. 路由跳转
        1. 声明式导航 router-link
            1. 如果使用声明式导航 router-link 可以实现路由的跳转 但是会出现卡顿的现象
            2. router-link 是一个组件 当服务器的数据返回之后 循环出很多的router-link组件(创建组件实例并且将虚拟DOM转换为真实DOM)
            3. 不建议使用
        2. 编程式导航 push|replace

# Day3

1. Search组件中的TypeNave商品分类菜单(过渡动画的效果)
    1. 过渡动画 前提条件是要有v-if或v-show指令才可以进行过渡动画
2. mockjs的使用
    1. 在src目录下创建 mock 文件夹
    2. 在mock文件夹中新创建假数据 json格式
    3. 把mock数据所需要的图片资源放到public文件夹下面的images文件夹中 因为public文件夹在打包的时候会原封不动的打包到dist文件夹中
    4. 开始mock(虚拟数据) mockServe.js
    5. 将mockServe.js文件在入口文件main.js中引入
3. ListContationer组件
    1. 安装swiper插件


1. 组件间通信
    1. props 父子
    2. 自定义事件 子父
    3. vuex 万能
    4. 插槽 父子组件
    5. publish-js 万能 vue基本不用
    6. $bus 全局事件总线