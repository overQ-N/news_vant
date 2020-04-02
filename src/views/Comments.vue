<template>
  <div class="container">
    <NavBar label='我的跟贴'/>
    <div class="main" v-for="item in comments" :key="item.id">
      <!-- 回复的帖子 -->
      <div class="answer">
        <p>{{item.create_date | formatDate}}</p>
        <h4>{{item.content}}</h4>
        <!-- 原文 -->
        <div class="title">原文：{{item.post.title}}</div>
      </div>
      <!-- 回复内容 -->
      <div class="user-comment" v-if="item.parent">
        <p class="time">{{item.parent.create_date | formatDate}}</p>
        <div class="comment">
          <p>回复<span>{{item.parent.user.nickname}}</span></p>
          <p>{{item.parent.content}}</p>
        </div>
        <p class="comment-to">{{item.content}}</p>
        <!-- 原文 -->
        <div class="title">{{item.title}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from '../components/NavBar'
export default {
  data () {
    return {
      comments: []
    }
  },
  components: {
    NavBar
  },
  mounted () {
    this._getComments()
  },
  methods: {
    async _getComments () {
      const { data: res } = await this.$axios.get('/user_comments')
      this.comments = res.data
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
.container
  background $bg
  min-height 100vh
.main
  .answer
    padding 0 vw(40)
    border-bottom 1px solid #dcdcdc
    p
      color #a4afbc
    h4
      padding 5px 0
  .user-comment
    padding 0 vw(40)
    border-bottom 1px solid #dcdcdc
    p
      color #a4afbc
      color #a4afbc
    .time
      margin 8px 0
    .comment-to
      color #000
      padding 8px 0
    .comment
      padding 5px
      margin 8px 0
      background #e4e4e4
.title
  text-overflow ellipsis
  overflow hidden
  white-space nowrap
  color #a9a9a9
  padding 8px 0
</style>
