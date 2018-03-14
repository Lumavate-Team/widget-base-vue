import jwt from 'jsonwebtoken'

export const state = () => ({
  baseUrl: null,
  instanceId: null,
  integrationCloud: null,
  pwaAuthRedirectUrl: null,
  urlRef: null,
  widgetPath: null
})

export const mutations = {
  SET_BASE_URL (state, baseUrl) {
    state.baseUrl = baseUrl
  },
  SET_INSTANCE_ID (state, instanceId) {
    state.instanceId = instanceId
  },
  SET_INTEGRATION_CLOUD (state, integrationCloud) {
    state.integrationCloud = integrationCloud
  },
  SET_PWA_AUTH_REDIRECT_URL (state, pwaAuthRedirectUrl) {
    state.pwaAuthRedirectUrl = pwaAuthRedirectUrl
  },
  SET_URL_REF (state, urlRef) {
    state.urlRef = urlRef
  },
  SET_WIDGET_PATH (state, widgetPath) {
    state.widgetPath = widgetPath
  }
}

export const actions = {
  init ({ commit }, { req }) {
    let [ , integrationCloud, urlRef, instanceId ] = req.originalUrl.split('/')

    commit('SET_INTEGRATION_CLOUD', integrationCloud)
    commit('SET_URL_REF', urlRef)
    commit('SET_INSTANCE_ID', instanceId)

    const baseUrl = `${req.protocol}://${req.hostname}`
    const widgetPath = `/${integrationCloud}/${urlRef}`

    commit('SET_BASE_URL', baseUrl)
    commit('SET_WIDGET_PATH', widgetPath)
    commit('SET_PWA_AUTH_REDIRECT_URL', `${baseUrl}?u=${widgetPath}/${instanceId}`)
  },
  async nuxtServerInit ({ commit, dispatch, state }, { app, error, redirect, req }) {
    console.log('server init')

    dispatch('init', { req })

    const token = app.$cookies.get('pwa_jwt')

    if (token) {
      try {
        await dispatch('auth/authenticate', { token })

        const tokenData = jwt.decode(token)
        if (tokenData.authUrl && !app.$cookies.get('access_token')) {
          return redirect(`${state.baseUrl}${tokenData.authUrl}/authorize?u=${req.originalUrl}`)
        }

        await dispatch('widget/loadInstanceData')

        return
      } catch (e) {
        console.log('server init error redirect')

        if (e.response && e.response.status === 401) {
          return redirect(state.pwaAuthRedirectUrl)
        }

        // TODO: should log errors here and return friendly error message
        console.error(e)
        return error('An error occured')
      }
    }

    console.log('server init missing cookie redirect')
    redirect(state.pwaAuthRedirectUrl)
  }
}
