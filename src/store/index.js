import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    keywords: '', // 搜索关键字,
    synthesisData: [] // 搜索模块综合数据
  },
  getters: {
  },
  mutations: {
    onSearchKeyword(state, keywords) {
      state.keywords = keywords
    },

    onSynthesisData(state,  data ){
      state.synthesisData = data
    }
  },
  actions: {
  },
  modules: {
  }
})
