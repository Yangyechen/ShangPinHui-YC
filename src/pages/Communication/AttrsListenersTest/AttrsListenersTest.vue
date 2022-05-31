<template>
  <div>
    <h2>自定义带Hover提示的按钮</h2>
    <!--<el-button type="primary">你好，这是elmentUI 的button组件</el-button>-->
    <!-- 二次封装的HintButton按钮的时候，把人家el-button需要的数据传递过去 -->
    <HintButton type="success" icon="el-icon-plus" title="哈尔滨工业大学" @click="handler"/>
    <!--<HintButton type="primary" icon="el-icon-delete" title="哈尔滨工业大学" size="mini" @click="handler"/>-->
  </div>
</template>

<script type="text/ecmascript-6">
import HintButton from './HintButton';

export default {
  name: 'AttrsListenersTest',
  components: {
    HintButton
  },
  methods: {
    handler() {
      alert('哈尔滨工业大学');
    },
  },
}
</script>
