export const state = () => ({
  isAuthenticated: false,
  token: null
})

export const mutations = {
  authenticate (state, token) {
    state.token = token
    state.isAuthenticated = true
  }
}
