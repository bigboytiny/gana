import Vue from 'vue'
import App from '@/App'
import router from '@/router'                 // api: https://github.com/vuejs/vue-router
import store from '@/store'                   // api: https://github.com/vuejs/vuex
import VueCookie from 'vue-cookie'            // api: https://github.com/alfhen/vue-cookie
import '@/element-ui'                         // api: https://github.com/ElemeFE/element
import '@/icons'                              // api: http://www.iconfont.cn/
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/element-ui-theme'
import '@/assets/scss/index.scss'
import httpRequest from '@/utils/httpRequest' // api: https://github.com/axios/axios
import { isAuth } from '@/utils'
import cloneDeep from 'lodash/cloneDeep'
// 引入axios，并加到原型链中
import axios from 'axios'
import QS from 'qs'
import moment from 'moment'

Vue.prototype.$axios = axios
Vue.prototype.qs = QS

Vue.use(require('vue-moment'))
Vue.prototype.moment = moment

Vue.use(VueCookie)
Vue.use(ElementUI)
Vue.config.productionTip = false
Vue.config.devtools = true

// 非生产环境, 适配mockjs模拟数据                 // api: https://github.com/nuysoft/Mock
if (process.env.NODE_ENV !== 'production') {
  require('@/mock')
}

Vue.filter('dateYMDHMSFormat',function(dateStr,pattern='YYYY-MM-DD HH:MM:SS'){
  return moment(dateStr).format(pattern);
})

Vue.filter('dateYMDFormat',function(dateStr,pattern='YYYY-MM-DD'){
  return moment(dateStr).format(pattern);
})

// 挂载全局
Vue.prototype.$http = httpRequest // ajax请求方法
Vue.prototype.isAuth = isAuth     // 权限方法

// 保存整站vuex本地储存初始状态
window.SITE_CONFIG['storeState'] = cloneDeep(store.state)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
