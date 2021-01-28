<template>
  <div class="ff-table">
    <el-table v-bind="{ ...$attrs, ...$props }" :data="tableData">
      <el-table-column
        v-for="(item, index) in columns"
        :key="index"
        v-bind="item"
      >
        <template v-if="item.slotName" #default="scope">
          <slot v-bind="scope" :name="item.slotName"></slot>
        </template>
      </el-table-column>
      <el-table-column v-if="edit || del" label="操作">
        <template #default="{ row }">
          <div class="handle-col">
            <div v-if="edit" class="handle-item" @click="handleClick(row, 'edit')">
              <i class="iconfont icon-tool_edit"></i>
              <span>编辑</span>
            </div>
            <div v-if="del" class="handle-item" @click="handleClick(row, 'del')">
              <i class="iconfont icon-icon_delete2"></i>
              <span>删除</span>
            </div>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <div class="table-footer">
      <el-pagination
        v-if="paging"
        v-bind="pagingConfig"
        background
        layout="prev, pager, next"
        hide-on-single-page
        :total="params.total"
        :page-size.sync="params.size"
        :current-page.sync="params.current"
        @current-change="currentChange"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import { pick } from 'lodash'
export default {
  name: 'FfTable',
  props: {
    // 列配置信息
    columns: {
      type: Array,
      default: () => []
    },
    // 表格数据
    data: {
      type: Array,
      default: () => []
    },
    // 请求方法
    api: [Function, String],
    // 请求参数
    apiParams: Object,
    // 是否分页
    paging: Boolean,
    // 分页配置
    pagingConfig: Object,
    handle: String
  },
  data: () => ({
    apiData: [],
    params: {}
  }),
  computed: {
    tableData () {
      return this.api ? this.apiData : this.data
    },
    edit () {
      return this.handle?.includes('edit') || false
    },
    del () {
      return this.handle?.includes('del') || false
    }
  },
  methods: {
    // 初始给参数添加默认值
    initParams () {
      if (this.paging) this.params = { current: 1, size: 15 }
    },
    // 合并请求参数
    mergeParams (params) {
      const paramsArr = Object.entries({ ...this.params, ...params }).filter(([k, v]) => v)
      this.params = Object.fromEntries(paramsArr)
    },
    // 处理api方法获取的数据
    formatData (res) {
      if (this.paging) {
        this.apiData = res.records
        this.mergeParams(pick(res, ['current', 'size', 'total']))
      } else {
        this.apiData = res
      }
    },
    /**
     * 获取表格数据
     * @param {boolean} resetCurr 是否重置回第一页
     * @param {object} params 请求参数
     * @returns {Promise<void>}
     */    
    async getData (resetCurr = false, params) {
      try {
        if (this.api) {
          if (params) this.mergeParams(params)
          if (resetCurr) this.params.current = 1
          const { data } = await this.useApi(this.api, this.params)
          this.formatData(data)
        }
      } catch (err) {
        console.log('err====', err)
      }
    },
    // 当前分页改变
    currentChange (current) {
      this.$emit('current-change', current)
      this.getData()
    },
    // 操作列点击事件
    handleClick (row, type) {
      this.$emit(type, row)
    }
  },
  mounted () {
    this.initParams()
    this.mergeParams(this.apiParams)
    this.getData()
  }
}
</script>

<style scoped lang="postcss">
  .table-footer {
    text-align: right;
    margin-top: 22px;
  }

  .handle-col {
    display: flex;
    align-items: center;

    & .handle-item {
      cursor: pointer;

      & + .handle-item {
        margin-left: 20px;
      }

      & i {
        font-size: 14px;
        margin-right: 6px;
      }
    }
  }

  .ff-table {
    & >>> .dark-row {
      & th, & td {
        background-color: var(--text-color-05) !important;
      }
    }
  }
</style>