export const state = () => ({
  integrationCloud: null,
  urlRef: null,
  instanceId: null,
  instanceData: null
})

export const mutations = {
  initContext (state, { integrationCloud, urlRef, instanceId }) {
    state.integrationCloud = integrationCloud
    state.urlRef = urlRef
    state.instanceId = instanceId
  },
  initInstanceData (state, data) {
    state.instanceData = data
  }
}

export const actions = {
  async nuxtServerInit ({ commit }, { $axios, app, redirect, req }) {
    console.log('server init')

    let [ , integrationCloud, urlRef, instanceId ] = req.originalUrl.split('/')

    commit('initContext', {
      integrationCloud: integrationCloud,
      urlRef: urlRef,
      instanceId: instanceId
    })

    const baseUrl = `https://${req.hostname}`
    const widgetPath = `/${integrationCloud}/${urlRef}`
    const redirectUrl = `${baseUrl}?u=${widgetPath}/${instanceId}`
    const token = app.$cookies.get('pwa_jwt')

    if (token) {
      try {
        let axRes = await $axios.get(`${baseUrl}/pwa/v1/token`, {
          headers: { 'Authorization': `Bearer ${token}` }
        })

        if (axRes.data.payload.data) {
          commit('auth/authenticate', token)
        }

        axRes = await $axios.get(`${baseUrl}${widgetPath}/instances/${instanceId}/data`, {
          headers: { 'Authorization': `Bearer ${token}` }
        })

        if (axRes.data) {
          commit('initInstanceData', axRes.data)
        }

        return
      } catch (e) {
        console.log('server init error redirect')

        if (e.response && e.response.status === 401) {
          redirect(redirectUrl)

          return
        }

        throw e
      }
    }

    console.log('server init missing cookie redirect')
    redirect(redirectUrl)
  }
}
