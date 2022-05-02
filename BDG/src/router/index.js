import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: 'index',
    },
    {
      path: '/login',
      name: 'login',
      component: () => import("@/view/login/login.vue")
    },
    {
      path: '/index',
      name: 'index',
      component: () => import("@/components/index/index.vue"),
      redirect: 'main',
      children: [{
        path: '/main',
        name: 'main',
        component: () => import('@/view/main/index.vue'),
      },{
        path: '/moreThree',
        name: 'moreThree',
        component: () => import('@/view/main/moreThree.vue')
      },{
        path: '/lessThree',
        name: 'lessThree',
        component: () => import('@/view/main/lessThree.vue')
      }, {
        path: '/shopList',
        name: 'shopList',
        component: () => import('@/view/class/index.vue')
      },{
        path: '/shopList/detail',
        name: 'detail',
        component: () => import('@/view/class/detail.vue')
      },{
        path: '/shopCar',
        name: 'shopCar',
        component: () => import('@/view/shopCar/index.vue')
      },{
        path: '/myBill',
        name: 'myBill',
        component: () => import('@/view/myBill/index.vue')
      },{
        path: '/searchClass',
        name: 'searchClass',
        component: () => import('@/view/class/search.vue')
      }]
    }
  ]
})
