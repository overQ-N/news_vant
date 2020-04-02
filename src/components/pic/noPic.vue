<template>
  <div class="noPic">
    <h4>{{data.title}}</h4>
    <div class="img">
      <div class="mask">
        <i class="iconfont iconshipin"></i>
      </div>
      <img :src="$axios.defaults.baseURL+data.cover[0].url" alt />
    </div>
    <p class="comments">{{data.user.nickname}} {{data.comment_length}}跟贴</p>
  </div>
</template>

<script>
export default {
  props: ['data']
}
</script>

<style lang='stylus' scoped>
.noPic
  padding: 0 vw(25)
  border-bottom: solid 1px #e4e4e4
  margin-top: 5px

  h4
    font-weight: 400
    font-size: 16px

  .img
    position: relative
    height: vw(400)
    margin: 9px 0

    .mask
      position: absolute
      width: vw(125)
      height: vw(125)
      border-radius: 50%
      background: rgba(0, 0, 0, 0.5)
      left: 50%
      top: 50%
      transform: translateX(-50%) translateY(-50%)
      display: flex
      align-items: center
      justify-content: center

      i
        font-size: 40px
        color: #fff

    img
      display: block
      width: 100%
      height: 100%
      object-fit: cover

  p
    color: #868686
    font-size: 12px

  .comments
    padding: 5px 0
</style>
