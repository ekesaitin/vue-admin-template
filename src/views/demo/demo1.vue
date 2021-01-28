<template>
  <div class="demo1">
    <ff-form :config="config" :model="formdata"></ff-form>
    <el-button type="primary" @click="$router.push(`/main/demo2/1111`)">demo2</el-button>
  </div>
</template>

<script>
export default {
  name: 'demo1',
  data: () => ({
    formdata: {},
    config: [
      {
        type: 'arf',
        arr: [{}],
        title: 'aaa',
        hasEdit: true,
        config: [
          {
            gutter: 20,
            cols: [
              {
                span: 12,
                type: 'input',
                prop: 'pp1',
                label: 'll1',
                opts: [...Array(3)].map((_, i) => ({ value: ++i, label: `opt${i}` }))
              }
            ]
          },
          {
            gutter: 20,
            cols: [
              {
                span: 12,
                type: 'radio-group',
                prop: 'pp2',
                label: 'll2',
                opts: [...Array(3)].map((_, i) => ({ value: ++i, label: `opt${i}` }))
              }
            ]
          }
        ]
      }
    ]
  })
}
</script>

<style scoped lang="scss">
  .demo1 {
  }
</style>