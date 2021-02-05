<template>
  <div class="demo3-1">
    <ff-table :columns="columns" api="demoApi/getPageList" paging handle="edit,del">
      <template #email="{ row }">
        <a :href="row.email">{{row.email}}</a>
      </template>
    </ff-table>
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
        { prop: 'email', label: 'email', slot: 'email' },
      ]
    }
  }
}
</script>

<style scoped lang="scss">
</style>