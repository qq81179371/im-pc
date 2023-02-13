import { createStore } from 'vuex'
import VuexPersistence from 'vuex-persist'
import chat from './modules/chat'
import user from './modules/user'
import getters from './getters'

const vuexLocal = new VuexPersistence({
  modulesstring: [chat],
  storage: window.localStorage
})

export default createStore({
  modules: {
    chat,
    user
  },
  getters,
  plugins: [vuexLocal.plugin]
})
