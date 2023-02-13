const state = {
  chatData: {
  }
}

const mutations = {
  SET_CHAT_DATA: (state, data) => {
    console.log(state)
    state.chatData[data.accountId] = data
  },
  ADD_CHAT_LIST: (state, data) => {
    state.chatData[data.accountId].list.push(data.list)
  }
}

const actions = {
  setChatData({ commit }, data) {
    commit('SET_CHAT_DATA', data)
  },
  addChatData({ commit }, data) {
    console.log(data)
    commit('ADD_CHAT_LIST', data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
