<template>
  <div class="Main">
    <component :is="layout" />
  </div>
</template>

<script>
import { layout } from '@/config'
export default {
  name: 'Main',
  components: {
    'theme-LR': _ => import('@/views/core/theme/theme-LR'),
    'theme-TB': _ => import('@/views/core/theme/theme-TB')
  },
  data () {
    return {
      show: false,
      layout
    }
  }
}
</script>

<style scoped lang="scss">

</style>
