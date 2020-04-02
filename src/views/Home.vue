<template>
  <div>
    <div class="header">
      <i class="iconfont iconnew"></i>
      <router-link to="#" tag="div" class="search-box">
        <i class="iconfont iconsearch"></i>搜索新闻
      </router-link>
      <i class="iconfont iconwode"></i>
    </div>
    <div class="tab">
      <van-tabs v-model="active" sticky swipeable>
        <van-tab v-for="item in categories" :title="item.name" :key="item.id">
          <van-list
          :immediate-check='false'
          v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
            <div v-for="(item1,index) in list" :key="index">
              <SinglePic :data='item1'  v-if="item1.cover.length>0&&item1.type===1"/>
              <ThreePic :data='item1' v-if="item1.cover.length>=3&&item1.type===1"/>
              <Nopic :data='item1' v-if="item1.cover.length>=0&&item1.type===2"/>
            </div>
          </van-list>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import Pic from '@/components/pic/index.js'
export default {
  data () {
    return {
      // 栏目列表
      categories: [],
      // 文章列表数据
      list: [],
      // 当前tab栏激活的索引
      active: 0,
      // 是否正在加载
      loading: false,
      // 获取数据是否完成
      finished: false
    }
  },
  mounted () {
    const newstoken = JSON.parse(sessionStorage.getItem('news_token')) || {}
    const token = newstoken.token ? newstoken.token : ''
    const hasFollow = this.categories.filter(v => v.name === '关注')
    if (token && hasFollow.length === 0) {
      this._getCategories()
    }
    if (!token) {
      this._getCategories()
    }
    this._getPost(999)
  },
  watch: {
    async active () {
      console.log(this.categories[this.active].id)
      if (this.active === this.categories.length - 1) {
        this.$router.push('/ssssssss')
      }
      this.list = []
      this._getPost(this.categories[this.active].id)
    }
  },
  components: {
    ...Pic
  },
  methods: {
    async _getCategories () {
      const { data: res } = await this.$axios.get('/category')
      res.data.push({
        name: 'V'
      })
      // res.data.map()
      const categories = res.data.map(v => {
        v.pageIndex = 1
        v.pageSize = 10
        v.total = res.total
        return v
      })
      this.categories = categories
      console.log('cate', this.categories)
    },
    async _getPost (id, pageIndex = 1, pageSize = 10) {
      console.log('pages', pageIndex)
      const { data: res } = await this.$axios.get('/post', {
        params:
      { category: id, pageIndex, pageSize }
      })
      console.log('res.data', res.data)
      this.list = [...this.list, ...res.data]
      const cate = this.categories.findIndex(v => v.id === id)
      if (cate !== -1) {
        this.categories[cate].total = res.total
      }
      this.loading = false
      console.log(this.categories[cate].total, this.list.length)
      if (this.categories[cate].total === this.list.length) {
        this.finished = true
      }
      console.log('post', res.data)
    },
    onLoad () {
      this.categories[this.active].pageIndex = this.categories[this.active].pageIndex + 1
      this._getPost(this.categories[this.active].id, this.categories[this.active].pageIndex)
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

.header
  display: flex
  padding: vw(40)
  justify-content: space-between
  align-items: center
  color: #fff
  height: vw(100)
  background: #ff0000

  .search-box
    flex: 1
    display: flex
    justify-content: center
    background: rgba(255, 255, 255, 0.6)
    margin: 0 vw(70)
    vertical-align: middle
    height: vw(64)
    align-items: center
    border-radius: 50px

    i
      position: relative
      top: 2px

  .iconnew
    transform: scale(3.5)
    position: relative
    left: vw(20)

  .iconwode
    font-size: vw(40)

.tab
  height: vw(88)

  /deep/ .van-tabs__wrap
    // right 60px
    /deep/ .van-tabs__nav
      background: #e4e4e4
      position: static
      margin-right: vw(80)

      .van-tab--active
        border-bottom: 2px #ff0000 solid

      /deep/ .van-tab:nth-last-child(2)
        width: vw(80) !important
        background: #e4e4e4
        position: absolute
        right: 0
        top: 0

      .van-tabs__line
        display: none
</style>
