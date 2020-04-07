<template>
  <div>
    <NavBar label="栏目管理" />
    <div class="main">
      <div class="top1">
        <div class="desc">点击删除栏目</div>
        <div class="list">
          <button disabled class="disable">关注</button>
          <button disabled class="disable">头条</button>
          <button
            v-for="(item,index) in top1List"
            :key="index"
            @click="editCate(item,true)"
          >{{item.name}}</button>
        </div>
      </div>
      <div class="top0">
        <div class="desc">点击添加栏目</div>
        <div class="list">
          <button
            v-for="(item,index) in top0List"
            :key="index"
            @click="editCate(item,false)"
          >{{item.name}}</button>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import NavBar from '../components/NavBar'
export default {
  data () {
    return {
      categories: [],
      top1List: [],
      top0List: []
    }
  },
  components: {
    NavBar
  },
  methods: {
    editCate (item, flag) {
      // 删除
      if (flag) {
        item.is_top = 0
        this.categories.forEach(v => {
          if (v.id === item.id) {
            v.is_top = 0
          }
        })
      }
      // 添加
      if (!flag) {
        item.is_top = 1
        this.categories.forEach(v => {
          if (v.id === item.id) {
            v.is_top = 1
          }
        })
      }
    }
  },
  mounted () {
    const categories = JSON.parse(localStorage.getItem('news_info'))
    this.categories = categories
  },
  destroyed () {
    localStorage.setItem('news_info', JSON.stringify(this.categories))
  },
  watch: {
    categories: {
      deep: true,
      handler () {
        this.top1List = this.categories.filter(v => {
          if (v.name === '关注' || v.name === '头条') {
            return
          }
          return v.is_top === 1
        })
        this.top0List = this.categories.filter(v => v.is_top === 0)
      }
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

.main
  padding: vw(25)

.desc
  background: #f5f5f5
  margin: vw(10) 0
.disable{
  background #f8f8f8
}
.list
  display: flex
  flex-wrap: wrap
  text-align: center

  button
    width: 25%
    height: vw(80)
    box-sizing: border-box
    border: vw(10) #f2f2f2 solid
</style>
