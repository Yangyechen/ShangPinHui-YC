<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container">
      <!--事件的委派|事件委托-->
      <div @mouseleave="leaveShow" @mouseenter="enterShow">
        <h2 class="all">全部商品分类</h2>
        <!--三级联动-->
        <!--过渡动画-->
        <transition name="ysl">
          <div class="sort" v-show="show">
            <!--事件的委派结合编程式导航实现路由的跳转与传参-->
            <div class="all-sort-list2" @click="goSearch">
              <!--一级分类-->
              <div class="item" v-for="(c1,index) in categoryList" :key="c1.categoryId"
                   :class="{cur:currentIndex==index}">
                <h3 @mouseenter="changeIndex(index)">
                  <!--编程式导航-->
                  <a :data-categoryName="c1.categoryName" :data-category1Id="c1.categoryId">{{ c1.categoryName }}</a>
                  <!--声明式导航 router-link-->
                  <!--<router-link to="/search">{{ c1.categoryName }}</router-link>-->
                </h3>
                <!--二级 三级分类-->
                <div class="item-list clearfix" :style="{display:currentIndex==index?'block':'none'}">
                  <div class="subitem" v-for="(c2,index) in c1.categoryChild" :key="c2.categoryId">
                    <dl class="fore">
                      <dt>
                        <a :data-categoryName="c2.categoryName" :data-category2Id="c2.categoryId">{{
                            c2.categoryName
                          }}</a>
                        <!--<router-link to="/search">{{ c2.categoryName }}</router-link>-->
                      </dt>
                      <dd>
                        <em v-for="(c3,index) in c2.categoryChild" :key="c3.categoryId">
                          <a :data-categoryName="c3.categoryName" :data-category3Id="c3.categoryId">{{
                              c3.categoryName
                            }}</a>
                          <!--<router-link to="/search">{{ c3.categoryName }}</router-link>-->
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>

    </div>
  </div>
</template>

<script>
// mapState 辅助函数
import {mapState} from 'vuex'
// 按需引入节流
import throttle from 'lodash/throttle'

export default {
  name: "TypeNav",
  data() {
    return {
      // 存储用户鼠标移动到哪个一级分类
      currentIndex: -1,
      show: true
    }
  },
  // 组件挂载完毕 可以向服务器发送请求
  mounted() {
    /* this.$store.dispatch(
         'categoryList'
     )*/
    // 当组件挂载完毕 把show改为false
    // 如果不是Home组件中的TypeNav 则隐藏
    if (this.$route.path != '/home') {
      this.show = false
    }
  },
  computed: {
    ...mapState({
      // 右侧需要的是是一个函数 当使用这个计算属性时 右侧的函数会被立即执行
      // 诸如参数state 即为大仓库录中的数据
      categoryList: state => state.home.categoryList
      // console.log(state)
    })
  },
  methods: {
    // 鼠标进入修改响应式数据currentIndex属性
    /*changeIndex(index) {
      // index 鼠标移动到某个一级分类的元素的索引值
      this.currentIndex = index
      // console.log(index)
    },*/
    // throttle回调函数不建议使用箭头函数
    changeIndex: throttle(function (index) {
      this.currentIndex = index
    }, 50),
    leaveShow() {
      // 鼠标移出的事件回调
      this.currentIndex = -1
      // 如果不是Home组件的时候执行
      if (this.$route.path !== '/home') {
        this.show = false
      }
    },
    // 进行路由跳转的方法
    goSearch(event) {
      // 最好的解决方案 利用编程式导航 加上事件的委派
      /*事件委派产生的问题:
      1.点击事件不一定是a标签 将子节点中a标签加上自定义属性 :date-categoryName="c1.categoryName"
      2.如何确定是一级二级三级的a标签
      3.如何获取参数*/
      // this.$router.push('/search')
      let element = event.target
      // console.log(element)
      // 获取到当前触发该事件的节点
      // 节点的dateset属性 可以获取到节点的自定义属性与属性值
      // console.log(element.dataset)
      let {categoryname, category1id, category2id, category3id} = element.dataset
      if (categoryname) {
        // 整理参数
        let location = {name: 'search'}
        let query = {categoryName: categoryname}
        // 一二三级分类的a标签
        if (category1id) {
          query.category1Id = category1id
        } else if (category2id) {
          query.category2d = category2id
        } else {
          query.category3Id = category3id
        }
        // 如果路由跳转的时候带有params参数 也需要一起传入
        // 整理完参数
        if (this.$route.params) {
          location.params = this.$route.params
          location.query = query
          this.$router.push(location)
        }
      }
    },
    enterShow() {
      if (this.$route.path !== '/home') {
        this.show = true
      }
    }
  }

}
</script>

<style scoped lang="less">
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          /*&:hover {
            .item-list {
              display: block;
            }
          }*/
        }

        .cur {
          background-color: skyblue;
        }

        //完成一级分类动态添加背景颜色
        /*.item:hover {
          background-color: skyblue;
      }*/

      }
    }

    //过渡动画的样式
    //开始状态
    .ysl-enter,
    .ysl-leave-to {
      height: 0;
    }

    //结束状态
    .ysl-enter-to,
    .ysl-leave {
      height: 461px;
    }

    .ysl-enter-active,
    .ysl-leave-active {
      transition: all 0.5s linear;
    }


  }

}
</style>