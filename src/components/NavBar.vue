<template>
  <div class="navBar">
      <i class="iconfont iconjiantou" @click="$router.back()"></i>
      <span class="">{{label}}</span>
      <i class="iconfont iconshouye" v-if="showHome" @click="$router.push('/')"></i>
      <i class="iconfont iconshouye" v-else style="opacity:0"></i>
    </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  props: ['label', 'showHome']
}
</script>

<style lang='stylus' scoped>
$bg = #f2f2f2
$font-color = #cc3300
$vw_base = 750

vw(x)
  (x / $vw_base) * 100vw
.navBar
  height vw(100)
  display flex
  padding vw(40)
  justify-content space-between
  align-items center
  border-bottom #e4e4e4 3px solid
  i
    font-size vw(40)
</style>
