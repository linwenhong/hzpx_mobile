// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import YDUI from 'vue-ydui';
import 'vue-ydui/dist/ydui.rem.css';
Vue.use(YDUI);

Vue.config.productionTip = false

import FilterService from '@/assets/filter'
// defined filter for global
for (let transform in FilterService) {
  Vue.filter(transform, FilterService[transform])
}
// global variable or method
Vue.prototype.$Service = require('@/assets/service/service.js').default
Vue.prototype.$Config = require('@/assets/config.js')

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
