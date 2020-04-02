<template>
  <div>
    <component :is="data"></component>
  </div>
</template>

<script>
import { Pic } from './index'
export default {
  props: ['data'],
  components: {
    ...Pic
  }
}
</script>

<style>

</style>
