<template>
  <div>
    <router-link tag="div" class="singlePic" :to="`/postDetail/${data.id}`">
        <div class="content">
           <h4>{{data.title}}</h4>
          <p class="comments">{{data.user.nickname}} {{data.comment_length}}跟贴</p>
        </div>
        <img :src="$axios.defaults.baseURL+data.cover[0].url" alt="">
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
.singlePic
    display flex
    padding  0 vw(25)
    height vw(200)
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
      height vw(185)
      object-fit cover
.singlePic
  border-bottom solid 1px #e4e4e4
  margin-top 5px
  .comments
    padding 5px 0
  .boder-left
    border-left 2px solid #fff
</style>
