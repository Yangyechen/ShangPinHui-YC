<template>
  <div style="background: #ccc; height: 80px;">
    <h2>Event2组件</h2>
    <button @click="$emit('点击','自定义事件click')">分发自定义点击事件</button>
    <br>
    <button @click="$emit('xxx','自定义xxx事件！！！')">分发自定义xxx事件</button>
    <br>
  </div>
</template>
