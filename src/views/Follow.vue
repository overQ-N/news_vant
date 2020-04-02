<template>
  <div class="container">
    <NavBar label='我的关注'></NavBar>
    <div>
      <div class="main" v-for="(item,index) in followList" :key='index'>
      <img :src="item.head_img?$axios.defaults.baseURL+item.head_img:''" alt="">
      <div class="follow">
        <h4>{{item.nickname}}</h4>
        <p>{{item.create_date | formatDate}}</p>
      </div>
      <span class="cancel" @click="cancelFollow(item.id)">取消关注</span>
    </div>
    </div>
  </div>
</template>

<script>
import NavBar from '../components/NavBar'
export default {
  data () {
    return {
      followList: []
    }
  },
  components: {
    NavBar
  },
  mounted () {
    this._getFollowList()
  },
  methods: {
    async _getFollowList () {
      const id = JSON.parse(sessionStorage.getItem('news_token')).id || ''
      if (id) {
        const { data: res } = await this.$axios.get('/user_follows')
        this.followList = res.data
      }
    },
    // 取消关注
    async cancelFollow (id) {
      this.$dialog.confirm({ message: '确认取消关注？', title: '提示' })
        .then(async res => {
          if (res === 'confirm') {
            const { data: res1 } = await this.$axios.get('/user_unfollow/' + id)
            this.$toast.success(res1.message)
            this._getFollowList()
          }
        })
        .catch(err => {
          console.log(err)
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
.container
  background $bg
  height 100%
.main
  padding vw(40)
  display flex
  justify-content space-between
  align-items center
  border-bottom 1px #e5e5e5 solid

  img
    width vw(100)
    height vw(100)
    object-fit cover
    margin-right 10px
    border-radius 50%
    background #b3b3b3
  .follow
    flex 1
  .cancel
    background #e1e1e1
    padding 8px
    border-radius 30px
    font-size 12px

</style>
