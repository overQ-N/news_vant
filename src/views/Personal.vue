<template>
  <div class="container">
    <div class="header">
      <div class="user">
        <div class="img"><img :src="$axios.defaults.baseURL+userinfo.head_img" alt=""></div>
        <div class="userInfo">
          <p>
            <i class="iconfont iconxingbienan" v-if="userinfo.gender===1"></i>
            <i class="iconfont iconxingbienv" v-if="userinfo.gender===0"></i>
          <span>{{userinfo.nickname}}</span>
          </p>
          <p>{{userinfo.create_date | formatDate}}</p>
        </div>
      </div>
      <i class="iconfont iconjiantou1"></i>
    </div>
    <div class="main">
      <listBar v-for="(item,index) in barData" :key="index" :label='item.label' :tips='item.tips'>

      </listBar>
    </div>
  </div>
</template>

<script>
import listBar from '../components/ListBar'
export default {
  data () {
    return {
      barData: [
        { label: '我的关注', tips: '关注的用户' },
        { label: '我的跟帖', tips: '跟帖/回复' },
        { label: '我的收藏', tips: '文章/视频' },
        { label: '设置', tips: '' }
      ],
      userinfo: {

      }
    }
  },
  mounted () {
    this.getUserInfo()
  },
  components: {
    listBar
  },
  methods: {
    async  getUserInfo () {
      const id = JSON.parse(sessionStorage.getItem('news_token')).id
      const { data: res } = await this.$axios.get('user/' + id)
      console.log(res)
      this.userinfo = res.data
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
.container{
  background $bg
  height 100%
}
.header
  height vw(300)
  padding vw(40)
  border-bottom #e4e4e4 4px solid
  display flex
  justify-content space-between
  align-items center
  .user
    width vw(500)
    height vw(160)
    display flex
    justify-content space-between
    .img
      width vw(160)
      height vw(160)
      border-radius 50%
      background #424a60
      img
        width 100%
        border-radius 50%
    .userInfo
      flex 1
      padding-left 10px
      display flex
      margin  vw(20) 0
      flex-direction column
      justify-content space-around
      .iconxingbienan
        color blue
      .iconxingbienv
        color pink
  i
    font-size vw(32)
.main
  padding 0 vw(40)

</style>
