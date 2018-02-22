export default function ({ $axios, app, redirect, req, store }) {
  console.log('Nuxt Auth Middleware')

  if (store.state.auth.isAuthenticated) {
    $axios.setToken(store.state.auth.token, 'Bearer')
  }
}
