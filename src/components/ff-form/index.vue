<template>
  <div class="ff-form">
    <el-form
      v-bind="{ ...$attrs, ..._omit($props, 'config') }"
      v-on="$listeners"
      ref="form"
      :style="formStyle"
      @submit.native.prevent
    >
      <template v-for="(row, rowIdx) in config">
        <el-collapse
          v-if="row.type === 'arf'"
          :key="rowIdx"
          :value="row.title + rowIdx"
          :class="row.className"
        >
          <el-collapse-item
            :title="row.title"
            :name="row.title + rowIdx"
            accordion
          >
            <el-row
              v-for="(arfItem, arfIdx) in row.arr"
              :key="arfItem.id"
              class="row arf-row"
              type="flex"
              justify="space-between"
              align="middle"
            >
              <el-col :span="23">
                <ff-form
                  v-bind="_omit(row, ['type', 'title', 'ref'])"
                  ref="arfForm"
                  :model="arfItem"
                  :clearable="clearable"
                  _isArf
                  :_arfItem="arfItem"
                  :_arfIdx="arfIdx"
                  @arf-item-change="_arfChangeCb(row)"
                >
                  <template
                    v-for="(_, slotName) in $scopedSlots"
                    #[slotName]="scope"
                  >
                    <slot v-bind="scope" :name="slotName"></slot>
                  </template>
                </ff-form>
              </el-col>
              <el-button
                v-if="row.hasEdit"
                type="primary"
                icon="el-icon-edit"
                circle
                size="mini"
                @click="_handleEditArf(row, arfItem)"
              ></el-button>
              <el-button
                v-if="!row.noDel && (row.min == null || row.arr.length > row.min)"
                type="danger"
                icon="el-icon-delete"
                circle
                size="mini"
                @click="_handleDelArf(row, arfItem)"
              ></el-button>
            </el-row>
            <el-button
              v-if="!row.noAdd && (row.max == null || row.max > row.arr.length)"
              type="primary"
              icon="el-icon-plus"
              circle
              size="mini"
              @click="_handleAddArf(row)"
            ></el-button>
          </el-collapse-item>
        </el-collapse>
        <el-row
          v-else
          v-bind="_omit(row, ['cols', 'className', 'slot'])"
          :key="rowIdx"
          class="row"
          :class="row.className"
        >
          <slot
            v-if="row.slot"
            :name="row.slot"
            :form="model"
            :row="row"
            :$index="rowIdx"
          ></slot>
          <el-col
            v-else
            v-for="(col, colIdx) in row.cols"
            v-bind="_omit(col, ['slot', 'className'])"
            :key="colIdx"
            :class="_getColClass(col)"
          >
            <el-form-item
              v-if="_haveComp(col)"
              v-bind="_omit(col, ['slot', 'className', 'label', 'required'])"
              v-setMinWidth
              :class="_getItemClass(col.type)"
              :label="_getItemLabel(col)"
              :rules="_getItemRules(col)"
            >
              <slot
                v-if="col.slot"
                :name="col.slot"
                :form="model"
                :col="col"
                :$index="colIdx"
                :arfIdx="_arfIdx"
              ></slot>
              <template v-else>
                <slot
                  :name="col.prependSlot"
                  :form="model"
                  :col="col"
                  :$index="colIdx"
                ></slot>
                <component
                  v-bind="_omit(col, ['slot', 'className'])"
                  :model="model"
                  :is="_getCompName(col.type)"
                  :label="_getItemLabel(col)"
                  :placeholder="_getItemPlaceholder(col)"
                  :clearInMounted="clearInMounted"
                  :clearable="col.clearable == undefined ? clearable : col.clearable"
                ></component>
                <slot
                  :name="col.appendSlot"
                  :form="model"
                  :col="col"
                  :$index="colIdx"
                ></slot>
              </template>
            </el-form-item>
          </el-col>
        </el-row>
      </template>
      <div v-if="cancel || confirm || _hasBtnSlot" class="handlers">
        <slot name="prependBtn"></slot>
        <el-button
          v-if="cancel"
          class="btn cancel"
          type="info"
          @click="_handleCancel"
        >{{ cancelText }}</el-button>
        <el-button
          v-if="confirm"
          class="btn confirm"
          type="primary"
          @click="_handleConfirm"
        >{{ confirmText }}</el-button>
        <slot name="appendBtn"></slot>
      </div>
    </el-form>
  </div>
</template>

