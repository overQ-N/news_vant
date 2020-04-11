<template>
  <div>
    <div class="second-comments">
      <commentFloor :data='data.parent' v-if="data.parent" @reply='handleReply'/>
        <div class="user">
          <div class="user-info">
              <span class="user-name">{{data.user.nickname}}</span>
              <span class="time">{{moment(data.create_date).fromNow()}}</span>
          </div>
          <span class="reply" @click="handleReply(data)">回复</span>
        </div>
        <div class="comments-content">
          {{data.content}}
        </div>
      </div>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  name: 'commentFloor',
  data () {
    return {
      moment
    }
  },
  mounted () {
  },
  props: ['data'],
  methods: {
    handleReply (item) {
      this.$emit('reply', item)
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
// .container
//   border 1px solid #ccc
//   padding 5px
.second-comments
  border 1px solid #ccc
  padding 2px
  margin 3px
  .user
    display flex
    justify-content space-between
    color #ccc
    font-size 10px
  .user-info
    flex 1
    .user-name
      font-size 14px
      color #000
      margin-right 5px
  .reply
    font-size 12px
</style>
