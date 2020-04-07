<template>
  <div class="container">
    <div class="header">
      <i class="iconfont iconjiantou" @click="$router.back()"></i>
      <div class="input-box">
        <i class="iconfont iconsearch"></i>
        <input type="text" v-model.trim="queryInfo.keyword" @keyup.enter="handleSearch" />
      </div>
      <span @click="handleSearch">搜索</span>
    </div>
    <main>
      <div class="title">
        <span>历史记录</span>
        <i class="iconfont iconicon-test" @click="clearHistory"></i>
      </div>
      <div class="list">
        <div
          class="list-item"
          v-for="(item, index) in history"
          :key="index"
          @click="historySearch(item)"
        >{{item}}</div>
      </div>
    </main>
    <div class="history-layer" v-if="isShowLayer">
      <div v-for="(item,index) in postList" :key="index">
        <SinglePic :data="item" v-if="item.cover.length>0&&item.type===1" />
        <ThreePic :data="item" v-if="item.cover.length>=3&&item.type===1" />
        <Nopic :data="item" v-if="item.cover.length>=0&&item.type===2" />
      </div>
    </div>
  </div>
</template>

<script>
import Pic from '../components/pic'
export default {
  name: 'search',
  data () {
    return {
      queryInfo: {
        keyword: '',
        pageIndex: 1,
        pageSize: 5
      },
      total: 0,
      history: JSON.parse(localStorage.getItem('history')) || [],
      // 是否展示搜索结果浮层
      isShowLayer: false,
      postList: []

    }
  },
  components: {
    ...Pic
  },
  watch: {
    'queryInfo.keyword' () {
      this.isShowLayer = false
    }
  },
  methods: {
    // 通过输入框查询文章
    handleSearch () {
      this.getList(this.queryInfo)
      this.history.unshift(this.queryInfo.keyword)
      this.history = [...new Set(this.history)]
      localStorage.setItem('history', JSON.stringify(this.history))
    },
    // 点击历史记录查询文章
    historySearch (item) {
      this.queryInfo.keyword = item
      this.getList(this.queryInfo)
    },
    // 查询文章
    getList (queryInfo) {
      this.$axios
        .get('/post_search', { params: queryInfo })
        .then(({ data }) => {
          if (!data.total) {
            return this.$toast.fail('没有查询到文章哦')
          }
          this.postList = data.data
          this.total = data.total
          this.isShowLayer = true
        })
    },
    // 清空搜索记录
    clearHistory () {
      localStorage.removeItem('history')
      this.history = []
    }
  },
  beforeRouteEnter (to, from, next) {
    // ...
    next(vm => {
      // 如果是首页进来的,清空搜索内容和隐藏浮层
      if (from.path === '/') {
        vm.value = ''
        vm.isShowLayer = false
      }
    })
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
  padding: vw(10) vw(25)
  height: vw(70)
  line-height: vw(70)

  .iconjiantou
    display: inline-block
    margin-right: vw(30)

  .input-box
    flex: 1
    height: vw(70)
    border-radius: 30px
    border: 1px solid #ccc
    display: flex

    .iconsearch
      display: inline-block
      margin: 0 vw(20)

    input
      flex: 1
      outline: 0
      border: 0
      background: transparent
      font-size: 13px

  span
    display: inline-block
    margin-left: vw(30)
    font-size: 14px

main
  .title
    margin: vw(10) 0
    font-weight: 500
    padding: vw(25)
    display: flex
    justify-content: space-between

  .list
    padding: 0 vw(10)
    display: flex
    flex-wrap: wrap

    .list-item
      margin: 5px 10px
      background: #fff
      border: 1px solid #ccc

.history-layer
  position: absolute
  z-index: 10
  top: vw(90)
  bottom: 0
  left: 0
  width: 100vw
  background: #f2f2f2

  .layer-item
    display: flex
    justify-content: space-between
    align-items: center
    border-bottom: 1px #ccc solid
    overflow-y: auto
    height: vw(75)
</style>