<script>
/**
 * @param model {Object} 表单数据对象(必须)
 * @param config {Array} 表单配置对象(必须)
 *  @example config: [
 *      {
 *        className: '', // el-row的class
          gutter: 20, // 行配置对象，支持el-row所有属性
          slot: '', // 作用域插槽名
          cols: [ // 列及表单配置，支持el-col + el-form-item + 表单控件 所有属性
            {
              className: '', // el-col的class
              span: 8,
              type: 'input',
              prop: 'aa',
              label: 'aa',
              suffix: '天',
              'on-input' (v) { //... }
            },
            {
              span: 8,
              type: 'select',
              prop: 'dd',
              label: 'dd',
              opts: [
                {value: 'aa', label: 'AA'},
                {value: 'bb', label: 'BB'}
              ],
              'on-change' (v) { //... }
            },
            {
              span: 8,
              slot: 'cc', // 作用域插槽名
              prop: 'cc',
              label: 'cc'
            }
          ]
        },
 {
          type: 'arf',// 表示"array-form", 动态表单（可增减）
          title: '入参', // 标题
          arr: this.formData.params, // 表单遍历的数组
          defaultForm: {dd: 1, ee: 2}, // 新增时的默认值，没有则为{}
          min: 1, // 如果存在，当arr.length <= min时会隐藏删除按钮
          max: 5, // 如果存在，当当arr.length >= max时会隐藏添加按钮
          noDel: false, // 为真则不显示删除按钮
          noAdd: false, // 为真则不显示添加按钮
          hasEdit: false, // 为真则显示编辑按钮
          onClickAdd: () => {}, // 点击添加按钮执行的方法，如果存在则不会再触发默认的添加方法
          onClickEdit: () => {}, // 点击编辑按钮执行的方法
          config: [
            {
              gutter: 20,
              cols: [
                {
                  span: 12,
                  type: 'input',
                  labelWidth: '55px',
                  prop: 'bb',
                  label: '参数1',
                },
                {
                  span: 12,
                  type: 'input',
                  labelWidth: '55px',
                  prop: 'cc',
                  label: '参数2',
                }
              ]
            },
            {
              gutter: 20,
              cols: [
                {
                  span: 12,
                  type: 'radio-group',
                  labelWidth: '55px',
                  prop: 'dd',
                  label: '参数3',
                  opts
                },
                {
                  span: 12,
                  type: 'switch',
                  labelWidth: '55px',
                  prop: 'ee',
                  label: '参数4'
                }
              ]
            }
          ]
        }
 *    ]
 *
 *  @param cancel {boolean} 是否显示关闭按钮
 *  @param confirm {boolean} 是否显示保存按钮
 *  @param cancelText {string} 关闭按钮文本
 *  @param confirmText {string} 保存按钮文本
 *  @param clearable {boolean} 表单项是否可清空
 *  @param clearInMounted {boolean} 初始挂载时移除所有表单校验结果
 *  @param resetBeforeCancel {boolean} 是否在点击关闭按钮后重置所有表单
 *  @param clearBeforeCancel {boolean} 是否在点击关闭按钮后移除所有表单校验结果
 *  @param preFilledPlaceholder {boolean} 是否预填充placeholder，为true会根据控件类型和label生成默认占位文本
 *
 *
 *  @event cancel {Function} 点击关闭按钮触发，会重置表单
 *  @event confirm {Function} 点击测试按钮,校验通过后触发
 *
 *
 *  @method validate {Function} 对整个表单进行校验的方法(不包括动态表单)
 *  @method validateAll {Function} 对整个表单进行校验的方法(包括动态表单)
 *  @method validateField {Function} 对部分表单字段进行校验的方法
 *  @method resetFields {Function} 对整个表单进行重置，将所有字段值重置为初始值并移除校验结果
 *  @method clearValidate {Function} 移除表单项的校验结果。传入待移除的表单项的 prop 属性或者 prop 组成的数组，如不传则移除整个表单的校验结果
 */

import { omit, cloneDeep } from 'lodash'
import components from './formComps'

/**
 * 将单行配置转为正常的config格式
 * @param {object[]} config 单行配置
 * @return {object[]}
 */
export const formatSingleConfig = config => config.map(cfg => ({ cols: [{ span: 24, ...cfg }] }))

