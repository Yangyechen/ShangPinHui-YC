<template>
  <div>
    小明的爸爸现在有{{ money }}元
    <h2>不使用sync修改符</h2>
    <Child :mn="money" @update:money="money=$event"/>
    <h2>使用sync修改符</h2>
    <!-- 父组件给子组件传递了props mn 给子组件绑定了一个自定义事件update:mn -->
    <Child2 :mn.sync="money"></Child2>
    <h2>使用v-model修改符</h2>
    <hr/>
  </div>
</template>

<script type="text/ecmascript-6">
import Child from './Child.vue'
import Child2 from './Child2.vue'

export default {
  name: 'SyncTest',
  data() {
    return {
      money: 10000
    }
  },
  components: {
    Child,
    Child2
  }
}
</script>
