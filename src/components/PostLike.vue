<template>
  <div>
    <footer>
        <button>
          <i :class="['iconfont','icondianzan',has_like?'active':'']" @click="handleLike"></i>
          {{like_length}}
        </button>
        <button>
          <i class="iconfont iconweixin"></i>
          微信
        </button>
      </footer>
  </div>
</template>

<script>
export default {
  props: {
    has_like: {
      type: Boolean
    },
    like_length: {
      type: Number
    }
  },
  methods: {
    // 点赞
    handleLike () {
      this.$emit('handleLike', this.has_like)
    }
  }
}
</script>

<style lang='stylus' scoped>
$bg = #f2f2f2
$font-color = #cc3300
$vw_base = 750

vw(x)
  (x / $vw_base) * 100vw
footer
  display flex
  padding 0 vw(80)
  justify-content space-around
  height vw(200)
  align-items center
  margin-bottom 70px
  button
    padding 5px 10px
    border-radius:30px
    border 1px solid #ccc
    background transparent
    font-size 12px
  .iconweixin
    color green
  .active
    color #ff0000
</style>
