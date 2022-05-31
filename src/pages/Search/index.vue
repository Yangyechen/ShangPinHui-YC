<template>
  <div>
    <!--商品分类三级联动-->
    <TypeNav/>
    <div class="main">
      <div class="py-container">
        <!--bread 面包屑 带有X的结构-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!--分类的面包屑-->
            <li class="with-x" v-if="searchParams.categoryName">
              {{ searchParams.categoryName }}
              <i @click="removeCategoryName">×</i>
            </li>
            <!--关键字的面包屑-->
            <li class="with-x" v-if="searchParams.keyword">
              {{ searchParams.keyword }}
              <i @click="removeKeyword">×</i>
            </li>
            <!--品牌信息的面包屑-->
            <li class="with-x" v-if="searchParams.trademark">
              {{ searchParams.trademark.split(':')[1] }}
              <i @click="removeTrademark">×</i>
            </li>
            <!--平台售卖属性值的面包屑-->
            <li class="with-x" v-for="(attrValue ,index) in searchParams.props" :key="index">
              {{ attrValue.split(':')[1] }}
              <i @click="removeAttr(index)">×</i>
            </li>

          </ul>
        </div>

        <!--selector-->
        <SearchSelector @trademarkInfo="trademarkInfo" @attrInfo="attrInfo"/>

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <!--排序参考-->
              <ul class="sui-nav">
                <li :class="{active:isOne}" @click="changeOrder('1')">
                  <a>综合 <span> &nbsp;</span>
                    <span v-show="isOne" class="iconfont " :class="{'icon-up':isAsc,'icon-down':isDesc}">
                    </span></a>
                </li>
                <li :class="{active:isTwo}" @click="changeOrder('2')">
                  <a>价格
                    <span v-show="isTwo" class="iconfont " :class="{'icon-up':isAsc,'icon-down':isDesc}">
                  </span></a>
                </li>
              </ul>
            </div>
          </div>
          <!--产品列表-->
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="(good ,index) in goodsList" :key="good.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <!--路由跳转的时候不要忘记带参数-->
                    <router-link :to="`/detail/${good.id}`">
                      <!--<img :src="good.defaultImg"/>-->
                      <img v-lazy="good.defaultImg" alt="懒加载图片"/>
                    </router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <span>&nbsp;&nbsp;</span>
                      <i>{{ good.price }}.00</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a target="_blank" href="item.html"
                       title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】">{{ good.title }}</a>
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>{{ good.hotScore }}</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a href="success-cart.html" target="_blank" class="sui-btn btn-bordered btn-danger">加入购物车</a>
                    <a href="javascript:void(0);" class="sui-btn btn-bordered">收藏</a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <Pagination :pageNo="searchParams.pageNo"
                      :pageSize="searchParams.pageSize"
                      :total="total"
                      :continues="5"
                      @getPageNo="getPageNo"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchSelector from './SearchSelector/SearchSelector'
// import {mapState} from "vuex";

import {mapGetters, mapState} from 'vuex'


