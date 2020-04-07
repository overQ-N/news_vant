<template>
  <div>
      <router-link tag="div" class="threePic" :to="`/postDetail/${data.id}`">
        <h4>{{data.title}}</h4>
        <div class="imglist">
          <img :src="$axios.defaults.baseURL+img.url"  v-for="(img,index) in data.cover" :key='index' :class="index!=0 ? 'boder-left':''">
        </div>
        <p class="comments">{{data.user.nickname}}  {{data.comment_length}}跟贴</p>
      </router-link>
  </div>
</template>

<script>
export default {
  props: ['data']
}
</script>

<style lang='stylus' scoped>
$bg = #f2f2f2
$font-color = #cc3300
$vw_base = 750

vw(x)
  (x / $vw_base) * 100vw
 .threePic
    display flex
    padding  0 vw(25)
    height vw(260)
    flex-direction column
    margin-top 6px
    align-content space-around
    h4
      font-weight 400
      font-size 16px
    .imglist
      display flex
      padding 8px 0
      img
        width 33%
        height vw(125)
        object-fit cover
    p
      color #868686
      font-size 12px
.threePic
  border-bottom solid 1px #e4e4e4
  margin-top 5px
  .comments
    padding 5px 0
  .boder-left
    border-left 2px solid #fff
</style>
