<template>
  <div id="app">
    <keep-alive include="home,search">
    <router-view/>
    </keep-alive>
  </div>
</template>
<script>
export default {
  mouted () {
    console.log(this.$route.path)
  }
}
</script>
<style lang='stylus'>
$bg = #f2f2f2
$font-color = #cc3300
$vw_base = 750

vw(x)
  (x / $vw_base) * 100vw
@import url("//at.alicdn.com/t/font_1426139_jm7n2373nlh.css");
html,body,#app
  height 100%
  background $bg
*{
    margin: 0;
    padding: 0;
    box-sizing border-box
}

a {
    color: inherit;
    text-decoration: none;
}

a:hover{
    color: inherit;
}

ul, li, ol{
    list-style: none;
}

i, em{
    font-style: normal;
}
</style>
