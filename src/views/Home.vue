<template>
  <div>
    <div class="header">
      <i class="iconfont iconnew"></i>
      <router-link to="/search" tag="div" class="search-box">
        <i class="iconfont iconsearch"></i>搜索新闻
      </router-link>
      <router-link to='/personal'><i class="iconfont iconwode"></i></router-link>
    </div>
    <div class="tab">
      <van-tabs v-model="active" sticky swipeable  @scroll='handleScroll'>
        <van-tab v-for="item in cates"
        :title="item.name" :key="item.id" >

          <van-list
          :immediate-check='false'
          v-model="item.loading" :finished="item.finished" finished-text="没有更多了" @load="onLoad">
            <div v-for="(item1,index) in item.list" :key="index">
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
  name: 'home',
  data () {
    return {
      // 栏目列表
      categories: [],
      // 文章列表数据
      list: [],
      // 当前tab栏激活的索引
      active: 0
      // 是否正在加载
      // loading: false,
      // 获取数据是否完成
      // finished: false
    }
  },
  mounted () {
    this.reload()
  },
  watch: {
    active () {
      if (this.active === this.cates.length - 1) {
        this.$router.push('/catemanage')
      }
      // this.list = []
      this._getPost(this.cates[this.active].id)
      setTimeout(() => {
        window.scroll(0, this.cates[this.active].scrollY)
      }, 20)
    }
  },
  computed: {
    cates () {
      return this.categories.filter(v => v.is_top !== 0)
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
        v.loading = false
        v.finished = false
        v.list = []
        v.scrollY = 0 // 记录距离顶部的坐标
        return v
      })
      this.categories = categories

      this._getPost(this.categories[this.active].id)
      // 将栏目列表存到localstorage
      localStorage.setItem('news_info', JSON.stringify(this.categories))
    },
    // 获取文章列表
    async _getPost (id, pageIndex = 1, pageSize = 10) {
      const cate = this.cates[this.active]
      if (cate.finished) return
      const { data: res } = await this.$axios.get('/post', {
        params:
      { category: id, pageIndex, pageSize }
      })
      cate.list = [...cate.list, ...res.data]
      cate.loading = false
      if (!res.total || res.total === cate.list.length || res.data.length === 0) {
        cate.finished = true
      }
    },
    // 滚动到底部获取分页数据
    onLoad () {
      this.categories[this.active].pageIndex = this.categories[this.active].pageIndex + 1
      this._getPost(this.categories[this.active].id, this.categories[this.active].pageIndex)
    },
    handleScroll ({ scrollTop }) {
      if (this.categories.length === 0) return
      this.categories[this.active].scrollY = scrollTop
    },
    // 初
    reload () {
      const newstoken = JSON.parse(sessionStorage.getItem('news_token')) || {}
      const token = newstoken.token ? newstoken.token : ''
      const newsInfo = JSON.parse(localStorage.getItem('news_info')) || []
      const hasFollow = newsInfo ? newsInfo.filter(v => v.name === '关注') : []
      // 如果有本地数据
      if (newsInfo.length !== 0) {
      // 如果有token并且没有关注列表，重新请求
        if (token && hasFollow.length === 0) {
          this._getCategories()
        } else if (!token && hasFollow.length > 0) { // 如果没有token但有关注列表，重新请求
          this._getCategories()
        } else {
          this.categories = newsInfo
          this._getPost(this.cates[this.active].id)
        }
      } else {
      // 如果没有本地数据
        if (token) {
          this._getCategories() // 如果有登录，获取关注列表数据
        } else {
          this._getCategories() // 如果没有登录，获取头条列表数据
        }
      }
    }
  },
  beforeRouteEnter (to, from, next) {
    if (from.path === '/catemanage') {
      next(vm => {
        vm.reload()
      })
    } else {
      next()
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
