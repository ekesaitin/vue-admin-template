<template>
  <div class="demo3-1">
    <ff-table :columns="columns" api="demoApi/getPageList" paging></ff-table>
  </div>
</template>

<script>
export default {
  name: 'demo3-1',
  data () {
    return {
      columns: [
        { prop: 'name', label: 'name' },
        { prop: 'age', label: 'age' },
        { prop: 'email', label: 'email' },
      ]
    }
  }
}
</script>

<style scoped lang="scss">
</style>