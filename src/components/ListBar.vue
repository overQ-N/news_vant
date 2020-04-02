<template>
  <div class="listBar">
    <span>{{label}}</span>
    <div><router-link :to='path?path:""'><span>{{tips}}</span><i class="iconfont iconjiantou1"></i></router-link></div>
  </div>
</template>

<script>
export default {
  props: ['label', 'tips', 'path']
}
</script>

<style lang='stylus' scoped>
.listBar
  border-bottom: 1px solid #eee4e4
  display: flex
  justify-content: space-between
  align-items: center
  height: (100 / 750) * 100vw
  div
    span
      margin-right 10px
      font-size 14px
      color #bbb
</style>
