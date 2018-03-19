export const state = () => ({
  isAuthenticated: false,
  token: null
})

export const mutations = {
  SET_TOKEN (state, token) {
    state.token = token

    state.isAuthenticated = !!token
  }
}

export const actions = {
  async authenticate ({ commit, rootState }, { token }) {
    const res = await this.$axios.get(`${rootState.baseUrl}${rootState.widgetPath}/token`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })

    if (res.data) {
      this.$axios.setToken(token, 'Bearer')

      commit('SET_TOKEN', token)
    }
  }
}
