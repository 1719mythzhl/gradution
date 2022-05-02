import Vue from 'vue'
import Router from 'vue-router'
import index from '../view/index.vue'
import head from '../view/head/index.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/index'
    },
    {
      path: '/index',
      name: 'index',
      component: index
    },
    {
      path: '/head',
      name: 'head',
      // component: () => import("../view/head/index.vue")
      component: head
    }
  ]
})
