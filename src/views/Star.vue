<template>
  <div>
    <NavBar label='我的收藏'/>
    <div class="list" v-for='item in starList' :key='item.id'>
      <!-- 单图的横版 -->
      <SinglePic v-if="item.cover.length<3&&item.cover.length>0&&item.type===1" :data='item'/>
      <!-- 三图的模板 -->
      <ThreePic :data='item' v-if="item.cover.length==3"/>
      <!-- 视频的模板 -->
      <Nopic :data="item" v-if="item.type===2"/>
    </div>
  </div>
</template>

<script>
import NavBar from '../components/NavBar'
import Pic from '../components/pic/index'
export default {
  data () {
    return {
      starList: []
    }
  },
  components: {
    NavBar,
    ...Pic
  },
  mounted () {
    this._getStarList()
  },
  methods: {
    async _getStarList () {
      const { data: res } = await this.$axios.get('/user_star')
      this.starList = res.data
    }
  }
}
</script>

<style lang='stylus' scoped>

</style>
