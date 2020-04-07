<template>
  <div>
    <video :src="$axios.defaults.baseURL+post.content" controls
    :poster="$axios.defaults.baseURL+post.cover[0].url"></video>
    <div class="main">
      <div class="user">
        <div class="user-icon">
          <img :src="$axios.defaults.baseURL+post.user.head_img" alt="">
          {{post.user.nickname}}
        </div>
        <button :class="post.has_follow?'active':''" @click="handleFollow">
          {{post.has_follow?'已关注':'关注'}}
        </button>
      </div>
      <PostLike
      @handleLike="handleLike"
      :has_like='post.has_like' :like_length='post.like_length'/>
    </div>
    <PostFooter :post='post'/>
  </div>
</template>

<script>
import PostFooter from '../components/PostFooter'
import PostLike from '../components/PostLike'
export default {
  data () {
    return {
      post: { user: {}, cover: [{}] }
    }
  },
  components: {
    PostFooter,
    PostLike
  },
  mounted () {
    this.$axios.get('/post/' + this.$route.params.id)
      .then(({ data }) => {
        console.log(data)
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
    // 接收postlike组件的点赞事件
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

<style lang="stylus" scoped>
$bg = #f2f2f2
$font-color = #cc3300
$vw_base = 750

vw(x)
  (x / $vw_base) * 100vw
video
  max-width 100%
.main
  padding vw(25)
  .user
    display flex
    justify-content space-between
    align-items center
    .user-icon
      display flex
      align-items center
      font-size 15px
      color #999
      img
        width vw(60)
        height vw(60)
        border-radius 50%
        object-fit cover
        margin-right 5px
    button
      padding 5px 10px
      border-radius:30px
      border 1px solid #ccc
      background transparent
      font-size 12px
    .active
      background #ff0000
      color #fff
</style>
