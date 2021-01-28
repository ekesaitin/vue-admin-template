import { omitBy, pickBy, lowerFirst } from 'lodash'

const reg = /^on-([a-z\-]+)/
const initWatched = 'INIT_WATCHED'

export default {
  inheritAttrs: false,
  inject: {
    ffForm: { default: 'ffForm' }
  },
  props: {
    type: String,
    model: Object, // 表单数据对象
    prop: String, // 表单域 model 字段，在使用 validate、resetFields 方法的情况下，该属性是必填的
    label: [String, Function], // 标签文本
    clearable: { // 是否可清空
      type: Boolean,
      default: true
    },
    clearInMounted: Boolean,
    placeholder: {
      type: String,
      default: ''
    },
    val2str: { // 是否要将值转成string类型
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      defaultProps: { // 默认props
        value: 'value',
        label: 'label',
        disabled: 'disabled'
      },
      watched: false, // 是否已经初始化监听，第一次监听完后变为true
    }
  },
  computed: {
    // 所有标签属性
    aps () {
      return { ...this.$attrs, ...this.$props }
    },
    // 除事件外的其他所有属性，即aps中非on开头的属性
    bindProps () {
      return omitBy(this.aps, this.isEvent)
    },
    // 所有事件，即aps中on开头的属性
    events () {
      let hasOnAps = pickBy(this.aps, this.isEvent)
      return Object.keys(hasOnAps).reduce((prev, curr) => {
        let eventName = curr.replace(reg, (_, evtName) => lowerFirst(evtName))
        prev[eventName] = hasOnAps[curr]
        return prev
      }, {})
    },
    // 多选（checkBoxGroup、radioGroup、select）的props
    $_props () {
      return Object.assign({}, this.defaultProps, this.props)
    }
  },
  methods: {
    /**
     * 判断是不是 on-字母 组成的字符串
     * @param {string} str 要判断的字符串
     * @returns {boolean}
     */
    isEvent (_, str) {
      return reg.test(str)
    },
    /**
     * 获取item的props
     * @param {Object} item
     * @param {boolean} v2l 是否将value的值赋给label
     * @returns {Object}
     */
    getItemProps (item, v2l = false) {
      const $_props = this.$_props
      let props = {}
      for(let key in $_props) {
        const val = item[$_props[key]]
        if (val) {
          if (v2l && key === 'label') {
            props.label = item[$_props.value]
          } else {
            props[key] = val
          }
        }
      }
      if (v2l) Reflect.deleteProperty(props, 'value')
      return props
    },
    /**
     * 获取对象的prop属性的值
     * @param item 对象
     * @param prop 属性名
     * @returns {*}
     */
    getItemPropValue (item, prop) {
      return item[this.$_props[prop]]
    },
    /**
     * 给当前表单项对应的对象赋值
     * @param {string} value 要赋予的值
     */
    setValue (value) {
      this.$set(this.model, this.prop, value)
    },
    /**
     * 监听select、checkbox-group中value值的改变同步改变表单中的值
     * @param {string|string[]|undefined} value 改变后的值
     */
    watchValueSyncModel (value) {
      if (value != undefined && this.val2str) value = value.toString()
      this.setValue(value)
      this.$emit(initWatched)
    },
    /**
     * 将值转为数组，如果不存在返回空数组
     * @param {string|string[]|undefined} value 初始值
     * @returns {string[]} 转换成数组后的值
     */    
    getStrValue (value) {
      return value ? (typeof value === 'string' ? value.split(',') : value) : []
    },
    /**
     * 将初始化状态改为true
     */    
    initWatched () {
      this.$once(initWatched, _ => this.watched = true)
    }
  },
  mounted () {
    if (this.clearInMounted && this.ffForm) {
      setTimeout(() => {
        this.ffForm.clearValidate(this.prop)
      }, 100)
    }
  }
}
