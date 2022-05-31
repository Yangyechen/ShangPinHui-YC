<template>
  <div>
    <!--<h1 v-upper.ceshi="msg"></h1>-->
    <Header/>
    <!--路由组件出口的地方-->
    <router-view></router-view>
    <!--Home Search显示 Login register隐藏-->
    <!--<Footer v-show="$route.path==='/home'||$route.path==='/search'"/>-->
    <Footer v-show="$route.meta.show"/>
    <!--<Footer v-show="$route.meta.isShow"/>-->
  </div>
</template>

<script>
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default {
  name: 'App',
  data() {
    return {
      msg: 'abc'
    }
  },
  components: {
    Header,
    Footer
  },
  mounted() {
    // 通知Vuex发送请求 获取数据 存储在仓库中
    this.$store.dispatch(
        'categoryList',
        // 'getCategoryList'
    )
  }
}
</script>

<style>

</style>
