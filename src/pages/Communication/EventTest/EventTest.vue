<template>
  <div>
    <h1>EventTest组件</h1>
    <!-- 原生DOM事件 -->
    <button @click='handler'>原生button事件</button>
    <!-- 使用Event1组件：底下这个组件  @click.native 原生DOM事件，利用事件的委派-->
    <!--.native修饰符可以将自定义事件转变为原生DOM事件-->
    <Event1 @click.native="handler1"/>
    <hr/>
    <!-- 自定义事件对于原生DOM没有任何意义 -->
    <!-- <button @erha="handler3"> 原生的btn</button> -->
    <Event2 @点击="handler2" @xxx="handler3"/>
    <!-- 表单元素 color:选取颜色  range：范围条 date：日历 week-->
    <input type="week"/>
  </div>
</template>

<script type="text/ecmascript-6">
import Event1 from './Event1.vue'
import Event2 from './Event2.vue'

export default {
  name: 'EventTest',
  components: {
    Event1,
    Event2,
  },
  methods: {
    //原生DOM事件的回调
    handler() {
      alert('原生DOM事件的回调！！！')
    },
    handler1() {
      alert('Event1自定义事件回调！！！')
    },
    handler2(params) {
      alert('Event2自定义点击事件回调！！！');
      console.log('参数:', params)
    },
    handler3(params) {
      alert('自定义xxx事件的回调！！！')
      console.log(params)
    }
  }
}
</script>
