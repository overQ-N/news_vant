<template>
  <div>
      <header>
        <div class="header">
          <div class="logo">
          <i class="iconfont iconjiantou" @click="$router.back()"></i>
          <i class="iconfont iconnew"></i>
        </div>
        <button :class="post.has_follow?'active':''" @click="handleFollow">
          {{post.has_follow?'已关注':'关注'}}
        </button>
        </div>
      </header>
      <main>
        <h4>{{post.title}}</h4>
        <p>{{post.user.nickname}} {{post.create_date | formatDate}}</p>
        <div class="content" v-html="post.content">
        </div>
      </main>
      <PostLike
      @handleLike="handleLike"
      :has_like='post.has_like' :like_length='post.like_length'/>
      <PostFooter :post='post'/>
  </div>
</template>

<script>
import PostLike from '../components/PostLike'
import PostFooter from '../components/PostFooter'
export default {
  data () {
    return {
      post: {
        user: {}
      }
    }
  },
  components: {
    PostFooter,
    PostLike
  },
  mounted () {
    this.$axios.get('/post/' + this.$route.params.id)
      .then(({ data }) => {
        this.post = data.data
      })
  },
  methods: {
    // 关注和取消关注
    handleFollow () {
      !this.post.has_follow && this.follow()
      this.post.has_follow && this.unfollow()
    },

    // 关注用户
    follow () {
      this.$axios.get('/user_follows/' + this.post.user.id)
        .then(({ data }) => {
          if (data.message === '关注成功') {
            this.post.has_follow = true
            this.$toast.success('关注成功')
          }
        })
    },
    // 取关
    unfollow () {
      this.$axios.get('/user_unfollow/' + this.post.user.id)
        .then(({ data }) => {
          if (data.message === '取消关注成功') {
            this.post.has_follow = false
            this.$toast.success('取消关注成功')
          }
        })
    },
    handleLike (haslike) {
      this.$axios.get('/post_like/' + this.post.id)
        .then(({ data }) => {
          if (haslike) {
            this.post.has_like = false
            this.post.like_length--
          } else {
            this.post.has_like = true
            this.post.like_length++
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
header
  position fixed
  left 0
  top 0
  width 100%
  background #fff
  .header
    padding vw(25)
    display flex
    justify-content space-between
    align-items center
    .iconnew
      display inline-block
      transform scale(4) translateX(6px)
    button
      padding 5px 10px
      border-radius:30px
      border 1px solid #ccc
      background transparent
      font-size 12px
    .active
      background #ff0000
      color #fff
main
  margin-top vw(120)
  padding 0 vw(25)
  p
    font-size 14px
    color #ccc
    margin 5px 0
  .content
    font-size 15px
    margin-top vw(40)
    background transparent
    /deep/ img
      max-width 100%

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
