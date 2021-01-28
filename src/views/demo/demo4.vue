<template>
  <div class="demo4">
    444
  </div>
</template>

<script>
import { testApi } from '@/api/demoApi'
export default {
  name: 'demo4',
  data () {
    return {}
  },
  mounted () {
    this.useApi('demoApi/testApi').then(res => {
      console.log(res)
    }) 
  }
}
</script>

<style scoped lang="scss">

</style>