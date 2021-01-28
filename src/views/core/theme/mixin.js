import { navigate, splitMenu } from '@/config'
import { mapState } from 'vuex'

export default {
  components: {
    Header: () => import('./Header')
  },
  data() {
    return {
      navigate,
      splitMenu
    }
  },
  computed: {
    ...mapState(['menus', 'tabs']),
    // 标签名
    tabsName () {
      return this.tabs.map(v => v.name)
    }
  }
}