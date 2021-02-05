<template>
  <div class="demo1">
    <form-dialog
      title="阿达的"
      :type="type"
      :visible.sync="visible"
      :config="config"
      :model="formdata"
      submit
      @submit="handleSubmit"
    >
      <template #aa="{ form }">
        <span style="color: red;">{{form.aa}}</span>
      </template>
      <template #pp1="{ form }">{{form.pp1}}</template>
    </form-dialog>
    <el-button type="primary" @click="visible = true">show</el-button>
  </div>
</template>

<script>
export default {
  name: 'demo1',
  data: () => ({
    formdata: { arr: [{}] },
    arr: [{}],
    arr2: [{}],
    visible: false,
    type: null
  }),
  computed: {
    config () {
      return [
        {
          gutter: 20,
          cols: [
            {
              span: 12,
              slot: 'aa'
            },
            {
              span: 12,
              type: 'radio-group',
              // kind: 'daterange',
              prop: 'aa',
              label: 'aa',
              required: true,
              opts: [...Array(3)].map((_, i) => ({ value: ++i, label: `opt${i}` }))
            }
          ]
        },
        {
          type: 'arf',
          arr: this.arr,
          // initialModel: [{}],
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
                },
                {
                  span: 12,
                  type: 'select',
                  prop: 'pp2',
                  label: 'll1',
                  placeholder: (form, col) => {
                    return form.pp1
                  }
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
        },
        {
          type: 'arf',
          arr: this.arr2,
          // initialModel: [{}],
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
                },
                {
                  span: 12,
                  slot: 'pp1',
                  prop: 'pp1',
                  label: 'll1',
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
    }
  },
  methods: {
    handleSubmit () {
      console.log(111)
    }
  }
}
</script>

<style scoped lang="scss">
  .demo1 {
  }
</style>