export default {
  name: 'FfForm',
  inheritAttrs: false,
  directives: {
    /**设置el-form-item__label最大最小宽，防止flex缩放；以及取消el-form-item__content默认的marginLeft*/
    setMinWidth (el) {
      const label = el.getElementsByClassName('el-form-item__label')[0]
      if (!label) return
      const w = label.style.width
      if (w) {
        label.style.minWidth = label.style.maxWidth = w
        el.getElementsByClassName(
          'el-form-item__content'
        )[0].style.marginLeft = 0
      }
    }
  },
  components,
  provide () {
    return { ffForm: this }
  },
  props: {
    model: {
      type: Object,
      required: true
    },
    config: {
      type: Array,
      required: true
    },
    cancel: {
      type: Boolean,
      default: false
    },
    confirm: {
      type: Boolean,
      default: false
    },
    cancelText: {
      type: String,
      default: '取 消'
    },
    confirmText: {
      type: String,
      default: '确 定'
    },
    clearable: {
      type: Boolean,
      default: true
    },
    clearInMounted: {
      type: Boolean,
      default: true
    },
    resetBeforeCancel: {
      type: Boolean,
      default: false
    },
    clearBeforeCancel: {
      type: Boolean,
      default: true
    },
    validateOnRuleChange: {
      type: Boolean,
      default: false
    },
    preFilledPlaceholder: {
      type: Boolean,
      default: false
    },
    _isArf: { // 动态表单，为真则不设置左右padding
      type: Boolean,
      default: false
    },
    _arfItem: Object, // 动态表单当前项
    _arfIdx: Number, // 动态表单当前项索引
    inline: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      compNames: Object.keys(components).map((v) => v.substring(3)), // 所有表单项组件名
      formData: Object.create(null) // 初始表单
    }
  },
  computed: {
    // 是否存在按钮前、后置插槽
    _hasBtnSlot () {
      const btnSlots = ['prependBtn', 'appendBtn']
      const slots = Object.keys(this.$scopedSlots)
      return slots.some(s => btnSlots.includes(s))
    },
    /**
     * 根据行配置中最大的gutter设置左右padding，防止横向滚动条
     * @returns {{paddingRight: string, paddingLeft: string}|null}
     */
    formStyle () {
      if (this._isArf) return {}
      const gutArr = this.config.map((v) => v.gutter).filter((v) => v)
      const w = Math.max(...gutArr, 0) / 2
      if (w === 0) return null
      const p = w + 'px'
      return {
        paddingLeft: p,
        paddingRight: p
      }
    }
  },
  watch: {
    _arfItem: {
      handler (_arfItem) {
        this.$emit('arf-item-change', _arfItem)
      },
      deep: true
    }
  },
  methods: {
    _omit: omit,
    /**
     * 动态表单改变后的回调
     * */
    _arfChangeCb (row) {
      if (row.onChange) {
        row.onChange(row.arr)
      }
    },
    /** 获取标签 */
    _getItemLabel (col) {
      const { label } = col
      if (typeof label === 'function') {
        if (this._isArf) return label(this._arfItem, col)
        else return label(this.model, col)
      } else {
        return label
      }
    },
    /**获取校验规则*/
    _getItemRules (col) {
      const { rules, required } = col
      if (rules) {
        if (typeof rules === 'function') {
          if (this._isArf) return rules(this._arfItem, col)
          else return rules(this.model, col)
        } else return rules
      }
      else if (required) return this._getRequiredItemErrMsg(col)
    },
    /**
     * 根据表单项type、label生成占位文本
     * @param {object} col 当前项
     * @param {string} col.type 控件类型
     * @param {string} col.label 标签文本
     * @returns {string} 占位文本
     */
    _getPlaceText (col) {
      let { type, label } = col
      label = typeof label === 'function' ? label(this._isArf ? this._arfItem : this.model, col) : (label || '')
      label = label.replace(/:|：$/, '')
      const inpTypes = ['input', 'input-number']
      if (inpTypes.includes(type)) var startText = '请输入'
      else var startText = '请选择'
      return startText + label
    },
    /**获取占位文本*/
    _getItemPlaceholder (col) {
      const { placeholder } = col
      if (typeof placeholder === 'function') {
        if (this._isArf) return placeholder(this._arfItem, col)
        else return placeholder(this.model, col)
      } else {
        if (this.preFilledPlaceholder && placeholder === undefined) return this._getPlaceText(col)
        else return placeholder
      }
    },
    /**
     * 获取必填校验文本
     * @param {object} col 当前项
     * @param {string} col.type 控件类型
     * @param {string} col.label 标签文本
     * @param {string} col.errMsg 自定义必填项校验不通过时的报错信息
     * @returns {object} 校验不通过显示文本
     * */
    _getRequiredItemErrMsg (col) {
      let { errMsg } = col
      const message = errMsg ? errMsg : this._getPlaceText(col)
      return { required: true, message, trigger: 'change' }
    },
    /**获取组件名*/
    _getCompName (name) {
      return `ff-${name}`
    },
    /**根据type生成className*/
    _getItemClass (type) {
      const specificClass = ['input', 'select', 'date-picker', 'cascader']
      if (specificClass.includes(type)) return 'line'
      else return ''
    },
    /**根据col生成className*/
    _getColClass (col) {
      const { className } = col
      if (typeof className === 'function') {
        if (this._isArf) return className(this._arfItem, col)
        else return className(this.model, col)
      } else {
        return className
      }
    },
    /**判断是否有这个组件*/
    _haveComp (col) {
      return (
        col.slot || this.compNames.includes(col.type) || col.type === 'label'
      )
    },
    /**点击取消按钮*/
    _handleCancel () {
      if (this.resetBeforeCancel) this.resetFieldsAll()
      else if (this.clearBeforeCancel) this.clearValidateAll()
      this.$emit('cancel')
    },
    /**点击保存按钮*/
    _handleConfirm () {
      this.validateAll()
        .then(() => {
          this.$emit('confirm')
        })
        .catch((_) => {
        })
    },
    /**对整个表单(不包括动态表单)进行校验的方法*/
    validate (...args) {
      return this.$refs.form.validate(...args)
    },
    /**对部分表单字段进行校验的方法*/
    validateField (...args) {
      return this.$refs.form.validateField(...args)
    },
    /**将表单字段重置为初始值*/
    resetFieldsData () {
      const form = this.formData
      for (let k in this.model) {
        if (Reflect.has(form, k)) this.$set(this.model, k, cloneDeep(form[k]))
        else {
          this.$delete(this.model, k)
          Reflect.deleteProperty(this.model, k)
        }
      }
    },
    /**对整个表单(不包括动态表单)进行重置，将所有字段值重置为初始值并移除校验结果*/
    resetFields (...args) {
      this.resetFieldsData()
      this.$nextTick(() => {
        this.clearValidate()
      })
    },
    /**移除(不包括动态表单)表单项的校验结果。传入待移除的表单项的 prop 属性或者 prop 组成的数组，如不传则移除整个表单的校验结果*/
    clearValidate (...args) {
      if (this.$refs.form) return this.$refs.form.clearValidate(...args)
    },
    /**校验所有表单(包括动态表单)*/
    validateAll () {
      const arfs = this.$refs.arfForm || []
      const verifys = arfs.map(f => f.validate())
      verifys.push(this.validate())
      return Promise.all(verifys)
    },
    /**移除(包括动态表单)表单项的校验结果*/
    clearValidateAll () {
      const arfs = this.$refs.arfForm || []
      const verifys = arfs.map(f => f.clearValidate())
      verifys.push(this.clearValidate())
      return Promise.all(verifys)
    },
    /**对整个表单(包括动态表单)进行重置，将所有字段值重置为初始值并移除校验结果*/
    resetFieldsAll () {
      this.resetFieldsData()
      this.$nextTick(() => {
        this.clearValidateAll()
      })
    },
    /**
     * 添加折叠面板中的一项
     * @param row {Object} 当前行配置信息
     * @private
     */
    _handleAddArf (row) {
      if (row.onClickAdd) row.onClickAdd()
      else {
        const arr = row.arr
        if (!arr || !Array.isArray(arr)) throw 'arr must be an array'
        let defaultForm = row.defaultForm || {}
        arr.push(defaultForm)
        this.$emit('add-arf-item', row)
      }
    },
    /**
     * 编辑叠面板中的一项
     * @param row 当前行配置
     * @param item 要编辑的项
     * @private
     * */
    _handleEditArf (row, item) {
      row.onClickEdit?.(item)
    },
    /**
     * 删除折叠面板中的一项
     * @param row 当前行配置
     * @param item 要删除的项
     * @private
     */
    _handleDelArf (row, item) {
      this.$confirm('是否确认删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (row.onClickDel) row.onClickDel(item)
        else {
          const { arr } = row
          const idx = arr.findIndex((v) => v === item)
          arr.splice(idx, 1)
          this.$emit('del-arf-item', row, item)
        }
      }).catch(() => { })

    }
  },
  created () {
    this.formData = JSON.parse(JSON.stringify(this.model || {}))
  }
}
</script>

<style scoped lang="scss">
  @import './index.scss';
</style>
