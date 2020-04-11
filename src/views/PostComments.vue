<template>
  <div>
    <NavBar  label='精彩跟帖'/>
    <!-- 评论列表 -->
    <div class="comments" v-for="(item,index) in comments" :key="index">
      <!-- 一级评论列表 -->
      <div class="first-comments">
        <img :src="$axios.defaults.baseURL+item.user.head_img" alt="">
        <div class="user-info">
          <span>{{item.user.nickname}}</span>
          <div class="time">{{moment(item.create_date).fromNow()}}</div>
        </div>
        <span class="reply" @click="handleReply(item)">回复</span>
      </div>
      <!-- 二级评论列表 -->
      <PostCommentsCom v-if="item.parent" :data='item.parent' @reply='handleReply'/>
      <!-- 一级评论的内容 -->
      <div class="comments-content">
        {{item.content}}
      </div>
    </div>
    <div class="none">
      <span>没有更多了</span>
      <span style="opacity:0">不显示的</span>
    </div>
    <div class="replyInput">
      <van-field
      v-model="msg" :rows='rows' :autosize="!isFocus" type="textarea" :class="['textarea',isFocus?'active':'']"
      @focus="handleFocus" :placeholder="reply.user?`回复@${reply.user.nickname}`:'说点什么吧...'"
      @blur="handleBlur" ref="vanField">
      </van-field>
      <button v-if="isFocus" @click="handleSubmit" class="submit">发布</button>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import PostCommentsCom from '../components/PostCommentsCom'
import NavBar from '../components/NavBar'
moment.locale('zh-CN')
export default {

  data () {
    return {
      comments: [],
      moment,
      // 回复的内容
      msg: '',
      // 文本域的行数
      rows: 1,
      isFocus: false,
      // 评论回复的对象
      reply: {}
    }
  },
  components: {
    NavBar,
    PostCommentsCom
  },
  mounted () {
    this.getComments()
  },
  methods: {
    getComments () {
      this.$axios.get('/post_comment/' + this.$route.params.post_id)
        .then(({ data }) => {
          this.comments = data.data
          console.log(this.comments)
        })
    },
    handleReply (item) {
      console.log(item, 'item---------')

      setTimeout(() => {
        this.reply = item
        this.isFocus = true
        this.$refs.vanField.focus()
      }, 200)
    },
    // 聚焦
    handleFocus () {
      this.isFocus = true
      this.rows = 3
    },
    // 失焦
    handleBlur () {
      setTimeout(() => {
        this.isFocus = false
        if (this.msg.trim() === '') {
          this.reply = {}
        }
      }, 200)
    },
    handleSubmit () {
      console.log(this.reply.id)

      if (this.msg.trim() === '') return this.$toast.fail('必须输入内容哦')
      this.$axios.post('/post_comment/' + this.$route.params.post_id, {
        content: this.msg,
        parent_id: this.reply.id
      })
        .then(({ data }) => {
          this.getComments()
          this.$toast.success('发布成功')
          this.msg = ''
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
.comments
  padding vw(25)
  border-bottom 1px solid #ccc
  .first-comments
    display flex
    justify-content space-between
    align-items center
    img
      width vw(60)
      height vw(60)
      border-radius 50%
      margin-right 5px
    .user-info
      flex 1
      display flex
      flex-direction column
      justify-content space-around
      .time
        color #ccc
        font-size 10px
    .reply
      font-size 12px
  .comments-content
    padding-top 10px
.none
  display flex
  color #ccc
  flex-direction column
  justify-content space-around
  align-items center
  height vw(240)

.replyInput
  position fixed
  padding vw(25)
  // height vw(80)
  bottom  0
  left 0
  width 100%
  display flex
  justify-content space-between
  align-items flex-end
  .textarea
    line-height 1
    border-radius 30px
  .active
    height: 82px!important;
    border-radius: 8px;
  .submit
    margin 0 5px
    border-radius 30px
    width 20%
    height vw(80)
    background #ff0000
    outline 0
    border 0
    font-size 12px
    text-align center
    color #fff
</style>
