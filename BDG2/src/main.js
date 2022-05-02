// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import requests from './request/request'
import Element from "element-ui";
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(Element)
// Vue.use(requests)
Vue.prototype.$rq = requests.service
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})


