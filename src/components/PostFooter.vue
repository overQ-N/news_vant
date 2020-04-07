<template>
  <div>
     <div class="fixed">
        <div class="share">
          <input type="text" placeholder="发布评论">
        <i class="iconfont iconpinglun-">
          <span>{{post.comment_length>99?99:post.comment_length}}</span>
        </i>
        <i :class="['iconfont','iconshoucang',post.has_star?'hasStar':'']" @click="handleStar"></i>
        <i class="iconfont iconfenxiang"></i>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  props: ['post'],
  methods: {
    // 收藏
    handleStar () {
      this.$axios.get('/post_star/' + this.post.id)
        .then(({ data }) => {
          if (data.message === '收藏成功') {
            this.post.has_star = true
          } else {
            this.post.has_star = false
          }
          this.$toast.success(data.message)
        })
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
.fixed
  position fixed
  padding vw(25)
  background #fff
  left 0
  bottom 0
  width 100%
  .share
    display flex
    justify-content space-between
    align-items center
    input
      flex 4
      border-radius 40px
      height vw(60)
      font-size 14px
      background #f0eef0
    i
      flex 1
      font-size 20px
      text-align center
    .iconpinglun-
      position relative
      span
        position absolute
        display block
        font-size 10px
        background #ff0000
        padding 0px 2px
        border-radius 10px
        color #fff
        top -8px
        left 22px
    .hasStar
      color #ff0000
</style>
