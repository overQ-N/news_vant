<template>
  <div>
    <NavBar label='我的收藏'/>
    <div class="list" v-for='item in starList' :key='item.id'>
      <div class="singlePic" v-if="item.cover.length<3&&item.cover.length>0">
        <div class="content">
           <h4>{{item.title}}</h4>
          <p class="comments">{{item.user.nickname}}  {{item.comments.length}}跟贴</p>
        </div>
        <img :src="$axios.defaults.baseURL + item.cover[0].url" alt="">
      </div>
      <div class="threePic" v-if="item.cover.length==3">
        <h4>{{item.title}}</h4>
        <div class="imglist">
          <img :src="$axios.defaults.baseURL+img.url" alt="" v-for="(img,index) in item.cover" :key='index' :class="index!=0 ? 'boder-left':''">
        </div>
        <p class="comments">{{item.user.nickname}}  {{item.comments.length}}跟贴</p>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from '../components/NavBar'
export default {
  data () {
    return {
      starList: []
    }
  },
  components: {
    NavBar
  },
  mounted () {
    this._getStarList()
  },
  methods: {
    async _getStarList () {
      const { data: res } = await this.$axios.get('/user_star')
      this.starList = res.data
      console.log(this.starList)
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
.list
  .singlePic
    display flex
    padding  0 vw(40)
    justify-content space-between
    .content
      flex 1
      display flex
      flex-direction column
      justify-content space-around
      h4
        font-weight 400
        font-size 16px
      p
        color #868686
        font-size 12px
    img
      flex none
      width vw(200)
      height vw(125)
      object-fit cover
  .threePic
    display flex
    padding  0 vw(40)
    flex-direction column
    margin-top 6px
    align-content space-around
    h4
      font-weight 400
      font-size 16px
    .imglist
      display flex
      img
        width 33%
        height vw(125)
        object-fit cover
    p
      color #868686
      font-size 12px

.singlePic,.threePic
  border-bottom solid 1px #e4e4e4
  margin-top 5px
  .comments
    padding 5px 0
  .boder-left
    border-left 2px solid #fff
</style>