export default {
  name: 'Search',
  data() {
    return {
      // 带给服务器的参数
      searchParams: {
        category1Id: '',
        category2Id: '',
        category3Id: '',
        categoryName: "",
        keyword: "",
        // 默认应该是综合降序
        order: "1:desc",
        pageNo: 1,
        pageSize: 10,
        props: [],
        trademark: ""
      }
    }
  },
  components: {
    SearchSelector
  },
  // 组件挂载之前更新searchParams数据
  beforeMount() {
    // 在发送请求之前 将参数进行整理
    // console.log(this.$route.query)
    // 复杂写法
    /*this.searchParams.category1Id = this.$route.query.category1Id
    this.searchParams.category2Id = this.$route.query.category2Id
    this.searchParams.category3Id = this.$route.query.category3Id
    this.searchParams.categoryName=this.$route.query.categoryName
    this.searchParams.keyword=this.$route.query.keyword*///
    // object.assign:ES6新增的语法 合并对象
    Object.assign(this.searchParams, this.$route.query, this.$route.params)
  },
  // mounted在组件挂在完毕只会执行一次
  mounted() {
    // 测试接口返回的数据类型
    // this.$store.dispatch('getSearchList', {})
    // 在发送请求之前带给服务器参数
    this.getData()
  },
  methods: {
    // 向服务器发送请求获取search模块的数据(根据参数的不同返回1不同的数据)
    // 将请求封装为一个函数 需要的时候调用即可
    getData() {
      this.$store.dispatch('getSearchList', this.searchParams)
    },
    // 删除分类的名字 重置Id
    removeCategoryName() {
      // 把带给服务器的categoryName数据置空了 还需要再次发送请求
      this.searchParams.categoryName = undefined
      // 将字段的属性值设置为undefined 不会向服务器传递该字段
      this.searchParams.category1Id = undefined
      this.searchParams.category2Id = undefined
      this.searchParams.category3Id = undefined
      this.getData()
      // 重置地址栏
      // 进行路由的跳转 在自己的路由组件下跳转到自己
      // this.$router.push('/search')
      if (this.$route.params) {
        this.$router.push({name: 'search', params: this.$route.params})
      }
    },
    // 删除keyword
    removeKeyword() {
      // 将关键字keyword数据置空
      this.searchParams.keyword = undefined
      // 再次发送请求
      this.getData()
      // 通知兄弟组件Header清除关键字
      this.$bus.$emit('clear')

      // 进行路由的跳转
      if (this.$route.query) {
        this.$router.push({name: 'search', query: this.$route.query})
      }
    },
    // 删除品牌信息
    removeTrademark() {
      // 清空品牌信息并再次发送请求
      this.searchParams.trademark = undefined
      this.getData()
    },
    // 自定义事件的回调
    trademarkInfo(trademark) {
      // console.log('父组件', trademark)
      // 整理品牌字段参数
      // “ID：品牌名”
      this.searchParams.trademark = `${trademark.tmId}:${trademark.tmName}`
      // 再次发请求 获取search模块的 列表数据
      this.getData()
    },
    // 平台售卖属性值的回调
    attrInfo(attr, attrValue) {
      // console.log(attrValue)
      // console.log(attr)
      // 属性ID:属性值:属性名
      // console.log(attr, attrValue)
      // 整理数据
      let props = `${attr.attrId}:${attrValue}:${attr.attrName}`
      // 数组去重复
      if (this.searchParams.props.indexOf(props) === -1) {
        this.searchParams.props.push(props)
      }
      // 再次发送请求
      this.getData()
    },
    // 删除售卖属性
    removeAttr(index) {
      // console.log(index)
      this.searchParams.props.splice(index, 1)
      this.getData()
    },
    // 排序的操作
    // flag代表用户点击的是 1还是2 用户点击时传入
    changeOrder(flag) {
      // alert(12132)
      // alert(flag)
      let originOrder = this.searchParams.order
      let originFlag = this.searchParams.order.split(':')[0]
      let originSort = this.searchParams.order.split(':')[1]
      // 准备一个新的order的属性值
      let newOrder = ''
      // console.log(originFlag,originSort)
      if (flag === originFlag) {
        newOrder = `${originFlag}:${originSort === 'desc' ? 'asc' : 'desc'}`
        // console.log(newOrder)
      } else {
        // 点击的是价格
        newOrder = `${flag}:${'desc'}`
      }
      // 将新的newOrder赋值给searchParams
      this.searchParams.order = newOrder
      // 再次发送请求
      this.getData()
    },
    // 自定义事件 获取当前是第几页
    getPageNo(pageNo) {
      // console.log(pageNo)
      this.searchParams.pageNo = pageNo
      this.getData()
    }
  },
  computed: {
    // 也可以在仓库中的getters中实现
    /*...mapState({
      goodsList: state => state.search.searchList.goodsList
    })*///
    // mapGetters传递数组 计算是没有划分模块的
    ...mapGetters(['goodsList']),
    isOne() {
      return this.searchParams.order.indexOf('1') !== -1
    },
    isTwo() {
      return this.searchParams.order.indexOf('2') !== -1
    },
    /*isActive() {
      console.log(this.searchParams.order.split(':')[0] === '1')
      console.log(this.searchParams.order.indexOf('2') !== -1)
      console.log(this.searchParams.order.indexOf('1') !== -1)
      if (this.searchParams.order.split(':')[0] === '1') {
        return this.searchParams.order.indexOf('1') !== -1
      } else {
        return this.searchParams.order.indexOf('2') !== -1
      }
    }*/
    isAsc() {
      return this.searchParams.order.indexOf('asc') !== -1
    },
    isDesc() {
      return this.searchParams.order.indexOf('desc') !== -1
    },
    // 获取search模块获取的数据一共有多少
    ...mapState({
      total: state => state.search.searchList.total
    })
  },
  watch: {
    // 监听属性 监听组件实例身上属性的属性值变化
    // 监听路由的信息是否发生了变化 如果发生变化在此发送请求
    $route(newValue, oldValue) {
      // 在再次发送请求之前再次整理数据
      Object.assign(this.searchParams, this.$route.query, this.$route.params)
      // console.log(this.searchParams)
      // 再次发送请求
      this.getData()
      // 每一次请求完毕 应该把相应的1，2，3级分类的id设置为undefined 设置为空字符串也可以 但是会性能不如undefined
      this.searchParams.category1Id = undefined
      this.searchParams.category2Id = undefined
      this.searchParams.category3Id = undefined
    }
  }
}
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }

      .page {
        width: 733px;
        height: 66px;
        overflow: hidden;
        float: right;

        .sui-pagination {
          margin: 18px 0;

          ul {
            margin-left: 0;
            margin-bottom: 0;
            vertical-align: middle;
            width: 490px;
            float: left;

            li {
              line-height: 18px;
              display: inline-block;

              a {
                position: relative;
                float: left;
                line-height: 18px;
                text-decoration: none;
                background-color: #fff;
                border: 1px solid #e0e9ee;
                margin-left: -1px;
                font-size: 14px;
                padding: 9px 18px;
                color: #333;
              }

              &.active {
                a {
                  background-color: #fff;
                  color: #e1251b;
                  border-color: #fff;
                  cursor: default;
                }
              }

              &.prev {
                a {
                  background-color: #fafafa;
                }
              }

              &.disabled {
                a {
                  color: #999;
                  cursor: default;
                }
              }

              &.dotted {
                span {
                  margin-left: -1px;
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  font-size: 14px;
                  border: 0;
                  padding: 9px 18px;
                  color: #333;
                }
              }

              &.next {
                a {
                  background-color: #fafafa;
                }
              }
            }
          }

          div {
            color: #333;
            font-size: 14px;
            float: right;
            width: 241px;
          }
        }
      }
    }
  }
}
</style>