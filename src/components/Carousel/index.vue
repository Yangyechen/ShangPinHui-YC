<template>
  <!--轮播图-->
  <div class="swiper-container" ref="floor1Swiper">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(carousel,index) in list" :key="carousel.id">
        <img :src="carousel.imgUrl">
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
// 引入Swiper
import Swiper from "swiper";

export default {
  name: "Carousel",
  props: ['list'],
  watch: {
    list: {
      // floorList中的数据不会发生变化 因为他的数据是从父组件传入的
      // 立即监听 无论数据是否变化
      immediate: true,
      handler() {
        // 通过watch监听bannerList属性值的变化
        // 执行handler方法 代表组件实例身上的属性的属性值已经有了数组对象 四个元素
        // 当执行这个毁掉的时候 服务器的数据已经返回并被v-for捕获
        this.$nextTick(() => {
          var mySwiper = new Swiper(this.$refs.floor1Swiper, {
            // direction: 'vertical', // 垂直切换选项
            loop: true, // 循环模式选项
            // 如果需要分页器
            pagination: {
              el: '.swiper-pagination',
              clickable: true
            },
            // 如果需要前进后退按钮
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            }
          })
        })

      }
    }
  }
}
</script>

<style scoped>

</style>
