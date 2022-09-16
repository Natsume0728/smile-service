import Vue from 'vue'

import Cookies from 'js-cookie'

import 'normalize.css/normalize.css' // a modern alternative to CSS resets

import Element from 'element-ui'
import './styles/element-variables.scss'

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import './icons' // icon
import './permission' // permission control
import './utils/error-log' // error log

import * as filters from './filters' // global filters
import SlideVerify from 'vue-monoplasty-slide-verify'

Vue.config.devtools = true

Vue.use(SlideVerify)

Vue.use(Element, {
  size: Cookies.get('size') || 'medium', // set element-ui default size
})

// register global utility filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false
Vue.config.devtools = true

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
