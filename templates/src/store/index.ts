import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: {},
  },
  getters: {
    GetUserInfo(state) {
      return state.userInfo || {}
    }
  },
  mutations: {
    SetUserInfo(state, userInfo) {
      state.userInfo = userInfo || {}
    }
  },
  actions: {
    SetUserInfo(context, data) {
      context.commit('SetUserInfo', data)
    },
  },
  modules: {
  }
})
