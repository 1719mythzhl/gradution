// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import requests from './request/request'
import './assets/css/global.css'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import store from './store';
import _ from 'lodash'

Vue.use(ElementUI);

Vue.config.productionTip = false

Vue.prototype.$rq = requests.service
Vue.prototype._ = _

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
