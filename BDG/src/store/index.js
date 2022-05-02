import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import classList from './modules/class'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    user,
    classList
  },
  getters
})

export default store
