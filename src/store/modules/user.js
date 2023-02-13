const state = {
  userInfo: localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : {}
}

export default {
  namespaced: true,
  state
}
